<template>
  <div>
    <el-button
      type="success"
      plain
      @click="showAddCatDialog"
    >添加分类</el-button>
    <el-table
      :data="catData"
      style="width: 100%"
    >
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-tree
            :data="scope.row.children"
            :props="defaultProps"
          ></el-tree>
        </template>
      </el-table-column>
      <el-table-column
        prop="cat_name"
        label="分类名称"
        width="180"
      >
      </el-table-column>
      <el-table-column
        label="是否有效"
        width="180"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.cat_deleted ? '否' : '是'}}</span>
        </template>
      </el-table-column>
      <el-table-column label="层级">
        <template slot-scope="scope">
          <span v-if="scope.row.cat_level ==0">一级</span>
          <span v-else-if="scope.row.cat_level ==1">二级</span>
          <span v-else>三级</span>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="添加分类"
      :visible.sync="dialogAddCatVisible"
    >
      <el-form
        :model="catForm"
        label-width="80px"
      >
        <el-form-item label="分类名称">
          <el-input
            v-model="catForm.cat_name"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="父级名称">
          <el-cascader
            :options="options"
            clearable
            v-model="catForm.cat_pid_arr"
            :props="defaultProps2"
          ></el-cascader>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogAddCatVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="addCat"
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  created () {
    this.loadCatData()
    this.loadCatData2()
  },
  data () {
    return {
      catData: [{
        cat_name: '王小虎'
      }],
      defaultProps: {
        children: 'children',
        label: 'cat_name'
      },
      defaultProps2: {
        value: 'cat_id',
        label: 'cat_name'
      },
      catForm: {
        cat_pid_arr: [],
        cat_name: '',
        cat_level: ''
      },
      dialogAddCatVisible: false,
      options: [{
        value: 'zhinan',
        label: '指南',
        children: [{
          value: 'shejiyuanze',
          label: '设计原则',
          children: [{
            value: 'yizhi',
            label: '一致'
          }]
        }]
      }]
    }
  },
  methods: {
    async loadCatData () {
      let res = await this.$axios.get('categories', { params: { type: 3, pagenum: 1, pagesize: 4, query: '' } })
      // console.log(res)
      this.catData = res.data.data.result
    },
    async loadCatData2 () {
      let res = await this.$axios.get('categories', { params: { type: 2 } })
      // console.log(res)
      this.options = res.data.data
    },
    showAddCatDialog () {
      this.dialogAddCatVisible = true
    },
    /* eslint-disable */
    async addCat () {
      const { cat_pid_arr, cat_name } = this.catForm
      let res = await this.$axios.post('categories', { cat_pid: cat_pid_arr[cat_pid_arr.length - 1], cat_name })
      if (res.data.meta.status === 201) {
        this.dialogAddCatVisible = false
        this.$message({
          message: '添加分类成功',
          type: 'success',
          duration: 800
        })
        this.loadCatData()
      }

    }
  }
}
</script>

<style>
</style>
