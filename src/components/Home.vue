<template>
  <div>
    <div>
      <b-card no-body>
        <b-tabs card pills>
          <b-tab active title="Create post">
            <div>
              <b-card
                  :title=userName
                  class="mb-2"
                  img-alt="Image"
                  img-src="https://picsum.photos/600/300/?image=25"
                  img-top
                  style="max-width: 20rem;"
                  tag="article"
              >
                <b-form-input v-model="postTitle" class="mb-4" placeholder="Enter post title..."></b-form-input>
                <b-form-textarea
                    id="textarea2"
                    v-model="postData"
                    max-rows="6"
                    placeholder="Enter post body..."
                    rows="3"
                >
                </b-form-textarea>
                <b-button class="mt-4" href="#" variant="primary" @click="uploadPost()">Add post</b-button>
              </b-card>
            </div>
          </b-tab>
          <b-tab title="View all posts" @click="getAllPosts()">
            <div v-for="(posts,i) in totalUsersPost" :key="i" class="mb-5">
              <b-card
                  class="mb-2"
                  img-alt="Image"
                  img-src="https://picsum.photos/600/300/?image=25"
                  img-top
                  style="max-width: 20rem;"
                  tag="article"
              >
                <span class="text-left fw-bold">{{ posts.title }}</span>
                <span class="text-left d-block mt-2">{{ posts.body }}</span>
                <b-form-textarea
                    id="textarea"
                    v-model="posts.comments"
                    max-rows="6"
                    placeholder="Write comment here..."
                    rows="3"
                >
                </b-form-textarea>
                <b-button class="mt-4" href="#" variant="primary" @click="addGlobalComment(posts.id)">Add comment
                </b-button>
                <b-button class="mt-4 text-left d-block" href="#" variant="primary"
                            >view
<!--                  {{ !isViewComments ? 'View comments' : 'Hide comments' }}-->
                </b-button>

                <div v-for="(comments,i) in allCommentsOfPost" :key="i">
                  <span v-if="isViewComments">{{ comments.comments }}</span>
                </div>
              </b-card>
            </div>
          </b-tab>
          <b-tab title="My posts" @click="getMyPosts()">
            <div v-for="(data,index) in currentUsersPost" :key="index" class="mb-5">
              <b-card
                  class="mb-2"
                  img-alt="Image"
                  img-src="https://picsum.photos/600/300/?image=25"
                  img-top
                  style="max-width: 20rem;"
                  tag="article"
              >
                <span class="text-left fw-bold">{{ data.title }}</span>
                <span class="text-left d-block mt-2">{{ data.body }}</span>
                <b-form-textarea
                    id="textarea3"
                    v-model="postMyComment"
                    max-rows="6"
                    placeholder="Write comment here..."
                    rows="3"
                >
                </b-form-textarea>
                <b-button class="mt-4" href="#" variant="primary" @click="addMyPostComment(data.id)">Add comment
                </b-button>
                <div v-for="(comments,i) in myPostsComments" :key="i">
                  <span>{{ comments.comments }}</span>
                </div>
              </b-card>
            </div>
          </b-tab>
          <b-tab class="text-end" title="Logout" @click="logout()">
          </b-tab>
        </b-tabs>
      </b-card>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import {
  BCard,
  BTab,
  BTabs,
  BButton,
  BFormTextarea,
  BFormInput
} from 'bootstrap-vue'

export default {
  name: "user-home",
  data() {
    return {
      postData: "",
      userName: "",
      currentUserData: null,
      postTitle: "",
      postComment: "",
      postMyComment: "",
      totalUsersPost: null,
      currentUsersPost: null,
      allCommentsOfPost: [],
      myPostsComments: this.$store.getters.myComments,
      isViewComments: false
    }
  },
  components: {
    BCard,
    BTab,
    BTabs,
    BButton,
    BFormTextarea,
    BFormInput
  },
  methods: {
    getAllPosts() {
      axios.get(`https://jsonplaceholder.typicode.com/posts`).then((res) => {
        this.totalUsersPost = res.data.sort((a, b) => b.id - a.id)
      })
    },
    addGlobalComment(id,i) {
      this.totalUsersPost.map((post) => {
        if (post.id == id) {
          this.allCommentsOfPost[i].push({
            comments: this.allCommentsOfPost[i].comments
          })
          console.log(this.allCommentsOfPost[i].comments,"JAakkdk");
          this.allCommentsOfPost = [...this.allCommentsOfPost]
          console.log("thhh",this.allCommentsOfPost)
          this.postComment = ''
        }
      })
      this.$store.dispatch('setUserComments', this.allCommentsOfPost)
    },
    addMyPostComment(id) {
      this.currentUsersPost.map((post) => {
        if (post.id == id) {
          this.myPostsComments.push({
            comments: this.postMyComment
          })
          this.myPostsComments = [...this.myPostsComments]
          this.postMyComment = ''
        }
      })
      this.$store.dispatch('setMyComments', this.myPostsComments)
    },
    getMyPosts() {
      this.currentUsersPost = this.totalUsersPost.filter((post) => post.userId == this.currentUserData.id)
    },
    logout() {
      if (confirm('Are you sure you want to logout?')) {
        this.$router.push({path: `/`})
      }
    },
    uploadPost() {
      const requestBody = {
        userId: this.currentUserData.id,
        title: this.postTitle,
        body: this.postData
      }
      if (this.postData !== '' && this.postTitle !== '') {
        axios.post("https://jsonplaceholder.typicode.com/posts", requestBody)
            .then(() => {
                  this.postTitle = '',
                  this.postData = ''
                  alert("Posted successful")
            });
      }
    }
  },
  mounted() {
    this.currentUserData = JSON.parse(localStorage.getItem('currentUserData'))
    this.userName = JSON.parse(localStorage.getItem('currentUserData')).name
  }
}
</script>

<style scoped>
.card{
  margin: 0 auto;
}
</style>