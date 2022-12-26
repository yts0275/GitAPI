<template>
  <div>
    <h1>Gist 상세보기</h1>

    <div v-if="gist" class="mt-4">
      <!-- <div v-if="isUpdate"> -->
        <b-card 
          border-variant="secondary"
          header-border-variant="secondary"
          header-tag="header"
          sub-title-tag="description"
          >
          <template #header>
            <div class="d-flex justify-content-between">
              <div>
                <h3 class="mb-0">{{ gistTitle() }}</h3>
              </div>
              <div>
                <b-button variant="light" class="me-3" @click="goGistEdit">
                  <img src="@/assets/edit-button-icon.png" class="edit-button mb-1 me-1" alt="">
                  Edit
                </b-button>
                <b-button variant="light" class="" @click="deleteGist">
                  <img src="@/assets/delete-icon.png" class="delete-button mb-1 me-1" alt="">
                  Delete
                </b-button>
              </div>
            </div>
          </template>
          <b-card-sub-title v-if="gistDescription()">
            {{ gistDescription() }}
            <hr/>
          </b-card-sub-title>
          <!-- <template #description>
            <p>Description : {{ gistDescription() }}</p>
          </template> -->


          <b-card-text>
            {{ gistContent() }}
          </b-card-text>

          <a :href="gist.html_url" class="card-link">Github Gist Link</a>
        </b-card>
      <!-- </div> -->

      <!-- <div v-else> -->
        
      <!-- </div> -->

      <div class="mt-3 container">
        <GistCommentList 
          class="mb-3"
          :gist-id="gist.id"
          />
        <GistCommentCreate :gist-id="gist.id"/>
      </div>
    </div>
    <div v-else>데이터 불러오는 중</div>

    <br/>
    
    <!-- {{ gist }} -->
  </div>
</template>

<script>
import axios from 'axios'
import GistCommentCreate from './GistCommentCreate.vue'
import GistCommentList from './GistCommentList.vue'

export default {
  name: "GistDetailComponent",
  components: {
    GistCommentCreate, GistCommentList
  },
  data() {
    return {
      gist: '',
      // isUpdate: true,
    }
  },
  created() {
    const gist_id = this.$route.params.gist_id
    const GET_API_URL = `https://api.github.com/gists/${gist_id}`

    axios.get(GET_API_URL, { headers: { Authorization: process.env.VUE_APP_GITHUB_TOKEN } })
    .then((res) => {
      // console.log(res)
      this.gist = res.data
    })
    .catch((err) => {
      console.log(err)
    })
  },
  methods: {
    gistTitle() {
      return this.gist.files[Object.keys(this.gist.files)].filename
    },
    gistContent() {
      return this.gist.files[Object.keys(this.gist.files)].content
    },
    gistDescription() {
      if (this.gist.description) {
        return "Description: " + this.gist.description
      } else {
        return false
      }
    },
    goGistEdit() {
      this.$router.push({ name: 'gistEdit', params: { gist_id: this.gist.id }})
    },
    deleteGist() {
      const gist_id = this.$route.params.gist_id
      const DELETE_API_URL = `https://api.github.com/gists/${gist_id}`
      axios.delete(DELETE_API_URL, { headers: { Authorization: process.env.VUE_APP_GITHUB_TOKEN } })
      .then(() => {
        alert("삭제가 완료되었습니다")
        this.$router.push({ name: "gistList" })
      })
      .catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>

<style>
.edit-button {
  width: 17%;
}

.delete-button {
  width: 15%;
}
</style>