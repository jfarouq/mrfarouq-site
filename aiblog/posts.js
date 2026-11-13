// ============================================================
//  BLOG POSTS
//  To add a post, copy one block below, paste it at the TOP of
//  the list, and change the details. Newest posts go first.
//
//  title  – post heading
//  date   – "YYYY-MM-DD" (when the work was made)
//  credit – who made it, e.g. "Made by H.M." or "Mr. F"
//  text   – a sentence or two (optional)
//  image  – file name inside the images2 folder (optional)
//  model  – AI model used, e.g. "Firefly" (clickable badge)
//  promptParts – optional labelled lines, e.g. Subject / Setting / Style
//  prompt – the exact prompt the student used
//  quote  – the student's own reflection (optional)
//  links  – buttons under the post (optional)
//  tags   – topics; clicking a tag shows only those posts
// ============================================================

const POSTS = [
  {
    title: "Polar Bear's Noodle Break on a Surfboard",
    date: "2026-09-21",
    credit: "Made by T.P.",
    model: "Firefly",
    prompt: "A small polar bear with a daisy flower hair clip. He is sitting on a surfboard eating instant noodles on a beach with lots of coral reefs and small colorful fishes swimming underneath on a sunny day during summer. The image in a style of cartoon drawings",
    quote: "It means because its AI are mainly trained on licensed content, not taking random content from the internet. So others can use the generative content without worrying about copyright",
    image: "blog_2026-09-21_tp_firefly.jpg",
    tags: ["Image Generation"]
  },
  {
    title: "Snow Leopard Above the Clouds",
    date: "2026-09-18",
    credit: "Made by T.N.",
    model: "Firefly",
    prompt: "A majestic snow leopard resting on a rocky mountain peak, surrounded by misty clouds, cinematic nature photography style with soft morning light and realistic details.",
    quote: "They designed Firefly so that businesses can use the generated content with a lower risk of accidentally infringing someone else’s copyright or intellectual property.",
    image: "blog_2026-09-18_tn_firefly.jpg",
    tags: ["Image Generation"]
  },
  {
    title: "Panda's Fast-Food Feast on the Tennis Court",
    date: "2026-09-17",
    credit: "Made by L.N.",
    model: "Firefly",
    prompt: "make me a fat panda eating fast food on a tennis court in a cartoon style",
    quote: "When Adobe Firefly says \"commercially safe\" it implies that the generated image is safe for using without a risk of copyright. The image generated doesn't rely on training inputs or create outputs based on other artists.",
    image: "blog_2026-09-17_ln_firefly.jpg",
    tags: ["Image Generation"]
  },
  {
    title: "Mountain Ravine on a Cloudy Day",
    date: "2026-09-16",
    credit: "Made by K.N.",
    model: "Firefly",
    prompt: "Subject: Mountain range with a ravine\nSetting: Day time, cloudy\nStyle: Realistic photo\nPrompt: Create me an image in the style of a realistic photo of a mountain clif with a ravine",
    quote: "Adobe Firefly refers to commercially safe as using pictures without the worry of copyrights.",
    image: "blog_2026-09-16_kn_firefly.jpg",
    tags: ["Image Generation"]
  },
  {
    title: "Comic-Style Student in New York City",
    date: "2026-09-15",
    credit: "Made by H.C.",
    model: "Firefly",
    prompt: "give me a comic style (uses bold lines, flat or halftone shading, and dynamic compositions to tell visual stories) drawing of a student walking around Newyork city. make the colors less colorful, mutual colors. make it less realistic looking drawing style.",
    quote: "When Adobe Firefly says \"commercially safe\" it means that I can use the picture without worrying about copyrights.",
    image: "blog_2026-09-15_hc_firefly.jpg",
    tags: ["Image Generation"]
  },
  {
    title: "Full STEAM: Teachable Machine",
    date: "2025-02-22",
    credit: "Mr. F",
    text: "Training an image classifier with Google's Teachable Machine. Try the class demo, or start a model of your own.",
    links: [
      { label: "Teachable Machine Demo", url: "https://teachablemachine.withgoogle.com/train/image/1nwvYY7rsFjJfLWMZmrPxIJGi3ErfvVw4" },
      { label: "Start Your Own", url: "https://teachablemachine.withgoogle.com/train/image" }
    ],
    tags: ["Teachable Machine", "Machine Learning"]
  },
  {
    title: "U11 Boys Basketball Tryout Flyer",
    date: "2025-01-22",
    credit: "Mr. F",
    text: "For the upcoming U11 Boys Basketball season, I made a tryout flyer using the image generation and editing tools we have been learning about. Made with DALL-E 3 and Canva.",
    image: "U11_Tryouts.png",
    tags: ["DALL-E 3", "Generative AI"]
  }
];
