// Configure GSAP Plugins
gsap.registerPlugin(ScrollTrigger);

// --- Configuration & Assets --- //
const config = {
    canvasWidth: 1920,
    canvasHeight: 1080,
    sections: {
        one: {
            frameCount: 122, // 0 to 121
            path: 'assets/Section One/Scene 1_Cloud Entry  Cinematic Intro_',
            padding: 5
        },
        two: {
            frameCount: 122, // 0 to 121
            path: 'assets/Section One/Scene 2_Drone Descent  Reveal from Sky_',
            padding: 5
        },
        section2Base: 'assets/Section Two/Scene 2.2_Select Building.png',
        section2Hover: {
            left: 'assets/Section Two/Scene 2.2_Select Building_Showroom on Hover.png',
            center: 'assets/Section Two/Scene 2.2_Select Building_tower on Hover.png',
            right: 'assets/Section Two/Scene 2.2_Select Building_Manufaturing Unit on Hover.png'
        },
        section3: {
            frameCount: 355,
            path: 'assets/Section Two Click on Left most building B/Scene 3.2 Factoy enter_',
            padding: 5
        },
        section4Hover: [
            'assets/Services Hover from Building Left/Industries Hover Cards/1. Hover on Healthcare.jpg',
            'assets/Services Hover from Building Left/Industries Hover Cards/2. Hover on RealEstate.jpg',
            'assets/Services Hover from Building Left/Industries Hover Cards/3. Hover on Energy.jpg',
            'assets/Services Hover from Building Left/Industries Hover Cards/4. Hover on Government.jpg',
            'assets/Services Hover from Building Left/Industries Hover Cards/5. Hover on CPG.jpg',
            'assets/Services Hover from Building Left/Industries Hover Cards/6. Hover on Retail  Ecommerce.jpg',
            'assets/Services Hover from Building Left/Industries Hover Cards/7. Hover on Shipping, Ports & Logistics.jpg',
            'assets/Services Hover from Building Left/Industries Hover Cards/8. Hover on Other.jpg',
            'assets/Services Hover from Building Left/Industry Agnostic Business Domains Hover Cards/1. Hover on Executive.jpg',
            'assets/Services Hover from Building Left/Industry Agnostic Business Domains Hover Cards/2. Hover on Procurement.jpg',
            'assets/Services Hover from Building Left/Industry Agnostic Business Domains Hover Cards/3. Hover on Finance.jpg',
            'assets/Services Hover from Building Left/Industry Agnostic Business Domains Hover Cards/4. Hover on Human Capital.jpg',
            'assets/Services Hover from Building Left/Industry Agnostic Business Domains Hover Cards/5. Hover on Operations Quality.jpg',
            'assets/Services Hover from Building Left/Industry Agnostic Business Domains Hover Cards/6. Hover on Sales & Customer Experience.jpg',
            'assets/Services Hover from Building Left/Engins/1. Hover on OCR.jpg',
            'assets/Services Hover from Building Left/Engins/2. Hover on Agentic RAG.jpg',
            'assets/Services Hover from Building Left/Engins/3. Hover on AGUI.jpg',
            'assets/Services Hover from Building Left/Engins/4. Hover on Multi-Agent Orchestration FRamework.jpg',
            'assets/Services Hover from Building Left/Engins/5. Hover on MCP Authentication Authorization.jpg',
            'assets/Services Hover from Building Left/Engins/6. Hover on Agent Ops.jpg',
            'assets/Services Hover from Building Left/Engins/7. Hover on Other.jpg'
        ]
    }
};

const images = []; // Scroll sequence
const section2Images = {}; // Section 2
const section3Images = []; // Section 3 Entry
const section4Images = []; // Section 4 Service Hovers

let currentFrame = { frame: 0 };
// Calculate total frames exactly
let totalFramesToLoad = config.sections.one.frameCount +
    config.sections.two.frameCount +
    4 + // s2 base + 3 hovers
    config.sections.section3.frameCount +
    config.sections.section4Hover.length;
let loadedFrames = 0;
let isScrollComplete = false;

// --- Elements --- //
const canvas = document.getElementById('hero-canvas');
const ctx = canvas.getContext('2d', { alpha: false });
const progressBar = document.getElementById('progress-bar');
const loadingText = document.getElementById('loading-text');
const loadingScreen = document.getElementById('loading-screen');
const section2Hitboxes = document.getElementById('section-2-hitboxes');
const section4Services = document.getElementById('section-4-services');

// --- Initialization & Sizing --- //
function initCanvas() {
    canvas.width = config.canvasWidth;
    canvas.height = config.canvasHeight;
}

// --- Preloader Logic --- //
function pad(num, size) {
    let s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
}

function handleImageLoad() {
    loadedFrames++;
    const progress = Math.floor((loadedFrames / totalFramesToLoad) * 100);
    progressBar.style.width = `${progress}%`;
    loadingText.innerText = `Loading Experience ${progress}%`;

    if (loadedFrames === totalFramesToLoad) {
        onLoadingComplete();
    }
}

function preloadImages() {
    initCanvas();

    // Scene 1
    for (let i = 0; i < config.sections.one.frameCount; i++) {
        const img = new Image();
        img.src = `${config.sections.one.path}${pad(i, config.sections.one.padding)}.png`;
        images.push(img);
        img.onload = handleImageLoad;
        img.onerror = handleImageLoad;
    }

    // Scene 2
    for (let i = 0; i < config.sections.two.frameCount; i++) {
        const img = new Image();
        img.src = `${config.sections.two.path}${pad(i, config.sections.two.padding)}.png`;
        images.push(img);
        img.onload = handleImageLoad;
        img.onerror = handleImageLoad;
    }

    // Section 2
    const s2base = new Image();
    s2base.src = config.sections.section2Base;
    section2Images.base = s2base;
    s2base.onload = handleImageLoad;
    s2base.onerror = handleImageLoad;

    for (const key in config.sections.section2Hover) {
        const img = new Image();
        img.src = config.sections.section2Hover[key];
        section2Images[key] = img;
        img.onload = handleImageLoad;
        img.onerror = handleImageLoad;
    }

    // Scene 3 Entry
    for (let i = 0; i < config.sections.section3.frameCount; i++) {
        const img = new Image();
        img.src = `${config.sections.section3.path}${pad(i, config.sections.section3.padding)}.jpg`;
        section3Images.push(img);
        img.onload = handleImageLoad;
        img.onerror = handleImageLoad;
    }

    // Section 4 Service Hovers
    config.sections.section4Hover.forEach(src => {
        const img = new Image();
        img.src = src;
        section4Images.push(img);
        img.onload = handleImageLoad;
        img.onerror = handleImageLoad;
    });
}

function onLoadingComplete() {
    // Fade out loading screen
    loadingScreen.style.opacity = 0;
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        document.body.style.overflowY = 'auto'; // Re-enable scrolling
        canvas.style.opacity = 1;

        // Initial Draw
        renderFrame();

        // Setup Scroll Animations
        setupScrollAnimation();

        // Setup Section 2 Interactions
        setupSection2Interactions();
    }, 1000);
}

// --- Rendering Logic --- //
function renderFrame() {
    if (isScrollComplete) return;

    const frameIndex = Math.round(currentFrame.frame);
    if (images[frameIndex]) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(images[frameIndex], 0, 0, canvas.width, canvas.height);
    }
}

function drawStaticFrame(imgObj) {
    if (imgObj && imgObj.complete) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(imgObj, 0, 0, canvas.width, canvas.height);
    }
}

// --- Scroll Animation Setup --- //
function setupScrollAnimation() {
    const totalScrollFrames = config.sections.one.frameCount + config.sections.two.frameCount - 1;

    gsap.to(currentFrame, {
        frame: totalScrollFrames,
        snap: "frame",
        ease: "none",
        scrollTrigger: {
            trigger: "#scroll-spacer",
            start: "top top",
            end: "bottom bottom",
            scrub: 0.5,
            onUpdate: (self) => {
                if (self.progress === 1) {
                    if (!isScrollComplete) {
                        isScrollComplete = true;
                        section2Hitboxes.classList.remove('hidden');
                        drawStaticFrame(section2Images.base);
                    }
                } else {
                    if (isScrollComplete) {
                        isScrollComplete = false;
                        section2Hitboxes.classList.add('hidden');
                    }
                    renderFrame();
                }
            }
        }
    });
}

// --- Section 2 Hover & Click Logic --- //
function setupSection2Interactions() {
    let s2HoverContainer = document.getElementById('s2-hover-container');
    if (!s2HoverContainer) {
        s2HoverContainer = document.createElement('div');
        s2HoverContainer.id = 's2-hover-container';
        s2HoverContainer.style.position = 'absolute';
        s2HoverContainer.style.top = '0';
        s2HoverContainer.style.left = '0';
        s2HoverContainer.style.width = '100%';
        s2HoverContainer.style.height = '100%';
        s2HoverContainer.style.pointerEvents = 'none';
        s2HoverContainer.style.zIndex = '-1';
        section2Hitboxes.appendChild(s2HoverContainer);

        for (const key of ['left', 'center', 'right']) {
            const imgObj = section2Images[key];
            if (imgObj) {
                imgObj.style.position = 'absolute';
                imgObj.style.top = '0';
                imgObj.style.left = '0';
                imgObj.style.width = '100%';
                imgObj.style.height = '100%';
                imgObj.style.objectFit = 'fill';
                imgObj.style.opacity = '0';
                imgObj.style.transition = 'opacity 0.4s ease';
                s2HoverContainer.appendChild(imgObj);
            }
        }
    }

    const hitboxes = document.querySelectorAll('#section-2-hitboxes .hitbox');

    hitboxes.forEach(hitbox => {
        const newHitbox = hitbox.cloneNode(true);
        hitbox.parentNode.replaceChild(newHitbox, hitbox);
    });

    const newHitboxes = document.querySelectorAll('#section-2-hitboxes .hitbox');

    newHitboxes.forEach(hitbox => {
        hitbox.addEventListener('mouseenter', (e) => {
            if (!isScrollComplete) return;
            const target = e.target.getAttribute('data-target');
            if (section2Images[target]) {
                section2Images[target].style.opacity = '1';
            }
        });

        hitbox.addEventListener('mouseleave', (e) => {
            if (!isScrollComplete) return;
            const target = e.target.getAttribute('data-target');
            if (section2Images[target]) {
                section2Images[target].style.opacity = '0';
            }
        });

        hitbox.addEventListener('click', (e) => {
            if (!isScrollComplete) return;
            const target = e.target.getAttribute('data-target');
            if (target === 'left') {
                startSection3Entry();
            }
        });
    });
}

// --- Section 3 Entry Logic & Scroll Reversal --- //
let section3Obj = { frame: 0 };
let section3Tween = null;

function startSection3Entry() {
    section2Hitboxes.classList.add('hidden');

    // Disable main scroll interaction
    document.getElementById('scroll-spacer').style.display = 'none';
    document.body.style.overflowY = 'hidden';
    window.scrollTo(0, 0);

    // Reset frame if starting fresh
    section3Obj.frame = 0;

    section3Tween = gsap.to(section3Obj, {
        frame: config.sections.section3.frameCount - 1,
        snap: "frame",
        duration: 6.5, // Smoother 6.5s entry (approx 60fps)
        ease: "power2.inOut",
        onUpdate: () => {
            drawStaticFrame(section3Images[section3Obj.frame]);
        },
        onComplete: () => {
            setupSection4UI();
        },
        onReverseComplete: () => {
            // Reached the beginning, back to Section 2
            section2Hitboxes.classList.remove('hidden');
            drawStaticFrame(section2Images.base);

            // Re-enable main scroll
            document.getElementById('scroll-spacer').style.display = 'block';
            document.body.style.overflowY = 'auto';
            disableSection3Wheel();
        }
    });

    enableSection3Wheel();
}

