<template>
  <div>
    <el-steps
      :active="activeIndex"
      finish-status="success"
    >
      <el-step
        title="第一步"
        description="基本信息"
      ></el-step>
      <el-step
        title="第二步"
        description="商品图片"
      ></el-step>
      <el-step
        title="第三步"
        description="商品内容"
      ></el-step>
    </el-steps>
    <el-tabs
      v-model="activeName"
      tab-position="left"
      style="height: 200px;"
    >
      <el-tab-pane
        label="基本信息"
        name="one"
      >基本信息</el-tab-pane>
      <el-tab-pane
        label="商品图片"
        name="two"
      >商品图片</el-tab-pane>
      <el-tab-pane
        label="商品内容"
        name="three"
      >商品内容</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeIndex: 1,
      activeName: 'one'
    }
  }
}
</script>

<style>
</style>
