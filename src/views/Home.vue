<template>
  <div class="home">
    <div class="buttons"> 
      <div class="start-game-btn ma-3 d-flex justify-center">
        <v-dialog v-model="startGameDialog" persistent max-width="290">
          <template v-slot:activator="{ on }">
            <v-btn color="to-start-game" v-on="on" text>Покани Приятел</v-btn>
          </template>
          <v-card>
            <StartGamePopup @close-start-game-popup="closeStartGamePopup()" />
            
          </v-card>
        </v-dialog>
      </div>

      <div class="join-game-btn ma-3 d-flex justify-center">
        <v-dialog v-model="joinGameDialog" persistent max-width="290">
          <template v-slot:activator="{ on }">
            <v-btn color="to-join-game" v-on="on" text>Приеми покана от авер</v-btn>
          </template>
          <v-card>
            <JoinGamePopup @close-join-game-popup="closeJoinGamePopup()" />     
          </v-card>
        </v-dialog>
      </div>  

      <div class="single-game-btn ma-3 d-flex justify-center">
        <v-btn class="to-single" @click="pushSinglePlayer()" text>Играй Single</v-btn>
      </div>  

      <div class="multiplayer-game-btn ma-3 d-flex justify-center">
        <v-btn class="to-special" @click="toSpecial()" text>Играй днешния Special</v-btn>
      </div>  

      <div class="add-footballers-btn ma-5 d-flex justify-center">
        <v-btn class="error to-adding-footballers" @click="toGameManager()" tile text>Добави нови футболисти в базата данни</v-btn>
      </div> 

    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import StartGamePopup from "@/components/StartGamePopup.vue"
import JoinGamePopup from "@/components/JoinGamePopup.vue"

export default {
  name: 'Home',

  data () {
    return {
      joinGameDialog: false,
      startGameDialog: false
    }
  },

  components: {
    StartGamePopup,
    JoinGamePopup
  },

  methods: {
    pushSinglePlayer() {
      this.$router.push('game')
    },

    toSpecial() {
      this.$router.push('special-game')
    },

    toGameManager() {
      this.$router.push('manager')
    },

    closeStartGamePopup() {
      this.startGameDialog = false
    },

    closeJoinGamePopup() {
      this.joinGameDialog = false
    },
  }
}
</script>
