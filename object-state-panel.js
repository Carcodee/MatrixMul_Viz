function escapeHtml(raw) {
  return String(raw)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function renderMatrixTable(rowMajor, formatValue) {
  const rows = [];
  for (let r = 0; r < 4; r += 1) {
    const b = r * 4;
    rows.push(`
      <tr>
        <th>r${r + 1}</th>
        <td>${escapeHtml(formatValue(rowMajor[b]))}</td>
        <td>${escapeHtml(formatValue(rowMajor[b + 1]))}</td>
        <td>${escapeHtml(formatValue(rowMajor[b + 2]))}</td>
        <td>${escapeHtml(formatValue(rowMajor[b + 3]))}</td>
      </tr>
    `);
  }
  return `
    <table class="state-matrix">
      <thead>
        <tr>
          <th></th>
          <th>X</th>
          <th>Y</th>
          <th>Z</th>
          <th>T</th>
        </tr>
      </thead>
      <tbody>
        ${rows.join("")}
      </tbody>
    </table>
  `;
}

export function renderCurrentStatePanel({ entityLabel, translation, rowMajor, formatValue }) {
  const label = entityLabel === "point" ? "Point" : (entityLabel === "space" ? "Space" : "Cube");
  const tx = escapeHtml(formatValue(translation.x));
  const ty = escapeHtml(formatValue(translation.y));
  const tz = escapeHtml(formatValue(translation.z));

  if (entityLabel === "point") {
    return `
      <div class="state-badge-row">
        <span class="state-badge">Object: ${label}</span>
        <span class="state-badge">View: Translation controls</span>
      </div>
      <p class="state-equation">p_current = (tx, ty, tz)</p>
      <div class="point-controls">
        <div class="axis-control axis-control-x">
          <label for="pointTxInput">X / tx</label>
          <input id="pointTxInput" type="number" step="0.1" value="${tx}" data-point-translate="x" />
        </div>
        <div class="axis-control axis-control-y">
          <label for="pointTyInput">Y / ty</label>
          <input id="pointTyInput" type="number" step="0.1" value="${ty}" data-point-translate="y" />
        </div>
        <div class="axis-control axis-control-z">
          <label for="pointTzInput">Z / tz</label>
          <input id="pointTzInput" type="number" step="0.1" value="${tz}" data-point-translate="z" />
        </div>
      </div>
      <div class="point-controls-actions">
        <button type="button" data-action="apply-point-translation">Move Point</button>
      </div>
    `;
  }

  return `
    <div class="state-badge-row">
      <span class="state-badge">Object: ${label}</span>
      <span class="state-badge">View: Full transform matrix</span>
    </div>
    <p class="state-equation">x_world = M_current * x_local</p>
    ${renderMatrixTable(rowMajor, formatValue)}
  `;
}
