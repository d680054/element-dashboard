<template>
  <div class="about">
    <h1>{{id ? '编辑': '新建'}}分类</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="上级分类">
        <el-select v-model="model.parent">
          <el-option v-for="item in parents" :key="item.id" :label="item.name" :value="item.id">
          </el-option>  
        </el-select>
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    id: {}
  },
  data() {
    return {
      model: {},
      parents:[]
    };
  },
  methods: {
    async save() {
      let res;
      if (this.id) {
        res = await this.$http.put(`/categories/${this.id}`, this.model);
      } else {
        res = await this.$http.post("/categories", this.model);
      }
      this.$router.push("/categories/list");
        this.$message({
          message: "保存消息成功",
          type: "success"
        });
    },

    async fetch() {
      const res = await this.$http.get(`/categories/${this.id}`);
      this.model = res.data;
    },

    async fetchParents() {
      const res = await this.$http.get('/categories');
      this.parents = res.data;
      // res.data.forEach(item=> {
      //   console.log(item.name)
      //   this.parentOptions.push({'label':item.name, 'value':item._id});
      // })
      
    }
  },
  created() {
    this.id && this.fetch();
    this.fetchParents();
  }
};
</script>

