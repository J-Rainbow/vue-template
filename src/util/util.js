import {
  setTimeout
} from 'core-js'
import md5 from 'js-md5'
import Vue from 'vue'
import XLSX from 'xlsx'

const instance = new Vue()

// 匹配对象数组值(店铺绑定--系统)
export function MallgetValue(arr, label, id, relID) {
  let data = ''
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i]
    if (item[id] === Number(relID)) {
      data = item[label]
      break
    }
  }
  return data
}

// 匹配对象数组值(商品店铺绑定)
export function GoodsMallgetValue(arr, label, value, relID) {
  let data = ''
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i]
    if (Number(item[value]) === Number(relID)) {
      data = item[label]
      break
    }
  }
  return data
}

// 设置日期选择器默认时间
export function creatDate(i) {
  const base = new Date()
  const baseVal = [base.getFullYear(), base.getMonth() + 1, base.getDate()].join('-')
  const oneDay = 24 * 3600 * 1000
  const now = new Date(base - oneDay * i)
  const nowVal = [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('-')
  return [nowVal, baseVal]
}

// 匹配对象数组值
export function getValue(arr, label, value, relValue) {
  let data = ''
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i]
    if (item[value] === relValue) {
      data = item[label]
      break
    }
  }
  return data
}

// 延迟
export async function delay(time) {
  return new Promise((resolve) => {
    const timeId = setTimeout(() => {
      // console.log(`延迟${time}s`)
      clearTimeout(timeId)
      resolve(true)
    }, time)
  })
}

// 格式化时间
export function dateFormat(Time, fmt) {
  const time = new Date(Time)
  var o = {
    'M+': time.getMonth() + 1, // 月份
    'd+': time.getDate(), // 日
    'h+': time.getHours(), // 小时
    'm+': time.getMinutes(), // 分
    's+': time.getSeconds(), // 秒
    'q+': Math.floor((time.getMonth() + 3) / 3), // 季度
    S: time.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (time.getFullYear() + '').substr(4 - RegExp.$1.length)
    )
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1
          ? o[k]
          : ('00' + o[k]).substr(('' + o[k]).length)
      )
    }
  }
  return fmt
}

// 获取base64图片大小，返回kb数字
export function showSize(img) {
  // 把头部去掉
  var str = img.replace('data:image/png;base64,', '')
  // 找到等号，把等号也去掉
  var equalIndex = str.indexOf('=')
  if (str.indexOf('=') > 0) {
    str = str.substring(0, equalIndex)
  }
  // 原来的字符流大小，单位为字节
  var strLength = str.length
  // 计算后得到的文件流大小，单位为字节
  var fileLength = parseInt(strLength - (strLength / 8) * 2)
  // 由字节转换为kb
  var size = ''
  size = (fileLength / 1024).toFixed(2)
  var sizeStr = size + '' // 转成字符串
  var index = sizeStr.indexOf('.') // 获取小数点处的索引
  var dou = sizeStr.substr(index + 1, 2) // 获取小数点后两位的值
  if (dou === '00') {
    // 判断后两位是否为00，如果是则删除00
    return sizeStr.substring(0, index) + sizeStr.substr(index + 3, 2)
  }
  return size
}

export function getImgMd5(img) {
  const number = md5(img)
  return number
}

// sleep函数
export function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time))
}

// 导出excel
export function exportExcelDataCommon(fileName, str) {
  // Worksheet名
  const worksheet = `${fileName}${new Date(Date.now() + 8 * 3600 * 1000).toISOString().slice(0, 10)}`
  const uri = 'data:application/vnd.ms-excel;base64,'

  // 下载的表格模板数据
  const template = `<html xmlns:o="urn:schemas-microsoft-com:office:office"
                xmlns:x="urn:schemas-microsoft-com:office:excel"
                xmlns="http://www.w3.org/TR/REC-html40">
                <head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>
                <x:Name>${worksheet}</x:Name>
                <x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet>
                </x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->
                <meta charset="gbk2312">
                </head><body><table>${str}</table></body></html>`
  // 下载模板
  // let template = templates.replace(/<td/g,`<td style="mso-number-format:'\@';"`)
  // const blob = new Blob([template], {
  //   type: 'html',
  //   name: worksheet
  // })
  const blob = new Blob([template], {
    type: 'application/vnd.ms-excel;charset=gbk2312',
    name: worksheet
  })
  const a = document.createElement('a')
  document.body.appendChild(a)
  // a.href = uri + this.base64(template)
  console.log(URL.createObjectURL(blob))
  a.href = URL.createObjectURL(blob)
  a.download = `${fileName}${new Date(Date.now() + 8 * 3600 * 1000).toISOString().slice(0, 10)}.xls`
  a.click()
  document.body.removeChild(a)
}

