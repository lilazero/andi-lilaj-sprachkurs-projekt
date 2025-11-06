export const courseList = [
  {
    id: "1",
    title: "German A1",
    level: "Beginner",
    imageUrl:
      "https://cdn.pixabay.com/photo/2024/01/18/10/37/letter-tiles-8516699_960_720.jpg",
    courseDuration: "2 weeks",
    description: "An introductory course to German language.",
    price: 1000,
    graduates: 4400,
    rating: 2,
    //the first one will be shown when card is collapsed
    tags: ["available online", "introductory", "books included"],
    reviews: 2048,
    features: [
      { icon: "Laptop", text: "The entire course can be done online" },
      { icon: "BookAIcon", text: "E-books" },
      { icon: "Fingerprint", text: "Extra homework by request" },
      { icon: "Mic", text: "Questions in English possible" },
    ],
  },
  {
    id: "2",
    title: "German A2",
    level: "Elementary",
    imageUrl:
      "https://cdn.pixabay.com/photo/2024/01/18/10/37/letter-tiles-8516699_960_720.jpg",
    courseDuration: "1 Month",
    description: "A Course building on the basics of German language.",
    price: 79.99,
    graduates: 1000,
    rating: 2,
    tags: ["basic", "extra practice"],
    reviews: 1024,
  },
  {
    id: "3",
    title: "German B1",
    level: "Intermediate",
    imageUrl:
      "https://cdn.pixabay.com/photo/2015/07/07/09/45/language-school-834138_960_720.jpg",
    courseDuration: "1 Year",
    description: "Mid-level course to enhance German skills.",
    price: 1500,
    graduates: 1100,
    rating: 4,
    tags: ["introductory"],
    reviews: 512,
  },
  {
    id: "4",
    title: "German B2",
    level: "Advanced",
    imageUrl:
      "https://cdn.pixabay.com/photo/2018/01/23/13/25/book-3101450_960_720.jpg",
    courseDuration: "1 Year",
    description:
      "With a B2 level, you can understand the main ideas of complex texts on both concrete and abstract topics, including technical discussions in your field of specialization.",
    price: 1500,
    graduates: 800,
    rating: 4,
    reviews: 256,
  },
  {
    id: "5",
    title: "German C1",
    level: "Proficient",
    imageUrl:
      "https://cdn.pixabay.com/photo/2018/06/28/23/08/german-3504961_1280.jpg",
    courseDuration: "1 Year",
    description:
      "A course designed for advanced learners aiming for proficiency.",
    price: 2000,
    graduates: 340,
    rating: 5,
    reviews: 128,
  },
  {
    id: "6",
    title: "German C2",
    level: "Mastery",
    imageUrl:
      "https://cdn.pixabay.com/photo/2022/04/06/20/29/airplane-7116299_640.jpg",
    courseDuration: "1 Year",
    description: "The C2 level signifies mastery of the language",
    price: 2000,
    graduates: 123,
    rating: 8,
    tags: ["beginner", "basic", "introductory"], //Normalization much?
    reviews: 64,
  },
];
