// mockData.js
let mockProjects = [
  {
    id: 1,
    name: "Website Redesign",
    isOwner: true,
    description: "Complete overhaul of the company website with modern design principles and improved user experience. Including responsive design, performance optimization, and accessibility improvements.",
    tasks: [
      { id: 1, name: "Design System Creation", completed: false },
      { id: 2, name: "Homepage Wireframes", completed: true },
      { id: 3, name: "User Flow Documentation", completed: false },
      { id: 4, name: "Mobile Responsive Layout", completed: false },
      { id: 5, name: "Performance Optimization", completed: false }
    ],
    attachments: [
      { id: 1, name: "Design_Guidelines.pdf", size: "2.4 MB" },
      { id: 2, name: "Wireframes_v2.fig", size: "1.8 MB" },
      { id: 3, name: "Content_Strategy.docx", size: "856 KB" }
    ]
  },
  {
    id: 2,
    name: "Mobile App Development",
    isOwner: false,
    description: "Development of a cross-platform mobile application using React Native. Features include user authentication, real-time notifications, and offline functionality.",
    tasks: [
      { id: 1, name: "Setup Development Environment", completed: true },
      { id: 2, name: "User Authentication Flow", completed: false },
      { id: 3, name: "Core Features Implementation", completed: false },
      { id: 4, name: "Testing Strategy", completed: false }
    ],
    attachments: [
      { id: 1, name: "Technical_Specs.pdf", size: "1.2 MB" },
      { id: 2, name: "API_Documentation.md", size: "234 KB" }
    ]
  },
  {
    id: 3,
    name: "Database Migration",
    isOwner: true,
    description: "Migration of legacy database systems to a new cloud-based infrastructure with improved performance and scalability.",
    tasks: [
      { id: 1, name: "Data Mapping", completed: true },
      { id: 2, name: "Migration Scripts", completed: true },
      { id: 3, name: "Testing Environment Setup", completed: true },
      { id: 4, name: "Performance Testing", completed: false }
    ],
    attachments: [
      { id: 1, name: "Migration_Plan.pdf", size: "1.5 MB" },
      { id: 2, name: "Database_Schema.sql", size: "945 KB" }
    ]
  },
  {
    id: 4,
    name: "API Integration",
    isOwner: false,
    description: "Integration with third-party APIs to enhance system functionality and data exchange capabilities.",
    tasks: [
      { id: 1, name: "API Documentation Review", completed: true },
      { id: 2, name: "Authentication Setup", completed: true },
      { id: 3, name: "Endpoint Implementation", completed: false },
      { id: 4, name: "Error Handling", completed: false }
    ],
    attachments: [
      { id: 1, name: "API_Specs.pdf", size: "1.8 MB" },
      { id: 2, name: "Integration_Tests.js", size: "654 KB" }
    ]
  },
  {
    id: 5,
    name: "Security Audit",
    isOwner: true,
    description: "Comprehensive security assessment and vulnerability testing of all company systems and infrastructure.",
    tasks: [
      { id: 1, name: "Initial System Scan", completed: true },
      { id: 2, name: "Vulnerability Assessment", completed: true },
      { id: 3, name: "Security Report Draft", completed: false },
      { id: 4, name: "Remediation Planning", completed: false },
      { id: 5, name: "Team Training", completed: false }
    ],
    attachments: [
      { id: 1, name: "Security_Checklist.pdf", size: "1.1 MB" },
      { id: 2, name: "Vulnerability_Report.docx", size: "2.3 MB" },
      { id: 3, name: "Training_Materials.pptx", size: "4.2 MB" }
    ]
  },
  {
    id: 6,
    name: "User Analytics Implementation",
    isOwner: false,
    description: "Implementation of comprehensive user analytics and tracking system to better understand user behavior and improve product decisions.",
    tasks: [
      { id: 1, name: "Analytics Requirements", completed: true },
      { id: 2, name: "Tracking Setup", completed: false },
      { id: 3, name: "Dashboard Creation", completed: false },
      { id: 4, name: "Team Training", completed: false },
      { id: 5, name: "Documentation", completed: false }
    ],
    attachments: [
      { id: 1, name: "Analytics_Plan.pdf", size: "890 KB" },
      { id: 2, name: "Dashboard_Mockups.fig", size: "1.7 MB" },
      { id: 3, name: "Implementation_Guide.docx", size: "1.2 MB" }
    ]
  }
];

// Calculate initial progress for each project
mockProjects = mockProjects.map(project => {
  const completedTasks = project.tasks.filter(task => task.completed).length;
  const totalTasks = project.tasks.length;
  const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  return { ...project, progress };
});

// Function to update project data
export const updateProject = (updatedProject) => {
  mockProjects = mockProjects.map(project => 
    project.id === updatedProject.id ? updatedProject : project
  );
};

export { mockProjects };