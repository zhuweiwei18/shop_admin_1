export default {
  /* eslint-disable */
  created() {
    this.loadRolesData()
  },
  data() {
    return {
      rolesData: [
        {
          roleName: '',
          roleDesc: ''
        }
      ],
      roleId: 1,
      dialogAsiignRoleVisible: false,
      treeData: [
        {
          id: 1,
          label: '一级 1',
          children: [
            {
              id: 4,
              label: '二级 1-1',
              children: [
                {
                  id: 9,
                  label: '三级 1-1-1'
                },
                {
                  id: 10,
                  label: '三级 1-1-2'
                }
              ]
            }
          ]
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'authName'
      }
    }
  },
  methods: {
    indexMethod(index) {
      return index
    },
    async loadRolesData() {
      let res = await this.$axios.get('roles')
      this.rolesData = res.data.data
    },
    async showAssignRights(row) {
      this.dialogAsiignRoleVisible = true
      let res = await this.$axios.get('rights/tree')
      this.treeData = res.data.data
      this.roleId = row.id
      let keys = []
      row.children.forEach(item1 => {
        item1.children.forEach(item2 => {
          item2.children.forEach(item3 => {
            keys.push(item3.id)
          })
        })
      })
      this.$refs.tree.setCheckedKeys(keys)
    },
    async assignRights() {
      let keys1 = this.$refs.tree.getHalfCheckedKeys()
      let keys2 = this.$refs.tree.getCheckedKeys()
      let keys = [...keys1, ...keys2]
      let res = await this.$axios.post(`roles/${this.roleId}/rights`, {
        rids: keys.join(',')
      })
      if (res.data.meta.status === 200) {
        this.dialogAsiignRoleVisible = false
        this.$message({
          type: 'success',
          message: '授权成功!',
          duration: 800
        })
        this.loadRolesData()
      }
    }
  }
}
