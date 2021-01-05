<template>
  <el-form-item :label="item.label" :prop="item.prop">
    <el-input
      v-if="item.type==='input'"
      v-bind="$attrs"
      :type="item.subType"
      v-on="$listeners"
      :value="item.value" >

    </el-input>

  </el-form-item>
</template>

<script>
  export default {
    name: "DynamicFormItem",
    props:{
      item:Object
    }
  }
</script>

<style scoped>

</style>
