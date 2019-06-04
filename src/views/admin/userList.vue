<template>
  <div>
    <page-title title="用户列表"/>
    <el-table
      v-loading="tableLoading"
      :data="userList"
      element-loading-text="Loading"
      fit
      border
      highlight-current-row>

      <el-table-column
        label="#"
        width="50">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>

      <el-table-column
        label="用户名"
        width="150">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>

      <el-table-column
        label="个性签名">
        <template slot-scope="scope">
          {{ scope.row.personalBrief }}
        </template>
      </el-table-column>

      <el-table-column
        label="出生日期"
        width="180">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.birthday }}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="QQ"
        width="150">
        <template slot-scope="scope">
          {{ scope.row.qq }}
        </template>
      </el-table-column>

      <el-table-column
        label="Email"
        width="180">
        <template slot-scope="scope">
          {{ scope.row.email }}
        </template>
      </el-table-column>

      <el-table-column
        label="手机号"
        width="150">
        <template slot-scope="scope">
          <el-tag size="medium">{{ scope.row.phone }}</el-tag>
        </template>
      </el-table-column>
      
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="small"
            icon="el-icon-edit"
            @click="editUser(scope.row)">编辑</el-button>
          <el-button
            size="small"
            type="danger"
            icon="el-icon-delete"
            @click="deleteUser(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { user_listAll, user_delete } from '@/api/user';
import pageTitle from '@/components/pageTitle';

export default {
  components: {
    pageTitle
  },
  data() {
    return {
      tableLoading: false,
      userList: []
    }
  },
  methods: {
    // 获取用户列表
    getUserList() {
      this.tableLoading = true;
      user_listAll(1, 50).then((resp) => {
        this.userList = resp.data.list;
        console.log(this.userList);
        this.tableLoading = false;
      }).catch((error) => {
        this.$message({
          showClose: true,
          type: 'error',
          message: '出现了一个网络请求错误'
        });
        console.log(error);
        this.tableLoading = false;
      })
    },
    // 路由处理
    handleRouter(router) {
      this.$router.push(router);
    },
    // 编辑用户信息
    editUser(user) {
      console.log(user);
      // this.$router.push({ path: '/admin', query: { articleTitle: user.articleTitle }})
    },
    // 删除用户
    deleteUser(user) {
      console.log(user);
      // 弹框询问
      this.$confirm('确定要清空文章内容吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      // 若确定，则调用api进行删除
      .then(() => {
        user_delete(user.id)
        // 请求响应正常
        .then(resp => {
          var data = resp.data;
          console.log(data);
          // 删除失败
          if (data.code == 0) {
            this.$message({
              showClose: true,
              message: data.msg,
              type: 'error'
            });
          }
          // 删除成功
          else {
            this.$message({
              message: data.msg,
              type: 'success'
            });
            this.getUserList();
          }
        })
        // 请求响应异常
        .catch(error => {
          this.$message({
            showClose: true,
            type: 'error',
            message: '出现了一个网络请求错误'
          });
          console.log(error);
        });
      })
    }
  },
  created() {
    this.getUserList();
  },
}
</script>