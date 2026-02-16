// app/theme-script.tsx
// Bu script HTML head ichiga qo'yiladi va theme flashni oldini oladi

export function ThemeScript() {
    const themeScript = `
        (function() {
            try {
                // localStorage dan theme ni olish
                const theme = localStorage.getItem('theme');
                const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                
                // Agar theme yo'q bo'lsa, light theme default
                const currentTheme = theme || 'light';
                
                // Darhol class qo'shish (flash bo'lmaslik uchun)
                if (currentTheme === 'dark') {
                    document.documentElement.classList.add('dark');
                } else {
                    document.documentElement.classList.remove('dark');
                }
                
                // Color scheme ni ham o'rnatish
                document.documentElement.style.colorScheme = currentTheme;
            } catch (e) {
                console.error('Theme initialization error:', e);
            }
        })();
    `;

    return (
        <script
            dangerouslySetInnerHTML={{ __html: themeScript }}
            suppressHydrationWarning
        />
    );
}