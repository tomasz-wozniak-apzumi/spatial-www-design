from PIL import Image
import os

def extract_logos(input_path, output_dir, final_size=(250, 150)):
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)
        
    img = Image.open(input_path).convert('RGBA')
    width, height = img.size

    # Hardcoded approximate bounding boxes based on the visual layout of 1061x691 image
    boxes = [
        # Row 1 (y = 0 to 220)
        (30, 20, 200, 210),   # VW
        (260, 20, 430, 210),  # NGK
        (460, 60, 760, 160),  # BEWA
        (800, 50, 970, 190),  # KAN
        
        # Row 2 (y = 220 to 350)
        (100, 230, 270, 320), # Audi
        (280, 240, 420, 320), # Sitech
        (430, 230, 670, 330), # Polpharma
        (670, 230, 820, 350), # Delpharm (it has a logo mark on top, text at bottom)
        (830, 250, 1040, 310),# HALEON
        
        # Row 3 (y = 350 to 450)
        # PKP is around x=150 to 400
        (150, 360, 390, 440), # PKP Intercity
        (390, 360, 630, 440), # Jelcz
        
        # Row 4 (y = 450 to 650)
        (170, 470, 290, 590), # flex
        (400, 470, 510, 590), # CANPACK
        (510, 480, 650, 590), # Wasiak
        (650, 470, 850, 590)  # Oetiker
    ]

    print(f"Extracting {len(boxes)} logos")
    
    target_w, target_h = final_size
    for idx, box in enumerate(boxes):
        cropped = img.crop(box)
        
        # We can find the actual bounding box of non-white pixels inside this crop to perfectly center it
        pixels = cropped.load()
        cw, ch = cropped.size
        min_x, max_x = cw, 0
        min_y, max_y = ch, 0
        has_pixels = False
        
        for y in range(ch):
            for x in range(cw):
                r, g, b, a = pixels[x, y]
                if a > 10 and not (r > 240 and g > 240 and b > 240):
                    has_pixels = True
                    min_x = min(min_x, x)
                    max_x = max(max_x, x)
                    min_y = min(min_y, y)
                    max_y = max(max_y, y)
                    
        if has_pixels:
            cropped = cropped.crop((min_x, min_y, max_x+1, max_y+1))
        
        cw, ch = cropped.size
        scale = min((target_w - 40) / max(1, cw), (target_h - 40) / max(1, ch))
        new_w, new_h = max(1, int(cw * scale)), max(1, int(ch * scale))
        
        resized = cropped.resize((new_w, new_h), Image.LANCZOS)
        
        final_img = Image.new('RGBA', final_size, (255, 255, 255, 0))
        offset = ((target_w - new_w) // 2, (target_h - new_h) // 2)
        final_img.paste(resized, offset)
        
        final_img.save(os.path.join(output_dir, f"logo_{idx+1}.png"))

if __name__ == '__main__':
    extract_logos('customers_base.png', 'logos_sliced', (250, 150))
