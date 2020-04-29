<template>
    <v-container class="pa-1">
      <v-row no-gutters>
        <v-col
          cols="2"
          xs="2"
          sm="2">
          <v-avatar
              class="ma-0"
              size="25"
              tile
            >
              <v-img :src="player.imgSrc" contain></v-img>
            </v-avatar>
        </v-col>
        <v-col
          cols="10"
          xs="10"
          sm="10"
          class="pa-0">
          <span class="d-flex flex-no-wrap justify-space-between">
            <div>
              <v-card-text class="overline pa-0 ml-2"
                v-text="player.name"
              ></v-card-text>
            </div>
          </span>
        </v-col>
      </v-row>
    </v-container>
</template>

<script>
export default {
    props: ['player'],
}
</script>