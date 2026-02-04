import { router } from './router/router.js';
import { renderSidebar } from './components/sidebar.js';
import { renderHeader } from './components/header.js';
import { renderDashboard } from './pages/dashboard.js';
import { renderNoteViewer } from './pages/note-viewer.js';
import { renderNotFound } from './pages/not-found.js';
import config from './data/config.js';

class App {
  constructor() {
    this.app = document.getElementById('app');
    this.config = config;
  }

  mount() {
    this.renderLayout();
    this.setupRoutes();
    router.start();
  }

  renderLayout() {
    this.app.innerHTML = `
      <div class="flex min-h-screen bg-gray-50 text-gray-900">
        <!-- Sidebar -->
        ${this.config.sidebar.show ? `
          <aside class="sidebar-container fixed left-0 top-0 h-full w-72 bg-white border-r border-gray-200 shadow-sm z-40 transition-all duration-300">
            ${renderSidebar(this.config)}
          </aside>
        ` : ''}

        <!-- Main Content -->
        <main class="flex-1 ${this.config.sidebar.show ? 'ml-72' : ''} flex flex-col">
          <!-- Header -->
          ${this.config.layout.header.show ? `
            <header class="header-container sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm">
              ${renderHeader(this.config)}
            </header>
          ` : ''}

          <!-- Page Content -->
          <div class="flex-1 overflow-auto">
            <div class="page-content min-h-full">
              <!-- Dynamic content will be injected here -->
            </div>
          </div>

          <!-- Footer -->
          ${this.config.layout.footer.show ? `
            <footer class="bg-white border-t border-gray-200 py-4 px-6 text-center text-sm text-gray-600">
              ${this.config.layout.footer.content}
            </footer>
          ` : ''}
        </main>
      </div>
    `;

    this.pageContent = this.app.querySelector('.page-content');
  }

  setupRoutes() {
    router.add('/', () => {
      renderDashboard(this.pageContent, this.config);
    });

    router.add('/:path(*)', (params) => {
      const path = params.path;

      if (path.endsWith('.md')) {
        renderNoteViewer(this.pageContent, path, this.config);
      } else if (path === '404') {
        renderNotFound(this.pageContent);
      } else {
        renderDashboard(this.pageContent, this.config);
      }
    });

    router.add('/404', () => {
      renderNotFound(this.pageContent);
    });
  }
}

const app = new App();
app.mount();