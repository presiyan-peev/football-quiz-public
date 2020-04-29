<template>
    <v-container flat class="image-card">
        <v-img
            :src="player.imgSrc"
            class="white--text align-end"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
        >
        </v-img>
        <v-card-title v-text="player.name" style="word-break: break-word" class="body-2 ma-0 pa-0 text-wrap"></v-card-title>
        <v-card-text v-text="player.currentClub" class="caption ma-0 pa-0 text-wrap"></v-card-text>
    </v-container>
</template>

<script>
export default {
    data: () => ({

    }),
    props: {
        player: Object
    },

}
</script>
