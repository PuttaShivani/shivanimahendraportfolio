import { PortfolioData } from '@/types';

export const portfolioData: PortfolioData = {
    personal: {
        name: 'Putta Shivani',
        title: 'full stack developer',
        subtitle: 'B.Tech ECE Graduate | Full Stack Engineer',
        bio: 'Motivated B.Tech (ECE) graduate with hands-on experience in building responsive web applications using React and Node.js. Skilled in developing scalable front-end architectures and RESTful APIs. Strong problem-solving ability with a focus on clean, efficient code and user-friendly design.',
        avatar: '/shivaniimage.png',
        location: ' Siddipet , Telangana ',
        email: 'puttashivani2003@gmail.com',
        phone: '+91 9493692116',
        resumeUrl: '/ShivaniMahendra_resume.docx',
        website: 'https://portfolio-shivani-five.vercel.app/',
        languages: [
            { name: 'English', level: 'Fluent' },
            { name: 'Telugu', level: 'Native' },
        ],
        socialLinks: [
            { platform: 'LinkedIn', url: 'https://www.linkedin.com/in/shivanimahendra/', icon: 'linkedin' },
            { platform: 'GitHub', url: 'https://github.com/PuttaShivani', icon: 'github' },
            { platform: 'Portfolio', url: 'https://portfolio-shivani-five.vercel.app/', icon: 'globe' },
        ],
    },
    projects: [
        {
            id: 'project-1',
            slug: 'mfa-role-based-authentication-system',
            title: 'MFA & Role-Based Authentication System',
            image: '/MFAImg.png',
            description: 'Developed a secure CRM authentication system implementing MFA with Microsoft Authenticator and multiple authentication mechanisms, including JWT, OAuth 2.0, and API Key authentication.',
            longDescription: 'Developed a secure CRM authentication system implementing Multi-Factor Authentication (MFA) with Microsoft Authenticator and multiple authentication mechanisms, including JWT, OAuth 2.0, and API Key authentication. Implemented JWT token validation and verification to secure API requests and protect sensitive CRM resources. Designed Role-Based Access Control (RBAC) to manage user permissions and restrict access based on roles. Gained hands-on experience evaluating and integrating different authentication approaches to strengthen the CRM application\'s overall security.',
            techStack: ['MFA', 'JWT', 'OAuth 2.0', 'API Keys', 'RBAC', 'Microsoft Authenticator', 'Node.js', 'Express.js'],
            tools: ['Microsoft Authenticator', 'Postman', 'VS Code', 'Git', 'JWT'],
            status: 'completed',
            repoUrl: 'https://github.com/PuttaShivani',
            demoUrl: 'https://github.com/PuttaShivani',
            startDate: '2025-01-01',
            role: 'Backend / Security Engineer',
            customTimeline: '2025 – 2026',
            team: 'Security Engineering Team',
            highlights: [
                'Developed a secure CRM authentication system implementing MFA with Microsoft Authenticator and multiple authentication mechanisms, including JWT, OAuth 2.0, and API Key authentication.',
                'Implemented JWT token validation and verification to secure API requests and protect sensitive CRM resources.',
                'Designed Role-Based Access Control (RBAC) to manage user permissions and restrict access based on roles.',
                'Gained hands-on experience evaluating and integrating different authentication approaches to strengthen the CRM application\'s overall security.',
                'Evaluated and applied different authentication approaches based on security requirements, use cases, and API access patterns.'
            ],
            category: 'Security & Backend Architecture',
            features: [
                {
                    title: 'Authentication & Security System',
                    items: [
                        '**Multi-Factor Auth**: Microsoft Authenticator TOTP integration for second-factor security.',
                        '**Multi-Mechanism Support**: JWT token validation, OAuth 2.0 flows, and API Key authentication.',
                        '**Role-Based Access Control (RBAC)**: Fine-grained user role management and resource access protection.'
                    ]
                }
            ],
            challengesAndSolutions: [
                {
                    problem: 'Supporting diverse authentication strategies (OAuth 2.0, JWT, API Keys) while maintaining consistent RBAC validation.',
                    solution: 'Engineered modular authentication middleware pipelines in Express.js with unified user identity context.'
                }
            ]
        },
        {
            id: 'project-2',
            slug: 'vendor-vortex-full-stack',
            title: 'Vendor Vortex',
            image: '/vendarvortex.png',
            description: 'Developed a full-stack web application using React.js, React Router, JavaScript (ES6), HTML5, and CSS3, following a scalable component-based architecture for a Single-Page Application (SPA).',
            longDescription: 'Developed a full-stack web application using React.js, React Router, JavaScript (ES6), HTML5, and CSS3, following a scalable component-based architecture for a Single-Page Application (SPA). Implemented React Hooks, state management, responsive UI design, and efficient routing/navigation to deliver a seamless user experience. Built robust backend services using Node.js and Express.js, developing RESTful APIs and reusable middleware for application functionality. Integrated MongoDB as the NoSQL database for efficient data storage, retrieval, and management across the application. Implemented frontend–backend integration and API communication, ensuring seamless data flow between the React UI, Express.js services, and MongoDB database.',
            techStack: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JavaScript (ES6)', 'HTML5', 'CSS3', 'React Router'],
            tools: ['React.js', 'Node.js', 'MongoDB', 'Postman', 'VS Code', 'Git'],
            status: 'completed',
            repoUrl: 'https://github.com/PuttaShivani/Suby_react_dashboard',
            demoUrl: 'https://github.com/PuttaShivani/Suby_react_dashboard',
            startDate: '2024-01-01',
            role: 'Full Stack Developer',
            customTimeline: '2024',
            team: 'Vendor Vortex Team',
            highlights: [
                'Developed a full-stack web application using React.js, React Router, JavaScript (ES6), HTML5, and CSS3, following a scalable component-based architecture for a Single-Page Application (SPA).',
                'Implemented React Hooks, state management, responsive UI design, and efficient routing/navigation to deliver a seamless user experience.',
                'Built robust backend services using Node.js and Express.js, developing RESTful APIs and reusable middleware for application functionality.',
                'Integrated MongoDB as the NoSQL database for efficient data storage, retrieval, and management across the application.',
                'Implemented frontend–backend integration and API communication, ensuring seamless data flow between the React UI, Express.js services, and MongoDB database.'
            ],
            category: 'Full Stack Web App',
            features: [
                {
                    title: 'Full Stack Architecture & Workflow',
                    items: [
                        '**Component-Based SPA**: Scalable React frontend with hooks and React Router navigation.',
                        '**Backend REST APIs**: Modular Express.js services and custom middleware logic.',
                        '**NoSQL Persistence**: MongoDB data models for vendor management and efficient retrieval.'
                    ]
                }
            ],
            challengesAndSolutions: [
                {
                    problem: 'Managing asynchronous data state synchronization across multi-tiered vendor workflows.',
                    solution: 'Architected structured RESTful endpoints in Express.js coupled with custom React Hooks.'
                }
            ]
        },
        {
            id: 'project-3',
            slug: 'restaurant-rating-prediction-recommendation',
            title: 'Restaurant Rating Prediction & Recommendation',
            image: '/MLProject.png',
            description: 'Developed a machine learning model to predict restaurant ratings by preprocessing datasets, handling missing values, encoding categorical features, and preparing training/testing datasets.',
            longDescription: 'Developed a machine learning model to predict restaurant ratings by preprocessing datasets, handling missing values, encoding categorical features, and preparing training/testing datasets. Trained and evaluated regression models using appropriate performance metrics and analyzed influential features affecting restaurant ratings. Built a content-based restaurant recommendation system using criteria such as cuisine preferences and price range to recommend restaurants based on user preferences. Tested the recommendation system with sample user inputs and evaluated the relevance and quality of the generated restaurant recommendations.',
            techStack: ['Python', 'Machine Learning', 'Scikit-learn', 'Pandas', 'NumPy', 'Regression Models', 'Content-Based Recommendation'],
            tools: ['Jupyter Notebook', 'Python', 'Pandas', 'Scikit-Learn', 'VS Code'],
            status: 'completed',
            repoUrl: 'https://github.com/PuttaShivani',
            demoUrl: 'https://github.com/PuttaShivani',
            startDate: '2024-06-01',
            role: 'ML Engineer / Data Analyst',
            customTimeline: '2024',
            team: 'ML Research Project',
            highlights: [
                'Developed a machine learning model to predict restaurant ratings by preprocessing datasets, handling missing values, encoding categorical features, and preparing training/testing datasets.',
                'Trained and evaluated regression models using appropriate performance metrics and analyzed influential features affecting restaurant ratings.',
                'Built a content-based restaurant recommendation system using criteria such as cuisine preferences and price range to recommend restaurants based on user preferences.',
                'Tested the recommendation system with sample user inputs and evaluated the relevance and quality of the generated restaurant recommendations.'
            ],
            category: 'Machine Learning & Data Science',
            features: [
                {
                    title: 'ML Rating Prediction & Recommender Engine',
                    items: [
                        '**Data Preprocessing Pipeline**: Categorical encoding, missing value imputation, and feature scaling.',
                        '**Regression Modeling**: Model training and metric evaluation for rating prediction accuracy.',
                        '**Content-Based Recommender**: Intelligent recommendation system based on cuisine and price preferences.'
                    ]
                }
            ],
            challengesAndSolutions: [
                {
                    problem: 'Categorical feature sparsity (cuisines, locations) causing high dimensionality in regression training.',
                    solution: 'Implemented target encoding and feature relevance ranking before model evaluation.'
                }
            ]
        }
    ],
    experiences: [
        {
            id: 'prof-1',
            company: 'Enougher ApplyWizz',
            position: 'Software Development Engineer Intern',
            description: 'Developed and enhanced CRM workflows for Sales, Account Management, and Lead Management, improving client tracking, sales processing, and operational efficiency.',
            responsibilities: [
                'Developed and enhanced CRM workflows for Sales, Account Management, and Lead Management, improving client tracking, sales processing, and operational efficiency.',
                'Implemented AWL ID and domain-change management, generating new AWL IDs while maintaining complete historical relationships between previous and updated client records using Supabase/PostgreSQL JSONB mappings.',
                'Built multi-level AWL ID relationship traversal using BFS logic, enabling seamless navigation across linked client records and maintaining complete sales history before and after domain changes.',
                'Enhanced Invoice and Payment Management features by implementing revenue and pending-payment dashboards, advanced search and filtering, date-range selection, CSV export, and detailed modal-based financial breakdowns.',
                'Developed and improved Onboarding and Lead Creation forms, including AWL ID generation, lead status identification, searchable dropdowns, validation, and improved data-entry workflows.',
                
            ],
            skills: ['TypeScript', 'React.js', 'Next.js', 'PostgreSQL', 'Supabase', 'JSONB', 'BFS Traversal', 'CRM Workflows', 'Dashboard Analytics', 'Node.js'],
            startDate: '2026-03-01',
            isOngoing: true,
            location: 'Remote / India',
            type: 'internship',
            logo: '/woman_sde_3d_render.png',
        }
    ],
    education: [
        {
            id: 'edu-1',
            institution: 'Rajiv Gandhi University of Knowledge Technologies, Basar',
            degree: 'B.Tech',
            major: 'Electronics and Communication Engineering (ECE)',
            startDate: '2021-01-01',
            endDate: '2025-05-31',
            isOngoing: false,
            activities: ['B.Tech in ECE with focus on Web Development, ML, and Communication Systems'],
            achievements: ['B.Tech (ECE) 2021 – 2025 | CGPA: 8.0']
        },
       
       
    ],
    achievements: [
        { 
            id: 'cert-1', 
            title: 'Meta Back-End Developer Professional Certificate', 
            issuer: 'Coursera', 
            date: 'Professional Certificate', 
            category: 'certification',
            credentialUrl: 'https://coursera.org',
            tags: ['Back-End', 'Python', 'Django', 'REST APIs', 'Databases']
        },
        { 
            id: 'cert-2', 
            title: 'IBM Full Stack Software Developer Professional Certificate', 
            issuer: 'Coursera', 
            date: 'Professional Certificate', 
            category: 'certification',
            credentialUrl: 'https://coursera.org',
            tags: ['Full Stack', 'React', 'Node.js', 'Cloud Native', 'DevOps']
        },
        { 
            id: 'cert-3', 
            title: 'IBM DevOps and Software Engineering Professional Certificate', 
            issuer: 'Coursera', 
            date: 'Professional Certificate', 
            category: 'certification',
            credentialUrl: 'https://coursera.org',
            tags: ['DevOps', 'Docker', 'Kubernetes', 'CI/CD', 'Software Engineering']
        },
        { 
            id: 'cert-4', 
            title: 'Meta Front-End Developer Professional Certificate', 
            issuer: 'Coursera', 
            date: 'Professional Certificate', 
            category: 'certification',
            credentialUrl: 'https://coursera.org',
            tags: ['Front-End', 'React', 'JavaScript', 'UI/UX', 'CSS3']
        },
        { 
            id: 'cert-5', 
            title: 'Build REST APIs with FastAPI', 
            issuer: 'LinkedIn Learning', 
            date: 'Certificate of Completion', 
            category: 'certification',
            credentialUrl: 'https://linkedin.com/learning',
            tags: ['FastAPI', 'Python', 'REST APIs', 'Backend Development']
        },
        { 
            id: 'cert-6', 
            title: 'Become a RESTful API Developer', 
            issuer: 'LinkedIn Learning', 
            date: 'Certificate of Completion', 
            category: 'certification',
            credentialUrl: 'https://linkedin.com/learning',
            tags: ['RESTful APIs', 'API Design', 'HTTP Protocol', 'Backend']
        }
    ],
    techStack: [
        { name: 'Python', icon: 'https://cdn.simpleicons.org/python', category: 'language' },
        { name: 'Java', icon: 'https://cdn.simpleicons.org/oracle', category: 'language' },
        { name: 'JavaScript', icon: 'https://cdn.simpleicons.org/javascript', category: 'language' },
        { name: 'TypeScript', icon: 'https://cdn.simpleicons.org/typescript', category: 'language' },
        { name: 'FastAPI', icon: 'https://cdn.simpleicons.org/fastapi', category: 'framework' },
        { name: 'Flask', icon: 'https://cdn.simpleicons.org/flask', category: 'framework' },
        { name: 'React.js', icon: 'https://cdn.simpleicons.org/react', category: 'framework' },
        { name: 'PostgreSQL', icon: 'https://cdn.simpleicons.org/postgresql', category: 'database' },
        { name: 'MySQL', icon: 'https://cdn.simpleicons.org/mysql', category: 'database' },
        { name: 'MongoDB', icon: 'https://cdn.simpleicons.org/mongodb', category: 'database' },
        { name: 'Redis', icon: 'https://cdn.simpleicons.org/redis', category: 'database' },
        { name: 'AWS', icon: 'https://cdn.simpleicons.org/amazonaws', category: 'cloud' },
        { name: 'Docker', icon: 'https://cdn.simpleicons.org/docker', category: 'cloud' },
        { name: 'Git', icon: 'https://cdn.simpleicons.org/git', category: 'tool' },
        { name: 'Postman', icon: 'https://cdn.simpleicons.org/postman', category: 'tool' }
    ],
    hardSkills: [
        { name: 'Programming Languages', level: 'expert', category: 'software', description: 'Python, Java, JavaScript, TypeScript' },
        { name: 'Backend Engineering', level: 'expert', category: 'backend', description: 'FastAPI, Flask, REST APIs, OpenAPI, Pydantic, AsyncIO, Microservices, API Design, Event-Driven Architecture' },
        { name: 'Frontend Engineering', level: 'expert', category: 'frontend', description: 'React.js, HTML5, CSS3, Tailwind CSS, Responsive Design, Dashboard Development, API Integration' },
        { name: 'Databases & Caching', level: 'expert', category: 'database', description: 'PostgreSQL, MySQL, MongoDB, Redis' },
        { name: 'Cloud & Containerization', level: 'advanced', category: 'cloud', description: 'AWS, Azure, EC2, S3, Lambda, ECS, EKS, ECR, CloudWatch, Azure Event Hub, Docker' },
        { name: 'Testing, Security & Observability', level: 'advanced', category: 'other', description: 'Pytest, Unit Testing, Integration Testing, Postman, RBAC, API Authentication, Secret Management' },
        { name: 'AI-Enabled Software Development', level: 'advanced', category: 'ai', description: 'LangChain, OpenAI, Hugging Face Transformers, RAG' }
    ],
    softSkills: [
        { name: 'Problem Solving', description: 'Strong analytical mindset with a focus on clean, efficient code and algorithmic problem-solving.' },
        { name: 'Communication', description: 'Clear technical communication and documentation across full-stack software development.' },
        { name: 'Teamwork', description: 'Collaborative approach to building modern web applications and working with multi-disciplinary teams.' },
        { name: 'Adaptability', description: 'Quick learner passionate about adopting modern tech stacks, frameworks, and engineering standards.' }
    ],
    tools: [
        { name: 'React.js', icon: 'https://cdn.simpleicons.org/react', category: 'productivity' },
        { name: 'Node.js', icon: 'https://cdn.simpleicons.org/nodedotjs', category: 'productivity' },
        { name: 'Express.js', icon: 'https://cdn.simpleicons.org/express', category: 'productivity' },
        { name: 'MongoDB', icon: 'https://cdn.simpleicons.org/mongodb', category: 'productivity' },
        { name: 'Git & GitHub', icon: 'https://cdn.simpleicons.org/github', category: 'productivity' },
        { name: 'Postman', icon: 'https://cdn.simpleicons.org/postman', category: 'productivity' },
        { name: 'VS Code', icon: 'https://cdn.simpleicons.org/visualstudiocode', category: 'productivity' }
    ],
    faqs: [
        {
            question: 'What is your core technical background?',
            answer: 'I am a B.Tech (ECE) graduate specializing in Full Stack Web Development with React.js, Node.js, Express.js, and MongoDB.',
        },
        {
            question: 'What projects have you developed?',
            answer: 'My key projects include Vendor Vortex (a full-stack vendor workflow platform), Recruitr Dashboard (a responsive React recruitment UI), and Microstrip Patch Antenna Design (10 GHz RF design integrated with ML data analysis).',
        },
        {
            question: 'Where are you located and how can I contact you?',
            answer: 'I am based in Telangana, India. You can reach me via email at puttashivani2003@gmail.com or phone at +91 9493692116.',
        }
    ],
    blogs: [],
    gallery: []
};
