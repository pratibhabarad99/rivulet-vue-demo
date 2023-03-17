<template>
  <div class="hello">
    <b-card no-body class="overflow-hidden main d-flex">
          <b-card-body>
            <b-form action="" @submit.prevent="login" >
              <div class="main">
                <b-card-img src="https://picsum.photos/400/400/?image=20" alt="Image" class="rounded-0"></b-card-img>
                <div>
                  <div>
                    <input type="email" maxlength="20" @input="validateEmail()" class="input-space" name="email" placeholder="Enter your email" v-model="email" autocomplete="off"/>
                    <small class="font-weight-bold text-danger d-block"  v-if="!isValidEmail && email.length > 0">Please enter valid email address</small>
                    <small class="font-weight-bold text-danger d-block"  v-if="emptyEmail">Email field is required.</small>
                  </div>
                  <div>
                    <input type="submit" name="Login" class="submit-btn input-space" value="Login"/>
                  </div>
                </div>
              </div>
            </b-form>
          </b-card-body>
    </b-card>
    <h2 class="font-weight-bold text-danger d-block mt-2"  v-if="invalidEmail">401-Unauthorized user login</h2>
  </div>
</template>

<script>
import axios from 'axios'
import {
    BForm,
    BCard,
    BCardImg,
    BCardBody
} from 'bootstrap-vue'
export default {
  name: 'user-login',
  data(){
    return{
      email:"",
      isValidEmail:false,
      invalidEmail:false,
      emptyEmail:false,
      isLogin:false
    }
  },
  components:{
    BForm,
    BCard,
    BCardImg,
    BCardBody
  },
  methods:{
    login(){
      localStorage.setItem('isLogin',this.isLogin)
      if(this.email !== '') {
        axios.get('https://jsonplaceholder.typicode.com/users').then((res) => {
          let userData = res.data
          localStorage.setItem('usersDetails',JSON.stringify(userData))
          this.$store.dispatch('setUserDetails',userData)
          let currentData = userData.find((data)=>data.email == this.email)

         if(currentData){
           this.$store.dispatch('setCurrentUserDetail',currentData.email)
             localStorage.setItem('currentUserData',JSON.stringify(currentData))
           this.isLogin = true
           localStorage.setItem('isLogin',this.isLogin)
           this.$router.push({path:'/home'})
         }else{
           localStorage.setItem('isLogin',false)
           this.invalidEmail = true
         }
        }).catch((err) => {
          console.log("err", err)
        })
      }
      else{
        this.emptyEmail = true
      }
    },
    validateEmail(){
      this.emptyEmail = false
      const regex = /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/
      const validCreditCard = regex.test(this.email)
      this.isValidEmail = validCreditCard
    }
  },
  mounted() {
    if(localStorage.getItem('isLogin')){
      this.$router.push('/home')
    }
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
.submit-btn{
  width: 100% !important;
  background: #0078ca;
  border: white;
  color: white;
}
.card{
  margin: 0 auto;
}
</style>
