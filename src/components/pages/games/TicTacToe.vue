<template>
  <div class="flex flex-col grow items-center justify-center">
    {{currentPlayer}}
    <button @click = reset()>Reset</button>
    <div class="grid grid-rows-3 gap-1">
      <div class="grid grid-cols-3" v-for="row in 3">
        <Button :disabled="disabled" @click="setInput(`${row}-${button}`)" v-for="button in 3" variant="secondary" class="h-20 w-20 rounded-xl">{{grid[row-1][button-1]}}</Button>
      </div>
    </div>
  </div>
</template>

<script>
import Button from "../../UI/Button.vue";

export default {
  components: {
    Button
  },

  data(){
    return {
      currentPlayer: 'X',
      grid: [],
      disabled: false
    }
  },

  methods: {
    setInput(id){
      let a = id.split('-')[0]-1
      let b = id.split('-')[1]-1
      if (this.grid[a][b]) return

      this.grid[a][b] = this.currentPlayer

      if (this.checkGrid()){
        this.disabled = true
        return
      }
      this.changePlayer()
    },

    changePlayer() {
      if (this.currentPlayer === 'X') {
        this.currentPlayer = 'O'
      } else {
        this.currentPlayer = 'X'
      }
    },

    reset(){
      this.currentPlayer = 'X'
      this.disabled = false
      // generate empty grid
      for (let i = 0; i < 3; i++) {
        this.grid[i] = [null, null, null]
      }
    },

    checkGrid(){
      // CHECK HORIZONTAL
      let status = false
      this.grid.forEach(row=>{
        if (row.every(v => v === row[0] && row[0] != null)) {
          status = true
        }
      })

      // CHECK VERTICAL
      for (let i = 0; i < 3; i++) {
        let gridStatus = [this.grid[0][i], this.grid[1][i], this.grid[2][i]].every(v => v === this.grid[0][i] && this.grid[0][i] !== null)
        if (gridStatus) {
          status = gridStatus
        }
      }

      // CHECK DIAGONAL
      let gridStatus = [this.grid[0][0], this.grid[1][1], this.grid[2][2]].every(v => v === this.grid[0][0] && this.grid[0][0] !== null)
      if (gridStatus) {
        status = gridStatus
      }


      gridStatus = [this.grid[0][2], this.grid[1][1], this.grid[2][0]].every(v => v === this.grid[0][2] && this.grid[0][2] !== null)
      if (gridStatus) {
        status = gridStatus
      }
      console.log(status)
      return status
    }
  },

  created() {
    // generate empty grid
    for (let i = 0; i < 3; i++) {
      this.grid.push([null, null, null])
    }
  }
}
</script>