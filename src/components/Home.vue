<template>
  <div>
     <div>
       <b-card>
         <b-container fluid>
           <b-row class="justify-content-end">
             <b-col class="my-1 d-flex justify-content-end">
               <b-form-group
                   label="Per page"
                   label-for="per-page-select"
                   class="add-btn"
               >
                 <b-form-select
                     class="add-select"
                     id="per-page-select"
                     v-model="perPage"
                     :options="pageOptions"
                 ></b-form-select>
               </b-form-group>
               <b-button class="add-btn" @click="adddata()">
                 Add
               </b-button>
             </b-col>
           </b-row>
           <div class="spin" v-if="isLoading">
             <b-spinner class="text-primary"></b-spinner>
           </div>
           <div v-else>
             <b-table
                 :items="items"
                 :fields="fields"
                 :current-page="currentPage"
                 :per-page="perPage"
                 :sort-by.sync="sortBy"
                 :sort-desc.sync="sortDesc"
                 :sort-direction="sortDirection"
                 stacked="md"
                 show-empty
                 responsive
                 @filtered="onFiltered"
             >

               <template #cell(id)="row">
                 {{row.value}}

               </template>
               <template #cell(title)="row">
                 {{row.value}}
               </template>

               <template #cell(actions)="row">
                 <b-button size="sm" @click="detailPage(row.item.id,row.item.userId,row.item.title)" class="btn-action">
                   Show Details
                 </b-button>
                 <b-button size="sm" @click="editPage(row.item.id,row.item.userId,row.item.title,row.item.body)" class="btn-action">
                   Edit
                 </b-button>
                 <b-button size="sm" @click="deleteData(row.item.id,row)">
                   Delete
                 </b-button>
               </template>
             </b-table>
           </div>
         </b-container>
         <b-row class="justify-content-end">
           <b-col sm="7" md="6" class="my-1">
             <b-pagination
                 v-model="currentPage"
                 :total-rows="totalRows"
                 :per-page="perPage"
                 align="fill"
                 size="sm"
                 class="my-0"
             >
             </b-pagination>
           </b-col>
         </b-row>
       </b-card>
     </div>
  </div>
</template>

<script>
import axios from 'axios'
import {
    BCard,
    BCol,
    BRow,
    BFormGroup,
    BContainer,
    BButton,
    BPagination,
    BFormSelect,
    BTable,
    BSpinner

} from 'bootstrap-vue'
export default {
  name:"home-page",
  data() {
    return {
      items:[],
      fields : [
        {key: 'id', label: 'id',sortable: true},
        { key: 'title',label: 'title', sortable: true },
        {key: 'actions'},
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 15, { value: 100, text: "Show a lot" }],
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
      filter: null,
      filterOn: [],
      isLoading:true
    }
  },
  components:{
    BCard,
    BCol,
    BRow,
    BFormGroup,
    BContainer,
    BButton,
    BPagination,
    BFormSelect,
    BTable,
    BSpinner
  },
  methods: {
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
    getAllPosts() {
        axios.get(`https://jsonplaceholder.typicode.com/posts`).then((res) => {
          this.isLoading = false
          this.items = res.data
          this.totalRows = this.items.length
      })
    },
    detailPage(id,uId,title){
      localStorage.setItem('id',id)
      localStorage.setItem('uId',uId)
      localStorage.setItem('title',title)
      this.$router.push({ name: "details", params: {id:id,uId:uId,title:title}})
    },
    editPage(id,uId,title,body){
      localStorage.setItem('id',id)
      localStorage.setItem('uId',uId)
      localStorage.setItem('title',title)
      localStorage.setItem('body',body)
      this.$router.push({ name: "editdetail", params: {id:id,uId:uId,title:title,body:body}})
    },
    deleteData(id){
      if (confirm('Are you sure you want to delete this post?')) {
        axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`).then(() => {
          alert("Post is deleted successfully!")
        })
      }
    },
    adddata(){
      this.$router.push('/add')
    }
  },
  mounted() {
    this.getAllPosts()
  },
}
</script>

<style scoped>
.card{
  margin: 0 auto;
}
.btn-action{
  margin-right: 12px !important;
}
.spin{
  height:150px;
  margin: 0 auto;
}
.spin span{
  width: 70px;
  height:70px;
}
.add-btn{
  width: 200px;
  padding: 3px;
}
.add-select{
  width: 150px;
}
</style>