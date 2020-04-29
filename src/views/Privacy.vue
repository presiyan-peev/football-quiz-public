<template>
    <div>
        <v-card>
            <v-card-title>
                Условия за ползване. GDPR
            </v-card-title>
            <v-card-text>
                <p>Аз, Пресиян Пеев, създател и собственик на www.vkarai-topkata.eu, събирам личните данни на участващите в организираните игри на сайта.</p>
                <v-list>
                    <v-subheader>Събираните лични данни са</v-subheader>
                    <v-list-item-group v-model="item" color="primary">
                        <v-list-item
                        v-for="(item, i) in items"
                        :key="i"
                        >
                        <v-list-item-icon>
                            <v-icon v-text="item.icon"></v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title v-text="item.title"></v-list-item-title>
                            <v-list-text v-text="item.text"></v-list-text>
                        </v-list-item-content>
                        </v-list-item>
                    </v-list-item-group>
                </v-list>
                <p>Данните се съхраняват на високо защитената инфраструктура на Google Cloud посредством услугата Google Firebase.</p>
                <p>Данните няма да бъдат предоставяни на трети лица или фирми.</p>
                <p>Ако желаеш, мога да изтрия твоите данни, след като ме уведомиш за своето желание на имейл pressijan@gmail.com</p>
                <p>Ако не бъде получена такава молба, си запазвам правото да съхранявам данните до 3 години след попълването им.</p>

                <p>Правя играта с цел забавление, така че не очаквай да си правя някакви гаври с имейла ти :) </p>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
  export default {
    data: () => ({
      item: 1,
      items: [
        { title: 'имeйл', icon: 'mdi-email', text: 'за да те информирам за резултатите от настоящата игра, както и за бъдещи такива' },
        { title: 'възраст', icon: 'mdi-account', text: 'за статистически данни' },
      ],
    }),
  }
</script>