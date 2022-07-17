$(function () {


    // 用户基本信息调用
    getUserInfo()
    // 导入提示框
    var layer = layui.layer
    // 退出事件
    $('#btnLogout').on('click', function () {
        layer.confirm('确定退出登录 ?', { icon: 3, title: '提示' }, function (index) {
            //do something
            // 清空token
            localStorage.removeItem('token')
            // 重新跳转到登录页
            location.href = '/login.html'
            // 关闭询问框
            layer.close(index);
        });


    })
})

// 获取用户基本信息
function getUserInfo() {
    $.ajax({
        type: 'GET',
        url: '/my/userinfo',
        // 请求头配置对象
        success: (res) => {
            // 打印用户信息
            if (res.status !== 0) return layui.layer.msg('获取用户信息失败')
            // 调用方法渲染用户头像
            renderAvatar(res.data)
        },
    })
}


// 渲染用户头像
function renderAvatar(user) {
    let name = user.nickname || user.username
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    // 按需渲染用户头像
    if (user.user_pic !== null) {
        // 图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        $('.layui-nav-img').hide()
        let firstName = name[0].toUpperCase()
        $('.text-avatar').html(firstName).show()
    }
}


