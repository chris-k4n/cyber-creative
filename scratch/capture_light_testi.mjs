import { spawn } from 'child_process';
import fs from 'fs';

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const edge = spawn(edgePath, [
  '--headless=new',
  '--remote-debugging-port=9445',
  '--disable-gpu',
  '--window-size=1920,1080',
  'http://localhost:5174/'
]);

await new Promise(r => setTimeout(r, 2000));
try {
  const targetsRes = await fetch('http://localhost:9445/json');
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

  await new Promise(r => setTimeout(r, 1500));

  // Dark mode
  await send('Runtime.evaluate', {
    expression: `
      document.documentElement.setAttribute('data-theme', 'dark');
      const el = document.querySelector('.testimonial-section');
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY;
        window.scrollTo(0, top - 120);
      }
    `
  });
  await new Promise(r => setTimeout(r, 1500));
  const darkRes = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('scratch/client_cards_dark.png', Buffer.from(darkRes.data, 'base64'));
  console.log('Saved scratch/client_cards_dark.png');

  // Light mode
  await send('Runtime.evaluate', {
    expression: `
      document.documentElement.setAttribute('data-theme', 'light');
      const el = document.querySelector('.testimonial-section');
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY;
        window.scrollTo(0, top - 120);
      }
    `
  });
  await new Promise(r => setTimeout(r, 1500));
  const lightRes = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('scratch/client_cards_light.png', Buffer.from(lightRes.data, 'base64'));
  console.log('Saved scratch/client_cards_light.png');
  ws.close();
} finally {
  edge.kill();
}
