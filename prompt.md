# Extra sprites for the site guide

Generate **one** PNG sprite sheet of the same character already on the site:

- Indian man, mid-20s, curly dark brown hair, full beard, black sunglasses
- Navy blue suit jacket, white open-collar shirt, dark trousers, black-and-white sneakers
- True 8-bit / 16-bit SNES pixel art, chunky pixels, limited palette, dark outlines
- Same proportions as the existing idle / walk / wave / type sheets
- **Transparent background** (no white, no paper, no drop shadow)
- **No titles, numbers, captions, or watermarks**
- Even grid, each cell **128×160 px**, 8px padding of empty transparent space around the figure so frames can be cropped consistently
- Character vertically aligned to the **bottom** of each cell (feet on the same baseline)
- Even lighting, no anti-alias, no blur, no photorealism

## Sheet layout (left → right, top → bottom)

Row 1 — **Idle breathe** (4 frames)
Subtle chest/shoulder bob, hands in pockets, facing camera.

Row 2 — **Wave** (6 frames)
Start idle → raise right hand with 2–3 motion lines → peak wave → back to idle.

Row 3 — **Walk cycle, facing right** (8 frames)
Classic side-view loop. Same foot-plant, no sliding.

Row 4 — **Walk cycle, facing left** (8 frames)
Exact mirror of row 3. I do not have this yet.

Row 5 — **Typing, seated cross-legged with silver laptop** (4 frames)
Tiny hand/key motion, slight head nod.

Row 6 — **Talk / explain** (4 frames)
Standing, facing camera, one hand out as if speaking. Mouth open on 2 of the 4 frames. This is for the speech-bubble guide.

Row 7 — **Point right** (4 frames)
Standing, pointing to the right with the right arm. Hold the point, tiny bounce. For “go look at this page”.

Row 8 — **Happy bounce** (4 frames)
Feet leave the ground 1–2 px, tiny pink heart particles (2–3 pixels) above the head. For a max pet-combo.

Row 9 — **Jump** (3 frames)
Crouch, stretch in air, land. Keep the suit readable.

## Output

- Single PNG, 1024×1440 or similar multiple of the cell size
- PNG-24 with alpha
- Character identical across every row (hair, beard, glasses, suit)
- If you must split, keep the same cell size and naming: `idle`, `wave`, `walk-right`, `walk-left`, `type`, `talk`, `point`, `happy`, `jump`
