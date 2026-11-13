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
    title: "The Snail-Shell Staircase",
    date: "2026-09-24",
    credit: "Made by L.Z.",
    model: "Firefly",
    prompt: "Close-up macro of a snail whose shell is a spiral staircase, with a very small businessman climbing it, briefcase in hand. Shallow depth of field, morning dew, National Geographic lighting.",
    quote: "I think being commercially safe for image generation means there is no copyright image scraping, clean training data, and legal protection.",
    image: "blog_2026-09-24_lz_firefly.jpg",
    tags: ["Image Generation"]
  },
  {
    title: "Coastal Highway Cruise in a Teal Convertible",
    date: "2026-09-23",
    credit: "Made by P.T.",
    model: "Firefly",
    prompt: "Generate an image of a doll with brown hair and a pink dress driving a teal convertible down the coastal highway. Make the image in a realistic style.",
    quote: "Commercially safe models refer to AI systems that are safe for businesses to use without risking copyright infringement. I believe these models are trained with inputs that aren't copyright protected, making the outputs credit-free.",
    image: "blog_2026-09-23_pt_firefly.jpg",
    tags: ["Image Generation"]
  },
  {
    title: "Gold-Chain Shark Steps Up to Bat",
    date: "2026-09-22",
    credit: "Made by D.T.",
    model: "Firefly",
    prompt: "a muscular shark with a gold chain batting at a baseball game on a hot sunny day. the style is cartoon art",
    quote: "I think what Adobe Firefly means when they say that their models are commercially safe is that the AI model is built to be used in business and advertising without risking copyright infringement lawsuits or intellectual property violations with other communities of people.",
    image: "blog_2026-09-22_dt_firefly.jpg",
    tags: ["Image Generation"]
  },
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
