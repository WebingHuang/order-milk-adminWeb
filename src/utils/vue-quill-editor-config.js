

import {container, ImageExtend, QuillWatch} from 'quill-image-extend-module'


/**
 * toolbar工具栏的工具选项（默认展示全部）
 *  */
const toolOptions = [
    ['bold', 'italic', 'underline', 'strike'],
    ['blockquote', 'code-block'],
    [{'header': 1}, {'header': 2}],
    [{'list': 'ordered'}, {'list': 'bullet'}],
    [{'script': 'sub'}, {'script': 'super'}],
    [{'indent': '-1'}, {'indent': '+1'}],
    [{'direction': 'rtl'}],
    [{'size': ['small', false, 'large', 'huge']}],
    [{'header': [1, 2, 3, 4, 5, 6, false]}],
    [{'color': []}, {'background': []}],
    [{'font': []}],
    [{'align': []}],
    ['clean'],
    ['link', 'image', 'video']
]

// 全部配置
export const editorOptions = {
  placeholder: '请写点什么吧！',
  theme: 'snow',  // 主题
  modules: {
    ImageExtend: {  // 如果不作设置，即{}  则依然开启复制粘贴功能且以base64插入
        name: 'files',  // 图片参数名
        type: 4, //往后台传递参数（4是文章）
        size: 3,  // 可选参数 图片大小，单位为M，1M = 1024kb
        token: JSON.parse(localStorage.getItem('Access-Token')),
        action: process.env.VUE_APP_API_BASE_URL+"/UploadPictures/upload",  // 服务器地址, 如果action为空，则采用base64插入图片
        // response 为一个函数用来获取服务器返回的具体图片地址
        // 例如服务器返回{code: 200; data:{ url: 'baidu.com'}}
        // 则 return res.data.url
      response: (res) => {
          // console.log(res)
          return res.imgesList[0];
        },
        headers: (xhr) => {
        // xhr.setRequestHeader('myHeader','myValue')
        },  // 可选参数 设置请求头部
        sizeError: () => {},  // 图片超过大小的回调
        start: () => {},  // 可选参数 自定义开始上传触发事件
        end: () => {},  // 可选参数 自定义上传结束触发的事件，无论成功或者失败
        error: () => {},  // 可选参数 上传失败触发的事件
        success: () => {},  // 可选参数  上传成功触发的事件
        change: (xhr, formData) => {
        // xhr.setRequestHeader('myHeader','myValue')
        // formData.append('token', 'myToken')
        } // 可选参数 每次选择图片触发，也可用来设置头部，但比headers多了一个参数，可设置formData
    },
    toolbar: {
      container: toolOptions,   // 工具栏选项
      handlers: {
        'image': function () {  // 劫持原来的图片点击按钮事件
          QuillWatch.emit(this.quill.id)
      }
      }
    }
  }
}