<template>
  <el-form @submit.native.prevent="saveArticle" ref="form" :model="article" label-width="80px">
    <el-form-item label="标题">
      <el-input v-model="article.title"></el-input>
    </el-form-item>
    <el-form-item label="内容">
      <el-input type="textarea" rows="20" v-model="article.body"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" native-type="submit">立即创建</el-button>
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
      this.$http.post("/articles", this.article).then(res => {
        this.$message({
          message: "恭喜你，成功创建文章!",
          type: "success"
        });
        this.$router.push("/articles");
      }).catch(e=> {
          console.error(e);
      });
    },
    cancel() {
      this.$router.push("/articles")
    }
  }
};
</script>