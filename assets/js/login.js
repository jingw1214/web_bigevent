$(function() {
  // 点击“去注册账号”链接
  $('#link_reg').on('click',function() {
    $('.login-box').hide()
    $('.reg-box').show()
    
  })
  // 点击“去登录”链接
  $('#link_login').on('click',function() {
    $('.reg-box').hide()
    $('.login-box').show()
  })
  // 从layui 中获取form对象
  // 只要导入了layui.js，就可以使用layui的对象了
  var form = layui.form
  var layer = layui.layer
  // 通过form.verify()函数自定义校验规则
  form.verify({
    // [\S]表示不为空的字符
    pwd: [/^[\S]{6,12}$/,'密码必须6到12位，且不能出现空格'],
    // 两次密码一致的校验
    repwd: function(value, item){ //value：表单的值、item：表单的DOM对象
      // 拿到密码框中的内容
      // 判断密码框中的内容是否等于确认密码框中的内容
      // 如果不一致，则return 提示消息
      // jQuery val() 设置或返回表单字段的值,获得输入字段的值：
      var pwd1 = $('.reg-box [name="password"]').val()
      if(value !== pwd1) {
        return '两次密码不一致';
      }
    }
    
  })

  // 监听注册表单的提交时间
  $('#form_reg').on('submit',function(e) {
    // 阻止该事件的默认提交行为。
    // 当提交表单后，页面会立即跳转到action 属性指定的 URL地址
    e.preventDefault()
    // 发起ajax的post请求
    var data = {username:$('#form_reg [name=username]').val(),password:$('#form_reg [name=password]').val()}
    $.post('/api/reguser',data, function(res) {
      if(res.status !== 0) {
        return layer.msg(res.message)
      }
      layer.msg('注册成功，请登录');
      $('#link_login').click()
    })
  })

  // 监听登录表单的提交时间
  $('#form_login').submit(function(e) {
    // 阻止该事件的默认提交行为。
    // 当提交表单后，页面会立即跳转到action 属性指定的 URL地址
    e.preventDefault()
    // 发起ajax
    $.ajax({
      method: 'POST',
      url: '/api/login',
      // 快速获取表单中的数据
      data: $(this).serialize(),
      success: function(res) {
        if(res.status !== 0) {
          return layer.msg(res.message)
        }
        layer.msg('登录成功！');
        console.log(res.token);
        // 将登录成功得到的token字符串，保存到localStorage中
        localStorage.setItem('token',res.token)

        // 跳转到后台主页
        setTimeout("location.href = '/index.html'", 3000)
        // document.write(location.href)



      }
    })
  })


}) 