// 导出csv
export function exportCsvDataCommon(fileName, str) {
  /**
   * const header = [
   '统计日期',
   '充值金额（收入）',
   '翻译金额（消费）',
   '采购商品金额（消费）',
   '仓库发货金额（消费）',
   '退件金额（消费）',
   '采购商品退回金额（收入）',
   '主体IP消费金额（消费）',
   '异常赔付金额（收入）',
   '其它金额（消费）',
   '用户当天消费总金额',
   '用户当天收入总金额'
   ]
   const data = [header.join(',')].concat(this.statisticsDetailData.map(item => {
          return [
              `${item.stat_date ? item.stat_date : 0}`,
              `"${item.recharge ? item.recharge : 0}"`,
              `"${item.translation ? item.translation : 0}"`,
              `"${item.purchase_goods ? item.purchase_goods : 0}"`,
              `"${item.warehouse_ship ? item.warehouse_ship : 0}"`,
              `"${item.return ? item.return : 0}"`,
              `"${item.purchase_goods_return ? item.purchase_goods_return : 0}"`,
              `"${item.mall_main ? item.mall_main : 0}"`,
              `"${item.abnormal_payment ? item.abnormal_payment : 0}"`,
              `"${item.other ? item.other : 0}"`,
              `"${item.income_amount_total ? item.income_amount_total : 0}"`,
              `"${item.consum_amount_total ? item.consum_amount_total : 0}"`
          ].join(',')
        }))
   // str = str.replace(/<[^>]+>/gim,' ')
   // data.join('\n')
   exportCsvDataCommon('dsf',data)
   */
  const blob = new Blob(['\ufeff' + str.join('\n')], {
    type: 'text/csv,charset=UTF-8'
  })
  const a = document.createElement('a')
  document.body.appendChild(a)
  // a.href = uri + this.base64(template)
  a.href = URL.createObjectURL(blob)
  a.download = `${fileName}${new Date(Date.now() + 8 * 3600 * 1000).toISOString().slice(0, 10)}.csv`
  a.click()
  document.body.removeChild(a)
}

export function debounce(fun, wait, immediate) {
  let timeout = null
  let result = null
  return function() {
    const context = this
    const args = arguments
    if (timeout) {
      clearTimeout(timeout)
    }
    if (immediate) {
      const rightNow = !timeout
      timeout = setTimeout(() => {
        timeout = null
      }, wait)
      if (rightNow) result = fun.apply(context, args)
    } else {
      timeout = setTimeout(() => {
        result = result = fun.apply(context, args)
      }, wait)
    }
  }
}

// randomWord 产生任意长度随机字母数字组合
// randomFlag-是否任意长度 min-任意长度最小位[固定位数] max-任意长度最大位
export function randomWord(randomFlag, min, max) {
  let str = ''
  let range = min
  const arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
  // 随机产生
  if (randomFlag) { // 生成3-32位随机串
    range = Math.round(Math.random() * (max - min)) + min
  }
  for (let i = 0; i < range; i++) {
    const pos = Math.round(Math.random() * (arr.length - 1))
    str += arr[pos]
  }
  return str
}

/**
 * 线程批量
 * @param array // 数组（参数）
 * @param method // 请求函数
 * @param count // 线程数
 * @returns {Promise<any>}
 */
export function batchOperation(array, method, count = 5) {
  const number = array.length
  const threadRunCountJson = localStorage.getItem('threadRunCount') || ''
  const threadRunCountRes = threadRunCountJson && JSON.parse(threadRunCountJson) || {}
  const methodName = method.name
  threadRunCountRes[methodName] = true
  console.log('线程开始', methodName, array)
  localStorage.setItem('threadRunCount', JSON.stringify(threadRunCountRes))
  return new Promise(resolve => {
    const countObj = {
      count: number
    }
    let submitCount = 0
    let setIn = setInterval(() => {
      const threadRunCountJson = localStorage.getItem('threadRunCount') || ''
      const threadRunCountRes = threadRunCountJson && JSON.parse(threadRunCountJson) || {}
      const num = countObj.count
      if (num === 0 || !threadRunCountRes[methodName]) {
        let success = '完成'
        if (!threadRunCountRes[methodName]) {
          success = '终止'
        }
        clearInterval(setIn)
        setIn = null
        console.log('线程停止：', methodName, '线程剩余数：', num)
        resolve(success)
      } else {
        manage(number - num)
      }
    }, 1000)

    async function manage(completeCount) {
      for (;
        (submitCount - completeCount) < count && submitCount < number; ++submitCount) {
        const item = array[submitCount]
        method(item, countObj)
      }
    }
  })
}

/**
 * 取消线程
 * @param method 方法
 */
export function terminateThread(method) {
  let threadRunCount = ''
  if (method) {
    const threadRunCountJson = localStorage.getItem('threadRunCount') || ''
    const threadRunCountRes = threadRunCountJson && JSON.parse(threadRunCountJson) || {}
    const methodName = method.name
    delete threadRunCountRes[methodName]
    threadRunCount = JSON.stringify(threadRunCountRes)
  }
  localStorage.setItem('threadRunCount', threadRunCount)
}

