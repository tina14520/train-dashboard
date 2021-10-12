<template>
 <FormulateForm
  v-model="fields"
>
  <FormulateInput
    type="text"
    name="name"
    label="Your name"
  />
  <FormulateInput
    type="group"
    name="address"
  >
    <FormulateInput
      type="text"
      name="address"
      label="Street address"
    />
    <FormulateInput
      type="text"
      name="city"
      label="City"
    />
    <FormulateInput
      type="select"
      name="state"
      label="State"
      :options="{VA: 'Virginia', CA: 'California', NY: 'New York'}"
    />
  </FormulateInput>
</FormulateForm>
</template>
<script>
import DirectionsRenderer from "./DirectionsRenderer";
import { de } from '@braid/vue-formulate-i18n'

// import {FormulateForm,FormulateInput} from '@braid/vue-formulate'
export default {
  name: "StandardButtons",
   plugins: [de],
  locale: 'de',
  rules: {
    foobar: ({ value }) => ['foo', 'bar'].includes(value)
  },
  components: {
    DirectionsRenderer,
    // FormulateForm,
    // FormulateInput
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
