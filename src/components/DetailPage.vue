<template>
  <div>
    <div>
      <h1 class="mb-4 mt-4">Detail page</h1>
      <b-card>
        <b-container fluid>

          <b-table
              :items="items"
              :fields="fields"
              stacked="md"
              show-empty
              small
              responsive
          >
            <template #cell(id)="row">
             {{row.item.id}}
            </template>

            <template #cell(name)="row">
              {{row.item.userId}}
            </template>

            <template #cell(company)="row">
              {{row.item.title}}
            </template>

            <template #cell(actions)>
              <b-button size="sm" @click="back()" class="btn-action">
               Back
              </b-button>
            </template>

          </b-table>
        </b-container>
      </b-card>
    </div>
  </div>
</template>

<script>
import {
  BCard,
  BContainer,
  BTable
} from 'bootstrap-vue'
export default {
  data() {
    return {
      fields : [
        {key: 'id', label: 'id',sortable: false},
        {key: 'userId', label: 'userId',sortable: false},
        { key: 'title',label: 'title', sortable: false },
        {key: 'actions'},
      ],
      id:0,
      name:'',
      email:'',
      company:'',
      items:[]
    }
  },
  components:{
    BCard,
    BContainer,
    BTable
  },
  methods: {
    back() {
     this.$router.push({path:'/'})
    },
  },
  mounted() {
    this.items.push({
      id :  localStorage.getItem('id'),
      userId :  localStorage.getItem('uId'),
      title  :localStorage.getItem('title')
    })
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
</style>