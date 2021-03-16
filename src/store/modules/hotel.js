
const state = {
  hotels: []
}

const getters = {
  get_hotels: (state) => state.hotels
}

const mutations = {
  set_hotels (state, payload) {
    state.hotels = payload
  },

  resetState (state) {
    state.hotels = []
  }
}

const actions = {
  async fetch_hotels ({ state }) {
    fetch('hotel.json').then(response => response.json())
      .then(result => {
        const hotel = []
        hotel.push(result)
        state.hotels = hotel
        // console.log('this is hotels', result)
      })
      .catch(err => {
        console.log(err)
      })
  },

  resetState ({ commit }) {
    commit('resetState')
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
