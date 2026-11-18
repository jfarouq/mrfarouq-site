<?php
/*
 * Daily agenda viewer
 * -------------------
 * Shows the live published Google Doc for a course, with every Padlet link removed.
 *
 *   /agenda.php?c=apcsa
 *   /agenda.php?c=apcsp
 *   /agenda.php?c=introai
 *
 * The doc is fetched fresh (cached for 2 minutes), so edits in Google Docs
 * still appear automatically. To hide another site's links as well, add its
 * domain to $HIDDEN_DOMAINS. Class join codes (e.g. "Join code: AB12C") are
 * replaced with "[code hidden]".
 */

$COURSES = [
    'apcsa'   => ['AP CSA Daily Agenda',      'https://docs.google.com/document/d/e/2PACX-1vSKqB0Y156N5EXJWhkpIQKE_Zskw98EJMyjYak2Z8zxQ96URzCGQcxw3cd6gWmhhavYsp-LtBfu11QB/pub'],
    'apcsp'   => ['AP CSP Daily Agenda',      'https://docs.google.com/document/d/e/2PACX-1vQOWbm8hJ4ID1n0rxOaGvb5M5bLCXElSroPSb-qMsiyxFJOZ4peHq9D9ryHMzlsXags_Xd-_w_YRd0O/pub'],
    'introai' => ['Intro to AI Daily Agenda', 'https://docs.google.com/document/d/e/2PACX-1vRtvx1XbbG4OSriAozE_DGtxpAC2-1LcNcklZ5I4Ju7KPuwZ0q4iYjO77XaWeRWxJZuRurNGBizTP2-/pub'],
];

$HIDDEN_DOMAINS = ['padlet.com', 'padlet.org', 'padlet.site', 'albert.io', 'codehs.com', 'codehs.org', 'codehs.me'];
$CACHE_SECONDS  = 120;

header('X-Robots-Tag: noindex, nofollow');

/* ---------- image pass-through: /agenda.php?img=<google image address> ---------- */
if (isset($_GET['img'])) {
    $u = $_GET['img'];
    $h = strtolower(parse_url($u, PHP_URL_HOST) ?? '');
    if (!preg_match('/(^|\.)(googleusercontent\.com|docs\.google\.com)$/', $h) || !preg_match('#^https://#i', $u)) {
        http_response_code(400); exit;
    }
    [$body, $type] = fetch_raw($u);
    if ($body === null || !preg_match('#^image/#i', $type)) { http_response_code(404); exit; }
    header('Content-Type: ' . $type);
    header('Cache-Control: public, max-age=86400');
    echo $body;
    exit;
}

$key = strtolower(preg_replace('/[^a-z]/i', '', $_GET['c'] ?? ''));
if (!isset($COURSES[$key])) {
    http_response_code(404);
    show_message('Agenda not found', 'That agenda does not exist.');
}
[$title, $source] = $COURSES[$key];

/* ---------- fetch (with a short cache) ---------- */
$cacheFile = sys_get_temp_dir() . '/mrfarouq_agenda_v4_' . $key . '.html';
$html = null;
if (is_file($cacheFile) && time() - filemtime($cacheFile) < $CACHE_SECONDS) {
    $html = file_get_contents($cacheFile);
}
if (!$html) {
    $html = fetch_url($source);
    if ($html) {
        $html = clean_html($html, $HIDDEN_DOMAINS, $title);
        @file_put_contents($cacheFile, $html);
    } elseif (is_file($cacheFile)) {
        $html = file_get_contents($cacheFile);      // serve the last good copy
    }
}
if (!$html) {
    http_response_code(503);
    show_message($title, 'The agenda could not be loaded right now. Please try again in a minute.');
}

header('Content-Type: text/html; charset=utf-8');
echo $html;
exit;

/* ================= helpers ================= */

function fetch_url(string $url): ?string {
    if (function_exists('curl_init')) {
        $ch = curl_init($url);
        curl_setopt_array($ch, [
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_TIMEOUT        => 15,
            CURLOPT_USERAGENT      => 'Mozilla/5.0 (mrfarouq.com agenda viewer)',
        ]);
        $body = curl_exec($ch);
        $code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
        return ($body !== false && $code === 200) ? $body : null;
    }
    $ctx  = stream_context_create(['http' => ['timeout' => 15, 'header' => "User-Agent: Mozilla/5.0\r\n"]]);
    $body = @file_get_contents($url, false, $ctx);
    return $body === false ? null : $body;
}

function fetch_raw(string $url): array {
    $ch = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_TIMEOUT        => 15,
        CURLOPT_USERAGENT      => 'Mozilla/5.0 (mrfarouq.com agenda viewer)',
    ]);
    $body = curl_exec($ch);
    $code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $type = (string) curl_getinfo($ch, CURLINFO_CONTENT_TYPE);
    curl_close($ch);
    return ($body !== false && $code === 200) ? [$body, $type] : [null, ''];
}

/** Real destination of a link (Google wraps links as google.com/url?q=...). */
function link_target(string $href): string {
    $parts = parse_url($href);
    if (!empty($parts['host']) && preg_match('/(^|\.)google\.[a-z.]+$/i', $parts['host'])
        && ($parts['path'] ?? '') === '/url' && !empty($parts['query'])) {
        parse_str($parts['query'], $q);
        if (!empty($q['q'])) return $q['q'];
    }
    return $href;
}

function is_hidden(string $text, array $domains): bool {
    foreach ($domains as $d) {
        if (stripos($text, $d) !== false) return true;
    }
    return false;
}

