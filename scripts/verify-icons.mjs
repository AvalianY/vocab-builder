import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const spriteUrl = new URL('../src/assets/icons/icons.svg', import.meta.url);
const iconComponentUrl = new URL(
  '../src/components/Icon/Icon.jsx',
  import.meta.url,
);
const [sprite, iconComponent] = await Promise.all([
  readFile(spriteUrl, 'utf8'),
  readFile(iconComponentUrl, 'utf8'),
]);

const expectedSymbolIds = [
  'icon-arrow-right',
  'icon-chevron-down',
  'icon-close',
  'icon-edit',
  'icon-eye',
  'icon-eye-off',
  'icon-flag-gb',
  'icon-flag-ua',
  'icon-menu',
  'icon-pagination-first',
  'icon-pagination-prev',
  'icon-pagination-next',
  'icon-pagination-last',
  'icon-plus',
  'icon-radio-checked',
  'icon-radio-unchecked',
  'icon-search',
  'icon-trash',
  'icon-user',
];

const symbolIds = [...sprite.matchAll(/<symbol\s+id="([^"]+)"/g)].map(
  ([, id]) => id,
);
const allIds = [...sprite.matchAll(/\sid="([^"]+)"/g)].map(([, id]) => id);
const referencedIds = [...sprite.matchAll(/url\(#([^)]+)\)/g)].map(
  ([, id]) => id,
);

assert.deepEqual(symbolIds, expectedSymbolIds, 'Unexpected sprite symbols');
assert.equal(new Set(allIds).size, allIds.length, 'Duplicate SVG ids found');

for (const referencedId of referencedIds) {
  assert.ok(allIds.includes(referencedId), `Missing SVG id: ${referencedId}`);
}

for (const symbolId of expectedSymbolIds) {
  const iconName = symbolId.replace('icon-', '');
  const metadataKey = new RegExp(`(?:'${iconName}'|\\b${iconName})\\s*:`);

  assert.match(iconComponent, metadataKey, `Missing Icon mapping: ${iconName}`);
}

assert.match(iconComponent, /icons\.svg\?url/, 'Icon must load the sprite URL');
assert.match(
  iconComponent,
  /#icon-\$\{name\}/,
  'Icon must reference a semantic symbol id',
);
assert.doesNotMatch(
  iconComponent,
  /<path\b/,
  'Icon must not duplicate SVG geometry',
);

console.log(
  `Verified ${symbolIds.length} sprite symbols and Icon mappings.`,
);
