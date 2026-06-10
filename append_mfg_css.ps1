$css = @"

/* ============================================================
   MANUFACTURING UNIT FLOW STYLES
   ============================================================ */

/* 1. Manufacturing Landing Cards */
.mfg-landing-cards .mfg-card {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 20px;
    padding: 40px;
    width: 400px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
    backdrop-filter: blur(20px);
    transition: all 0.3s ease;
    cursor: pointer;
    text-align: left;
}

.mfg-landing-cards .mfg-card:hover {
    transform: translateY(-5px);
    border-color: rgba(233, 76, 23, 0.4);
    box-shadow: 0 10px 30px rgba(233, 76, 23, 0.15);
    background: rgba(255, 255, 255, 0.05);
}

.mfg-card-icon {
    background: rgba(233, 76, 23, 0.1);
    padding: 15px;
    border-radius: 12px;
    margin-bottom: 10px;
}

.mfg-landing-cards .mfg-card h3 {
    font-size: 1.5rem;
    margin: 0;
    font-weight: 600;
}

.mfg-landing-cards .mfg-card p {
    color: var(--text-secondary);
    line-height: 1.6;
    margin-bottom: 20px;
    flex-grow: 1;
}

/* 2. Envisioning Centre Opportunity Cards */
.opportunity-card {
    background: rgba(10, 10, 16, 0.6);
    border: 1px solid var(--border-subtle);
    border-radius: 16px;
    padding: 30px;
    display: flex;
    flex-direction: column;
    gap: 15px;
    backdrop-filter: blur(20px);
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
}

.opportunity-card:hover {
    transform: translateY(-4px);
    border-color: var(--accent);
    box-shadow: 0 8px 24px var(--accent-glow);
}

.opportunity-card h3 {
    font-size: 1.3rem;
    margin: 0;
    font-weight: 600;
    line-height: 1.3;
    padding-right: 120px; /* Space for status badge */
}

.opportunity-card p {
    color: var(--text-secondary);
    line-height: 1.5;
    font-size: 0.95rem;
}

/* Status Badges */
.opp-status {
    position: absolute;
    top: 30px;
    right: 30px;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    padding: 4px 12px;
    border-radius: 20px;
    letter-spacing: 0.5px;
}

.opp-status.in-progress {
    background: rgba(85, 170, 255, 0.15);
    color: #55aaff;
    border: 1px solid rgba(85, 170, 255, 0.3);
}

.opp-status.upcoming {
    background: rgba(255, 170, 85, 0.15);
    color: #ffaa55;
    border: 1px solid rgba(255, 170, 85, 0.3);
}

.opp-status.on-hold {
    background: rgba(255, 255, 255, 0.1);
    color: #aaa;
    border: 1px solid rgba(255, 255, 255, 0.2);
}

/* KPIs Section */
.opp-kpis {
    display: flex;
    gap: 20px;
    margin-top: 5px;
    padding-bottom: 15px;
    border-bottom: 1px solid var(--border-subtle);
    flex-wrap: wrap;
}

.opp-kpis span {
    font-size: 0.85rem;
    color: #ccc;
    display: flex;
    align-items: center;
    gap: 6px;
}

.opp-kpis strong {
    color: #fff;
    font-weight: 500;
}

/* Details List */
.opp-details {
    margin-top: 10px;
    flex-grow: 1;
}

.opp-details h4 {
    font-size: 0.9rem;
    color: var(--accent);
    margin-bottom: 10px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.opp-details ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.opp-details li {
    font-size: 0.85rem;
    color: #bbb;
    padding-left: 16px;
    position: relative;
    line-height: 1.4;
}

.opp-details li::before {
    content: "•";
    color: var(--accent);
    position: absolute;
    left: 0;
    font-size: 1.2rem;
    line-height: 1;
    top: -2px;
}

/* CTA */
.opportunity-card .opp-cta {
    margin-top: 20px;
    opacity: 0.8;
    transition: all 0.3s ease;
    align-self: flex-start;
}

.opportunity-card:hover .opp-cta {
    opacity: 1;
    background: var(--accent) !important;
    border-color: var(--accent) !important;
    box-shadow: 0 4px 14px var(--accent-glow) !important;
    color: #fff !important;
}

"@

Add-Content -Path "c:\Users\MobeenShaikh\Downloads\DelphiShowroom\css\style.css" -Value $css