function clean_html(string $html, array $domains, string $title): string {
    libxml_use_internal_errors(true);
    $doc = new DOMDocument();
    $doc->loadHTML('<?xml encoding="UTF-8">' . $html, LIBXML_NOERROR | LIBXML_NOWARNING);
    $xp = new DOMXPath($doc);

    $domainPattern = implode('|', array_map(fn($d) => preg_quote($d, '/'), $domains));
    // A web address for a hidden site: with http(s)://, or followed by a /path.
    // A bare name like "Albert.io" in a sentence is left alone.
    $urlRegex = '/https?:\/\/([a-z0-9-]+\.)*(' . $domainPattern . ')\S*|\b(www\.)?([a-z0-9-]+\.)*(' . $domainPattern . ')\/\S*/i';

    // 1. Links pointing at a hidden site: keep the label text, drop the link.
    //    If the label is itself the hidden web address, drop it entirely.
    foreach (iterator_to_array($xp->query('//a[@href]')) as $a) {
        $target = link_target($a->getAttribute('href'));
        if (is_hidden($target, $domains) || is_hidden($a->textContent, $domains)) {
            $label = trim(preg_replace($urlRegex, '', $a->textContent));
            $a->parentNode->replaceChild($doc->createTextNode($label), $a);
        } else {
            $a->setAttribute('target', '_blank');
            $a->setAttribute('rel', 'noopener');
        }
    }

    // 2. Any hidden-site address typed out as plain text.
    foreach (iterator_to_array($xp->query('//body//text()')) as $t) {
        if (is_hidden($t->nodeValue, $domains)) {
            $t->nodeValue = preg_replace($urlRegex, '', $t->nodeValue);
        }
    }

    // 3. Join codes: in any line that mentions a join/class/section code,
    //    hide code-like tokens (letters+digits, or 5+ capital letters).
    $trigger = '/\b(join|class|section|course|enrol\w*|enroll\w*|access|invite)\s*codes?\b|\bcodes?\s*[:=#]/i';
    $common  = ['CODE','CODES','JOIN','CLASS','SECTION','ALBERT','CODEHS','AP','CSA','CSP','AI','HERE','LINK','USE','THE','WITH'];
    $codeRx  = '/\b(?=[A-Za-z0-9-]*\d)(?=[A-Za-z0-9-]*[A-Za-z])[A-Za-z0-9]{2,}(?:-[A-Za-z0-9]{2,})*\b|\b[A-Z]{5,12}\b/';
    foreach (iterator_to_array($xp->query('//body//*[self::p or self::li or self::td or self::h1 or self::h2 or self::h3 or self::h4 or self::h5 or self::h6]')) as $block) {
        if (!preg_match($trigger, $block->textContent)) continue;
        foreach (iterator_to_array($xp->query('.//text()', $block)) as $t) {
            $t->nodeValue = preg_replace_callback($codeRx, function ($m) use ($common) {
                $w = $m[0];
                if (in_array(strtoupper($w), $common, true)) return $w;
                if (preg_match('/^\d+(st|nd|rd|th)$/i', $w)) return $w;      // 1st, 2nd …
                return '[code hidden]';
            }, $t->nodeValue);
        }
    }

    // 3b. Remove Google's own header/footer links that point back to the doc.
    foreach (['//div[@id="header"]', '//div[@id="footer"]', '//*[@id="banners"]'] as $q) {
        foreach (iterator_to_array($xp->query($q)) as $n) $n->parentNode->removeChild($n);
    }

    // 4. Images: route through this page so Google serves them (avoids hotlink blocking).
    foreach (iterator_to_array($xp->query('//img')) as $img) {
        $v = $img->getAttribute('src');
        if ($v === '' || str_starts_with($v, 'data:')) continue;
        if (str_starts_with($v, '//'))               $v = 'https:' . $v;
        elseif (!preg_match('#^https?://#i', $v))    $v = rtrim(preg_replace('#/[^/]*$#', '/', $GLOBALS['source']), '/') . '/' . ltrim($v, '/');
        $img->setAttribute('src', '/agenda.php?img=' . rawurlencode($v));
        $img->removeAttribute('srcset');
    }

    // 5. Page title, no indexing, and a little breathing room.
    $head = $xp->query('//head')->item(0);
    if ($head) {
        foreach (iterator_to_array($xp->query('//head/title')) as $n) $head->removeChild($n);
        $t = $doc->createElement('title', $title);
        $head->appendChild($t);
        $r = $doc->createElement('meta');
        $r->setAttribute('name', 'referrer');
        $r->setAttribute('content', 'no-referrer');
        $head->appendChild($r);
        $m = $doc->createElement('meta');
        $m->setAttribute('name', 'robots');
        $m->setAttribute('content', 'noindex, nofollow');
        $head->appendChild($m);
    }

    $out = $doc->saveHTML();
    $out = str_replace('<?xml encoding="UTF-8">', '', $out);
    return preg_replace('/<head>/i', '<head><meta charset="utf-8">', $out, 1);
}

function show_message(string $title, string $msg): void {
    header('Content-Type: text/html; charset=utf-8');
    $t = htmlspecialchars($title);
    $m = htmlspecialchars($msg);
    echo "<!doctype html><html><head><meta charset='utf-8'><meta name='robots' content='noindex'>"
       . "<title>$t</title></head><body style='font-family:sans-serif;padding:2rem'>"
       . "<h2>$t</h2><p>$m</p></body></html>";
    exit;
}
