<template>
  <el-select v-model="value" placeholder="请选择">
    <el-option
      v-for="item in list"
      :key="item.value"
      :disabled="item.disable?item.disable:false"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
</template>

<script>
  export default {
    name: "SelectBar",
    props: {
      value: {type: String, default: ''},
      list: {type: Array, default: () => []},
      callback: {
        type: Function, default: () => {
        }
      }
    },
    data() {
      return {
        attrs: {}
      }
    },

  }
</script>

<style scoped>

</style>
