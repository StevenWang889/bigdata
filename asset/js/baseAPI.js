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
    // 全局统一挂载 complete 回调函数
    options.complete = function (res) {
        // console.log('执行了 complete 回调：')
        // console.log(res)
        // 在 complete 回调函数中，可以使用 res.responseJSON 拿到服务器响应回来的数据
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            // 1. 强制清空 token
            localStorage.removeItem('token')
            // 2. 强制跳转到登录页面
            location.href = '/login.html'
        }
    }
})