import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state = {
  sidebarShow: 'responsive',
  sidebarMinimize: false,
  userState: "",
    city: "",
    street: "",
    email: undefined,
    validation: undefined,
    progressNow: '0%',
    currentStep: 1,
    steps: {
      step1: {
        selectedClientPhone: null,
        selectedClientId: null,
      },
      step2: {
        pickUpLocationLat: null,
        pickUpLocationLng: null,
      },
      step3: {
        dropOffLocationLat: null,
        dropOffLocationLng: null,
      },
      step4: {},
      step5:{}
    },
}

const mutations = {
  toggleSidebarDesktop (state) {
    const sidebarOpened = [true, 'responsive'].includes(state.sidebarShow)
    state.sidebarShow = sidebarOpened ? false : 'responsive'
  },
  toggleSidebarMobile (state) {
    const sidebarClosed = [false, 'responsive'].includes(state.sidebarShow)
    state.sidebarShow = sidebarClosed ? true : 'responsive'
  },
  set (state, [variable, value]) {
    state[variable] = value
  },
  // Steps & Progress
  updateCurrentStep(state, payload) {
    state.currentStep = payload.currentStep
  },
  setProgress(state, payload) {
    state.progressNow = payload.progressNow + "%"
  },

  // Step 1
  setClient(state, payload) {
    state.steps.step1.selectedClientPhone = payload.selectedClientPhone
  },
  setClientId(state, payload) {
    state.steps.step1.selectedClientId = payload.selectedClientId
  },

  // Step 2
  setPickUpLocationLat(state, payload) {
    state.steps.step2.pickUpLocationLat = payload.pickUpLocationLat
  },
  setPickUpLocationLng(state, payload) {
    state.steps.step2.pickUpLocationLng = payload.pickUpLocationLng
  },

  // Step 3
  setDropOffLocationLat(state, payload) {
    state.steps.step3.dropOffLocationLat = payload.dropOffLocationLat
  },
  setDropOffLocationLng(state, payload) {
    state.steps.step3.dropOffLocationLng = payload.dropOffLocationLng
  }
}

export default new Vuex.Store({
  state,
  mutations
})