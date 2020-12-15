<template>
  <div :class="{'hidden':hidden}" class="pagination-container">
    <el-pagination
      :background="paginationBackground"
      :current-page.sync="currentPage"
      :page-size.sync="pageSize"
      :layout="paginationLayout"
      :page-sizes="paginationSizes"
      :total="total"
      v-bind="$attrs"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
  import {scrollTo} from '@/utils/scroll-to'

  export default {
    name: 'Pagination',
    props: {
      total: {
        required: true,
        type: Number
      },
      page: {
        type: Number,
        default: 1
      },
      paginationSize: {
        type: Number,
        default: 20
      },
      paginationSizes: {
        type: Array,
        default() {
          return [10, 20, 30, 50]
        }
      },
      paginationLayout: {
        type: String,
        default: 'total, sizes, prev, pager, next, jumper'
      },
      paginationBackground: {
        type: Boolean,
        default: true
      },
      autoScroll: {
        type: Boolean,
        default: true
      },
      hidden: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      currentPage: {
        get() {
          return this.page
        },
        set(val) {
          this.$emit('update:page', val)
        }
      },
      pageSize: {
        get() {
          return this.paginationSize
        },
        set(val) {
          this.$emit('update:limit', val)
        }
      }
    },
    methods: {
      handleSizeChange(val) {
        this.$emit('pagination', {page: this.currentPage, limit: val})
        if (this.autoScroll) {
          scrollTo(0, 800)
        }
      },
      handleCurrentChange(val) {
        this.$emit('pagination', {page: val, limit: this.pageSize})
        if (this.autoScroll) {
          scrollTo(0, 800)
        }
      }
    }
  }
</script>

<style scoped>
  .pagination-container {
    background: #fff;
    padding: 32px 16px;
    margin-top: 0;
  }

  .pagination-container.hidden {
    display: none;
  }
</style>
