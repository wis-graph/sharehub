export function renderSidebar(config) {
  const sidebarConfig = config.sidebar;

  return `
    <div class="flex flex-col h-full">
      <!-- Logo/Title -->
      <div class="sidebar-header flex items-center px-6 py-4 border-b border-gray-200">
        ${sidebarConfig.logo
          ? `<img src="${sidebarConfig.logo}" alt="${sidebarConfig.title}" class="w-8 h-8 rounded">`
          : `<div class="w-8 h-8 bg-primary-500 rounded flex items-center justify-center text-white font-bold text-lg">${sidebarConfig.title[0]}</div>`
        }
        <h1 class="ml-3 text-lg font-semibold text-gray-900">${sidebarConfig.title}</h1>
      </div>

      <!-- Navigation -->
      <nav class="flex-1 overflow-y-auto p-4 space-y-2">
        ${sidebarConfig.navigation.map(item => {
          if (item.type === 'divider') {
            return `
              <div class="mt-6 mb-2">
                <h3 class="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">${item.label}</h3>
              </div>
              ${item.items.map(subItem => renderNavItem(subItem)).join('')}
            `;
          }
          return renderNavItem(item);
        }).join('')}
      </nav>

      <!-- Footer Info -->
      <div class="p-4 border-t border-gray-200">
        <div class="text-xs text-gray-500 space-y-1">
          <div>Owner: ${config.github.owner}</div>
          <div>Repo: ${config.github.repo}</div>
        </div>
      </div>
    </div>
  `;
}

function renderNavItem(item) {
  const isActive = window.location.hash === item.path || (item.active && window.location.hash === '#/');

  return `
    <a
      href="${item.path}"
      class="nav-item flex items-center px-3 py-2 rounded-md transition-all duration-200 ${
        isActive
          ? 'bg-blue-50 text-blue-600'
          : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
      }"
    >
      ${item.icon ? `<span class="w-5 h-5 mr-3">${getIcon(item.icon)}</span>` : ''}
      <span class="font-medium">${item.label}</span>
    </a>
  `;
}

function getIcon(iconName) {
  const icons = {
    home: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
    folder: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>',
    info: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>'
  };

  return icons[iconName] || '';
}