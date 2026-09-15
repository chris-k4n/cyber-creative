import { spawn } from 'child_process';

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

const edge = spawn(edgePath, [
  '--headless=new',
  '--remote-debugging-port=9448',
  '--window-size=1920,1080',
  'http://localhost:5173/'
]);

await new Promise(r => setTimeout(r, 2000));

try {
  const targetsRes = await fetch('http://localhost:9448/json');
  const targets = await targetsRes.json();
  const page = targets.find(t => t.type === 'page') || targets[0];
  const ws = new WebSocket(page.webSocketDebuggerUrl);

  await new Promise((resolve, reject) => {
    ws.onopen = resolve;
    ws.onerror = reject;
  });

  let id = 1;
  const errors = [];
  ws.addEventListener('message', (event) => {
    const data = JSON.parse(event.data);
    if (data.method === 'Runtime.exceptionThrown') {
      errors.push(data.params.exceptionDetails);
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

  const routes = ['/', '/about', '/services', '/clients', '/careers', '/portfolio'];
  for (const r of routes) {
    await send('Page.navigate', { url: `http://localhost:5173${r}` });
    await new Promise(res => setTimeout(res, 1500));
    console.log(`Navigated to ${r} - Errors so far: ${errors.length}`);
  }

  if (errors.length > 0) {
    console.error('Errors encountered:', errors);
  } else {
    console.log('ALL ROUTES LOADED PERFECTLY WITH ZERO ERRORS!');
  }

  ws.close();
} finally {
  edge.kill();
}
