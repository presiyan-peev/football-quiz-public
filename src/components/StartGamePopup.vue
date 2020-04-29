<template>
    <div class="start-game-popup px-3">
        <!-- <div class="name-input">
            <span class="name-input-field">
                <v-text-field
                    v-model="creatorName"
                    label="Име"
                    class="pt-2"
                    outlined
                ></v-text-field>
            </span>
            <span class="name-input-button">
                <div class="mb-2">
                    <v-btn 
                        depressed 
                        medium 
                        :disabled="codeRequested" 
                        @click="requestCode()" 
                        class="info "
                    >
                        Вземи Код
                    </v-btn>
                </div>
            </span>
        </div>
        <div v-show="codeRequested">Изпрати кода на свой приятел:
            <p>{{ gameInfo.entryCode === null ? gameInfo.placeholder : gameInfo.entryCode }}</p>
        </div>
        <div v-show="isPlayerJoined">
            {{ playerJoined }} се присъедини
            <v-btn depressed small class="start-game-btn">
                Започни играта
            </v-btn>
        </div>-->
        Sorry lad,... Все още няма мултиплеър за тази игра
        <v-btn class="close-startgame-dialog" @click="closePopup()">Затвори</v-btn> 
    </div>
</template>

<script>
import fb from '@/fb'
//import firebase from "firebase";

export default {
    data() {
        return {
            gameInfo: {
                placeholder: ">>изчакай секунда да се генерира кодът<<",
                gameId: null,
                entryCode: null,
                creator: null
            },
            codeRequested: false,
            creatorName: null,
            unsubscribe: null,
        }
        
    },
    computer: {
        playerJoined() {
            return this.docRef.playerJoined
        },
        isPlayerJoined() {
            return this.docRef.isPlayerJoined
        }
    },
    methods: {
        async retrieveGameId(creatorName) {
            let testVar = 'second'
            var getEntryCode = fb.functions().httpsCallable('getEntryCode')
            testVar = await getEntryCode({creator: creatorName}).then(function(result) {
                // Read result of the Cloud Function.
                return {
                    entryCode: result.data.entryCode,
                    gameId: result.data.gameId
                }
            });
            this.gameInfo.gameId = testVar.gameId
            this.gameInfo.entryCode = testVar.entryCode
            this.gameInfo.creator = creatorName
        },

        //dummy
        /* retrieveGameId(s) {
            console.log(s)
            this.gameInfo.gameId = 'testVar.gameId'
            this.gameInfo.entryCode = 'testVar.entryCode'
            this.gameInfo.creator = s
        }, */

        async requestCode() {
            if(this.creatorName===null) {
                return
            }
            this.codeRequested = true
            await this.retrieveGameId(this.creatorName)
            this.waitForOtherPlayer(this.gameInfo.gameId)
        },

        /**
         *  After receiving the game code, the user sends it to his friend via outside IM, afterwards the app starts listening for the other player to join
         */
        waitForOtherPlayer(gameId){
            this.unsubscribe = fb.firestore().collection("active-games").doc(gameId+'').onSnapshot(async function(doc) {
                if(doc.data()!== undefined) {
                    if(doc.data().playerJoined !== null && doc.data().playerJoined !== undefined) {
                        this.playerJoined = doc.data().playerJoined
                        console.log('1st this.playerJoined: '+this.playerJoined)
                        this.isPlayerJoined = true
                        console.log(this)
                        console.log(typeof this)
                    }
                } else {
                    console.log("Current data: ", doc.data());
                }
                return
            });
        },

        //dummy
       /*  waitForOtherPlayer(g){
            console.log(g)
            setTimeout(() => {
                this.setJoinedPlayer("slabak")
            }, 2000)
        }, */

        setJoinedPlayer(playerName) {
            this.playerJoined = playerName
            this.isPlayerJoined = true
        },

        detachOtherPlayerListener(){
            console.log("detachOtherPlayerListener")
            this.unsubscribe()
        },

        closePopup() {
            //this.detachOtherPlayerListener()
            this.$emit('close-start-game-popup')
        }
    },
    created() {

    }
}
</script>