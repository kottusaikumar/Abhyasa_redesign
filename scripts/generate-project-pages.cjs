// Build the static project directory and detail sections from one canonical source.
// Run from the workspace root: node scripts/generate-project-pages.cjs
const fs = require('node:fs');
const path = require('node:path');
const projectCategories = require('../project-page.js');

const root = path.resolve(__dirname, '..');
const configs = [
  { key: 'physical-design', prefix: 'pd', label: 'Physical Design' },
  { key: 'design-verification', prefix: 'dv', label: 'Design Verification' }
];

// These descriptions define a concept, but do not describe a specific project task.
// An accurate overview excerpt needs editorial input; titles remain visible.
const excerptReview = {
  'physical-design': new Set(),
  'design-verification': new Set([7, 8, 9, 10])
};

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, character => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[character]);
}

function firstSentence(description) {
  const match = description.match(/^.*?[.!?](?=\s|$)/u);
  return match ? match[0] : '';
}

function renderCategory(config) {
  const category = projectCategories[config.key];
  if (!category || !Array.isArray(category.topics)) {
    throw new Error(`Missing project data for ${config.key}`);
  }
  const overviewId = `${config.prefix}-projects`;
  const idFor = index => `${config.prefix}-project-${String(index + 1).padStart(2, '0')}`;
  const numberFor = index => String(index + 1).padStart(2, '0');
  const count = category.topics.length;
  const directoryItems = category.topics.map(([title, description], index) => {
    const number = numberFor(index);
    const excerpt = excerptReview[config.key].has(index + 1) ? '' : firstSentence(description);
    if (!excerpt && !excerptReview[config.key].has(index + 1)) {
      throw new Error(`Missing first sentence: ${config.key} #${number}`);
    }
    return `        <li class="project-overview-item${excerpt ? '' : ' project-overview-item--no-excerpt'}">
          <a class="project-overview-link" href="#${idFor(index)}">
            <span class="project-overview-number" aria-hidden="true">${number}</span>
            <span class="project-overview-copy">
              <strong class="project-overview-title">${escapeHtml(title)}</strong>
${excerpt ? `              <span class="project-overview-excerpt">${escapeHtml(excerpt)}</span>\n` : ''}            </span>
            <span class="project-overview-arrow" aria-hidden="true">↓</span>
          </a>
        </li>`;
  }).join('\n');
  const detailSections = category.topics.map(([title, description], index) => {
    const id = idFor(index);
    const number = numberFor(index);
    return `      <article class="project-detail-section" id="${id}" tabindex="-1" aria-labelledby="${id}-title">
        <div class="project-detail-heading">
          <span class="project-detail-number" aria-hidden="true">${number}</span>
          <h3 id="${id}-title">${escapeHtml(title)}</h3>
        </div>
        <p class="project-detail-description">${escapeHtml(description)}</p>
        <a class="project-back-link" href="#${overviewId}"><span aria-hidden="true">↑</span> Back to Projects</a>
      </article>`;
  }).join('\n');

  return `<!-- BEGIN GENERATED PROJECT CONTENT -->
<section class="project-directory" id="${overviewId}" tabindex="-1" aria-labelledby="${overviewId}-title">
  <div class="project-section-heading">
    <div>
      <p class="project-section-eyebrow">Explore projects</p>
      <h2 id="${overviewId}-title">${escapeHtml(config.label)} Projects</h2>
    </div>
    <span class="project-count">${count} projects</span>
  </div>
  <p class="project-directory-intro">Choose a topic to jump to its full description, or scroll through every project below.</p>
  <nav aria-label="${escapeHtml(config.label)} project directory">
    <ol class="project-overview-list">
${directoryItems}
    </ol>
  </nav>
</section>
<section class="project-details" aria-labelledby="${config.prefix}-details-title">
  <div class="project-details-intro">
    <p class="project-section-eyebrow">The work behind each topic</p>
    <h2 id="${config.prefix}-details-title">Project Details</h2>
    <p>Explore the complete descriptions for all ${count} ${escapeHtml(config.label)} projects.</p>
  </div>
${detailSections}
</section>
<!-- END GENERATED PROJECT CONTENT -->
`;
}

for (const config of configs) {
  const file = path.join(root, 'projects', `${config.key}.html`);
  const source = fs.readFileSync(file, 'utf8');
  const generated = renderCategory(config);
  const existingGenerated = /<!-- BEGIN GENERATED PROJECT CONTENT -->[\s\S]*?<!-- END GENERATED PROJECT CONTENT -->\s*/;
  const oldTable = /<div class="project-table-wrap"[\s\S]*?(?=<nav class="project-category-links")/;
  const replacement = existingGenerated.test(source) ? existingGenerated : oldTable;
  if (!replacement.test(source)) {
    throw new Error(`Cannot locate project region in ${file}`);
  }
  const updated = source
    .replace(replacement, generated)
    .replace('<script src="/project-page.js" defer></script>', '');
  fs.writeFileSync(file, updated, 'utf8');
  console.log(`${config.key}: generated ${projectCategories[config.key].topics.length} overview links and detail sections`);
}
