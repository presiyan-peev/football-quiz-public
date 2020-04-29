This is how you register for the Tik Tok game (e-mail plus e-mail adress)

<template>
    <v-form
      ref="form"
      v-model="isValid"
    >
      <v-text-field
        v-model="name"
        :counter="33"
        :rules="nameRules"
        label="Напиши твоя отговор тук"
        required
      ></v-text-field>

      <v-text-field
        v-model="email"
        :rules="emailRules"
        label="Твоя имейл адрес"
        required
      ></v-text-field>

      <v-select
        v-model="select"
        :items="items"
        :rules="[v => !!v || 'Не си отговорил..']"
        label="На колко си години?"
        required
      ></v-select>

      <v-checkbox
        v-model="checkbox"
        :rules="[v => !!v || 'Трябва да се съгласиш, за да продължиш!']"
        label="Според разпоредбите на GDPR, те уведомявам, че ще съхранявам твоя имейл адрес, с цел обратна връзка, и твоите години, за статистически данни."
        required
      ></v-checkbox>
      
      <div id="recaptcha"></div>
      
      <div class="submit-btn">
        <v-btn
          :disabled="!enableSubmit()"
          color="success"
          class="mr-4"
          @click="submit"
        >
          Изпрати отговор
        </v-btn>
      </div>
    </v-form>
</template>

<script>
import fb from '@/fb'
import firebase from "firebase";

import { mapGetters, mapActions } from "vuex";

export default {
    data: () => ({
      age: 13,
      isValid: false,
      recaptchaVerifier: false,
      name: '',
      nameRules: [
        v => !!v || 'Отговорът е задължителен',
        v => (v && v.length <= 33) || 'Не повече от 33 символа, моля',
      ],
      email: '',
      emailRules: [
        v => !!v || 'Имейлът е задължителен',
        v => /.+@.+\..+/.test(v) || 'Имейлът нещо е неправилен',
      ],
      select: null,
      items: [
        '<13',
        '13',
        '14',
        '15',
        '16',
        '17',
        '18',
        '19',
        '20',
        '21',
        '22',
        '23',
        '24',
        '25',
        '26',
        '27',
        '28',
        '29',
        '30',
        '30+',
      ],
      checkbox: false,
    }),

    computed: {
    ...mapGetters([
        "showResultForm",
    ]),
  },

  methods: {
    ...mapActions(['setEmail', 'setAge', 'toggle_Result_Form']),

    enableSubmit() {
      return this.isValid && this.recaptchaVerifier
    },
    submit () {
      let answer = {
        answer: this.name,
        email: this.email,
        age: this.select,
        timestamp: new Date()
      };

      fb.firestore().collection('firstAnswers').add(answer).then(() => {
        console.log('added to db');
        this.setEmail(this.email);
        this.setAge(this.age);
        this.toggle_Result_Form();
      })
    },

    renderCaptcha() {
      window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha', {
      'callback': (response) => {
        console.log("response");
        console.log(response);
        this.recaptchaVerifier = true;
        console.log("this.recaptchaVerifier:"+this.recaptchaVerifier);
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        // ...
      },
      'expired-callback': () => {
        this.recaptchaVerifier = false;
        // Response expired. Ask user to solve reCAPTCHA again.
        // ...
      }
    })
    window.recaptchaVerifier.render()
    }
  },

  mounted() {
    this.renderCaptcha()
  }
}
</script>