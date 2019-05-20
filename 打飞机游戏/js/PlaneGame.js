//事件工具对象
var eventUtil={
//添加事件
    add:function(dom,type,fn){
        if(document.addEventListener){
            dom.addEventListener(type,fn,false);
        }else if(documen.attachEvent){
            dom.attachEvent('on'+type,fn);
        }else{
            dom['on'+type]=fn;
        }
    },
//移除事件
    remove:function(dom,type,fn){
        if(document.removeEventListener){
            dom.removeEventListener(type,fn,false);
        }else if(documen.detachEvent){
            dom.detachEvent('on'+type,fn);
        }else{
            dom['on'+type]=null;
        }
    },
//获取event对象
    getEvent:function(e){
        return e||window.event;
    },
//获取target对象
    getTarget:function(e){
        return e.target||e.srcElement;
    },
//阻止默认事件
    preventDefault:function(e){
        if(e.preventDefault){
            e.preventDefault();
        }else{
            e.returnValue=false;
        }
    },
//阻止事件冒泡
    stopPropagation:function(e){
        if(e.stopPropagation){
            e.stopPropagation();
        }else{
            e.cancelBuble=true;
        }
    }
};

var startBtn=document.getElementById('start-btn'),
    wrap=document.getElementsByClassName('wrap')[0],
    blood=document.getElementById('blood'),
    bloodLine=document.getElementById('liner'),
    scoreEl=document.getElementById('score'),
    scoreVal=document.getElementById('score-val'),
    gameOver=document.getElementById('gameover'),
    reStartBtn=document.getElementById('reStart-btn');
//游戏状态
var game_state;
//状态值：用于记录当前按下的键盘
var bottomState = false,
    topState = false,
    leftState = false,
    rightState = false,
    spaceState = false;
//飞机参数对象,可更改
var planeArgs={};
//创建飞机对象
var plane=new Plane(planeArgs);
//创建子弹数组
var bullets=[];
//创建敌人数组
var enemys=[];
var enemysarg=[{
    src: 'images/enemy1.png',
    blood: 1,
    speed: 3,
    width: 34,
    height:24},{
    src: 'images/enemy2.png',
    blood: 10,
    speed: 2,
    width: 46,
    height: 60},{
    src: 'images/enemy3.png',
    blood: 20,
    speed: 1,
    width: 110,
    height: 164}];
//背景移动速度
var bgSpeed=3;
//定时器
var planeFlyTimer;
var enemyisHitTimer;
var planeShootTimer;
var enemy1CreateTimer,enemy2CreateTimer,enemy3CreateTimer,enemyFlyTimer,bgMoveTimer,bulletFlyTimer,bulletisHitTimer,
    levelUpTimer;
