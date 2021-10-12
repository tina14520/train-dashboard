<template>
  <section>
    <input
      id="pac-input"
      class="controls"
      type="text"
      placeholder="Search Box"
    />
    <div id="map" ref="map"></div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      map: null,
      center: {
        lat: 15.5927666,
        lng: 32.5522355,
      },
      currentPlace: null,
      markers: [],
      places: [],
      startLocation: null,
      endLocation: null,
      pickUp: undefined
    };
  },
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      this.pickUp = { lat: 15.6315705, lng: 32.4311799 };
      this.map = new window.google.maps.Map(this.$refs["map"], {
        center: { lat: 15.6315705, lng: 32.4311799 },
        zoom: 15,
      });
      this.map.addListener("click", (mapsMouseEvent) => {
        this.addMarker(mapsMouseEvent.latLng);
      });

      // Create the search box and link it to the UI element.
      const input = document.getElementById("pac-input");
      const searchBox = new google.maps.places.SearchBox(input);

      this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

      this.map.addListener("bounds_changed", () => {
        searchBox.setBounds(this.map.getBounds());
      });

      this.markers = [];

      searchBox.addListener("places_changed", () => {
        const places = searchBox.getPlaces();

        if (places.length == 0) {
          return;
        }
        // Clear out the old markers.
        this.markers.forEach((marker) => {
          marker.setMap(null);
        });
        this.markers = [];
        const bounds = new google.maps.LatLngBounds();
        places.forEach((place) => {
          if (!place.geometry || !place.geometry.location) {
            console.log("Returned place contains no geometry");
            return;
          }

          // const icon = {
          //   url: place.icon,
          //   size: new google.maps.Size(71, 71),
          //   origin: new google.maps.Point(0, 0),
          //   anchor: new google.maps.Point(17, 34),
          //   scaledSize: new google.maps.Size(25, 25),
          // };
          // Create a marker for each place.
          // this.markers.push(
          //   new google.maps.Marker({
          //     map,
          //     icon,
          //     title: place.name,
          //     position: place.geometry.location,
          //   })
          // );
          if (place.geometry.viewport) {
            // Only geocodes have viewport.
            bounds.union(place.geometry.viewport);
          } else {
            bounds.extend(place.geometry.location);
          }
        });
        this.map.fitBounds(bounds);
      });

      // console.log(this.pickUpMarker.getPosition().lat());
      // console.log(this.pickUpMarker);
    },
    addMarker(coords) {
      this.deleteMarkers();
      var pickUpMarker = new google.maps.Marker({
        position: coords,
        map: this.map,
        draggable: false,
        title: "Pick Up",
        label: "Pick Up",
        animation: google.maps.Animation.DROP,
      });
      this.pickUpLocationLat = pickUpMarker.getPosition().lat();
      this.pickUpLocationLng = pickUpMarker.getPosition().lng();
      this.markers.push(pickUpMarker);
    },
    setPlace(place) {
      this.currentPlace = place;
      // this.addMarker(index)
    },
    setMapOnAll(map) {
      for (let i = 0; i < this.markers.length; i++) {
        this.markers[i].setMap(map);
      }
    },
    hideMarkers() {
      this.setMapOnAll(null);
    },
    deleteMarkers() {
      this.hideMarkers();
      this.markers = [];
    },
    addSMarker(index) {
      const marker = {
        lat: this.currentPlace.geometry.location.lat(),
        lng: this.currentPlace.geometry.location.lng(),
      };
      if (index === 0) this.startLocation = marker;
      if (index === 1) this.endLocation = marker;
      console.log("select");
      this.center = marker;
    },
  },
};
</script>

<style scoped>
#map {
  height: 600px;
  background-color: grey;
  width: 100%;
}
</style>
