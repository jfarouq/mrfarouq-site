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
//  video  – mp4 file name inside the videos folder (optional, used instead of image)
//  poster – still image shown before the video plays (images2 folder)
//  model  – AI model used, e.g. "Firefly" (shown as a tag at the bottom)
//  promptParts – optional labelled lines, e.g. Subject / Setting / Style
//  prompt – the exact prompt the student used
//  quote  – the student's own reflection (optional)
//  links  – buttons under the post (optional)
//  tags   – topics; clicking a tag shows only those posts
// ============================================================

const POSTS = [
  {
    title: "Impossible Image Challenge",
    date: "2026-11-26",
    credit: "Made by T.L.",
    model: "Nano Banana 2",
    prompt: "Make an image of a upside down skyscraper reflecting onto the window of another skyscraper and reflect it 5 more times. Invert the image and put 5 red circles around it. Draw an image of a boy doing a backflip and make his head made of abstract shapes. The boy doing the backflip is inverted, reflected, upside down, and black and white. Add 4 blue circles and 30 kangaroos made out of water and mud and glass and make it jump on the boy while the kangaroo has his limbs spread out and eating, jumping, smiling",
    image: "blog_2026-11-26_tl_nanobanana2_impossible.jpg",
    tags: ["Image Generation", "Gemini"]
  },
  {
    title: "Vampire Dragon Mascot",
    date: "2026-10-30",
    credit: "Made by C.H.",
    model: "Nano Banana 2",
    prompt: "Create a colorful, cartoon-style illustration of the SSIS blue dragon mascot dressed as a vampire for Halloween, standing in front of the SSIS school building at night, surrounded by glowing jack-o-lanterns, floating ghosts, bats, and cobwebs, with spooky purple and orange lighting, a vibrant Halloween color scheme, a front-facing perspective, and a fun, slightly spooky 3D animated style.",
    image: "blog_2026-10-30_ch_nanobanana2_vampiredragon.jpg",
    tags: ["Image Generation", "Gemini"]
  },
  {
    title: "Dragon vs. the Potato Witches",
    date: "2026-10-30",
    credit: "Made by I.A.",
    model: "Nano Banana 2",
    prompt: "A whimsical, action-packed 3D animated scene on a high school campus under gloomy, overcast storm clouds. A swarm of funny, evil mutant potato witches with gnarled faces and tiny black witch hats fly frantically on wooden broomsticks. In the foreground, a cute, friendly blue dragon mascot wearing a school crest collar proudly defends the campus, breathing a bright stream of blue and gold fire. Mid-air, the fire hits the potato witches, transforming them into steaming baked potatoes topped with melting butter and chives. Playful expressions, dynamic cinematic composition, humorous tone, high detail.",
    image: "blog_2026-10-30_ia_nanobanana2_potatowitches.jpg",
    tags: ["Image Generation", "Gemini"]
  },
  {
    title: "Dragon Mascot Hands Out Halloween Candy",
    date: "2026-10-30",
    credit: "Made by A.V.",
    model: "Nano Banana 2",
    prompt: "Create me an image for Halloween that has a blue SSIS mascot dragon giving out candies to kids at night at a neighbourhood and the house is decorated with props.",
    image: "blog_2026-10-30_av_nanobanana2_candy.jpg",
    tags: ["Image Generation", "Gemini"]
  },
  {
    title: "Little Blue Dragon at the Haunted House",
    date: "2026-10-30",
    credit: "Made by T.P.",
    model: "Nano Banana 2",
    prompt: "Create a painting of a small blue dragon at an indoor haunted house hosted by an international school in Vietnam, with dark environment but red soft light around the haunted house with ghost decorations, showing the front view of the haunted house with the dragon in the middle trying to scare students, make it studio ghibli art style",
    image: "blog_2026-10-30_tp_nanobanana2_hauntedhouse.jpg",
    tags: ["Image Generation", "Gemini"]
  },
  {
    title: "Witch-Hat Dog by the Fireplace",
    date: "2026-10-30",
    credit: "Made by A.T.",
    model: "Nano Banana 2",
    prompt: "Generate a painting of a dog wearing a witch hat with soft lighting and a dark and cozy indoor setting. it should be a front view with a realistic style background",
    image: "blog_2026-10-30_at_nanobanana2_witchdog.jpg",
    tags: ["Image Generation", "Gemini"]
  },
  {
    title: "Creatures Lurking in the School Hallway",
    date: "2026-10-30",
    credit: "Made by S.C.",
    model: "Nano Banana 2",
    prompt: "A cinematic Halloween photo of several creepy Gollum creatures with pale skin, large glowing eyes, and ragged clothes lurking in the hallways, students are watching the gollums, and classrooms of SSIS international school in Ho Chi Minh City, with spooky purple and orange neon lighting, eerie fog, jack-o-lanterns, dark shadows, realistic school architecture, a dramatic low-angle perspective, and highly detailed horror-movie photography style.",
    image: "blog_2026-10-30_sc_nanobanana2_creatures.jpg",
    tags: ["Image Generation", "Gemini"]
  },
  {
    title: "Ghosts in the Dark Classroom",
    date: "2026-10-30",
    credit: "Made by H.C.",
    model: "Nano Banana 2",
    prompt: "a painting of a school, with white tables and there are ghosts all over inside the classroom, walking around while they are standing as the room is dark because the lights are turned off and at the back there is just windows, in 3d render animation style with macro style",
    image: "blog_2026-10-30_hc_nanobanana2_ghosts.jpg",
    tags: ["Image Generation", "Gemini"]
  },
  {
    title: "Halloween Dragon on the Soccer Field",
    date: "2026-10-30",
    credit: "Made by S.L.",
    model: "Nano Banana 2",
    prompt: "Create a digital painting of a cute dragon wearing a witch’s hat and an SSIS hoodie on the school’s soccer field at night, surrounded by glowing jack-o’-lanterns and floating ghosts, with soft moonlight, orange and purple colors, white school buildings in the background, and a front-facing, wide-angle composition in a playful 3D animated movie style.",
    image: "blog_2026-10-30_sl_nanobanana2_dragon.jpg",
    tags: ["Image Generation", "Gemini"]
  },
  {
    title: "Sea Otter Surfing a River of Bubble Tea",
    date: "2026-09-15",
    credit: "Made by S.L.",
    model: "Firefly Image 4",
    prompt: "A baby sea otter wearing colorful swimming goggles, surfing on a giant cookie through a sparkling river of bubble tea on an island made of candy and desserts, in the style of a 1990s Saturday morning cartoon",
    quote: "Adobe Firefly is commercially safe because its models are trained mainly on licensed Adobe Stock content and public domain works whose copyrights have expired. This reduces the risk of copyright infringement, making Firefly generated content safer to use in commercial projects.",
    image: "blog_2026-09-15_sl_firefly.jpg",
    tags: ["Image Generation", "Adobe Firefly"]
  },
  {
    title: "Mr. Farouq: #1 Hooper",
    date: "2026-11-18",
    credit: "Made by H.N.",
    model: "Opus 5.5",
    prompt: "claude, remember the higsfield video you made for me about the guy on the train? now i want you to make a video for my ap computer science teacher, his name is mr farouq, he is an amazing teacher and says a lot of jokes, hes also not that good at basketball but i want you to say hes really good and then make the same type of 3d video maybe with the huzz behind him while hes playing basketball, voiceover too, in english, 30 seconds, dad jokes.",
    video: "blog_2026-11-18_hn_opus.mp4",
    poster: "blog_2026-11-18_hn_opus_poster.jpg",
    tags: ["Video Generation", "Higgsfield AI", "Speko", "Claude"]
  },
  {
    title: "Post-Impressionist Desert Horizon",
    date: "2026-09-25",
    credit: "Made by J.A.",
    model: "Firefly Image 4",
    prompt: "create a painting of a man standing in a dessert, arms out towards the horizon, Generate an image in a Post-Impressionist style with thick impasto paint, kinetic swirling brushstrokes, and intense complementary colors like vibrant yellows and deep blues.",
    quote: "Commercially safe means that the images can be used without a copyright, meaning they are safe for companies to use to advertise",
    image: "blog_2026-09-25_ja_firefly.jpg",
    tags: ["Image Generation", "Adobe Firefly"]
  },
  {
    title: "The Snail-Shell Staircase",
    date: "2026-09-24",
    credit: "Made by L.Z.",
    model: "Firefly Image 4",
    prompt: "Close-up macro of a snail whose shell is a spiral staircase, with a very small businessman climbing it, briefcase in hand. Shallow depth of field, morning dew, National Geographic lighting.",
    quote: "I think being commercially safe for image generation means there is no copyright image scraping, clean training data, and legal protection.",
    image: "blog_2026-09-24_lz_firefly.jpg",
    tags: ["Image Generation", "Adobe Firefly"]
  },
  {
    title: "Coastal Highway Cruise in a Teal Convertible",
    date: "2026-09-23",
    credit: "Made by P.T.",
    model: "Firefly Image 4",
    prompt: "Generate an image of a doll with brown hair and a pink dress driving a teal convertible down the coastal highway. Make the image in a realistic style.",
    quote: "Commercially safe models refer to AI systems that are safe for businesses to use without risking copyright infringement. I believe these models are trained with inputs that aren't copyright protected, making the outputs credit-free.",
    image: "blog_2026-09-23_pt_firefly.jpg",
    tags: ["Image Generation", "Adobe Firefly"]
  },
  {
    title: "Gold-Chain Shark Steps Up to Bat",
    date: "2026-09-22",
    credit: "Made by D.T.",
    model: "Firefly Image 4",
    prompt: "a muscular shark with a gold chain batting at a baseball game on a hot sunny day. the style is cartoon art",
    quote: "I think what Adobe Firefly means when they say that their models are commercially safe is that the AI model is built to be used in business and advertising without risking copyright infringement lawsuits or intellectual property violations with other communities of people.",
    image: "blog_2026-09-22_dt_firefly.jpg",
    tags: ["Image Generation", "Adobe Firefly"]
  },
  {
    title: "Polar Bear's Noodle Break on a Surfboard",
    date: "2026-09-21",
    credit: "Made by T.P.",
    model: "Firefly Image 4",
    prompt: "A small polar bear with a daisy flower hair clip. He is sitting on a surfboard eating instant noodles on a beach with lots of coral reefs and small colorful fishes swimming underneath on a sunny day during summer. The image in a style of cartoon drawings",
    quote: "It means because its AI are mainly trained on licensed content, not taking random content from the internet. So others can use the generative content without worrying about copyright",
    image: "blog_2026-09-21_tp_firefly.jpg",
    tags: ["Image Generation", "Adobe Firefly"]
  },
  {
    title: "Snow Leopard Above the Clouds",
    date: "2026-09-18",
    credit: "Made by T.N.",
    model: "Firefly Image 4",
    prompt: "A majestic snow leopard resting on a rocky mountain peak, surrounded by misty clouds, cinematic nature photography style with soft morning light and realistic details.",
    quote: "They designed Firefly so that businesses can use the generated content with a lower risk of accidentally infringing someone else’s copyright or intellectual property.",
    image: "blog_2026-09-18_tn_firefly.jpg",
    tags: ["Image Generation", "Adobe Firefly"]
  },
  {
    title: "Panda's Fast-Food Feast on the Tennis Court",
    date: "2026-09-17",
    credit: "Made by L.N.",
    model: "Firefly Image 4",
    prompt: "make me a fat panda eating fast food on a tennis court in a cartoon style",
    quote: "When Adobe Firefly says \"commercially safe\" it implies that the generated image is safe for using without a risk of copyright. The image generated doesn't rely on training inputs or create outputs based on other artists.",
    image: "blog_2026-09-17_ln_firefly.jpg",
    tags: ["Image Generation", "Adobe Firefly"]
  },
  {
    title: "Mountain Ravine on a Cloudy Day",
    date: "2026-09-16",
    credit: "Made by K.N.",
    model: "Firefly Image 4",
    prompt: "Subject: Mountain range with a ravine\nSetting: Day time, cloudy\nStyle: Realistic photo\nPrompt: Create me an image in the style of a realistic photo of a mountain clif with a ravine",
    quote: "Adobe Firefly refers to commercially safe as using pictures without the worry of copyrights.",
    image: "blog_2026-09-16_kn_firefly.jpg",
    tags: ["Image Generation", "Adobe Firefly"]
  },
  {
    title: "Comic-Style Student in New York City",
    date: "2026-09-15",
    credit: "Made by H.C.",
    model: "Firefly Image 4",
    prompt: "give me a comic style (uses bold lines, flat or halftone shading, and dynamic compositions to tell visual stories) drawing of a student walking around Newyork city. make the colors less colorful, mutual colors. make it less realistic looking drawing style.",
    quote: "When Adobe Firefly says \"commercially safe\" it means that I can use the picture without worrying about copyrights.",
    image: "blog_2026-09-15_hc_firefly.jpg",
    tags: ["Image Generation", "Adobe Firefly"]
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
    tags: ["Image Generation", "ChatGPT", "DALL-E 3", "Canva"]
  }
];
