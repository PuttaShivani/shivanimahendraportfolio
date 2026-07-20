import { PortfolioData } from '@/types';

export const portfolioData: PortfolioData = {
    personal: {
        name: 'Pavan Kumar',
        title: 'Data Analyst',
        subtitle: 'Data Analyst | Business Intelligence | Power BI & Tableau',
        bio: 'Data Analyst with 4+ years of experience supporting reporting, performance analysis, KPI tracking, and operational decision-making across financial services, healthcare, and technology environments. Experienced in turning service, incident, capacity, customer-support, and business data into clear dashboards, scorecards, and reports that help leaders understand performance and act on emerging issues.',
        avatar: '/image.png',
        location: 'Celina, TX',
        email: 'sai.naga@applywizard.ai',
        phone: '+1 (314) 599-0774',
        resumeUrl: '/resume',
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
            slug: 'enterprise-ops-intelligence',
            title: 'Enterprise Operations Intelligence and KPI Analytics Platform',
            image: '/project1.png',
            description: 'Modeled incident, capacity, change, and SLA data in SQL and Power Query using a star schema for enterprise operations reporting.',
            longDescription: 'Modeled incident, capacity, change, and SLA data in SQL and Power Query using a star schema, creating a reliable analytical layer for enterprise operations reporting. Engineered DAX measures, drill-through reports, KPI scorecards, and trend and exception views in Power BI to expose backlog growth, service failures, and capacity risks requiring operational follow-up. Automated Python-based validation and reconciliation checks for recurring data loads.',
            techStack: ['SQL', 'Power Query', 'Power BI', 'DAX', 'Python'],
            tools: ['Power BI'],
            status: 'completed',
            repoUrl: '#',
            demoUrl: '#',
            startDate: '2023-01-01',
            role: 'Data Analyst',
            customTimeline: '2023',
            team: 'Analytics',
            highlights: [
                'Modeled incident, capacity, change, and SLA data in SQL and Power Query using a star schema.',
                'Engineered DAX measures, drill-through reports, KPI scorecards, and trend and exception views in Power BI.',
                'Automated Python-based validation and reconciliation checks for recurring data loads, increasing dashboard reliability.'
            ],
            category: 'Data Analytics',
            features: [
                {
                    title: 'Analytics Platform',
                    items: [
                        '**Data Modeling**: Star schema with SQL and Power Query.',
                        '**Visualization**: Power BI dashboards with drill-through capabilities.',
                        '**Automation**: Python-based validation for recurring loads.'
                    ]
                }
            ],
            challengesAndSolutions: [
                {
                    problem: 'Needed a reliable analytical layer for enterprise operations reporting.',
                    solution: 'Implemented a star schema and automated validation checks using Python.'
                }
            ]
        },
        {
            id: 'project-2',
            slug: 'healthcare-service-performance',
            title: 'Healthcare Service Performance Analytics Dashboard',
            image: '/project2.jpg',
            description: 'Combined ServiceNow, facility, and service-performance data through SQL and Excel validation rules.',
            longDescription: 'Combined ServiceNow, facility, and service-performance data through SQL and Excel validation rules, producing a consistent dataset for healthcare location and departmental comparisons. Designed Tableau dashboards with calculated fields, parameters, geographic mapping, filters, and dashboard actions to reveal facility-level service gaps and recurring operational patterns. Applied Python and Pandas to examine outliers, incident concentration, and peak service-impact periods.',
            techStack: ['SQL', 'Excel', 'Tableau', 'Python', 'Pandas'],
            tools: ['Tableau', 'ServiceNow'],
            status: 'completed',
            repoUrl: '#',
            demoUrl: '#',
            startDate: '2024-01-01',
            role: 'BI Analyst',
            customTimeline: '2024',
            team: 'BI Team',
            highlights: [
                'Combined ServiceNow, facility, and service-performance data through SQL and Excel validation rules.',
                'Designed Tableau dashboards with calculated fields, parameters, geographic mapping, filters, and dashboard actions.',
                'Applied Python and Pandas to examine outliers, incident concentration, and peak service-impact periods.'
            ],
            category: 'Business Intelligence',
            features: [
                {
                    title: 'Healthcare Analytics',
                    items: [
                        '**Data Integration**: Merged ServiceNow and facility data via SQL/Excel.',
                        '**Dashboards**: Tableau views with geographic mapping and filters.',
                        '**Analysis**: Python/Pandas outlier and peak period examination.'
                    ]
                }
            ],
            challengesAndSolutions: [
                {
                    problem: 'Difficulty comparing departmental performance across multiple healthcare locations.',
                    solution: 'Created standardized Tableau dashboards and SQL datasets for uniform analysis.'
                }
            ]
        },
        {
            id: 'project-3',
            slug: 'product-customer-usage-analytics',
            title: 'Product and Customer Usage Analytics Solution',
            image: '/project3.jpg',
            description: 'Structured customer, product, feature, and usage data with SQL dimensional modeling.',
            longDescription: 'Structured customer, product, feature, and usage data with SQL dimensional modeling, supporting consistent analysis of adoption, retention, engagement, and customer-segment performance. Developed Python and Pandas workflows to calculate usage frequency, feature penetration, support demand, and customer trends, giving product teams evidence for prioritization decisions. Presented cohort analysis, funnel views, segmentation, and KPI trends through Power BI and Tableau.',
            techStack: ['SQL', 'Python', 'Pandas', 'Power BI', 'Tableau'],
            tools: ['Power BI', 'Tableau'],
            status: 'completed',
            repoUrl: '#',
            demoUrl: '#',
            startDate: '2023-06-01',
            role: 'Data Analyst',
            customTimeline: '2023',
            team: 'Product Analytics',
            highlights: [
                'Structured customer, product, feature, and usage data with SQL dimensional modeling.',
                'Developed Python and Pandas workflows to calculate usage frequency and feature penetration.',
                'Presented cohort analysis, funnel views, and KPI trends through Power BI and Tableau.'
            ],
            category: 'Product Analytics',
            features: [
                {
                    title: 'Usage Analytics',
                    items: [
                        '**Dimensional Modeling**: SQL structures for adoption and retention analysis.',
                        '**Workflows**: Python/Pandas calculation of support demand and trends.',
                        '**Visualization**: Cohort and funnel views in Power BI and Tableau.'
                    ]
                }
            ],
            challengesAndSolutions: [
                {
                    problem: 'Product teams lacked evidence for prioritization decisions.',
                    solution: 'Built comprehensive usage analytics workflows and dashboards.'
                }
            ]
        }
    ],
    experiences: [
        {
            id: 'prof-1',
            company: 'VISA',
            position: 'Data Analyst',
            description: 'Developed Power BI dashboards, streamlined SQL workflows, and analyzed 500K+ operational records for payment operations.',
            responsibilities: [
                'Developed 8 Power BI dashboards using SQL, Power Query, and DAX to combine payment operations, service-performance, capacity, and operational risk data, giving financial-services leaders faster visibility into business-critical KPIs.',
                'Streamlined SQL-based data preparation and validation workflows across operational reporting sources, cutting recurring report preparation effort by 40% while increasing confidence in executive performance reporting.',
                'Built DAX measures, calculated columns, and interactive drill-through reports to evaluate payment operations, capacity trends, and business performance, enabling leadership to prioritize operational planning with current insights.',
                'Evaluated more than 500K operational records using Python, Pandas, SQL, and Excel to identify demand patterns, utilization trends, and operational exceptions that guided business decision-making.',
                'Partnered with product, operations, compliance, and engineering teams to translate reporting requirements into Power BI semantic models, KPI definitions, and executive dashboards aligned with organizational objectives.',
                'Automated recurring data transformation and scheduled reporting with Python, SQL, Power Query, and Power BI Service, allowing analysts to spend more time interpreting business trends instead of preparing reports.',
                'Assessed operational trends through variance, capacity, and utilization analysis in Power BI and Excel, supporting planning initiatives that boosted operational efficiency by 25%.',
                'Maintained KPI documentation, reporting standards, dashboard specifications, and validation rules in Confluence and SharePoint, strengthening reporting governance across analytics teams.'
            ],
            skills: ['Power BI', 'SQL', 'DAX', 'Python', 'Pandas', 'Excel'],
            startDate: '2025-02-01',
            isOngoing: true,
            location: 'Texas',
            type: 'full-time',
            logo: '/assets/dicodinglogo.png',
        },
        {
            id: 'prof-2',
            company: 'Baylor Scott & White Health',
            position: 'Reporting and Business Intelligence Analyst',
            description: 'Built Tableau dashboards and Power BI scorecards to monitor healthcare operational performance across 25 facilities.',
            responsibilities: [
                'Built Tableau dashboards supported by Power BI scorecards to compare operational performance across 25 healthcare facilities, helping regional leaders evaluate clinical support and facility-level service trends.',
                'Combined healthcare operations, ServiceNow, and Excel reporting data through SQL and Power Query transformations, decreasing recurring reporting effort by 25% while creating standardized datasets for enterprise reporting.',
                'Designed healthcare scorecards with DAX and Tableau calculated fields to monitor patient-support operations, service availability, incident aging, and departmental performance during leadership reviews.',
                'Explored operational datasets using Python, Pandas, SQL, and Excel to identify recurring service patterns across facilities, contributing to a 40% decrease in average resolution time.',
                'Produced Tableau visualizations with geographic mapping, parameters, filters, and dashboard actions that enabled regional managers to compare facility performance and identify location-specific service gaps.',
                'Collaborated with clinical operations, infrastructure, and service-management teams to define reporting requirements and business rules, delivering analytics aligned with healthcare operational priorities.',
                'Validated healthcare reporting datasets through SQL reconciliation and Power Query quality checks, increasing source-to-report accuracy to 98% before publication through Power BI Service.',
                'Documented healthcare KPI definitions, reporting logic, dashboard specifications, and governance standards in Confluence and SharePoint, supporting consistent report delivery across BI teams.'
            ],
            skills: ['Tableau', 'Power BI', 'SQL', 'Power Query', 'DAX', 'Python', 'ServiceNow'],
            startDate: '2024-01-01',
            endDate: '2024-10-31',
            isOngoing: false,
            location: 'USA, Remote',
            type: 'full-time',
            logo: '/assets/dicodinglogo.png',
        },
        {
            id: 'prof-3',
            company: 'Cognizant',
            position: 'Operations Analyst',
            description: 'Analyzed operational workload, SLA performance, and service metrics, and automated reporting with Python and Pandas.',
            responsibilities: [
                'Analyzed operational workload, ticket backlog, SLA performance, and service metrics in Excel and ServiceNow for environments supporting 2,000+ users, enabling managers to balance workloads and prioritize operational activities.',
                'Generated Excel scorecards and operational reports from ServiceNow and SolarWinds using SQL and Power Query, lowering recurring report preparation time by 30% across weekly service reviews.',
                'Retrieval of operational data through SQL joins, CTEs, aggregations, and subqueries to evaluate ticket aging, backlog movement, escalation trends, and service-level compliance for support managers.',
                'Organized ticket categories, ownership groups, timestamps, and operational attributes through Power Query standardization, producing consistent datasets for incident and workload reporting.',
                'Examined recurring operational issues through Excel trend analysis, SQL reporting, and variance analysis, helping service teams decrease repeat operational issues by 25%.',
                'Automated recurring operational reporting with Python and Pandas to prepare categorized datasets and scheduled reports, saving 10 hours per week for the operations reporting team.',
                'Worked alongside service desk managers, infrastructure teams, and business stakeholders to define operational KPIs and reporting requirements, delivering reports that supported workforce planning and daily operations.',
                'Maintained report specifications, KPI documentation, operating procedures, and reporting standards in Confluence and SharePoint, creating consistent reporting practices across multiple support teams.'
            ],
            skills: ['Excel', 'ServiceNow', 'SQL', 'Power Query', 'Python', 'Pandas'],
            startDate: '2021-01-01',
            endDate: '2022-12-31',
            isOngoing: false,
            location: 'India',
            type: 'full-time',
            logo: '/assets/dicodinglogo.png',
        }
    ],
    education: [
        {
            id: 'edu-1',
            institution: 'Saint Louis University',
            degree: 'Master of Science',
            major: 'Information Systems',
            startDate: '2023-01-01',
            endDate: '2024-12-31',
            isOngoing: false,
            activities: ['Information Systems and Data Analysis'],
            achievements: ['Master of Science in Information Systems']
        }
    ],
    achievements: [
        { id: 'cert-1', title: 'Microsoft Power BI Data Analyst Professional Certificate', issuer: 'Coursera', date: '', category: 'certification' },
        { id: 'cert-2', title: 'Google Data Analytics Professional Certificate', issuer: 'Coursera', date: '', category: 'certification' },
        { id: 'cert-3', title: 'IBM Data Analyst Professional Certificate', issuer: 'Coursera', date: '', category: 'certification' },
        { id: 'cert-4', title: 'Google Advanced Data Analytics Professional Certificate', issuer: 'Coursera', date: '', category: 'certification' },
        { id: 'cert-5', title: 'Power BI Data Modeling with DAX', issuer: 'LinkedIn Learning', date: '', category: 'certification' },
        { id: 'cert-6', title: 'Tableau for Data Analysts', issuer: 'LinkedIn Learning', date: '', category: 'certification' }
    ],
    techStack: [
        { name: 'Power BI', icon: 'https://cdn.simpleicons.org/powerbi', category: 'tool' },
        { name: 'Tableau', icon: 'https://cdn.simpleicons.org/tableau', category: 'tool' },
        { name: 'SQL', icon: 'https://cdn.simpleicons.org/postgresql', category: 'language' },
        { name: 'Python', icon: 'https://cdn.simpleicons.org/python', category: 'language' },
        { name: 'Excel', icon: 'https://cdn.simpleicons.org/microsoftexcel', category: 'tool' },
        { name: 'Pandas', icon: 'https://cdn.simpleicons.org/pandas', category: 'framework' }
    ],
    hardSkills: [
        { name: 'Data Analysis', level: 'expert', category: 'data', description: 'Exploratory Data Analysis, Trend Analysis, Variance Analysis, Root-Cause Analysis, Data Validation, Data Reconciliation' },
        { name: 'Business Intelligence & Visualization', level: 'expert', category: 'data', description: 'Power BI, Tableau, Power BI Service, Interactive Dashboards, Executive Dashboards, KPI Scorecards, Drill-Through Reporting, Data Storytelling' },
        { name: 'Power BI & Tableau Development', level: 'expert', category: 'data', description: 'Power Query, DAX, Data Modeling, Semantic Models, Measures, Calculated Fields, Parameters, Filters, Dashboard Actions' },
        { name: 'SQL & Databases', level: 'advanced', category: 'data', description: 'SQL, Joins, Subqueries, CTEs, Aggregations, Data Extraction' },
        { name: 'Python & Automation', level: 'advanced', category: 'data', description: 'Python, Pandas, Data Transformation, Report Automation, Scheduled Reporting' },
        { name: 'Data Modeling & Quality', level: 'advanced', category: 'data', description: 'Dimensional Modeling, Star Schema, Data Dictionaries, Data Quality Checks, KPI Definitions, Data Quality Assurance' },
        { name: 'Business & Operational Analytics', level: 'expert', category: 'other', description: 'Requirements Gathering, Reporting Requirements, SLA Reporting, Incident Analytics, Service Performance Reporting, Process Improvement' }
    ],
    softSkills: [
        { name: 'Cross-Functional Collaboration', description: 'Working with product, operations, compliance, and engineering teams.' },
        { name: 'Stakeholder Management', description: 'Presenting clear dashboards, scorecards, and reports to leadership.' },
        { name: 'Analytical Thinking', description: 'Balancing business communication with hands-on reporting experience.' }
    ],
    tools: [
        { name: 'Power BI', icon: 'https://cdn.simpleicons.org/powerbi', category: 'productivity' },
        { name: 'Tableau', icon: 'https://cdn.simpleicons.org/tableau', category: 'productivity' },
        { name: 'Excel', icon: 'https://cdn.simpleicons.org/microsoftexcel', category: 'productivity' },
        { name: 'Python', icon: 'https://cdn.simpleicons.org/python', category: 'productivity' },
        { name: 'ServiceNow', icon: 'https://cdn.simpleicons.org/servicenow', category: 'devops' },
        { name: 'SharePoint', icon: 'https://cdn.simpleicons.org/microsoftsharepoint', category: 'productivity' },
        { name: 'Confluence', icon: 'https://cdn.simpleicons.org/confluence', category: 'productivity' }
    ],
    faqs: [
        {
            question: 'What is your core expertise?',
            answer: 'I specialize in Data Analysis, Business Intelligence, and Operational Reporting using Power BI, Tableau, SQL, and Python.',
        },
        {
            question: 'What is your technology stack?',
            answer: 'My primary tools include Power BI, Tableau, SQL, Python, Pandas, Excel, DAX, and Power Query.',
        },
        {
            question: 'Where are you located?',
            answer: 'I am based in Celina, TX (Open to Relocate) and available for Data Analyst roles.',
        }
    ],
    blogs: [],
    gallery: []
};
