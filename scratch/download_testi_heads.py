import urllib.request
import os

candidates = [
    ('james_glasses', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&h=300&q=85'),
    ('victoria_madison', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&h=300&q=85'),
    ('daniel_bearded', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&h=300&q=85'),
    ('victoria_morris', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&h=300&q=85'),
    ('young_woman_smile', 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&h=300&q=85'),
    ('young_man_glasses', 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&h=300&q=85')
]

headers = {'User-Agent': 'Mozilla/5.0'}

for name, url in candidates:
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=10) as resp:
            data = resp.read()
            with open(f'scratch/{name}.jpg', 'wb') as f:
                f.write(data)
            print(f'OK {name}')
    except Exception as e:
        print(f'FAIL {name}: {e}')
