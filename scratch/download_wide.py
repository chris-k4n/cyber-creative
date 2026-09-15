import urllib.request

candidates = [
    ('team_office_wide', 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&h=900&q=85'),
    ('collab_glass_office', 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&h=900&q=85'),
    ('agency_modern_space', 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&h=900&q=85')
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
