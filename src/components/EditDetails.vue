<template>
  <div class="hello">
    <b-card no-body class="overflow-hidden main d-flex">
      <b-card-body>
        <b-form action="" @submit.prevent="login" >
          <div class="main">
            <h1>Edit details</h1>
            <div>
              <div class="text-start">Title:</div>
              <div>
                <input type="text"  class="input-space" name="title" placeholder="Enter title" v-model="title" autocomplete="off"/>
                <small class="font-weight-bold text-danger d-block"  v-if="title.length <= 0">This field is required.</small>
              </div>
              <div class="text-start">Body:</div>
              <div>
                <textarea type="text"  class="input-space" name="body" placeholder="Enter body" v-model="body" autocomplete="off"/>
                <small class="font-weight-bold text-danger d-block"  v-if="body.length <= 0">This field is required.</small>
              </div>
              <div>
                <input type="submit" name="Edit" class="submit-btn input-space" value="Edit"/>
              </div>
            </div>
          </div>
        </b-form>
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
import axios from 'axios'
import {
  BForm,
  BCard,
  BCardBody
} from 'bootstrap-vue'
export default {
  name: 'editDetails',
  data(){
    return{
      title:"",
      id:0,
      userId:0,
      body:""
    }
  },
  components:{
    BForm,
    BCard,
    BCardBody
  },
  methods:{
    login(){
      const requestBody = {
        userId: this.userId,
        title: this.title,
        body: this.body,
        id:this.id
      }
      if (this.title !== '' && this.body !== '') {
        axios.put(`https://jsonplaceholder.typicode.com/posts/${this.id}`, requestBody)
            .then(() => {
                this.$router.push('/')
                alert("data edited successfully!")
            });
      }
    },
  },
  mounted() {
    this.id =  localStorage.getItem('id')
    this.userId =  localStorage.getItem('uId')
    this.title = localStorage.getItem('title')
    this.body = localStorage.getItem('body')

  }
}
</script>

<style scoped>
.main{
  margin: 0 auto;
  justify-content: space-between;
  vertical-align: center;
  align-items: center;

}
.input-space{
  margin: 10px 0 10px 0;
  padding: 12px;
  border-radius: 4%;
  width: 500px;
  border: 1px solid #0078ca;
  outline: none;
}
.input-label{
  margin: 10px 0 10px 0;
  width: 500px;
}
.submit-btn{
  width: 100% !important;
  background: #0078ca;
  border: white;
  color: white;
}
.card{
  margin: 0 auto;
}
.margin-right{
margin-right: 12px !important;
}
</style>
