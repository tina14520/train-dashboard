<template>
  <CCardBody>
    <sweet-modal icon="success" ref="success">
      Admin added successfully
    </sweet-modal>
    <sweet-modal  ref="modalRoles">
       <FormulateInput
          v-model="authEditValues"
          :options="sectionsFormed"
          type="checkbox"
          label="Roles"
        />
        <button type="submit" class="add-submit" :disabled="loadingAdd" @click="editRoles">
          Save
        </button>
    </sweet-modal>
    <sweet-modal ref="modalAddAdmin">
      <h2>
        Add admin
      </h2>
      <p v-if="vErr" class="v-err">
        {{ vErr }}
      </p>
      <FormulateForm v-model="addAdminValues" @submit="addAdmin">
        <FormulateInput
          type="text"
          name="name"
          label="Name"
          validation="required"
        />
        <FormulateInput
          type="email"
          name="email"
          label="Email"
          validation="required|email"
        />
        <FormulateInput
          type="tel"
          name="phone"
          label="Phone"
          validation="required|min:9,length"
        />
        <FormulateInput
          type="password"
          name="password"
          label="Password"
          validation="required"
        />
        <FormulateInput
          v-model="authValues"
          :options="sectionsFormed"
          type="checkbox"
          label="Roles"
        />
        <CButton type="submit" class="add-submit" :disabled="loadingAdd">
          Add admin
        </CButton>
          <div class="validation-errors">
          <div class="validation-error" v-for="err in validationErrors" :key="err.param">
            {{ err.msg }}
          </div>
        </div>
       <!-- <FormulateInput
          class="submitbtn"
          type="submit"
          label="Add"
          @click="addAdmin()"
          :disabled="loadingAdd"
        />-->
      </FormulateForm>
    </sweet-modal>

    <div class="add-container">
      <CButton
        key="text"
        color="info"
        size="sm"
        class="m-2"
        @click="showModalAddAdmin"
      >
        Add admin
      </CButton>
    </div>

    <CDataTable
      :items="admins"
      :fields="fields"
      :table-filter="{ placeholder: 'search...' }"
      items-per-page-select
      :items-per-page="5"
      hover
      sorter
      pagination
      class="admins-table"
    >
      <!-- column-filter -->
      <template #status="{item}">
        <td>
          <!-- <CSwitch
            class="mx-1"
            color="primary"
            data-checked="On"
            data-unchecked="Off"
            :checked="item.disabled == true ? false : true"
            variant="3d"
            @click="toggleDisabled()"
          /> -->
          <unicon
            name="toggle-on"
            fill="#2d6a4f"
            v-if="item.disabled == false"
            class="toggle-icon"
            @click="disableAdmin(item._id)"
          ></unicon>
          <unicon
            name="toggle-off"
            fill="#f94144"
            v-if="item.disabled == true"
            class="toggle-icon"
            @click="enableAdmin(item._id)"
          ></unicon>
        </td>
      </template>

      <template>
        <CButton color="primary" variant="outline" square size="sm">
        Edit Roles
      </CButton>
      </template>
      
      <template #edit_roles="{item, index}">
        <td class="py-2">
          <CButton
            color="primary"
            variant="outline"
            square
            size="sm"
            @click="showModalRoles(item, index)"
          >
            Roles
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
              <CButton size="sm" color="primary" class="">
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
</template>

<script>
import axios from "axios";
const items = [
  {
    name: "Samppa Nori",
    registered: "2012/01/01",
    email: "Member",
    status: 1,
  },
];

const fields = [
  "name",
  "phone",
  "email",
  "can_access_to",
  "status",
  {
    key: "edit_roles",
    label: "",
    _style: "width:1%",
    sorter: false,
    filter: false,
  },
];

