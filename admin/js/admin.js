/**
 * DelphiAI Showroom Admin SPA Logic (Dark Theme)
 */

// --- 1. Mock Data State ---
const state = {
  currentRoute: 'dashboard', // default route
  currentParams: {},
  industries: [
    { id: 1, name: 'Healthcare', description: 'AI-powered capabilities for healthcare.', cases: 5, status: 'Published', date: 'Oct 12, 2026' },
    { id: 2, name: 'Financial Services', description: 'Transforming banking and insurance.', cases: 3, status: 'Draft', date: 'Oct 10, 2026' }
  ],
  useCases: [
    { id: 1, title: 'Clinical Document Intelligence', industry: 'Healthcare', category: 'Revenue Cycle', status: 'Published', engines: 3, date: 'Oct 12, 2026' },
    { id: 2, title: 'Fraud Detection', industry: 'Financial Services', category: 'Risk', status: 'Draft', engines: 2, date: 'Oct 11, 2026' }
  ],
  caseStudies: [
    { id: 1, title: 'AI-Powered Clinical Doc Intelligence', industry: 'Healthcare', useCase: 'Clinical Document Intelligence', status: 'Published', date: 'Oct 12, 2026' }
  ],
  engines: [
    { id: 1, name: 'Agentic RAG', description: 'Retrieval Augmented Generation for documents.', usedIn: 12, status: 'Published', date: 'Oct 05, 2026' },
    { id: 2, name: 'OCR Engine', description: 'Extract text from images and PDFs.', usedIn: 8, status: 'Published', date: 'Oct 01, 2026' }
  ],
  mfgOpportunities: [
    { id: 1, title: 'Automated Claims Processing', size: '$5M+', industries: 'Healthcare, Insurance', status: 'In Progress', date: 'Oct 08, 2026' }
  ],
  diagrams: [
    { id: 1, name: 'healthcare_arch.png', page: 'Healthcare Solutions', type: 'Architecture', status: 'Published', date: 'Oct 10, 2026' }
  ],
  users: [
    { id: 1, name: 'Admin User', email: 'admin@delphiai.com', role: 'Super Admin', status: 'Active', lastActive: 'Just now' },
    { id: 2, name: 'Content Editor', email: 'editor@delphiai.com', role: 'Content Manager', status: 'Active', lastActive: '2 hours ago' }
  ]
};

