# 项目声明
该项目所用到的 * API * 均来自卖座电影 ，只是为了得到数据进行项目练习，并没有进入到真实订单页面，完全出于学习用途，并无恶意，望卖座官方海涵。
# 技术栈
> 直接请求卖座网，会出现跨域问题，所以中间加了一层server端，通过本地代理转发到server，然后才去请求真实的卖座api
>
> ps：另一种办法是通过chrome的Allow-control-Allow-origin插件来解决跨域
> 前端
>> react、react-redux、react-router-dom（4.xx）
>
>
> 服务端
>> koa2、koa2-router
>
>
# 运行方式
> 1：本地server
> 1. 执行npm install
>
> 2：设置chrome的Allow-control-Allow-origin
