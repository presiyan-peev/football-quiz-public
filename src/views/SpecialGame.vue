<template>
  <div class="home">
    <IvePlayedWith
      v-if="!showResultForm"
      :question="question"/>
    <ResultForm v-else/>
  </div>
</template>

<script>
// @ is an alias to /src
import IvePlayedWith from '@/components/IvePlayedWith.vue'
import ResultForm from '@/components/ResultForm.vue'

import { mapGetters } from "vuex";

export default {
  name: 'Home',
  data: () => ({
    question: {
      isSpecial: true,
      correctAnswer: { name: 'Berbatov',  currentClub: 'retired', imgSrc: 'https://i.imgur.com/zx6Atkd.jpg'},
      teamMates: [
        { name: 'Cristiano Ronaldo', currentClub: 'сега в Ювентус', imgSrc: 'https://i.imgur.com/ceK62tR.jpg'},
        { name: 'Fabihno',  currentClub: 'сега в Ливърпул', imgSrc: 'https://i.imgur.com/kUUWIGB.jpg'},
        { name: 'Bernardo Silva',  currentClub: 'сега в Ман Сити', imgSrc: 'https://i.imgur.com/iG10gO6.jpg'},
        { name: 'Gareth Bale', currentClub: 'сега в Реал М', imgSrc: 'https://i.imgur.com/NOg0wrV.jpg'},
        { name: 'Michael Ballack',  currentClub: 'отказал се', imgSrc: 'https://i.imgur.com/M1IVDgC.jpg'},
      ]
    }
  }),
  computed: {
    ...mapGetters([
        "showResultForm",
    ]),
  },
  components: {
    IvePlayedWith,
    ResultForm
  },
  destroyed(){
    console.log('destr')
  }
}
</script>
