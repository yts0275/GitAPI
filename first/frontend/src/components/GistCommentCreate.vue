<template>
  <div>
    <b-form @submit="onSubmit">
      <b-form-group
        id="input-comment-group"
        class="mb-4"
        label="Input Comment"
        label-for="input-title"
      >
        <b-form-input
          id="input-comment"
          v-model="form.content"
          type="text"
          placeholder="Enter Conent"
          required
        ></b-form-input>
      </b-form-group>
      <b-button class="float-right" type="submit" variant="primary">Submit</b-button>
    </b-form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: "GistCommentCreate",
  data() {
    return {
      form: {
        content: ''
      }
    }
  },
  props: {
    gistId: String
  },
  methods: {
    onSubmit(event) {
      event.preventDefault()
      const API_URL = `https://api.github.com/gists/${this.gistId}/comments`
      axios.post(API_URL, { body: this.form.content }, { headers: { Authorization: process.env.VUE_APP_GITHUB_TOKEN } })
      .then((res) => {
        console.log(res)
        this.$router.go()
      })
      .catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>

<style>

</style>