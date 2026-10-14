export const personalInfo = {
  name: "Rubinraj K",
  role: "Computer Science & Engineering Undergraduate",
  tagline: "COMPUTER SCIENCE & ENGINEERING",
  titles: [
    "Software Developer",
    "MERN Stack Developer",
    "Full Stack Developer",
    "Problem Solver"
  ],
  bio: "Computer Science and Engineering undergraduate passionate about building scalable applications, intelligent systems, and modern web experiences.",
  careerObjective: "Computer Science and Engineering undergraduate with hands-on experience in Java, C++, web development, MERN stack technologies, SQL, and MongoDB. Passionate about software development, scalable systems, and problem solving, with a strong interest in building impactful applications and continuously expanding technical expertise.",
  education: {
    institution: "Karpagam Academy of Higher Education",
    degree: "Bachelor of Engineering",
    department: "Computer Science & Engineering",
    period: "2023 – 2027",
    cgpa: "7.8 / 10",
    location: "Coimbatore, Tamil Nadu",
    highlights: [
      "Core Foundations: Data Structures & Algorithms, OOPs (Java & C++)",
      "Database Systems: SQL & NoSQL Architecture, Query Optimization",
      "Full-Stack Engineering: Client-Server Architecture, REST APIs"
    ]
  },
  contact: {
    email: "rubinrajkumar26@gmail.com",
    phone: "+91 9150683882",
    linkedin: "https://www.linkedin.com/in/rubinraj-k-a1b4ba387/",
    github: "https://github.com/rubinks",
    location: "Tamil Nadu, India"
  },
  resumeUrl: "/Rubinraj_K_Resume.pdf",
  stats: [
    { label: "B.E. CSE", value: "2023–2027", sub: "Undergraduate" },
    { label: "Academic CGPA", value: "7.8/10", sub: "Consistent Performance" },
    { label: "Internships", value: "2+", sub: "Industry Experiences" },
    { label: "Featured Projects", value: "2", sub: "Full Stack & AI Systems" }
  ]
};

export const experiences = [
  {
    id: "yardstick",
    company: "Yardstick Digital Solutions",
    role: "MERN Stack Intern",
    period: "July 2024",
    type: "Internship",
    badge: "Full Stack Development",
    bullets: [
      "Completed a one-month internship focused on MERN stack development.",
      "Worked with MongoDB, Express.js, React.js, and Node.js.",
      "Collaborated with team members to implement and debug application features following industry-standard development practices."
    ],
    tech: ["MongoDB", "Express.js", "React.js", "Node.js", "REST APIs", "Git"]
  },
  {
    id: "idigisoft",
    company: "iDigisoft Technologies",
    role: "Web Development Intern",
    period: "May 2025",
    type: "Internship",
    badge: "Web Engineering",
    bullets: [
      "Successfully completed a one-month internship in Web Development.",
      "Gained practical experience in designing and developing web applications.",
      "Applied responsive design principles and performed testing to ensure compatibility across different browsers and devices."
    ],
    tech: ["HTML5", "CSS3", "JavaScript", "Responsive UI", "Cross-Browser Testing"]
  }
];

export const projects = [
  {
    id: "inventory-management",
    number: "01",
    title: "Inventory Management System",
    category: "AI & Full-Stack Application",
    featuredBadge: "AI-Powered",
    description: "Developed an AI-powered inventory management system that uses OCR and Gemini AI to extract bill details and transform unstructured invoice data into structured database records.",
    detailedDescription: "An enterprise-grade inventory intelligence suite engineered to eliminate manual data entry. Integrates optical character recognition with Google Gemini AI for automated unstructured bill parsing, and utilizes Python machine learning modules to project stock depletion and forecast product demand.",
    technologies: ["React.js", "Node.js", "MongoDB", "Python", "Gemini AI"],
    features: [
      "OCR-based bill/invoice processing",
      "Gemini AI integration for unstructured data parsing",
      "Structured inventory data extraction & mapping",
      "Python-based demand forecasting engine",
      "Future stock prediction & trend models",
      "Automated low-stock alerts & threshold triggers",
      "Interactive React analytics dashboard with visual metrics",
      "JWT authentication & secure OTP verification",
      "Real-time inventory monitoring & state sync",
      "RESTful APIs & database query optimization"
    ],
    links: {
      github: "https://github.com/rubinks/inventory_system-main",
      demo: "PROJECT_DEMO_URL"
    },
    metrics: [
      { label: "AI Engine", value: "Gemini AI" },
      { label: "Data Pipeline", value: "OCR to JSON" },
      { label: "Analytics", value: "Real-Time" }
    ]
  },
  {
    id: "url-shortener",
    number: "02",
    title: "URL Shortener",
    category: "Full-Stack Web System",
    featuredBadge: "High Performance",
    description: "Developed a full-stack URL shortener that converts long URLs into compact shareable links with persistent storage and click engagement analytics.",
    detailedDescription: "A robust link compression and analytics service with instantaneous 301/302 HTTP redirection, persistent relational schema via MySQL, real-time click tracking metrics, and safe regex validation against malicious link formatting.",
    technologies: ["React.js", "Node.js", "Express.js", "MySQL"],
    features: [
      "High-speed unique short URL generation algorithm",
      "Instantaneous HTTP URL redirection handler",
      "Strict input validation & malicious URL filtering",
      "MySQL persistent relational storage schema",
      "Real-time click analytics & user engagement insights",
      "Referral & device interaction insights",
      "One-click copy and instant link reuse functionality",
      "Robust error handling & 404 fallback routing",
      "Clean, modern responsive React interface"
    ],
    links: {
      github: "https://github.com/rubinks/url-shortener",
      demo: "PROJECT_DEMO_URL"
    },
    metrics: [
      { label: "Database", value: "MySQL" },
      { label: "Redirection", value: "< 50ms" },
      { label: "Tracking", value: "Click Analytics" }
    ]
  }
];

