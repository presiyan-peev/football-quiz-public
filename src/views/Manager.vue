<template>
    <v-container>
        <v-form
            ref="form"
            v-model="isValid"
            >
            <v-text-field
                v-model="id"
                :counter="12"
                :rules="idRules"
                label="ID на футболист"
                required
            ></v-text-field>

            <v-text-field
                v-model="name"
                :counter="33"
                label="Име на футболист"
            ></v-text-field>

            <v-text-field
                v-model="currentClub"
                label="Настоящ отбор"
            ></v-text-field>

            <v-text-field
                v-model="imgSrc"
                label="Линк към снимка"
            ></v-text-field>

            <v-select
                v-model="teamMates"
                :items="allFootballers"
                item-text="name"
                item-value="id"
                :rules="[v => !!v || 'Не си отговорил..']"
                label="Кои са били съотборници"
                multiple
            ></v-select>
            
            <div class="submit-btn">
                <v-btn
                    color="success lighten-1"
                    class="mr-4"
                    @click="submitNewPlayer"
                    depressed
                    tile
                >
                    Създай футболист
                </v-btn>
            </div>
            <div class="submit-btn mt-2">
                <v-btn
                    color="warning"
                    class="mr-4"
                    @click="addTeamMate"
                    depressed
                    tile
                >
                    Добави съотборник
                </v-btn>
            </div>
        </v-form>

        <div class="text-center ma-2">
            <v-snackbar
                v-model="postSuccess"
                :timeout="3333"
                color="success lighten-2"
                depressed
            >
            {{ postSuccessMsg }}
            <v-btn
                color="success lighten-4"
                text
                @click="postSuccess = false"
            >
                Затвори
            </v-btn>
            </v-snackbar>
        </div>
      
        <v-overlay :value="errorDialog" opacity="0.8">
            <v-container>
                <v-row
                    align="center"
                    justify="center"
                >
                    <v-col
                        align="center"
                        justify="center"
                        cols="12"
                        sm="8"
                        md="9"
                    >   
                        <v-card-title 
                            style="word-break: break-word" 
                            class="error-msg"
                            color="error darken-1"
                        >
                            {{ errorMsgTitle }}
                        </v-card-title>

                        <v-card-text 
                            style="word-break: break-word" 
                            class="error-msg"
                            color="error darken-1"
                        >
                            {{ errorMsg }}
                        </v-card-text>

                        <div class="close-error-dialog-btn">
                            <v-btn
                                icon
                                @click="errorDialog = false"
                            >
                                <v-icon color="error lighten-4">mdi-close</v-icon>
                        </v-btn>
                        </div>
                    </v-col>
                </v-row>
            </v-container>
        </v-overlay>
    </v-container>
</template>

<script>
import fb from '@/fb'
//import firebase from "firebase";

export default {
    data: () => ({
        isValid: false,
        id: '',
        idRules: [
            v => !!v || 'ID е задължително',
            v => (v && v.length <= 12) || 'Не повече от 12 символа, моля',
        ],
        
        name: '',
        currentClub: '',
        imgSrc: '',
        allFootballers: [],
        teamMates: [],
        errorDialog: false,
        errorMsgTitle: 'Хей, това е забранена зона.',
        errorMsg: 'Само администратор може да променя базата данни ;)',
        postSuccess: false,
        postSuccessMsg: 'Футболистът добавен успешно',
    }),

    methods: {
        submit() {
            this.postSuccess = true
        },
        submitNewPlayer() {
            if(!this.$refs.form.validate()) {
                return
            }
            fb.firestore().collection('footballers').doc(this.id).set({
                name: this.name,
                currentClub: this.currentClub,
                teamMates: this.teamMates,
                imgSrc: this.imgSrc,
                teamMatesCount: this.teamMates.length
            }).then(() => {
                this.id = ''
                this.name = ''
                this.currentClub= ''
                this.imgSrc = ''
                this.teamMates = []
                this.postSuccess = true
            })
            .catch((error) => {
                console.error("Error writing document: ", error.code)
                if(error.code === "permission-denied") {
                    this.errorDialog = true
                }
                
            });
        },

        addTeamMate() {
            var updateTeamMates = fb.functions().httpsCallable('updateTeamMates')
            updateTeamMates({playerID: this.id, teamMates: this.teamMates}).then(function() {
                // Read result of the Cloud Function.
                console.log("updated")
            });
        },

    },

    created() {
        fb.firestore().collection('footballers').onSnapshot(res => {
            const changes = res.docChanges();
            changes.forEach(change => {
                if (change.type === 'added') {
                this.allFootballers.push({
                    ...change.doc.data(),
                    id: change.doc.id
                })
                }  
            })
        })
    }
}
</script>

<style>

</style>