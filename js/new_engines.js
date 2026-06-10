const engines = [
    {
        id: 'engine-1', title: 'OCR Engine', desc: 'Extracts, reads, and structures information from documents, images, forms, and scanned files.',
        problem: 'The client lacked a unified data infrastructure with disconnected internal and external sources, insufficient governance frameworks, and no centralized data quality monitoring. This limited reliable reporting, operational visibility, and confident decision-making.',
        solution: 'Delphi implemented a governed and scalable engine-driven architecture using Microsoft Fabric, Medallion Architecture, OneLake, and reusable AI/data workflows. Existing Alteryx and SQL workflows were transitioned into a modern platform, supported by a Governance Council and centralized enterprise data model to create a single source of truth.',
        flow: ['Document Input', 'Text Extraction', 'Field Recognition', 'Data Validation', 'Human Review', 'System Update', 'Monitoring'],
        capabilities: [
            { label: 'Extraction Accuracy', desc: '95%+ structured data extraction accuracy' },
            { label: 'Processing Speed', desc: 'Faster document and workflow processing' },
            { label: 'Automation Coverage', desc: 'Reduces manual review and repetitive effort' },
            { label: 'Data Quality', desc: 'Improves consistency, validation, and reporting reliability' },
            { label: 'Governance Readiness', desc: 'Supports traceability, ownership, and compliance' }
        ],
        usedIn: [
            { title: 'Healthcare — Clinical Document Intelligence', domain: 'Healthcare', desc: 'Extracts patient info from intake forms.' },
            { title: 'Finance — Risk & Compliance Reporting', domain: 'Finance', desc: 'Digitizes contracts for risk analysis.' },
            { title: 'Manufacturing — Quality Inspection Workflow', domain: 'Manufacturing', desc: 'Processes QA forms automatically.' },
            { title: 'Retail — Customer Data Intelligence', domain: 'Retail', desc: 'Reads receipts and loyalty cards.' },
            { title: 'Real Estate — Document Automation', domain: 'Real Estate', desc: 'Parses property agreements and titles.' },
            { title: 'Public Sector — Citizen Service Automation', domain: 'Public Sector', desc: 'Digitizes citizen applications.' }
        ],
        architecture: [
            { title: 'Input Sources', desc: 'Scanned files, PDFs, images, external APIs.' },
            { title: 'Processing Layer', desc: 'Pre-processing, deskewing, noise reduction.' },
            { title: 'AI / Engine Layer', desc: 'Optical Character Recognition & NLP.' },
            { title: 'Integration Layer', desc: 'REST endpoints and webhooks for system integration.' },
            { title: 'Governance Layer', desc: 'Data privacy controls and token redaction.' },
            { title: 'Output Systems', desc: 'EHR, CRM, ERP, Data Warehouse.' },
            { title: 'Monitoring Layer', desc: 'Latency, accuracy, and volume tracking.' }
        ],
        qa: [
            { title: 'Accuracy evaluation', desc: 'Continuous testing against benchmark datasets.' },
            { title: 'Data quality checks', desc: 'Schema validation and format enforcement.' },
            { title: 'Security and privacy validation', desc: 'PII detection and redaction testing.' },
            { title: 'Human-in-the-loop review', desc: 'Manual review queue for low-confidence scores.' },
            { title: 'Exception handling', desc: 'Automated alerts for missing mandatory fields.' },
            { title: 'Compliance checks', desc: 'Regular audits against HIPAA/GDPR requirements.' },
            { title: 'Performance monitoring', desc: 'Real-time dashboard for API response times.' },
            { title: 'Feedback loop', desc: 'System learns from human corrections.' },
            { title: 'Continuous improvement', desc: 'Periodic model retraining with new data.' }
        ]
    }
];

const engine_titles = {
    'engine-2': ['Agentic RAG Engine', 'Retrieval-Augmented Generation powered by autonomous agents that verify, cite, and synthesize information.'],
    'engine-3': ['AGUI Engine', 'Agentic Graphical User Interface that dynamically generates UI components based on user intent.'],
    'engine-4': ['Multi-Agent Orchestration Framework', 'Coordinates complex workflows across multiple specialized AI agents to solve multi-step problems.'],
    'engine-5': ['MCP Authentication / Authorization', 'Model Context Protocol layer ensuring secure, governed, and authorized access to enterprise data.'],
    'engine-6': ['Agent Ops Engine', 'Comprehensive monitoring, logging, and evaluation suite for AI agents in production environments.'],
    'engine-8': ['NLP Engine', 'Natural Language Processing for sentiment analysis, entity extraction, and text classification.'],
    'engine-9': ['Search Engine', 'Enterprise semantic search across structured and unstructured data silos.'],
    'engine-10': ['Rules Engine', 'Deterministic business logic execution for compliance and decision automation.'],
    'engine-11': ['Vision Engine', 'Computer vision for image classification, object detection, and anomaly spotting.'],
    'engine-12': ['Speech Engine', 'Speech-to-text and text-to-speech with emotion detection and speaker diarization.'],
    'engine-13': ['Document Intelligence Engine', 'Advanced AI to understand complex document layouts, signatures, and stamps.'],
    'engine-14': ['Knowledge Graph Engine', 'Constructs and queries relationships between entities across enterprise data.'],
    'engine-15': ['Recommendation Engine', 'Personalized content and product recommendations based on user behavior.'],
    'engine-16': ['Monitoring & Evaluation Engine', 'Continuous oversight of AI model drift, bias, and performance degradation.'],
    'engine-17': ['Workflow Automation Engine', 'Orchestrates APIs, scripts, and robotic process automation (RPA).'],
    'engine-18': ['Validation Engine', 'Checks confidence, completeness, accuracy, business rules, and exception conditions.'],
    'engine-19': ['Workflow Router', 'Routes outputs, actions, cases, or alerts to the correct system, queue, or user.'],
    'engine-20': ['Analytics Output Engine', 'Turns processed intelligence into dashboards, reports, insights, and measurable outcomes.']
};

for (const [engine_id, [title, desc]] of Object.entries(engine_titles)) {
    let new_engine = JSON.parse(JSON.stringify(engines[0]));
    new_engine.id = engine_id;
    new_engine.title = title;
    new_engine.desc = desc;

    // Custom overrides for specific engines
    if (engine_id === 'engine-3') {
        new_engine.qa = [
            { title: 'Accuracy Evaluation', desc: '' },
            { title: 'Hallucination Checks', desc: '' },
            { title: 'Security & Privacy', desc: '' },
            { title: 'Human-in-the-Loop', desc: '' },
            { title: 'Compliance & Audit', desc: '' },
            { title: 'Performance Testing', desc: '' }
        ];
    }

    engines.push(new_engine);
}

const engineData = engines;
