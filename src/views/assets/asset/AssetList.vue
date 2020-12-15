<template>
  <div class="app-container">
    <generic-list-table
      :table-config="tableConfig"
      v-bind="headerActions"
      :has-left-actions="true"
      :has-right-actions="true"
      :has-search="true"
    />
  </div>
</template>

<script>
  import GenericListTable from '@/components/GenericListTable'
  import {deleteData} from '@/api/generic'
  export default {
    name: "AssetList",
    components: {
      GenericListTable
    },
    data() {
      return {
        // 表格配置
        tableConfig: {
          url: '/vue-element-admin/assets/list',
          columns: [
            {
              prop: 'hostname',
              label: '主机名',
              type: 'detail',
              typeArgs: {
                route:'AssetDetail',
                type:'primary'
              },
            },
            {
              prop: 'ip',
              label: 'IP地址',
            },
            {
              prop: 'hardware',
              label: '硬件信息',
            },
            {
              prop: 'connective',
              label: '可连接',
              type: 'icon',
              typeArgs:{
                iconChoices: [
                  {class:'el-icon-check text-primary',tips:'可连接'},
                  {class:'el-icon-close text-danger',tips:'不可连接'},
                  {class:'el-icon-question text-warning',tips:'未测试'}
                ],
                hasTips: true,
              },
              width: '90px',
              align: 'center'
            }
          ],
          actions:{
            update: {
              label:'更新',
              btnType:'success',
              route: 'AssetUpdate',
            },
            delete:{
              label:'删除',
              btnType:'danger',
              route:undefined,
              func(row){
                console.log('row:',row)
                const id = row.id
                const url = `/vue-element-admin/assets/delete/${id}/`
                return deleteData(url)
              }
            }
          }
        },
        // 表头 动作
        headerActions: {
          hasDownload:true,
          hasFlush:true,
          createRoute: {
            name: 'AssetCreate',
            query: this.$route.query
          },
          searchConfig: {
            options: [
              { value: 'ip', label: 'IP' },
              { value: 'hostname', label: '主机名' }
            ]
          },
          moreActions:{
            update:{
              label: '更新',
              callback: function({ selectedRows }) {
                const ids = selectedRows.map((v) => {
                  return { pk: v.id, is_active: false }
                })
                console.log('/api/v1/assets/assets/:',ids)
              }.bind(this)
            },
            ping:{
              label: '测试连通性'
            },
            setup:{
              label: '更新资产信息'
            },
            delete:{
              label:'删除'
            },
            deactive:{
              label:'禁用'
            },
            active:{
              label:'激活'
            }
          }
        }

      }
    }
    ,
    mounted() {

    }
    ,
    methods: {}

  }
</script>

<style scoped>

</style>
