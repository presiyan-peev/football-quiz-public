<template>
  <div class="game">
    <div class="questions">
        <v-tabs-items v-model="showedQuestionIndex">
            <v-tab-item :value="-1" color="black">
                L o a d i n g . . . 
            </v-tab-item>
            <v-tab-item v-for="question in ivePlayedWithQuestions" :key="question.id" :value="question.id">
                <IvePlayedWith 
                    :question="question"
                    @response-submit="receiveResponse"
                />
            </v-tab-item>
            <v-tab-item :value="ivePlayedWithQuestions.length">
                Damn boy, you thicc!

                You have {{ result }} correct answers! 

                <p></p>
                <div class="request-new-game d-flex justify-center">
                    <v-btn class="request-new-game" @click="requestNewGame" text outlined :loading="loading">
                        Започни нова игра
                    </v-btn>
                </div>
            </v-tab-item>
        </v-tabs-items>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import fb from '@/fb'

import IvePlayedWith from '@/components/IvePlayedWith.vue'

//import { mapGetters } from "vuex";

export default {
    name: 'Game',
    data: () => ({
        loader: null,
        loading: false,

        // an array that contains the IDs of all footballers in the DB, whose teamMates property is greater than 5
        footballersIDs: [
            'bale',
            'berbatov',
            'casillas',
            'chiellini',
            'courtois',
            'cr7',
            'degea',
            'diegocostapederasa',
            'edenhazard',
            'fabinholfc',
            'fabregas',
            'james-rodriguez',
            'johnterry',
            'kinglseycoman',
            'martial',
            'mpabbe',
            'pique',
            'pogba',
            'ramospederasa',
            'salah',
            'teveza',
            'torres',
            'xabialonso',
        ],
        // plan for the future: move all the logic regarding fetching footballer and teammates to Cloud Functions and automate populating this array

        // a var that stores the correct answers set by the user
        result: 0,

        // a var used for navigation
        showedQuestionIndex: -1,

        // an array that contains "I have played with"-type of questions 
        ivePlayedWithQuestions: [],
    }),
    components: {
        IvePlayedWith,
    },
    methods: {

        /**
         * After user has set an answer to the question and saves it, this component receives the response via an emitted event
         * And processes the response in this function
         */
        receiveResponse(isCorrect) {
            ++this.showedQuestionIndex

            console.log("receiveResponse: "+ isCorrect)

            // if user responded correctly
            if(isCorrect) {
                ++this.result
            } 
        },
        
         /**
         * GENERATE RANDOM QUESTIONS
         */

        async generateQuestion() {
            var newCorrectAnswers = []
            var newTeamMatesIDs = []
            var newTeamMates = []
            var questions = []
            
            /**
             * array containing the 3 random indexes of football players whose docs will be fetched from DB
             */
            var randomIDArr = []

            // loop executes until three footballers have been received from DB 
            while(randomIDArr.length !== 3) {                               

                // generate random index from the footballersIDs array
                let random = Math.floor(Math.random()* this.footballersIDs.length)

                // The index shouldn't be already used
                if(!randomIDArr.includes(random)) {

                    // if it hasn't been used, we add the index to the randomIDArr so we don't use it again
                    randomIDArr.push(random)

                    // we get a footballer from the DB, whose ID corresponds to the random index we just generated of the array footballersIDs
                    var a = await fb.firestore().collection('footballers')
                    .doc(this.footballersIDs[random])
                    .get()
                    .then(function(doc) {
                        let a = doc.data()
                        a.id = doc.id
                        return a
                    })
                    // This footballer will be later a correct answer to a question, so we put him in the corresponding array
                    newCorrectAnswers.push(a)
                }
            }

            /**
             * 
             * for each fetched footballer we fetch 5 teamplayers
             * this block of code uses the same logic as above
             */
            
            for (let i = 0; i < 3; i++) {
                let maxIndex = newCorrectAnswers[i].teamMates.length
                newTeamMatesIDs[i] = []
                newTeamMates[i] = []
                let usedTeamMatesIDs = []
                while (usedTeamMatesIDs.length !== 5) {
                    let random = Math.floor(Math.random()* maxIndex)
                    
                    if(!usedTeamMatesIDs.includes(random)) {
                        usedTeamMatesIDs.push(random)
                        newTeamMatesIDs[i].push(newCorrectAnswers[i].teamMates[random])

                        let tempTeamMate = await this.fetchTeamMate(newCorrectAnswers[i].teamMates[random])
                        newTeamMates[i].push(tempTeamMate)
                        
                    }
                }

                /**
                 * The Team Mates will be wrong answers.
                 * We push the original player to the teamMates array so that we can shuffle him in later
                 */
                newTeamMates[i].push(newCorrectAnswers[i])
                
                questions[i] = {
                    id: i,
                    correctAnswer: newCorrectAnswers[i],
                    teamMates: this.shuffle(newTeamMates[i]),
                }
                this.ivePlayedWithQuestions.push(questions[i])
            }
            this.showedQuestionIndex++
        },

        /**
         * a method  that receives a team player ID and fetches the document from firebase with this ID
         */
        async fetchTeamMate(teamMateID) {
            
            let tempTeamMate = await fb.firestore().collection('footballers')
                                    .doc(teamMateID)
                                    .get()
                                    .then(function(doc) {
                                        let a = doc.data()
                                        return a
                                    })
            return {
                id: teamMateID,
                name: tempTeamMate.name,
                currentClub: tempTeamMate.currentClub,
                imgSrc: tempTeamMate.imgSrc,
            }
        },

        /**
         * schuffle players in the array
         * https://www.w3resource.com/javascript-exercises/javascript-array-exercise-17.php
         */
        shuffle(arra1) {
            let ctr = arra1.length, temp, index;

        // While there are elements in the array
            while (ctr > 0) {
        // Pick a random index
                index = Math.floor(Math.random() * ctr);
        // Decrease ctr by 1
                ctr--;
        // And swap the last element with it
                temp = arra1[ctr];
                arra1[ctr] = arra1[index];
                arra1[index] = temp;
            }
            return arra1;
        },

        /**
         * after the user has answered all the questions and has seen his score, he can start a new game
         */
        requestNewGame() {
            this.loading = true
            console.log(this.loading)
            this.$emit('request-next-game')
        }
    },

    created() {
        this.generateQuestion()
    }
}
</script>
