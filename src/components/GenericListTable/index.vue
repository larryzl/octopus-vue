<template>
  <div>
    <table-action
      :create-route="createRoute"
      :more-actions="moreActions"
      :is-selection="isSelection"
      :search-config="searchConfig"
      @moreActionsCallback="moreActionsCallback"
      @tagSearch="handleTagSearch"
      @flushTable="handleFlushTable"
      @downloadData="handleDownloadSelect"
      v-bind="$attrs" v-on="$listeners"/>

    <data-table ref="dataTable"
                v-bind="config"
                :filter-maps="filterMaps"
                @select="handleSelectChange"
                v-on="$listeners"/>

    <el-dialog title="导出"
               :visible.sync="dialogDownloadVisitAble"
               size="80%"
               direction="rtl">
      <div style="margin: 20px 20px">
        <div style="margin-bottom: 15px">
        <span style="margin-right: 8px;font-weight: bolder;font-size: 15px">导出文件名:</span><el-input v-model="downloadFilename" style="width:70%"></el-input>
        </div>
        <el-radio-group v-model="downloadType" size="small">
          <el-radio label='0' border>导出全部数据</el-radio>
          <el-radio label='1' border :disabled="!isSearch">导出搜索结果</el-radio>
          <el-radio label='2' border :disabled="!isSelection">导出勾选数据</el-radio>
        </el-radio-group>
      </div>
      <div style="text-align: right">
        <el-button  @click="dialogDownloadVisitAble=false">取消</el-button>
        <el-button type="primary" @click="handleDownload">确定</el-button>
      </div>

    </el-dialog>


  </div>
</template>

<script>
  import tableAction from './tableActions'
  import DataTable from '@/components/DataTable'
  import { parseTime } from '@/utils'

  export default {
    name: "GenericListTable",
    components: {
      DataTable, tableAction
    },
    props: {
      tableConfig: {
        type: Object,
        default: () => {
        }
      },
      headerActions: {
        type: Object,
        default: () => {
        }
      },
      createRoute:{
        type:Object,
        default: () =>{}
      },
      moreActions:{
        type:Object,
        default: () =>{}
      },
      searchConfig:{
        type:Object,
        default: () =>{}
      },

    },
    mounted(){
      let a = new Date()
    },
    data() {
      return {
        dialogDownloadVisitAble: false,
        downloadType:'0',
        downloadFilename:'',
        selection: [],
        filterMaps: {},
        defaultConfig: {
          tableAttrs: {
            size: 'mini',
            stripe: false, // 斑马纹表格
            border: true, // 表格边框
            fit: true, // 宽度自适应,
            tooltipEffect: 'dark'
          },
          pageCount: 5,
          paginationLayout: 'total, sizes, prev, pager, next, jumper',
          paginationSizes: [10, 15, 30, 50],
          paginationSize: 10,
          paginationBackground: true,
        }
      }
    },
    computed: {
      config() {
        return Object.assign(this.tableConfig, this.defaultConfig)
      },
      isSelection() {
        return this.selection.length > 0
      },
      isSearch(){
        return Object.keys(this.filterMaps).length >0
      }


    },
    methods: {
      handleSelectChange(selection, row) {
        this.selection = selection
      },
      moreActionsCallback(command) {
        this.headerActions.moreActions[command].callback({selectedRows: this.selection})
      },
      handleTagSearch(filterMaps) {
        this.selection = []
        this.filterMaps = filterMaps
      },
      handleFlushTable(){
        this.$refs.dataTable.getList()
      },
      handleDownloadSelect(){
        this.dialogDownloadVisitAble = true
        this.downloadFilename=this.$route.meta.title + parseTime( new Date(),'{y}-{m}-{d}_{h}-{i}-{s}')
        // this.$refs.dataTable.downloadData()
      },
      handleDownload(){
        this.$refs.dataTable.handleDownloadData(this.downloadType,this.downloadFilename)
      }
    }

  }
</script>

<style scoped>

</style>
