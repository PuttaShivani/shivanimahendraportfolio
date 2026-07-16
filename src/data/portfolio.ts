import { PortfolioData } from '@/types';

export const portfolioData: PortfolioData = {
    personal: {
        name: 'Prudhvi Kumar Bollepalli',
        title: 'Data Engineer',
        subtitle: 'Data Engineer | ETL/ELT Pipelines | Cloud Data Solutions',
        bio: 'Data Engineer and SQL Developer with 5+ years of experience across software engineering, database development, batch integration, financial data processing, and cloud-based data solutions within financial services and enterprise environments. Experienced in converting operational and reporting requirements into validated datasets, dimensional models, lakehouse layers, and near-real-time data products that support servicing, compliance, analytics, and informed business decisions.',
        avatar: '/image.png',
        location: 'Memphis, TN',
        email: 'prudhvi.bollepalli@applywizard.ai',
        phone: '+1 (901) 335-0877',
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
            slug: 'cloud-financial-lakehouse',
            title: 'Cloud Financial Data Lakehouse',
            image: '/cloud-financial-lakehouse.jpg',
            description: 'Designed a medallion lakehouse ingesting batch and near-real-time events into Amazon S3 using AWS Glue and Athena.',
            longDescription: 'Designed a medallion lakehouse that ingested batch data from Amazon RDS and MySQL, near-real-time events through Amazon Kinesis, and REST API and JSON sources into Amazon S3 using AWS Glue, Glue Workflows, Glue Data Catalog, and Athena. Developed PySpark and Spark SQL workloads on Databricks and Amazon EMR with Delta Lake partitioning, schema enforcement, deduplication, watermark-based incremental loads, and SCD Type 1 and Type 2 processing, then published dbt models to Amazon Redshift.',
            techStack: ['AWS Glue', 'Amazon Athena', 'PySpark', 'Databricks', 'Delta Lake', 'dbt', 'Amazon Redshift', 'Airflow'],
            tools: ['Airflow', 'CloudWatch'],
            status: 'completed',
            repoUrl: '#',
            demoUrl: '#',
            startDate: '2023-01-01',
            role: 'Data Engineer',
            customTimeline: '2023',
            team: 'Data Platform',
            highlights: [
                'Designed a medallion lakehouse that ingested batch and near-real-time events into Amazon S3.',
                'Developed PySpark and Spark SQL workloads on Databricks and Amazon EMR with Delta Lake partitioning and SCD processing.',
                'Orchestrated Airflow workflows with automated retries and lineage checks, processing over 5 million records daily with 99.9% reliability.'
            ],
            category: 'Data Engineering',
            features: [
                {
                    title: 'Data Lakehouse',
                    items: [
                        '**Medallion Architecture**: Delta Lake partitioning, schema enforcement, and deduplication.',
                        '**Data Ingestion**: Batch data from RDS/MySQL, events from Kinesis, and REST API/JSON sources.',
                        '**Orchestration**: Airflow workflows processing 5M+ records daily.'
                    ]
                }
            ],
            challengesAndSolutions: [
                {
                    problem: 'Needed a scalable solution to handle both batch and real-time financial data.',
                    solution: 'Implemented a medallion lakehouse architecture using Databricks, Delta Lake, and AWS services.'
                }
            ]
        },
        {
            id: 'project-2',
            slug: 'gcp-analytics-pipeline',
            title: 'Real-Time Customer Event Streaming',
            image: '/gcp-analytics-pipeline.jpg',
            description: 'Built an event-ingestion pipeline transferring Kafka events through Pub/Sub, using Apache Beam and Dataflow.',
            longDescription: 'Built an event-ingestion pipeline that transferred Kafka application events through Google Pub/Sub, using Apache Beam and Dataflow to validate schemas, enrich records, route failures to dead-letter queues, and store trusted data in BigQuery and Cloud Storage. Processed event timestamps, watermarks, late arrivals, duplicate messages, and session windows through Dataflow and Spark Structured Streaming on Dataproc, producing near-real-time customer and transaction aggregates.',
            techStack: ['GCP', 'Pub/Sub', 'Apache Beam', 'Dataflow', 'BigQuery', 'dbt', 'Dataproc'],
            tools: ['Looker Studio', 'Cloud Composer'],
            status: 'completed',
            repoUrl: '#',
            demoUrl: '#',
            startDate: '2022-01-01',
            role: 'Data Engineer',
            customTimeline: '2022',
            team: 'Analytics Engineering',
            highlights: [
                'Built an event-ingestion pipeline transferring Kafka application events through Google Pub/Sub using Apache Beam and Dataflow.',
                'Processed event timestamps, watermarks, and session windows for near-real-time customer and transaction aggregates.',
                'Modeled optimized BigQuery datasets with dbt incremental transformations, reducing analytical query execution time by 40%.'
            ],
            category: 'Data Engineering',
            features: [
                {
                    title: 'Streaming Pipeline',
                    items: [
                        '**Event Processing**: Handled watermarks, late arrivals, and session windows via Dataflow and Dataproc.',
                        '**Data Modeling**: Optimized BigQuery datasets with dbt, cutting query time by 40%.',
                        '**Reporting**: Near-real-time dashboards via Looker Studio and Cloud Composer.'
                    ]
                }
            ],
            challengesAndSolutions: [
                {
                    problem: 'High latency in operational analysis due to batch processing delays.',
                    solution: 'Developed a near-real-time streaming pipeline using GCP Pub/Sub, Dataflow, and BigQuery.'
                }
            ]
        }
    ],
    experiences: [
        {
            id: 'prof-1',
            company: 'Beyond Finance',
            position: 'Data Engineer',
            description: 'Designed and maintained scalable AWS data pipelines across 4 financial data domains, processing high-volume client, account, payment, and transaction records.',
            responsibilities: [
                'Designed and maintained scalable AWS data pipelines across 4 financial data domains, processing high-volume client, account, payment, and transaction records.',
                'Delivered 25+ REST API integrations with Java, SQL, schema validation, and source-to-target mapping.',
                'Implemented change data capture, incremental loading, and audit controls to process only new or modified records.',
                'Tuned SQL execution plans, indexes, stored procedures, and database access patterns, decreasing account-data response times by 30%.',
                'Established 6 automated data-quality rules for completeness, datatype consistency, duplicate detection, and schema conformity.',
                'Operationalized pipeline monitoring through Amazon CloudWatch, audit logging, retry handling, and root-cause analysis.',
                'Secured cloud-based data exchanges with AWS IAM, controlled service permissions, and encrypted REST API communication.'
            ],
            skills: ['AWS', 'Java', 'SQL', 'Change Data Capture', 'Amazon CloudWatch', 'REST API'],
            startDate: '2024-10-01',
            isOngoing: true,
            location: 'Houston, TX',
            type: 'full-time',
            logo: '/assets/dicodinglogo.png',
        },
        {
            id: 'prof-2',
            company: 'Commerce Trust',
            position: 'Data Integration Engineer',
            description: 'Engineered scalable financial data integration pipelines across 3 portfolio domains, improving reporting accuracy.',
            responsibilities: [
                'Engineered scalable financial data integration pipelines across 3 portfolio domains, accelerating account and transaction availability.',
                'Formulated analytical SQL transformations with CTEs, window functions, and views for account-level datasets.',
                'Reconciled source and target records through Python, SQL, and transaction-level matching.',
                'Investigated 150+ production data defects with SQL troubleshooting, REST API payload analysis, and root-cause analysis.',
                'Applied 4 financial exception rules covering missing transactions, duplicate activity, and inconsistent status values.',
                'Automated 3 testing layers covering unit, integration, and regression validation through GitHub, Azure DevOps, and CI/CD.'
            ],
            skills: ['Python', 'SQL', 'Data Integration', 'Azure DevOps', 'CI/CD'],
            startDate: '2024-01-01',
            endDate: '2024-09-30',
            isOngoing: false,
            location: 'Pittsburg, KS',
            type: 'full-time',
            logo: '/assets/dicodinglogo.png',
        },
        {
            id: 'prof-3',
            company: 'Wipro',
            position: 'Database & ETL Developer',
            description: 'Designed and optimized enterprise ETL solutions across 3 relational database platforms, improving application and database performance by up to 35%.',
            responsibilities: [
                'Designed and optimized enterprise ETL solutions across 3 relational database platforms.',
                'Built scheduled batch ETL workflows for 3 source types using data extraction, transformation, and target loading.',
                'Structured normalized tables, primary and foreign keys, constraints, and physical data models in Oracle and SQL Server.',
                'Tuned stored procedures, functions, joins, indexes, and query execution plans.',
                'Instituted 4 migration-control checks covering record completeness, key relationships, and datatype conformity.',
                'Automated database-script validation, version control, and deployment gates through Git, Jenkins, and CI/CD.'
            ],
            skills: ['ETL', 'Oracle', 'SQL Server', 'Database Design', 'Jenkins'],
            startDate: '2020-04-01',
            endDate: '2023-03-31',
            isOngoing: false,
            location: 'India',
            type: 'full-time',
            logo: '/assets/dicodinglogo.png',
        }
    ],
    education: [
        {
            id: 'edu-1',
            institution: 'The University of Memphis | Memphis, TN',
            degree: 'Master of Science',
            major: 'Data Science',
            startDate: '2023-08-01',
            endDate: '2025-05-31',
            isOngoing: true,
            activities: ['Data science, data engineering, and analytics'],
            achievements: ['Master of Science in Data Science']
        },
        {
            id: 'edu-2',
            institution: 'JNTUK University | India',
            degree: 'Bachelor of Technology',
            major: 'Computer Science and Engineering',
            startDate: '2016-08-01',
            endDate: '2020-05-31',
            isOngoing: false,
            activities: ['Computer Science and Engineering core subjects'],
            achievements: ['Bachelor of Technology in CSE']
        }
    ],
    achievements: [
        { id: 'cert-1', title: 'IBM Data Engineering Professional Certificate', issuer: 'Coursera', date: '', category: 'certification' },
        { id: 'cert-2', title: 'DeepLearning.AI Data Engineering Professional Certificate', issuer: 'Coursera', date: '', category: 'certification' },
        { id: 'cert-3', title: 'Preparing for Google Cloud Certification: Cloud Data Engineer', issuer: 'Coursera', date: '', category: 'certification' },
        { id: 'cert-4', title: 'Data Engineering Foundations Professional Certificate', issuer: 'Astronomer / LinkedIn', date: '', category: 'certification' },
        { id: 'cert-5', title: 'Data Engineering Professional Certificate', issuer: 'Snowflake / LinkedIn', date: '', category: 'certification' },
        { id: 'cert-6', title: 'Apache Spark Essential Training: Big Data Engineering', issuer: 'LinkedIn Learning', date: '', category: 'certification' }
    ],
    techStack: [
        { name: 'Python', icon: 'https://cdn.simpleicons.org/python', category: 'language' },
        { name: 'SQL', icon: 'https://cdn.simpleicons.org/postgresql', category: 'language' },
        { name: 'PySpark', icon: 'https://cdn.simpleicons.org/apachespark', category: 'framework' },
        { name: 'Java', icon: 'https://cdn.simpleicons.org/java', category: 'language' },
        { name: 'AWS', icon: 'https://cdn.simpleicons.org/amazonaws', category: 'cloud' },
        { name: 'Google Cloud', icon: 'https://cdn.simpleicons.org/googlecloud', category: 'cloud' },
        { name: 'Apache Airflow', icon: 'https://cdn.simpleicons.org/apacheairflow', category: 'tool' },
        { name: 'dbt', icon: 'https://cdn.simpleicons.org/dbt', category: 'tool' },
        { name: 'Databricks', icon: 'https://cdn.simpleicons.org/databricks', category: 'cloud' },
        { name: 'Apache Kafka', icon: 'https://cdn.simpleicons.org/apachekafka', category: 'tool' },
    ],
    hardSkills: [
        { name: 'Programming Languages', level: 'expert', category: 'data', description: 'Python, SQL, PySpark, Java' },
        { name: 'Data Engineering & Integration', level: 'expert', category: 'data', description: 'ETL/ELT Pipeline Development, Batch Processing, Data Ingestion, Data Transformation, Incremental Loading, Change Data Capture' },
        { name: 'AWS & GCP Data Engineering', level: 'expert', category: 'cloud', description: 'Amazon S3, AWS Glue, EMR, Redshift, Athena, BigQuery, Pub/Sub, Dataflow, Dataproc, Cloud Composer' },
        { name: 'Lakehouse & Data Warehousing', level: 'advanced', category: 'data', description: 'Databricks, Delta Lake, Medallion Architecture, Dimensional Modeling, Star Schema, SCD Type 1 & 2' },
        { name: 'Databases & SQL Engineering', level: 'expert', category: 'data', description: 'SQL Server, Oracle, PostgreSQL, MySQL, Database Design, Stored Procedures, Window Functions, SQL Performance Tuning' },
        { name: 'Pipeline Orchestration', level: 'advanced', category: 'devops', description: 'Apache Airflow, dbt, Apache Spark, Structured Streaming, Apache Kafka, Apache Beam' },
    ],
    softSkills: [
        { name: 'Cross-Functional Collaboration', description: 'Collaborates with product, operations, compliance, QA, DevOps, and engineering teams.' },
        { name: 'Problem Solving', description: 'Investigating production defects, SQL troubleshooting, and root-cause analysis.' },
        { name: 'Data Quality & Governance', description: 'Implementing validation rules, referential integrity checks, and deduplication.' },
        { name: 'Agile & CI/CD', description: 'Working with Git, GitHub, Jenkins, Azure DevOps, and automated data testing.' }
    ],
    tools: [
        { name: 'Python', icon: 'https://cdn.simpleicons.org/python', category: 'productivity' },
        { name: 'Apache Airflow', icon: 'https://cdn.simpleicons.org/apacheairflow', category: 'devops' },
        { name: 'AWS', icon: 'https://cdn.simpleicons.org/amazonaws', category: 'devops' },
        { name: 'Google Cloud', icon: 'https://cdn.simpleicons.org/googlecloud', category: 'devops' },
        { name: 'Databricks', icon: 'https://cdn.simpleicons.org/databricks', category: 'productivity' },
        { name: 'PostgreSQL', icon: 'https://cdn.simpleicons.org/postgresql', category: 'productivity' },
        { name: 'Git', icon: 'https://cdn.simpleicons.org/git', category: 'devops' },
        { name: 'Jenkins', icon: 'https://cdn.simpleicons.org/jenkins', category: 'devops' }
    ],
    faqs: [
        {
            question: 'What is your core expertise?',
            answer: 'I specialize in Data Engineering, ETL/ELT pipeline development, cloud data solutions, and SQL development across AWS and GCP environments.',
        },
        {
            question: 'What is your technology stack?',
            answer: 'My tech stack includes Python, SQL, PySpark, AWS (Glue, EMR, Redshift, Athena), GCP (BigQuery, Dataflow, Dataproc), Databricks, Apache Airflow, and dbt.',
        },
        {
            question: 'Where are you located?',
            answer: 'I am based in Memphis, TN and available for Data Engineer roles.',
        }
    ],
    blogs: [],
    gallery: []
};
