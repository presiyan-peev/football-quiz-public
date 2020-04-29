<template>
    <div class="load-game-popup px-3">
        <!-- <div class="name-input">
            <span class="name-input-field">
                <v-text-field
                    v-model="joiningPlayerName"
                    label="Име"
                    class="pt-2"
                    outlined
                ></v-text-field>
            </span>
            <span class="entrycode-input-field">
                <v-text-field
                    v-model="entrycodeTemp"
                    label="Код за Игра"
                    class="pt-2"
                    outlined
                ></v-text-field>
            </span>
            <span class="name-input-button">
                <div class="mb-2">
                    <v-btn 
                        depressed 
                        medium 
                        :disabled="codeCheckRequested" 
                        @click="requestCodeCheck()" 
                        class="info "
                    >
                        Свържи се
                    </v-btn>
                </div>
            </span>
        </div> -->
        Sorry lad,... Все още няма мултиплеър за тази игра
        <v-btn class="close-startgame-dialog" @click="closePopup()">Затвори</v-btn>
    </div>
</template>

<script>
import fb from '@/fb'
//import firebase from "firebase";

export default {
    data: () => ({
        gameInfo: {
            gameId: null,
            entryCode: null,
            creator: null
        },
        entrycodeTemp: null,
        creatorName: null,
        codeCheckRequested: false,
        joiningPlayerName: null
    }),
    methods: {
        /**
         * app checks if such an entry code exists in the db
         */
        async checkGameCode(playerName, entryCode) {
            let testVar = 'second'
            var checkCode = fb.functions().httpsCallable('checkCode')
            testVar = await checkCode({playerJoined: playerName, entryCode: entryCode}).then(function(result) {
                // Read result of the Cloud Function.
                return {
                    creator: result.data.creator,
                    gameId: result.data.gameId
                }
            });
            
            // dummy
           /*  testVar = {
                creator: 'Petko',
                gameId: 'MKvFvmsxvguua5L98sIR'
            } */
            this.gameInfo.gameId = testVar.gameId
            this.gameInfo.creator = testVar.creator
            this.gameInfo.entryCode = entryCode
            console.log('testVar.creator: '+ testVar.creator)
        },


        async requestCodeCheck() {
            if(this.joiningPlayerName===null || this.entrycodeTemp.length !== 4) {
                // if the player hasn't typed in his name, nothing will hapen
                //
                // *TODO*  - some pretty form validation
                //
                return
            }
            this.codeCheckRequested = true
            console.log('joiningPlayerName: '+this.joiningPlayerName)
            await this.checkGameCode(this.joiningPlayerName, this.entrycodeTemp)
            console.log('this.gameInfo.gameId: '+this.gameInfo.gameId)
            this.addStartGameListener(this.gameInfo.gameId)
        },

        /**
         *  After successfully identifying with the creator, he should start a game. This functions listens for the creator to start the game
         */
        addStartGameListener(gameId){
            console.log("addStartGameListener, gameId: "+ gameId)
            this.startGameListener = fb.firestore().collection("active-games").doc(gameId+'')
                .onSnapshot(function(doc) {
                    if(doc.data()!==undefined) {
                        console.log('not undefined')
                        /**
                         * 
                         * TODO
                         */
                    } else {
                        console.log("Current data: ", doc.data());
                    }
                    
                });
        },

        detachStartGameListener(){
            console.log("detachStartGameListener")
            this.startGameListener()
        },

        closePopup() {
            this.$emit('close-join-game-popup')
            this.detachStartGameListener()
        }
    },
}
</script>