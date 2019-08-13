<template>
  <el-form @submit.native.prevent="saveArticle" ref="form" :model="article" label-width="80px">
    <el-form-item label="标题">
      <el-input v-model="article.title"></el-input>
    </el-form-item>
    <el-form-item label="内容">
      <el-input type="textarea" rows="20" v-model="article.body"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" native-type="submit">保存</el-button>
      <el-button @click="cancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      article: {}
    };
  },
  methods: {
    saveArticle() {
      this.$http.put(`/articles/${this.$route.params.id}`, this.article).then(res => {
        this.$message({
          message: "文章更新成功!",
          type: "success"
        });
        this.$router.push("/articles");
      }).catch(e=> {
          console.error(e);
      });
    },
    fetch() {
      this.$http.get(`/articles/${this.$route.params.id}`).then(res=> {
        this.article = res.data;
      })
    },
    cancel() {
      this.$router.push("/articles")
    }
  },
  created() {
    this.fetch();
  }
};
</script>