//积分
var score=0;
//判断升级第一次
var isFirst=[true,true,true,true]
//背景移动事件
var bgMove=function () {
    if(parseInt(wrap.style.backgroundPositionY)>=568){
        wrap.style.backgroundPositionY='0px';
    }else {
        wrap.style.backgroundPositionY=parseInt(wrap.style.backgroundPositionY)+bgSpeed+'px';
    }
};
var enemy1Create=function () {
    var enemy=new Enemy(enemysarg[0]);
    console.log(enemy.speed);
    enemys.push(enemy);
};
var enemy2Create=function () {
    var enemy=new Enemy(enemysarg[1]);
    enemys.push(enemy);
};
var enemy3Create=function () {
    var enemy=new Enemy(enemysarg[2]);
    enemys.push(enemy);
};
//开始游戏点击事件
var start=function () {
    wrap.style.background='url(images/bg.png)';
    wrap.style.backgroundPositionY='0px';
    startBtn.style.display='none';
    blood.style.display='inline-block';
    scoreEl.style.display='inline-block';
    //初始化飞机
    plane.init();
    //创建敌人
    enemy1CreateTimer=setInterval(enemy1Create,1000);
    enemy2CreateTimer=setInterval(enemy2Create,3000);
    enemy3CreateTimer=setInterval(enemy3Create,5000);
    enemyFlyTimer=setInterval(enemyFly,25);
    enemyisHitTimer=setInterval(enemyisHit,25);
    //背景移动
    bgMoveTimer=setInterval(bgMove,25);
    //飞机移动(关键：相当于fps刷新率)
    planeFlyTimer=setInterval(planeFly,12);
    planeShootTimer=setInterval(planeShoot,125);
    // 飞机射击
    bulletFlyTimer=setInterval(bulletFly,25);
    bulletisHitTimer=setInterval(bulletisHit,25);
    // 难度升级
    levelUpTimer=setInterval(levelUp,25);
};
eventUtil.add(startBtn,'click',start);
var reStart=function () {
    // clearInterval(enemy1CreateTimer);
    // clearInterval(enemy2CreateTimer);
    // clearInterval(enemy3CreateTimer);
    // clearInterval(enemyFlyTimer);
    // clearInterval(enemyisHitTimer);
    // clearInterval(bgMoveTimer);
    // clearInterval(planeFlyTimer);
    // clearInterval(planeShootTimer);
    // clearInterval(bulletFlyTimer);
    // clearInterval(bulletisHitTimer);
    // clearInterval(levelUpTimer);
    gameOver.style.display='none';
    score=0;
    scoreVal.innerText=score;
    plane=new Plane(planeArgs);
    plane.init();
    planeFlyTimer=setInterval(planeFly,12);
    planeShootTimer=setInterval(planeShoot,125);
    enemyisHitTimer=setInterval(enemyisHit,25);
    bloodLine.style.width='100%';
};
eventUtil.add(reStartBtn,'click',reStart);
//根据得分升级
function levelUp() {
    if(score>=100){
        if(isFirst[0]) {
            for (var i = 0; i < enemysarg.length; i++) {
                enemysarg[i].speed *= 3;
                bgSpeed += 2;
            }
            clearInterval(planeShootTimer);
            planeShootTimer=setInterval(planeShoot,100);
            plane.speed +=1;
            isFirst[0]=false;
        }
    }
    if(score>=500){
        if(isFirst[1]) {
            for (var i = 0; i < enemysarg.length; i++) {
                enemysarg[i].speed *= 2;
                bgSpeed += 2;
            }
            isFirst[1]=false;
        }
    }
}
//控制飞机的移动
function planeFly() {
    if(!plane.isDied) {
        if (topState) {
            plane.move('up');
        }
        if (bottomState) {
            plane.move('down');
        }
        if (leftState) {
            plane.move('left');
        }
        if (rightState) {
            plane.move('right');
        }
    }else {
        plane.diedTime--;
        clearInterval(planeShootTimer);
        clearInterval(enemyisHitTimer);
        if(plane.diedTime<=0) {
            wrap.removeChild(plane.plane);
            clearInterval(planeFlyTimer);
        }
    }

}
//控制飞机的射击
function planeShoot() {
    if(spaceState) {
        plane.shoot();
    }
}
//控制子弹飞行
function bulletFly() {
    for(var i = 0; i < bullets.length; i++) {
        // 如果子弹飞出边界，则需要从dom中移除
        // 先判断子弹是否存活
        if(!bullets[i].isDied) {
            if (parseInt(bullets[i].imgNode.style.top) > -20) {
                bullets[i].move();
            } else {
                wrap.removeChild(bullets[i].imgNode);
                bullets.splice(i, 1);
            }
        }else {
            wrap.removeChild(bullets[i].imgNode);
            bullets.splice(i, 1);
        }
    }
}
//执行子弹是否击中判断事件
function bulletisHit() {
    for (var i=0;i<bullets.length;i++){
        bullets[i].isHit();
    }
}
//判断敌人是否撞到我方飞机
function enemyisHit() {
    for (var i=0;i<enemys.length;i++){
        enemys[i].isHit();
        if(plane.isHited) {
            plane.protectTime--;
            if (plane.protectTime <= 0) {
                plane.plane.className = '';
                plane.protect = false;
                plane.protectTime = 500;
                plane.isHited = false;
            }
        }
    }
}
//控制敌人飞行
function enemyFly() {
    for(var i = 0; i < enemys.length; i++) {
        // 如果子弹飞出边界，则需要从dom中移除
        // 先判断敌人是否存活
        if(!enemys[i].isDied) {
            if (parseInt(enemys[i].imgNode.style.top) < wrap.clientHeight) {
                enemys[i].move();
            } else {
                wrap.removeChild(enemys[i].imgNode);
                enemys.splice(i, 1);
            }
            if(enemys[i].isHited){
                enemys[i].hitedTime--;
                if(enemys[i].hitedTime<=0){
                    enemys[i].imgNode.src=enemys[i].src;
                    enemys[i].hitedTime=50;
                    enemys[i].isHited=false;
                    enemys[i].imgNode.className='';
                }
            }
        }else {
            enemys[i].diedTime--;
            if(enemys[i].diedTime<=0){
                wrap.removeChild(enemys[i].imgNode);
                enemys.splice(i,1);
            }
        }
    }
}
//全局按键按下监听
eventUtil.add(window,'keydown',function (e) {
    e=eventUtil.getEvent(e);
    var k = e.keyCode || e.charCode || e.which;
    if(k==37) {
        leftState = true;
    }
    if(k==38) {
        topState = true;
    }
    if(k==39) {
        rightState = true;
    }
    if(k==40) {
        bottomState = true;
    }
    if(k==32){
        spaceState=true;
    }
});
//全局按键松开监听
eventUtil.add(window,'keyup',function (e) {
    e=eventUtil.getEvent(e);
    var k = e.keyCode || e.charCode || e.which;
    if(k==37) {
        leftState = false;
    }
    if(k==38) {
        topState = false;
    }
    if(k==39) {
        rightState = false;
    }
    if(k==40) {
        bottomState = false;
    }
    if(k==32){
        spaceState = false;
    }
});


