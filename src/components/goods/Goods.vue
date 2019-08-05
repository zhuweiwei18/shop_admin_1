<template>
  <div>
    <el-button
      type="success"
      plain
      @click="go2AddGoods"
    >添加商品</el-button>
    <el-table
      :data="goodsData"
      style="width: 100%"
    >
      <el-table-column type="index"></el-table-column>
      <el-table-column
        prop="goods_name"
        label="商品名称"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="goods_price"
        label="商品价格"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="goods_number"
        label="商品数量"
      >
      </el-table-column>
      <el-table-column
        prop="add_time"
        label="创建时间"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.add_time | dateFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  created () {
    this.loadGoodsData()
  },
  data () {
    return {
      goodsData: [{
        add_time: '2016-05-02',
        goods_number: 123,
        goods_name: '王小虎',
        goods_price: 128,
        address: '上海市普陀区金沙江路 1518 弄'
      }]
    }
  },
  filters: {
    dateFilter (res) {
      return moment(res).format('YYYY-MM-DD')
    }
  },
  methods: {
    async loadGoodsData () {
      let res = await this.$axios.get('goods', { params: { query: '', pagenum: 1, pagesize: 4 } })
      this.goodsData = res.data.data.goods
    },
    go2AddGoods () {
      this.$router.push('/goods-add')
    }
  }
}
</script>

<style>
</style>