function handleSection3Wheel(e) {
    // If the healthcare viewer is open, don't reverse the sequence
    if (healthcareUiContainer && !healthcareUiContainer.classList.contains('hidden')) return;

    if (e.deltaY < 0) {
        // Scrolling up -> reverse the sequence
        section4Services.classList.add('hidden'); // Hide services UI
        if (section3Tween) section3Tween.reverse();
    } else if (e.deltaY > 0) {
        // Scrolling down -> play sequence forward again if it was reversing
        if (section3Tween && section3Tween.reversed()) {
            section3Tween.play();
        }
    }
}

function enableSection3Wheel() {
    window.addEventListener('wheel', handleSection3Wheel, { passive: true });
}

function disableSection3Wheel() {
    window.removeEventListener('wheel', handleSection3Wheel);
}

// --- Section 4 Services Logic --- //
function setupSection4UI() {
    // Show the interactive hitboxes for the 14 services
    section4Services.classList.remove('hidden');

    let hoverBgContainer = document.getElementById('hover-bg-container');
    if (!hoverBgContainer) {
        hoverBgContainer = document.createElement('div');
        hoverBgContainer.id = 'hover-bg-container';
        hoverBgContainer.style.position = 'absolute';
        hoverBgContainer.style.top = '0';
        hoverBgContainer.style.left = '0';
        hoverBgContainer.style.width = '100%';
        hoverBgContainer.style.height = '100%';
        hoverBgContainer.style.pointerEvents = 'none';
        hoverBgContainer.style.zIndex = '-1';
        section4Services.appendChild(hoverBgContainer);

        section4Images.forEach((imgObj) => {
            imgObj.style.position = 'absolute';
            imgObj.style.top = '0';
            imgObj.style.left = '0';
            imgObj.style.width = '100%';
            imgObj.style.height = '100%';
            imgObj.style.objectFit = 'fill';
            imgObj.style.opacity = '0';
            imgObj.style.transition = 'opacity 0.4s ease';
            hoverBgContainer.appendChild(imgObj);
        });
    }

    const serviceCards = document.querySelectorAll('.service-card');

    serviceCards.forEach(card => {
        const newCard = card.cloneNode(true);
        card.parentNode.replaceChild(newCard, card);
    });

    const newServiceCards = document.querySelectorAll('.service-card');

    newServiceCards.forEach(card => {
        card.addEventListener('mouseenter', (e) => {
            const index = parseInt(e.target.getAttribute('data-index')) - 1;
            if (section4Images[index]) {
                section4Images[index].style.opacity = '1';
            }
        });

        card.addEventListener('mouseleave', (e) => {
            const index = parseInt(e.target.getAttribute('data-index')) - 1;
            if (section4Images[index]) {
                section4Images[index].style.opacity = '0';
            }
        });

        card.addEventListener('click', (e) => {
            const index = parseInt(e.target.getAttribute('data-index'));
            if (index === 1) { // Healthcare
                showHealthcareDetails();
            } else if (index >= 15 && index <= 20) { // Main Engines
                openEngineDetail('engine-' + (index - 14));
            } else if (index === 21) { // Other Engines
                openOtherEngines();
            }
        });
    });
}

// --- Section 5 & 6 Healthcare UI Flow Logic --- //
const healthcareUiContainer = document.getElementById('healthcare-ui-container');
const screenLanding = document.getElementById('screen-landing');
const screenClinical = document.getElementById('screen-clinical');
const screenDeepDive = document.getElementById('screen-deep-dive');

// --- URL Routing Logic --- //
function updateUrlHash(params, skip = false) {
    if (skip) return;
    const currentParams = new URLSearchParams(window.location.hash.replace('#', '?'));
    for (const [key, value] of Object.entries(params)) {
        if (value === null) {
            currentParams.delete(key);
        } else {
            currentParams.set(key, value);
        }
    }
    const newHash = currentParams.toString();
    const newUrl = newHash ? '#' + newHash : window.location.pathname;
    if (window.location.hash !== '#' + newHash) {
        history.pushState(null, '', newUrl);
    }
}

function restoreStateFromHash() {
    const hash = window.location.hash;
    if (!hash || hash === '#' || hash === '#/') {
        goToHome(true);
        return;
    }

    const params = new URLSearchParams(hash.replace('#', '?'));
    const screen = params.get('screen');
    const tab = params.get('tab');
    const model = params.get('model');
    const deepdive = params.get('deepdive');
    const practice = params.get('practice');

    if (screen === 'landing') {
        if (deepdive) {
            openDeepDiveScreen(deepdive, true);
        } else {
            openScreen('screen-landing', true);
            if (tab) {
                const btn = document.querySelector(`.hc-master-tab[onclick*="${tab}"]`);
                if (btn) switchHcMainTab(tab, btn, true);
            }
            if (model) {
                const btn = document.querySelector(`li[onclick*="${model}"]`);
                if (btn) showDataModel(model, btn, true);
            }
        }
    } else if (screen === 'practices') {
        openScreen('screen-frameworks', true);
        if (practice) {
            // Find practice element containing the practice name or click the first one if not easily selectable
            const btn = Array.from(document.querySelectorAll('#practices-list li')).find(el => el.innerText.includes(practice)) || document.querySelector('#practices-list li');
            if (btn) selectPractice(btn, true);
        }
    } else if (screen === 'clinical') {
        openScreen('screen-clinical', true);
    } else {
        goToHome(true);
    }
}

window.addEventListener('hashchange', restoreStateFromHash);
document.addEventListener('DOMContentLoaded', restoreStateFromHash);

const backToShowroomBtns = document.querySelectorAll('.back-btn');
const btnPrevLanding = document.getElementById('btn-prev-landing');

function hideAllScreens() {
    if (screenLanding) screenLanding.classList.add('hidden');
    if (screenClinical) screenClinical.classList.add('hidden');
    if (screenDeepDive) screenDeepDive.classList.add('hidden');
    const placeholders = ['screen-frameworks', 'screen-best-practices'];
    placeholders.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.add('hidden');
    });
}

