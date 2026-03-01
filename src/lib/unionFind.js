// Union-Find (Disjoint Set Union) with path compression + union by rank

export class UnionFind {
  constructor() {
    this.parent = new Map()
    this.rank = new Map()
  }

  makeSet(x) {
    if (!this.parent.has(x)) {
      this.parent.set(x, x)
      this.rank.set(x, 0)
    }
  }

  find(x) {
    if (!this.parent.has(x)) this.makeSet(x)
    if (this.parent.get(x) !== x) {
      this.parent.set(x, this.find(this.parent.get(x)))
    }
    return this.parent.get(x)
  }

  union(a, b) {
    const ra = this.find(a)
    const rb = this.find(b)
    if (ra === rb) return
    const rankA = this.rank.get(ra)
    const rankB = this.rank.get(rb)
    if (rankA < rankB) {
      this.parent.set(ra, rb)
    } else if (rankA > rankB) {
      this.parent.set(rb, ra)
    } else {
      this.parent.set(rb, ra)
      this.rank.set(ra, rankA + 1)
    }
  }

  connected(a, b) {
    return this.find(a) === this.find(b)
  }

  // Get all unique net IDs (roots)
  nets() {
    const roots = new Set()
    for (const x of this.parent.keys()) {
      roots.add(this.find(x))
    }
    return roots
  }

  // Get all members of the net containing x
  members(x) {
    const root = this.find(x)
    const result = []
    for (const node of this.parent.keys()) {
      if (this.find(node) === root) result.push(node)
    }
    return result
  }
}

// Build a Union-Find pre-wired with Ariston breadboard internal connections
// 94 base nets: 1 power bus + 1 ground bus + 46 right-side rows + 46 left-side rows
import {
  ROWS, COLS, POWER_COL, GROUND_COL,
  RIGHT_SIGNAL_COLS, LEFT_SIGNAL_COLS, holeId,
} from './breadboard'

export function buildBreadboardUF() {
  const uf = new UnionFind()

  // Register all holes
  for (const col of COLS) {
    for (let row = 1; row <= ROWS; row++) {
      uf.makeSet(holeId(col, row))
    }
  }

  // Power bus: all A-column holes connected
  for (let row = 2; row <= ROWS; row++) {
    uf.union(holeId(POWER_COL, 1), holeId(POWER_COL, row))
  }

  // Ground bus: all L-column holes connected
  for (let row = 2; row <= ROWS; row++) {
    uf.union(holeId(GROUND_COL, 1), holeId(GROUND_COL, row))
  }

  // Right-side rows: B,C,D,E,F connected per row
  for (let row = 1; row <= ROWS; row++) {
    for (let i = 1; i < RIGHT_SIGNAL_COLS.length; i++) {
      uf.union(
        holeId(RIGHT_SIGNAL_COLS[0], row),
        holeId(RIGHT_SIGNAL_COLS[i], row),
      )
    }
  }

  // Left-side rows: G,H,I,J,K connected per row
  for (let row = 1; row <= ROWS; row++) {
    for (let i = 1; i < LEFT_SIGNAL_COLS.length; i++) {
      uf.union(
        holeId(LEFT_SIGNAL_COLS[0], row),
        holeId(LEFT_SIGNAL_COLS[i], row),
      )
    }
  }

  return uf
}
