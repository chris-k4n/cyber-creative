import { spawn } from 'child_process';
import fs from 'fs';

const edge = spawn('C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe', [
  '--headless=new',
  '--remote-debugging-port=9447',
  '--disable-gpu',
  '--window-size=1920,1080',
  'http://localhost:5174/'
]);

await new Promise(r => setTimeout(r, 2000));
try {
  const targetsRes = await fetch('http://localhost:9447/json');
  const targets = await targetsRes.json();
  const page = targets.find(t => t.type === 'page') || targets[0];
  const ws = new WebSocket(page.webSocketDebuggerUrl);
  await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });

  let id = 1;
  function send(method, params = {}) {
    return new Promise((resolve) => {
      const msgId = id++;
      const handler = (event) => {
        const data = JSON.parse(event.data);
        if (data.id === msgId) {
          ws.removeEventListener('message', handler);
          resolve(data.result);
        }
      };
      ws.addEventListener('message', handler);
      ws.send(JSON.stringify({ id: msgId, method, params }));
    });
  }

  await new Promise(r => setTimeout(r, 1000));
  const t1 = await send('Runtime.evaluate', { expression: 'document.documentElement.getAttribute("data-theme")' });
  console.log('Initial theme:', t1.result.value);

  await send('Runtime.evaluate', { expression: 'document.getElementById("theme-toogle").click()' });
  await new Promise(r => setTimeout(r, 800));
  const themeAttr = await send('Runtime.evaluate', { expression: 'document.documentElement.getAttribute("data-theme")' });
  const secBg = await send('Runtime.evaluate', { expression: 'window.getComputedStyle(document.querySelector(".testimonial-section")).backgroundColor' });
  const runBg = await send('Runtime.evaluate', { expression: 'window.getComputedStyle(document.querySelector(".running-text.testi")).backgroundColor' });
  const bodyBg = await send('Runtime.evaluate', { expression: 'window.getComputedStyle(document.body).backgroundColor' });
  console.log('Toggled theme:', themeAttr.result.value);
  console.log('Section bg:', secBg.result.value);
  console.log('Running-text bg:', runBg.result.value);
  console.log('Body bg:', bodyBg.result.value);

  await send('Runtime.evaluate', {
    expression: `
      const el = document.querySelector('.testimonial-section');
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY;
        window.scrollTo(0, top - 120);
      }
    `
  });
  await new Promise(r => setTimeout(r, 1200));
  const lightRes = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('scratch/client_cards_light_fixed.png', Buffer.from(lightRes.data, 'base64'));
  console.log('Saved scratch/client_cards_light_fixed.png');

  ws.close();
} finally {
  edge.kill();
}
