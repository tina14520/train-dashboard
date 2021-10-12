<template>
  <div class="c-app flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol md="5">
          <CCardGroup>
            <CCard >
              <CCardBody>
                <CForm @submit.prevent="login">
                  <h1>Login</h1>
                  <p class="text-muted">Sign In to your account</p>
                  <span class="input-group-text" >
                    <CIcon name="cil-user"
                    />
                    <input
                    class="input-group-text"
                     name="email"
                      placeholder="Email Address"
                      required
                      v-model="email"
                    >
                  </span>
                  <p></p>
                  <span class="input-group-text">
                    <CIcon name="cil-lock-locked"
                    />
                  <input
                    class="input-group-text"
                    name="password"
                    placeholder="Password"
                    type="password"
                    autocomplete="curent-password"
                    id="validationDefault02"
                    required
                    v-model="password"
                  >
                  </span>
                  <p></p>
                  <CRow>
                    <CCol col="6" class="text-left">
                      <CButton
                        color="primary"
                        class="px-4"
                        type="submit"
                        :disabled="loadingLogin"
                        >Login</CButton
                      >
                    </CCol>
                    <!-- <CCol col="6" class="text-right">
                      <CButton color="link" class="px-0"
                        >Forgot password?</CButton
                      >
                      <CButton color="link" class="d-lg-none"
                        >Register now!</CButton
                      >
                    </CCol> -->
                  </CRow>

                  <div class="validation-errors" v-if="vError">
                    <p v-for="error in vError" :key="error.param">
                      {{ error.msg }}
                    </p>
                  </div>
                  <div class="api-error" v-if="apiError">
                    <p>
                      {{ apiError }}
                    </p>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCardGroup>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      email: undefined,
      password: undefined,
      values: {},
      vError: undefined,
      loadingLogin: false,
      apiError: undefined,
    };
  },

  methods: {
    login() {
      this.loadingLogin = true;
      axios
        .post(
          "https://api-alsayar.herokuapp.com/api/admin/login",    
          {
            email: this.email,
            password: this.password,
          }
        )
        .then((response) => {
          this.loadingLogin = false;
          console.log(response.data);
          localStorage.setItem("token", response.data.token);
          this.token = response.data.token;
          this.$router.push("/dashboard");
        })
        .catch((err) => {
          this.loadingLogin = false;
          console.log(err.response);
          if(err.response.status == 401) {
            this.apiError = err.response.data.message
          } else if (err.response.status = 422) {
            this.vError = err.response.data.errors;
          } else if (err.response.status == 500) {
            this.apiError = "Server error";
          }
        });
    },
  },
  computed: {
    token: {
      get() {
        return this.$store.state.token;
      },
      set(value) {
        this.$store.commit("setToken", { token: value });
      },
    },
  },
};
</script>
<style scoped lang="scss" scoped>
.validation-errors,
.api-error {
  p {
    margin-top: 5px;
    color: white;
    text-align: center;
    background: rgb(247, 90, 90);
    border-radius: 0.5rem;
  }
}
.input-group-text{
 text-align: left;
}
</style>
