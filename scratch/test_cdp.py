import subprocess
import os
import time
import json
import urllib.request
import base64

edge_path = r'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'

# Launch edge with remote debugging
proc = subprocess.Popen([
    edge_path,
    '--headless=new',
    '--remote-debugging-port=9333',
    '--disable-gpu',
    '--window-size=1920,1080',
    'http://localhost:5174/'
])

time.sleep(2)

try:
    # Get websocket debugger URL
    resp = urllib.request.urlopen('http://localhost:9333/json').read()
    targets = json.loads(resp)
    ws_url = targets[0]['webSocketDebuggerUrl']
    print('WebSocket URL:', ws_url)
    
    # We can connect using python websocket or a simple node script
except Exception as e:
    print('Error connecting:', e)
finally:
    proc.terminate()
