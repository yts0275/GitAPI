<template>
  <div>
    <h1 class="text-center">Edit</h1>
    <b-form v-if="gist" @submit="onSubmit" @reset="onReset">
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
          id="input-title"
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
    <p v-else>데이터 불러오는 중</p>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: "GistUpdateComponent",
  data() {
    return {
      gist: '',
      origin_title: '',
      form: {
          title: '',
          content: '',
          description: '',
        },
    }
  },
  created() {
    const gist_id = this.$route.params.gist_id
    const GET_API_URL = `https://api.github.com/gists/${gist_id}`

    axios.get(GET_API_URL, { headers: { Authorization: process.env.VUE_APP_GITHUB_TOKEN } })
    .then((res) => {
      // console.log(res)
      this.gist = res.data
      this.form.title = this.gist.files[Object.keys(this.gist.files)].filename
      this.origin_title = this.gist.files[Object.keys(this.gist.files)].filename
      this.form.content = this.gist.files[Object.keys(this.gist.files)].content
      this.form.description = this.gist.description
    })
    .catch((err) => {
      console.log(err)
    })
  },
  computed: {

  },
  methods: {
      onSubmit(event) {
        event.preventDefault()
        const EDIT_API_URL = `https://api.github.com/gists/${this.gist.id}`

        const context = {
          "description": this.form.description,
          "files": {
            [this.origin_title]: {
              "filename": this.form.title,
              "content": `${this.form.content}`
            }
          },
        }

        const headers = {
            Authorization: process.env.VUE_APP_GITHUB_TOKEN,
            // Accept: "application/vnd.github+json"
          }

        axios.patch(EDIT_API_URL, context, { headers: headers })
        .then(() => {
          // console.log(res)
          this.$router.push({ name: 'gistDetail', params: { gist_id: this.gist.id }})
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

