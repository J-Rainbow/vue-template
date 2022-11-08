<template>
  <div class="container">
    <div class="header">
      <ul>
        <li>
          <span>所属店铺：</span>
          <el-input size="mini" />
        </li>
        <li>
          <span>源视频平台：</span>
          <el-input size="mini" />
        </li>
        <li>
          <span>翻译视频语言：</span>
          <el-input size="mini" />
        </li>
        <li>
          <span>翻译任务进度：</span>
          <el-input size="mini" />
        </li>
        <li>
          <el-button size="mini" type="primary">搜索</el-button>
          <el-button size="mini" type="primary" @click="taskVisible=true">创建任务</el-button>
        </li>
      </ul>
    </div>
    <div class="article">
      <el-table
        :data-changes-scroll-top="false"
        :border="false"
        :data="tableData"
        height="calc(100% - 100px)"
        :header-cell-style="{
          textAlign: 'center',
          backgroundColor: '#f5f7fa',
        }"
        @selection-change="handleSelectionChange"
      >
        <el-table-column align="center" type="selection" min-width="50px" />
        <el-table-column align="center" label="序号" type="index" width="50px" fixed />
        <el-table-column align="center" label="站点" min-width="80px" />
        <el-table-column align="center" label="店铺名称" min-width="100px" />
        <el-table-column align="center" label="直播名称" min-width="100px" />
        <el-table-column align="center" label="直播商品关联" min-width="100px" />
        <el-table-column align="center" label="CBS配置" min-width="100px" />
        <el-table-column align="center" label="直播进度" min-width="100px" />
        <el-table-column align="center" label="源视频平台" min-width="100px" />
        <el-table-column align="center" label="源视频语言" min-width="100px" />
        <el-table-column align="center" label="源视频地址" min-width="100px" />
        <el-table-column align="center" label="翻译任务进度" min-width="100px" />
        <el-table-column align="center" label="翻译视频语言" min-width="100px" />
        <el-table-column align="center" label="云视频地址" min-width="100px" />
        <el-table-column align="center" label="本地视频地址" min-width="100px" />
        <el-table-column align="center" label="云视频过期时间" min-width="100px" />
        <el-table-column align="center" label="操作" min-width="100px">
          <template v-slot="{row}">
            <el-dropdown>
              <el-button size="mini" type="primary">
                更多操作<i class="el-icon-arrow-down el-icon--right" />
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item> <div class="dropdownItem">开始直播</div></el-dropdown-item>
                <el-dropdown-item> <div class="dropdownItem">翻译视频</div></el-dropdown-item>
                <el-dropdown-item> <div class="dropdownItem">删除</div></el-dropdown-item>
                <el-dropdown-item> <div class="dropdownItem">复制</div></el-dropdown-item>
                <el-dropdown-item> <div class="dropdownItem">更新直播商品</div></el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      v-if="taskVisible"
      :modal="false"
      title="创建任务"
      :visible.sync="taskVisible"
      width="500px"
      top="5vh"
      class="task-dialog"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-form ref="form" :rules="rules" label-position="right" :model="taskForm" label-width="80px">
        <el-form-item label="封面图" prop="cover_pic">
          <el-upload
            class="avatar-uploader"
            action="#"
            accept=".jpg,.jpeg,.png,.webp"
            :show-file-list="false"
            :auto-upload="false"
            :on-change="importImageChange"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
        </el-form-item>
        <el-form-item label="标题" prop="title">
          <el-input v-model="taskForm.title" size="mini" placeholder="请输入标题（建议不超过20个字符）" />
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="taskForm.description" placeholder="请输入描述" :rows="4" size="mini" type="textarea" maxlength="200" show-word-limit resize="none" />
        </el-form-item>
        <el-form-item label="相关商品">
          <el-input v-model="taskForm.name" size="mini" />
        </el-form-item>
        <el-form-item label="上传视频">

          <el-upload
            id="upload-video"
            class="avatar-uploader"
            action="#"
            accept=".mp4,.avi,.wmv,.webp,.mpg,.mpeg,.mov"
            :show-file-list="false"
            :auto-upload="false"
            :on-progress="uploadVideoProcess"
            :on-change="importVideoChange"
          >
            <video
              v-if="videoForm.showVideoPath != '' && !videoFlag"
              :src="videoForm.showVideoPath"
              class="avatar video-avatar"
              controls="controls"
            />
            <i
              v-else-if="videoForm.showVideoPath == '' && !videoFlag"
              class="el-icon-plus avatar-uploader-icon"
            />
            <el-progress
              v-if="videoFlag == true"
              type="circle"
              :percentage="videoUploadPercent"
              style="margin-top: 7px"
            />
          </el-upload>
        </el-form-item>
        <el-form-item label="传输类型">
          <el-radio-group v-model="taskForm.is_test">
            <el-radio :label="false">常规</el-radio>
            <el-radio :label="true">测试</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div class="footer">
        <el-button size="mini" @click="taskVisible=false">取消创建</el-button>
        <el-button size="mini" type="primary">创建任务</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { randomWord } from '@/util/util'
