<template>
  <div class="hello">
    <b-card no-body class="overflow-hidden main d-flex">
      <b-card-body>
        <b-form action="" @submit.prevent="adddata" >
          <div class="main">
            <h1>Add details</h1>
            <div>
              <div class="text-start">Title:</div>
              <div>
                <input type="text"  class="input-space" name="title" placeholder="Enter title" @input="emptyTitle()" v-model="title" autocomplete="off"/>
                <small class="font-weight-bold text-danger d-block"  v-if="isEmptyTitle">This field is required.</small>
              </div>

              <div class="text-start">Id:</div>
              <div>
                <input type="text"  class="input-space" name="id" placeholder="Enter id" @input="emptyId()" v-model="id" autocomplete="off"/>
                <small class="font-weight-bold text-danger d-block"  v-if="isEmptyId">This field is required.</small>
              </div>

              <div class="text-start">User Id:</div>
              <div>
                <input type="text"  class="input-space" name="uId" placeholder="Enter user id" @input="emptyUserId()" v-model="userId" autocomplete="off"/>
                <small class="font-weight-bold text-danger d-block"  v-if="isEmptyUserId">This field is required.</small>
              </div>

              <div class="text-start">Body:</div>
              <div>
                <textarea type="text"  class="input-space" name="body" placeholder="Enter body" @input="emptyBody()" v-model="body" autocomplete="off"/>
                <small class="font-weight-bold text-danger d-block"  v-if="isEmptyBody">This field is required.</small>
              </div>
              <div>
                <input type="submit" name="Add" class="submit-btn input-space" value="Add"/>
              </div>
            </div>
          </div>
        </b-form>
        <h3 class="font-weight-bold text-danger d-block mt-2" v-if="isEmptyFields">All the fields are required!</h3>
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
import axios from 'axios'
import {
  BForm,
  BCard,
  BCardBody,
} from 'bootstrap-vue'
export default {
  name: 'AddData',
  data(){
    return{
      title:"",
      id:"",
      userId:"",
      body:"",
      isEmptyId:false,
      isEmptyTitle:false,
      isEmptyBody:false,
      isEmptyUserId:false,
      isEmptyFields:false
    }
  },
  components:{
    BForm,
    BCard,
    BCardBody
  },
  methods:{
    emptyId(){
     this.id === '' ? this.isEmptyId = true  :   this.isEmptyId = false
    },
    emptyUserId(){
      this.userId === '' ? this.isEmptyUserId = true  :   this.isEmptyUserId = false
    },
    emptyTitle(){
      this.title === '' ? this.isEmptyTitle = true  :   this.isEmptyTitle = false
    },
    emptyBody(){
      this.body === '' ? this.isEmptyBody = true  :   this.isEmptyBody = false
    },
    adddata(){
      const requestBody = {
        userId: parseInt(this.userId),
        title: this.title,
        body: this.body,
        id:parseInt(this.id)
      }
      if (this.title !== '' && this.body !== '' && this.userId !== '' && this.id !== '') {
        axios.post(`https://jsonplaceholder.typicode.com/posts`, requestBody)
            .then(() => {
              this.$router.push('/')
              alert("data inserted successfully!")
            });
      }
      else{
        this.isEmptyFields = true
      }
    },
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
