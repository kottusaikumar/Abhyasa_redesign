// Verify generated static pages against the approved 27-item source inventory.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const projects = require('../project-page.js');

const expectedHash = '0431121787071faa0ebc3361756810f89cf219299fd23e960eb3c27cf49e1e6a';
const keys = ['physical-design', 'design-verification'];
const sourceHash = crypto.createHash('sha256')
  .update(JSON.stringify(Object.fromEntries(keys.map(key => [key, projects[key].topics]))))
  .digest('hex');
if (sourceHash !== expectedHash) {
  throw new Error(`Canonical title/description checksum changed: ${sourceHash}`);
}

function decode(text) {
  return text.replace(/&(?:amp|lt|gt|quot|#39);/g, entity => ({
    '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&#39;': "'"
  })[entity]);
}

for (const [key, prefix] of [['physical-design', 'pd'], ['design-verification', 'dv']]) {
  const html = fs.readFileSync(path.join(__dirname, '..', 'projects', `${key}.html`), 'utf8');
  const topics = projects[key].topics;
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
  if (new Set(ids).size !== ids.length) throw new Error(`${key}: duplicate IDs`);
  if (html.includes('project-table-wrap') || html.includes('<details') || html.includes('/project-page.js')) {
    throw new Error(`${key}: obsolete table, disclosure, or runtime renderer remains`);
  }
  if (!html.includes(`id="${prefix}-projects"`)) throw new Error(`${key}: overview target missing`);
  const overview = [...html.matchAll(/<li class="project-overview-item(?: project-overview-item--no-excerpt)?">([\s\S]*?)<\/li>/g)];
  const details = [...html.matchAll(/<article class="project-detail-section"([^>]*)>([\s\S]*?)<\/article>/g)];
  if (overview.length !== topics.length || details.length !== topics.length) {
    throw new Error(`${key}: expected ${topics.length} overview items and detail sections; got ${overview.length}/${details.length}`);
  }
  topics.forEach(([title, description], index) => {
    const number = String(index + 1).padStart(2, '0');
    const id = `${prefix}-project-${number}`;
    const overviewHtml = overview[index][1];
    const [attributes, articleHtml] = details[index].slice(1);
    const overviewTitle = overviewHtml.match(/<strong class="project-overview-title">([\s\S]*?)<\/strong>/)?.[1];
    const overviewExcerpt = overviewHtml.match(/<span class="project-overview-excerpt">([\s\S]*?)<\/span>/)?.[1] || '';
    const detailTitle = articleHtml.match(/<h3[^>]*>([\s\S]*?)<\/h3>/)?.[1];
    const detailText = articleHtml.match(/<p class="project-detail-description">([\s\S]*?)<\/p>/)?.[1];
    const needsReview = key === 'design-verification' && index >= 6;
    const expectedExcerpt = needsReview ? '' : (description.match(/^.*?[.!?](?=\s|$)/u)?.[0] || '');
    if (!overviewHtml.includes(`href="#${id}"`) || !attributes.includes(`id="${id}"`)) {
      throw new Error(`${key} #${number}: anchor mismatch`);
    }
    if (decode(overviewTitle || '') !== title || decode(detailTitle || '') !== title) {
      throw new Error(`${key} #${number}: title mismatch`);
    }
    if (decode(detailText || '') !== description) {
      throw new Error(`${key} #${number}: description mismatch`);
    }
    if (decode(overviewExcerpt) !== expectedExcerpt) {
      throw new Error(`${key} #${number}: excerpt mismatch`);
    }
    if (!articleHtml.includes(`href="#${prefix}-projects"`)) {
      throw new Error(`${key} #${number}: Back to Projects target missing`);
    }
  });
  console.log(`${key}: ${topics.length} exact titles/descriptions, unique IDs, overview links, and back links passed`);
}
console.log(`Canonical content SHA-256: ${sourceHash}`);
