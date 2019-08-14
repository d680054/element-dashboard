<template>
  <div class="about">
    <h1>{{id ? '编辑': '新建'}}文章</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="所属分类">
        <el-select v-model="model.categories" multiple >
          <el-option v-for="item in categories" :key="item.id" :label="item.name" :value="item.id">
          </el-option>  
        </el-select>
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="model.title"></el-input>
      </el-form-item>
      <el-form-item label="详情">
        <vue-editor v-model="model.body"></vue-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
export default {
  components: {
    VueEditor
  },
  
  props: {
    id: {}
  },
  data() {
    return {
      model: {},
      categories:[]
    };
  },
  methods: {
    async save() {
      let res;
      if (this.id) {
        res = await this.$http.put(`/articles/${this.id}`, this.model);
      } else {
        res = await this.$http.post("/articles", this.model);
      }
      this.$router.push("/articles/list");
        this.$message({
          message: "保存消息成功",
          type: "success"
        });
    },

    async fetch() {
      const res = await this.$http.get(`/articles/${this.id}`);
      this.model = res.data;
    },

    async fetchCategories() {
      const res = await this.$http.get('/categories');
      this.categories = res.data;
    }
  },
  created() {
    this.id && this.fetch();
    this.fetchCategories();
  }
};
</script>

