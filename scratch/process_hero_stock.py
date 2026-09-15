import os
from PIL import Image, ImageEnhance, ImageOps

os.makedirs('scratch/out', exist_ok=True)

def apply_cyber_grade(img, tint_color=(20, 35, 80), alpha=0.22, contrast=1.1, brightness=0.95):
    img = img.convert('RGBA')
    enhancer = ImageEnhance.Contrast(img)
    img = enhancer.enhance(contrast)
    bright = ImageEnhance.Brightness(img)
    img = bright.enhance(brightness)
    
    # Create subtle blue/cyber overlay
    overlay = Image.new('RGBA', img.size, tint_color + (int(255 * alpha),))
    tinted = Image.alpha_composite(img, overlay)
    return tinted

# 1. hero-img-1: cyber_dev_night (dark glowing code)
img1 = Image.open('scratch/cyber_dev_night.jpg').convert('RGB')
# Crop square from center/focused area
w, h = img1.size
size = min(w, h)
left = (w - size) // 2
top = (h - size) // 2
img1_cropped = img1.crop((left, top, left + size, top + size)).resize((600, 600), Image.Resampling.LANCZOS)
img1_processed = apply_cyber_grade(img1_cropped, tint_color=(15, 30, 75), alpha=0.15, contrast=1.15, brightness=0.98)
img1_processed.save('scratch/out/hero-img-1.png', 'PNG')
print("Processed hero-img-1.png")

# 2. hero-img-2: team_ui_board (hand pinning UI wireframe architecture cards)
img2 = Image.open('scratch/team_ui_board.jpg').convert('RGB')
w, h = img2.size
size = min(w, h)
left = (w - size) // 2
top = (h - size) // 2
img2_cropped = img2.crop((left, top, left + size, top + size)).resize((600, 600), Image.Resampling.LANCZOS)
img2_processed = apply_cyber_grade(img2_cropped, tint_color=(25, 45, 110), alpha=0.25, contrast=1.1, brightness=0.92)
img2_processed.save('scratch/out/hero-img-2.png', 'PNG')
print("Processed hero-img-2.png")

# 3. hero-img-3: designer_wireframe (hand sketching UI wireframe USER GOALS)
img3 = Image.open('scratch/designer_wireframe.jpg').convert('RGB')
w, h = img3.size
size = min(w, h)
left = (w - size) // 2
top = (h - size) // 2
img3_cropped = img3.crop((left, top, left + size, top + size)).resize((600, 600), Image.Resampling.LANCZOS)
img3_processed = apply_cyber_grade(img3_cropped, tint_color=(30, 40, 100), alpha=0.22, contrast=1.12, brightness=0.90)
img3_processed.save('scratch/out/hero-img-3.png', 'PNG')
print("Processed hero-img-3.png")

# 4. hero-img: team_collab_large (candid developers working on laptops with code)
img4 = Image.open('scratch/team_collab_large.jpg').convert('RGB')
# Target aspect ratio around 1200 x 900
w, h = img4.size
target_w = 1200
target_h = 896
# Crop to 4:3 / target aspect
crop_h = int(w * (target_h / target_w))
if crop_h <= h:
    top = (h - crop_h) // 2
    img4_cropped = img4.crop((0, top, w, top + crop_h)).resize((target_w, target_h), Image.Resampling.LANCZOS)
else:
    crop_w = int(h * (target_w / target_h))
    left = (w - crop_w) // 2
    img4_cropped = img4.crop((left, 0, left + crop_w, h)).resize((target_w, target_h), Image.Resampling.LANCZOS)

img4_graded = apply_cyber_grade(img4_cropped, tint_color=(10, 20, 65), alpha=0.28, contrast=1.18, brightness=0.88)

# Smooth left-edge gradient mask so it fades seamlessly into the background #02050a
rgba_img = img4_graded.convert('RGBA')
r, g, b, a = rgba_img.split()

# Create alpha mask with smooth left transition and bottom transition
mask = Image.new('L', (target_w, target_h), 255)
mask_pixels = mask.load()
fade_width = int(target_w * 0.35)
fade_bottom = int(target_h * 0.15)

for y in range(target_h):
    for x in range(target_w):
        val = 255
        # Left fade
        if x < fade_width:
            val = int(val * (x / fade_width))
        # Bottom fade
        dist_from_bottom = target_h - 1 - y
        if dist_from_bottom < fade_bottom:
            val = int(val * (dist_from_bottom / fade_bottom))
        mask_pixels[x, y] = max(0, min(255, val))

rgba_img.putalpha(mask)
rgba_img.save('scratch/out/hero-img.png', 'PNG')
print("Processed hero-img.png")
