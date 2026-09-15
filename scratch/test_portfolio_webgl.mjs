import { spawn } from 'child_process';
import fs from 'fs';

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

const edge = spawn(edgePath, [
  '--headless=new',
  '--remote-debugging-port=9445',
  '--window-size=1920,1080',
  'http://localhost:5173/portfolio'
]);

await new Promise(r => setTimeout(r, 2500));

try {
  const targetsRes = await fetch('http://localhost:9445/json');
  const targets = await targetsRes.json();
  const page = targets.find(t => t.type === 'page') || targets[0];
  const ws = new WebSocket(page.webSocketDebuggerUrl);

  await new Promise((resolve, reject) => {
    ws.onopen = resolve;
    ws.onerror = reject;
  });

  let id = 1;
  const consoleLogs = [];
  ws.addEventListener('message', (event) => {
    const data = JSON.parse(event.data);
    if (data.method === 'Runtime.consoleAPICalled') {
      consoleLogs.push(data.params.type + ': ' + data.params.args.map(a => a.value || JSON.stringify(a)).join(' '));
    }
    if (data.method === 'Runtime.exceptionThrown') {
      consoleLogs.push('EXCEPTION: ' + JSON.stringify(data.params.exceptionDetails));
    }
  });

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

  // Wait for React to render and WebGL slider to init and textures to load
  await new Promise(r => setTimeout(r, 3000));

  // Check DOM for WebGL canvas and attributes
  const domCheck = await send('Runtime.evaluate', {
    expression: `(() => {
      const canvasWrap = document.querySelector('.webgl_slider_wrap');
      const canvasEl = document.querySelector('.webgl_canvas');
      const glCanvas = canvasEl ? canvasEl.querySelector('canvas') : null;
      const readyAttr = canvasEl ? canvasEl.hasAttribute('data-mw-ready') : false;
      const items = canvasEl ? canvasEl.querySelectorAll('[data-webgl-item]').length : 0;
      return {
        hasWrap: !!canvasWrap,
        hasCanvasEl: !!canvasEl,
        hasGlCanvas: !!glCanvas,
        readyAttr,
        itemCount: items,
        glWidth: glCanvas ? glCanvas.width : 0,
        glHeight: glCanvas ? glCanvas.height : 0
      };
    })()`,
    returnByValue: true
  });

  console.log('DOM & WebGL Check Result:', domCheck.result ? domCheck.result.value : domCheck);
  console.log('Console Logs:', consoleLogs);

  // Capture screenshot
  const result = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('scratch/portfolio_webgl_live.png', Buffer.from(result.data, 'base64'));
  console.log('Screenshot saved to scratch/portfolio_webgl_live.png');

  ws.close();
} finally {
  edge.kill();
}
