<template>
<div>
  <el-card style="margin: 5px 0">
    <div slot="header">
       <span style="font-size: 18px;font-weight: bolder;color: #746e64">
         <i class="el-icon-arrow-left" style="" @click="goBack()"></i>
         {{title}}
       </span>
    </div>
  </el-card>
</div>
</template>

<script>
  export default {
    name: "CreateUpdateHeader",
    mounted() {
      console.log()
    },
    computed:{
      title(){
        return this.$route.meta.title || '创建'
      }
    },
    methods:{
      goBack(){
        this.$router.back()
      }
    }
  }
</script>

<style scoped>
  /deep/ .el-card__body {
    padding: 0;
  }
  .el-icon-arrow-left{
    font-weight: bolder;

  }
  .el-icon-arrow-left:hover{
    cursor:pointer;
    font-weight: bolder;
    color: #1c00a0;
  }

</style>
