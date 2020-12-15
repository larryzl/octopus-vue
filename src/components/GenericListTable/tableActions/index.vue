<template>
  <div class="table-header">
    <slot name="header">
      <div class="table-header-left-side">
        <left-side v-if="hasLeftActions" :selected-rows="selection" v-bind="$attrs" v-on="$listeners"/>
        <span v-else style="display: flex;flex-direction: row">
          <auto-data-search v-if="hasSearch" class="right-side-item action-search"
                            v-bind="$attrs" v-on="$listeners"/>
        </span>
      </div>
        <div class="table-action-right-side">
                <AutoDataSearch v-if="hasLeftActions && hasSearch" class="right-side-item action-search" v-bind="$attrs" v-on="$listeners" />
        <!--        <DatetimeRangePicker v-if="hasDatePicker && hasLeftActions" v-bind="datePicker" class="datepicker" @dateChange="handleDateChange" />-->
                <RightSide v-if="hasRightActions" :selected-rows="selection" v-bind="$attrs" v-on="$listeners" />
      </div>
    </slot>
  </div>
</template>

<script>
  import LeftSide from "./LeftSide";
  import RightSide from "./RightSide";
  import AutoDataSearch from "./AutoDataSearch";

  const defaultTrue = {type: Boolean, default: true}
  const defaultFalse = {type: Boolean, default: false}
  export default {
    name: "tableActions",
    components: {LeftSide, RightSide, AutoDataSearch},

    props: {
      selection: {
        type: Array,
        default: () => []
      },
      isDisabled: defaultTrue,
      hasRightActions: defaultFalse,
      hasLeftActions: defaultFalse,
      hasSearch: defaultFalse,
    },
    computed: {},
    methods: {

    }
  }
</script>

<style scoped>
  .table-header {
    display: flex;
    flex-direction: row;
    padding-bottom: 15px;
    justify-content: space-between;
  }

  .right-side-item {
  }

  .right-side-actions >>> .el-button {
    border: none;
    padding: 5px;
    font-size: 14px;
    width: 26px;
    height: 26px;
    color: #888;
    background-color: transparent;
  }

  .right-side-actions >>> .fa {
    height: 16px;
    width: 16px;
  }

  .right-side-actions >>> .el-button:hover {
    background-color: rgb(0, 0, 0, 0.05);
  }

  .action-search >>> .el-input__suffix i {
    font-weight: 500;
    color: #888;
  }

  .right-side-actions {
    display: flex;
    padding-left: 10px;
    align-items: center;
    justify-content: center;
  }

  .table-action-right-side {
    display: flex;
    justify-content: center;
  }

  .export-item {
    display: block;
    padding: 5px 20px;
  }

  .datepicker {
    margin-left: 10px;
  }


</style>