const useCaseData = [
    {
        id: 'uc-1', title: 'AI Symptom Checker & Patient Care Bot',
        desc: 'Track symptoms, book appointments, receive post-discharge support, and get AI-powered health guidance through voice and text.',
        domain: 'healthcare', tech: 'ai', tags: ['AI', 'Digital', 'Healthcare'],
        project: 'production', impact: 'Smarter Patient Engagement',
        image: 'assets/Use Cases Footages/Care Sync AI/Care Sync_Mockup.png',
        deepDive: {
            subtitle: "An AI-powered healthcare assistant that helps patients track symptoms, describe health concerns through voice or text, book appointments, receive post-discharge support, and stay connected through an AI-powered healthcare community.",
            executiveSummary: "An advanced AI-driven patient care assistant designed to support symptom checking, appointment booking, post-discharge care, medication reminders, and condition-specific patient engagement.",
            problem: "Patients need a single platform for symptom checking, appointment booking, post-discharge support, and medication reminders. Existing care journeys are fragmented across multiple touchpoints, reducing care continuity and increasing patient confusion.",
            solution: "Integrated multi-model AI agents for medical analysis, report generation, voice-enabled interaction, and text-based support. Built using scalable Azure services and HIPAA/GDPR-compliant security frameworks.",
            outcome: "A one-stop digital health assistant that improves accessibility, care continuity, compliance, and family-centered patient engagement through AI-powered automation.",
            kpis: [
                { label: "Accessibility", value: "Voice-Enabled", desc: "Hands-free symptom description through natural voice interaction." },
                { label: "Care Continuity", value: "Post-Discharge", desc: "Follow-up prompts and medication reminders after discharge." },
                { label: "Compliance", value: "HIPAA & GDPR", desc: "Secure privacy-first healthcare data handling." },
                { label: "Engagement", value: "Family-Centered", desc: "Enables family members to share updates and stay involved." }
            ],
            media: [
                { type: 'image', src: 'assets/Use Cases Footages/Care Sync AI/Care Sync_Mockup.png' },
                { type: 'image', src: 'assets/Use Cases Footages/Care Sync AI/Care Sync_Mockup.png' },
                { type: 'image', src: 'assets/Use Cases Footages/Care Sync AI/Care Sync_Mockup.png' },
                { type: 'video', src: 'https://www.w3schools.com/html/mov_bbb.mp4' }
            ],
            architecture: {
                title: "AI Symptom Checker & Patient Care Bot — Architecture",
                desc: "High-level architecture showing how patient intake documents move through upload channels, OCR processing, AI extraction, validation, review workflow, and downstream healthcare systems.",
                img: "assets/Use Cases Footages/Care Sync AI/Technical Arc_Architecture.png"
            },
            engineMap: {
                title: "AI Symptom Checker & Patient Care Bot — Engine Map / AI Flow",
                desc: "AI flow showing how intake data is extracted, classified, validated, routed for exception handling, and converted into structured output for system entry.",
                img: "assets/Use Cases Footages/Care Sync AI/Mockup_Engine_Map_AI_Flow.png"
            }
        }
    },
    {
        id: 'uc-2',
        title: 'Data Warehousing & Social Media Analytics',
        desc: 'Consolidate social media, web analytics, and sales data into a Microsoft Fabric warehouse for faster marketing intelligence and reliable dashboards.',
        domain: 'retail',
        tech: 'data',
        tags: ['Data', 'Cloud', 'Microsoft Fabric', 'Retail'],
        project: 'production',
        impact: 'Improved Marketing Intelligence',
        image: 'assets/Card Images/Card Image 2.jpg',
        client: 'Huda Beauty',
        deepDive: {
            subtitle: "A Microsoft Fabric-based Data Warehouse consolidating social media ad platforms, web analytics, and sales reports — delivering automated pipelines, consistent dashboards, and significantly improved refresh performance for marketing intelligence.",
            executiveSummary: "A modern data warehousing and analytics platform designed to unify Huda Beauty's marketing, web, and sales data into a governed Microsoft Fabric environment for faster, more reliable decision-making.",
            problem: "Scattered data sources across social media platforms, analytics tools, and sales systems caused inconsistent insights, frequent manual updates, and delays — requiring a comprehensive migration to Microsoft Fabric.",
            solution: "Applied Medallion Architecture on Microsoft Fabric, configured automated ingestion pipelines, developed a centralized data model in Lakehouse, and migrated existing dashboards to the new environment.",
            outcome: "A unified marketing analytics foundation that improves dashboard performance, strengthens data reliability, enables faster refresh cycles, and gives business users more confidence in campaign and sales insights.",
            kpis: [
                { label: "Dashboard Performance", value: "Significantly Improved", desc: "Migration to Fabric's Delta Data Warehouse and optimized refresh processes reduced downtime." },
                { label: "Data Reliability", value: "Error-Free Transfers", desc: "Automated data connectivity enhanced efficient and error-free transfers across all business functions." },
                { label: "Decision Confidence", value: "Data-Driven", desc: "Unified reference data model empowered the client to make data-driven decisions with greater depth." },
                { label: "Data Freshness", value: "Incremental Updates", desc: "Automated incremental updates ensured consistently fresh and accurate data for timely insights." }
            ]
        }
    },
    {
        id: 'uc-3',
        title: 'Enterprise AI Agent Orchestration Platform',
        desc: 'Manage, coordinate, and govern multiple AI agents through a centralized orchestration layer with observability, traceability, and scalable deployment.',
        domain: 'real-estate',
        tech: 'ai',
        tags: ['AI', 'Digital', 'Cloud', 'Real Estate'],
        project: 'production',
        impact: 'Governed Enterprise AI Operations',
        image: 'assets/Card Images/Card Image 3.jpg',
        client: 'Aldar',
        deepDive: {
            subtitle: "A centralized AI orchestration platform using the Agno framework — managing, coordinating, and governing multiple AI agents with full observability, secure agent creation via MCP, and scalable enterprise deployment.",
            executiveSummary: "An enterprise-grade AI agent orchestration platform created to help Aldar govern, monitor, and scale multiple AI agents across business workflows with secure automation and full traceability.",
            problem: "No centralized platform existed to manage multiple AI agents across workflows, with limited observability into agent execution, no secure authenticated agent creation, and no scalable deployment architecture.",
            solution: "Deployed a centralized AI orchestration platform using Agno with full observability, MCP-authenticated agent creation, controlled automation, traceability mechanisms, and scalable deployment standards.",
            outcome: "A governed enterprise AI operating model that provides full visibility over AI agents, strengthens compliance, enables proactive monitoring, and accelerates the onboarding of new AI use cases.",
            kpis: [
                { label: "Governance Control", value: "Full Visibility", desc: "Centralized governance layer provided full control and visibility over all AI agent operations." },
                { label: "Issue Resolution", value: "Proactive Monitoring", desc: "Full observability enabled proactive monitoring, faster issue resolution, and continuous agent improvement." },
                { label: "Compliance", value: "Strengthened", desc: "Controlled automation and traceability mechanisms provided an auditable record of all AI-driven actions." },
                { label: "Scalability", value: "Rapid Agent Onboarding", desc: "Scalable architecture enabled rapid onboarding of new agents and use cases at enterprise scale." }
            ]
        }
    },
    {
        id: 'uc-4',
        title: 'Caregiver Assistant Platform',
        desc: 'Enable caregivers to access approved organizational knowledge through a secure conversational platform with role-based access and governed responses.',
        domain: 'healthcare',
        tech: 'ai',
        tags: ['AI', 'Digital', 'Healthcare'],
        project: 'production',
        impact: 'Faster Knowledge Access',
        image: 'assets/Card Images/Card Image 4.jpg',
        client: 'CCAD',
        deepDive: {
            subtitle: "An intelligent, secure conversational platform enabling caregivers to access approved organizational knowledge through a centralized interface — with role-based access, retrieval-augmented responses, and full administrative governance.",
            executiveSummary: "A secure caregiver assistant designed to simplify knowledge discovery across healthcare systems, enabling faster access to accurate information through a centralized AI-powered conversational experience.",
            problem: "Caregivers needed a unified secure interface for organizational knowledge dispersed across multiple systems, with no structured orchestration for query handling, absent admin governance, and unmet compliance requirements.",
            solution: "Designed a centralized conversational platform with intelligent request routing, multi-source response consolidation, and comprehensive admin controls for user management, knowledge repositories, audit logging, and retention policies.",
            outcome: "A governed caregiver knowledge platform that reduces time spent searching across systems, improves decision speed, eliminates information silos, and provides a scalable foundation for future healthcare knowledge expansion.",
            kpis: [
                { label: "Workflow Efficiency", value: "Streamlined", desc: "Reduced time spent searching across multiple systems, enabling faster access to accurate information." },
                { label: "Decision Speed", value: "Accelerated", desc: "Consolidated real-time responses from multiple knowledge sources helped users make informed decisions faster." },
                { label: "Knowledge Accessibility", value: "Silos Eliminated", desc: "Internal repositories and approved external sources in a single platform significantly improved knowledge access." },
                { label: "Governance", value: "Scalable & Auditable", desc: "Scalable architecture with RBAC, audit logs, and retention policies supports future expansion." }
            ]
        }
    },
    {
        id: 'uc-5',
        title: 'Enterprise Data Platform — Project OneLake',
        desc: 'Centralize Retail and Residential data on Microsoft Fabric and OneLake with governed self-service analytics, standardized KPIs, and faster reporting.',
        domain: 'real-estate',
        tech: 'data',
        tags: ['Data', 'Cloud', 'Microsoft Fabric', 'Governance'],
        project: 'production',
        impact: 'Trusted Cross-Functional Reporting',
        image: 'assets/Card Images/Card Image 5.jpg',
        client: 'DHAM',
        deepDive: {
            subtitle: "A centralized Microsoft Fabric and OneLake enterprise data platform for Retail and Residential business units — delivering governed self-service analytics, a reusable semantic KPI layer, and consistent cross-functional reporting.",
            executiveSummary: "A future-ready enterprise data platform built for DHAM to unify fragmented Retail and Residential data, standardize KPIs, improve governance, and enable trusted self-service analytics through Microsoft Fabric and OneLake.",
            problem: "Fragmented data warehouses across Retail and Residential business units, mismatched KPI definitions, complex multi-source integration, and the need for role-based security and data quality reconciliation created reporting inconsistency.",
            solution: "Established Microsoft Fabric and OneLake with Medallion Architecture, built standardized ingestion pipelines, applied Silver layer business rules, created a semantic model layer, and implemented security-by-design with RBAC and RLS.",
            outcome: "A governed OneLake platform that simplifies data access, improves dashboard performance, standardizes KPIs, strengthens lineage visibility, and creates an AI-ready foundation for future analytics use cases.",
            kpis: [
                { label: "Dashboard Performance", value: "Near-Import Speed", desc: "Direct Lake mode enabled near-import performance with lightweight refresh behavior at scale." },
                { label: "Data Governance", value: "End-to-End Lineage", desc: "Microsoft Purview and Fabric improved data lineage visibility and governance across all source systems." },
                { label: "Metric Consistency", value: "Standardized KPIs", desc: "Semantic KPI layer prevented redefinition of metrics ensuring consistent insights across Retail and Residential." },
                { label: "Operational Model", value: "Future-Ready", desc: "Medallion separation supported maintainable operations with controlled change management and AI-ready foundation." }
            ]
        }
    },
    {
        id: 'uc-6', title: 'Resource Allocation', desc: 'Predict staffing and bed needs based on patient influx.',
        domain: 'clinic', tech: 'predictive-ml', project: 'mvp', impact: 'Optimized Staffing', image: 'assets/Card Images/Card Image 1.jpg',
        deepDive: { subtitle: "", executiveSummary: "", problem: "", solution: "", outcome: "", kpis: [] }
    },
    {
        id: 'uc-7', title: 'Denial Prevention', desc: 'Predict and prevent insurance claim denials.',
        domain: 'insurance', tech: 'predictive-ml', project: 'production', impact: '40% Fewer Denials', image: 'assets/Card Images/Card Image 2.jpg',
        deepDive: { subtitle: "", executiveSummary: "", problem: "", solution: "", outcome: "", kpis: [] }
    },
    {
        id: 'uc-8', title: '24/7 Appointment Scheduling', desc: 'Automated booking and rescheduling for patients.',
        domain: 'clinic', tech: 'generative-ai', project: 'production', impact: '24/7 Availability', image: 'assets/Card Images/Card Image 3.jpg',
        deepDive: { subtitle: "", executiveSummary: "", problem: "", solution: "", outcome: "", kpis: [] }
    },
    {
        id: 'uc-9', title: 'Symptom Checker', desc: 'AI-driven initial symptom assessment and triage.',
        domain: 'pharmacy', tech: 'nlp', project: 'mvp', impact: 'Faster Triage', image: 'assets/Card Images/Card Image 4.jpg',
        deepDive: { subtitle: "", executiveSummary: "", problem: "", solution: "", outcome: "", kpis: [] }
    },
    {
        id: 'uc-10', title: 'Billing Explanations', desc: 'Help patients understand their bills via chat.',
        domain: 'hospital', tech: 'generative-ai', project: 'poc', impact: 'Higher Satisfaction', image: 'assets/Card Images/Card Image 5.jpg',
        deepDive: { subtitle: "", executiveSummary: "", problem: "", solution: "", outcome: "", kpis: [] }
    },
    {
        id: 'uc-11', title: 'Automated Screening', desc: 'Highlight potential anomalies in X-rays and MRIs.',
        domain: 'hospital', tech: 'computer-vision', project: 'production', impact: 'Faster Diagnosis', image: 'assets/Card Images/Card Image 1.jpg',
        deepDive: { subtitle: "", executiveSummary: "", problem: "", solution: "", outcome: "", kpis: [] }
    },
    {
        id: 'uc-12', title: 'Scan Prioritization', desc: 'Route urgent scans to top of radiologist queue.',
        domain: 'clinic', tech: 'predictive-ml', project: 'production', impact: 'Priority Routing', image: 'assets/Card Images/Card Image 2.jpg',
        deepDive: { subtitle: "", executiveSummary: "", problem: "", solution: "", outcome: "", kpis: [] }
    },
    {
        id: 'uc-13', title: 'Claim Scrubbing', desc: 'Automatically validate claims against payer rules before submission.',
        domain: 'insurance', tech: 'nlp', project: 'production', impact: 'Zero Errors', image: 'assets/Card Images/Card Image 3.jpg',
        deepDive: { subtitle: "", executiveSummary: "", problem: "", solution: "", outcome: "", kpis: [] }
    },
    {
        id: 'uc-14', title: 'Prior Authorization', desc: 'Automate prior authorization requests from EHR data.',
        domain: 'hospital', tech: 'generative-ai', project: 'mvp', impact: 'Instant Approvals', image: 'assets/Card Images/Card Image 4.jpg',
        deepDive: { subtitle: "", executiveSummary: "", problem: "", solution: "", outcome: "", kpis: [] }
    },
    {
        id: 'uc-15', title: 'Genomic Profiling', desc: 'Match patient profiles to targeted therapies.',
        domain: 'pharmacy', tech: 'predictive-ml', project: 'poc', impact: 'Targeted Therapy', image: 'assets/Card Images/Card Image 5.jpg',
        deepDive: { subtitle: "", executiveSummary: "", problem: "", solution: "", outcome: "", kpis: [] }
    }
];

let currentPage = 1;
const itemsPerPage = 10;

function goBackOneScreen() {
    if (screenDeepDive && !screenDeepDive.classList.contains('hidden')) {
        hideAllScreens();
        if (screenLanding) screenLanding.classList.remove('hidden');
    } else {
        const p1 = document.getElementById('screen-data-models');
        const p2 = document.getElementById('screen-frameworks');
        if ((p1 && !p1.classList.contains('hidden')) ||
            (p2 && !p2.classList.contains('hidden'))) {
            hideAllScreens();
            if (screenLanding) screenLanding.classList.remove('hidden');
        } else {
            goToHome();
        }
    }
}

function openScreen(screenId, skipHashUpdate = false) {
    hideAllScreens();
    const screen = document.getElementById(screenId);
    if (screen) {
        screen.classList.remove('hidden');
        window.scrollTo(0, 0);
    }
    if (screenId === 'screen-landing') {
        updateUrlHash({ screen: 'landing', deepdive: null }, skipHashUpdate);
    } else if (screenId === 'screen-clinical') {
        updateUrlHash({ screen: 'clinical', tab: null, model: null, deepdive: null }, skipHashUpdate);
    } else if (screenId === 'screen-frameworks') {
        updateUrlHash({ screen: 'practices', tab: null, model: null, deepdive: null }, skipHashUpdate);
    }
}

