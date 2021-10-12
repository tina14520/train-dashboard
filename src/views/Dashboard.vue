<template>
  <div>
    <CRow>
      <CCol sm="2" md="2">
        <CWidgetProgressIcon header="87.500" text="•	Number of live trips " color="gradient-info" inverse>
          <CIcon name="cil-car-alt" height="36" />
        </CWidgetProgressIcon>
      </CCol>
      <CCol sm="2" md="2">
        <CWidgetProgressIcon header="385" text="•	Number of completed trips" color="gradient-success" inverse>
          <CIcon name="cil-garage" height="36" />
        </CWidgetProgressIcon>
      </CCol>
      <CCol sm="2" md="2">
        <CWidgetProgressIcon header="1238" text="•	Number of cancelled trips" color="gradient-warning" inverse>
          <CIcon name="cil-ban" height="36" />
        </CWidgetProgressIcon>
      </CCol>
      <CCol sm="2" md="2">
        <CWidgetProgressIcon header="28%" text="•	Number of free vehicles" color="gradient-primary" inverse>
          <CIcon name="cil-group" height="36" />
        </CWidgetProgressIcon>
      </CCol>
      <CCol sm="2" md="2">
        <CWidgetProgressIcon header="5:34:11" text="•	Number of disabled vehicle" color="gradient-danger" inverse>
          <CIcon name="cil-user-x" height="36" />
        </CWidgetProgressIcon>
      </CCol>
      <CCol sm="2" md="2">
        <CWidgetProgressIcon header="972" text="•	Number of active trips" color="gradient-info" inverse>
          <CIcon name="cil-graph" height="36" />
          <!-- cil-taxi -->

        </CWidgetProgressIcon>
      </CCol>
    </CRow>
    <CCardBody class="tab">
      <CDataTable :items="items" :fields="fields" column-filter table-filter items-per-page-select :items-per-page="5"
        hover sorter pagination>
        <template #status="{item}">
          <td>
            <CSwitch class="mx-1" color="primary" data-checked="On" data-unchecked="Off"
              :checked="item.status == 1 ? true : false" variant="3d" />
          </td>
        </template>
        <template #show_details="{item, index}">
          <td class="py-2">
            <CButton color="primary" variant="outline" square size="sm" @click="toggleDetails(item, index)">
              {{ Boolean(item._toggled) ? "Hide" : "Details" }}
            </CButton>
          </td>
        </template>
        <template #details="{item}">
          <CCollapse :show="Boolean(item._toggled)" :duration="collapseDuration">
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
    </CCardBody>
    <CRow>
      <CCol md="12">
        <CCard>
          <CCardBody>
            <CDataTable 
              class="mb-0 table-outline"
              hover 
              striped border small fixed :items="tableItems"
              :fields="tableFields" 
              head-color="light" 
              no-sorting
            >
              <td slot="avatar" class="text-center" slot-scope="{ item }">
                <div class="c-avatar">
                  <img :src="item.avatar.url" class="c-avatar-img" alt="" />
                  <span class="c-avatar-status" :class="`bg-${item.avatar.status || 'secondary'}`"></span>
                </div>
              </td>
              <td slot="user" slot-scope="{ item }">
                <div>{{ item.user.name }}</div>
                <div class="small text-muted">
                  <span>
                    <template v-if="item.user.new">New</template>
                    <template v-else>Recurring</template>
                  </span>
                  | Registered: {{ item.user.registered }}
                </div>
              </td>
              <td slot="country" slot-scope="{ item }" class="text-center">
                <CIcon :name="item.country.flag" height="25" />
              </td>
              <td slot="usage" slot-scope="{ item }">
                <div class="clearfix">
                  <div class="float-left">
                    <strong>{{ item.usage.value }}%</strong>
                  </div>
                  <div class="float-right">
                    <small class="text-muted">{{ item.usage.period }}</small>
                  </div>
                </div>
                <CProgress class="progress-xs" v-model="item.usage.value" :color="color(item.usage.value)" />
              </td>
              <td slot="payment" slot-scope="{ item }" class="text-center">
                <CIcon :name="item.payment.icon" height="25" />
              </td>
              <td slot="activity" slot-scope="{ item }">
                <div class="small text-muted">Last login</div>
                <strong>{{ item.activity }}</strong>
              </td>
            </CDataTable>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
  import usersData from './users/UsersData'
  export default {
    name: "Dashboard",
    data() {
      return {
        items: usersData,
        fields: [{
            key: 'username',
            label: 'Name',
            _classes: 'font-weight-bold'
          },
          {
            key: 'registered'
          },
          {
            key: 'role'
          },
          {
            key: 'status'
          }
        ],
        tableItems: [{
            avatar: {
              url: "img/avatars/1.jpg",
              status: "success"
            },
            user: {
              name: "Yiorgos Avraamu",
              new: true,
              registered: "Jan 1, 2015"
            },
            country: {
              name: "USA",
              flag: "cif-us"
            },
            usage: {
              value: 50,
              period: "Jun 11, 2015 - Jul 10, 2015"
            },
            payment: {
              name: "Mastercard",
              icon: "cib-cc-mastercard"
            },
            activity: "10 sec ago",
          },
          {
            avatar: {
              url: "img/avatars/2.jpg",
              status: "danger"
            },
            user: {
              name: "Avram Tarasios",
              new: false,
              registered: "Jan 1, 2015"
            },
            country: {
              name: "Brazil",
              flag: "cif-br"
            },
            usage: {
              value: 22,
              period: "Jun 11, 2015 - Jul 10, 2015"
            },
            payment: {
              name: "Visa",
              icon: "cib-cc-visa"
            },
            activity: "5 minutes ago",
          },
          {
            avatar: {
              url: "img/avatars/3.jpg",
              status: "warning"
            },
            user: {
              name: "Quintin Ed",
              new: true,
              registered: "Jan 1, 2015"
            },
            country: {
              name: "India",
              flag: "cif-in"
            },
            usage: {
              value: 74,
              period: "Jun 11, 2015 - Jul 10, 2015"
            },
            payment: {
              name: "Stripe",
              icon: "cib-stripe"
            },
            activity: "1 hour ago",
          },
          {
            avatar: {
              url: "img/avatars/4.jpg",
              status: ""
            },
            user: {
              name: "Enéas Kwadwo",
              new: true,
              registered: "Jan 1, 2015"
            },
            country: {
              name: "France",
              flag: "cif-fr"
            },
            usage: {
              value: 98,
              period: "Jun 11, 2015 - Jul 10, 2015"
            },
            payment: {
              name: "PayPal",
              icon: "cib-paypal"
            },
            activity: "Last month",
          },
          {
            avatar: {
              url: "img/avatars/5.jpg",
              status: "success"
            },
            user: {
              name: "Agapetus Tadeáš",
              new: true,
              registered: "Jan 1, 2015"
            },
            country: {
              name: "Spain",
              flag: "cif-es"
            },
            usage: {
              value: 22,
              period: "Jun 11, 2015 - Jul 10, 2015"
            },
            payment: {
              name: "Google Wallet",
              icon: "cib-google-pay"
            },
            activity: "Last week",
          },
          {
            avatar: {
              url: "img/avatars/6.jpg",
              status: "danger"
            },
            user: {
              name: "Friderik Dávid",
              new: true,
              registered: "Jan 1, 2015"
            },
            country: {
              name: "Poland",
              flag: "cif-pl"
            },
            usage: {
              value: 43,
              period: "Jun 11, 2015 - Jul 10, 2015"
            },
            payment: {
              name: "Amex",
              icon: "cib-cc-amex"
            },
            activity: "Last week",
          },
        ],
        tableFields: [{
            key: "avatar",
            label: "",
            _classes: "text-center"
          },
          {
            key: "user"
          },
          {
            key: "country",
            _classes: "text-center"
          },
          {
            key: "usage"
          },
          {
            key: "payment",
            label: "Payment method",
            _classes: "text-center"
          },
          {
            key: "activity"
          },
        ],
      };
    },
    methods: {
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
    },
  };
</script>
<style>
  .col-md-4 {
    -webkit-box-flex: 0;
    -ms-flex: 0 0 33.33333%;
    flex: 0 0 33.33333%;
    max-width: 33.33333%;
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
</style>