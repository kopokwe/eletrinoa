// Ariston breadboard geometry
// Visual layout left→right: A B C D E F │channel│ G H I J K L
// Column A = +V bus (left edge), Column L = − bus (right edge)

export const ROWS = 46
export const COLS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L']

// SVG coordinate system
export const HOLE_SPACING = 18
export const CHANNEL_GAP = 14
export const MARGIN_LEFT = 22
export const MARGIN_TOP = 28
export const HOLE_RADIUS = 3.5
export const BOARD_PADDING = 16

// Column categories
export const POWER_COL = 'A'
export const GROUND_COL = 'L'
export const RIGHT_SIGNAL_COLS = ['B', 'C', 'D', 'E', 'F']
export const LEFT_SIGNAL_COLS = ['G', 'H', 'I', 'J', 'K']

export function holeId(col, row) {
  return `${col}${row}`
}

export function parseHoleId(id) {
  const col = id[0]
  const row = parseInt(id.slice(1), 10)
  return { col, row }
}

export function colX(col) {
  const idx = COLS.indexOf(col)
  if (idx === -1) return 0
  // After F (index 5), add channel gap for G onwards
  if (idx <= 5) return MARGIN_LEFT + idx * HOLE_SPACING
  return MARGIN_LEFT + idx * HOLE_SPACING + CHANNEL_GAP
}

export function rowY(row) {
  return MARGIN_TOP + (row - 1) * HOLE_SPACING
}

export function holeCoords(id) {
  const { col, row } = parseHoleId(id)
  return { x: colX(col), y: rowY(row) }
}

export function allHoleIds() {
  const ids = []
  for (const col of COLS) {
    for (let row = 1; row <= ROWS; row++) {
      ids.push(holeId(col, row))
    }
  }
  return ids
}

// Board SVG dimensions
export const BOARD_WIDTH = colX('L') + BOARD_PADDING + 4
export const BOARD_HEIGHT = rowY(ROWS) + BOARD_PADDING + 4

// Which internal net group does a column belong to?
export function holeNetGroup(col) {
  if (col === POWER_COL) return 'power'
  if (col === GROUND_COL) return 'ground'
  if (RIGHT_SIGNAL_COLS.includes(col)) return 'right'
  if (LEFT_SIGNAL_COLS.includes(col)) return 'left'
  return 'unknown'
}

// Wire path (quadratic Bezier arc) between two holes
export function wirePath(x1, y1, x2, y2) {
  const dx = x2 - x1
  const dy = y2 - y1
  const dist = Math.sqrt(dx * dx + dy * dy)
  const lift = Math.min(dist * 0.35, 30)
  const mx = (x1 + x2) / 2
  const my = Math.min(y1, y2) - lift
  return `M ${x1},${y1} Q ${mx},${my} ${x2},${y2}`
}
