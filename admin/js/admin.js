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

