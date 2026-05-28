(function () {
    const toggle = document.getElementById('theme-toggle');
    const icon = document.getElementById('theme-icon');
    const storageKey = 'theme';

    function setTheme(theme) {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
            if (icon) icon.innerHTML = '<i class="fa-solid fa-circle"></i>';
            if (toggle) toggle.setAttribute('aria-pressed', 'true');
        } else {
            document.documentElement.classList.remove('dark');
            if (icon) icon.innerHTML = '<i class="fa-solid fa-circle-half-stroke"></i>';
            if (toggle) toggle.setAttribute('aria-pressed', 'false');
        }
    }

    // Initialize from localStorage or system preference
    const saved = localStorage.getItem(storageKey);
    if (saved === 'dark' || saved === 'light') {
        setTheme(saved);
    } else {
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        setTheme(prefersDark ? 'dark' : 'light');
    }

    if (toggle) {
        toggle.addEventListener('click', function () {
            const isDark = document.documentElement.classList.contains('dark');
            const next = isDark ? 'light' : 'dark';
            setTheme(next);
            try { localStorage.setItem(storageKey, next); } catch (e) {}
        });
    }
})();
