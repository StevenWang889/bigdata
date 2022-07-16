// a每次调用ajax都会调用这个函数
// 在这个函数中可以获得ajax提供的配置对象
$.ajaxPrefilter(function (options) {
    options.url = 'http://127.0.0.1:3007' + options.url
    // 将有权限的headers 抽离出来 方便请求 indexOf(找字符串无=-1)
    if (options.url.indexOf('/my/') !== -1)
        options.headers = {
            // 传递token给服务器因为正在访问权限接口/my
            Authorization: localStorage.getItem('token') || ''
        }
    // 无论成功或者失败都会调用 complete 回调函数
    // 抽离出这个权限接口访问自动跳转登录页函数
    options.complete = function (res) {
        //获取用户是否登录
        const flag = res.responseJSON.status
        // 等于 1 为未登录
        if (flag) {
            // 强制清空token
            localStorage.removeItem('token')
            // 强制跳转页面
            location.href = './login.html'
        }

    }
})