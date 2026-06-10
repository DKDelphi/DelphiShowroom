$js = @'

// --- Manufacturing Unit Logic --- //
const manufacturingUiContainer = document.getElementById('manufacturing-ui-container');

function hideAllManufacturingScreens() {
    document.querySelectorAll('#manufacturing-ui-container > section').forEach(sec => sec.classList.add('hidden'));
}

function openManufacturingUnit() {
    // Hide main landing container
    const mainContainer = document.getElementById('main-container');
    if (mainContainer) mainContainer.classList.add('hidden');
    document.body.style.overflowY = 'auto'; // allow scroll within the container

    if (manufacturingUiContainer) manufacturingUiContainer.classList.remove('hidden');
    
    hideAllManufacturingScreens();
    document.getElementById('screen-manufacturing-landing').classList.remove('hidden');
    window.scrollTo(0, 0);
}

function openEnvisioningCentre() {
    hideAllManufacturingScreens();
    document.getElementById('screen-envisioning-centre').classList.remove('hidden');
    window.scrollTo(0, 0);
}

function openEngineHall() {
    hideAllManufacturingScreens();
    
    // Hide engine details if we came back from there
    const enginesUiContainer = document.getElementById('engines-ui-container');
    if (enginesUiContainer) enginesUiContainer.classList.add('hidden');

    if (manufacturingUiContainer) manufacturingUiContainer.classList.remove('hidden');

    document.getElementById('screen-engine-hall').classList.remove('hidden');
    window.scrollTo(0, 0);

    renderManufacturingEngineHall();
}

function goBackToLandingFromManufacturing() {
    if (manufacturingUiContainer) manufacturingUiContainer.classList.add('hidden');
    const mainContainer = document.getElementById('main-container');
    if (mainContainer) mainContainer.classList.remove('hidden');
    
    document.body.style.overflowY = 'hidden'; 
    window.scrollTo(0, 0);
}

function renderManufacturingEngineHall() {
    const grid = document.getElementById('manufacturing-engines-grid');
    if (!grid || typeof engineData === 'undefined') return;
    
    grid.innerHTML = '';
    
    // Requested engines: 1, 8, 2, 3, 4, 5, 6, 18, 19, 20
    const mfgEngineIds = ['engine-1', 'engine-8', 'engine-2', 'engine-3', 'engine-4', 'engine-5', 'engine-6', 'engine-18', 'engine-19', 'engine-20'];
    
    mfgEngineIds.forEach(id => {
        const eng = engineData.find(e => e.id === id);
        if (!eng) return;
        
        const card = document.createElement('div');
        card.className = 'opportunity-card'; // Use glass card styling
        card.style.display = 'flex';
        card.style.flexDirection = 'column';
        card.style.cursor = 'pointer';
        card.style.position = 'relative';
        card.style.transition = 'all 0.3s ease';
        
        // Ensure hover lifts it
        card.onmouseenter = () => { card.style.transform = 'translateY(-4px)'; card.style.borderColor = 'rgba(255,170,85,0.4)'; };
        card.onmouseleave = () => { card.style.transform = 'none'; card.style.borderColor = 'var(--border-subtle)'; };
        
        card.innerHTML = `
            <div style="flex-grow: 1;">
                <h3 style="margin-bottom: 10px; font-size: 1.3rem;">${eng.title}</h3>
                <p style="color: var(--text-secondary); line-height: 1.5; font-size: 0.95rem;">${eng.desc}</p>
            </div>
            <div class="card-actions" style="margin-top: 20px;">
                <button class="action-btn btn-demo" style="padding: 8px 16px; font-size: 0.85rem;" onclick="event.stopPropagation();">Demo</button>
                <button class="action-btn btn-secondary" style="padding: 8px 16px; font-size: 0.85rem;" onclick="event.stopPropagation(); openEngineDetail('${eng.id}', 'manufacturing-engine-hall')">View Engine</button>
            </div>
        `;
        
        card.addEventListener('click', () => openEngineDetail(eng.id, 'manufacturing-engine-hall'));
        grid.appendChild(card);
    });
}
'@

Add-Content -Path "c:\Users\MobeenShaikh\Downloads\DelphiShowroom\js\main.js" -Value $js
