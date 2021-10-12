<template>
  <div>
   
      <sweet-modal ref="mapModal" title="Trip path">
        <div id="map" ref="map"></div>
      </sweet-modal>
      <sweet-modal ref="infoModal" title="Details">
        <div class="info-modal" v-if="infoModalTrip">
          <!-- {{ infoModalTrip }}  -->
          <div class="info-group">
            <h2>
              Client
            </h2>
            <div class="info-row">
              <span class="info-key">Client id: </span>
              <span class="info-value"> {{ infoModalTrip.client._id }}</span>
            </div>

            <div class="info-row">
              <span class="info-key">Client name: </span>
              <span class="info-value"> {{ infoModalTrip.client.name }}</span>
            </div>

            <div class="info-row">
              <span class="info-key">Client phone: </span>
              <span class="info-value"> {{ infoModalTrip.client.phone }}</span>
            </div>

            <div class="info-row">
              <span class="info-key">Client name: </span>
              <span class="info-value"> {{ infoModalTrip.client.name }}</span>
            </div>
          </div>

          <hr />

          <div class="info-group">
            <h2>
              Driver
            </h2>
            <div class="info-group-body" v-if="infoModalTrip.driver">
              <div class="info-row">
                <span class="info-key">Driver id: </span>
                <span class="info-value"> {{ infoModalTrip.driver._id }}</span>
              </div>

              <div class="info-row">
                <span class="info-key">Driver name: </span>
                <span class="info-value"> {{ infoModalTrip.driver.name }}</span>
              </div>

              <div class="info-row">
                <span class="info-key">Driver phone: </span>
                <span class="info-value">
                  {{ infoModalTrip.driver.phone }}</span
                >
              </div>
            </div>

            <div class="no" v-if="!infoModalTrip.driver">
              <span>No driver accepted</span>
            </div>
          </div>

          <hr />

          <div class="info-group">
            <h2>
              Trip
            </h2>
            <div class="info-row">
              <span class="info-key">Pick up location: </span>
              <span class="info-value"> {{ infoModalTrip.addFrom }}</span>
            </div>

            <div class="info-row">
              <span class="info-key">Drop off location: </span>
              <span class="info-value"> {{ infoModalTrip.addTo }}</span>
            </div>

            <div class="info-row">
              <span class="info-key">Price: </span>
              <span class="info-value"> {{ infoModalTrip.price }} SDG</span>
            </div>

            <div class="info-row">
              <span class="info-key">Estimated duration: </span>
              <span class="info-value"> {{ infoModalTrip.duration }}</span>
            </div>

            <div class="info-row">
              <span class="info-key">Distance: </span>
              <span class="info-value"> {{ infoModalTrip.distance }}</span>
            </div>
          </div>
        </div>
      </sweet-modal>
    
    <CCardBody class="tab">
      <div class="u" v-if="trips">
        <CDataTable
          :items="trips"
          :fields="fields"
          column-filter
          table-filter
          items-per-page-select
          :items-per-page="5"
          striped
          border
          small
          fixed
          hover
          sorter
          pagination
          class="font-weight-bold"
        >
        <template #passenger="{item}">
      <td>
          {{item.client.name}}
      </td>
    </template>
    <!-- <template #driver="{item}">
      <td>
         
         <span v-if="item.driver">{{item.driver.name}}</span>
        <span v-else class="sp">-</span>
          
      </td>
    </template>-->
      <template #show_details="{ item, index }">
        <td class="py-2">
              <CButton
                color="primary"
                variant="outline"
                square
                size="sm"
                @click="toggleDetails(item, index)"
              >
                {{ Boolean(item._toggled) ? "Hide" : "Details" }}
              </CButton>
            </td>
          </template>
          <template #details="{ item }">
            <CCollapse :show="Boolean(item._toggled)">
              <CCardBody>
                <CMedia :aside-image-props="{ height: 102 }">
                  <h4>
                    {{ item.username }}
                  </h4>
                  <p class="text-muted">User since: {{ item.registered }}</p>
                  <CButton size="sm" color="info" class="">
                    User Settings
                  </CButton>
                  <CButton size="sm" color="danger" class="ml-1">
                    Delete
                  </CButton>
                </CMedia>
              </CCardBody>
            </CCollapse>
          </template>
        </CDataTable>
      </div>
    </CCardBody>
  </div>
</template>

