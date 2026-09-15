import urllib.request
import os

os.makedirs('scratch', exist_ok=True)

candidates = [
    ('desk_cyber', 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&h=600&q=85'),
    ('team_ui_board', 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=600&h=600&q=85'),
    ('hands_coding', 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&h=600&q=85'),
    ('designer_wireframe', 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=600&h=600&q=85'),
    ('team_collab_large', 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&h=900&q=85'),
    ('team_working_laptops', 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&h=900&q=85'),
    ('tech_studio_candid', 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&h=900&q=85'),
    ('workstation_screens', 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&h=600&q=85')
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
            print(f'OK {name}: {len(data)} bytes -> {out_path}')
    except Exception as e:
        print(f'FAIL {name}: {e}')