export default {
  name: 'Live',
  components: {
  },
  data() {
    return {
      imageUrl: '',
      taskVisible: false,
      tableData: [],
      multipleSelection: [],
      taskForm: {
        cover_pic: '',
        description: '',
        title: '',
        is_test: true
      },
      rules: {
        cover_pic: [
          { required: true, message: '请上传封面图', trigger: 'blur' }
        ],
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' }
        ]
      },
      // 视频
      videoFlag: false, // 是否显示进度条
      videoUploadPercent: '', // 进度条的进度，

      videoForm: {
        showVideoPath: '' // 回显的变量
      }
    }
  },
  methods: {
    // 进度条
    uploadVideoProcess(event, file, fileList) { // 注意在data中添加对应的变量名
      this.videoFlag = true
      this.videoUploadPercent = file.percentage.toFixed(0) * 1
    },
    importVideoChange(file) {
      console.log('importVideoChange', file)
      this.videoFlag = false
      this.videoUploadPercent = 0
      // 本地电脑路径
      const locaPath = document.getElementById('upload-video').getElementsByClassName('el-upload__input')[0].value
      const localFile = file.raw
      const reader = new FileReader()
      reader.readAsDataURL(localFile)
      reader.onload = async(e) => {
        console.log(e.target.result)
      }
      // const localFile = file.raw
      // const reader = new FileReader()
      // reader.readAsDataURL(localFile)
      // reader.onload = async() => {
      //   const name = randomWord(false, 32) + '_' + new Date().getTime()
      //   const res = await this.$ossService.uploadFile(reader.result, name, 4)
      //   console.log(res)
      // }
      // console.log(res)
      // // 后台上传数据
      // if (res.success == true) {
      //   this.videoForm.showVideoPath = res.data.url // 上传成功后端返回视频地址 回显
      // } else {
      //   this.$message.error('上传失败！')
      // }
    },
    importImageChange(file) {
      const that = this
      const localFile = file.raw
      if (!/\.(jpg|jpeg|png|webp)$/.test(localFile.name.toLowerCase())) {
        this.$message('上传格式不对,请上传jpg、jpeg、png、webp格式的图片')
        return
      }
      const reader = new FileReader()
      reader.readAsDataURL(localFile)
      reader.onload = async() => {
        that.imgData = reader.result
        const name = randomWord(false, 32) + '_' + new Date().getTime()
        const res = await this.$ossService.uploadFile(that.imgData, name, 4)
        this.imageUrl = res
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    }
  }
}
</script>

<style lang="less" scoped>
@import "../../assets/css/common.less";
.container{
  .header{
    ul{
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      li{
        display: flex;
        align-items: center;
        margin-right: 10px;
        span{
          width: 120px;
          text-align: right;
        }
      }
    }
  }
}
/deep/.task-dialog{
  .el-form{
    .el-form-item{
      display: flex;
      align-items: center;
      .el-form-item__content{
        width: 100%;
        margin-left: 10px !important;
      }
    }
  }
  .avatar-uploader{
    height: 130px !important;
    img{
      width: 130px;
      height: 130px;
    }
  }
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
    width: 130px;
    height: 130px;
    line-height: 130px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
</style>
