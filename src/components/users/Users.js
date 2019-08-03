export default {
  created () {
    this.getUserData()
  },
  data () {
    return {
      userData: [
        {
          username: '王小虎',
          email: '123@qq.com',
          mobile: '1233211234567'
        }
      ],
      pagenum: 1,
      input3: '',
      total: 0,
      dialogAddUserVisible: false,
      dialogEditUserVisible: false,
      addUserForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      editUserForm: {
        id: 1,
        username: 'zs',
        email: 'aaaa',
        mobile: 'asasa'
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 5, max: 10, message: '长度在 5 到 10 个字符', trigger: 'blur' }
        ],
        email: [
          {
            pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
            message: '格式错误',
            trigger: 'blur'
          }
        ],
        mobile: [
          {
            pattern: /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/,
            message: '格式错误',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    async getUserData (pagenum = 1, query = '') {
      let config = { params: { query, pagenum, pagesize: 2 } }
      let res = await this.$axios.get('users', config)
      this.userData = res.data.data.users
      this.pagenum = res.data.data.pagenum
      this.total = res.data.data.total
      // console.log(res)
    },
    currentChange (curpage) {
      this.getUserData(curpage, this.input3)
    },
    search () {
      this.getUserData(1, this.input3)
    },
    /* eslint-disable */
    async changeState(row) {
      let { id, mg_state } = row
      let res = await this.$axios.put(`users/${id}/state/${mg_state}`)
      if (res.data.meta.status === 200) {
        this.$message({
          message: '修改状态成功',
          type: 'success',
          duration: 800
        })
      }
    },
    showAddDialog() {
      this.dialogAddUserVisible = true
    },
    addFormClear() {
      this.$refs.addUserRef.resetFields()
    },
    async addUser() {
      let res = await this.$axios.post('users', this.addUserForm)
      if (res.data.meta.status === 201) {
        this.dialogAddUserVisible = false
        this.$message({
          message: '添加成功',
          type: 'success',
          duration: 800
        })
        this.getUserData()
      }
    },
    async deleUser(row) {
      let { id } = row
      try {
        await this.$confirm('此操作将删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        await this.$axios.delete(`users/${id}`)
        this.$message({
          type: 'success',
          message: '删除成功!',
          duration: 800
        })
        this.getUserData()
      } catch (error) {
        this.$message({
          type: 'info',
          message: '取消删除',
          duration: 800
        })
      }
    },
    showEditUser(row) {
      this.dialogEditUserVisible = true
      let { id, email, mobile, username } = row
      this.editUserForm.id = id
      this.editUserForm.email = email
      this.editUserForm.mobile = mobile
      this.editUserForm.username = username
    },
    async editUser() {
      let { id, email, mobile } = this.editUserForm
      await this.$axios.put(`users/${id}`, { email, mobile })
      this.dialogEditUserVisible = false
      this.$message({
        type: 'success',
        message: '修改成功!',
        duration: 800
      })
      this.getUserData(this.pagenum)
    }
  }
}
