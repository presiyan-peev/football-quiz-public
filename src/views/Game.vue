<template>
  <div class="game">
    <Game :key="gameKey" @request-next-game="forceRerender" />
  </div>
</template>

<script>
import Game from '@/components/Game'
export default {
  data() {
    return {
      gameKey: 0,
    };
  },
  components: {
    Game,
  },
  methods: {

    // forcibly rerenders the game component after the player is done with the game and wants to start a new one
    forceRerender() {
      console.log("forceRerender")
      this.gameKey += 1;  
    }
  },
        
}
</script>