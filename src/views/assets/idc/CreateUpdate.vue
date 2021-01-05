<template>
  <data-form-page v-bind="formConfig" :value="value" ref="form" @input="handleInput"/>
</template>

<script>
  import {getData} from '@/api/generic'
  import DataFormPage from '@/components/DataFormPage'

  const statusLlist = [
    {label: '未提交', value: "0"},
    {label: '待审批', value: "1"},
    {label: '已通过', value: "2", disabled: true}
  ]

  export default {
    components: {
      DataFormPage
    },
    data() {
      // const confimPass = (rule, value, callback) => {
      //   if (value === '') {
      //     callback(new Error('请再次输入密码'));
      //   } else if (value !== this.$refs.form.form.password) {
      //     callback(new Error('两次输入密码不一致!'));
      //   } else {
      //     callback();
      //   }
      // };
      const defaultRequireRule = [{required: true}]
      return {
        // ambientList:[{label:'aaa',value:'1'}],
        // data: {},
        value: {
          hostname: '',
          ip: '',
          ambient: '',
          state: 0,
          idc: '',
          proto: 'ssh',
          port: 22,
          platform: '',
          asset_auth: '',
          monitor_detail: [],
          public_ip: '',
          label: '',
          project: '',
          comment: '',
        },
        formConfig: {
          config: {
            title: '填写信息'
          },
          columns: [
            {key: 'hostname', label: '主机名', type: 'input', rules: defaultRequireRule},
            {key: 'ip', label: 'IP地址', type: 'input', rules: defaultRequireRule},
            {
              key: 'ambient',
              label: '环境',
              type: 'select',
              optionsUrl: '/vue-element-admin/ambient/list',
              params: {limit: 'all'},
              rules: defaultRequireRule
            },
            {
              key: 'state',
              label: '主机状态',
              type: 'radio',
              options: [
                {value: 0, label: '正常'},
                {value: 1, label: '维护'},
                {value: 2, label: '下架'},
              ],
              rules: defaultRequireRule
            },
            {
              key: 'platform',
              span: 12,
              label: '系统平台',
              type: 'select',
              options: [
                {value: 'Linux', label: 'Linux'},
                {value: 'Unix', label: 'Unix'},
                {value: 'MacOS', label: 'MacOS'},
                {value: 'BSD', label: 'BSD'},
                {value: 'Windows', label: 'Windows'},
                {value: 'Other', label: 'Other'},
              ],
              rules: defaultRequireRule
            },
            {
              key: 'monitor_detail',
              label: '绑定监控',
              span: 12,
              type: 'cascader',
              options: [
                {label: 'ZABBIX', value: 'zabbix', children: [{label: '11.1.1.2', value: '11.1.1.2'}]},
              ],
            },
            {
              key: 'proto',
              label: '协议',
              type: 'select',
              span: 12,
              options: [{value: 'ssh', lable: 'ssh'}, {value: 'telnet', label: 'telnet'}],
              rules: defaultRequireRule,
              callback: function ({selectValue}) {
                switch (selectValue) {
                  case 'ssh':
                    this.value.port = 22
                    break
                  case 'telnet':
                    this.value.port = 23
                    break
                }

              }.bind(this)
            },
            {
              key: 'port',
              label: '端口',
              type: 'input',
              span: 12,
              rules: defaultRequireRule
            },
            {key: 'comment', label: '备注', type: 'input',subtype:'textarea'},
          ],

          // columns: {
          //   hostname: {
          //     label: '主机名',
          //     type: "input", rules: [{required: true, message: '请填写主机名'}],
          //     span: 12,value:'12'
          //   },
          //   ip: {
          //     label: "IP地址",
          //     type: "input", rules: [{required: true, message: '请填写IP地址'}],
          //     span: 12,value:''
          //   },
          //   ambient: {
          //     prop: 'ambient', label: '环境', type: 'select', list: statusLlist, span: 12,
          //     rules: [{required: true, message: '请选择环境'}]
          //   },


          // { prop: "certificateId", label: "统一信用代码", rules: [{required: true, message: '请输入统一信用代码'}],span:12 },
          // { prop: 'date', label: "日期", is: 'date', span:8},
          // { prop: 'status', label: "状态", is: 'select', list: statusLlist, callback: r => this.statusChange(r) ,span:8},
          // { prop: "password", label: "密码", type: 'password' ,span:8},
          // { prop: "confimPass", label: "确认密码", type: 'password', rules: [{validator: confimPass}] },
          // { prop: 'remark', label: "备注", type: 'textarea' },
          // { prop: "email", label: "邮箱", rules: [{ required: true, message: '请输入邮箱地址' }, { type: 'email', message: '请输入正确的邮箱地址' }] },
          // { prop: 'love', label: '爱好', is: 'checkboxGroup', list: [{label: '篮球', value: "0"}, {label: '排球', value: "1"}, {label: '足球', value: "2", disabled: true}] },
          // },
        },
      }
    },
    mounted() {
      this.getData()
    },
    computed: {},
    methods: {
      handleInput(val) {
        console.log('create update handleInput val:', val);
        this.value = val
      },

      getData() {
        // console.log('getData');
        if ('id' in this.$route.params) {
          getData('/vue-element-admin/assets/detail', {id: this.$route.params.id}).then(response => {
            this.value = Object.assign(this.value, response.data)
          })
        }
      },
      querySearch(q, cb) {
        if (!q) {
          cb([]);
          return
        }
      },
      // getList(res){
      //   console.log(res)
      // },
      statusChange(r) {
        console.log(r)
      },
    },
  }
</script>
