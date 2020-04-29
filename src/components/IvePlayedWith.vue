The Quiz view of the "I've Played With" type of questions

Normal game: The user sees 6 football player cards and should name the player who has played with all of the rest.

Special game: The user sees 5 football player cards and a text box and should write in the name of the football player ho has played with all of them.
              Then he registers and can win a football

<template>
  <v-container :fullscreen="$vuetify.breakpoint.xsOnly" >
    <v-parallax
        height="1000"
        src="https://i.imgur.com/s8t5zEY.jpg"
        class="parallax"
        opacity="0.2"
      >
      <v-card tile class="questions-container my-2">

      <v-container>
        <div class="usualQuestion" v-if="!isSpecial">
          <v-card-title class="question-text ma-1 pa-1" v-text="questionTextUsual"></v-card-title>  
        </div>  
        
        <div class="specialQuestion" v-else>
          <v-card-subtitle class="question-text ma-1 pa-1" v-text="`Отговори правилно и спечели ${award}`"></v-card-subtitle>
          <v-card-title class="question-text ma-1 pa-1" v-text="questionTextSpecial" style="word-break: break-word" ></v-card-title>
        </div>
      </v-container>  

      </v-card>

      <!-- PLAYER CARDS Begin -->

        <v-card tile flat> 
          <v-container >
              <v-row no-gutters>
                  <v-col
                      cols="4"
                      xs="3"
                      sm="4"
                      v-for="teamMate in teamMates"
                      :key="teamMate.name"
                      class="px-1"
                  >
                    <v-card @click="setAnswer(teamMate.name)" :class="{ selected: teamMate.name === selectedAnswer}">
                      <PlayerCard v-bind:player="teamMate" />
                    </v-card>   
                  </v-col>
                  <v-col
                      cols="4"
                      xs="3"
                      sm="4"
                      class="px-1"
                  >
                    <v-card v-if="isSpecial">
                      <PlayerCard v-bind:player="whoAmI" />
                    </v-card>   
                  </v-col>
              </v-row>
          </v-container>
        </v-card>

      <!-- PLAYER CARDS End -->


      <!-- Sends response to the parent component with user's answer -->
      <!-- Afterwards the parent component will toggle next question -->
      <v-btn class="success" @click="submitResponse()" v-if="!isSpecial">
        Запази отговор
      </v-btn>

    </v-parallax>

    <!-- Registration form for the Special game -->
    <SpecialRegister v-if="isSpecial" />
  </v-container>
</template>

<script>

import PlayerCard from '@/components/PlayerCard.vue'
import SpecialRegister from '@/components/SpecialRegister.vue'

export default {
  data() {
    return {
      // variables used in the normal game
      isCorrect: null,
      questionTextUsual: "Кой от следните футболисти е бил съотборник с всички останали?",
      selectedAnswer: null,

      // variables used in the special game
      questionTextSpecial: "Кой футболист е бил съотборник с всички изброени:",
      award: "футболна топка",
      whoAmI: { name: 'Who am I',  currentClub: 'Играл съм със всички тях', imgSrc: 'https://i.imgur.com/zx6Atkd.jpg'},       // A mock football player card used with special
    }
  },
  computed: {
    // contains all football players, including the correct answer and the 5 wrong ones
    teamMates() {
      return (this.question.teamMates)
    },

    correctAnswer() {
      return this.question.correctAnswer
    },

    // returns true if this is a special game mode
    isSpecial() {
      return this.question.isSpecial
    }
  },

  // contains correct answer, wrong answers and if the game is special or normal (see computed properties)
  props: ['question'],

  components: {
    PlayerCard,
    SpecialRegister
  },

  methods: {

    /**
     * Sends response to the parent component with user's answer
     * Afterwards the parent component will toggle next question
     */
    submitResponse() {
      this.$emit('response-submit', this.isCorrect)
    },

    /**
     * Applies style to a clicked player card. Applicable only on non-special event
     * The clicked player will be later sent to parent component as the user's answer
     */
    setAnswer(playerName) {
      if (this.isSpecial) {
        return
      }
      this.selectedAnswer = playerName
      this.isCorrect = (playerName === this.correctAnswer.name)
    }  
  },
}
</script>

<style>
.question {
  background-color: rgba(255, 255, 255, 0) !important;
}
.v-parallax__image {
  opacity: 0.2 !important;
}
.selected {
  background-color: rgba(10, 88, 0, 0.3) !important;
  color: rgb(0, 59, 5) !important;
  border: 4px black !important;
}
</style>