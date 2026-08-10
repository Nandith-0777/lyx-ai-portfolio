export const person = {
  fullName: "Nandith Narayanan",
  role: "AI / ML Engineer in the making",
  location: "Thrissur, Kerala, India",
  email: "nandithn01@gmail.com",
  phone: "+91 6282 907 536",
  linkedin: "https://www.linkedin.com/in/nandith-narayanan/",
  github: "https://github.com/Nandith-0777",
};

export const summary =
  "Third-year B.Tech student in Artificial Intelligence & Machine Learning with a strong foundation in Python, deep learning, and LLM engineering. From automation tools used daily by hundreds of college students to RAG pipelines and transformer models built from scratch.";

export const stats = [
  { value: "15s", label: "Feedback flow, down from 15 minutes" },
  { value: "10+", label: "Technical events organised" },
  { value: "2024–28", label: "B.Tech AI & ML, Vidya Academy" },
];

export const projects = [
  {
    name: "Feedback Automator",
    tag: "Automation",
    description:
      "Browser automation for semester feedback forms, with a custom per-faculty rating selector and an interface built for non-technical users.",
    impact: "Cuts a 10–15 minute task to under 15 seconds. Used across the campus.",
    tech: ["Python", "Selenium", "HTML", "CSS", "JavaScript"],
    github: "https://github.com/Nandith-0777/feedback-automator",
    demo: "https://vidyafeedback.netlify.app/",
  },
  {
    name: "OnDotNext",
    tag: "Product",
    description:
      "Attendance overview for the internally built OnDot college app, with a web version in Next.js showing subject-wise attendance at a glance.",
    impact: "Replaces the slow official portal for a large share of students.",
    tech: ["Next.js", "Python", "JavaScript", "CSS"],
    github: "https://github.com/Nandith-0777/OnDotNext",
    demo: "https://on-dot-next.vercel.app/",
  },
  {
    name: "GPT from Scratch",
    tag: "Deep Learning",
    description:
      "Character-level GPT built from first principles: multi-head self-attention, positional encoding, feed-forward layers and layer normalization.",
    impact: "Trained end to end and generated coherent autoregressive output.",
    tech: ["Python", "PyTorch"],
  },
  {
    name: "PDF ChatBot (RAG)",
    tag: "LLM Engineering",
    description:
      "Retrieval-Augmented Generation over PDFs: ingestion, chunking, embeddings, ChromaDB vector storage and semantic retrieval through LangChain.",
    impact: "Grounds every answer in retrieved source content to reduce hallucination.",
    tech: ["LangChain", "ChromaDB", "OpenAI API", "Python"],
  },
  {
    name: "Color Detection",
    tag: "Computer Vision",
    description:
      "Real-time webcam color detection using HSV masking, contour detection and dynamic bounding boxes.",
    impact: "Runs live on webcam input.",
    tech: ["OpenCV", "NumPy", "Pillow"],
    github: "https://github.com/Nandith-0777/color-detection",
  },
  {
    name: "Burglary Detection",
    tag: "Computer Vision",
    description:
      "Motion detection through frame differencing and contour analysis, with automatic saving of motion frames and console alerts.",
    impact: "Highlights movement in real time.",
    tech: ["Python", "OpenCV"],
    github: "https://github.com/Nandith-0777/Burglary-Detection",
  },
];

export const skillGroups = [
  { title: "Languages", items: ["Python", "C++", "Java", "HTML", "CSS"] },
  {
    title: "ML & AI Libraries",
    items: ["NumPy", "Pandas", "Keras", "PyTorch", "Matplotlib", "OpenCV"],
  },
  {
    title: "LLM Engineering",
    items: ["LangChain", "ChromaDB", "FAISS", "RAG Pipelines", "Transformers"],
  },
  { title: "Tools", items: ["Git", "GitHub", "VS Code"] },
  {
    title: "Concepts",
    items: ["Computer Vision", "Large Language Models", "UI/UX Design", "Bot Automation"],
  },
  { title: "Languages spoken", items: ["English", "Hindi", "Malayalam"] },
];

export const timeline = [
  {
    period: "2024 – Present",
    title: "Learning Coordinator",
    org: "TinkerHub Campus Chapter, Vidya Academy",
    points: [
      "Designed and organised technical courses and workshops.",
      "Organised 10+ events and pre-hackathon bootcamps on React, JavaScript and Node.js.",
      "Coordinated multiple college-level hackathons.",
      "Curated structured learning paths for beginner and intermediate students.",
    ],
  },
  {
    period: "2024 – 2028",
    title: "B.Tech, Artificial Intelligence & Machine Learning",
    org: "Vidya Academy of Science and Technology, Thrissur",
    points: [
      "Coursework: Machine Learning, Computer Vision, Data Structures, OOP, Python, Linear Algebra.",
    ],
  },
  {
    period: "Certifications",
    title: "DeepLearning.AI",
    org: "Andrew Ng",
    points: [
      "Machine Learning and Deep Learning Specialization.",
      "AI For Everyone.",
    ],
  },
];

export const suggestedQuestions = [
  "What are Nandith's strongest technical skills?",
  "Tell me about the RAG chatbot project.",
  "What is his experience with computer vision?",
  "Is he available for internships?",
];
