$(function() {
  var form = layui.form
  form.verify({
    // [\S]表示不为空的字符
    pwd: [/^[\S]{6,12}$/,'密码必须6到12位，且不能出现空格'],
    // 此处的value，给谁加上规则，就是谁的值
    samePwd: function(value) {
      if(value === $('[name=oldPwd').val()) {
        return '新旧密码不能相同！'
      }
    },
    rePwd: function(value) {
      if(value !== $('[name=rePwd]').val()) {
        return '两次密码不一致！'
      }
    }
  })

  $('.layui-form').on('submit', function(e) {
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: '/my/updatepwd',
      data: $(this).serialize(),
      success: function(res) {
        console.log(res);
        if(res.status !== 0) {
          return layui.layer.msg('更新密码失败！')
        }
        layui.layer.msg('更新密码成功！')
        // 重置表单
        // 取得jQuery对象，加上[0]得到原生的dom对象，使用其reset方法重置表单
        $('.layui-form')[0].reset()
        
      }
    })
  })
})