function showHealthcareDetails() {
    hideAllScreens();
    if (screenLanding) screenLanding.classList.remove('hidden');

    // Show container and hide main app
    if (healthcareUiContainer) healthcareUiContainer.classList.remove('hidden');
    const mainContainer = document.getElementById('main-container');
    if (mainContainer) mainContainer.classList.add('hidden');
    document.body.style.overflowY = 'hidden';
    window.scrollTo(0, 0);

    // Render capabilities on open
    currentPage = 1;
    renderUseCases();
}

// Remove old openClinicalScreen and setup Filters
function renderUseCases() {
    const grid = document.getElementById('capabilities-grid');
    if (!grid) return;
    grid.innerHTML = '';

    const usecaseFilter = document.getElementById('filter-usecase')?.value || 'all';
    const techFilter = document.getElementById('filter-tech')?.value || 'all';
    const domainFilter = document.getElementById('filter-domain')?.value || 'all';
    const projectFilter = document.getElementById('filter-project')?.value || 'all';
    const searchQuery = document.getElementById('search-cards')?.value.toLowerCase() || '';

    let filteredData = useCaseData.filter(uc => {
        if (techFilter !== 'all' && uc.tech !== techFilter) return false;
        if (domainFilter !== 'all' && uc.domain !== domainFilter) return false;
        if (projectFilter !== 'all' && uc.project !== projectFilter) return false;
        if (searchQuery && !uc.title.toLowerCase().includes(searchQuery) && !uc.desc.toLowerCase().includes(searchQuery)) return false;
        // Mock usecase filter logic since we didn't tag exactly 'patient-intake', 'clinical-ops' etc in the new mock. 
        // We'll just ignore usecaseFilter for this mock data unless we added it.
        return true;
    });

    const totalPages = Math.ceil(filteredData.length / itemsPerPage) || 1;
    if (currentPage > totalPages) currentPage = totalPages;

    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

    paginatedData.forEach(uc => {
        const card = document.createElement('div');
        card.className = 'use-case-card highlight-card';
        card.style.position = 'relative';

        card.innerHTML = `
            <div class="card-img" style="background-image: url('${uc.image}');">
                <div class="card-glass-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M12 20V10M18 20V4M6 20v-4"/>
                    </svg>
                </div>
            </div>
            <div class="card-content">
                <h3>${uc.title}</h3>
                <p>${uc.desc}</p>
                <div class="card-tags">
                    ${uc.tags ? uc.tags.map(t => `<span class="tag-pill">${t.toUpperCase()}</span>`).join('') : `
                    <span class="tag-pill domain">${uc.domain.toUpperCase()}</span>
                    <span class="tag-pill tech">${uc.tech.replace('-', ' ').toUpperCase()}</span>
                    `}
                </div>
                
                <div class="card-footer-impact">
                    <div class="impact-stats">
                        <span class="impact-title">Business Impact</span>
                        <span class="impact-value" style="font-size:1.1rem; color:#fff;">${uc.impact}</span>
                    </div>
                </div>
                
                <div class="card-actions">
                    <button class="btn-demo" onclick="event.stopPropagation(); openDeepDiveScreen('${uc.id}')">Demo</button>
                    <button class="btn-proto" onclick="event.stopPropagation(); openDeepDiveScreen('${uc.id}')">View Prototype</button>
                </div>
            </div>
        `;

        card.addEventListener('click', () => openDeepDiveScreen(uc.id));
        grid.appendChild(card);
    });

    if (paginatedData.length === 0) {
        grid.innerHTML = '<p style="color:#aaa; grid-column:1/-1; text-align:left; padding: 40px 0; font-size:1.1rem;">No use cases found matching your criteria.</p>';
    }

    renderPagination(totalPages);
}

function renderPagination(totalPages) {
    const pageNumbers = document.getElementById('page-numbers');
    const btnPrev = document.getElementById('page-prev');
    const btnNext = document.getElementById('page-next');
    if (!pageNumbers) return;

    pageNumbers.innerHTML = '';
    btnPrev.disabled = (currentPage === 1);
    btnNext.disabled = (currentPage === totalPages || totalPages === 0);

    for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement('button');
        btn.className = 'page-num' + (i === currentPage ? ' active' : '');
        btn.innerText = i;
        btn.addEventListener('click', () => {
            currentPage = i;
            renderUseCases();
        });
        pageNumbers.appendChild(btn);
    }
}

// Attach filter listeners
['filter-usecase', 'filter-tech', 'filter-domain', 'filter-project', 'search-cards'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
        el.addEventListener(el.tagName === 'SELECT' ? 'change' : 'input', () => {
            currentPage = 1;
            renderUseCases();
        });
    }
});

const clearBtn = document.getElementById('clear-filters');
if (clearBtn) {
    clearBtn.addEventListener('click', () => {
        document.getElementById('filter-usecase').value = 'all';
        document.getElementById('filter-tech').value = 'all';
        document.getElementById('filter-domain').value = 'all';
        document.getElementById('filter-project').value = 'all';
        document.getElementById('search-cards').value = '';
        currentPage = 1;
        renderUseCases();
    });
}
const btnPrevPage = document.getElementById('page-prev');
if (btnPrevPage) btnPrevPage.addEventListener('click', () => { if (currentPage > 1) { currentPage--; renderUseCases(); } });
const btnNextPage = document.getElementById('page-next');
if (btnNextPage) btnNextPage.addEventListener('click', () => { currentPage++; renderUseCases(); });


function openDeepDiveScreen(ucId, skipHashUpdate = false) {
    hideAllScreens();
    if (screenDeepDive) {
        screenDeepDive.classList.remove('hidden');
        window.scrollTo(0, 0);
        populateDeepDive(ucId);
        updateUrlHash({ screen: 'landing', deepdive: ucId }, skipHashUpdate);
    }
}

function populateDeepDive(ucId) {
    // Find Use Case Data
    const uc = useCaseData.find(item => item.id === ucId);

    if (uc) {
        // Breadcrumbs update
        const bcUsecaseName = document.getElementById('bc-usecase-name');
        if (bcUsecaseName) bcUsecaseName.innerText = uc.title;

        // Populate Deep Dive HTML
        const titleEl = document.getElementById('deep-dive-title');
        if (titleEl) titleEl.innerText = uc.title;

        const subtitleEl = document.getElementById('deep-dive-subtitle');
        if (subtitleEl) subtitleEl.innerText = uc.deepDive?.subtitle || uc.desc;

        const tagsContainer = document.getElementById('dd-tags-container');
        if (tagsContainer) {
            tagsContainer.innerHTML = '';
            if (uc.tags) {
                uc.tags.forEach(t => {
                    tagsContainer.innerHTML += `<button class="action-btn" style="padding: 6px 12px; font-size: 0.8rem;">${t}</button>`;
                });
            } else {
                tagsContainer.innerHTML += `<button class="action-btn" style="padding: 6px 12px; font-size: 0.8rem;">${uc.domain.toUpperCase()}</button>`;
                tagsContainer.innerHTML += `<button class="action-btn" style="padding: 6px 12px; font-size: 0.8rem;">${uc.tech.toUpperCase()}</button>`;
            }
        }

        // Breakdown content
        const execSum = document.getElementById('dd-exec-summary');
        if (execSum) execSum.innerHTML = `<p>${uc.deepDive?.executiveSummary || "Details coming soon..."}</p>`;

        const problemEl = document.getElementById('dd-problem');
        if (problemEl) problemEl.innerHTML = `<p>${uc.deepDive?.problem || "Details coming soon..."}</p>`;

        const solutionEl = document.getElementById('dd-solution');
        if (solutionEl) solutionEl.innerHTML = `<p>${uc.deepDive?.solution || "Details coming soon..."}</p>`;

        const outcomeEl = document.getElementById('dd-outcome');
        if (outcomeEl) outcomeEl.innerHTML = `<p>${uc.deepDive?.outcome || "Details coming soon..."}</p>`;

        // KPIs
        const kpiContainer = document.getElementById('dd-kpi-container');
        if (kpiContainer) {
            kpiContainer.innerHTML = '';
            if (uc.deepDive?.kpis) {
                uc.deepDive.kpis.forEach(kpi => {
                    kpiContainer.innerHTML += `
                        <div class="metric-card" style="background: rgba(255,255,255,0.05); padding: 20px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1);">
                            <div class="mc-label" style="font-size: 0.9rem; color: #aaa; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 10px;">${kpi.label}</div>
                            <div class="mc-number" style="font-size: 1.2rem; margin-bottom: 15px; color: #e94c17; font-weight: bold;">${kpi.value}</div>
                            <p style="font-size: 0.95rem; line-height: 1.5; color: #eee;">${kpi.desc}</p>
                        </div>
                    `;
                });
            }
        }

        // Overview Gallery
        const galleryContainer = document.getElementById('dd-gallery');
        if (galleryContainer) {
            galleryContainer.innerHTML = '';
            if (uc.deepDive?.media && uc.deepDive.media.length > 0) {
                new LightboxGallery('dd-gallery', uc.deepDive.media);
            }
        }

        // Architecture
        const archTitle = document.getElementById('dd-arch-title');
        if (archTitle) archTitle.innerText = uc.deepDive?.architecture?.title || (uc.title + " — Architecture");
        const archDesc = document.getElementById('dd-arch-desc');
        if (archDesc) archDesc.innerText = uc.deepDive?.architecture?.desc || "Architecture details coming soon...";
        const archImg = document.getElementById('dd-arch-img');
        if (archImg) {
            archImg.src = uc.deepDive?.architecture?.img || "assets/Healthcare Services/tech_architecture.png";
        }

        // Engine Map
        const engineTitle = document.getElementById('dd-engine-title');
        if (engineTitle) engineTitle.innerText = uc.deepDive?.engineMap?.title || (uc.title + " — Engine Map / AI Flow");
        const engineDesc = document.getElementById('dd-engine-desc');
        if (engineDesc) engineDesc.innerText = uc.deepDive?.engineMap?.desc || "Engine map details coming soon...";
        const engineImg = document.getElementById('dd-engine-img');
        if (engineImg) {
            engineImg.src = uc.deepDive?.engineMap?.img || "assets/Healthcare Services/ai_engine_map.png";
        }
    }

    // Set tabs back to overview
    const tabs = document.querySelectorAll('.dd-tab');
    const panes = document.querySelectorAll('.tab-pane');
    tabs.forEach(t => t.classList.remove('active'));
    panes.forEach(p => p.classList.add('hidden'));

    if (tabs.length > 0) tabs[0].classList.add('active');
    const overview = document.getElementById('tab-overview');
    if (overview) overview.classList.remove('hidden');

    // Initialize image library carousel if not done
    initImageLibraryCarousel();
}

// Carousel logic for image library
let libraryIndex = 0;
function initImageLibraryCarousel() {
    // Basic implementation since it's a grid in the new HTML, but just in case we kept the carousel class
}

function openLightbox(src, type) {
    zoomLightbox(0);
    const modal = document.getElementById('lightbox-modal');
    const content = document.getElementById('lightbox-content');
    if (!modal || !content) return;

    content.innerHTML = '';
    if (type === 'video') {
        const video = document.createElement('video');
        video.src = src;
        video.controls = true;
        video.autoplay = true;
        content.appendChild(video);
    } else {
        const img = document.createElement('img');
        img.src = src;
        content.appendChild(img);
    }

    modal.classList.remove('hidden');
}

