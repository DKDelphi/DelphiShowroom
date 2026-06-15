// =========================================================
// DelphiAI Showroom — Admin Scripts
// =========================================================

document.addEventListener('DOMContentLoaded', () => {
    // 1. Navigation / Screen Routing
    const navItems = document.querySelectorAll('.admin-nav-item');
    const screens = document.querySelectorAll('.admin-screen');
    const breadcrumbCurrent = document.getElementById('bc-current');

    function navigateToScreen(screenId) {
        // Hide all screens
        screens.forEach(s => s.classList.remove('active'));
        // Remove active class from nav
        navItems.forEach(n => n.classList.remove('active'));

        // Show target screen
        const targetScreen = document.getElementById(screenId);
        if (targetScreen) {
            targetScreen.classList.add('active');
        }

        // Set active nav item and breadcrumb
        const targetNav = document.querySelector(`.admin-nav-item[data-target="${screenId}"]`);
        if (targetNav) {
            targetNav.classList.add('active');
            if (breadcrumbCurrent) {
                breadcrumbCurrent.textContent = targetNav.querySelector('span').textContent;
            }
        }
    }

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = item.getAttribute('data-target');
            navigateToScreen(targetId);
        });
    });

    // 2. Tab Switching (Manufacturing Unit & others)
    const tabButtons = document.querySelectorAll('.tab-item');
    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target') || btn.getAttribute('data-tab-target');
            if (!targetId) return;

            // Find parent tab-list to scope the active class removal
            const tabList = btn.closest('.tab-list');
            if (tabList) {
                tabList.querySelectorAll('.tab-item').forEach(t => {
                    t.classList.remove('active');
                    t.setAttribute('data-active', 'false');
                });
            }

            btn.classList.add('active');
            btn.setAttribute('data-active', 'true');

            // Find parent container to scope pane switching
            // Assuming panes are siblings to the tab-list's container or have specific class
            const parentSection = btn.closest('.admin-screen');
            if (parentSection) {
                const panes = parentSection.querySelectorAll('.tab-pane');
                panes.forEach(p => p.classList.add('hidden'));

                const targetPane = document.getElementById(targetId);
                if (targetPane) {
                    targetPane.classList.remove('hidden');
                }
            }
        });
    });

    // 3. Modals (Delete Confirmation)
    const deleteModal = document.getElementById('delete-modal');
    const btnCancelDelete = document.getElementById('btn-cancel-delete');
    
    // Attach to all delete buttons (delegation)
    document.body.addEventListener('click', (e) => {
        const deleteBtn = e.target.closest('.action-delete');
        if (deleteBtn) {
            if (deleteModal) deleteModal.classList.add('active');
        }

        const editBtn = e.target.closest('.action-edit');
        if (editBtn) {
            const formTarget = editBtn.getAttribute('data-form-target');
            if (formTarget) navigateToScreen(formTarget);
        }

        const addBtn = e.target.closest('.action-add');
        if (addBtn) {
            const formTarget = addBtn.getAttribute('data-form-target');
            if (formTarget) navigateToScreen(formTarget);
        }

        const cancelFormBtn = e.target.closest('.action-cancel-form');
        if (cancelFormBtn) {
            const backTarget = cancelFormBtn.getAttribute('data-back-target');
            if (backTarget) navigateToScreen(backTarget);
        }
    });

    if (btnCancelDelete && deleteModal) {
        btnCancelDelete.addEventListener('click', () => {
            deleteModal.classList.remove('active');
        });
    }

    // Default Route
    navigateToScreen('screen-dashboard');
});


// --- Unified Multi-Select Component --- //
class DelphiMultiSelect {
    constructor(elementId, options = [], selected = []) {
        this.container = document.getElementById(elementId);
        if (!this.container) return;
        
        this.options = options;
        this.selected = selected;
        this.isOpen = false;
        
        this.render();
        this.attachEvents();
    }

    render() {
        this.container.innerHTML = `
            <div class="multi-select-container">
                <div class="multi-select-input-wrapper" id="${this.container.id}-wrapper">
                    <div class="multi-select-chips" id="${this.container.id}-chips"></div>
                    <input type="text" class="multi-select-search" id="${this.container.id}-search" placeholder="Search and select...">
                </div>
                <div class="multi-select-dropdown" id="${this.container.id}-dropdown"></div>
            </div>
        `;
        
        this.wrapper = this.container.querySelector('.multi-select-input-wrapper');
        this.chipsContainer = this.container.querySelector('.multi-select-chips');
        this.searchInput = this.container.querySelector('.multi-select-search');
        this.dropdown = this.container.querySelector('.multi-select-dropdown');
        
        this.updateChips();
        this.updateDropdown();
    }

