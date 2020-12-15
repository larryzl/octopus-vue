<template>
  <div>
    <el-card>
      <div slot="header">
        <i :class="icon"></i><span>{{title}}</span>
      </div>
      <div>
        <el-row :gutter="20" v-for="(item,index) in fields" :key="index" style="margin-bottom: 16px">
          <el-col :span="14" class="title">{{item.label}}:</el-col>

          <el-col :span="4" :offset="4" class="content" v-if="item.type==='button'">
            <el-button size="mini" type="success" @click="callBack(item.callback)">{{item.btnLabel}}</el-button>
          </el-col>

          <el-col :span="10" class="content" v-if="item.type==='string'">{{data[item.name]}}</el-col>

          <el-col :span="4" :offset="4" class="content" v-if="item.type==='switch'">
            <el-switch
              v-model="item.name"
              @change="callBack(item.callback)"
              active-color="#13ce66"
              inactive-color="#ff4949">
            </el-switch>
          </el-col>
        </el-row>
      </div>
    </el-card>

  </div>

</template>

<script>
  export default {
    name: "DetailCard",
    props: {
      title:{
        type: String,
        default: '信息'
      },
      icon:{
        type: String,
        default: ''
      },
      fields: {
        type: Array,
        default: () => []
      },
      data:{
        type: Object,
        default: ()=>{}
      }
    },
    methods:{
      callBack(func){
        func()
      }
    }
  }
</script>

<style scoped>
  .title {
    font-size: 13px;
    color: inherit;
    font-weight: bolder;
  }

  .content {
    font-size: 13px;
    color: #746e64;
  }
  .el-button--mini {
    padding: 3px 7px;
    border-radius: 3px;
  }

</style>
