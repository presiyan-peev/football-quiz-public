const state = {
    email: '',
    age: 12,
    showResultForm: false
}

const getters = {
    getEmail: (state) => state.email,
    getAge: (state) => state.age,

    // manages active components on SpecialGame view
    showResultForm: (state) => state.showResultForm,
}
const mutations = {
    SET_EMAIL(state, val) {
        state.email = val
    },
    SET_AGE(state, val) {
        state.age = val
    },
    TOGGLE_RESULT_FORM(state) {
        state.showResultForm = !state.showResultForm
    },
}
const actions = {
    setEmail({ commit }, value) {
        commit('SET_EMAIL', value)
    },
    setAge({ commit }, value) {
        commit('SET_AGE', value)
    },
    toggle_Result_Form({ commit }) {
        console.log('TOGGLE_RESULT_FORM')
        commit('TOGGLE_RESULT_FORM')
    },
}

export default {
    state,
    getters,
    actions,
    mutations
}