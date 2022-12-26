<template>
  <div>
    <h1 class="text-center">Gist 글 작성하기</h1>
    <b-form @submit="onSubmit" @reset="onReset">
      <b-form-group
        id="input-description-group"
        class="mb-4"
      >
        <b-form-input
          id="input-description"
          v-model="form.description"
          type="text"
          placeholder="Gist description"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-title-group"
        class="mb-4"
        label="Input Title"
        label-for="input-title"
        description="제목을 입력하세요"
      >
        <b-form-input
          id="input-1"
          v-model="form.title"
          type="text"
          placeholder="Enter Title"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group 
        id="input-content-group"
        label="Content:"
        label-for="input-content"
        description="내용을 입력하세요"
      >
        <b-form-input
          id="input-content"
          v-model="form.content"
          placeholder="Enter Content"
          required
        ></b-form-input>
      </b-form-group>

      <div class="mt-4 d-flex justify-content-between">
        <b-button type="submit" variant="primary">Submit</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>
      </div>
    </b-form>
  </div>
</template>

<script>
import axios from 'axios'

const API_URL = "https://api.github.com/gists"
// const API_TOKEN = `Bearer ${process.env.VUE_APP_GITHUB_TOKEN}`

export default {
  name: "GistCreateComponent",
  data() {
    return {
      form: {
          title: '',
          content: '',
          description: '',
        },
    }
  }, 
  methods: {
      onSubmit(event) {
        event.preventDefault()

        const context = {
          "description": this.form.description,
          "public": false,
          "files": {
            [this.form.title]: {
              "content": `${this.form.content}`
            }
          },
        }

        const headers = {
            Authorization: process.env.VUE_APP_GITHUB_TOKEN,
            // Accept: "application/vnd.github+json"
          }

        axios.post(API_URL, context, { headers: headers })
        .then((res) => {
          console.log(res)
          alert('생성이 완료되었습니다 !')
          this.$router.push({ name: 'gistList' })
        }).catch((err) => {
          console.log(`err = ${err}`)
        })
      },
      onReset(event) {
        event.preventDefault()
        // Reset our form values
        this.form.description = ''
        this.form.title = ''
        this.form.content = ''
      }
    }
}
</script>

<style>

</style>