function closeLightbox() {
    const modal = document.getElementById('lightbox-modal');
    const content = document.getElementById('lightbox-content');
    if (modal) modal.classList.add('hidden');
    if (content) content.innerHTML = '';
}

function updateFeaturedImage(element, src, type) {
    // Update active state
    document.querySelectorAll('.library-thumbnail').forEach(t => t.classList.remove('active-thumb'));
    if (element) element.classList.add('active-thumb');

    // Update main image display
    const featuredContainer = document.getElementById('featured-image-container');
    if (!featuredContainer) return;

    // Apply fade out animation
    featuredContainer.classList.add('fade-anim');

    setTimeout(() => {
        if (type === 'video') {
            featuredContainer.innerHTML = `
                <video id="featured-image" src="${src}" autoplay muted loop style="width:100%; height:100%; object-fit:cover; border-radius:12px;"></video>
                <div class="hover-overlay"><svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg></div>
            `;
            featuredContainer.onclick = () => openLightbox(src, 'video');
        } else {
            featuredContainer.innerHTML = `
                <img id="featured-image" src="${src}" alt="Featured Image" style="width:100%; height:100%; object-fit:cover; border-radius:12px;">
                <div class="hover-overlay"><svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg></div>
            `;
            featuredContainer.onclick = () => openLightbox(src, 'image');
        }

        // Remove fade out to trigger fade in
        setTimeout(() => {
            featuredContainer.classList.remove('fade-anim');
        }, 50);
    }, 300); // 300ms matches a quick fade out duration
}

function scrollGallery(direction) {
    const track = document.getElementById('thumbnail-scroll-track');
    if (track) {
        // Scroll by 2 thumbnail widths approx (140px + gap) * 2 = 300px
        track.scrollBy({ left: direction * 300, behavior: 'smooth' });
    }
}

// Lightbox Escape Key Listener
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const modal = document.getElementById('lightbox-modal');
        if (modal && !modal.classList.contains('hidden')) {
            closeLightbox();
        }
    }
});

// Deep Dive Tabs Logic
document.querySelectorAll('.dd-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.dd-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        document.querySelectorAll('.tab-pane').forEach(p => p.classList.add('hidden'));
        const pane = document.getElementById(`tab-${tab.dataset.tab}`);
        if (pane) pane.classList.remove('hidden');
    });
});

// --- CMS Admin Logic --- //
const btnAdminToggle = document.getElementById('btn-admin-toggle');
if (btnAdminToggle) {
    btnAdminToggle.addEventListener('click', () => {
        isAdminMode = !isAdminMode;
        btnAdminToggle.innerText = isAdminMode ? 'Admin: ON' : 'Admin: OFF';
        btnAdminToggle.style.background = isAdminMode ? 'linear-gradient(135deg, #4ade80, #16a34a)' : '';
        if (screenLanding && !screenLanding.classList.contains('hidden')) {
            renderUseCases();
        }
    });
}

const cmsModal = document.getElementById('cms-modal');
const cmsForm = document.getElementById('cms-form');
const cmsUcFields = document.getElementById('cms-uc-fields');
const cmsCancel = document.getElementById('cms-cancel');

function openCMSModal(type, id) {
    document.getElementById('cms-type').value = type;
    document.getElementById('cms-id').value = id || '';

    const titleInput = document.getElementById('cms-title');
    const descInput = document.getElementById('cms-desc');

    if (type === 'cap') {
        if (cmsUcFields) cmsUcFields.classList.add('hidden');
        if (id) {
            const cap = healthcareData.find(c => c.id === id);
            document.getElementById('cms-modal-title').innerText = 'Edit Capability';
            titleInput.value = cap.title;
            descInput.value = cap.description;
        } else {
            document.getElementById('cms-modal-title').innerText = 'New Capability';
            titleInput.value = '';
            descInput.value = '';
        }
    } else {
        if (cmsUcFields) cmsUcFields.classList.remove('hidden');
        if (id) {
            const cap = healthcareData.find(c => c.id === currentCapabilityId);
            const uc = cap.useCases.find(u => u.title === id);
            document.getElementById('cms-modal-title').innerText = 'Edit Use Case';
            titleInput.value = uc.title;
            descInput.value = uc.desc;
            document.getElementById('cms-category').value = uc.category || 'operational';
            document.getElementById('cms-workflow').value = uc.workflow || 'all';
            document.getElementById('cms-section').value = uc.section || 'all';
        } else {
            document.getElementById('cms-modal-title').innerText = 'New Use Case';
            titleInput.value = '';
            descInput.value = '';
        }
    }
    if (cmsModal) cmsModal.classList.remove('hidden');
}

if (cmsCancel) {
    cmsCancel.addEventListener('click', () => {
        if (cmsModal) cmsModal.classList.add('hidden');
    });
}

if (cmsForm) {
    cmsForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const type = document.getElementById('cms-type').value;
        const id = document.getElementById('cms-id').value;
        const title = document.getElementById('cms-title').value;
        const desc = document.getElementById('cms-desc').value;

        if (type === 'cap') {
            if (id) {
                const cap = healthcareData.find(c => c.id === id);
                if (cap) {
                    cap.title = title;
                    cap.description = desc;
                }
            } else {
                const newCap = {
                    id: 'cap-' + Date.now(),
                    title: title,
                    description: desc,
                    useCases: []
                };
                healthcareData.push(newCap);
            }
            saveHealthcareData();
            renderCapabilities();
        } else if (type === 'uc') {
            const cap = healthcareData.find(c => c.id === currentCapabilityId);
            if (!cap) return;
            const cat = document.getElementById('cms-category').value;
            const work = document.getElementById('cms-workflow').value;
            const sec = document.getElementById('cms-section').value;

            if (id) {
                const uc = cap.useCases.find(u => u.title === id);
                if (uc) {
                    uc.title = title;
                    uc.desc = desc;
                    uc.category = cat;
                    uc.workflow = work;
                    uc.section = sec;
                }
            } else {
                cap.useCases.push({
                    title: title,
                    desc: desc,
                    category: cat,
                    workflow: work,
                    section: sec
                });
            }
            saveHealthcareData();
            renderUseCases();
        }

        if (cmsModal) cmsModal.classList.add('hidden');
    });
}

function deleteItem(type, id) {
    if (!confirm('Are you sure you want to delete this item?')) return;

    if (type === 'cap') {
        const idx = healthcareData.findIndex(c => c.id === id);
        if (idx > -1) healthcareData.splice(idx, 1);
        saveHealthcareData();
        renderCapabilities();
    } else if (type === 'uc') {
        const cap = healthcareData.find(c => c.id === currentCapabilityId);
        if (!cap) return;
        const idx = cap.useCases.findIndex(u => u.title === id);
        if (idx > -1) cap.useCases.splice(idx, 1);
        saveHealthcareData();
        renderUseCases();
    }
}

// Start loading process
preloadImages();

// --- KPI Animation Logic ---
function animateKPIs() {
    const kpis = document.querySelectorAll('.kpi-num');
    kpis.forEach(kpi => {
        const target = +kpi.getAttribute('data-val');
        const duration = 2000;
        const start = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);
            const easeProgress = progress * (2 - progress); // Ease out quad
            kpi.innerText = Math.floor(easeProgress * target);
            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                kpi.innerText = target;
            }
        }
        requestAnimationFrame(update);
    });
}

const kpiObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateKPIs();
            kpiObserver.disconnect();
        }
    });
});

setTimeout(() => {
    const kpiSection = document.querySelector('.sec-1-right');
    if (kpiSection) {
        kpiObserver.observe(kpiSection);
    }
}, 500);

// Also trigger if someone clicks the overview tab again (just in case)
document.querySelectorAll('.dd-tab[data-tab="overview"]').forEach(tab => {
    tab.addEventListener('click', () => {
        animateKPIs();
    });
});

// --- Carousel & Lightbox Logic ---
window.scrollCarousel = function (dir) {
    const carousel = document.getElementById('editorial-carousel');
    if (carousel) {
        const scrollAmount = 600 * dir;
        carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
};

window.openLightbox = function (slideEl) {
    const imgEl = slideEl.querySelector('img');
    const captionEl = slideEl.querySelector('.f-caption');

    const lightbox = document.getElementById('image-lightbox');
    const lbImg = document.getElementById('lightbox-img');
    const lbCaption = document.getElementById('lightbox-caption');

    if (lightbox && lbImg && imgEl) {
        lbImg.src = imgEl.src;
        if (captionEl && lbCaption) {
            lbCaption.innerHTML = captionEl.innerHTML;
        }
        lightbox.classList.remove('hidden');
    }
};

const lightbox = document.getElementById('image-lightbox');
const lbClose = document.getElementById('lightbox-close');

if (lbClose && lightbox) {
    lbClose.addEventListener('click', () => {
        lightbox.classList.add('hidden');
    });
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.add('hidden');
        }
    });
}

// Wire up new Custom Image Library Carousel
document.addEventListener("DOMContentLoaded", () => {
    const track = document.getElementById("library-track");
    const prevBtn = document.getElementById("library-prev");
    const nextBtn = document.getElementById("library-next");
    const items = document.querySelectorAll(".carousel-item");
    const lightbox = document.getElementById("image-lightbox");
    const lbImg = document.getElementById("lightbox-img");
    const lbCaption = document.getElementById("lightbox-caption");

    if (track && prevBtn && nextBtn) {
        prevBtn.addEventListener("click", () => {
            track.scrollBy({ left: -320, behavior: "smooth" });
        });
        nextBtn.addEventListener("click", () => {
            track.scrollBy({ left: 320, behavior: "smooth" });
        });
    }

    if (items.length > 0 && lightbox && lbImg) {
        items.forEach(item => {
            item.addEventListener("click", () => {
                lbImg.src = item.src;
                if (lbCaption) lbCaption.innerText = item.alt;
                lightbox.classList.remove("hidden");
            });
        });
    }
});


// --- Futuristic Waving Lines System ---
document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("particle-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let width, height;
    let time = 0;

    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    }

    function drawWave(yOffset, color, speed, amplitude, frequency) {
        ctx.beginPath();
        ctx.moveTo(0, height / 2 + yOffset);
        for (let i = 0; i < width; i++) {
            let y = height / 2 + yOffset + Math.sin(i * frequency + time * speed) * amplitude;
            ctx.lineTo(i, y);
        }
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.stroke();
    }

    function animateWaves() {
        ctx.clearRect(0, 0, width, height);
        time += 0.02;

        // Draw multiple glowing orange strands
        drawWave(-50, 'rgba(233, 76, 23, 0.1)', 0.5, 100, 0.003);
        drawWave(0, 'rgba(233, 76, 23, 0.2)', 0.7, 150, 0.002);
        drawWave(50, 'rgba(233, 76, 23, 0.3)', 0.9, 80, 0.004);
        drawWave(100, 'rgba(255, 255, 255, 0.05)', 0.4, 200, 0.001); // subtle white accent

        requestAnimationFrame(animateWaves);
    }

    window.addEventListener("resize", resize);
    resize();
    animateWaves();
});




