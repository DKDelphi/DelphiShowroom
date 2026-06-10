# DelphiAI Showroom — UI Style Guide

## 1. Product Direction

DelphiAI Showroom is a premium enterprise AI experience platform.  
The UI should feel modern, clean, high-end, spacious, and consistent across all Industries, Use Cases, Engines, Case Studies, Architecture, and Demo screens.

The product should feel suitable for:
- CEO-level presentations
- Client workshops
- Business analyst walkthroughs
- Enterprise AI solution demos

The UI should avoid looking like disconnected screens. Every page must feel like it belongs to one unified product.

---

## 2. Brand Colors

Use this color system everywhere.

### Primary Colors
- Delphi Orange: `#E94C17`
- White: `#FFFFFF`
- Dark Gray: `#232323`

### Color Usage
- White should dominate the interface.
- Orange should be used for primary actions, active states, selected tabs, highlights, badges, and important accents.
- Dark Gray should be used for headings, main text, and strong labels.

### Supporting Colors
- Background Soft: `#F7F7F8`
- Border Light: `rgba(35, 35, 35, 0.10)`
- Text Primary: `#232323`
- Text Secondary: `#6B7280`
- Muted Surface: `rgba(255, 255, 255, 0.68)`

---

## 3. Theme

Use a light premium glass UI theme.

The UI should have:
- soft blurred background
- white glass panels
- subtle border
- soft shadow
- rounded corners
- clean spacing
- orange highlights
- minimal but premium visual depth

Do not use dark UI unless specifically requested.

---

## 4. Layout System

All screens should follow the same layout structure:

1. Global Header
2. Breadcrumb Row
3. Page Title + Subtitle
4. CTA Group
5. Tab Navigation
6. Main Content Area
7. Supporting Cards / Footer Trust Strip

Every screen should be single-page and no-scroll where possible.

---

## 5. Header

Use one shared header component across the full project.

Header must include:
- DelphiAI logo on the left
- Previous button
- Next button
- Breadcrumb
- Search field
- Optional Contact Us button

Header style:
- height: 64px to 72px
- glass white background
- 1px subtle border
- rounded corners
- soft shadow
- consistent spacing

Do not create different headers for Industries and Engines.

---

## 6. Breadcrumb

Breadcrumb style should be consistent everywhere.

Example for Industries:

`Home > Industries > Healthcare > Clinical Document Intelligence`

Example for Engines:

`Home > Engines > Agentic RAG`

Rules:
- current page should use orange
- previous levels should use dark gray or muted gray
- use the same separator icon everywhere

---

## 7. Typography

Use a clean modern sans-serif font.

### Page Title
- large, bold, clear
- use dark gray
- max 1–2 lines

### Subtitle
- medium size
- muted gray
- max 2 lines
- should explain business value clearly

### Section Title
- medium bold
- dark gray

### Card Title
- semi-bold
- short and meaningful

### Card Description
- muted gray
- 1–2 lines only

Avoid long paragraphs inside cards.

---

## 8. Buttons

Use one shared button system.

### Primary Button
Use for main action.

Style:
- orange background `#E94C17`
- white text
- rounded corners
- soft orange shadow
- icon on right if needed

Examples:
- Explore Use Cases
- Try Demo
- View Engine
- Start AI Roadmap

### Secondary Button
Use for supporting actions.

Style:
- dark gray or soft gray background
- white or dark text depending on contrast
- same radius as primary button

Examples:
- View Prototype
- Watch Video
- Data Models
- Frameworks
- Best Practices

### Ghost Button
Use for low-priority actions.

Style:
- transparent / glass
- subtle border
- dark gray text

Examples:
- Gallery
- Learn More
- View Details

Do not create custom button styles per page.

---

## 9. Tabs

Use one shared tab component everywhere.

Tab style:
- rounded pill tabs
- active tab: orange filled or orange underline
- inactive tab: white / glass background
- same padding and radius everywhere
- same font size everywhere

Industries Use Case Detail Tabs:
- Overview
- How It Works
- Tech. Architecture
- Engine Map / AI Flow

Engine Detail Tabs:
- Overview
- Engine Flow
- Tech. Architecture
- Quality Assurance

Visual style must remain the same even if tab labels change.

---

## 10. Cards

Use one consistent card style across all screens.

Card style:
- background: white or frosted glass
- border: subtle light gray
- radius: 16px to 20px
- shadow: soft, not heavy
- padding: consistent
- icon top-left or left-aligned
- title below or beside icon
- short description
- optional CTA arrow

Use the same card styling for:
- Use Case Cards
- Engine Cards
- Benefit Cards
- KPI Cards
- Architecture Cards
- Manufacturing Cards
- Capability Cards

---

## 11. Icons

Use one icon style across the full project.

Icon rules:
- thin line icons
- rounded stroke
- consistent size
- orange for active/important icons
- dark gray for default icons
- muted gray for inactive icons

Recommended icon size:
- small: 16px
- medium: 20px
- large card icon: 32px to 40px

Do not mix filled, 3D, outline, and different icon styles randomly.

---

## 12. Screen Structure — Industries Flow

### Screen 01 — Industry Landing Page

Title:  
**Healthcare Solutions**

Subtitle:  
AI-powered capabilities that enable better patient outcomes, smarter operations, secure compliance, and faster digital transformation across the healthcare ecosystem.

Buttons:
- Explore Use Cases
- Data Models
- Frameworks
- Best Practices

Sections:
- Featured Healthcare Capabilities
- Use Case Cards
- Trust / Compliance Strip

---

### Screen 02 — Use Case Explorer

