import urllib.request

candidates = [
    ('tech_neon_space', 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&h=900&q=85'),
    ('cyber_network_globe', 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&h=900&q=85'),
    ('devs_coding_night', 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=1200&h=900&q=85')
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
