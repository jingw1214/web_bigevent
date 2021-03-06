$(function() {
  var form = layui.form
  var layer = layui.layer

  form.verify({
    nickname: function(value) {
      if(value.length >6) {
        return '昵称长度必须在 1 ~ 6 个字符之间！'
      }
    }
  })

  initUserInfo()

  // 初始化用户的基本信息
  function initUserInfo() {
    $.ajax({
      method:'GET',
      url: '/my/userinfo',
      success: function(res) {
        if(res.status !== 0) {
          return layer.msg('获取用户信息失败')
        }
        console.log(res);
        // $('.layui-form-item name[username]').html(res.data.username)
        // 调用form.val()方法快速为表单赋值
        form.val("formUser", res.data)
      }
    })
  }
  //  重置表单数据
  $('#reset').on('click', function(e) {
    // 阻止表单的重置按钮的默认行为
    e.preventDefault()
    initUserInfo()
  })

  // 监听表单的提交时间
  $('.layui-form').on('submit',function(e) {
    e.preventDefault()
    // 发起ajax数据请求
    $.ajax({
      method: 'POST',
      url: '/my/userinfo',
      data: $(this).serialize(),
      success: function(res) {
        if(res.status !== 0) {
          return layer.msg('更新用户信息失败！')
        } 
        layer.msg('更新用户信息成功！')
        // 调用父页面中的方法，重新渲染头像和用户信息
        window.parent.getUserInfo()
      }
    })
  })

 
})