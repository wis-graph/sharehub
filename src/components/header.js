export function renderHeader(config) {
  const headerConfig = config.layout.header;

  return `
    <div class="flex items-center justify-between px-6 h-16">
      <!-- Left: Title/Logo -->
      <div class="flex items-center">
        <h1 class="text-xl font-semibold text-gray-900">
          ${headerConfig.title ? 'ShareHub' : ''}
        </h1>
      </div>

      <!-- Right: Search & Theme Toggle -->
      <div class="flex items-center space-x-4">
        ${headerConfig.search ? `
          <div class="relative">
            <input
              type="text"
              placeholder="Search..."
              class="w-64 px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <svg xmlns="http://www.w3.org/2000/svg" class="absolute right-3 top-2.5 h-4 w-4 text-gray-400" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          </div>
        ` : ''}

        ${headerConfig.themeToggle ? `
          <button
            id="theme-toggle"
            class="p-2 rounded-md hover:bg-gray-100 transition-colors"
            title="Toggle theme"
          >
            <svg id="sun-icon" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 hidden" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
            <svg id="moon-icon" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
          </button>
        ` : ''}
      </div>
    </div>
  `;

  // Initialize theme toggle after rendering
  setTimeout(() => {
    const toggleBtn = document.getElementById('theme-toggle');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', toggleTheme);
    }
  }, 0);
}

function toggleTheme() {
  const html = document.documentElement;
  const isDark = html.classList.toggle('dark');
  const sunIcon = document.getElementById('sun-icon');
  const moonIcon = document.getElementById('moon-icon');

  if (isDark) {
    sunIcon.classList.remove('hidden');
    moonIcon.classList.add('hidden');
  } else {
    sunIcon.classList.add('hidden');
    moonIcon.classList.remove('hidden');
  }

  localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// Load saved theme on page load
(function() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.documentElement.classList.add('dark');
  }
})();