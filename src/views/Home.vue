<template>
 <div>

      <div class="container">
          <div class="row">
              <h4 class="text-center mb-5">SEARCH VIA VUE JS FILTER</h4>
              <router-link to="/searchhotelapi" class="text-center">Click to Search Via HaveMyRoom API</router-link>
          </div>
      </div>
   <div class="text-center mt-5">
          <label>Enter  Location</label>
      <vue-google-autocomplete
  ref="address"
    id="map"
    placeholder="Enter  Location"
    v-on:placechanged="getAddressData"
     >
</vue-google-autocomplete>
 <button class="btn btn-primary mt-3" @click="search_hotel"> Search Hotel</button>
  </div>
  <br /> <br />
 <template v-if="hotelsFiltered.length > 0">
   <div class="container">
            <div class="row p-b-20">
               <table
              class="table table-striped table-bordered table-hover table-checkable order-column full-width table-responsive-md"
              id="example4"
            >
              <thead>
                <tr>
                  <th>#</th>
                  <th>Hotel Name</th>
                  <th>City</th>
                  <th>Address</th>
                  <th>Star Rating</th>
                </tr>
              </thead>
                <tbody>
                <tr
                  class="odd gradeX"
                  v-for="(hotel, index) in hotelsFiltered"
                  :key="'hotels_' + index"
                >
                  <td>
                     {{ index + 1 }}

                  </td>
                  <td>{{ hotel.name }}</td>
                  <td>{{ hotel.city }}</td>
                   <td>{{ hotel.address }}</td>
                    <td>{{ hotel.star_rating }}</td>
                </tr>
                </tbody>
                </table>

            </div>
   </div>
 </template>

   <template v-else>
     <div class="container">
       <p>No Record Found</p>
     </div>

   </template>

 </div>
</template>

<script>
import VueGoogleAutocomplete from 'vue-google-autocomplete'
import { mapGetters } from 'vuex'
import UTIL from '../utils/Util'
export default {
  name: 'Home',
  data () {
    return {
      latitude: '',
      longitude: '',
      hotelsFiltered: []
    }
  },

  methods: {

    getAddressData: function (addressData) {
      this.latitude = addressData.latitude
      this.longitude = addressData.longitude
    },

    search_hotel () {
      const secondLon = parseFloat(this.longitude)
      const secondLat = parseFloat(this.latitude)
      if (!this.latitude) {
        alert('please select a location')
      } else if (!this.longitude) {
        alert('please select a location')
      } else {
        const filteredHotel = this.hotels[0].rakuten_hotels.filter(hotel => {
          const firstLat = parseFloat(hotel.latitude)
          const firstLon = parseFloat(hotel.longitude)

          const distance = UTIL.getDistanceFromLatLonInKm(firstLat, firstLon, secondLat, secondLon)
          if (distance <= 10) return hotel
        })
        this.hotelsFiltered = filteredHotel
        console.log(filteredHotel)
      }
    }
  },
  components: { VueGoogleAutocomplete },
  watch: {

    latitude: function (newVal) {
      if (newVal === '') {
        this.hotelsFiltered.length = 0
      }
    }
  },

  computed: {
    ...mapGetters({
      hotels: 'hotel/get_hotels'
    })

  },

  mounted () {
    this.$store.dispatch('hotel/fetch_hotels')
    this.$nextTick(() => {
      this.$refs.address.focus()
    })
  }
}
</script>
