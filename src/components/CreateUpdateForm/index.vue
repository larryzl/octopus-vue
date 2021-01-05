<template>
  <div>
    <el-card>
    <el-form ref="form" :model="formData" :label-width="labelWidth">
      <div v-for="(item,index) in formInfo" :key="index">
        <div style="font-weight: bolder;margin-bottom: 15px">{{item.label}}</div>
        <el-form-item v-for="(field,key) in item.fields" :key="key"
                      :prop="field.name"
                      :label="field.label">

          <el-input v-if="field.type==='input'" v-model="field.value"  />

          <el-select v-if="field.type==='select'" v-model="field.value" style="width: 100%" >
            <el-option :label="v.label" :value="v.value" :key="k" v-for="(v,k) in field.options"></el-option>
          </el-select>

          <el-input v-if="field.type==='select-input'" v-model="field.input" style="width:100%">
            <el-select slot="prepend"
                       style="width: 100px"
                       @change="handleChangeSelect(field.callback,field.select)"
                       v-model="field.select"  placeholder="请选择" >
              <el-option :label="v.label" :value="v.value" :key="k" v-for="(v,k) in field.options"></el-option>
            </el-select>
          </el-input>


        </el-form-item>
        <el-divider></el-divider>
      </div>
<!--      <el-form-item v-for="(item,index) in formInfo" :key="index" :label="item"-->

    </el-form>
      <el-button @click="handleClick">确定</el-button>
    </el-card>
  </div>

</template>

<script>
  export default {
    name: "CreateUpdateForm",
    props:{
      formData:{
        type:Object,
        default: ()=>{}
      },
      formInfo:{
        type:Array,
        default:()=>[]
      },
      labelWidth:{
        type: String,
        default: '80px'
      }
    },
    data(){

      return {
        select:'',
        input3:''
      }
    },
    methods:{
      handleChangeSelect(func,val){
        func({selected:val})
      },
      handleClick(){
        console.log('this.formData:',this.formData)
      }
    }

  }
</script>

<style scoped>
</style>
