// Personal information
export const personalInfo = {
  name: "Jane Doe",
  title: "Software Developer",
  bio: "I create elegant solutions to complex problems, specializing in web development and data analytics. Let's build something amazing together.",
  location: "Seattle, Washington",
  email: "jane.doe@example.com",
  profileImage: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
  about: {
    background: "I'm a passionate software developer with over 5 years of experience building web applications and solving complex data challenges. My journey began with a Computer Science degree and has evolved through roles at startups and enterprise organizations where I've honed my technical and leadership skills.",
    additional: "I believe in creating technology that makes a positive impact. When I'm not coding, you can find me hiking in the mountains, experimenting with new recipes, or volunteering at local tech mentorship programs. I'm currently based in Seattle, WA."
  },
  social: {
    linkedin: "https://linkedin.com",
    github: "https://github.com",
    twitter: "https://twitter.com",
    dribbble: "https://dribbble.com"
  }
};

// Skills
export const technicalSkills = [
  { name: "JavaScript", icon: "javascript" },
  { name: "React", icon: "react" },
  { name: "Node.js", icon: "nodejs" },
  { name: "Python", icon: "python" },
  { name: "SQL", icon: "database" },
  { name: "MongoDB", icon: "database" },
  { name: "AWS", icon: "cloud" },
  { name: "Docker", icon: "container" },
  { name: "GraphQL", icon: "api" },
  { name: "TypeScript", icon: "typescript" }
];

export const softSkills = [
  { name: "Team Leadership", icon: "users" },
  { name: "Communication", icon: "comments" },
  { name: "Project Management", icon: "tasks" },
  { name: "Problem-Solving", icon: "lightbulb" },
  { name: "Time Management", icon: "clock" },
  { name: "Critical Thinking", icon: "brain" }
];

// Education
export const education = [
  {
    degree: "Master of Science in Computer Science",
    school: "Stanford University",
    period: "2015 - 2017",
    gpa: "3.9/4.0",
    description: "Specialized in Machine Learning and Distributed Systems. Thesis: \"Optimizing Neural Networks for Edge Computing Environments.\""
  },
  {
    degree: "Bachelor of Science in Computer Science",
    school: "University of Washington",
    period: "2011 - 2015",
    gpa: "3.8/4.0",
    description: "Minor in Mathematics. Member of the Computer Science Honor Society. Coursework in Algorithms, Data Structures, and Software Engineering."
  }
];

// Work Experience
export const experience = [
  {
    position: "Senior Software Engineer",
    company: "Amazon Web Services",
    period: "Jan 2020 - Present",
    location: "Seattle, WA",
    responsibilities: [
      "Lead a team of 5 engineers developing microservices architecture for high-traffic applications",
      "Implemented CI/CD pipelines that reduced deployment time by 60%",
      "Designed and built RESTful APIs handling 5M+ requests daily",
      "Mentored junior developers and conducted technical interviews"
    ]
  },
  {
    position: "Software Engineer",
    company: "Tech Startup Inc.",
    period: "Mar 2017 - Dec 2019",
    location: "San Francisco, CA",
    responsibilities: [
      "Developed React.js front-end components and Node.js back-end services",
      "Optimized MongoDB database queries resulting in 40% performance improvement",
      "Collaborated in an agile environment with 2-week sprint cycles",
      "Implemented user authentication and authorization using JWT"
    ]
  }
];

// Projects
export const projects = [
  {
    title: "E-commerce Dashboard",
    description: "A real-time analytics dashboard for e-commerce platforms with inventory management, sales forecasting, and customer insights.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500",
    technologies: ["React", "Redux", "Node.js", "MongoDB"],
    github: "https://github.com",
    demo: "https://demo.com"
  },
  {
    title: "Fitness Tracker App",
    description: "A mobile app that tracks workouts, monitors nutrition, and provides personalized fitness recommendations using machine learning.",
    image: "https://pixabay.com/get/g0269a288f59ad3a531d447333b3df50c4d65d576ef33f932ffbd88c83efde5912ac7c4ec1eb232f9a904aef0502ea7982156f0a6cb0568089dbb8d7523b60c3a_1280.jpg",
    technologies: ["React Native", "Firebase", "TensorFlow"],
    github: "https://github.com",
    demo: "https://demo.com"
  },
  {
    title: "Climate Data Visualization",
    description: "An interactive platform that visualizes climate change data with predictive models and educational resources.",
    image: "https://images.unsplash.com/photo-1543286386-2e659306cd6c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500",
    technologies: ["D3.js", "Python", "Django", "PostgreSQL"],
    github: "https://github.com",
    demo: "https://demo.com"
  }
];
