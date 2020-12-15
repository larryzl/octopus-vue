<template>
  <div>
    <base-data-table :data="data" :loading="loading" @select="handleSelectChange" v-bind="$attrs" v-on="$listeners"/>
    <pagination v-show="total>0" :total="total" :page.sync="param.page" :paginationSize=paginationSize
                :limit.sync="param.limit"
                @pagination="getList" v-bind="$attrs" v-on="$listeners"/>
  </div>
</template>

<script>
  import BaseDataTable from '@/components/BaseDataTable'
  import {getData} from '@/api/generic'
  import Pagination from '@/components/Pagination'
  import {parseTime} from '@/utils'

  export default {
    name: 'DataTable',
    components: {
      BaseDataTable, Pagination
    },
    props: {
      filterMaps: {
        type: Object,
        default: () => {
        }
      },
      url: {
        type: String,
        default: ''
      },
      paginationSize: {
        type: Number,
        default: 20
      }
    },
    data() {
      return {
        tableData: [],
        data: [],
        total: 0,
        downloadData: [],
        selection: [],
        tableHeader: [],
        loading: true,
        param: {
          page: 1,
          limit: this.paginationSize
        }
      }
    },
    watch: {
      filterMaps: {
        handler: function (val, oldVal) {
          this.getList(Object.assign({}, this.param, val))
        },
        deep: true
      },
    },
    mounted() {
      this.getList()
    },
    computed: {},
    methods: {
      handleSelectChange(selection, row) {
        this.selection = selection
        this.$emit('select', selection, row)
      },
      getList(param) {
        this.loading = true
        getData(this.url, param ? param : this.param).then(response => {
          setTimeout(() => {
            this.data = response.data.items
            this.total = response.data.total
            this.tableHeader = this.data.length > 0 ? Object.keys(this.data[0]) : []
            this.tableHeader = this.tableHeader.filter(item => {
              return item != "id"
            })
            this.loading = false
          }, 1000)
          // this.data = response.data.items
        })
      },
      async handleDownloadData(type, title) {

        this.fetchData().then(data => {


          import('@/vendor/Export2Excel').then(excel => {

            const header = this.tableHeader
            const filterVal = this.tableHeader
            excel.export_json_to_excel({
              header,
              data,
              filename: title
            })
          })
        })
      },
      async fetchData() {
        const response = await getData(this.url, {limit: this.total})
        return await response.data.items
      },

      async formatJson(type, filterVal) {
        await this.fetchData().then(data => {
          return data.map(v => filterVal.map(j => {
            if (j === 'timestamp') {
              return parseTime(v[j])
            } else {
              return v[j]
            }
          }))
        })
      },
    }

  }
</script>

<style scoped>

</style>
