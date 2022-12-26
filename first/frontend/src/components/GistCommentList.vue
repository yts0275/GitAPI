<template>
  <div>
    <div v-for="(comment, index) in commentList" :key="comment.id">
      <b-card 
        header-tag="header"
        style="background-color: A7EEFF;"
        >
        <template #header>
          <h5 class="mb-0 d-flex justify-content-between">
            <div class="mt-1">
              <a :href="comment.user.html_url"><img :src="comment.user.avatar_url" alt="github_profile" class="card-profile"></a>
              <span class="ms-3">{{ comment.user.login }}</span>
            </div>
            <div v-if="!isEdit[index]">
              <b-button variant="light" class="me-3" @click="commentEdit(index)">
                <img src="@/assets/edit-button-icon.png" class="edit-button mb-1 me-1" alt="">
                Edit
              </b-button>
              <b-button variant="light" class="" @click="commentDelete(comment)">
                <img src="@/assets/delete-icon.png" class="delete-button mb-1 me-1" alt="">
                Delete
              </b-button>
            </div>
            <div v-else>
              <b-button variant="light" class="me-3" @click="requestEdit(index, comment)">
                <img src="@/assets/edit-button-icon.png" class="edit-button mb-1 me-1" alt="">
                Edit
              </b-button>
            </div>
          </h5>
        </template>

        <div v-if="isEdit[index]">
          <b-form>
            <b-form-input
              id="input-comment"
              v-model="form.content"
              type="text"
              placeholder="Enter Conent"
              required
            ></b-form-input>
          </b-form>
        </div>
        <div v-else>
        <b-card-text>
          {{ comment.body }}
        </b-card-text>
        </div>
      </b-card>
      <hr>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'GistCommentList',
  data() {
    return {
      commentList: [],
      isEdit: [],
      form: {
        content: '',
      }
    }
  },
  props: {
    gistId: String
  },
  computed: {
  },
  created() {
    const API_URL = `https://api.github.com/gists/${this.gistId}/comments`
    
    axios.get(API_URL, { headers: { Authorization: process.env.VUE_APP_GITHUB_TOKEN } })
    .then((res) => {
      // console.log(res.data)
      this.commentList = res.data
      this.isEdit = new Array(this.commentList.length).fill(false)
    })
    .catch((err) => {
      console.log(err)
    })
  },
  methods: {
    commentEdit(index) {
      this.isEdit.splice(index, 1, true)
      this.form.content = this.commentList[index].body
    },
    commentDelete(comment) {
      const DELETE_API_URL = `https://api.github.com/gists/${this.gistId}/comments/${comment.id}`
      axios.delete(DELETE_API_URL, { headers: { Authorization: process.env.VUE_APP_GITHUB_TOKEN } })
      .then(() => {
        this.$router.go()
      })
      .then((err) => {
        console.log(err)
      })
    },
    requestEdit(index, comment) {
      const API_URL = `https://api.github.com/gists/${this.gistId}/comments/${comment.id}`
      axios.patch(API_URL, { body: this.form.content }, { headers: { Authorization: process.env.VUE_APP_GITHUB_TOKEN } })
      .then(() => {
        this.isEdit.splice(index, 1, false)
        comment.body = this.form.content
      })
      .catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>

<style>
.card-profile {
  width: 1.5rem;
  height: 1.5rem;
}
</style>