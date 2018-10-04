module.exports = function solveSudoku(matrix) {
  function solve(matrix, row, col) {
    // recursive algo
    var cell = findUnassignedLocation(matrix, row, col);
    row = cell[0];
    col = cell[1];

    // base case: if no empty cell  
    if (row == -1) {
      console.log("solved");
      return true;
    }

    for (var num = 1; num <= 9; num++) {

      if (noConflicts(matrix, row, col, num)) {
        matrix[row][col] = num;

        if (solve(matrix, row, col)) {
          return true;
        }

        // mark cell as empty (with 0)    
        matrix[row][col] = 0;
      }
    }

    // trigger back tracking
    return false;
  }

  function findUnassignedLocation(matrix, row, col) {
    var done = false;
    var res = [-1, -1];

    while (!done) {
      if (row == 9) {
        done = true;
      }
      else {
        if (matrix[row][col] == 0) {
          res[0] = row;
          res[1] = col;
          done = true;
        }
        else {
          if (col < 8) {
            col++;
          }
          else {
            row++;
            col = 0;
          }
        }
      }
    }

    return res;
  }

  function noConflicts(matrix, row, col, num) {
    return isRowOk(matrix, row, num) && isColOk(matrix, col, num) && isBoxOk(matrix, row, col, num);
  }

  function isRowOk(matrix, row, num) {
    for (var col = 0; col < 9; col++)
      if (matrix[row][col] == num)
        return false;

    return true;
  }

  function isColOk(matrix, col, num) {
    for (var row = 0; row < 9; row++)
      if (matrix[row][col] == num)
        return false;

    return true;
  }

  function isBoxOk(matrix, row, col, num) {
    row = Math.floor(row / 3) * 3;
    col = Math.floor(col / 3) * 3;

    for (var r = 0; r < 3; r++)
      for (var c = 0; c < 3; c++)
        if (matrix[row + r][col + c] == num)
          return false;

    return true;
  }

  solve(matrix, 0, 0);
  return matrix;
}
