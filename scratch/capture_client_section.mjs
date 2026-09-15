import { spawn } from 'child_process';
import fs from 'fs';

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

const edge = spawn(edgePath, [
  '--headless=new',
  '--remote-debugging-port=9444',
  '--disable-gpu',
  '--window-size=1920,1080',
  'http://localhost:5174/'
]);

await new Promise(r => setTimeout(r, 2000));

try {
  const targetsRes = await fetch('http://localhost:9444/json');
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

  // Wait for React to render and fonts/images to settle
  await new Promise(r => setTimeout(r, 1500));

  // Scroll to testimonial section
  await send('Runtime.evaluate', {
    expression: `
      const el = document.querySelector('.testimonial-section') || document.querySelector('.client-slider-wrapper');
      if (el) {
        el.scrollIntoView({ block: 'center' });
      }
    `
  });

  await new Promise(r => setTimeout(r, 1000));

  // Capture screenshot
  const result = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('scratch/client_cards_rendered.png', Buffer.from(result.data, 'base64'));
  console.log('Screenshot saved to scratch/client_cards_rendered.png');

  ws.close();
} finally {
  edge.kill();
}