// --- 2. Navigation Definition ---
const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: '<circle cx="12" cy="12" r="10"></circle><path d="M12 6v6l4 2"></path>' },
  { id: 'industries', label: 'Industries', icon: '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>' },
  { id: 'useCases', label: 'Use Cases', icon: '<rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="3" x2="9" y2="21"></line>' },
  { id: 'caseStudies', label: 'Case Studies', icon: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline>' },
  { id: 'engines', label: 'Engines', icon: '<circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>' },
  { id: 'mfgUnit', label: 'Manufacturing Unit', icon: '<polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline>' },
  { id: 'diagrams', label: 'Architecture Diagrams', icon: '<rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline>' },
  { id: 'media', label: 'Media Library', icon: '<rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline>' },
  { id: 'users', label: 'Users & Roles', icon: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path>' },
  { id: 'settings', label: 'Settings', icon: '<circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>' }
];

// --- 3. Core Engine ---

function renderSidebar() {
  const navContainer = document.getElementById('sidebar-nav');
  navContainer.innerHTML = NAV_ITEMS.map(item => `
    <li class="${state.currentRoute.startsWith(item.id) ? 'active' : ''}" onclick="navigate('${item.id}')" style="display: flex; align-items: center; gap: 10px; cursor: pointer;">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${item.icon}</svg>
      ${item.label}
    </li>
  `).join('');
}

function renderBreadcrumb(items) {
  const container = document.getElementById('header-breadcrumb');
  container.innerHTML = `
    <span class="bc-crumb bc-link" style="color: rgba(255,255,255,0.7); cursor:pointer;" onclick="navigate('dashboard')">Home</span>
    ${items.map(i => `
      <span class="bc-sep" style="color: rgba(255,255,255,0.5);">&#8250;</span>
      <span class="bc-crumb ${i.active ? 'bc-current' : 'bc-link'}" style="color: ${i.active ? '#fff' : 'rgba(255,255,255,0.7)'}; ${i.route ? 'cursor:pointer;' : ''}" ${i.route ? `onclick="navigate('${i.route}')"` : ''}>${i.label}</span>
    `).join('')}
  `;
}

function navigate(route, params = {}) {
  state.currentRoute = route;
  state.currentParams = params;
  renderSidebar();
  renderContent();
}

function getBadgeHTML(status) {
  const cls = status === 'Published' ? 'published' : (status === 'Draft' ? 'draft' : 'archived');
  return `<span class="badge ${cls}">${status}</span>`;
}

function showDeleteModal(id, type, callback) {
  const modalContainer = document.getElementById('modal-container');
  modalContainer.innerHTML = `
    <div class="modal-overlay active" id="delete-modal">
      <div class="modal-content">
        <h3 class="modal-title">Delete ${type}?</h3>
        <div class="modal-body">
          Are you sure you want to delete this item? This action cannot be undone.
        </div>
        <div class="modal-footer">
          <button class="action-btn ghost" onclick="closeModal()">Cancel</button>
          <button class="action-btn primary" style="background: #DC2626;" onclick="${callback}">Delete</button>
        </div>
      </div>
    </div>
  `;
}

function closeModal() {
  document.getElementById('modal-container').innerHTML = '';
}

function getPageHeaderHTML(title, subtitle, actionHtml = '') {
  return `
    <div class="hc-hero landing-hero no-right-col" style="padding-bottom: 20px; max-width: 1600px; margin: 0; padding-left: 0; padding-right: 0; display: flex; justify-content: space-between; align-items: flex-start;">
        <div class="hero-left-col full-width align-left" style="flex: 1;">
            <h1 style="color: #fff; font-size: 2.8rem; margin-bottom: 15px;">${title}</h1>
            ${subtitle ? `<p style="color: rgba(255,255,255,0.7); font-size: 1.1rem; max-width: 800px; line-height: 1.6;">${subtitle}</p>` : ''}
        </div>
        ${actionHtml ? `<div style="margin-top: 10px;">${actionHtml}</div>` : ''}
    </div>
  `;
}

// --- 4. Screen Renderers ---

function renderContent() {
  const content = document.getElementById('admin-content');
  let html = '';
  
  if (state.currentRoute === 'dashboard') html = renderDashboard();
  else if (state.currentRoute === 'industries') html = renderIndustries();
  else if (state.currentRoute === 'addIndustry') html = renderAddEditIndustry();
  else if (state.currentRoute === 'useCases') html = renderUseCases();
  else if (state.currentRoute === 'addUseCase') html = renderAddEditUseCase();
  else if (state.currentRoute === 'caseStudies') html = renderCaseStudies();
  else if (state.currentRoute === 'addCaseStudy') html = renderAddEditCaseStudy();
  else if (state.currentRoute === 'engines') html = renderEngines();
  else if (state.currentRoute === 'addEngine') html = renderAddEditEngine();
  else if (state.currentRoute === 'mfgUnit') html = renderMfgUnit();
  else if (state.currentRoute === 'diagrams') html = renderDiagrams();
  else if (state.currentRoute === 'media') html = renderMedia();
  else if (state.currentRoute === 'users') html = renderUsers();
  else if (state.currentRoute === 'settings') html = renderSettings();
  else html = `<h2>Not Implemented</h2>`;
  
  content.innerHTML = html;
}

// -- Dashboard
function renderDashboard() {
  renderBreadcrumb([{ label: 'Dashboard', active: true }]);
  return `
    ${getPageHeaderHTML('Admin Dashboard', 'Manage showroom content, monitor publishing status, and keep Industries, Engines, and Manufacturing Unit experiences up to date.')}
    
    <div class="dashboard-cards">
      <div class="kpi-card">
        <div class="card-title">Total Industries</div>
        <div class="kpi-value">${state.industries.length}</div>
      </div>
      <div class="kpi-card">
        <div class="card-title">Total Use Cases</div>
        <div class="kpi-value">${state.useCases.length}</div>
      </div>
      <div class="kpi-card">
        <div class="card-title">Total Engines</div>
        <div class="kpi-value">${state.engines.length}</div>
      </div>
      <div class="kpi-card">
        <div class="card-title">Published Pages</div>
        <div class="kpi-value" style="color: #10b981;">12</div>
      </div>
      <div class="kpi-card">
        <div class="card-title">Draft Items</div>
        <div class="kpi-value" style="color: #f59e0b;">4</div>
      </div>
    </div>
    
    <div class="form-grid">
      <div>
        <h2 class="section-title">Quick Actions</h2>
        <div style="display: flex; gap: 12px; flex-wrap: wrap;">
          <button class="action-btn primary" onclick="navigate('addIndustry')">Add Industry</button>
          <button class="action-btn primary" onclick="navigate('addUseCase')">Add Use Case</button>
          <button class="action-btn primary" onclick="navigate('addEngine')">Add Engine</button>
          <button class="action-btn secondary" onclick="navigate('media')">Upload Media</button>
        </div>
      </div>
      <div>
        <h2 class="section-title">Recent Updates</h2>
        <div class="table-container">
          <table class="admin-table">
            <tbody>
              <tr><td>Healthcare Solutions</td><td style="color: rgba(255,255,255,0.5);">Updated 2h ago</td></tr>
              <tr><td>Agentic RAG</td><td style="color: rgba(255,255,255,0.5);">Updated 1d ago</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

// -- Industries
function renderIndustries() {
  renderBreadcrumb([{ label: 'Industries', active: true }]);
  
  const actions = `<button class="action-btn primary" onclick="navigate('addIndustry')">Add Industry</button>`;
  
  const rows = state.industries.map(ind => `
    <tr>
      <td style="font-weight: 600;">${ind.name}</td>
      <td>${ind.description}</td>
      <td>${ind.cases}</td>
      <td>${getBadgeHTML(ind.status)}</td>
      <td>${ind.date}</td>
      <td>
        <div style="display: flex; gap: 8px;">
          <button class="action-btn ghost" onclick="navigate('addIndustry', {id: ${ind.id}})">Edit</button>
          <button class="action-btn ghost danger" onclick="showDeleteModal(${ind.id}, 'Industry', 'closeModal()')">Delete</button>
        </div>
      </td>
    </tr>
  `).join('');

  return `
    ${getPageHeaderHTML('Industries', 'Add, edit, organize, and publish industry landing pages and related content.', actions)}

    <div class="table-container">
      <div style="padding: 16px 20px; border-bottom: 1px solid rgba(255,255,255,0.1); background: rgba(255,255,255,0.02);">
        <select class="input-field" style="height: 36px;">
          <option>All Status</option>
          <option>Published</option>
          <option>Draft</option>
        </select>
      </div>
      <table class="admin-table">
        <thead>
          <tr>
            <th>Industry Name</th>
            <th>Description</th>
            <th>Linked Use Cases</th>
            <th>Status</th>
            <th>Last Updated</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          ${rows}
        </tbody>
      </table>
    </div>
  `;
}

// -- Add / Edit Industry
function renderAddEditIndustry() {
  const isEdit = state.currentParams.id;
  renderBreadcrumb([
    { label: 'Industries', route: 'industries' },
    { label: isEdit ? 'Edit Industry' : 'Add Industry', active: true }
  ]);
  
  return `
    ${getPageHeaderHTML(`${isEdit ? 'Edit' : 'Add'} Industry`, '')}

    <div class="form-panel">
      <h2 class="section-title">Basic Information</h2>
      <div class="form-grid">
        <div class="form-group">
          <label class="form-label">Industry Name</label>
          <input type="text" class="input-field" value="${isEdit ? 'Healthcare' : ''}" placeholder="e.g. Healthcare">
        </div>
        <div class="form-group">
          <label class="form-label">Short Subtitle</label>
          <input type="text" class="input-field" value="${isEdit ? 'AI-powered capabilities for healthcare.' : ''}">
        </div>
        <div class="form-group" style="grid-column: span 2;">
          <label class="form-label">Industry Description</label>
          <textarea class="input-field" placeholder="Full description..."></textarea>
        </div>
      </div>

      <h2 class="section-title" style="margin-top: 40px;">Metrics</h2>
      <div class="form-grid">
        <div class="form-group">
          <label class="form-label">Metric Label</label>
          <input type="text" class="input-field" placeholder="e.g. ROI">
        </div>
        <div class="form-group">
          <label class="form-label">Metric Value</label>
          <input type="text" class="input-field" placeholder="e.g. 50%">
        </div>
      </div>

      <h2 class="section-title" style="margin-top: 40px;">Status</h2>
      <div class="form-group" style="width: 200px;">
        <select class="input-field">
          <option>Draft</option>
          <option ${isEdit ? 'selected' : ''}>Published</option>
          <option>Archived</option>
        </select>
      </div>
      
      <div style="margin-top: 40px; display: flex; gap: 12px; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 20px;">
        <button class="action-btn ghost" onclick="navigate('industries')">Cancel</button>
        <button class="action-btn secondary">Preview</button>
        <button class="action-btn secondary" onclick="navigate('industries')">Save Draft</button>
        <button class="action-btn primary" onclick="navigate('industries')">Publish</button>
      </div>
    </div>
  `;
}

// -- Use Cases
function renderUseCases() {
  renderBreadcrumb([{ label: 'Use Cases', active: true }]);
  
  const actions = `<button class="action-btn primary" onclick="navigate('addUseCase')">Add Use Case</button>`;
  const rows = state.useCases.map(uc => `
    <tr>
      <td style="font-weight: 600;">${uc.title}</td>
      <td>${uc.industry}</td>
      <td>${uc.category}</td>
      <td>${getBadgeHTML(uc.status)}</td>
      <td>${uc.engines}</td>
      <td>${uc.date}</td>
      <td>
        <div style="display: flex; gap: 8px;">
          <button class="action-btn ghost" onclick="navigate('addUseCase', {id: ${uc.id}})">Edit</button>
          <button class="action-btn ghost danger" onclick="showDeleteModal(${uc.id}, 'Use Case', 'closeModal()')">Delete</button>
        </div>
      </td>
    </tr>
  `).join('');

  return `
    ${getPageHeaderHTML('Use Cases', 'Manage all industry use cases, categories, descriptions, cards, and linked case studies.', actions)}

    <div class="table-container">
      <table class="admin-table">
        <thead>
          <tr>
            <th>Use Case Title</th>
            <th>Industry</th>
            <th>Category</th>
            <th>Status</th>
            <th>Linked Engines</th>
            <th>Last Updated</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
  `;
}

// -- Add / Edit Use Case
function renderAddEditUseCase() {
  const isEdit = state.currentParams.id;
  renderBreadcrumb([
    { label: 'Use Cases', route: 'useCases' },
    { label: isEdit ? 'Edit Use Case' : 'Add Use Case', active: true }
  ]);
  
  return `
    ${getPageHeaderHTML(`${isEdit ? 'Edit' : 'Add'} Use Case`, '')}

    <div class="form-panel">
      <h2 class="section-title">Basic Information</h2>
      <div class="form-grid">
        <div class="form-group">
          <label class="form-label">Use Case Title</label>
          <input type="text" class="input-field" value="${isEdit ? 'Clinical Document Intelligence' : ''}">
        </div>
        <div class="form-group">
          <label class="form-label">Industry</label>
          <select class="input-field">
            <option>Healthcare</option>
            <option>Financial Services</option>
          </select>
        </div>
      </div>
      
      <h2 class="section-title" style="margin-top: 40px;">Business Story</h2>
      <div class="form-grid full">
        <div class="form-group">
          <label class="form-label">Problem</label>
          <textarea class="input-field"></textarea>
        </div>
        <div class="form-group">
          <label class="form-label">Solution</label>
          <textarea class="input-field"></textarea>
        </div>
      </div>

      <div style="margin-top: 40px; display: flex; gap: 12px; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 20px;">
        <button class="action-btn ghost" onclick="navigate('useCases')">Cancel</button>
        <button class="action-btn primary" onclick="navigate('useCases')">Save</button>
      </div>
    </div>
  `;
}

// -- Case Studies
function renderCaseStudies() {
  renderBreadcrumb([{ label: 'Case Studies', active: true }]);
  const actions = `<button class="action-btn primary" onclick="navigate('addCaseStudy')">Add Case Study</button>`;
  const rows = state.caseStudies.map(cs => `
    <tr>
      <td style="font-weight: 600;">${cs.title}</td>
      <td>${cs.industry}</td>
      <td>${cs.useCase}</td>
      <td>${getBadgeHTML(cs.status)}</td>
      <td>${cs.date}</td>
      <td>
        <button class="action-btn ghost" onclick="navigate('addCaseStudy', {id: ${cs.id}})">Edit</button>
      </td>
    </tr>
  `).join('');

  return `
    ${getPageHeaderHTML('Case Studies', 'Manage solution detail pages, overview content, AI flow, architecture, engine map, and gallery assets.', actions)}
    <div class="table-container">
      <table class="admin-table">
        <thead>
          <tr><th>Case Study Title</th><th>Industry</th><th>Use Case</th><th>Status</th><th>Last Updated</th><th>Actions</th></tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
  `;
}

function renderAddEditCaseStudy() {
  const isEdit = state.currentParams.id;
  renderBreadcrumb([
    { label: 'Case Studies', route: 'caseStudies' },
    { label: isEdit ? 'Edit Case Study' : 'Add Case Study', active: true }
  ]);
  return `
    ${getPageHeaderHTML(`${isEdit ? 'Edit' : 'Add'} Case Study`, '')}
    <div class="form-panel">
      <div class="deep-dive-tabs" style="padding: 0 !important; gap: 10px; border-bottom: none; display: flex; flex-wrap: wrap; margin-bottom: 30px;">
        <button class="dd-tab active">Overview</button>
        <button class="dd-tab">How It Works</button>
        <button class="dd-tab">Tech. Architecture</button>
        <button class="dd-tab">Engine Map</button>
        <button class="dd-tab">Gallery</button>
      </div>
      <div class="form-grid">
        <div class="form-group">
          <label class="form-label">Case Study Title</label>
          <input type="text" class="input-field" value="${isEdit ? 'AI-Powered Clinical Doc Intelligence' : ''}">
        </div>
      </div>
      <div style="margin-top: 40px; display: flex; gap: 12px; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 20px;">
        <button class="action-btn ghost" onclick="navigate('caseStudies')">Cancel</button>
        <button class="action-btn primary" onclick="navigate('caseStudies')">Save</button>
      </div>
    </div>
  `;
}

// -- Engines
function renderEngines() {
  renderBreadcrumb([{ label: 'Engines', active: true }]);
  const actions = `<button class="action-btn primary" onclick="navigate('addEngine')">Add Engine</button>`;
  const rows = state.engines.map(en => `
    <tr>
      <td style="font-weight: 600;">${en.name}</td>
      <td>${en.description}</td>
      <td>${en.usedIn}</td>
      <td>${getBadgeHTML(en.status)}</td>
      <td>${en.date}</td>
      <td><button class="action-btn ghost" onclick="navigate('addEngine', {id: ${en.id}})">Edit</button></td>
    </tr>
  `).join('');

  return `
    ${getPageHeaderHTML('Engines', 'Manage reusable AI engines used across industries, case studies, and manufacturing unit experiences.', actions)}
    <div class="table-container">
      <table class="admin-table">
        <thead>
          <tr><th>Engine Name</th><th>Description</th><th>Used In</th><th>Status</th><th>Last Updated</th><th>Actions</th></tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
  `;
}

function renderAddEditEngine() {
  const isEdit = state.currentParams.id;
  renderBreadcrumb([
    { label: 'Engines', route: 'engines' },
    { label: isEdit ? 'Edit Engine' : 'Add Engine', active: true }
  ]);
  return `
    ${getPageHeaderHTML(`${isEdit ? 'Edit' : 'Add'} Engine`, '')}
    <div class="form-panel">
      <h2 class="section-title">Basic Information</h2>
      <div class="form-grid">
        <div class="form-group">
          <label class="form-label">Engine Name</label>
          <input type="text" class="input-field" value="${isEdit ? 'Agentic RAG' : ''}">
        </div>
      </div>
      <div style="margin-top: 40px; display: flex; gap: 12px; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 20px;">
        <button class="action-btn ghost" onclick="navigate('engines')">Cancel</button>
        <button class="action-btn primary" onclick="navigate('engines')">Save</button>
      </div>
    </div>
  `;
}

// -- Manufacturing Unit
function renderMfgUnit() {
  renderBreadcrumb([{ label: 'Manufacturing Unit', active: true }]);
  const actions = `<button class="action-btn primary">Add Opportunity</button>`;
  const rows = state.mfgOpportunities.map(mfg => `
    <tr>
      <td style="font-weight: 600;">${mfg.title}</td>
      <td>${mfg.size}</td>
      <td>${mfg.industries}</td>
      <td>${getBadgeHTML('Draft')}</td>
      <td>${mfg.date}</td>
      <td><button class="action-btn ghost">Edit</button></td>
    </tr>
  `).join('');

  return `
    ${getPageHeaderHTML('Manufacturing Unit', 'Manage Envisioning Centre opportunities and Engine Hall content.', actions)}
    
    <div class="deep-dive-tabs" style="padding: 0 !important; gap: 10px; border-bottom: none; display: flex; flex-wrap: wrap; margin-bottom: 20px;">
      <button class="dd-tab active">Envisioning Centre</button>
      <button class="dd-tab">Engine Hall</button>
    </div>

    <div class="table-container">
      <table class="admin-table">
        <thead>
          <tr><th>Opportunity Title</th><th>Size</th><th>Industries</th><th>Status</th><th>Last Updated</th><th>Actions</th></tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
  `;
}

// -- Architecture Diagrams
function renderDiagrams() {
  renderBreadcrumb([{ label: 'Architecture Diagrams', active: true }]);
  const actions = `<button class="action-btn primary">Upload Diagram</button>`;
  const rows = state.diagrams.map(d => `
    <tr>
      <td style="font-weight: 600;">${d.name}</td>
      <td>${d.page}</td>
      <td>${d.type}</td>
      <td>${d.date}</td>
      <td>${getBadgeHTML(d.status)}</td>
      <td><button class="action-btn ghost">Manage</button></td>
    </tr>
  `).join('');

  return `
    ${getPageHeaderHTML('Architecture Diagrams', '', actions)}
    <div class="table-container">
      <table class="admin-table">
        <thead>
          <tr><th>Diagram Name</th><th>Linked Page</th><th>Type</th><th>Uploaded Date</th><th>Status</th><th>Actions</th></tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
  `;
}

// -- Media Library
function renderMedia() {
  renderBreadcrumb([{ label: 'Media Library', active: true }]);
  const actions = `<button class="action-btn primary">Upload Media</button>`;
  return `
    ${getPageHeaderHTML('Media Library', '', actions)}
    <div class="empty-state">
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
      <h3>Media Library Empty</h3>
      <p>Upload images, icons, diagrams, and videos used across the showroom.</p>
    </div>
  `;
}

// -- Users & Roles
function renderUsers() {
  renderBreadcrumb([{ label: 'Users & Roles', active: true }]);
  const actions = `<button class="action-btn primary">Add User</button>`;
  const rows = state.users.map(u => `
    <tr>
      <td style="font-weight: 600;">${u.name}</td>
      <td>${u.email}</td>
      <td>${getBadgeHTML('Draft')}</td>
      <td>${getBadgeHTML('Published')}</td>
      <td>${u.lastActive}</td>
      <td><button class="action-btn ghost">Edit</button></td>
    </tr>
  `).join('');

  return `
    ${getPageHeaderHTML('Users & Roles', '', actions)}
    <div class="table-container">
      <table class="admin-table">
        <thead>
          <tr><th>User Name</th><th>Email</th><th>Role</th><th>Status</th><th>Last Active</th><th>Actions</th></tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
  `;
}

// -- Settings
function renderSettings() {
  renderBreadcrumb([{ label: 'Settings', active: true }]);
  return `
    ${getPageHeaderHTML('Settings', '')}
    <div class="form-panel">
      <h2 class="section-title">Global Showroom Settings</h2>
      <div class="form-grid full">
        <div class="form-group">
          <label class="form-label">Brand Title</label>
          <input type="text" class="input-field" value="DelphiAI Showroom">
        </div>
      </div>
      <div style="margin-top: 40px;">
        <button class="action-btn primary">Save Settings</button>
      </div>
    </div>
  `;
}

// --- 5. Bootstrapping ---
document.addEventListener('DOMContentLoaded', () => {
  navigate('dashboard');
});
