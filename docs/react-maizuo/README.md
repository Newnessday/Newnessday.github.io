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
>> koa2、koa2-router、pm2
>
>
# 运行方式
## 本地起server
> 1. 在 **src** 同级目录执行npm install
> 2. 进入 **server** 目录执行npm install
> 3. 全局安装pm2，执行npm install pm2 -g
> 4. 以上安装完之后，返回到 **src** 同级目录，执行npm start，会自动打开你的默认浏览器，并显示项目首页
>
> 2：设置chrome的Allow-control-Allow-origin
