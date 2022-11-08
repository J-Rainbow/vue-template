<!--
 * @Author: your name
 * @Date: 2021-10-08 14:16:18
 * @LastEditTime: 2022-01-21 10:39:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \shopeeman-new\src\App.vue
-->
<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="less">
body {
  --themeColor: #f53245;
}
* {
  font-family: Microsoft YaHei;
  font-size: 12px !important;
}
#app{
  overflow: auto;
  background-color: #fff;;
}
.el-loading-mask.is-fullscreen {
  background-color: rgba(10, 10, 10, 0.5);
}
button {
  font-family: Microsoft YaHei;
}
.el-table td {
  padding: 6px 0 !important;
}
.el-table .cell {
  line-height: 20px !important;
}
.el-table{
  .el-table__body-wrapper{
    tr{
      td{
        color: #000000;
      }
    }
  }
}

i.close-right{
  position: absolute;
  right: 5px;
}
.el-dialog {
  margin-bottom: 10px;
}

.dialog_shell{
  .el-dialog__header {
    padding: 10px;

    .el-dialog__headerbtn {
      top: 10px;

      .el-icon-close {
        font-size: 16px !important;
      }
    }

    .el-dialog__title {
      font-weight: 700;
      font-size: 14px;
    }
  }

  .el-dialog__body {
    padding: 5px 16px 10px;
  }
}

.table_height_limit{
  height: 70px;
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  white-space: pre-wrap;
  border: 1px #bcbcbc solid;
  padding: 3px 5px;
  text-align: left;
}
</style>
<script>
import './assets/css/reset.css'
import './assets/css/base.less'
Array.prototype.zzSort = function(name, isNum) {
  const newArr = this
  for (let i = 0; i < newArr.length; i++) {
    for (let j = 0; j < newArr.length; j++) {
      let front = newArr[j] && newArr[j][name] || newArr[j]
      const after = newArr[j + 1] && newArr[j + 1][name] || newArr[j + 1]
      front = isNum && Number(isNum) || front
      if ((front) > (after)) {
        const pre = newArr[j]
        newArr[j] = newArr[j + 1]
        newArr[j + 1] = pre
      }
    }
  }
  return newArr
}
export default {
  name: 'App',
  async mounted() {
    // console.log('00000000000000000', this.$appConfig)
    // this.$appConfig.primaryColor().then(res => {
    //   console.log('res-appvue', res)
    //   document.body.style.setProperty('--themeColor', res)
    // });
  }
}
</script>
