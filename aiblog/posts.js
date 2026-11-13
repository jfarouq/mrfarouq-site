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
//  prompt – the exact prompt the student used
//  quote  – the student's own reflection (optional)
//  links  – buttons under the post (optional)
//  tags   – topics; clicking a tag shows only those posts
// ============================================================

const POSTS = [
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