Title:  
**Clinical Document Intelligence**

Subtitle:  
Turn unstructured clinical documents into validated, structured insights for faster and more accurate care decisions.

Required UI:
- left category navigation
- search
- filters
- use case cards
- selected state
- CTA to explore selected use case

Categories:
- All Use Cases
- Revenue Cycle
- Clinical Operations
- Patient Access
- Quality & Compliance

---

### Screen 03 — Case Study / Solution Detail

Title:  
**AI-Powered Clinical Document Intelligence for Healthcare Operations**

Subtitle:  
A Delphi solution experience showing how AI extracts, validates, and routes clinical insights from unstructured records to improve speed, accuracy, and operational efficiency.

Tabs:
- Overview
- How It Works
- Tech. Architecture
- Engine Map / AI Flow

Buttons:
- Try Demo
- View Prototype
- Watch Video
- Gallery

---

### Screen 04 — AI Delivery / How It Works

Title:  
**AI-Accelerated Delivery Journey**

Subtitle:  
See how Delphi combines AI-powered discovery, reusable accelerators, expert-led configuration, and automated QA to reduce delivery timelines while improving quality and governance.

Content:
- AI Flow
- AI-Accelerated Delivery Steps
- AI Powered vs Custom / Expert-Led tags
- Timeline badge: `6–10 Weeks`
- Highlight: `Up to 50% Faster Delivery`

---

### Screen 05 — Engine Map & Architecture

Title:  
**Engine Map & Architecture**

Subtitle:  
Explore the AI engines powering the solution, how they connect into delivery, and where the architecture blueprint fits in.

Tabs:
- Engine Map / AI Flow
- Tech. Architecture
- Manufacturing View

Content:
- Simplified Engine Map
- Architecture Diagram Placeholder
- Connect to Manufacturing Unit
- Supporting Value Cards

---

## 13. Screen Structure — Engines Flow

### Engines Landing Page

Title:  
**AI Engines**

Subtitle:  
Explore DelphiAI’s reusable intelligence engines that power industry solutions, automate workflows, improve decision-making, and accelerate enterprise AI delivery.

Engine Cards:
- OCR
- Agentic RAG
- AGUI
- Multi-Agent Orchestration Framework
- MCP Authentication / Authorization
- Agent Ops
- Other

Each card should include:
- icon
- engine title
- short description
- CTA: View Engine

---

### Engine Detail Template

Every engine should use the same detail template.

Title:  
**Engine Name**

Description:  
Short business-friendly explanation of what the engine does and why it matters.

Tabs:
- Overview
- Engine Flow
- Tech. Architecture
- Quality Assurance

Overview sections:
- Capabilities with KPIs
- Problem
- Solution
- Used In

---

## 14. Engine Map Layout

Use a dev-friendly layout.

Avoid complex freeform node diagrams.

Use this structure:

### Capture Layer
Ingest, read, and prepare clinical documents.

Engines:
- OCR Engine
- Document Parser
- Data Normalization

### Intelligence Layer
Extract meaning, classify content, and enrich context.

Engines:
- NLP Engine
- Entity Extraction
- Classification Engine
- Search / RAG
- Solution Orchestrator

### Decision Layer
Validate, route, and deliver insights to business workflows.

Engines:
- Rules Engine
- Validation Engine
- Workflow Router
- Analytics Output

Use simple arrows between layers.

---

## 15. Footer Trust Strip

Use the same footer trust strip across all screens.

Items:
- Enterprise-Grade Security
- HIPAA / HITRUST / SOC 2 Compliant
- Cloud Agnostic & Scalable
- Proven Healthcare Expertise

Use consistent icon, text, spacing, and divider style.

---

## 16. UX Rules

Every screen should clearly answer:

1. Where am I?
2. What is this?
3. Why does it matter?
4. What can I do next?

Keep UI content:
- short
- meaningful
- scannable
- business-friendly
- visually structured

Avoid:
- long paragraphs
- too many styles
- inconsistent tabs
- inconsistent card sizes
- different header layouts
- different button styles
- dark theme mixed with light theme
- page-specific CSS duplication

---

## 17. Development Rules

Build reusable components:
- AppHeader
- Breadcrumb
- PageShell
- Tabs
- Button
- Card
- UseCaseCard
- EngineCard
- MetricCard
- FilterBar
- SearchInput
- CTAGroup
- FooterTrustStrip

Use shared design tokens:
- colors
- spacing
- radius
- shadows
- typography
- active states
- glass effect

All screens must import and use the shared components.

Do not duplicate styling inside individual pages unless unavoidable.

---

## 18. Reuse Prompt for Antigravity

Use this prompt whenever a screen needs to be updated:

```txt
Update this screen using the shared design system from:

`docs/ui-style-guide.md`

Do not create new custom styles unless required. Use the existing shared components, tokens, tab style, button style, card style, breadcrumb style, and header layout.

Make this screen consistent with the Industries and Engines light-tone DelphiAI Showroom UI.
```

---

## 19. Recommended Implementation Prompt

Use this prompt once to create the project structure:

```txt
Create a shared design system based on `docs/ui-style-guide.md`.

Create reusable components:
- AppHeader
- Breadcrumb
- PageShell
- Tabs
- Button
- Card
- UseCaseCard
- EngineCard
- MetricCard
- FilterBar
- SearchInput
- CTAGroup
- FooterTrustStrip

Create shared CSS variables/tokens for:
- colors
- spacing
- border radius
- shadows
- typography
- glass effects
- active states

Refactor all Industries and Engines screens to use these shared components and tokens.
Remove duplicated page-specific styles wherever possible.
```
