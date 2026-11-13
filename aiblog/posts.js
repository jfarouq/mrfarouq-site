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
//  links  – buttons under the post (optional)
//  tags   – topics; clicking a tag shows only those posts
// ============================================================

const POSTS = [
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
