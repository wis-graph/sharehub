import { fetchMOC } from '../services/github.js';
import { renderMarkdown } from '../services/renderer.js';

export async function renderDashboard(container, config) {
  container.innerHTML = `
    <div class="note-content mx-auto px-6 py-8">
      <div class="loading text-center py-12">
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
        <p class="mt-4 text-gray-600">Loading dashboard...</p>
      </div>
    </div>
  `;

  try {
    const homeMocPath = config.github.homeMoc;
    const mocContent = await fetchMOC(homeMocPath, config.github);

    if (!mocContent) {
      container.innerHTML = `
        <div class="note-content mx-auto px-6 py-8">
          <div class="text-center py-12">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-16 h-16 mx-auto text-gray-400 mb-4" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
            <h2 class="text-xl font-semibold text-gray-900 mb-2">Home MOC not found</h2>
            <p class="text-gray-600">The home MOC file (${homeMocPath}) does not exist.</p>
          </div>
        </div>
      `;
      return;
    }

    container.innerHTML = `
      <div class="note-content mx-auto px-6 py-8">
        <div class="markdown prose prose-slate max-w-none">
          ${await renderMarkdown(mocContent, config.github)}
        </div>
      </div>
    `;
  } catch (error) {
    console.error('Error loading dashboard:', error);
    container.innerHTML = `
      <div class="note-content mx-auto px-6 py-8">
        <div class="text-center py-12">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-16 h-16 mx-auto text-red-500 mb-4" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
          <h2 class="text-xl font-semibold text-gray-900 mb-2">Error loading dashboard</h2>
          <p class="text-gray-600">${error.message}</p>
        </div>
      </div>
    `;
  }
}