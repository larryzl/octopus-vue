<template>
  <el-card>
    <div slot="header" v-if="formConfig.title">
      <i :class="formConfig.icon">{{formConfig.title}}</i>
<!--      <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>-->
    </div>
    <el-form
      :model="value"
      v-bind="formConfig"
    >
      <el-row :gutter="20">
        <el-col v-for="(item,index) in columns" :span="item.span?item.span:24" :key="index">
          <dynamic-form-item
            v-if="value[item.key]!==undefined"
            :key="item.key"
            :item="item"
            v-bind="item"
            :value="value[item.key]"
            :style="{'min-width':columnMinWidth}"
            @input="handleInput(arguments,item)"
          ></dynamic-form-item>
        </el-col>
      </el-row>
      <slot></slot>
    </el-form>
  </el-card>
</template>

<script>
  import DynamicFormItem from './item'

  export default {
    name: 'DynamicForm',
    props: {
      columns: {
        type: Array,
        required: true,
      },
      value: {
        type: Object,
        required: true,
      },
      formConfig: {
        type: Object, required: true
      },
      columnMinWidth: {
        type: String,
        default: '80px'
      },
    },
    components: {DynamicFormItem},
    mounted() {
      this.setDefaultValue();
    },
    methods: {
      handleInput(val, item) {
        const {callback, key} = item
        this.$emit('input', {...this.value, [key]: val[0]});
        if (callback !== undefined) {
          callback({selectValue: val[0]})
        }
        // console.log('handleInput: val:',val,'key:',key);
        // 这里element-ui没有上报event，直接就是value了

      },
      setDefaultValue() {
        const formData = {...this.value};
        // 设置默认值
        this.columns.forEach(item => {
          const {key, value} = item;
          if (formData[key] === undefined || formData[key] === null) {
            formData[key] = value;
          }
        });
        this.$emit('input', {...formData});
      },
    },
  };
</script>

<style scoped lang="scss">
  /*.dynamic-form.el-form--inline {*/

  /*   .block {*/
  /*     padding-right: 10%;*/
  /*  }*/

  /*  .el-form-item {*/
  /*    display: inline-flex;*/
  /*    // margin-right: 0;*/
  /*    // padding-left: 10px;*/

  /*    .el-form-item__content {*/
  /*      flex: 1;*/
  /*      display: inline-flex;*/
  /*      align-items: center;*/

  /*      .el-slider {*/
  /*        width: 100%*/
  /*      }*/
  /*    }*/

  /*    .el-date-editor.el-input, .el-date-editor.el-input__inner, .el-select, .el-cascader {*/
  /*      width: 100%;*/
  /*    }*/
  /*  }*/
  /*}*/
</style>
