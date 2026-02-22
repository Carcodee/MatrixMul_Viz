# MatrixMul_Viz

Interactive matrix multiplication visualizer built with `Three.js` in a single-page app (`index.html`).

It lets you:
- edit 4x4 (3D) and 3x3 (2D affine) matrices,
- apply/set/replay matrix transforms on a cube or point,
- inspect transformation chains (`M1`, `M2`, ...),
- use a dedicated Math Visualizer panel for equation-style matrix output.

## Project Goals

- Make matrix multiplication behavior visible and intuitive.
- Show both visual and mathematical representations of transforms.
- Support quick experimentation in 2D and 3D without build steps.

## Tech Stack

- HTML/CSS/JavaScript (no framework)
- `Three.js` via CDN import map
- `OrbitControls` and `TransformControls` from Three addons

## Run Locally

No install is required.

1. Open `index.html` directly in a browser, or
2. Serve the folder with any static server and open the page.

Example (Python):

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Main UI Areas

## Top Controls

- `Mode: 3D / 2D`: switches camera + matrix editor dimension.
- `Tool: Transform / Matrix Viz`: switches between transform workflow and matrix-axis visualization workflow.
- Panel toggles: show/hide `Matrix`, `Multiply`, `Config`, `Math`, `Viz`, `Chain` sections independently.

## Matrix Panel (right)

- `Matrix` section: editable matrix grid.
- `Configuration` section:
  - select target object (`Cube` or `Point`)
  - `Copy Current`
  - `Identity`
  - `Reset Cube/Point`
- `Multiplication` section:
  - `Apply Multiply` (interpolated)
  - `Direct Multiply` (instant)
  - `Apply Set` (replace current matrix)
  - `Replay Transformations`
  - `Do Transformation` (apply full chain)
- `Visualization` section:
  - matrix visualization hints
  - axis readout
  - trig view toggle
- `Applied Matrices (Chain)` section:
  - list of applied matrices (`M1`, `M2`, ...)
  - step edit selector + transform gizmo mode (`Translate/Rotate/Scale`)
  - cumulative chain output

## Math Visualizer Panel (left)

Separate floating panel so it does not resize the main control panel.

Shows:
- current active object matrix (`cube_current` or `point_current`)
- editor matrix (`M_editor`)
- next result equation:
  - `entity_next = entity_current * M_editor`
- chain equation:
  - `M_total = I * M1 * M2 * ...`
  - intermediate step equations (`S1`, `S2`, ...)
  - resulting `M_total` matrix

## Scene Behavior

- 3D mode:
  - perspective camera
  - 4x4 matrix editor
  - world axis labels shown for `X`, `Y`, `Z` in Transform tool
- 2D mode:
  - orthographic camera
  - 3x3 affine-style editor mapped into 4x4 internally
  - world axis labels shown for `X`, `Y` only in Transform tool
- Matrix Viz tool:
  - visualizes transformed 2D basis/origin from matrix values
  - world axis labels are hidden

## Matrix Input Expressions

Cells support numeric expressions and trig in degrees.

Supported examples:
- `2`
- `1/3`
- `cos 90`
- `sin(45)`
- `tan 30`
- `pi`, `e`

Notes:
- `^` is supported and converted to exponent (`**`).
- Invalid tokens/characters are rejected.

## Transformation Chain Model

- Each multiply can be tracked as `M1`, `M2`, ...
- The app computes cumulative chain result:
  - `M_total = I * M1 * M2 * ...`
- Chain steps can be selected and adjusted with transform controls.
- Chain replay and direct execution are available from the multiplication section.

## File Structure

- `index.html`: full app (UI, styling, Three.js scene, matrix logic)
- `README.md`: project documentation
- `LICENSE`: project license
- `AGENTS.md` / `CLAUDE.md`: local agent instructions
- `tools/`: local scripts/batch helpers present in repository

## Known Characteristics

- Single-file app architecture (fast iteration, minimal setup).
- Uses CDN modules, so internet is required for `Three.js` unless vendored locally.
- No automated test suite currently included.

## Suggested Next Improvements

1. Split `index.html` into modular JS/CSS files.
2. Add keyboard shortcuts (toggle panels, apply operations).
3. Add import/export for matrix chains (JSON).
4. Add unit tests for matrix parsing and chain math.
