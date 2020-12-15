<template>
<div class="filter-field">
  <el-cascader ref="Cascade" :options="options" @change="handleMenuItemChange"/>
  <el-tag
    v-for="(v, k) in filterTags"
    :key="k"
    :name="k"
    closable
    size="small"
    class="filter-tag"
    type="info"
    :disable-transitions="true"
    @close="handleTagClose(k)"
    @click="handleTagClick(v,k)"
  >
    <strong v-if="v.label">{{ v.label + ':' }}</strong>
    <span v-if="v.valueLabel">{{ v.valueLabel }}</span>
    <span v-else>{{ v.value }}</span>
  </el-tag>
  <span v-if="keyLabel" slot="prefix" class="filterTitle">{{ keyLabel + ':' }}</span>
  <el-input
    ref="SearchInput"
    v-model="filterValue"
    :placeholder="placeholder"
    class="search-input"
    @blur="focus = false"
    @focus="focus = true"
    @change="handleConfirm"
  />
</div>
</template>

<script>
  export default {
    name: "AutoDataSearch",
    props:{
      searchConfig:{
        type:Object,
        default:()=>{}
      }
    },
    data() {
      return {
        filterTags: this.default || {},
        options: this.searchConfig.options?this.searchConfig.options:[],
        focus: false,
        filterKey: undefined,
        filterValue: undefined,
        valueLabel: undefined
      }
    },
    computed: {
      keyLabel() {
        for (const field of this.options) {
          if (field.value === this.filterKey) {
            return field.label
          }
        }
        return ''
      },
      filterMaps() {
        const data = {}
        for (let key in this.filterTags) {
          const value = this.filterTags[key]['value']
          if (key === '') {
            key = 'search'
          }
          data[key] = value
        }
        return data
      },
      placeholder() {
        if (this.focus && this.filterKey) {
          return '按回车搜索'
        }
        return '输入关键字'
      }
    },
    methods: {
      handleMenuItemChange(keys) {
        // console.log('key:', keys)
        if (keys.length === 0) {
          return
        }
        if (keys.length === 1) {
          this.filterKey = keys[0]
          this.$refs.SearchInput.focus()
        } else if (keys.length === 2) {
          this.filterKey = keys[0]
          this.filterValue = keys[1]
          this.valueLabel = this.getValueLabel(keys[0], keys[1])
          this.handleConfirm()
        }
        this.$nextTick(() => this.$refs.Cascade.handleClear())
      },
      handleConfirm() {
        if (this.filterValue && !this.filterKey) {
          this.filterKey = 'search'
        }
        const tag = { key: this.filterKey, label: this.keyLabel, value: this.filterValue, valueLabel: this.valueLabel }
        this.$set(this.filterTags, this.filterKey, tag)
        this.$emit('tagSearch', this.filterMaps)
        this.filterKey = ''
        this.filterValue = ''
        this.valueLabel = ''

      },
      handleTagClose(evt) {
        this.$delete(this.filterTags, evt)
        this.$emit('tagSearch', this.filterMaps)
        return true
      },
      handleTagClick(v, k) {
        let unableChange = false
        for (const field of this.options) {
          if (field.value === v.key) {
            if (field.type === 'choice') {
              unableChange = true
            }
            if (field.type === 'boolean') {
              unableChange = true
            }
          }
        }
        if (unableChange) {
          return
        }
        if (this.filterValue.length !== 0) {
          this.handleConfirm()
        }
        this.$delete(this.filterTags, k)
        this.filterKey = v.key
        this.filterValue = v.value
        this.$refs.SearchInput.focus()
      }
    }
  }
</script>

<style scoped>
  .filter-field {
    display: flex;
    align-items:  center;
    border: 1px solid #dcdee2;
    border-radius: 3px;
    background-color:#fff;
  }
  .search-input >>> .el-input__inner {
    /*max-width:inherit !important;*/
    max-width: 200px;
    border: none;
    padding-left: 5px;
  }
  .el-input--mini .el-input__inner {
    border: 0;
  }
  .el-input >>> .el-input__inner{
    border: none !important;
    font-size: 13px;
  }

  .filterTitle {
    padding-right: 2px;
    line-height: 80%;
    text-align: center;
    flex-shrink: 0;
    border-collapse: separate;
    box-sizing: border-box;
    color: rgb(96, 98, 102);
    display: inline;
    font-size: 13px;
    height: auto;
  }
  .filter-tag{
    margin: 2px 4px 2px 0;
  }
  .el-icon--right{
    margin-left: 5px;
    margin-right: 5px;
  }
  a {
    color: #000;
  }

  .filter-field >>> .el-cascader .el-input--suffix .el-input__inner {
    padding-right: 20px;
  }

  .filter-field >>> .el-cascader .el-input input {
    width: 0;
    border: none;
  }

  .filter-field >>> .el-input__inner {
    height: 30px;
  }

  .el-cascader-menu__wrap {
    height: inherit;
  }
</style>
