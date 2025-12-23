from PIL import Image
import os
import sys

source_path = "src/assets/mainlogo.png"
if not os.path.exists(source_path):
    print("Source not found")
    sys.exit(1)

img = Image.open(source_path)
width, height = img.size
pixels = img.load()

center_x = width // 2
search_range = 400  # Look +/- 400 pixels from center
best_split = center_x
min_content = float('inf')

# Assume transparent background (or white/black if not transparent)
# We'll count "non-transparent" pixels in each column.
# If alpha channel exists, use it. Else check color variance.

has_alpha = 'A' in img.getbands()

print(f"Image Size: {width}x{height}, Mode: {img.mode}")

for x in range(center_x - search_range, center_x + search_range):
    if x < 0 or x >= width:
        continue

    content_score = 0
    for y in range(height):
        if has_alpha:
            r, g, b, a = pixels[x, y]
            if a > 10: # Significant opacity
                content_score += 1
        else:
            # Simple check if not white/black (heuristic)
            p = pixels[x, y]
            if isinstance(p, tuple):
               # check difference from white/black?
               pass
            pass

    # We want to minimize content (cut through whitespace/transparency)
    # Prefer split closest to center if multiple gaps exist
    if content_score < min_content:
        min_content = content_score
        best_split = x
    elif content_score == min_content:
        # Tie-breaker: closer to center
        if abs(x - center_x) < abs(best_split - center_x):
            best_split = x

print(f"Optimal split found at x={best_split} (Content score: {min_content})")
print(f"Shift from center: {best_split - center_x} px")

# Crop
left_path = "src/assets/mainlogo_left.png"
right_path = "src/assets/mainlogo_right.png"

left_img = img.crop((0, 0, best_split, height))
left_img.save(left_path)

right_img = img.crop((best_split, 0, width, height))
right_img.save(right_path)

print("Saved adjusted images.")
