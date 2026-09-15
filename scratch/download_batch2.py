import urllib.request
import os

candidates = [
    ('code_screen', 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&h=800&q=85'),
    ('laptop_dark', 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&h=800&q=85'),
    ('team_discussion', 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&h=800&q=85'),
    ('dev_multimonitor', 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&h=800&q=85'),
    ('agency_collab', 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&h=900&q=85'),
    ('team_meeting_candid', 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&h=900&q=85'),
    ('studio_loft', 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&h=900&q=85')
]

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

for name, url in candidates:
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=10) as resp:
            data = resp.read()
            out_path = f'scratch/{name}.jpg'
            with open(out_path, 'wb') as f:
                f.write(data)
            print(f'OK {name}: {len(data)} bytes')
    except Exception as e:
        print(f'FAIL {name}: {e}')
