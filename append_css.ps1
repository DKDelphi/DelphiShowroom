$css = @"

/* --- Engine Detail Page Tab Styles --- */
.engine-tab {
    background: transparent;
    border: 1px solid transparent;
    color: #a0a0a0;
    padding: 8px 18px;
    border-radius: 20px;
    font-weight: 500;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: all 0.3s ease;
}

.engine-tab:hover {
    background: rgba(255, 255, 255, 0.03);
    color: #ffffff;
}

.engine-tab.active {
    background: rgba(233, 76, 23, 0.1);
    color: #e94c17;
    border: 1px solid rgba(233, 76, 23, 0.3);
}

/* --- Content Breakdown Layout --- */
.content-breakdown {
    border: 1px solid rgba(255,255,255,0.05);
    border-radius: 12px;
    background: rgba(10,10,12,0.5);
    overflow: hidden;
}

.breakdown-row {
    display: flex;
    border-bottom: 1px solid rgba(255,255,255,0.05);
}

.breakdown-row:last-child {
    border-bottom: none;
}

.breakdown-left {
    width: 150px;
    padding: 24px;
    border-right: 1px solid rgba(255,255,255,0.05);
    display: flex;
    align-items: flex-start;
}

.breakdown-left h4 {
    color: var(--accent-orange);
    font-size: 0.85rem;
    text-transform: uppercase;
    letter-spacing: 1px;
}

.breakdown-right {
    flex: 1;
    padding: 24px;
    color: var(--text-secondary);
    line-height: 1.6;
}

/* Ensure flow container uses original styles properly */
#engine-flow-container .flow-step {
    padding: 12px 20px !important;
}

"@

Add-Content -Path "c:\Users\MobeenShaikh\Downloads\DelphiShowroom\css\style.css" -Value $css
