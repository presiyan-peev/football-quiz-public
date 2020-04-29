<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
      flat
    >
      <v-icon @click="$router.push('/')">home</v-icon>

      <v-spacer></v-spacer>

      <span class="mr-2">Вкарай Топката</span>
      
    </v-app-bar>

    <v-content >
        <v-container
          class="app-container fill-height"
          fluid
        >
          <v-row
            align="center"
            justify="center"
          >
            <v-col
              cols="12"
              sm="8"
              md="6"
            >
              <router-view></router-view>
            </v-col>
          </v-row>
        </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',


  data: () => ({
    //
  }),
};
</script>

<style>
.app-container {
  margin-top: -120px,
}
</style>