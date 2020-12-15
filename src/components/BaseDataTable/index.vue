<template>
  <div>
    <el-table
      ref="baseDataTable"
      :size="tableAttrs.size?tableAttrs.size:'mini'"
      :data="data"
      @select="handleSelect"
      @select-all="handleSelect"
      v-loading="loading"
      style="width: 100%"
      :border="tableAttrs.border"
      :fit="tableAttrs.fit"
      :style="tableAttrs.style?tableAttrs.style:''"
    >
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        v-for="(item,index) in columns"
        :key="index"
        :label="item.label"
        :prop="item.prop"
        :align="item.align"
        :width="item.width?item.width:'auto'"
      >
        <template slot-scope="scope">
          <div v-if="item.type">
            <div v-if="item.type==='icon'">
              <icon :args="item.typeArgs" :value="scope.row[item.prop]"/>
            </div>
            <div v-if="item.type==='detail'">
              <detail :args="item.typeArgs" :value="{id:scope.row.id,name:scope.row[item.prop]}"/>
            </div>
          </div>


          <div v-else>
            {{scope.row[item.prop]}}
          </div>

        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
      >
        <template slot-scope="scope">
          <template v-for="(item,index) in actions">
            <el-button :size="tableAttrs.size?tableAttrs.size:'mini'"
                       :type="item.btnType"
                       v-if="item.route"
                       @click="jump(item.route,scope.row.id)"
                       :key="index">
              {{item.label}}
            </el-button>

            <el-button :size="tableAttrs.size?tableAttrs.size:'mini'"
                       :type="item.btnType"
                       v-else
                       @click="handleFunc(item.func,scope)"
                       :key="index">
              {{item.label}}
            </el-button>
          </template>
        </template>
      </el-table-column>
    </el-table>
  </div>

</template>

<script>
  import icon from './components/icon'
  import detail from './components/detail'

  export default {
    name: "BaseDataTable",
    components: {icon, detail},
    props: {
      columns:{
        type:Array,
        default: () =>[]
      },
      tableAttrs:{
        type:Object,
        default:()=>{}
      },
      actions:{
        type:Object,
        default:()=>{}
      },
      loading:{
        type:Boolean,
        default: true
      },
      data: {
        type: Array,
        default: () => []
      }
    },
    computed: {
    },
    mounted() {

    },
    methods: {
      jump(route, id) {
        this.$router.push({name: route, params: {id}})
      },
      handleFunc(func,scope) {
        func(scope.row)
      },
      handleSelect(selection,row){
        this.$emit('select',selection,row)
      }
    }
  }
</script>

<style scoped>
  .el-button {
    padding: 3px 9px;
  }

</style>
