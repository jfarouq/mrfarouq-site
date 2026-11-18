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
 * domain to $HIDDEN_DOMAINS.
 */

$COURSES = [
    'apcsa'   => ['AP CSA Daily Agenda',      'https://docs.google.com/document/d/e/2PACX-1vSKqB0Y156N5EXJWhkpIQKE_Zskw98EJMyjYak2Z8zxQ96URzCGQcxw3cd6gWmhhavYsp-LtBfu11QB/pub'],
    'apcsp'   => ['AP CSP Daily Agenda',      'https://docs.google.com/document/d/e/2PACX-1vQOWbm8hJ4ID1n0rxOaGvb5M5bLCXElSroPSb-qMsiyxFJOZ4peHq9D9ryHMzlsXags_Xd-_w_YRd0O/pub'],
    'introai' => ['Intro to AI Daily Agenda', 'https://docs.google.com/document/d/e/2PACX-1vRtvx1XbbG4OSriAozE_DGtxpAC2-1LcNcklZ5I4Ju7KPuwZ0q4iYjO77XaWeRWxJZuRurNGBizTP2-/pub'],
];

$HIDDEN_DOMAINS = ['padlet.com', 'padlet.org', 'padlet.site'];
$CACHE_SECONDS  = 120;

header('X-Robots-Tag: noindex, nofollow');

$key = strtolower(preg_replace('/[^a-z]/i', '', $_GET['c'] ?? ''));
if (!isset($COURSES[$key])) {
    http_response_code(404);
    show_message('Agenda not found', 'That agenda does not exist.');
}
[$title, $source] = $COURSES[$key];

/* ---------- fetch (with a short cache) ---------- */
$cacheFile = sys_get_temp_dir() . '/mrfarouq_agenda_' . $key . '.html';
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
    $urlRegex = '/(https?:\/\/)?([a-z0-9-]+\.)*(' . $domainPattern . ')\S*/i';

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

    // 3. Remove Google's own header/footer links that point back to the doc.
    foreach (['//div[@id="header"]', '//div[@id="footer"]', '//*[@id="banners"]'] as $q) {
        foreach (iterator_to_array($xp->query($q)) as $n) $n->parentNode->removeChild($n);
    }

    // 4. Page title, no indexing, and a little breathing room.
    $head = $xp->query('//head')->item(0);
    if ($head) {
        foreach (iterator_to_array($xp->query('//head/title')) as $n) $head->removeChild($n);
        $t = $doc->createElement('title', $title);
        $head->appendChild($t);
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
