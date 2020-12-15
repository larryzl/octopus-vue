<template>
  <div class="page-header">
    <div class="page-title">
      <el-page-header @back="goBack" :title="title" :content="content">
      </el-page-header>
      <div class="header-actions">
        <el-button size="mini" v-if="hasUpdate" @click=handleUpdate() type="success">修改</el-button>
        <el-button size="mini" v-if="hasDelete" type="danger">删除</el-button>
      </div>

    </div>

    <el-tabs v-model="activeName" @tab-click="handleTabClick">
      <el-tab-pane :label="item.label" :name="item.name" :key="index" v-for="(item,index) in tabs"/>
    </el-tabs>
  </div>
</template>

<script>
  import {fetchAsset} from "../../api/assets";

  export default {
    name: "DetailHeader",
    props: {
      tabs:{
        type: Array,
        default: () => []
      },
      title: {
        type: String,
        default: '返回'
      },
      content: {
        type: String,
        default: '详情'
      },
      updateBtn: {
        type: Object,
        default: () => {
        }
      },
      hasDelete: {
        type: Boolean, default: false
      }

    },
    computed: {
      hasUpdate() {
        return Object.keys(this.updateBtn).length > 0
      }
    },
    mounted() {
      console.log(this.$router)
    },
    data() {
      return {
        activeName:this.tabs[0].name
      }

    },

    methods: {
      handleTabClick(tab,event){
        console.log('clickTab');
        this.$emit('clickTab',tab.name)
      },
      handleUpdate() {
        this.$router.push({name: this.updateBtn.route, params: this.$route.params})
      },
      goBack() {
        this.$router.go(-1)
      }


    }
  }
</script>

<style scoped>
  .page-header {
    background-color: #ffffff;
    margin: 5px 0;
    padding: 15px 15px 0 15px;
  }

  .page-title {
    background-color: #ffffff;
    display: flex;
    flex-direction: row;

    justify-content: space-between;
  }

  .header-actions {
    text-align: left;
  }

  /deep/ .el-tabs__header {
    padding: 0;
    position: relative;
    margin: 0 0 0;
  }

</style>
