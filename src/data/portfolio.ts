import { PortfolioData } from '@/types';

export const portfolioData: PortfolioData = {
    personal: {
        name: 'Tejeswara Sai Appikatla',
        title: 'Data Analyst',
        subtitle: 'Data Analyst | Business Intelligence | Product & Operational Analytics',
        bio: 'Data Analyst with 3+ years of combined analytics experience supporting product, operational, executive, academic, and data quality reporting across U.S. business and university environments. Experienced in building dashboards, automating recurring reports, validating complex datasets, and turning performance metrics into clear insights for business and leadership teams.',
        avatar: '/image.png',
        location: 'Delray Beach, FL',
        email: 'atejeswarasaia@gmail.com',
        phone: '+1 (561) 599-4577',
        resumeUrl: '/Tejaswara_sai_resume.pdf',
        website: '#',
        languages: [
            { name: 'English', level: 'Fluent' },
        ],
        socialLinks: [
        ],
    },
    projects: [
        {
            id: 'project-1',
            slug: 'marketing-campaign-conversion-analytics',
            title: 'Marketing Campaign and Customer Conversion Analytics',
            image: '/marketing_analytics.png',
            description: 'Consolidated campaign spend, customer interactions, conversions, and revenue in Google BigQuery using SQL and Power Query, creating a consistent dataset for channel and audience analysis.',
            longDescription: 'Consolidated campaign spend, customer interactions, conversions, and revenue in Google BigQuery using SQL and Power Query, creating a consistent dataset for channel and audience analysis. Applied Python, Pandas, customer segmentation, funnel analysis, and statistical analysis to compare acquisition behavior, identify conversion drop-offs, and assess campaign performance. Built Power BI dashboards with DAX measures, KPI scorecards, and drill-through views, enabling marketing teams to evaluate conversion rates, customer value, and channel effectiveness.',
            techStack: ['Google BigQuery', 'SQL', 'Power Query', 'Power BI', 'DAX', 'Python', 'Pandas'],
            tools: ['Power BI', 'Google BigQuery', 'Python'],
            status: 'completed',
            repoUrl: '#',
            demoUrl: '#',
            startDate: '2025-01-01',
            role: 'Data Analyst',
            customTimeline: '2025',
            team: 'Marketing Analytics',
            highlights: [
                'Consolidated campaign spend, customer interactions, conversions, and revenue in Google BigQuery using SQL and Power Query.',
                'Applied Python, Pandas, customer segmentation, funnel analysis, and statistical analysis to compare acquisition behavior.',
                'Built Power BI dashboards with DAX measures, KPI scorecards, and drill-through views for marketing teams.'
            ],
            category: 'Marketing Analytics',
            features: [
                {
                    title: 'Campaign Analytics Platform',
                    items: [
                        '**Data Consolidation**: Unified spend and interactions in Google BigQuery.',
                        '**Behavior Analysis**: Segmentation and funnel analysis via Python/Pandas.',
                        '**Executive Dashboards**: Power BI KPI scorecards and drill-through views.'
                    ]
                }
            ],
            challengesAndSolutions: [
                {
                    problem: 'Inconsistent campaign spend and conversion data across disparate marketing channels.',
                    solution: 'Engineered BigQuery SQL models and Power Query transformations for unified reporting.'
                }
            ]
        },
        {
            id: 'project-2',
            slug: 'financial-variance-performance-reporting',
            title: 'Financial Variance and Performance Reporting Dashboard',
            image: '/financial_performance.png',
            description: 'Structured budget, actual, expense, and revenue records with SQL and Advanced Excel, standardizing financial categories and preparing reconciled data for monthly performance reporting.',
            longDescription: 'Structured budget, actual, expense, and revenue records with SQL and Advanced Excel, standardizing financial categories and preparing reconciled data for monthly performance reporting. Developed DAX calculations and Power BI data models for budget variance, period-over-period trends, operating costs, and revenue performance, giving finance teams consistent analytical measures. Presented financial trends through Power BI and Tableau dashboards with executive reporting and data storytelling, helping stakeholders identify material variances and investigate underlying business drivers.',
            techStack: ['SQL', 'Advanced Excel', 'DAX', 'Power BI', 'Tableau', 'Data Modeling'],
            tools: ['Power BI', 'Tableau', 'Advanced Excel'],
            status: 'completed',
            repoUrl: '#',
            demoUrl: '#',
            startDate: '2024-06-01',
            role: 'BI Analyst',
            customTimeline: '2024',
            team: 'Finance Analytics',
            highlights: [
                'Structured budget, actual, expense, and revenue records with SQL and Advanced Excel.',
                'Developed DAX calculations and Power BI data models for budget variance and operating costs.',
                'Presented financial trends through Power BI and Tableau dashboards with data storytelling.'
            ],
            category: 'Financial Analytics',
            features: [
                {
                    title: 'Financial Reporting System',
                    items: [
                        '**Data Standardization**: Reconciled financial categories using SQL and Excel.',
                        '**Variance Modeling**: DAX measures for period-over-period budget trends.',
                        '**Multi-Platform BI**: Dual Power BI & Tableau executive reporting views.'
                    ]
                }
            ],
            challengesAndSolutions: [
                {
                    problem: 'Finance teams struggled with conflicting source calculations and manual variance analysis.',
                    solution: 'Created standardized DAX measures and automated reconciliation models in Power BI.'
                }
            ]
        },
        {
            id: 'project-3',
            slug: 'operations-capacity-sla-performance',
            title: 'Operations Capacity and SLA Performance Analytics',
            image: '/operations_sla.png',
            description: 'Consolidated service requests, staffing levels, workloads, and resolution records through SQL and Power Query, creating an analysis-ready model for capacity utilization, backlog, and SLA reporting.',
            longDescription: 'Consolidated service requests, staffing levels, workloads, and resolution records through SQL and Power Query, creating an analysis-ready model for capacity utilization, backlog, and SLA reporting. Developed DAX measures and Power BI views for request volume, aging, turnaround time, workload distribution, and SLA exceptions, helping operations teams identify bottlenecks and rebalance resources. Reconciled dashboard totals against source records using Advanced Excel and source-to-report validation, strengthening reporting accuracy and supporting dependable weekly capacity planning.',
            techStack: ['SQL', 'Power Query', 'DAX', 'Power BI', 'Advanced Excel', 'Data Validation'],
            tools: ['Power BI', 'SQL', 'Advanced Excel'],
            status: 'completed',
            repoUrl: '#',
            demoUrl: '#',
            startDate: '2024-01-01',
            role: 'Data Analyst',
            customTimeline: '2024',
            team: 'Operations Analytics',
            highlights: [
                'Consolidated service requests, staffing levels, workloads, and resolution records via SQL & Power Query.',
                'Developed DAX measures and Power BI views for request volume, turnaround time, and SLA exceptions.',
                'Reconciled dashboard totals against source records using Advanced Excel validation.'
            ],
            category: 'Operational Analytics',
            features: [
                {
                    title: 'Operations & SLA Intelligence',
                    items: [
                        '**Capacity Modeling**: Workload and staffing utilization analysis.',
                        '**SLA Tracking**: Real-time turnaround time and aging dashboards in Power BI.',
                        '**Quality Assurance**: Source-to-report reconciliation to ensure 98%+ reporting accuracy.'
                    ]
                }
            ],
            challengesAndSolutions: [
                {
                    problem: 'Operational bottlenecks and SLA breaches went unnoticed due to delayed reporting.',
                    solution: 'Automated weekly capacity and SLA tracking dashboards with exception alerts in Power BI.'
                }
            ]
        }
    ],
    experiences: [
        {
            id: 'prof-1',
            company: 'Talviro Inc.',
            position: 'Data Analyst',
            description: 'Built 12+ production dashboards in Power BI & Tableau, automated recurring reports, optimized PostgreSQL/MySQL queries, and maintained 98% reporting accuracy.',
            responsibilities: [
                'Built 12+ production dashboards in Power BI and Tableau using DAX, Power Query, data modeling, and drill-through analysis, giving operations and leadership teams a reliable view of KPIs and reporting exceptions.',
                'Gathered requirements from 40+ business and technical stakeholders and translated them into dashboard specifications, executive reports, validation rules, and metric definitions aligned with operational priorities.',
                'Automated recurring reports through SQL, Power BI Service, scheduled refreshes, and reusable reporting models, cutting manual preparation time by 27% and accelerating access to current performance data.',
                'Tuned PostgreSQL and MySQL queries using complex joins, common table expressions, window functions, subqueries, aggregations, and query optimization, enabling faster refreshes and more stable downstream reporting.',
                'Implemented source-to-report reconciliation, data profiling, and root-cause analysis controls that sustained 98% reporting accuracy and stopped transformation defects before dashboard publication.',
                'Standardized KPI calculations, reporting hierarchies, filters, and business rules with operations, finance, and engineering teams, creating consistent measures across functional and executive reports.',
                'Investigated operational variances and recurring process gaps through SQL, Tableau, and exploratory data analysis, directing business teams toward the exceptions requiring immediate corrective action.',
                'Formalized data dictionaries, refresh dependencies, dashboard logic, validation procedures, and troubleshooting guides, strengthening reporting governance and supporting confident self-service analytics.'
            ],
            skills: ['Power BI', 'Tableau', 'DAX', 'Power Query', 'SQL', 'PostgreSQL', 'MySQL', 'Data Profiling'],
            startDate: '2026-04-01',
            isOngoing: true,
            location: 'Remote | Miami, FL',
            type: 'full-time',
            logo: '/logo2.png',
        },
        {
            id: 'prof-2',
            company: 'BIOME',
            position: 'Product Data Analyst',
            description: 'Designed product analytics dashboards, engineered Python/Pandas fuzzy matching engine, automated GCS data ingestion, and performed cohort & churn analysis.',
            responsibilities: [
                'Designed product analytics dashboards in Power BI with SQL, DAX, Power Query, and data modeling, giving 15+ stakeholders visibility into engagement, retention, churn, and feature-adoption behavior.',
                'Created a Python and Pandas mapping engine with fuzzy matching, data cleaning, and business rules, reconciling inconsistent product identifiers and producing trusted records for operational analysis.',
                'Built Python data extraction and ingestion workflows with Google Cloud Storage, data validation, and anomaly detection, decreasing data errors by 35% and preventing incomplete records from entering reporting datasets.',
                'Automated data preparation, reconciliation, and exception reporting through Python, SQL, and Pandas, saving 10+ engineering hours each week and shortening delivery cycles for analysis-ready data.',
                'Combined information from 4 operational sources through SQL transformations, data mapping, and metric standardization, establishing a unified reporting layer for product and supply chain teams.',
                'Conducted cohort, funnel, retention, churn, segmentation, and feature-adoption analysis with SQL and Python, helping product managers identify behavioral patterns and refine customer-focused priorities.',
                'Structured reusable SQL datasets and DAX measures for recurring product metrics, eliminating conflicting calculations and supporting consistent performance reviews across business functions.',
                'Managed stakeholder requirements across product, engineering, and business teams, validated dashboard outputs, controlled Python and SQL changes through Git, and documented analytical assumptions to support practical roadmap decisions.'
            ],
            skills: ['Power BI', 'SQL', 'DAX', 'Python', 'Pandas', 'Google Cloud Storage', 'Git', 'Cohort Analysis'],
            startDate: '2025-07-01',
            endDate: '2026-04-01',
            isOngoing: false,
            location: 'Remote',
            type: 'full-time',
            logo: '/logo2.png',
        },
        {
            id: 'prof-3',
            company: 'Florida Atlantic University',
            position: 'Graduate Teaching Assistant – Artificial Intelligence',
            description: 'Built student performance tracking system in Python/Excel for 150+ students, led 12+ hands-on analytics labs, and created 25+ SciPy/scikit-learn notebooks.',
            responsibilities: [
                'Built a Python and Advanced Excel performance-tracking system for 150+ students using Pandas, PivotTables, and XLOOKUP, giving faculty clear visibility into assignment progress and learning gaps.',
                'Led 12+ hands-on labs covering Python, NumPy, statistical analysis, exploratory data analysis, and data visualization, helping students apply analytical methods to structured datasets.',
                'Created 25+ reusable notebooks with Pandas, SciPy, and scikit-learn for data cleaning, hypothesis testing, regression, and classification, providing repeatable workflows for coursework and project analysis.',
                'Evaluated student projects through SQL validation, data profiling, statistical analysis, and data storytelling, helping learners produce accurate findings and clearly supported recommendations.',
                'Demonstrated Power BI, Tableau, and Advanced Excel techniques for dashboard development and visual reporting, preparing students to communicate analytical findings to non-technical audiences.',
                'Automated grading consolidation and progress reporting through Python, Pandas, and Advanced Excel, decreasing administrative preparation time by 30% and creating more capacity for targeted student support.'
            ],
            skills: ['Python', 'Pandas', 'NumPy', 'SciPy', 'scikit-learn', 'Advanced Excel', 'SQL', 'Power BI'],
            startDate: '2024-12-01',
            endDate: '2025-05-31',
            isOngoing: false,
            location: 'Boca Raton, FL',
            type: 'part-time',
            logo: '/logo2.png',
        },
        {
            id: 'prof-4',
            company: 'Agile Solutions',
            position: 'Data Analyst',
            description: 'Integrated SQL/Python analytics into executive reporting, built Python/Pandas ETL app, automated GCP processing for 2TB+ data, and delivered ML models via REST APIs.',
            responsibilities: [
                'Integrated SQL and Python analytics into an executive reporting platform with KPI scorecards and visual reports, driving 60% higher leadership adoption and faster access to operational performance indicators.',
                'Developed a Python and Pandas ETL application with data cleaning, deduplication, anomaly detection, and validation controls, lifting analytical accuracy and data compliance by 45%.',
                'Automated cloud-based processing through Google Cloud Functions and Google Cloud Storage for 2TB+ of operational data, supplying structured datasets for recurring reporting and predictive analysis.',
                'Consolidated records from 6 operational sources using SQL joins, common table expressions, data mapping, and transformation rules, creating a dependable foundation for departmental analysis.',
                'Delivered regression and classification outputs through REST API integrations built with Python, SciPy, and scikit-learn, embedding validated analytical results into existing business applications.',
                'Applied hypothesis testing, regression analysis, classification analysis, and anomaly detection to operational datasets, converting statistical patterns into clear findings for risk and process planning.',
                'Organized SQL-based reporting datasets around standardized metrics and business rules, enabling management teams to compare operational results without relying on conflicting source calculations.',
                'Collaborated with engineering, operations, and management teams on requirements gathering, data validation, metric standardization, and technical documentation, keeping analytics deliverables tied to defined business objectives.'
            ],
            skills: ['SQL', 'Python', 'Pandas', 'GCP', 'Google Cloud Functions', 'SciPy', 'scikit-learn', 'ETL', 'REST API'],
            startDate: '2021-05-01',
            endDate: '2022-12-31',
            isOngoing: false,
            location: 'Bangalore, India',
            type: 'full-time',
            logo: '/logo2.png',
        }
    ],
    education: [
        {
            id: 'edu-1',
            institution: 'Florida Atlantic University',
            degree: 'Master of Science',
            major: 'Computer Science',
            startDate: '2023-01-01',
            endDate: '2025-05-31',
            isOngoing: false,
            activities: ['Artificial Intelligence, Data Mining, Database Systems, & Advanced Analytics'],
            achievements: ['Master of Science in Computer Science (2023 – 2025) | Boca Raton, FL']
        }
    ],
    achievements: [
        { id: 'cert-1', title: 'Microsoft Power BI Data Analyst Professional Certificate', issuer: 'Coursera', date: '2024', category: 'certification' },
        { id: 'cert-2', title: 'Google Data Analytics Professional Certificate', issuer: 'Coursera', date: '2024', category: 'certification' },
        { id: 'cert-3', title: 'SQL (Advanced) Skills Certification', issuer: 'HackerRank', date: '2024', category: 'certification' },
        { id: 'cert-4', title: 'Python for Data Science', issuer: 'IBM', date: '2023', category: 'certification' },
        { id: 'cert-5', title: 'Data Analysis with Python', issuer: 'Cognitive Class AI', date: '2023', category: 'certification' },
        { id: 'cert-6', title: 'Data Visualization with Python', issuer: 'Coursera', date: '2023', category: 'certification' }
    ],
    techStack: [
        { name: 'Power BI', icon: 'https://cdn.simpleicons.org/powerbi', category: 'tool' },
        { name: 'Tableau', icon: 'https://cdn.simpleicons.org/tableau', category: 'tool' },
        { name: 'SQL', icon: 'https://cdn.simpleicons.org/postgresql', category: 'language' },
        { name: 'PostgreSQL', icon: 'https://cdn.simpleicons.org/postgresql', category: 'database' },
        { name: 'MySQL', icon: 'https://cdn.simpleicons.org/mysql', category: 'database' },
        { name: 'BigQuery', icon: 'https://cdn.simpleicons.org/googlebigquery', category: 'database' },
        { name: 'Python', icon: 'https://cdn.simpleicons.org/python', category: 'language' },
        { name: 'Pandas', icon: 'https://cdn.simpleicons.org/pandas', category: 'framework' },
        { name: 'NumPy', icon: 'https://cdn.simpleicons.org/numpy', category: 'framework' },
        { name: 'Excel', icon: 'https://cdn.simpleicons.org/microsoftexcel', category: 'tool' },
        { name: 'Git', icon: 'https://cdn.simpleicons.org/git', category: 'tool' }
    ],
    hardSkills: [
        { name: 'Business Intelligence & Visualization', level: 'expert', category: 'data', description: 'Power BI, Power BI Service, DAX, Power Query, Data Modeling, Tableau, Dashboard Development, Scheduled Refresh, Drill-Through Reporting, Executive Reporting, KPI Scorecards, Data Visualization, Data Storytelling' },
        { name: 'SQL & Data Platforms', level: 'expert', category: 'data', description: 'SQL, PostgreSQL, MySQL, Google BigQuery, Complex Joins, Common Table Expressions, Window Functions, Subqueries, Aggregations, Query Optimization' },
        { name: 'Data Analysis & Programming', level: 'expert', category: 'data', description: 'Python, Pandas, NumPy, Advanced Excel, PivotTables, XLOOKUP, Exploratory Data Analysis, Automated Reporting' },
        { name: 'Product & Business Analytics', level: 'expert', category: 'data', description: 'KPI Definition, Product Metrics, User Engagement, Retention Analysis, Churn Analysis, Cohort Analysis, Funnel Analysis, Customer Segmentation, Feature Adoption, Marketing Analytics, Financial Reporting, Variance Analysis, Trend Analysis, Operational Analytics' },
        { name: 'Statistical & Predictive Analytics', level: 'advanced', category: 'data', description: 'Statistical Analysis, Hypothesis Testing, Regression Analysis, Classification Analysis, Predictive Modeling, SciPy, scikit-learn, Anomaly Detection' },
        { name: 'Data Preparation & Quality', level: 'expert', category: 'data', description: 'ETL, Data Extraction, Data Cleaning, Data Transformation, Data Mapping, Data Profiling, Data Validation, Source-to-Report Reconciliation, Deduplication, Fuzzy Matching, Root-Cause Analysis, Business Rules, Data Integrity, Data Governance' },
        { name: 'Cloud & Analytics Delivery', level: 'advanced', category: 'other', description: 'Google Cloud Storage, Google Cloud Functions, REST API Integration, Git, Requirements Gathering, Stakeholder Management, Metric Standardization, Technical Documentation' }
    ],
    softSkills: [
        { name: 'Stakeholder & Cross-Functional Collaboration', description: 'Working effectively with product managers, engineers, operations teams, faculty, and business stakeholders.' },
        { name: 'Metric Standardization & Data Governance', description: 'Clarifying reporting needs, defining consistent business rules, and formalizing data dictionaries.' },
        { name: 'Root-Cause Analysis & Decision Support', description: 'Investigating operational variances, resolving data defects, and communicating findings clearly.' }
    ],
    tools: [
        { name: 'Power BI Service', icon: 'https://cdn.simpleicons.org/powerbi', category: 'productivity' },
        { name: 'Tableau Desktop', icon: 'https://cdn.simpleicons.org/tableau', category: 'productivity' },
        { name: 'DAX & Power Query', icon: 'https://cdn.simpleicons.org/powerbi', category: 'productivity' },
        { name: 'PostgreSQL', icon: 'https://cdn.simpleicons.org/postgresql', category: 'productivity' },
        { name: 'MySQL', icon: 'https://cdn.simpleicons.org/mysql', category: 'productivity' },
        { name: 'Google Cloud', icon: 'https://cdn.simpleicons.org/googlecloud', category: 'productivity' },
        { name: 'scikit-learn', icon: 'https://cdn.simpleicons.org/scikitlearn', category: 'productivity' },
        { name: 'SciPy', icon: 'https://cdn.simpleicons.org/scipy', category: 'productivity' },
        { name: 'Jupyter', icon: 'https://cdn.simpleicons.org/jupyter', category: 'productivity' },
        { name: 'Advanced Excel', icon: 'https://cdn.simpleicons.org/microsoftexcel', category: 'productivity' }
    ],
    faqs: [
        {
            question: 'What is your core analytics expertise?',
            answer: 'I specialize in Data Analysis, Business Intelligence, Product & Operational Analytics, KPI Reporting, SQL query optimization, and dashboard development using Power BI and Tableau.',
        },
        {
            question: 'What technologies and platforms do you use?',
            answer: 'My primary stack includes Power BI (DAX, Power Query), Tableau, SQL (PostgreSQL, MySQL, BigQuery), Python (Pandas, NumPy, SciPy, scikit-learn), Advanced Excel, and Google Cloud Platform (GCS, Cloud Functions).',
        },
        {
            question: 'Where are you located and what roles are you looking for?',
            answer: 'I am based in Delray Beach, FL (open to remote and on-site opportunities) seeking Data Analyst, Product Data Analyst, or BI Analyst roles.',
        }
    ],
    blogs: [],
    gallery: []
};
