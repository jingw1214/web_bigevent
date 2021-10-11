$(function() {
  var layer = layui.layer
  // 1.1 获取靓剪区域的DOM元素
  var $image = $('#image')
  // 1.2 配置选项
  const options = {
  // 纵横比
  aspectRatio: 1,
  // 指定预览区域
  preview: '.img-preview'
  }

  // 1.3 创建裁剪区域
  $image.cropper(options)

  $('#btnChooseImg').on('click', function(e) {
    // 模仿file的点击事件
    $('#file').click()
  })


  // 为文件选择框绑定change事件
  $('#file').on('change', function(e) {
    // console.log(e);
    var filelist = e.target.files
    // console.log(filelist);
    if(filelist.length === 0) {
      return layer.msg('请选择照片！')
    }
    // 拿到用户选择的文件
    var file = filelist[0]
    // 根据选择的文件，创建一个对应的URL地址
    // blob:http://127.0.0.1:5500/d8b7274d-c014-4f43-86ee-b430c4c7cbac
    var newImgURL = URL.createObjectURL(file)
    console.log(newImgURL);
    $image
      .cropper('destroy') // 销毁旧的裁剪区域
      .attr('src',newImgURL) // 重新设置图片路径
      .cropper(options) // 重新初始化裁剪区域
  })
  // 为确定按钮，绑定点击事件--上传图片
  $('#btnUpload').on('click', function() {
    // 1.要拿到用户裁剪之后的头像
    var dataURL =  $image
      .cropper('getCroppedCanvas', {//创注一个Canvas画布
        width: 100,
        height: 100
          })
      .toDataURL('image/png') //将Canvas 画布上的内容，转化为base64格式的字符申

    // 2.调用接口，把头像传到服务器
    $.ajax({
      method: 'POST',
      url: '/my/update/avatar',
      data: {
        avatar: dataURL
      },
      success: function(res) {
        if(res.status !== 0) {
          return layer.msg('更换头像失败！')
        }
        layer.msg('更换头像成功！')
        window.parent.getUserInfo()
      }
    })

  })
})