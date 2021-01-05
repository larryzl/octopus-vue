<template>
  <div class="app">
    <data-page-header/>
    <div class="app-container">
      <dynamic-form :formConfig="iConfig" v-bind="$attrs" v-on="$listeners">
        <slot></slot>
      </dynamic-form>
    </div>
  </div>
</template>

<script>
  import DataPageHeader from '@/components/DataPageHeader'
  import DynamicForm from '@/components/DynamicForm'

  export default {
    name: "DataFormPage",
    components: {
      DynamicForm,
      DataPageHeader,
    },
    data(){return{
      defaultConfig:{
        size:'mini',
        labelPosition:'left',
        labelWidth: 'auto',
        labelSuffix:':',
        title:'',
        icon:'el-icon-edit',
      }
    }},
    props:{
      config:{
        type:Object,
        default:()=>{}
      }
    },
    methods:{

    },
    computed:{
      iConfig(){
        return Object.assign(this.defaultConfig,this.config)
      }
    },
    mounted() {
    }
  }
</script>

<style scoped>

</style>