// 时间转换
export function formatDuring(mss) {
  const hours = parseInt(mss / 60 / 60)
  const minutes = parseInt((mss - hours * 69 * 60) / 60)
  const seconds = (mss - hours * 69 * 60 - minutes * 60)
  return hours + ':' + minutes + ':' + seconds.toFixed(0)
}

/**
 *导出文件
 * @param tableData Array ['商品','订单号']
 * @param jsonData Array[Array] [['goods1','id']]
 * @param workName String 'name'默认时间戳
 * @returns {Promise<void>}
 */

export async function importOrder(tableData, jsonData, workName = '') {
  const arr = []
  arr.push(tableData)
  jsonData.forEach(item => {
    arr.push(item)
  })
  const worksheet = XLSX.utils.aoa_to_sheet(arr)
  console.log(fitToColumn(arr))
  worksheet['!cols'] = fitToColumn(arr)
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, workName || (new Date(Date.now() + 8 * 3600 * 1000).toISOString().slice(0, 10)))
  XLSX.writeFile(workbook, `${workName}${new Date(Date.now() + 8 * 3600 * 1000).toISOString().slice(0, 10)}.xlsx`)

  function fitToColumn(arrayOfArray) {
    return arrayOfArray[0].map((a, i) => ({
      wch: Math.max(...arrayOfArray.map(a2 => a2[i] ? a2[i].toString().length : 10)) * 2
    }))
  }
}

export async function waitStart(prepare, num = 500) {
  let count = 0
  const number = num && parseInt(num) || 500
  return new Promise((resolve, reject) => {
    const ing = setInterval(() => {
      ++count
      if (prepare() || count >= number) {
        console.log('等待成功', prepare)
        clearInterval(ing)
        resolve(prepare())
      }
    }, 200)
  })
}
/**
 * @name :区间随机值
 * @param {*} minVal 最小
 * @param {*} maxVal 最大
 * @param {*} fixed 小数位
 * */
export function getSectionRandom(minVal, maxVal, fixed = 0) {
  minVal = (minVal < maxVal && minVal || maxVal) * 1
  maxVal = (minVal < maxVal && maxVal || minVal) * 1
  const gap = maxVal - minVal
  const random = 1 * (Math.random() * gap).toFixed(fixed)
  return (minVal + random).toFixed(fixed)
}

// 判断能否转JSON
export function isJsonString(str) {
  if (typeof str === 'string') {
    try {
      JSON.parse(str)
      return JSON.parse(str)
    } catch (e) {
      return str
    }
  } else {
    return str
  }
}

/**
 * 复制字符串
 * @param attr String
 */
export function copyText(attr) {
  const target = document.createElement('div')
  target.id = 'tempTarget'
  target.style.opacity = '0'
  target.innerText = attr
  document.body.appendChild(target)
  try {
    const range = document.createRange()
    range.selectNode(target)
    window.getSelection().removeAllRanges()
    window.getSelection().addRange(range)
    document.execCommand('copy')
    window.getSelection().removeAllRanges()
    instance.$message.success('复制成功')
  } catch (e) {
    // console.log('复制失败')
  }
  target.parentElement.removeChild(target)
}
// 日期转换
export function formatDate(date, format) {
  format = format || 'yyyy-MM-dd hh:mm:ss'
  date = new Date(date)
  const o = {
    'M+': date.getMonth() + 1, // month
    'd+': date.getDate(), // day
    'h+': date.getHours(), // hour
    'm+': date.getMinutes(), // minute
    's+': date.getSeconds(), // second
    'q+': Math.floor((date.getMonth() + 3) / 3), // quarter
    S: date.getMilliseconds() // millisecond
  }
  // RegExp.$1是RegExp的一个属性,指的是与正则表达式匹配的第一个 子匹配(以括号为标志)字符串
  if (/(y+)/.test(format)) {
    format = format.replace(
      RegExp.$1,
      (date.getFullYear() + '').substr(4 - RegExp.$1.length)
    )
  } // 获取年份
  for (const k in o) {
    if (new RegExp('(' + k + ')').test(format)) {
      format = format.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
      )
    }
  }
  return format
}
/**
 * 获取随机符号
 */
export function getRandSymbol() {
  const symbolList = ['~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '_', '=', '+', '?', '<', '>', ',', '.', ';', ':', '[', ']', '{', '}', '|']
  const index = Math.random() * symbolList.length
  return symbolList[Math.floor(index)]
}

/** 根据时间戳 获取其月开始时间戳和结束时间戳 */
export function getTimeStamp(timeStamp) {
  const inDate = timeStamp ? new Date(timeStamp) : new Date()
  const year = inDate.getFullYear()
  const month = inDate.getMonth()
  const startTime = new Date(year, month, 1).getTime()
  const endTime = new Date(year, month + 1, 1).getTime() - 1
  return { startTime, endTime }
}
