import { spawn } from 'child_process';
import fs from 'fs';

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

const edge = spawn(edgePath, [
  '--headless=new',
  '--remote-debugging-port=9447',
  '--window-size=1920,1080',
  'http://localhost:5173/portfolio'
]);

await new Promise(r => setTimeout(r, 2500));

try {
  const targetsRes = await fetch('http://localhost:9447/json');
  const targets = await targetsRes.json();
  const page = targets.find(t => t.type === 'page') || targets[0];
  const ws = new WebSocket(page.webSocketDebuggerUrl);

  await new Promise((resolve, reject) => {
    ws.onopen = resolve;
    ws.onerror = reject;
  });

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

  await send('Runtime.enable');
  await send('Page.enable');

  await new Promise(r => setTimeout(r, 2500));

  // Scroll to slider
  await send('Runtime.evaluate', {
    expression: `(() => {
      const el = document.querySelector('.webgl_slider_wrap');
      if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
    })()`
  });

  await new Promise(r => setTimeout(r, 1000));

  // Click on the center card
  await send('Runtime.evaluate', {
    expression: `(() => {
      const items = document.querySelectorAll('[data-webgl-item]');
      if (items.length > 2) {
        items[2].click();
      }
    })()`
  });

  // Wait for 3D card opening animation
  await new Promise(r => setTimeout(r, 1200));

  // Capture opened card state
  const snap = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('scratch/slider_card_opened.png', Buffer.from(snap.data, 'base64'));
  console.log('Saved scratch/slider_card_opened.png');

  ws.close();
} finally {
  edge.kill();
}
