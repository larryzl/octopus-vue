<template>
  <div>
    <el-card>
    <el-form ref="form" :model="formData" :label-width="labelWidth">
      <div v-for="(item,index) in formInfo" :key="index">
        <div style="font-weight: bolder;margin-bottom: 15px">{{item.label}}</div>
        <el-form-item v-for="(field,key) in item.fields" :key="key"
                      :label="field.label">

          <el-input v-if="field.type==='input'" v-model="field.value"  />

          <el-select v-if="field.type==='select'" v-model="field.value" style="width: 100%" >
            <el-option :label="v.label" :value="v.value" :key="k" v-for="(v,k) in field.options"></el-option>
          </el-select>

          <el-input v-if="field.type==='select-input'" v-model="field.input" class="input-with-select" style="width: 30%">
            <el-select slot="prepend" v-model="field.select" placeholder="请选择" style="width: 100%">
              <el-option :label="v.label" :value="v.value" :key="k" v-for="(v,k) in field.options"></el-option>
            </el-select>
          </el-input>

        </el-form-item>
        <el-divider></el-divider>
      </div>
<!--      <el-form-item v-for="(item,index) in formInfo" :key="index" :label="item"-->

    </el-form>
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
    }

  }
</script>

<style scoped>

</style>
