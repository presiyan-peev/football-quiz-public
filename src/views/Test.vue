testing random shitz

<template>
    <div class="test">
        <v-btn @click="generateQuestion">generateQuestion</v-btn>
        <div v-for="id in allIds" :key="id">
            {{ id }}
        </div>
        
    </div>
</template>

<script>
import fb from '@/fb'

export default {
    data: () => ({
        allIds: [],
    }),
    methods: {
        async fetchDocs() {
            await fb.firestore().collection('footballers')
            .get()
            .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.id);
                    
                });
            })
            this.allIds.forEach(id => {
                console.log(id)
            })
        },
        generateQuestion() {
            /**
             * array containing 3 random indexes thath will be used to get 3 random IDs off te footballersIDs array
             */
            var randomIDArr = []
            while(randomIDArr.length !== 3) {
                let random = Math.floor(Math.random()* this.footballersIDs.length)
                if(!randomIDArr.includes(random)) {
                    randomIDArr.push(random)
                    fb.firestore().collection('footballers')
                    .get(this.footballersIDs[random])
                    .then(function(querySnapshot) {
                        querySnapshot.forEach(function(doc) {
                            // doc.data() is never undefined for query doc snapshots
                            console.log(doc.id);
                            
                        });
                    })
                }
            }
            
        },
    }
}
</script>

<style>

</style>