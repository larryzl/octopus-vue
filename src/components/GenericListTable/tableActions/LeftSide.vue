<template>

  <div>
    <el-button
      type="success"
      v-if="createRoute"
      size="mini"
      @click="jump(createRoute)">创建
    </el-button>

            <el-dropdown style="padding-left: 8px"
                         @command="callback"
                         v-if="moreActions" >
              <el-button type="primary" size="mini">
                更多操作<i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  :command="index"
                  :disabled="!isSelection"
                  :key="index"
                  v-for="(item,index) in moreActions"
                >{{item.label}}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
  </div>
</template>

<script>
  export default {
    name: "LeftSide",

    props: {
      isSelection:{
        type: Boolean,
        default: false
      },
      createRoute:{
        type: Object,
        default: ()=>{}
      },
      moreActions:{
        type: Object,
        default: ()=>{}
      },

      headerActions: {
        type: Object,
        default: () => {
        }
      },
      selectedRows: {
        type: Array,
        default: () => []
      }

    },
    created() {
    },
    computed: {

    },
    methods: {
      jump(route) {
        this.$router.push(route)
      },
      callback(command) {
        this.$emit('moreActionsCallback',command)
        // this.moreActions[command].callback({selectedRows: this.selection})
      }
    }

  }
</script>

<style scoped>
</style>
