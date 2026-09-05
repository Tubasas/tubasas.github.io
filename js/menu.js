/**
 * Tubasas Website - Sticky Hamburger Menu & Side Drawer Controller
 */

document.addEventListener('DOMContentLoaded', () => {
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const sideMenu = document.getElementById('sideMenu');
    const closeMenuBtn = document.getElementById('closeMenuBtn');
    const sideMenuBackdrop = document.getElementById('sideMenuBackdrop');
    const menuClock = document.getElementById('menuClock');

    // Open Menu
    function openMenu() {
        if (!sideMenu) return;
        sideMenu.classList.add('is-open');
        document.body.classList.add('menu-open');
        hamburgerBtn?.setAttribute('aria-expanded', 'true');
        sideMenu.setAttribute('aria-hidden', 'false');

        // Focus close button for accessibility
        closeMenuBtn?.focus();
    }

    // Close Menu
    function closeMenu() {
        if (!sideMenu) return;
        sideMenu.classList.remove('is-open');
        document.body.classList.remove('menu-open');
        hamburgerBtn?.setAttribute('aria-expanded', 'false');
        sideMenu.setAttribute('aria-hidden', 'true');

        // Return focus to hamburger button
        hamburgerBtn?.focus();
    }

    // Toggle Menu
    function toggleMenu() {
        if (sideMenu?.classList.contains('is-open')) {
            closeMenu();
        } else {
            openMenu();
        }
    }

    // Event Listeners
    hamburgerBtn?.addEventListener('click', toggleMenu);
    closeMenuBtn?.addEventListener('click', closeMenu);
    sideMenuBackdrop?.addEventListener('click', closeMenu);

    // Close on Escape key
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && sideMenu?.classList.contains('is-open')) {
            closeMenu();
        }
    });

    // Close when an in-page navigation link is clicked
    const menuLinks = sideMenu?.querySelectorAll('a[href^="#"]');
    menuLinks?.forEach((link) => {
        link.addEventListener('click', () => {
            closeMenu();
        });
    });

    // Philippine Standard Time (UTC+08 / PHT) Live Clock
    function updateClock() {
        if (!menuClock) return;
        try {
            const now = new Date();
            const formatter = new Intl.DateTimeFormat('en-GB', {
                timeZone: 'Asia/Manila',
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
            });
            menuClock.textContent = formatter.format(now);
        } catch {
            const now = new Date();
            const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
            const pht = new Date(utc + (3600000 * 8));
            const hours = String(pht.getHours()).padStart(2, '0');
            const minutes = String(pht.getMinutes()).padStart(2, '0');
            menuClock.textContent = `${hours}:${minutes}`;
        }
    }

    // Initialize clock and update every second
    updateClock();
    setInterval(updateClock, 1000);
});
