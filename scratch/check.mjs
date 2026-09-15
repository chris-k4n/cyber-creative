import fs from 'fs';
const code = fs.readFileSync('scratch/miw-slider.js', 'utf8');
const m = code.match(/https?:\/\/[^\s"'()<>]+/g) || [];
console.log('URLs:', Array.from(new Set(m)));

const dataAttrs = code.match(/data-[a-z0-9-]+/g) || [];
console.log('Data attrs:', Array.from(new Set(dataAttrs)));
