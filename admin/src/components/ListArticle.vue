<template>
  <el-table :data="articles" stripe>
    <el-table-column prop="title" label="标题" width="240"></el-table-column>
    <el-table-column prop="body" label="内容"></el-table-column>
    <el-table-column label="操作" width="200">
      <template slot-scope="scope">
        <el-button size="mini" icon="el-icon-edit"  @click="handleEdit(scope.row._id)">编辑</el-button>
        <el-button size="mini" icon="el-icon-delete" type="danger" @click="handleDelete(scope.row._id)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  data() {
    // const item = {
    //   date: '2016-05-02',
    //   name: '王小虎',
    //   address: '上海市普陀区金沙江路 1518 弄'
    // };
    return {
      // tableData: Array(20).fill(item)
      articles: []
    };
  },
  
  methods: {
    fetch() {
      this.$http.get("articles").then(res => {
        this.articles = res.data;
      });
    },
    handleEdit(id) {
      this.$router.push(`articles/${id}/edit`);
    },
    handleDelete(id) {
      console.info("delete the id:" + id);
      this.$http.delete(`articles/${id}`).then(res => {
        this.$message({
          message: "删除成功",
          type: "success"
        });
     this.fetch();   
      });
    }
     
  },
  created() {
    this.fetch();
  },
};
</script>