<script>
import DataTable from "vue-materialize-datatable";
import "vue-datepicker-ui/lib/vuedatepickerui.css";
import VueDatepickerUi from "vue-datepicker-ui";
import { SweetModal } from "sweet-modal-vue";
import axios from "axios";
const fields = [
  "passenger",
  "driver",
  {
    key: "addFrom",
    label: "From",
    _classes: "font-weight-bold",
  },
  {
    key: "addTo",
    label: "To",
    _classes: "font-weight-bold",
  },
  {
    key: "duration",
    label: "Duration",
    _classes: "font-weight-bold",
  },
  {
    key: "price",
    label: "Price",
    _classes: "font-weight-bold",
  },
];
// const items= trips
export default {
  created() {
    this.refreshData();
    this.getTestData();
    this.getAllTrips();
  },
  name: "TripTracking",
  components: {
    Datepicker: VueDatepickerUi,
    // VueSkeletonLoader,
    datatable: DataTable,
    SweetModal,
    // SweetModalTab,
  },
  data() {
    return {
      numberOfLiveTrips: undefined,
      numberOfTripsCost: undefined,
      numberOfCancelledTrips: undefined,
      numberOfOnlineDrivers: undefined,
      numberOfCompletedTrips: undefined,
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTU3NmI0NDAwZTlmMjZjMDgwMDdhMDEiLCJpYXQiOjE2MzMxMTkwNTcsImV4cCI6MTk0ODQ3OTA1N30.YVVv0qfttUBQgpmUcfMISg3odM3AthSDaRW-l0ELcBI",
      i: 0,
      fields,
      isConnected: false,
      socketMessage: "",
      drivers: [],
      trips: [],
      items:[],
      // map: null,
      apiLoading: Boolean,
      apiError: undefined,
      infoModalTrip: undefined,
      searchById: "",
      searchByName: "",
    };
  },
  computed: {
    computedItems() {
      return this.trips.map((item) => ({
          ...trip,
          name: item.client.name,
          driverName: item.driver.name,
      }),
            console.log("this client")
)
    },
    csvData() {
      return this.trips.map((item) => ({
        ...item,
        From: item.addfrom,
        To: item.addto,
        Duration: item.duration,
        Price: item.price,
        Driver: item.driver,
        Passenger: item.client,
      }));
    },
    // dateFilteredItems() {
    //   return this.computedItems.filter(item => {
    //     const date = item.registeredTimestamp
    //     return date >= this.startDate && date <= this.endDate
    //   })
    // }
  },
  methods: {
    tr() {
      return this.trips.map((trip) => {
        console.log(trip._id);
        return {
          ...trip,
          cl: trip.client.name,
          driverName: trip.driver.name,
        };
      });
    },
    	print() {
				const clonedTable = this.$refs.table.cloneNode(true);
				this.synchronizeCssStyles(this.$refs.table, clonedTable, true);
				clonedTable.style.maxWidth = '100%';
				clonedTable.style.boxShadow = '0px 0px 0px 1px rgba(0,0,0,0.2)';
				clonedTable.style.margin = '8px auto';
				clonedTable.querySelector('.actions').remove();
				clonedTable.querySelector('.material-pagination').remove();
				clonedTable.querySelector('.datatable-length').remove();
				clonedTable.querySelectorAll('button').forEach(n => n.remove());
				let win = window.open('', '');
				win.document.body.style.fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif';
				win.document.body.innerHTML = (clonedTable.outerHTML);
				win.print();
				win.close();
			},

    getCardsInfo() {
      console.log(this.numberOfLiveTrips);
      axios
        .get(
          "https://alsayar-backend-vwmk7.ondigitalocean.app/api/trip/stats",
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        )

        .then((response) => {
          this.numberOfLiveTrips = response.data.activeTrips;
          this.numberOfTripsCost = response.data.totalTodayPrice;
          this.numberOfCompletedTrips = response.data.completedToday;
          this.numberOfCancelledTrips = response.data.canceledTrips;
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getTestData() {
      axios
        .get("https://jsonplaceholder.typicode.com/todos/1")
        .then((res) => {
          console.log("Test res");
          console.log(res);
        })
        .catch((err) => {
          console.log("Test err");
          console.log(err.response);
        });
    },
    getNumberOfOnlineDrivers() {
      axios
        .get(
          "https://alsayar-backend-vwmk7.ondigitalocean.app/api/admin/reports/online_drivers",
          {
            headers: { Authorization: `Bearer ${this.token}` },
          }
        )
        .then((response) => {
          this.numberOfOnlineDrivers = response.data.online_drivers;
          console.log(response.data.online_drivers);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    resetData() {
      numberOfLiveTrips = undefined;
      numberOfTripsCost = undefined;
      numberOfCancelledTrips = undefined;
      numberOfOnlineDrivers = undefined;
      numberOfCompletedTrips = undefined;
    },
    refreshData() {
      this.getCardsInfo();
      this.getNumberOfOnlineDrivers();
    },
    showMapModal(trip) {
      this.initMap(trip);
      this.$refs.mapModal.open();
    },
    showInfoModal(trip) {
      this.infoModalTrip = trip;
      this.$refs.infoModal.open();
    },

    // Map functions
    initMap(trip) {
      const directionsRenderer = new google.maps.DirectionsRenderer();
      const directionsService = new google.maps.DirectionsService();
      const {
        pickup_location_lat,
        pickup_location_lng,
        dropoff_location_lat,
        dropoff_location_lng,
      } = trip;
      var map = new window.google.maps.Map(this.$refs["map"], {
        center: {
          lat: parseFloat(dropoff_location_lat),
          lng: parseFloat(dropoff_location_lng),
        },
        zoom: 12,
      });

      directionsRenderer.setMap(map);
      this.calculateAndDisplayRoute(
        directionsService,
        directionsRenderer,
        trip
      );
    },
    calculateAndDisplayRoute(directionsService, directionsRenderer, trip) {
      const {
        pickup_location_lat,
        pickup_location_lng,
        dropoff_location_lat,
        dropoff_location_lng,
      } = trip;
      const selectedMode = "DRIVING";
      directionsService.route(
        {
          origin: {
            lat: parseFloat(pickup_location_lat),
            lng: parseFloat(pickup_location_lng),
          },
          destination: {
            lat: parseFloat(dropoff_location_lat),
            lng: parseFloat(dropoff_location_lng),
          },
          // Note that Javascript allows us to access the constant
          // using square brackets and a string value as its
          // "property."
          travelMode: google.maps.TravelMode[selectedMode],
        },
        (response, status) => {
          if (status == "OK") {
            directionsRenderer.setDirections(response);
          } else {
            window.alert("Directions request failed due to " + status);
          }
        }
      );
    },
    // APIS
    getAllDrivers() {
      axios
        .get(
          "https://alsayar-backend-vwmk7.ondigitalocean.app/api/admin/get_all_drivers",
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        )
        .then((response) => {
          this.drivers = response.data;
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    goToAddTrip() {
      this.$router.push("/dashboard/trips/add/1");
    },
    getAllTrips() {
      this.apiLoading = true;
      this.apiError = undefined;
      axios
        .get(
          "https://alsayar-backend-vwmk7.ondigitalocean.app/api/admin/trips/get_all_trips",
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        )
        .then((response) => {
          this.apiLoading = false;
          this.trips = response.data.allTrips;
          // this.tr()
          console.log(response.data);
        })
        .catch((error) => {
          console.log("error");
          console.log(error);
          this.apiLoading = false;
          this.apiError = error;
          console.log(error);
        });
    },

    //    function(e){
    //   const n = e.timeStamp || Zo();
    //   (No || n >= r.attached - 1) && Dn(Qo(e, r.value), t, 5, [e])
    // },
    color(value) {
      let $color;
      if (value <= 25) {
        $color = "info";
      } else if (value > 25 && value <= 50) {
        $color = "success";
      } else if (value > 50 && value <= 75) {
        $color = "warning";
      } else if (value > 75 && value <= 100) {
        $color = "danger";
      }
      return $color;
    },
    csvExport(arrData) {
      let csvContent = "data:text/csv;charset=utf-8,";
      csvContent += [
        Object.keys(arrData[0]).join(";"),
        ...arrData.map((item) => Object.values(item).join(";")),
      ]
        .join("\n")
        .replace(/(^\[)|(\]$)/gm, "");

      const data = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", data);
      link.setAttribute("download", "export.csv");
      link.click();
    },
  },
  mounted() {
    fetch(
      "https://alsayar-backend-vwmk7.ondigitalocean.app/api/admin/trips/get_all_trips"
    )
      .then((resp) => resp.json())
      .then((json) => (this.trips = json));
  },
};
</script>
<style scoped>
.col-md-4 {
  -webkit-box-flex: 0;
  -ms-flex: 0 0 33.33333%;
  flex: 0 0 33.33333%;
  max-width: 33.33333%;
}
.header {
  margin-top: 0.5em;
  margin-left: 0rem;
  margin-left: 0rem;
  margin-bottom: -1rem;
  color: whitesmoke;
  display: flex;
  justify-content: flex-start;
}
.col-sm-6 {
  -webkit-box-flex: 0;
  -ms-flex: 0 0 50%;
  flex: 0 0 50%;
  max-width: 50%;
}

.tab {
  background-color: white;
}

.cdiv {
  display: flex;
}

.c-icon {
  color: white;
}

.cd {
  display: flex;
  justify-content: flex-end;
}
.h.header {
  display: block;
}
.sp{
  display: flex;
  justify-content:center;
}
</style>
