/**
 * @fileOverview
 * @time 2017/12/1
 * @author liugang
 * */

const koa=require('koa2');
const koaRouter=require('koa-router');
const request=require('request');
const md5=require('md5');
const querystring=require('querystring');
const router=new koaRouter();
const app=new koa();
const api='http://m.maizuo.com/v4/api';

const a= async (ctx) => {
    var aaaa={};
    var sleep = function (time) {
        return new Promise(function (resolve, reject) {
            http.get(`${api}/billboard/home?__t=1512037212465`, (req, res) => {
                req.setEncoding('utf-8');
                req.on('data', data => {
                    aaaa=data;
                });
                req.on('end', () => {
                    resolve()
                })
            })
        })
    };
    await sleep();
    ctx.response.type='json';
    ctx.response.body=aaaa;
}

// 正在热映
const playing= async (ctx) => {
    var json={};
    function awaitFun(){
        return new Promise((resolve, reject) => {
            request(`${api}/film/now-playing`, (error, res, body) => {
                json=body;
                resolve()
            })
        })
    }
    await awaitFun();
    ctx.response.type='json';
    ctx.response.body=json;
}
// 即将上映
const coming= async (ctx) => {
    var json={};
    function awaitFun(){
        return new Promise((resolve, reject) => {
            request(`${api}/film/coming-soon`, (error, res, body) => {
                json=body;
                resolve()
            })
        })
    }
    await awaitFun();
    ctx.response.type='json';
    ctx.response.body=json;
}
// 获取影片详情
const movieDetail= async (ctx) => {
    var json={};
    function awaitFun(){
        return new Promise((resolve, reject) => {
            request(`${api}/film/${ctx.params.id}`, (error, res, body) => {
                json=body;
                resolve()
            })
        })
    }
    await awaitFun();
    ctx.response.type='json';
    ctx.response.body=json;
}
// 获取影院列表
const cinemaList= async (ctx) => {
    var json={};
    function awaitFun(){
        return new Promise((resolve, reject) => {
            request(`${api}/cinema`, (error, res, body) => {
                json=body;
                resolve();
            })
        })
    }
    await awaitFun();
    ctx.response.type='json';
    ctx.response.body=json;
}

// 获取影院详情
const cinemaDetail=async (ctx) => {
    var json={};
    function awaitFun(){
        return new Promise(resolve => {
            request(`${api}/cinema/${ctx.params.id}`, (error, res, body) => {
                json=body;
                resolve();
            })
        })
    }
    await awaitFun();
    ctx.response.type='json';
    ctx.response.body=json;
}

// 发送手机验证码
const sendCode=async (ctx) => {
    var json={};
    var reqJson={
        "mobile": ctx.params.mobile,
        "type": "2"
    }
    function awaitFun(){
        return new Promise(resolve => {
            request({
                method: 'post',
                url: `${api}/code`,
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify(reqJson)

            }, (error, response, body) => {
                json=body;
                resolve();
            })
        })
    }
    await awaitFun();
    ctx.response.type='json';
    ctx.response.body=json;
}

const validetaLogin= async (ctx) => {
    var params=querystring.parse(ctx.req._parsedUrl.query);
    var json={};
    var reqJson={
        code: "",
        codeKey : "",
        loginType : 1,
        password : md5(params.pwd),
        username : params.mobile
    }

    function awaitFun(){
        return new Promise(resolve => {
            request({
                url: `${api}/login`,
                method: 'post',
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(reqJson)
            }, (error, response, body) => {
                json=body;
                resolve();
            })
        })
    }

    await awaitFun();
    ctx.response.type='json';
    ctx.response.body=json;

}

// 获取影院上映影片列表
const getCinemaFilm= async (ctx) => {
    var json={};
    var cinemaId=ctx.params.id;
    function awaitFun(){
        return new Promise(resolve => {
            request(`${api}/cinema/${ctx.params.id}/film`, (error, response, body) => {
                json=body;
                resolve();
            })
        })
    }
    await awaitFun();
    ctx.response.type='json';
    ctx.response.body=json;
}
// 获取影院上映影片场次列表
const getCinemaPlayList= async (ctx) => {
    var json={};
    function awaitFun(){
        return new Promise(resolve => {
            request(`${api}/schedule?film=0&cinema=${ctx.params.id}`, (error, response, body) => {
                json=body;
                resolve();
            })
        })
    }
    await awaitFun();
    ctx.response.type='json';
    ctx.response.body=json;
}

router.get('/api/home', a);
router.get('/api/home/playing', playing);
router.get('/api/home/coming', coming);
router.get('/api/movie/detail/:id', movieDetail);

router.get('/api/cinema/list', cinemaList);
router.get('/api/cinema/detail/:id', cinemaDetail);
router.get('/api/cinema/film/:id', getCinemaFilm);
router.get('/api/cinema/filmPlay/:id', getCinemaPlayList);

router.get('/api/user/sendCode/:mobile', sendCode);
router.get('/api/user/validateLogin', validetaLogin);

app.use(router.routes());

app.listen(9000);
