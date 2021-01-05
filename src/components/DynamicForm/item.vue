<template>

  <el-form-item
    :rules="item.rules"
    :label="item.label"
    :prop="item.key"
    :class="{'block':item.block}"
  >
    <el-input
      v-if="item.type==='input'"
      v-bind="$attrs"
      :type="item.subtype"
      v-on="$listeners"
    ></el-input>

    <!--    <input-number-->
    <!--      v-else-if="item.type==='number'"-->
    <!--      v-bind="$attrs"-->
    <!--      v-on="$listeners"-->
    <!--    ></input-number>-->

    <el-checkbox
      v-else-if="item.type==='switch' && item.appearance==='checkbox'"
      v-bind="$attrs"
      v-on="$listeners"
    ></el-checkbox>
    <el-switch
      v-else-if="item.type==='switch'"
      v-bind="$attrs"
      v-on="$listeners"
    ></el-switch>

    <el-rate
      v-else-if="item.type==='rate'"
      v-bind="$attrs"
      :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
      text-color="#ff9900"
      v-on="$listeners"
    ></el-rate>

    <el-color-picker
      v-else-if="item.type==='color'"
      v-bind="$attrs"
      :color-format="item.format"
      v-on="$listeners"
    ></el-color-picker>

    <el-slider
      v-else-if="item.type==='slider'"
      v-bind="$attrs"
      :range="item.isRange"
      v-on="$listeners"
    ></el-slider>

    <el-radio-group
      v-else-if="item.type==='radio'"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <component
        v-for="o in item.options||ajaxOptions"
        :is="item.button?'el-radio-button':'el-radio'"
        :key="o.value"
        :label="o.value"
        :disabled="o.disabled"
        :border="item.border"
      >{{ o.label }}
      </component>
    </el-radio-group>

    <el-checkbox-group
      v-else-if="item.type==='checkbox'"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <component
        v-for="o in item.options||ajaxOptions"
        :is="item.button?'el-checkbox-button':'el-checkbox'"
        :key="o.value"
        :disabled="o.disabled"
        :label="o.value"
        :border="item.border"
      >{{ o.label }}
      </component>
    </el-checkbox-group>

    <el-select
      style="width: 100%"
      v-else-if="item.type==='select'"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <el-option
        v-for="o in item.options||ajaxOptions"
        :key="o.value"
        :label="o.label"
        :value="o.value"
        :disabled="o.disabled"
      >
      </el-option>
    </el-select>

    <el-cascader
      style="width: 100%"
      v-else-if="item.type==='cascader'"
      v-bind="$attrs"
      :options="item.options||ajaxOptions"
      :clearable="true"
      v-on="$listeners"
    ></el-cascader>

    <el-time-picker
      v-else-if="item.type==='time'"
      :format="item.valueFormat"
      v-bind="$attrs"
      range-separator="至"
      start-placeholder="开始时间"
      end-placeholder="结束时间"
      v-on="$listeners"
    ></el-time-picker>

    <el-date-picker
      v-else-if="item.type==='date'"
      :type="item.subtype"
      :format="item.viewFormat||item.valueFormat"
      v-bind="$attrs"

      range-separator="至"
      start-placeholder="开始时间"
      end-placeholder="结束时间"
      v-on="$listeners"
    ></el-date-picker>


    <span v-else>未知控件类型</span>

  </el-form-item>
</template>

<script>
  import {getData} from "@/api/generic";

  export default {
    name: 'DynamicFormItem',
    components: {},
    props: {
      item: {
        type: Object,
        required: true,
      },

    },
    data() {
      return {
        ajaxOptions: [],
      };
    },
    computed: {
      // Rules() {
      //   const { item: { rules } } = this;
      //   if (rules === undefined) return undefined;
      //
      //   const R = [];
      //
      //   rules.forEach(rule => {
      //     if (rule.sql) {
      //       const validator = (rule2, value, callback) => {
      //         // eslint-disable-next-line
      //         request('/api/validate', 'POST', {
      //           key: rule2.field,
      //           value,
      //           sql: rule.sql.replace(/{key}/gi, rule2.field),
      //         })
      //           .then(res => {
      //             // eslint-disable-next-line
      //             callback(!res || undefined);
      //           })
      //           .catch(err => {
      //             this.$message.error(err.message);
      //             // eslint-disable-next-line
      //             callback(false);
      //           });
      //       };
      //
      //       R.push({ validator, message: rule.message, trigger: 'blur' });
      //     } else {
      //       R.push(rule);
      //     }
      //   });
      //
      //   return R;
      // },
    },
    created() {
      this.getOptions()
    },
    methods: {
      getOptions() {
        const {optionsUrl, params} = this.item;
        if (optionsUrl) {
          getData(optionsUrl, params)
            .then(response => {
              this.ajaxOptions = response.data.items.map(item => {
                return {label: item.name, value: item.id}
              })
            })
        }
      },

    }
  };
</script>

<style scoped>
  .block {
    display: block !important;
    display: flex !important;
  }
</style>