export default {
  name: "AdvancedTables",
  data() {
    return {
       reqError: undefined,
      loading: false,
      rowElments: {},
      formValues: {},
      index: 1,
      isLoading: false,
      validationErrors: [],
      rows: [],
      settingName: undefined,
      settingValue: undefined,
      id: undefined,
      items: items.map((item, id) => {
        return { ...item, id };
      }),
      fields,
      details: [],
      collapseDuration: 0,
      token: localStorage.getItem("token"),
      admins: undefined,
      sections: undefined,
      sectionsFormed: [],
      authValues: undefined,
      authEditValues: undefined,
      addAdminValues: {},
      loadingAdd: false,
      vErr: undefined,
      apiError: undefined,
      apiBase: "https://api-alsayar.herokuapp.com",
      editAdminId: undefined,
    };
  },
  computed: {
    apiBaseUrl() {
      return this.$store.state.apiBaseUrl;
    },
    // token: {
    //   get() {
    //     return this.$store.state.token;
    //   },
    //   set(value) {
    //     this.$store.commit("setToken", {
    //       token: value,
    //     });
    //   },
    // },
  },
  methods: {
    unsuccess() {
      this.$refs.unsuccessModal.open();
    },
    success() {
      this.$refs.successModal.open();
    },
    showModalAddAdmin() {
      this.$refs.modalAddAdmin.open();
    },
    showModalRoles(item, index){
      this.$refs.modalRoles.open();
      this.authEditValues = item.can_access_to
      this.editAdminId = item._id
    },
    addAdmin() {
      this.loadingAdd = true;
      axios
        .post(
          this.apiBase + "/api/admin/register",
          {
            name: this.addAdminValues.name,
            email: this.addAdminValues.email,
            phone: this.addAdminValues.phone,
            password: this.addAdminValues.password,
            can_access_to: this.authValues,
          },
          {
            headers: {
              Authorization: "Bearer " + this.token,
            },
          }
        )
        .then((response) => {
          this.loadingAdd = false;
          console.log(response);
          this.$refs.modalAddAdmin.close();
          this.$refs.success.open();
          this.getAllAdmins();
        })
        .catch((err) => {
          this.loadingAdd = false;
          console.log("Error");
          this.validationErrors = err.response.data.errors;
          if (err.response.status == 400) {
            this.vErr = err.response.data.message;
            this.validationErrors = err.response.data.errors;
          }
          console.log(err.response);
        });
    },
    editRoles() {
      // this.loadingAdd = true;
      axios
        .put(
          this.apiBase + "/api/admin/admins/edit_roles",
          {
            admin_id: this.editAdminId,
            can_access_to: this.authEditValues,
          },
          {
            headers: {
              Authorization: "Bearer " + this.token,
            },
          }
        )
        .then((response) => {
          this.loadingAdd = false;
          console.log(response);
          this.$refs.modalRoles.close();
          this.$refs.success.open();
          this.getAllAdmins();
        })
        .catch((err) => {
          this.loadingAdd = false;
          console.log("Error");
          if (err.response.status == 400) {
            this.vErr = err.response.data.message;
          }
          console.log(err.response);
        });
    },
    getAllAdmins() {
      axios
        .get(this.apiBase + "/api/admin/admins/get_all_admins", {
          headers: {
            Authorization: "Bearer " + this.token,
          },
        })
        .then((response) => {
          console.log(response);
          this.admins = response.data.admins;
        })
        .catch((err) => {
          console.log("Error");
          console.log(err.response);
        });
    },
    disableAdmin(admin_id) {
      console.log("toggle");
      axios
        .post(
          this.apiBase + "/api/admin/admins/disable",
          {
            admin_id,
          },
          {
            headers: {
              Authorization: "Bearer " + this.token,
            },
          }
        )
        .then((response) => {
          console.log(response);
          this.getAllAdmins();
        })
        .catch((err) => {
          console.log("Error");
          console.log(err.response);
        });
    },
    enableAdmin(admin_id) {
      console.log("toggle");
      axios
        .post(
          this.apiBase + "/api/admin/admins/enable",
          {
            admin_id,
          },
          {
            headers: {
              Authorization: "Bearer " + this.token,
            },
          }
        )
        .then((response) => {
          console.log(response);
          this.getAllAdmins();
        })
        .catch((err) => {
          console.log("Error");
          console.log(err.response);
        });
    },
    formSections() {
      var i;
      for (i = 0; i < this.sections.length; i++) {
        this.sectionsFormed.push({
          value: this.sections[i].name.toString(),
          label: this.sections[i].name,
        });
      }
      console.log(this.sectionsFormed);
    },
    getAllSections() {
      axios
        .get(this.apiBase + "/api/section/all", {
          headers: {
            Authorization: "Bearer " + this.token,
          },
        })
        .then((response) => {
          this.sections = response.data.sections;
          console.log("sections");
          console.log(this.sections);
          this.formSections();
        })
        .catch((err) => {
          console.log("Error");
          console.log(err.response);
        });
    },
    getBadge(status) {
      switch (status) {
        case "Active":
          return "success";
        case "Inactive":
          return "secondary";
        case "Pending":
          return "warning";
        case "Banned":
          return "danger";
        default:
          "primary";
      }
    },
    toggleDetails(item) {
      this.$set(this.items[item.id], "_toggled", !item._toggled);
      this.collapseDuration = 300;
      this.$nextTick(() => {
        this.collapseDuration = 0;
      });
    },
  },
  created() {
    this.getAllAdmins();
    this.getAllSections();
  },
};
</script>

<style scoped lang="scss">
s
.toggle-icon {
  cursor: pointer;
}
.add-container {
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
}
.add-submit {
  color: white;
  border: none;
  background: rebeccapurple;
  border-radius: 5px;
  padding: 0.4rem 0.8rem;
}
.v-err {
  color: red;
}
.admins-table {
  background: white;
  padding: 1rem;
}
.buttons {
  white-space: nowrap;
}
.back {
  margin-right: 10rem;
  display: inline-block;
  justify-content: flex-end;
}
.submit-btn {
  display: inline-block;
  justify-content: flex-end;
}
.submitbtn {
  display: flex;
  justify-content: flex-end;
}
.salah {
  border: none;
  background-color: red;
  padding: 0.4rem 0.8rem;
  color: white;
  border-radius: 0.3rem;
}
.add {
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  margin: 1rem 0;
  button {
    border: none;
    background-color: rebeccapurple;
    color: white;
    padding: 0.3rem 0.8rem;
    border-radius: 0.2rem;
    &:hover {
      background-color: rgb(35, 4, 66);
    }
  }
}
.loader {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 8rem;
}
</style>
