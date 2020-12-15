<template>
  <div class="app">
    <create-update-header />

    <div class="app-container">
      <create-update-form :form-data="formData" :form-info="formInfo"/>
    </div>
  </div>

</template>

<script>
  import CreateUpdateHeader from '@/components/CreateUpdateHeader'
  import CreateUpdateForm from '@/components/CreateUpdateForm'
  export default {
    name: "CreateUpdate",
    components:{
      CreateUpdateHeader,CreateUpdateForm
    },
    data(){
      return{
        formData:{},
        formInfo:[
          {
            name:'basic',
            label: '基本信息',
            fields:[
              {
                name:'hostname',
                value:'',
                label:'主机名称',
                type:'input'
              },
              {
                label:'IP',
                type:'input',
                value:''
              },
              {
                label:'系统平台',
                type:'select',
                value:'',
                options:[
                  {label:'1',value:'a'},
                  {label:'2',value:'b'},
                  {label:'3',value:'c'},
                  {label:'4',value:'d'},
                ]
              },

            ]
          },
          {
            name:'port',
            label:'协议组',
            fields:[
              {
                label:'协议/端口',
                type:'select-input',
                input:'',
                select:'',
                options:[
                  {label:'ssh',value:22},
                  {label:'rdp',value:3389},
                  {label:'vnc',value:5091},
                ]
              }
            ]

          }
        ]
      }
    }
  }
</script>

<style scoped>

</style>
