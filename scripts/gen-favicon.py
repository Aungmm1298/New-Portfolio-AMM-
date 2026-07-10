"""Generates a branded favicon for the Cloud Engineer portfolio:
a dark-navy rounded backdrop with a bold cyan/azure gradient cloud mark
and a single glowing accent node, tuned to stay legible down to 16px."""

from PIL import Image, ImageDraw, ImageFilter


def lerp(a, b, t):
    return tuple(int(a[i] + (b[i] - a[i]) * t) for i in range(3))


def make_icon(size):
    S = size * 8  # supersample for smooth edges, downscale at the end
    img = Image.new("RGBA", (S, S), (0, 0, 0, 0))

    # --- Backdrop: rounded square, deep navy -> near-black gradient ---
    bg = Image.new("RGBA", (S, S), (0, 0, 0, 0))
    bg_draw = ImageDraw.Draw(bg)
    top_color = (13, 20, 38)     # deep navy
    bottom_color = (2, 6, 23)    # near-black
    for y in range(S):
        t = y / S
        bg_draw.line([(0, y), (S, y)], fill=lerp(top_color, bottom_color, t) + (255,))

    radius = int(S * 0.24)
    mask = Image.new("L", (S, S), 0)
    ImageDraw.Draw(mask).rounded_rectangle([0, 0, S - 1, S - 1], radius=radius, fill=255)
    img.paste(bg, (0, 0), mask)

    # soft cyan ambient glow centered on the cloud mark
    glow = Image.new("RGBA", (S, S), (0, 0, 0, 0))
    gx, gy, gr = S * 0.5, S * 0.5, S * 0.42
    ImageDraw.Draw(glow).ellipse([gx - gr, gy - gr, gx + gr, gy + gr], fill=(34, 211, 238, 110))
    glow = glow.filter(ImageFilter.GaussianBlur(S * 0.07))
    img.alpha_composite(glow, (0, 0))
    img.putalpha(Image.new("L", (S, S), 255))
    # re-apply rounded mask (glow blur can bleed past corners)
    img = Image.composite(img, Image.new("RGBA", (S, S), (0, 0, 0, 0)), mask)

    # --- Cloud mark: bold, simplified, large enough to read at 16px ---
    cloud_mask = Image.new("L", (S, S), 0)
    cm = ImageDraw.Draw(cloud_mask)

    cx, cy = S * 0.50, S * 0.47
    base_w, base_h = S * 0.62, S * 0.24
    cm.rounded_rectangle(
        [cx - base_w / 2, cy - base_h * 0.1, cx + base_w / 2, cy + base_h],
        radius=base_h / 2, fill=255,
    )
    puffs = [
        (cx - base_w * 0.26, cy - base_h * 0.02, S * 0.155),
        (cx + S * 0.015, cy - base_h * 0.62, S * 0.205),
        (cx + base_w * 0.28, cy + base_h * 0.02, S * 0.145),
    ]
    for (px, py, pr) in puffs:
        cm.ellipse([px - pr, py - pr, px + pr, py + pr], fill=255)

    grad = Image.new("RGBA", (S, S), (0, 0, 0, 0))
    grad_draw = ImageDraw.Draw(grad)
    c1 = (56, 225, 255)   # bright cyan
    c2 = (99, 158, 255)   # azure/blue
    top_y, bot_y = int(cy - S * 0.30), int(cy + base_h)
    for y in range(top_y, bot_y + 1):
        t = max(0, min(1, (y - top_y) / max(1, (bot_y - top_y))))
        grad_draw.line([(0, y), (S, y)], fill=lerp(c1, c2, t) + (255,))

    cloud_layer = Image.new("RGBA", (S, S), (0, 0, 0, 0))
    cloud_layer.paste(grad, (0, 0), cloud_mask)
    img.alpha_composite(cloud_layer)

    # --- Single glowing accent node, bottom-right of the cloud ---
    node_layer = Image.new("RGBA", (S, S), (0, 0, 0, 0))
    nd = ImageDraw.Draw(node_layer)
    nx, ny = cx + base_w * 0.34, cy + base_h * 1.18
    nr = S * 0.075
    glow_r = nr * 2.6
    nd.ellipse([nx - glow_r, ny - glow_r, nx + glow_r, ny + glow_r], fill=(56, 225, 255, 130))
    node_layer = node_layer.filter(ImageFilter.GaussianBlur(S * 0.02))
    nd2 = ImageDraw.Draw(node_layer)
    nd2.ellipse([nx - nr, ny - nr, nx + nr, ny + nr], fill=(255, 255, 255, 255))
    img.alpha_composite(node_layer)

    return img.resize((size, size), Image.LANCZOS)


sizes = [16, 32, 48, 64, 128, 180, 256]
icons = {s: make_icon(s) for s in sizes}

icons[256].save("public/favicon-256.png")
icons[32].save("public/favicon-32x32.png")
icons[16].save("public/favicon-16x16.png")
icons[180].save("public/apple-touch-icon.png")

ico_sizes = [16, 32, 48, 64, 128, 256]
icons[256].save(
    "public/favicon.ico",
    format="ICO",
    sizes=[(s, s) for s in ico_sizes],
)

print("Favicon assets generated.")
