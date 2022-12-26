<template>
  <div>
    <div class="d-flex justify-content-between mb-3">
      <span class="all-gist-text rounded-pill">All Gists : {{ totalLength }}</span>
      <span class="float-right">{{ page }} 페이지</span>
    </div>
    <!-- <h1 class="mb-3">Gist List - 최신순 정렬</h1> -->
    <div v-if="!gistList">
      <p>데이터 불러오는 중</p>
    </div>
    <div v-else>
      <div v-for="gist in gistList" :key="gist.id">
        <div class="d-flex justify-content-between" style="height: 2rem;">
          <p class="item-title">Title: <a :href="detailURL(gist)" style="text-decoration: none;">{{ gistFilename(gist) }}</a></p>
          <p class="mt-2"><img class="speech-icon" src="@/assets/speech-bubble-icon.png" alt="댓글 아이콘"> {{ gist.comments }} comments</p>
        </div>
        <p class="time-text text-muted">{{ getTime(gist) }}</p>
        <hr/>
      </div>

      <div class="d-flex justify-content-center mb-5">
        <b-button v-if="flagNewer" variant="light" @click="goNewer()">Newer</b-button>
        <b-button v-else variant="light" @click="goNewer()" disabled>Newer</b-button>

        <b-button v-if="flagOlder" variant="light" @click="goOlder()">Older</b-button>
        <b-button v-else variant="light" @click="goOlder()" disabled>Older</b-button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'GistListCompnent',
  data() {
    return {
      username: "yts0275",
      gistList: [],
      page: parseInt(this.$route.query.page),
      totalLength: 0,
      flagNewer: true,
      flagOlder: true,
    }
  },
  computed: {

  },
  created() {
    const API_URL = `https://api.github.com/users/${this.username}/gists`

    if (this.page === 1) {
      this.flagNewer = false
    }

    axios.get(API_URL, { headers: { Authorization: process.env.VUE_APP_GITHUB_TOKEN } })
    .then((res) => {
      this.totalLength = res.data.length
      if (this.totalLength - (this.page * 10) <= 0) {
        this.flagOlder = false
      }
    }).catch((err) => {
      console.log(`err = ${err}`)
    })

    const context = {
      per_page: 10,
      page: this.page
    }

    axios.get(API_URL, { params: context, headers: { Authorization: process.env.VUE_APP_GITHUB_TOKEN } })
    .then((res) => {
      this.gistList = res.data
    }).catch((err) => {
      console.log(`err = ${err}`)
    })
  },
  methods: {
    gistFilename(gist) {
      return gist.files[Object.keys(gist.files)].filename
    },
    deleteGist(gist_id) {
      const DELETE_API_URL = `https://api.github.com/gists/${gist_id}`

      axios.delete(DELETE_API_URL, { headers: { Authorization: process.env.VUE_APP_GITHUB_TOKEN } })
      .then((res) => {
        console.log(res)
        this.$router.go()
      }).catch((err) => {
        console.log('err = ', err)
      })
    },
    detailGist(gist_id) {
      this.$router.push({ name: 'gistDetail', params: { gist_id: gist_id }})
    },
    detailURL(gist) {
      return "/gist/" + gist.id
    },
    getTime(gist) {
      let today = new Date();
      let created_at = new Date(gist.created_at)
      let time = today - created_at
      time /= 1000

      // 초 단위 표시
      if (time > 3600) {
         return "created_at " + String(parseInt(time / 3600)) + "hours age"
      // 분 단위 표시
      } else if (time > 60) {
         return "created_at " + String(parseInt(time / 60)) + "minutes age"
      // 시간 단위 표시
      } 
      return "created_at " + String(parseInt(time)) + "seconds age"
    },
    goNewer() {
      this.$router.push({ name: 'gistList', query: {page: this.page - 1} }).catch(()=>{})
    },
    goOlder() {
      this.$router.push({ name: 'gistList', query: {page: this.page + 1} }).catch(()=>{})
    }
  },
}
</script>

<style>
.item-title {
  font-size: 1.3rem;
}

.speech-icon {
  width: 1rem;
}

.time-text {
  font-size: 85%
}

.all-gist-text {
  padding: 0.2rem;
  background-color: #EEEEEE;
}
</style>