export const skillCategories = [
  {
    category: "PROGRAMMING",
    icon: "Code",
    description: "Core algorithmic thinking and object-oriented architectures",
    skills: [
      { name: "Java", level: "Core / OOP", icon: "Coffee", color: "#f89820" },
      { name: "C++", level: "Data Structures & STL", icon: "Binary", color: "#00599c" },
      { name: "Python", level: "Basics & Scripting", icon: "Terminal", color: "#3776ab" }
    ]
  },
  {
    category: "WEB DEVELOPMENT",
    icon: "Layout",
    description: "Modern responsive web applications and full-stack systems",
    skills: [
      { name: "HTML5", level: "Semantic Markup", icon: "Globe", color: "#e34f26" },
      { name: "CSS3", level: "Modern Styling & Grid", icon: "Palette", color: "#1572b6" },
      { name: "JavaScript", level: "ES6+ Logic & Async", icon: "Code2", color: "#f7df1e" },
      { name: "MERN Stack", level: "Mongo, Express, React, Node", icon: "Layers", color: "#00d8ff" }
    ]
  },
  {
    category: "DATABASES",
    icon: "Database",
    description: "Relational & Document data modeling and management",
    skills: [
      { name: "MySQL", level: "Relational Schemas & Queries", icon: "Database", color: "#4479a1" },
      { name: "MongoDB", level: "NoSQL Document Collections", icon: "Server", color: "#47a248" }
    ]
  },
  {
    category: "DEVELOPER TOOLS",
    icon: "Wrench",
    description: "Development environments, version control, and workflows",
    skills: [
      { name: "VS Code", level: "Primary IDE & Extensions", icon: "Monitor", color: "#007acc" },
      { name: "GitHub", level: "Version Control & Collaboration", icon: "GitBranch", color: "#f05032" }
    ]
  },
  {
    category: "SOFT SKILLS",
    icon: "Users",
    description: "Professional interpersonal and project execution strengths",
    skills: [
      { name: "Teamwork", level: "Cross-functional collaboration", icon: "Users2", color: "#00e5ff" },
      { name: "Adaptability", level: "Rapid technology assimilation", icon: "Zap", color: "#38bdf8" }
    ]
  }
];

export const certifications = [
  {
    title: "Python Fundamentals",
    issuer: "Infosys Springboard",
    year: "2023",
    badge: "Programming",
    credentialId: "INFOSYS-PY-2023",
    link: "CERTIFICATE_URL_PLACEHOLDER",
    accent: "#3b82f6"
  },
  {
    title: "Web Development Basics",
    issuer: "IBM",
    year: "2024",
    badge: "Web Engineering",
    credentialId: "IBM-WEB-2024",
    link: "CERTIFICATE_URL_PLACEHOLDER",
    accent: "#60a5fa"
  },
  {
    title: "Certified System Administrator (CSA)",
    issuer: "ServiceNow",
    year: "2026",
    badge: "Enterprise Platform",
    credentialId: "SERVICENOW-CSA-2026",
    link: "CERTIFICATE_URL_PLACEHOLDER",
    accent: "#00d2ff"
  },
  {
    title: "Certified Application Developer (CAD)",
    issuer: "ServiceNow",
    year: "2026",
    badge: "Enterprise Development",
    credentialId: "SERVICENOW-CAD-2026",
    link: "CERTIFICATE_URL_PLACEHOLDER",
    accent: "#38bdf8"
  }
];
