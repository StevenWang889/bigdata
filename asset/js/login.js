$(function () {

    // 点击去注册账号
    $('#link_reg').on('click', () => {
        $('.login-Box').hide()
        $('.reg-Box').show()
    })
    // 去登陆
    $('#link_login').on('click', () => {
        $('.login-Box').show()
        $('.reg-Box').hide()
    })

    //1自定义预验证
    var form = layui.form;
    // 调出消息提示框
    var layer = layui.layer;
    //2通过form.verify自定义校验规则
    form.verify({
        // 自定义了一个叫pwd的校验规则
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        // 定义校验重复密码
        repwd: function (value) {
            //通过形参拿到的是确认密码框中的内容
            //还需要拿到密码框中的内容需要进行一次判断
            var pwd = $('.reg-Box [name=password]').val()
            if (value !== pwd) return '两次密码不一致'
        }, function(res) {
            if (res.status !== 0) {
                return console.log(res.message)
            }
            console.log('注册成功');
        }
    })


    //监听注册表单提交事件
    $('#form_reg').on('submit', function (e) {
        var data = {
            username: $('#form_reg [name="username"]').val(),
            password: $('#form_reg [name="password"]').val()
        }
        e.preventDefault()
        $.post('/api/reguser', data, (res) => {
            if (res.status !== 0) return layer.msg(res.message)
            layer.msg('注册成功!');
            $('#link_login').click()
        }
        )
    })

    // 监听登录表单
    $('#form_login').submit(function (e) {

        e.preventDefault()
        $.ajax({
            type: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: (res) => {
                if (res.status !== 0) {
                    return layer.msg('登录失败！')
                }
                layer.msg('登录成功！')
                //将token字符串保存到localStorage里面
                localStorage.setItem('token', res.token)
                console.log(res.token);
                // 跳转到后台主页
                location.href = './index.html'

            }
        })
    })


})