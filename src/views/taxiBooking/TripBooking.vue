<template>
  <!-- <CCardHeader>
        <h2>Routes Google Maps</h2> 
      </CCardHeader> -->
  <CCol>
    <CCard class="bcard">
      <CCardHeader> <strong>Trip</strong> Booking </CCardHeader>
      <CCardBody>
        <input class="c" type="text" placeholder="Client Name" />
        <input class="c" type="phone" placeholder="Client Phone Number" />
        <!-- <GmapAutocomplete
          class="ma"
          placeholder="Start point"
          @place_changed="setPlace"
          @change="addMarker(0)"
        />
        <GmapAutocomplete
          class="ma"
          placeholder="End point"
          @place_changed="setPlace"
          @change="addMarker(1)"
        /> -->
      </CCardBody>
      <CCardFooter>
        <CButton type="submit" size="sm" color="success"
          ><CIcon name="cil-check-circle" />Search for Drivers</CButton
        >
      </CCardFooter>
      <h2>Autocomplete Google Maps</h2>
      <GmapAutocomplete @place_changed="setPlace" :bounds="center"/>
      <button class="btn" @click="addMarker">Add</button>
      <GmapMap
        :center="center"
        :zoom="12"
        style="width: 100%; height: 400px; margin-top: 20px"
        @click="addMark"
      >
        <GmapMarker
          :key="index"
          v-for="(m, index) in markers"
          :position="m.position"
          :clickable="true"
          :draggable="true"
          @click="center = m.position"
        />
        <!-- <GmapMarker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        @click="centerPosition(m.position)"
      /> -->
      </GmapMap>
    </CCard>
  </CCol>
</template>
<script>
import DirectionsRenderer from "./DirectionsRenderer";
export default {
  name: "StandardButtons",
  components: {
    DirectionsRenderer,
  },
  data() {
    return {
      center: {
        lat: 15.5927666,
        lng: 32.5522355,
      },
      currentPlace: null,
      markers: [],
      places: [],
      startLocation: null,
      endLocation: null,
    };
  },
  methods: {
    addMark(event) {
      if(this.markers.length == 0 || this.markers.length == 1) {
        const marker = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
        title: "Pick Up",
      };
      this.markers.push({ position: marker, title: "Pick up",infoText: "Pick up", opacity: .3 });
      console.log(this.markers.length)
      }
      // console.log(event.latLng.lat());
      // console.log(event.latLng.lng());
      
    },
    clearmarkers() {
      this.markers = []
    },
    centerPosition(newCenter) {
      console.log(this.currentPlace);
    },
    setPlace(place) {
      this.currentPlace = place;
      const pp = {
        lat: this.currentPlace.geometry.location.lat(),
        lng: this.currentPlace.geometry.location.lng(),
      };
      this.center = pp;

      // this.addMarker(index)
    },
    addMarker() {
      console.log(this.currentPlace);
      if (this.currentPlace) {
        const marker = {
          lat: this.currentPlace.geometry.location.lat(),
          lng: this.currentPlace.geometry.location.lng(),
        };
        // this.markers.push({ position: marker });
        this.center = marker;
        this.currentPlace = null;
      }
    },
  },
};
</script>
<style>
.ma {
  width: 40%;
  height: calc(1.5em + 0.75rem + 2px);
  padding: 0.375rem 0.75rem;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  background-clip: padding-box;
  border: 1px solid;
  color: #768192;
  background-color: white;
  border-color: #d8dbe0;
  border-radius: 0.25rem;
  margin-right: 0.5rem;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}
.c {
  display: inline;
  width: 40%;
  height: calc(1.5em + 0.75rem + 2px);
  padding: 0.375rem 0.75rem;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  background-clip: padding-box;
  border: 1px solid;
  color: #768192;
  background-color: white;
  border-color: #d8dbe0;
  border-radius: 0.25rem;
  margin-right: 0.5rem;
}
.bcard {
  width: 100%;
  margin-top: 0rem;
  padding: 0rem 0rem 0rem 0rem;
}
</style>
