<template>
  <el-card>
    <div slot="header" v-if="formConfig.title">
      <i :class="formConfig.icon"></i><span>{{formConfig.title}}</span>
    </div>
    <el-form ref="form"
             :model="form"
             :rules="rules"
             :size="formConfig.size"
             :label-position="formConfig.labelPosition"
             :label-width="formConfig.labelWidth"
             :label-suffix="formConfig.labelSuffix"
             >
      <el-row :gutter="20">
        <el-col :span="x.span" v-for="(x, i) in formItems" :key="i">
          <el-form-item :label="x.label" :prop="x.prop">
            <component v-model="form[x.prop]" v-bind="componentAttrs(x)" class="width-full"/>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="searchBtn">
        <el-button class="filter-item" @click="reset">重置</el-button>
        <el-button class="filter-item" type="primary" @click="submit">查询</el-button>
      </div>
    </el-form>
  </el-card>
</template>

<script>
  import {fromEntries,chunk} from '@/utils/chunk'

  export default {
    name:'DataForm',
    props: {
      // config: Object,
      columns: {
        type:Array,
        default:[]
      },
      formConfig:{type:Object,default:{}},

      data: {type:Object,default:{}}
    },
    components: {
      selectBar: {
        functional: true,
        props: {value: String, list: Array, callback: Function},
        render(h, {props: {value = '', list = [], callback}, data: {attrs = {}}, listeners: {input}}) {
          return h('el-select', {
            class: 'width-full', props: {value, ...attrs}, on: {
              change(v) {
                input(v);
                callback(v)
              }
            }
          }, list.map(o => h('el-option', {props: {...o, key: o.value}})))
        }
      },
      checkbox: {
        functional: true,
        props: {value: Boolean, desc: String},
        render(h, {props: {value = '', desc = ''}, data: {attrs = {}}, listeners: {input}}) {
          return h('el-checkbox', {
            props: {value, ...attrs}, on: {
              change(v) {
                input(v)
              }
            }
          }, desc)
        }
      },
      checkboxGroup: {
        functional: true,
        props: {value: Array, list: Array},
        render(h, {props: {value = [], list = []}, data: {attrs = {}}, listeners: {input}}) {
          return h('el-checkbox-group', {
            props: {value, ...attrs}, on: {
              input(v) {
                input(v)
              }
            }
          }, list.map(o => h('el-checkbox', {props: {...o, label: o.value, key: o.value}}, [o.label])))
        }
      },
      radioGroup: {
        functional: true,
        props: {value: String, list: Array},
        render(h, {props: {value = '', list = []}, data: {attrs = {}}, listeners: {input}}) {
          return h('el-radio-group', {
            props: {value, ...attrs}, on: {
              input(v) {
                input(v)
              }
            }
          }, list.map(o => h('el-radio', {props: {...o, key: o.label}}, [o.value])))
        }
      },
    },
    data() {
      // let { columns = [], data = {}, rowSize = 3 } =  this.config || {};
      return {
        TYPE: {
          select: {
            is: 'selectBar',
            clearable: true,   //是否可清空，默认为false不可清空
          },
          text: {
            is: 'el-input',
            clearable: true,
          },
          switch: {
            is: 'el-switch',
          },
          checkbox: {
            is: 'checkbox',
            clearable: true,
          },
          checkboxGroup: {
            is: 'checkboxGroup',
            clearable: true,
          },
          radioGroup: {
            is: 'radioGroup',
            clearable: true,
          },
          daterange: {
            is: 'el-date-picker',
            type: 'daterange',
            valueFormat: 'yyyy-MM-dd',
            rangeSeparator: '至',
            startPlaceholder: '开始日期',
            endPlaceholder: '结束日期',
            editable: false,
          },
          date: {
            is: 'el-date-picker',
            type: "date",
            valueFormat: 'yyyy-MM-dd',
            editable: false,
          },
          auto: {
            is: 'el-autocomplete'
          }
        },
        form: this.columns.reduce((r, c) => Object.assign(r, {[c.prop]: this.data[c.prop] ? this.data[c.prop] : (c.is == 'checkboxGroup' ? [] : null)}), {}),
        rules: this.columns.reduce((r, c) => ({...r, [c.prop]: c.rules ? c.rules : []}), {}),
      }
    },
    mounted(){
      console.log(this.columns)
    },
    computed: {
      formItems() {
        return this.columns;
      },
    },
    methods: {
      componentAttrs(item) {
        let {is = 'text', label} = item,
          map = fromEntries(Object.entries(item).filter(n => !/^(label|prop|span|is|rules)/.test(n[0]))),
          placeholder = (/^(select|el-date-picker)/.test(is) ? '请选择' : '请输入') + label;
        console.log('this:',{...map, ...this.TYPE[is], placeholder}.log)
        return {...map, ...this.TYPE[is], placeholder}
      },
      reset() {
        this.$refs.form.resetFields();
      },
      submit() {
        this.$refs.form.validate(valid => valid && this.$emit('submit', this.form));
      },
      geRules() {
        let rules = {};
        this.columns.forEach(c => {
          let {prop, rules: ruleList = [], required = false} = c;
          rules[prop] = ruleList;
          required && ruleList.unshift({required, message: `${c.label}不能为空`});
        })
        return {rules};
      },
    }
  };
</script>

<style scoped>
  .width-full {
    width: 100%;
  }
</style>
