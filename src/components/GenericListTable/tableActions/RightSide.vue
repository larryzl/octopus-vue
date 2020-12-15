<template>
  <div style="padding-left: 15px">
    <el-button v-if="hasFlush" size="mini" type="primary" icon="el-icon-refresh" circle @click="handleFlush" />
    <el-button
      size="mini"
      v-if="hasDownload"
      type="primary"
      icon="el-icon-download"
      circle
      @click="handleDownload" />
  </div>
</template>


<script>
  export default {
    name: "RightSide",
    props: {
      hasDownload: {
        type: Boolean,
        default: false
      },
      hasFlush: {
        type: Boolean,
        default: false
      },
    },
    data(){
      return{
      }
    },
    mounted(){

    },
    methods: {
      handleFlush() {
        this.$emit('flushTable')
      },
      handleDownload(){
        this.$emit('downloadData')
      }
    }
  }
</script>

<style scoped>

</style>
