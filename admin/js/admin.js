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
            <div class="multi-select-container" style="position: relative;">
                <div class="multi-select-input-wrapper input-field" id="${this.container.id}-wrapper" style="background: var(--input-bg, rgba(255,255,255,0.05)); border: 1px solid var(--input-border, rgba(255,255,255,0.1)); border-radius: var(--input-radius, 8px); min-height: 48px; padding: 6px 12px; display: flex; align-items: center; cursor: pointer; transition: border-color 0.3s ease;">
                    <div class="multi-select-chips" id="${this.container.id}-chips" style="display: flex; flex-wrap: wrap; gap: 6px; flex: 1;"></div>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 16px; height: 16px; color: var(--color-text-secondary, #aaa); margin-left: 12px; flex-shrink: 0;"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </div>
                <div class="multi-select-dropdown" id="${this.container.id}-dropdown" style="display: none; position: absolute; top: calc(100% + 4px); left: 0; right: 0; background: var(--surface-light, #2a2a2a); border: 1px solid var(--border-color, #444); border-radius: 8px; padding: 8px; z-index: 1000; box-shadow: 0 8px 24px rgba(0,0,0,0.2);">
                    <div style="position: sticky; top: -8px; background: var(--surface-light, #2a2a2a); padding: 8px 0; z-index: 2; margin-bottom: 8px; border-bottom: 1px solid var(--border-color, #444);">
                        <input type="text" class="multi-select-search input-field" id="${this.container.id}-search" placeholder="Filter..." style="width: 100%; min-height: 36px; height: 36px; padding: 0 12px; box-sizing: border-box;">
                    </div>
                    <div class="multi-select-options-list" style="max-height: 250px; overflow-y: auto; display: flex; flex-direction: column; gap: 2px;"></div>
                </div>
            </div>
        `;
        
        this.wrapper = this.container.querySelector('.multi-select-input-wrapper');
        this.chipsContainer = this.container.querySelector('.multi-select-chips');
        this.searchInput = this.container.querySelector('.multi-select-search');
        this.dropdown = this.container.querySelector('.multi-select-dropdown');
        this.optionsList = this.container.querySelector('.multi-select-options-list');
        
        this.updateChips();
        this.updateDropdown();
    }

    updateChips() {
        this.chipsContainer.innerHTML = '';
        if (this.selected.length === 0) {
            this.chipsContainer.innerHTML = '<span style="color: var(--color-text-muted, #888); font-size: 14px;">Select options...</span>';
            return;
        }
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
        this.optionsList.innerHTML = '';
        const filtered = this.options.filter(o => o.label.toLowerCase().includes(filterText.toLowerCase()));
        
        if (filtered.length === 0) {
            this.optionsList.innerHTML = '<div class="multi-option" style="cursor:default; color:var(--color-text-muted);">No options found.</div>';
            return;
        }

        filtered.forEach(opt => {
            const isSelected = this.selected.includes(opt.value);
            const el = document.createElement('div');
            el.className = `multi-option ${isSelected ? 'selected' : ''}`;
            el.innerHTML = `
                <input type="checkbox" ${isSelected ? 'checked' : ''} style="margin-right: 8px; pointer-events: none;">
                <span>${opt.label}</span>
            `;
            
            el.addEventListener('click', (e) => {
                e.stopPropagation();
                if (isSelected) {
                    this.selected = this.selected.filter(v => v !== opt.value);
                } else {
                    this.selected.push(opt.value);
                }
                this.updateChips();
                this.updateDropdown(this.searchInput.value);
                this.container.dispatchEvent(new CustomEvent('change', { detail: this.selected }));
            });
            this.optionsList.appendChild(el);
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
            this.isOpen = !this.isOpen;
            if (this.isOpen) {
                this.dropdown.style.display = 'block';
                this.searchInput.focus();
            } else {
                this.dropdown.style.display = 'none';
            }
        });

        this.dropdown.addEventListener('click', (e) => {
            e.stopPropagation();
        });

        this.searchInput.addEventListener('input', (e) => {
            this.updateDropdown(e.target.value);
        });

        document.addEventListener('click', (e) => {
            if (!this.container.contains(e.target)) {
                this.dropdown.style.display = 'none';
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
