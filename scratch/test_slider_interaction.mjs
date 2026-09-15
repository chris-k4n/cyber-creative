import { spawn } from 'child_process';
import fs from 'fs';

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

const edge = spawn(edgePath, [
  '--headless=new',
  '--remote-debugging-port=9446',
  '--window-size=1920,1080',
  'http://localhost:5173/portfolio'
]);

await new Promise(r => setTimeout(r, 2500));

try {
  const targetsRes = await fetch('http://localhost:9446/json');
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

  // Wait for React to render and WebGL slider to init
  await new Promise(r => setTimeout(r, 2500));

  // Scroll to slider
  await send('Runtime.evaluate', {
    expression: `(() => {
      const el = document.querySelector('.webgl_slider_wrap');
      if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
    })()`
  });

  await new Promise(r => setTimeout(r, 1200));

  // Take screenshot 1: resting position of 3D slider
  const snap1 = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('scratch/slider_resting.png', Buffer.from(snap1.data, 'base64'));

  // Simulate mouse drag across slider to bend ribbon
  const boxRes = await send('Runtime.evaluate', {
    expression: `(() => {
      const el = document.querySelector('.webgl_canvas');
      const r = el.getBoundingClientRect();
      return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
    })()`,
    returnByValue: true
  });
  const pt = boxRes.result.value;

  // Dispatch mouse drag
  await send('Input.dispatchMouseEvent', { type: 'mousePressed', x: pt.x, y: pt.y, button: 'left', clickCount: 1 });
  for (let i = 0; i <= 20; i++) {
    await send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: pt.x - (i * 25), y: pt.y });
    await new Promise(r => setTimeout(r, 16));
  }
  await send('Input.dispatchMouseEvent', { type: 'mouseReleased', x: pt.x - 500, y: pt.y, button: 'left', clickCount: 1 });

  // Wait for inertia animation
  await new Promise(r => setTimeout(r, 1000));

  // Take screenshot 2: dragged position
  const snap2 = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('scratch/slider_dragged.png', Buffer.from(snap2.data, 'base64'));
  console.log('Saved slider_resting.png and slider_dragged.png');

  ws.close();
} finally {
  edge.kill();
}
