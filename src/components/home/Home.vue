<template>
  <el-container>
    <el-header>
      <el-row
        type="flex"
        align="middle"
      >
        <el-col :span="8">
          <img
            src="../../assets/logo.png"
            alt=""
          >
        </el-col>
        <el-col :span="8">
          <h1>后台管理系统</h1>
        </el-col>
        <el-col
          :span="8"
          class="col3"
        >
          恭喜前端44期月薪2W <a
            href="#"
            @click.prevent="logout"
          >退出</a>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu
          :default-active="getIndex()"
          :router="true"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-submenu
            :index="item1.id +''"
            v-for="item1 in menusList"
            :key="item1.id"
          >
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{item1.authName}}</span>
            </template>
            <el-menu-item
              :index="'/' + item2.path"
              v-for="item2 in item1.children"
              :key="item2.id"
            >
              <span>{{item2.authName}}</span>
            </el-menu-item>
          </el-submenu>
          <!-- <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>权限管理</span>
            </template>
            <el-menu-item index="/roles">
              <span slot="title">角色列表</span>
            </el-menu-item>
            <el-menu-item index="/rights">
              <span slot="title">权限列表</span>
            </el-menu-item>
          </el-submenu> -->
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  created () {
    this.loadMenuData()
  },
  data () {
    return {
      menusList: []
    }
  },
  methods: {
    getIndex () {
      if (this.$route.path === '/goods-add') {
        return '/goods'
      }
      return this.$route.path
    },
    async loadMenuData () {
      let res = await this.$axios.get('menus')
      // console.log(res)
      this.menusList = res.data.data
    },
    async logout () {
      try {
        await this.$confirm('此操作将退出该账户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        this.$router.push('/login')
        localStorage.removeItem('token')
        this.$message({
          type: 'success',
          message: '退出成功!',
          duration: 800
        })
      } catch (error) {
        this.$message({
          type: 'info',
          message: '取消退出',
          duration: 800
        })
      }
    }
  }

}
</script>

<style scoped lang="less">
.el-container {
  height: 100%;
}
.el-header {
  padding: 0;
  background-color: #b3c1cd;
  h1 {
    color: #fff;
    text-align: center;
  }
  .col3 {
    text-align: right;
    padding-right: 30px;
    a {
      color: #daa520;
    }
  }
}
.el-aside {
  background-color: #545c64;
}
.el-main {
  background-color: #eaeef1;
}
</style>
