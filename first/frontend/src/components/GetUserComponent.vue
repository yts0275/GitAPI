<template>
  <div>
    <h1>Main Page</h1>
    <div v-if='userCode && accessToken'>
      <p>로그인 성공 !</p>
      <button class="button button--social-login button--github" @click="logOut"><font-awesome-icon class="icon" icon="fa-brands fa-github" />Logout</button>
      <p>유저 코드 : {{ userCode }}</p>
      <p>Token : {{ accessToken }}</p>
    </div>
    <div v-else>
      <button class="button button--social-login button--github" @click="getGithubPermissonCode"><font-awesome-icon class="icon" icon="fa-brands fa-github" />Login With Github</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

const API_BASE_URL = 'http://127.0.0.1:8000/api/v1/'

export default {
  name: 'GetUserComponent',
  data() {
    return {
    }
  },
  computed: {
    userCode() {
      return this.$store.state.permissionCode
    },
    accessToken() {
      return this.$store.state.accessToken
    }
  },
  created() {
    // console.log(`this.$store.state.permissionCode = ${this.$store.state.permissionCode}`)
    // console.log(`this.$store.state.accessToken = ${this.$store.state.accessToken}`)

    if (this.$route.query.code !== undefined && this.$store.state.permissionCode === '') {
      this.$store.dispatch('setPermissonCode', this.$route.query.code)
      this.getAccessToken()
    }
  },
  methods: {
    getGithubPermissonCode() {
      axios.get(API_BASE_URL + 'github-login/')
      .then((res) => {
          window.location.href = res.data.login_url;
        }).catch((error) => {
          console.log(error)
          this.$router.go()
        })
    },
    getAccessToken() {
      const data = {
        'userCode': this.userCode,
      }
      axios.post(API_BASE_URL + 'github-access-token/', data)
      .then((res) => {
          this.$store.dispatch('setAccessToken', res.data.access_token)
        }).then(() => {
          this.$router.push('/').catch(()=>{});
        })
        .catch((error) => {
          console.log(error)
        })
    },
    logOut() {
      this.$store.dispatch('setPermissonCode', '')
      this.$store.dispatch('setAccessToken', '')
    }
  }
}
</script>

<style>
.button {
  width: auto;
  display: inline-block;
  padding: 0 18px 0 6px;
  border: 0 none;
  border-radius: 5px;
  text-decoration: none;
  transition: all 250ms linear;
}
.button:hover {
  text-decoration: none;
}

.button--social-login {
  margin-bottom: 12px;
  margin-right: 12px;
  color: white;
  height: 50px;
  line-height: 46px;
  position: relative;
  text-align: left;
}
.button--social-login .icon {
  margin-right: 12px;
  font-size: 24px;
  line-height: 24px;
  width: 42px;
  height: 24px;
  text-align: center;
  display: inline-block;
  position: relative;
  top: 4px;
}
.button--social-login .icon:before {
  display: inline-block;
  width: 40px;
}
.button--social-login .icon:after {
  content: "";
}
.button--github {
  background-color: #333;
  border: 1px solid #1a1a1a;
}
.button--github .icon {
  border-right: 1px solid #1a1a1a;
}
.button--github .icon:after {
  border-right: 1px solid #4d4d4d;
}
.button--github:hover {
  background-color: #262626;
}
</style>