//Plane构造函数
function Plane(args) {
    var defaultArgs={
        src:'images/myplane.gif',
        x:127,
        y:390,
        speed:5,
        blood:5
    };
    for(var k in args){
        defaultArgs[k]=args[k];
    }
    this.plane=document.createElement('div');
    this.imgNode=document.createElement('img');
    this.src=defaultArgs.src;
    this.x=defaultArgs.x;
    this.y=defaultArgs.y;
    this.speed=defaultArgs.speed;
    this.blood=defaultArgs.blood;
    this.isHited=false;
    this.protect=false;
    this.protectTime=500;
    this.isDied=false;
    this.diedTime=100;

    //移动v2版
    this.move=function (dir) {
        switch (dir){
            case 'left':
                if(this.x<=0){
                    this.x=0;
                }else {
                    this.plane.style.left = Number(this.x - this.speed) + 'px';
                    this.x=this.x-this.speed;
                }
                break;
            case 'right':
                if(this.x+this.plane.clientWidth>=wrap.clientWidth){
                    this.x=wrap.clientWidth-this.plane.clientWidth;
                }else {
                    this.plane.style.left = Number(this.x + this.speed) + 'px';
                    this.x=this.x+this.speed;
                }
                break;
            case 'up':
                if(this.y<=0){
                    this.y=0;
                }else {
                    this.plane.style.top = Number(this.y - this.speed) + 'px';
                    this.y=this.y-this.speed;
                }
                break;
            case 'down':
                if(this.y+this.plane.clientHeight>=wrap.clientHeight){
                    this.y=wrap.clientHeight-this.plane.clientHeight;
                }else {
                    this.plane.style.top = Number(this.y + this.speed) + 'px';
                    this.y=this.y+this.speed;
                }
                break;
        }
    };
    //射击
    this.shoot=function () {
        var bulletArgs={
            x:this.x+this.plane.clientWidth/2,
            y:this.y
        };
        var bullet=new Bullet(bulletArgs);
        bullets.push(bullet);
    };
    //初始化
    this.init=function () {
        wrap.appendChild(this.plane);
        this.plane.appendChild(this.imgNode);
        this.imgNode.src=this.src;
        this.plane.style.position='absolute';
        this.plane.style.left=this.x+'px';
        this.plane.style.top=this.y+'px';
    }
}
//Bullet构造函数
function Bullet(args) {
    var defaultArgs={
        src:'images/bullet1.png',
        x:127,
        y:480,
        speed:25,
        damage:1
    };
    for(var k in args){
        defaultArgs[k]=args[k];
    }
    this.imgNode=document.createElement('img');
    this.src=defaultArgs.src;
    this.x=defaultArgs.x;
    this.y=defaultArgs.y;
    this.speed=defaultArgs.speed;
    this.isDied=false;
    this.damage=defaultArgs.damage;

    this.move = function() {
        this.imgNode.style.top = parseInt(this.imgNode.style.top) - this.speed + 'px';
    };
    //判断子弹是否击中敌人
    this.isHit = function () {
        for (var i=0;i<enemys.length;i++){
            if((parseInt(this.imgNode.style.left)>=parseInt(enemys[i].imgNode.style.left))&&
                (parseInt(this.imgNode.style.left)<=parseInt(enemys[i].imgNode.style.left)+parseInt(enemys[i].imgNode.offsetWidth))&&
                (parseInt(this.imgNode.style.top)<=parseInt(enemys[i].imgNode.style.top)+parseInt(enemys[i].imgNode.offsetHeight))&&
                (parseInt(this.imgNode.style.top)>=parseInt(enemys[i].imgNode.style.top))){
                if(!enemys[i].isDied) {
                    if (enemys[i].src == 'images/enemy1.png') {
                        enemys[i].blood--;
                        if(enemys[i].blood<=0){
                            enemys[i].imgNode.src = 'images/enemy1bom.gif';
                            enemys[i].isDied = true;
                            this.isDied = true;
                            score+=1;
                            scoreVal.innerText=score;
                        }
                    }else if(enemys[i].src == 'images/enemy2.png'){
                        enemys[i].blood--;
                        if(enemys[i].blood<=0) {
                            enemys[i].imgNode.src = 'images/enemy2bom.gif';
                            enemys[i].isDied = true;
                            score+=5;
                            scoreVal.innerText=score;
                        }else {
                            this.isDied = true;
                            enemys[i].isHited=true;
                            enemys[i].imgNode.className='enemyHited';
                            enemys[i].imgNode.src = 'images/enemy2hit.png';
                        }
                    }else if(enemys[i].src == 'images/enemy3.png'){
                        enemys[i].blood--;
                        if(enemys[i].blood<=0) {
                            enemys[i].imgNode.src = 'images/enemy3bom.gif';
                            enemys[i].isDied = true;
                            score+=15;
                            scoreVal.innerText=score;
                        }else {
                            this.isDied = true;
                            enemys[i].isHited=true;
                            enemys[i].imgNode.className='enemyHited';
                            enemys[i].imgNode.src = 'images/enemy3hit.png';
                        }
                    }
                }
            }
        }
    };

    this.init = function () {
        this.imgNode.src=this.src;
        this.imgNode.style.position = 'absolute';
        wrap.appendChild(this.imgNode);
        this.imgNode.style.left=Number(this.x - this.imgNode.offsetWidth / 2)+ 'px';
        this.imgNode.style.top= this.y - this.imgNode.offsetHeight + 'px';
    };
    this.init();
}
//Enemy构造函数
function Enemy(args) {
    var defaultArgs={
        src:'images/enemy1.png',
        x:0,
        y:0,
        speed:3,
        diedTime:10,
        blood:1,
        width:34,
        height:24
    };
    for(var k in args){
        defaultArgs[k]=args[k];
    }
    this.imgNode=document.createElement('img');
    this.src=defaultArgs.src;
    this.x=defaultArgs.x;
    this.y=defaultArgs.y;
    this.speed=defaultArgs.speed;
    this.isDied=false;
    this.isHited=false;
    this.hitedTime=5;
    this.diedTime=defaultArgs.diedTime;
    this.blood=defaultArgs.blood;
    this.width=defaultArgs.width;
    this.height=defaultArgs.height;

    this.move = function () {
        this.imgNode.style.top = parseInt(this.imgNode.style.top) + this.speed + 'px';
    };
    this.init = function () {
        this.imgNode.src=this.src;
        this.imgNode.style.position = 'absolute';
        wrap.appendChild(this.imgNode);
        this.imgNode.style.left=Math.ceil(Math.random()*(wrap.offsetWidth-this.width))+'px';
        this.imgNode.style.top= (this.y - this.height)+'px';
    };
    this.isHit = function () {
        for (var i=0;i<enemys.length;i++){
            if((parseInt(this.imgNode.style.left)>=parseInt(plane.plane.style.left))&&
                (parseInt(this.imgNode.style.left)<=parseInt(plane.plane.style.left)+parseInt(plane.plane.offsetWidth))&&
                (parseInt(this.imgNode.style.top)<=parseInt(plane.plane.style.top)+parseInt(plane.plane.offsetHeight))&&
                (parseInt(this.imgNode.style.top)>=parseInt(plane.plane.style.top))) {
                if(!plane.protect) {
                    plane.blood--;
                    bloodLine.style.width= plane.blood*20 +'%';
                    if (plane.blood <= 0) {
                        plane.imgNode.src='images/planebom.gif';
                        plane.isDied= true;
                        gameOver.style.display='block';
                    } else {
                        plane.isHited = true;
                        plane.plane.className = 'planehited';
                        plane.protect = true;
                    }
                }
            }
        }
    };
    this.init();

}
