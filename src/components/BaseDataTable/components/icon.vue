<template>
  <div>
    <el-tooltip v-if="hasTips" :content="iContent">
      <i :class="iClass"></i>
    </el-tooltip>
    <i v-else :class="iClass"></i>
  </div>
</template>

<script>
  export default {
    name: "icon",
    props: {
      args: {
        type: Object,
        default: () => {}
      },
      value:{
        type: Number,
        default: 0
      }
    },
    computed: {
      hasTips(){
        return this.args.hasTips?this.args.hasTips:false
      },
      iClass() {
        return this.args.iconChoices[this.value]['class']
      },
      iContent() {
        return this.args.iconChoices[this.value]['tips']
      }
    }
  }
</script>

<style scoped>
  .text-danger {
    color: #d5223f;
    font-weight: bolder;
  }
  .text-primary {
    color: #37D552;
    font-weight: bolder;
  }
  .text-warning {
    color: #cfcf00;
    font-weight: bolder;
  }
</style>
