class Conway {

    constructor(h, w) {
        this.board = []
        this.temp = []
        this.h = h
        this.w = w

        for (let i = 0; i < this.h; i++) {
            this.board.push([])
            this.temp.push([])
            for (let j = 0; j < this.w; j++) {
                this.board[i][j] = 0
                this.temp[i][j] = 0
            }
        }
    }

    clear() {
      for (let i = 0; i < this.h; i++) {
          for (let j = 0; j < this.w; j++) {
              this.board[i][j] = 0
          }
      }
    }

    seed() {
      for (let i = 0; i < this.h; i++) {
          for (let j = 0; j < this.w; j++) {
              this.board[i][j] = Math.random() > 0.5 ? 1 : 0
          }
      }
    }

    glider() {
      this.board[0][2] = 1
      this.board[1][2] = 1
      this.board[2][2] = 1
      this.board[2][1] = 1
      this.board[1][0] = 1
    }

    inside(i, j) {
        return i >= 0 && j >= 0 && i < this.h && j < this.w
    }

    god(i, j) {
        let cell = this.board[i][j]
        let neighbour = 0
        this.inside(i - 1, j - 1) && this.board[i - 1][j - 1] && neighbour++
        this.inside(i, j - 1) && this.board[i][j - 1] && neighbour++
        this.inside(i + 1, j - 1) && this.board[i + 1][j - 1] && neighbour++
        this.inside(i - 1, j) && this.board[i - 1][j] && neighbour++
        this.inside(i + 1, j) && this.board[i + 1][j] && neighbour++
        this.inside(i - 1, j + 1) && this.board[i - 1][j + 1] && neighbour++
        this.inside(i, j + 1) && this.board[i][j + 1] && neighbour++
        this.inside(i + 1, j + 1) && this.board[i + 1][j + 1] && neighbour++

        if (neighbour < 2) {
            return 0
        }

        if (neighbour > 3) {
            return 0
        }

        if (cell == 0 && neighbour == 3) {
            return 1
        }

        if (cell == 1 && (neighbour == 2 || neighbour == 3)) {
            return 1
        }
    }

    step() {
        for (let i = 0; i < this.h; i++) {
            for (let j = 0; j < this.w; j++) {
                this.temp[i][j] = 0
            }
        }

        for (let i = 0; i < this.h; i++) {
            for (let j = 0; j < this.w; j++) {
                this.temp[i][j] = this.god(i, j)
            }
        }

        for (let i = 0; i < this.h; i++) {
            for (let j = 0; j < this.w; j++) {
                this.board[i][j] = this.temp[i][j]
            }
        }
    }

}

export default Conway
