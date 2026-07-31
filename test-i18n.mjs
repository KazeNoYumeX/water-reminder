// Self-check for the i18n dictionary in index.html.  Run: node test-i18n.mjs
// Catches the three ways this setup breaks silently in the browser:
// a key used in the HTML that no locale defines, a key one locale forgot,
// and a {placeholder} that only one locale interpolates.
import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';

const html = readFileSync(new URL('./index.html', import.meta.url), 'utf8');

const start = html.indexOf('const I18N = {');
const end = html.indexOf('\n  };', start);
assert.ok(start > 0 && end > start, 'could not locate the I18N object in index.html');
const I18N = new Function(`return ${html.slice(start + 'const I18N = '.length, end + 4)}`)();

const locales = Object.keys(I18N);
assert.deepEqual(locales, ['zh-TW', 'en'], 'expected exactly the zh-TW and en locales');

// every locale defines the same keys
const [base, ...rest] = locales;
const baseKeys = Object.keys(I18N[base]).sort();
for (const loc of rest) {
  assert.deepEqual(Object.keys(I18N[loc]).sort(), baseKeys,
    `locale "${loc}" key set differs from "${base}"`);
}

// every key referenced from the markup exists
const used = [...html.matchAll(/data-i18n(?:-ph)?="([^"]+)"/g)].map((m) => m[1]);
assert.ok(used.length > 0, 'no data-i18n attributes found');
for (const key of used) {
  for (const loc of locales) {
    assert.ok(key in I18N[loc], `markup uses "${key}" but locale "${loc}" lacks it`);
  }
}

// {placeholders} match across locales, so no reminder renders a raw "{ml}"
const holders = (s) => [...s.matchAll(/\{(\w+)\}/g)].map((m) => m[1]).sort();
for (const key of baseKeys) {
  for (const loc of rest) {
    assert.deepEqual(holders(I18N[loc][key]), holders(I18N[base][key]),
      `placeholders differ for "${key}" between "${base}" and "${loc}"`);
  }
}

// the interpolation itself
const t = (lang, key, params) => {
  const s = I18N[lang][key] ?? key;
  return params ? s.replace(/\{(\w+)\}/g, (_, k) => params[k]) : s;
};
assert.equal(t('en', 'notifyBody', { ml: 307 }), 'Drink 307 ml now');
assert.equal(t('zh-TW', 'logRebuilt', { count: 3 }), '設定已變更，重建排程：剩 3 次');
assert.equal(t('en', 'btnStop'), 'Stop');

console.log(`ok — ${baseKeys.length} keys × ${locales.length} locales, ${used.length} markup references`);
