<template>
  <div class="about">
    <h1>{{id ? '编辑': '新建'}}物品</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="图标">
        <el-upload
          class="avatar-uploader"
          :action="$http.uploadURL + 'upload'"
          :show-file-list="false"
          :on-success="afterUpload"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="model.icon" :src="model.icon" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
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
      model: {}
    };
  },
  methods: {
    async save() {
      let res;
      if (this.id) {
        res = await this.$http.put(`/items/${this.id}`, this.model);
      } else {
        res = await this.$http.post("/items", this.model);
      }
      this.$router.push("/items/list");
      this.$message({
        message: "添加物品成功",
        type: "success"
      });
    },

    async fetch() {
      const res = await this.$http.get(`/items/${this.id}`);
      this.model = res.data;
    },

    afterUpload(res) {
      this.$set(this.model, 'icon', res.url);
      //this.model.icon = res.url;
    },

    handleAvatarSuccess(res, file) {
        this.model.icon = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = (file.type === 'image/jpeg' || file.type=== 'image/png');
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
  },
  created() {
    this.id && this.fetch();
  }
};
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>

