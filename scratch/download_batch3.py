import urllib.request

candidates = [
    ('cyber_circuit', 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&h=800&q=85'),
    ('neon_keyboard', 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=800&h=800&q=85'),
    ('agency_wall_screen', 'https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=1200&h=900&q=85'),
    ('dark_code', 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=800&h=800&q=85'),
    ('cyber_dev_night', 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?auto=format&fit=crop&w=800&h=800&q=85'),
    ('cyber_security', 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&h=900&q=85'),
    ('team_brainstorm_sticky', 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&h=900&q=85')
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