    updateChips() {
        this.chipsContainer.innerHTML = '';
        this.selected.forEach(val => {
            const opt = this.options.find(o => o.value === val);
            if (!opt) return;
            
            const chip = document.createElement('div');
            chip.className = 'multi-chip';
            chip.innerHTML = `
                ${opt.label}
                <span class="multi-chip-remove" data-val="${val}">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </span>
            `;
            this.chipsContainer.appendChild(chip);
        });
    }

    updateDropdown(filterText = '') {
        this.dropdown.innerHTML = '';
        const filtered = this.options.filter(o => o.label.toLowerCase().includes(filterText.toLowerCase()));
        
        if (filtered.length === 0) {
            this.dropdown.innerHTML = '<div class="multi-option" style="cursor:default; color:var(--color-text-muted);">No options found.</div>';
            return;
        }

        filtered.forEach(opt => {
            const isSelected = this.selected.includes(opt.value);
            const el = document.createElement('div');
            el.className = `multi-option ${isSelected ? 'selected' : ''}`;
            el.innerHTML = `
                <span>${opt.label}</span>
            `;
            
            el.addEventListener('click', (e) => {
                e.stopPropagation();
                if (isSelected) {
                    this.selected = this.selected.filter(v => v !== opt.value);
                } else {
                    this.selected.push(opt.value);
                }
                this.searchInput.value = '';
                this.updateChips();
                this.updateDropdown();
                // trigger change event
                this.container.dispatchEvent(new CustomEvent('change', { detail: this.selected }));
            });
            this.dropdown.appendChild(el);
        });
    }

    attachEvents() {
        this.wrapper.addEventListener('click', (e) => {
            if (e.target.closest('.multi-chip-remove')) {
                const val = e.target.closest('.multi-chip-remove').dataset.val;
                this.selected = this.selected.filter(v => v !== val);
                this.updateChips();
                this.updateDropdown(this.searchInput.value);
                this.container.dispatchEvent(new CustomEvent('change', { detail: this.selected }));
                return;
            }
            this.dropdown.classList.add('open');
            this.isOpen = true;
            this.searchInput.focus();
        });

        this.searchInput.addEventListener('input', (e) => {
            this.dropdown.classList.add('open');
            this.updateDropdown(e.target.value);
        });

        document.addEventListener('click', (e) => {
            if (!this.container.contains(e.target)) {
                this.dropdown.classList.remove('open');
                this.isOpen = false;
            }
        });
    }
    
    getSelected() {
        return this.selected;
    }
}

// Initialize Multi-Selects for Use Case Form
document.addEventListener('DOMContentLoaded', () => {
    // Categories
    const categories = [
        {value: 'data', label: 'Data'},
        {value: 'ai', label: 'AI'},
        {value: 'cloud', label: 'Cloud'},
        {value: 'infra', label: 'Infrastructure & Security'},
        {value: 'genai', label: 'Gen AI'},
        {value: 'digital', label: 'Digital'}
    ];
    if (document.getElementById('uc-category-select')) {
        new DelphiMultiSelect('uc-category-select', categories, ['data', 'genai']);
    }

    // Tags
    const tags = [
        {value: 'analytics', label: 'Analytics'},
        {value: 'predictive', label: 'Predictive'},
        {value: 'ml', label: 'Machine Learning'},
        {value: 'vision', label: 'Computer Vision'},
        {value: 'nlp', label: 'NLP'}
    ];
    if (document.getElementById('uc-tags-select')) {
        new DelphiMultiSelect('uc-tags-select', tags, ['analytics']);
    }
});

// Initialize Multi-Selects for Engine Form
document.addEventListener('DOMContentLoaded', () => {
    // Engines Used In
    const usedInOptions = [
        {value: 'hc-clinical', label: 'Healthcare / Clinical Document Intelligence'},
        {value: 'mfg-engine-hall', label: 'Manufacturing Unit / Engine Hall'},
        {value: 'retail-ci', label: 'Retail / Customer Intelligence'},
        {value: 'finance-fraud', label: 'Finance / Fraud Detection'}
    ];
    if (document.getElementById('eng-used-in-select')) {
        new DelphiMultiSelect('eng-used-in-select', usedInOptions, ['hc-clinical', 'mfg-engine-hall']);
    }
});