// Practice Tabs Logic
document.querySelectorAll('.practice-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove active from all practice tabs
        document.querySelectorAll('.practice-tab').forEach(t => t.classList.remove('active'));
        // Hide all practice panes
        document.querySelectorAll('.practice-pane').forEach(p => p.classList.add('hidden'));

        // Add active to clicked tab
        tab.classList.add('active');
        // Show target pane
        const target = document.getElementById(tab.dataset.target);
        if (target) target.classList.remove('hidden');
    });
});

// AI Practice Gallery Logic
function updateAiFeaturedImage(element, src, type) {
    const track = document.getElementById('ai-thumbnail-scroll-track');
    if (!track) return;

    // Update active state
    track.querySelectorAll('.library-thumbnail').forEach(t => t.classList.remove('active-thumb'));
    if (element) element.classList.add('active-thumb');

    // Update main image display
    const featuredContainer = document.getElementById('ai-featured-image-container');
    if (!featuredContainer) return;

    // Apply fade out animation
    featuredContainer.classList.add('fade-anim');

    // Hide overlay text if clicking anything other than the first process slide
    const overlay = document.getElementById('ai-slide-overlay');
    if (overlay) {
        // A simple check: if it's the first thumbnail, show overlay, else hide
        const isFirst = element.querySelector('.thumb-label') && element.querySelector('.thumb-label').innerText.includes('01');
        overlay.style.display = isFirst ? 'flex' : 'none';
    }

    setTimeout(() => {
        if (type === 'video') {
            featuredContainer.innerHTML = `
                <video id="ai-featured-image" src="${src}" autoplay muted loop style="width:100%; height:100%; object-fit:cover; border-radius:12px;"></video>
                <div class="hover-overlay"><svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg></div>
            `;
            if (overlay) featuredContainer.appendChild(overlay);
            featuredContainer.onclick = () => openLightbox(src, 'video');
        } else {
            featuredContainer.innerHTML = `
                <img id="ai-featured-image" src="${src}" alt="Featured Image" style="width:100%; height:100%; object-fit:cover; border-radius:12px;">
                <div class="hover-overlay"><svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg></div>
            `;
            if (overlay) featuredContainer.appendChild(overlay);
            featuredContainer.onclick = () => openLightbox(src, 'image');
        }

        setTimeout(() => {
            featuredContainer.classList.remove('fade-anim');
        }, 50);
    }, 300);
}

function scrollAiGallery(direction) {
    const track = document.getElementById('ai-thumbnail-scroll-track');
    if (track) {
        track.scrollBy({ left: direction * 300, behavior: 'smooth' });
    }
}

function openPracticesTab(tabId) {
    openScreen('screen-frameworks');
    const tabBtn = document.querySelector('.practice-tab[data-target="' + tabId + '"]');
    if (tabBtn) tabBtn.click();
}

// Global Event Listeners
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const modal = document.getElementById('lightbox-modal');
        if (modal && !modal.classList.contains('hidden')) {
            closeLightbox();
        }
    }
});

