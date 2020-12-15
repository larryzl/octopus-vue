<template>
	<div>
    <el-link :type="args.type?args.type:''" @click="handleClick">{{value.name}}</el-link>
  </div>
</template>

<script>
  export default {
    name: "detail",
    props: {
      args: {
        type: Object,
        default: () => {}
      },
      value:{
        type: Object,
        default: () => {}
      }
    },
    methods:{
      handleClick(){
        this.$router.push({name:this.args.route,params:{id:this.value.id}})
      }
    }
  }
</script>

<style scoped>

</style>
