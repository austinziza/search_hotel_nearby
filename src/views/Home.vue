<template>
 <div>

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
                </table>

            </div>
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

    deg2rad: function (deg) {
      return deg * (Math.PI / 180)
    },

    getDistanceFromLatLonInKm: function (lat1, lon1) {
      var R = 6371 // Radius of the earth in km
      var dLat = this.deg2rad(parseFloat(this.latitude) - lat1) // deg2rad below
      var dLon = this.deg2rad(parseFloat(this.longitude) - lon1)
      // var lat1 = this.deg2rad(lat1)
      // var lat2 = this.deg2rad(lat2)
      const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(parseFloat(this.latitude))) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
      // Distance in km
      return R * c
    },

    getAddressData: function (addressData) {
      this.latitude = addressData.latitude
      this.longitude = addressData.longitude
    },

    search_hotel () {
      var secondLon = parseFloat(this.longitude)
      var secondLat = parseFloat(this.latitude)
      if (!this.latitude) {
        alert('please select a location')
      } else if (!this.longitude) {
        alert('please select a location')
      } else {
        console.log('getArray', this.hotels)
        console.log('latitude', this.latitude)
        console.log('longitude', this.longitude)
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