// --- Practices Screen Interactions --- //
function filterPractices() {
    const input = document.getElementById("practices-search");
    if (!input) return;
    const filter = input.value.toUpperCase();
    const ul = document.getElementById("practices-list");
    if (!ul) return;
    const li = ul.getElementsByTagName("li");

    for (let i = 0; i < li.length; i++) {
        const txtValue = li[i].textContent || li[i].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}

const practiceData = {
    "Experience Design": {
        desc: "We design enterprise-grade product experiences that translate complex domain workflows into intuitive interfaces â€” combining research, systems thinking, and AI-native interaction patterns to accelerate adoption across our clients' organizations.",
        members: "12 Members"
    },
    "Product Owner & Business Analysis": {
        desc: "Bridging the gap between business objectives and technical execution. Our experts map complex requirements, define product strategies, and ensure seamless delivery of AI and data solutions that drive real value.",
        members: "8 Members"
    },
    "Data Functional": {
        desc: "Domain experts who understand the nuances of healthcare, finance, and enterprise data. We ensure data strategies align perfectly with operational realities, regulatory compliance, and business goals.",
        members: "5 Members"
    },
    "Data Engineering": {
        desc: "Building robust, scalable data pipelines and architectures. We transform fragmented data silos into unified, high-performance data lakes and warehouses ready for advanced analytics and AI modeling.",
        members: "24 Members"
    },
    "AI / ML Engineering": {
        desc: "Designing and deploying state-of-the-art machine learning models. From predictive analytics to Generative AI and LLM integrations, we build intelligent engines that power next-generation applications.",
        members: "18 Members"
    },
    "Solution Architecture": {
        desc: "Crafting scalable, secure, and future-proof enterprise architectures. We design full-stack ecosystems that seamlessly integrate modern AI capabilities with legacy healthcare and enterprise systems.",
        members: "9 Members"
    },
    "Quality Engineering": {
        desc: "Ensuring flawless execution through rigorous automated testing, performance tuning, and security validations. We guarantee enterprise reliability and compliance for all mission-critical AI applications.",
        members: "15 Members"
    },
    "Project Management": {
        desc: "Orchestrating complex technology deliveries with precision. Using agile methodologies, we manage timelines, resources, and risks to ensure on-time, high-quality deployments of transformational solutions.",
        members: "7 Members"
    }
};

function selectPractice(element) {
    const ul = document.getElementById("practices-list");
    if (ul) {
        const lis = ul.getElementsByTagName("li");
        for (let i = 0; i < lis.length; i++) {
            lis[i].classList.remove('active');
        }
    }
    element.classList.add('active');

    const practiceName = element.textContent.trim();

    const titleEl = document.getElementById("practice-main-title");
    const descEl = document.getElementById("practice-main-desc");
    const badgeEl = document.getElementById("practice-member-badge");

    if (titleEl) titleEl.innerText = practiceName;

    if (practiceData[practiceName]) {
        if (descEl) descEl.innerText = practiceData[practiceName].desc;
        if (badgeEl) badgeEl.innerText = practiceData[practiceName].members;
    }
}

// --- Navigation Fixes --- //
function goToHome(skipHashUpdate = false) {
    hideAllScreens();
    const healthcareUiContainer = document.getElementById('healthcare-ui-container');
    if (healthcareUiContainer) healthcareUiContainer.classList.add('hidden');

    const mainContainer = document.getElementById('main-container');
    if (mainContainer) mainContainer.classList.remove('hidden');

    // Enable Lenis scrolling
    if (typeof lenis !== 'undefined') lenis.start();

    // Reset to start of page
    window.scrollTo(0, 0);

    updateUrlHash({ screen: null, tab: null, model: null, deepdive: null, practice: null }, skipHashUpdate);
}

function showBestPracticesDetails() {
    const healthcareUiContainer = document.getElementById('healthcare-ui-container');
    if (healthcareUiContainer) healthcareUiContainer.classList.remove('hidden');
    const mainContainer = document.getElementById('main-container');
    if (mainContainer) mainContainer.classList.add('hidden');
    document.body.style.overflowY = 'hidden';

    openPracticesTab('practice-tab-best-practices');
}

// --- Healthcare Master Tabs --- //
function switchHcMainTab(tabId, btnElement, skipHashUpdate = false) {
    const allTabs = document.querySelectorAll('.hc-master-tab');
    allTabs.forEach(t => t.classList.remove('active'));
    if (btnElement) btnElement.classList.add('active');

    const allPanes = document.querySelectorAll('.hc-main-pane');
    allPanes.forEach(p => p.classList.add('hidden'));

    const targetPane = document.getElementById('hc-main-tab-' + tabId);
    if (targetPane) {
        targetPane.classList.remove('hidden');
        targetPane.classList.add('active');
        targetPane.style.opacity = '0';
        setTimeout(() => {
            targetPane.style.opacity = '1';
            targetPane.style.transition = 'opacity 0.3s ease';
        }, 50);
    }

    updateUrlHash({ tab: tabId, deepdive: null, model: null }, skipHashUpdate);
}

// --- Lightbox Zoom & Pan Logic --- //
let currentZoom = 1;
let isPanning = false;
let startX = 0, startY = 0;
let translateX = 0, translateY = 0;

function zoomLightbox(direction) {
    const content = document.getElementById('lightbox-content');
    if (!content) return;

    if (direction === 0) {
        currentZoom = 1;
        translateX = 0;
        translateY = 0;
    } else if (direction > 0) {
        currentZoom = Math.min(currentZoom + 0.5, 4); // Max zoom 4x
    } else {
        currentZoom = Math.max(currentZoom - 0.5, 0.5); // Min zoom 0.5x
    }

    updateLightboxTransform();
}

function updateLightboxTransform() {
    const content = document.getElementById('lightbox-content');
    if (content) {
        content.style.transform = `translate(${translateX}px, ${translateY}px) scale(${currentZoom})`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const content = document.getElementById('lightbox-content');
    if (content) {
        content.addEventListener('mousedown', (e) => {
            if (currentZoom > 1) {
                isPanning = true;
                startX = e.clientX - translateX;
                startY = e.clientY - translateY;
            }
        });

        window.addEventListener('mousemove', (e) => {
            if (!isPanning) return;
            translateX = e.clientX - startX;
            translateY = e.clientY - startY;
            updateLightboxTransform();
        });

        window.addEventListener('mouseup', () => {
            isPanning = false;
        });
    }
});

// --- Premium Lightbox Gallery Carousel --- //
let globalGalleryItems = [];
let currentLightboxIndex = -1;

class LightboxGallery {
    constructor(containerId, mediaItems) {
        this.container = document.getElementById(containerId);
        if (!this.container) return;
        this.mediaItems = mediaItems;
        this.currentIndex = 0;
        this.render();
    }

    render() {
        this.container.innerHTML = '';
        this.container.className = 'lightbox-gallery-container';

        // 1. Carousel View
        const carouselView = document.createElement('div');
        carouselView.className = 'gallery-carousel-view';

        // Prev Arrow
        const btnLeft = document.createElement('button');
        btnLeft.className = 'gallery-arrow gallery-arrow-left';
        btnLeft.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m15 18-6-6 6-6"/></svg>';
        btnLeft.onclick = (e) => { e.stopPropagation(); this.navigate(-1); };

        // Track
        this.track = document.createElement('div');
        this.track.className = 'gallery-track';

        // Next Arrow
        const btnRight = document.createElement('button');
        btnRight.className = 'gallery-arrow gallery-arrow-right';
        btnRight.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg>';
        btnRight.onclick = (e) => { e.stopPropagation(); this.navigate(1); };

        carouselView.appendChild(btnLeft);
        carouselView.appendChild(this.track);
        carouselView.appendChild(btnRight);
        this.container.appendChild(carouselView);

        // 2. Thumbnail Strip
        this.thumbStrip = document.createElement('div');
        this.thumbStrip.className = 'gallery-thumbnail-strip';
        this.container.appendChild(this.thumbStrip);

        this.updateDOM();
    }

    navigate(dir) {
        this.currentIndex += dir;
        if (this.currentIndex < 0) this.currentIndex = this.mediaItems.length - 1;
        if (this.currentIndex >= this.mediaItems.length) this.currentIndex = 0;
        this.updateDOM();
    }

    goToIndex(idx) {
        this.currentIndex = idx;
        this.updateDOM();
    }

    updateDOM() {
        // Render Track
        this.track.innerHTML = '';
        const total = this.mediaItems.length;

        // Determine prev and next indices (looping)
        const prevIndex = (this.currentIndex - 1 + total) % total;
        const nextIndex = (this.currentIndex + 1) % total;

        const renderSlide = (idx, posClass) => {
            const item = this.mediaItems[idx];
            const slide = document.createElement('div');
            slide.className = 'gallery-slide ' + posClass;

            if (item.type === 'video') {
                const video = document.createElement('video');
                video.src = item.src;
                video.muted = true;
                video.loop = true;
                if (posClass === 'active') video.play();
                slide.appendChild(video);
            } else {
                const img = document.createElement('img');
                img.src = item.src;
                slide.appendChild(img);
            }

            if (posClass === 'active') {
                const expand = document.createElement('div');
                expand.className = 'slide-expand-overlay';
                expand.innerHTML = '<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>';
                slide.appendChild(expand);

                // Open global lightbox with ALL items from this gallery
                slide.onclick = () => {
                    globalGalleryItems = this.mediaItems;
                    currentLightboxIndex = this.currentIndex;
                    openLightbox(item.src, item.type, true);
                };
            } else {
                slide.onclick = () => this.goToIndex(idx);
            }

            this.track.appendChild(slide);
        };

        if (total > 1) renderSlide(prevIndex, 'prev');
        renderSlide(this.currentIndex, 'active');
        if (total > 2) renderSlide(nextIndex, 'next');
        else if (total === 2 && prevIndex !== nextIndex) renderSlide(nextIndex, 'next'); // Edge case 2 items

        // Render Thumbnails
        this.thumbStrip.innerHTML = '';
        this.mediaItems.forEach((item, idx) => {
            const thumb = document.createElement('div');
            thumb.className = 'gallery-thumb' + (idx === this.currentIndex ? ' active' : '');

            if (item.type === 'video') {
                // For video thumb, we can use a poster image if provided, else just load the video element
                const video = document.createElement('video');
                video.src = item.src;
                video.muted = true;
                thumb.appendChild(video);

                const icon = document.createElement('div');
                icon.className = 'thumb-video-indicator';
                icon.innerHTML = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg>';
                thumb.appendChild(icon);
            } else {
                const img = document.createElement('img');
                img.src = item.src;
                thumb.appendChild(img);
            }

            thumb.onclick = () => this.goToIndex(idx);
            this.thumbStrip.appendChild(thumb);
        });
    }
}

// --- Enhanced Global Lightbox Navigation --- //
function navigateLightbox(dir) {
    if (globalGalleryItems.length === 0) return;

    currentLightboxIndex += dir;
    if (currentLightboxIndex < 0) currentLightboxIndex = globalGalleryItems.length - 1;
    if (currentLightboxIndex >= globalGalleryItems.length) currentLightboxIndex = 0;

    const item = globalGalleryItems[currentLightboxIndex];
    openLightbox(item.src, item.type, false);
}

// Override openLightbox
function openLightbox(src, type, isFromGallery = false) {
    const modal = document.getElementById('lightbox-modal');
    const content = document.getElementById('lightbox-content');
    if (!modal || !content) return;

    if (!isFromGallery) {
        globalGalleryItems = [];
        currentLightboxIndex = -1;
    }

    // Toggle navigation arrows visibility
    const leftArrow = document.getElementById('lightbox-nav-left');
    const rightArrow = document.getElementById('lightbox-nav-right');
    const counter = document.getElementById('lightbox-counter');

    if (globalGalleryItems.length > 1) {
        if (leftArrow) leftArrow.classList.remove('hidden');
        if (rightArrow) rightArrow.classList.remove('hidden');
        if (counter) {
            counter.classList.remove('hidden');
            counter.innerText = (currentLightboxIndex + 1) + " / " + globalGalleryItems.length;
        }
    } else {
        if (leftArrow) leftArrow.classList.add('hidden');
        if (rightArrow) rightArrow.classList.add('hidden');
        if (counter) counter.classList.add('hidden');
    }

    content.innerHTML = '';
    if (type === 'video') {
        const video = document.createElement('video');
        video.src = src;
        video.controls = true;
        video.autoplay = true;
        video.style.maxWidth = '90vw';
        video.style.maxHeight = '90vh';
        content.appendChild(video);
    } else {
        const img = document.createElement('img');
        img.src = src;
        content.appendChild(img);
    }

    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    zoomLightbox(0);
}

// --- Initialize Galleries --- //
document.addEventListener('DOMContentLoaded', () => {
    const aiPracticeMedia = [
        { type: 'image', src: 'assets/Card Images/Card Image 1.jpg' },
        { type: 'image', src: 'assets/Card Images/Card Image 2.jpg' },
        { type: 'image', src: 'assets/Card Images/Card Image 3.jpg' },
        { type: 'video', src: 'https://www.w3schools.com/html/mov_bbb.mp4' }
    ];

    if (document.getElementById('ai-practice-gallery')) {
        new LightboxGallery('ai-practice-gallery', aiPracticeMedia);
    }

    if (document.getElementById('hc-ai-practice-gallery')) {
        new LightboxGallery('hc-ai-practice-gallery', aiPracticeMedia);
    }
});



// Data Models Logic
const dataModels = {
    'model-1': {
        title: 'Patient Journey Analytics',
        desc: 'Comprehensive data architecture mapping the end-to-end patient lifecycle, integrating clinical, financial, and operational touchpoints for holistic predictive modeling.',
        img: 'assets/Healthcare Services/tech_architecture.png'
    },
    'model-2': {
        title: 'Clinical Risk Stratification',
        desc: 'Advanced statistical and machine learning models designed to identify at-risk patient populations early, enabling proactive care interventions and resource allocation.',
        img: 'assets/Healthcare Services/ai_engine_map.png'
    },
    'model-3': {
        title: 'Revenue Cycle Optimization',
        desc: 'Data model predicting claim denials and identifying revenue leakage points by analyzing historical billing patterns, payer rules, and clinical documentation.',
        img: 'assets/Healthcare Services/tech_architecture.png'
    },
    'model-4': {
        title: 'Supply Chain Demand Forecasting',
        desc: 'Predictive models for optimizing inventory levels of critical medical supplies, minimizing stockouts, and reducing holding costs through automated procurement triggers.',
        img: 'assets/Healthcare Services/ai_engine_map.png'
    }
};

function filterDataModels() {
    const input = document.getElementById('data-model-search');
    if (!input) return;
    const filter = input.value.toLowerCase();
    const ul = document.getElementById('data-models-nav');
    if (!ul) return;
    const li = ul.getElementsByTagName('li');
    for (let i = 0; i < li.length; i++) {
        const text = li[i].textContent || li[i].innerText;
        if (text.toLowerCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}

function showDataModel(modelId, element, skipHashUpdate = false) {
    // 1) Remove active class from all nav items
    const navItems = document.querySelectorAll('#data-models-nav li');
    navItems.forEach(item => item.classList.remove('active'));

    // 2) Add active class to clicked item
    if (element) {
        element.classList.add('active');
    }

    // 3) Hide all model contents
    const models = document.querySelectorAll('.model-content');
    models.forEach(model => model.classList.remove('active'));

    // 4) Show the selected model content
    const selectedModel = document.getElementById(modelId);
    if (selectedModel) {
        selectedModel.classList.add('active');
    }

    updateUrlHash({ tab: 'data', model: modelId }, skipHashUpdate);

    const model = dataModels[modelId];
    if (model) {
        document.getElementById('data-model-title').innerText = model.title;
        document.getElementById('data-model-desc').innerText = model.desc;
        document.getElementById('data-model-img').src = model.img;

        // Add a small fade animation
        const contentArea = document.querySelector('#hc-main-tab-data .practices-main-content');
        if (contentArea) {
            contentArea.style.opacity = '0.5';
            setTimeout(() => {
                contentArea.style.opacity = '1';
                contentArea.style.transition = 'opacity 0.3s ease';
            }, 50);
        }
    }
}
// --- Engines UI Logic --- //
const enginesUiContainer = document.getElementById('engines-ui-container');
const screenEngineDetail = document.getElementById('screen-engine-detail');
const screenOtherEngines = document.getElementById('screen-other-engines');

const engineData = [
    {
        id: 'engine-1', title: 'OCR Engine', desc: 'Advanced optical character recognition for extracting text and structured data from complex documents.',
        flow: ['Input Document', 'Pre-process', 'Extract Text', 'Classify Fields', 'Validate Data', 'Output JSON'],
        capabilities: [
            { label: 'Multilingual', desc: 'Supports extraction in over 50 languages.' },
            { label: 'Handwriting', desc: 'Accurately digitizes handwritten notes and forms.' },
            { label: 'Layout Analysis', desc: 'Preserves tables, columns, and document structure.' },
            { label: 'High Accuracy', desc: 'Achieves 99%+ accuracy on standard forms.' }
        ],
        useCases: 'Invoice processing, receipt scanning, patient intake forms, identity verification, contract analysis.',
        outcome: 'Eliminates manual data entry, speeds up processing times by 80%, and reduces human error in data digitization.'
    },
    {
        id: 'engine-2', title: 'Agentic RAG Engine', desc: 'Retrieval-Augmented Generation powered by autonomous agents that verify, cite, and synthesize information.',
        flow: ['User Query', 'Deconstruct', 'Multi-source Retrieval', 'Fact-Check', 'Synthesize', 'Deliver Answer'],
        capabilities: [
            { label: 'Multi-hop Reasoning', desc: 'Connects information across different documents.' },
            { label: 'Self-Correction', desc: 'Agents verify outputs against source material.' },
            { label: 'Access Control', desc: 'Respects user permissions during retrieval.' },
            { label: 'Citation', desc: 'Provides exact references for all claims.' }
        ],
        useCases: 'Enterprise search, customer support automation, legal research, financial analysis, technical documentation.',
        outcome: 'Ensures hallucination-free generative AI outputs, increasing trust and accelerating complex knowledge discovery.'
    },
    {
        id: 'engine-3', title: 'AGUI Engine', desc: 'Agentic Graphical User Interface that dynamically generates UI components based on user intent.',
        flow: ['User Intent', 'Understand Context', 'Select Components', 'Generate Layout', 'Render UI', 'Handle Actions'],
        capabilities: [
            { label: 'Dynamic Forms', desc: 'Generates input forms on the fly based on required data.' },
            { label: 'Data Visualization', desc: 'Creates charts and graphs tailored to the query.' },
            { label: 'Context Aware', desc: 'Adapts UI to the current workflow stage.' },
            { label: 'Accessibility', desc: 'Ensures all generated components meet WCAG standards.' }
        ],
        useCases: 'Conversational applications, adaptive dashboards, personalized user portals, complex data entry workflows.',
        outcome: 'Provides a highly intuitive, conversational user experience that reduces interface friction and improves task completion rates.'
    },
    {
        id: 'engine-4', title: 'Multi-Agent Orchestration Framework', desc: 'Coordinates complex workflows across multiple specialized AI agents to solve multi-step problems.',
        flow: ['Complex Task', 'Task Decomposition', 'Assign Agents', 'Agent Collaboration', 'Consolidate', 'Final Output'],
        capabilities: [
            { label: 'Task Routing', desc: 'Routes sub-tasks to the most capable specialized agent.' },
            { label: 'State Management', desc: 'Maintains context across long-running workflows.' },
            { label: 'Conflict Resolution', desc: 'Mediates disagreeing agent outputs.' },
            { label: 'Scalability', desc: 'Handles thousands of concurrent agent workflows.' }
        ],
        useCases: 'Supply chain optimization, software development lifecycle, complex financial auditing, strategic planning.',
        outcome: 'Enables automation of complex, cognitive tasks previously requiring entire teams of human experts.'
    },
    {
        id: 'engine-5', title: 'MCP Authentication / Authorization', desc: 'Model Context Protocol layer ensuring secure, governed, and authorized access to enterprise data.',
        flow: ['Data Request', 'Identify User', 'Check Roles', 'Filter Context', 'Pass to Model', 'Audit Log'],
        capabilities: [
            { label: 'RBAC Integration', desc: 'Connects with Active Directory and Okta.' },
            { label: 'Row-level Security', desc: 'Filters data access down to individual records.' },
            { label: 'Token Redaction', desc: 'Removes PII before sending to LLMs.' },
            { label: 'Full Auditability', desc: 'Logs every prompt and data access request.' }
        ],
        useCases: 'Healthcare chatbots, financial advisors, HR portals, any AI system accessing sensitive enterprise data.',
        outcome: 'Unblocks enterprise AI adoption by guaranteeing data security, compliance, and strict access governance.'
    },
    {
        id: 'engine-6', title: 'Agent Ops Engine', desc: 'Comprehensive monitoring, logging, and evaluation suite for AI agents in production environments.',
        flow: ['Agent Execution', 'Capture Telemetry', 'Analyze Metrics', 'Detect Anomalies', 'Alert', 'Optimize'],
        capabilities: [
            { label: 'Cost Tracking', desc: 'Monitors token usage and API costs in real-time.' },
            { label: 'Latency Metrics', desc: 'Tracks response times across the agent lifecycle.' },
            { label: 'Quality Eval', desc: 'Automated evaluation of agent responses.' },
            { label: 'A/B Testing', desc: 'Compare different prompts and models safely.' }
        ],
        useCases: 'Production AI monitoring, compliance reporting, continuous improvement, cost optimization.',
        outcome: 'Provides the operational visibility needed to scale AI confidently while controlling costs and maintaining quality.'
    },
    // Other Engines (Grid)
    { id: 'engine-8', title: 'NLP Engine', desc: 'Natural Language Processing for sentiment analysis, entity extraction, and text classification.', capabilities: [{label:'Sentiment Analysis', desc:''}, {label:'Entity Extraction', desc:''}, {label:'Classification', desc:''}, {label:'Summarization', desc:''}], useCases: 'Social listening, ticket routing.', outcome: 'Automates text understanding.', flow: ['Text', 'Tokenize', 'Extract', 'Classify', 'Synthesize', 'Output'] },
    { id: 'engine-9', title: 'Search Engine', desc: 'Enterprise semantic search across structured and unstructured data silos.', capabilities: [{label:'Semantic Search', desc:''}, {label:'Hybrid Search', desc:''}, {label:'Faceted Search', desc:''}, {label:'Ranking', desc:''}], useCases: 'Intranet search, e-commerce.', outcome: 'Finds relevant info instantly.', flow: ['Query', 'Embed', 'Retrieve', 'Rank', 'Filter', 'Results'] },
    { id: 'engine-10', title: 'Rules Engine', desc: 'Deterministic business logic execution for compliance and decision automation.', capabilities: [{label:'Decision Trees', desc:''}, {label:'Compliance Checks', desc:''}, {label:'Policy Routing', desc:''}, {label:'Version Control', desc:''}], useCases: 'Loan approval, claims scrubbing.', outcome: 'Guarantees compliance.', flow: ['Input Data', 'Evaluate Rules', 'Check Policy', 'Flag Exceptions', 'Approve/Deny', 'Log'] },
    { id: 'engine-11', title: 'Vision Engine', desc: 'Computer vision for image classification, object detection, and anomaly spotting.', capabilities: [{label:'Object Detection', desc:''}, {label:'Facial Recognition', desc:''}, {label:'Quality Control', desc:''}, {label:'Image Segmentation', desc:''}], useCases: 'Manufacturing QA, security.', outcome: 'Automates visual inspections.', flow: ['Image', 'Pre-process', 'Feature Extract', 'Detect', 'Classify', 'Alert'] },
    { id: 'engine-12', title: 'Speech Engine', desc: 'Speech-to-text and text-to-speech with emotion detection and speaker diarization.', capabilities: [{label:'Transcription', desc:''}, {label:'Translation', desc:''}, {label:'Voice Cloning', desc:''}, {label:'Emotion Detection', desc:''}], useCases: 'Call center analytics, accessibility.', outcome: 'Unlocks voice data insights.', flow: ['Audio', 'Denoise', 'Diarize', 'Transcribe', 'Analyze', 'Text'] },
    { id: 'engine-13', title: 'Document Intelligence Engine', desc: 'Advanced AI to understand complex document layouts, signatures, and stamps.', capabilities: [{label:'Signature Detection', desc:''}, {label:'Stamp Recognition', desc:''}, {label:'Form Extraction', desc:''}, {label:'Table Parsing', desc:''}], useCases: 'Mortgage processing, legal discovery.', outcome: 'Digitizes complex paper trails.', flow: ['Document', 'Layout Analyze', 'Extract Fields', 'Verify Sigs', 'Structure', 'JSON'] },
    { id: 'engine-14', title: 'Knowledge Graph Engine', desc: 'Constructs and queries relationships between entities across enterprise data.', capabilities: [{label:'Entity Linking', desc:''}, {label:'Graph DB', desc:''}, {label:'Relationship Mapping', desc:''}, {label:'Ontology Creation', desc:''}], useCases: 'Fraud detection, 360 customer view.', outcome: 'Uncovers hidden data connections.', flow: ['Data Sources', 'Extract Entities', 'Link Nodes', 'Build Graph', 'Query', 'Insights'] },
    { id: 'engine-15', title: 'Recommendation Engine', desc: 'Personalized content and product recommendations based on user behavior.', capabilities: [{label:'Collaborative Filtering', desc:''}, {label:'Content-based', desc:''}, {label:'Real-time', desc:''}, {label:'A/B Testing', desc:''}], useCases: 'Retail, media streaming.', outcome: 'Increases conversion and engagement.', flow: ['User Data', 'Analyze History', 'Match Profiles', 'Generate Recs', 'Rank', 'Serve'] },
    { id: 'engine-16', title: 'Monitoring & Evaluation Engine', desc: 'Continuous oversight of AI model drift, bias, and performance degradation.', capabilities: [{label:'Drift Detection', desc:''}, {label:'Bias Auditing', desc:''}, {label:'Performance Alerts', desc:''}, {label:'Auto-retraining', desc:''}], useCases: 'MLOps, model governance.', outcome: 'Maintains AI reliability over time.', flow: ['Model Output', 'Collect Stats', 'Compare Baseline', 'Detect Drift', 'Alert', 'Retrain'] },
    { id: 'engine-17', title: 'Workflow Automation Engine', desc: 'Orchestrates APIs, scripts, and robotic process automation (RPA).', capabilities: [{label:'API Integration', desc:''}, {label:'RPA', desc:''}, {label:'Schedule Jobs', desc:''}, {label:'Error Handling', desc:''}], useCases: 'Data syncing, legacy system bridging.', outcome: 'Removes manual repetitive tasks.', flow: ['Trigger', 'Fetch Data', 'Transform', 'API Call', 'Update System', 'Complete'] }
];

let previousEngineScreen = null;

function hideAllScreensEngines() {
    hideAllScreens(); // From main.js
    if (enginesUiContainer) enginesUiContainer.classList.add('hidden');
    if (screenEngineDetail) screenEngineDetail.classList.add('hidden');
    if (screenOtherEngines) screenOtherEngines.classList.add('hidden');
}

function openEngineDetail(engineId, fromOther = false) {
    hideAllScreensEngines();
    
    // Hide main container
    const mainContainer = document.getElementById('main-container');
    if (mainContainer) mainContainer.classList.add('hidden');
    document.body.style.overflowY = 'hidden';
    
    if (enginesUiContainer) enginesUiContainer.classList.remove('hidden');
    if (screenEngineDetail) screenEngineDetail.classList.remove('hidden');
    window.scrollTo(0, 0);

    previousEngineScreen = fromOther ? 'other' : 'showroom';
    document.getElementById('engine-back-text').innerText = fromOther ? 'Back to Engines' : 'Back to Showroom';

    populateEngineDetail(engineId);
}

function populateEngineDetail(engineId) {
    const engine = engineData.find(e => e.id === engineId);
    if (!engine) return;

    document.getElementById('engine-bc-name').innerText = engine.title;
    document.getElementById('engine-title').innerText = engine.title;
    document.getElementById('engine-desc').innerText = engine.desc;

    // Process Flow
    const flowContainer = document.getElementById('engine-flow-container');
    if (flowContainer) {
        flowContainer.innerHTML = '';
        engine.flow.forEach((step, index) => {
            const stepDiv = document.createElement('div');
            stepDiv.className = 'flow-step';
            stepDiv.innerText = step;
            flowContainer.appendChild(stepDiv);
            
            if (index < engine.flow.length - 1) {
                const arrowDiv = document.createElement('div');
                arrowDiv.className = 'flow-arrow';
                arrowDiv.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>';
                flowContainer.appendChild(arrowDiv);
            }
        });
    }

    // Capabilities
    const capGrid = document.getElementById('engine-capabilities-grid');
    if (capGrid) {
        capGrid.innerHTML = '';
        engine.capabilities.forEach(cap => {
            capGrid.innerHTML += `
                <div class="metric-card" style="padding: 20px; text-align: left;">
                    <h4 style="color: #fff; font-size: 1.05rem; margin-bottom: 8px;">${cap.label}</h4>
                    <p style="color: var(--text-secondary); font-size: 0.9rem; line-height: 1.5;">${cap.desc}</p>
                </div>
            `;
        });
    }

    document.getElementById('engine-use-cases').innerText = engine.useCases;
    document.getElementById('engine-business-outcome').innerText = engine.outcome;
}

function openOtherEngines() {
    hideAllScreensEngines();
    
    // Hide main container
    const mainContainer = document.getElementById('main-container');
    if (mainContainer) mainContainer.classList.add('hidden');
    document.body.style.overflowY = 'hidden';

    if (enginesUiContainer) enginesUiContainer.classList.remove('hidden');
    if (screenOtherEngines) screenOtherEngines.classList.remove('hidden');
    window.scrollTo(0, 0);

    renderOtherEngines();
}

function renderOtherEngines() {
    const grid = document.getElementById('other-engines-grid');
    if (!grid) return;
    grid.innerHTML = '';

    const otherEngines = engineData.filter(e => parseInt(e.id.split('-')[1]) >= 8);

    otherEngines.forEach(eng => {
        const card = document.createElement('div');
        card.className = 'use-case-card highlight-card';
        card.style.height = '240px'; // Shorter card for engines grid
        
        card.innerHTML = `
            <div class="card-content" style="padding: 24px;">
                <h3 style="margin-bottom: 12px;">${eng.title}</h3>
                <p style="margin-bottom: 20px;">${eng.desc}</p>
                <button class="action-btn" style="padding: 8px 16px; font-size: 0.85rem;" onclick="event.stopPropagation(); openEngineDetail('${eng.id}', true)">View Details</button>
            </div>
        `;

        card.addEventListener('click', () => openEngineDetail(eng.id, true));
        grid.appendChild(card);
    });
}

function goBackFromEngineDetail() {
    if (previousEngineScreen === 'other') {
        openOtherEngines();
    } else {
        // Go back to showroom
        hideAllScreensEngines();
        const mainContainer = document.getElementById('main-container');
        if (mainContainer) mainContainer.classList.remove('hidden');
        document.body.style.overflowY = 'auto';
    }
}
