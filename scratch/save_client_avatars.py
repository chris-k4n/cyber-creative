import os
from PIL import Image, ImageOps

os.makedirs('public/assets/img/testi', exist_ok=True)

images = [
    ('public/assets/img/testi/testi-author-5.png', 'scratch/james_glasses.jpg'),     # James Hallagher
    ('public/assets/img/testi/testi-author-6.png', 'public/assets/img/testi/testi-author-6.png'), # Amelia Harper (original)
    ('public/assets/img/testi/testi-author-2.png', 'scratch/victoria_madison.jpg'),  # Victoria Madison
    ('public/assets/img/testi/testi-author-1.png', 'scratch/testi_1.jpg'),           # Daniel Joseph
    ('public/assets/img/testi/testi-author-3.png', 'scratch/young_woman_smile.jpg'), # Victoria Morris
]

for dest, src in images:
    im = Image.open(src).convert('RGB')
    w, h = im.size
    size = min(w, h)
    left = (w - size) // 2
    top = (h - size) // 2
    cropped = im.crop((left, top, left + size, top + size)).resize((300, 300), Image.Resampling.LANCZOS)
    cropped.save(dest, 'PNG')
    print(f'Saved {dest}')
