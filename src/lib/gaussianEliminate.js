// Gaussian elimination for N×N linear system Ax = b
// Returns solution vector x, or null if singular

export function gaussianEliminate(A, b) {
  const n = A.length
  // Augmented matrix
  const M = A.map((row, i) => [...row, b[i]])

  for (let col = 0; col < n; col++) {
    // Partial pivoting — find max in column
    let maxRow = col
    let maxVal = Math.abs(M[col][col])
    for (let row = col + 1; row < n; row++) {
      if (Math.abs(M[row][col]) > maxVal) {
        maxVal = Math.abs(M[row][col])
        maxRow = row
      }
    }
    if (maxVal < 1e-12) return null // singular

    // Swap rows
    if (maxRow !== col) {
      [M[col], M[maxRow]] = [M[maxRow], M[col]]
    }

    // Eliminate below
    for (let row = col + 1; row < n; row++) {
      const factor = M[row][col] / M[col][col]
      for (let j = col; j <= n; j++) {
        M[row][j] -= factor * M[col][j]
      }
    }
  }

  // Back substitution
  const x = new Array(n)
  for (let row = n - 1; row >= 0; row--) {
    let sum = M[row][n]
    for (let j = row + 1; j < n; j++) {
      sum -= M[row][j] * x[j]
    }
    x[row] = sum / M[row][row]
  }

  return x
}
