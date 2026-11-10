(function () {
    const key = 'portfolio-theme';
    const root = document.documentElement;
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    let saved = null;

    try {
        saved = localStorage.getItem(key);
    } catch (error) {
        // The toggle still works if storage is unavailable.
    }

    function preferredTheme() {
        return saved === 'light' || saved === 'dark'
            ? saved
            : (media.matches ? 'dark' : 'light');
    }

    function applyTheme(theme) {
        root.dataset.theme = theme;
        root.style.colorScheme = theme;
        const toggle = document.querySelector('.theme-toggle');
        if (toggle) {
            const next = theme === 'dark' ? 'light' : 'dark';
            toggle.setAttribute('aria-label', `Switch to ${next} mode`);
            toggle.setAttribute('aria-pressed', String(theme === 'light'));
            toggle.querySelector('.theme-label').textContent = `${next[0].toUpperCase()}${next.slice(1)} mode`;
            toggle.querySelector('.theme-icon').textContent = theme === 'dark' ? '☀' : '☾';
        }
    }

    applyTheme(preferredTheme());

    document.addEventListener('DOMContentLoaded', function () {
        applyTheme(preferredTheme());
        document.querySelector('.theme-toggle')?.addEventListener('click', function () {
            const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
            saved = next;
            try { localStorage.setItem(key, next); } catch (error) { /* Storage may be blocked. */ }
            applyTheme(next);
        });
    });

    media.addEventListener?.('change', function () {
        if (saved !== 'light' && saved !== 'dark') applyTheme(preferredTheme());
    });
})();
