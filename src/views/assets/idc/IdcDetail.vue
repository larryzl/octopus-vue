<template>
  <div class="app">
    <detail-header v-bind="headerInfo" @clickTab="handleTabClick"/>
    <div class="app-container">


      <el-row :gutter="20" v-if="activeTabs==='basicInfo'">
        <el-col :span="16">
          <detail-card v-bind="basicInfo"/>
        </el-col>
        <el-col :span="8">
          <detail-card v-bind="assetActions"/>
        </el-col>
      </el-row>

    </div>
  </div>
</template>

<script>
  import DetailHeader from '@/components/DetailHeader'
  import DetailCard from '@/components/DetailCard'
  import {getData} from '@/api/generic'

  export default {
    name: "IdcDetail",
    components: {
      DetailHeader, DetailCard
    },
    mounted() {
      console.log(this.$route.params)
      this.getData()
    },
    data() {
      return {
        activeTabs:'basicInfo',
        headerInfo: {
          title: '主机:',
          content: '',
          updateBtn: {
            route: 'AssetUpdate'
          },
          hasDelete: true,
          tabs: [
            {name: 'basicInfo', label: '基本信息'},
            {name: 'network', label: '网络信息'},
            {name: 'diskInfo', label: '分区信息'},
            {name: 'logInfo', label: '操作日志'},
          ]
        },
        basicInfo: {
          title: '基本信息',
          icon: 'el-icon-info',
          fields: [
            {label: '主机名',name:'hostname',type:'string'},
            {label: 'IP',name:'ip',type:'string'},
            {label: '协议',name:'port',type:'string'}
          ],
          data:{}
        },
        assetActions: {
          title: '快捷操作',
          icon: 'el-icon-thumb',
          fields:[
            {
              label: '登陆主机',
              type: 'button',
              btnLabel: '登陆',
              name: 'loginAsset',
              callback(){
                console.log('callback')
              }
            },
            {
              label: '激活',
              type: 'switch',
              name: 'isActive',
              callback(){
                console.log('callback')
              }
            },
            {
              label: '测试资产连通性',
              type: 'button',
              btnLabel: '测试',
              name: 'testConnective',
              callback(){
                console.log('callback')
              }
            },
            {
              label: '更新资产信息',
              type: 'button',
              btnLabel: '更新',
              name: 'updateAssetInfo',
              callback(){
                console.log('callback')
              }
            },

          ]
        }

      }
    },
    methods: {
      getData() {
        let id = this.$route.params.id
        getData('/vue-element-admin/assets/detail/', {id: id})
          .then(response => {
            this.basicInfo.data = response.data
            this.headerInfo.title += response.data.hostname
            this.headerInfo.content += response.data.ip
          })
      },
      handleTabClick(tabName){
        this.activeTabs = tabName
        console.log(this.activeTabs)
      }
    }


  }

</script>

<style scoped>

</style>
