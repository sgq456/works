
//人物
function person(canvas,cobj,runimg,jumpimg,downimg) {
    this.x=0;
    this.y=0;
    this.width=78;
    this.height=110;
    this.canvas=canvas;
    this.cobj=cobj;
    this.runimg=runimg;
    this.runimgnum=this.runimg.length;
    this.runimgw=this.runimg[0].offsetWidth;
    this.runimgh=this.runimg[0].offsetHeight;
    this.jumpimg=jumpimg;
    this.downimg=downimg;
    this.statu="runimg";
    this.status=0;
    this.life=3;
    this.p=0;
}
person.prototype={
    draw:function () {
        this.cobj.save();
        this.cobj.translate(this.x,this.y);
        if(this.statu=="runimg"){
            this.cobj.drawImage(this[this.statu][this.status],0,0,this.runimgw,this.runimgh,0,0,this.width,this.height);
        }else if(this.statu=="jumpimg"){
            this.cobj.drawImage(this[this.statu][0],0,0,this.runimgw,this.runimgh,0,0,this.width,this.height);
        }else if(this.statu=="downimg"){
            if(this.status>1){
                this.status=1;
            }
            this.cobj.drawImage(this[this.statu][this.status],0,0,this.runimgw,this.runimgh,0,0,this.width,this.height);
        }
        this.cobj.restore();
    }
};
//障碍物
function hider(canvas,cobj,hiderimg) {
    this.canvas=canvas;
    this.cobj=cobj;
    this.x=canvas.width+700;
    this.y=0;
    if(canvas.width>1000){
        this.width=80;
        this.height=80;
    }else{
        this.width=40;
        this.height=40;
    }
    this.hiderimg=hiderimg;
    this.status=0;
    this.p=0;
    this.hider1t=0;
}
hider.prototype={
    draw:function () {
        this.cobj.save();
        this.cobj.translate(this.x,this.y);
        if(this.status==0){
            this.hider1t++;
            if(this.hider1t>this.hiderimg[this.status].length-1){
                this.hider1t=0;
            }
            this.cobj.drawImage(this.hiderimg[this.status][this.hider1t],0,0,this.hiderimg[0][0].offsetWidth,this.hiderimg[0][0].offsetHeight,0,0,this.width,this.height);
        }else if(this.status!=0&&this.status!=2){
            this.cobj.drawImage(this.hiderimg[this.status][0],0,0,this.hiderimg[this.status][0].offsetWidth,this.hiderimg[this.status][0].offsetHeight,0,0,this.width,this.height);
        }else if(this.status==2){
            this.hider1t++;
            if(this.hider1t>this.hiderimg[this.status].length-1){
                this.hider1t=0;
            }
            this.cobj.drawImage(this.hiderimg[this.status][this.hider1t],0,0,this.hiderimg[0][0].offsetWidth,this.hiderimg[0][0].offsetHeight,0,0,this.width,this.height);
        }
        this.cobj.restore();
    }
};
//宝石
function baoshi(canvas,cobj,baoshiimg) {
    this.canvas=canvas;
    this.cobj=cobj;
    this.x=canvas.width+700;
    this.y=0;
    if(canvas.width>1000){
        this.width=40;
        this.height=40;
    }else{
        this.width=20;
        this.height=20;
    }
    this.baoshiimg=baoshiimg;
    this.status=0;
    this.p=0;

}
baoshi.prototype={
    draw:function () {
        this.cobj.save();
        this.cobj.translate(this.x,this.y);
        this.cobj.drawImage(this.baoshiimg[this.status],0,0,this.baoshiimg[0].offsetWidth,this.baoshiimg[0].offsetHeight,0,0,this.width,this.height);
        this.cobj.restore();
    }
};



//开始游戏
function game(canvas,cobj,runimg,downimg,jumpimg,hiderimg,clienW,clienH,body,best,fenshu,life,pao,zhuang,qitiao,tiaoxia,dunxia,mendie,jieshu,baoshiimg,baoshi) {
    this.canvas=canvas;
    this.cobj=cobj;
    this.body=body;
    this.runimg=runimg;
    this.jumpimg=jumpimg;
    this.downimg=downimg;
    this.clienW=clienW;
    //由于后面有多个值为clienH/2
    this.clienH=clienH*2*2/3;
    this.person=new person(canvas,cobj,runimg,jumpimg,downimg);
    this.person.p=0;
    this.pao=pao;
    this.zhuang=zhuang;
    this.jieshu=jieshu;
    this.qitiao=qitiao;
    this.baoshi=baoshi;
    this.tiaoxia=tiaoxia;
    this.dunxia=dunxia;
    this.mendie=mendie;
    this.hiderimg=hiderimg;
    if(canvas.width>1000){
        this.weizhinum=160;
        this.speed=18;
        this.dogspeed=10;
    }else{
        this.weizhinum=80;
        this.speed=5;
        this.dogspeed=3;
    }
    this.baoshiimg=baoshiimg;
    this.baoshiimgstaus=0;
    this.hiderimgArr=[];
    this.baoshiimgArr=[];
    //变化要修改
    this.hidernum=6;
   
    this.hidertimeb=1000;
    this.hidertimea=20;
    this.hidertime=this.hidertimeb+Math.floor(4*Math.random())*50*this.hidertimea;
    this.score=0;
    this.fenshu=fenshu;
    life.innerHTML=3;
    this.lifez=life;
    this.guoguan=3;
    this.guanka=0;
    if(localStorage.paobu){
        this.history=localStorage.paobu;
        best.innerHTML=this.history;
    }else{
        this.history="无";
        best.innerHTML="无";
    }
    this.baoshiflag=true;
}
game.prototype={
    init:function () {
        this.baoshiflag=true;
        if(this.canvas.width>1000){
            this.weizhinum=160;
            this.speed=18;
            this.dogspeed=10;
        }else{
            this.weizhinum=80;
            this.speed=5;
            this.dogspeed=3;
        }
        //人物初始化
        if(this.pytl){
            clearInterval(this.pytl);
        };
        if(this.pytr){
            clearInterval(this.pytr);
        };
        if(this.upt){
            clearInterval(this.upt);
        }
        this.person.p=0;
        this.person.y=0;
        this.person.downflag=false;
        this.person.yflag=false;
        this.person.keyflag=false;
        this.person.upflag=false;
        this.person.statu="runimg";
        this.qitiao.pause();
        this.dunxia.pause();
        this.hiderimgArr=[];
        this.baoshiimgArr=[];
        this.hidertimeb=1000;
        this.hidertimea=20;
        this.hidertime=this.hidertimeb+Math.floor(4*Math.random())*50*this.hidertimea;
        this.score=0;
        this.time=new Date();
        this.now=this.time.getTime();
        this.person.x=0;
        this.person.life=3;
        this.lifez.innerHTML=3;
        this.person.runimgw=this.person.runimg[0].offsetWidth;
        this.person.runimgh=this.person.runimg[0].offsetHeight;
        //障碍物初始化
        // if(this.zidongt){
        //     clearTimeout(this.zidongt)
        // }
        clearInterval( this.playt);
        this.play(true);
    },
    play:function (type) {
        this.playtype=type||false;
        var that=this;
        // that.pao.defaultPlaybackRate=0.1;
        if(type){
            //播放跑步
            that.pao.play();
            //置或返回音频/视频的默认播放速度defaultPlaybackRate而不是当前的
            that.pao.playbackRate=1.2;
            //事件响应式
            if(that.clienW>1000){
                that.key(true);
            }else{
                that.touch(true);
            }
        }
        //布局响应式
        if(that.clienW>1000){}else{
            that.person.width=39;
            that.person.height=55;
        }
        var num=0;
        var num2=0;
        var downnum=0;
        var downtime=500;
        var dotimeind=0;
        var bodypos=0;
        //人的y轴位置
        this.person.y=this.clienH/2;

        this.playt=setInterval(function () {
            var personp=that.person.p;
            that.cobj.clearRect(0,0,that.canvas.width,that.canvas.height);
            num2+=50;
            if(that.person.statu=="jumpimg"){
                num=0;
                that.person.status=0;
            }else if(that.person.statu=="runimg"){
                num++;
                that.person.status=num%that.person.runimg.length;
            }else if(that.person.statu=="downimg"){
                if(downnum>1){
                    dotimeind+=50;
                    if(dotimeind%downtime==0){
                        that.person.statu="runimg";
                        that.person.downflag=false;
                        that.person.status=num%that.person.runimg.length;
                        downnum=0;
                        dotimeind=0;
                    }else{
                        that.person.status=1;
                    }

                }else{
                     that.person.status=downnum;
                     downnum++;
                }
            }
            that.person.x+=that.speed;
            if(that.clienW>1000){

                if(that.person.x>that.canvas.width/2){
                        bodypos-=that.speed;
                        that.person.x=that.canvas.width/2;
                        that.canvas.style.backgroundPosition=bodypos+"px center";
                }
            }else{
                if(that.person.x>that.canvas.width/5){
                    bodypos-=that.speed;
                    that.person.x=that.canvas.width/5;
                    that.canvas.style.backgroundPosition=bodypos+"px center";
                }
            }
            that.person.draw();
            //创建障碍物
            if((num2)%(that.hidertime)==0){
                num2=0;
                that.creathider();
            }else{
                if(that.baoshiflag){
                    if(num2>700){

                        that.baoshiflag=false;
                       if((num2)%350==0) {
                           that.creatbaozhi(that.baoshiimgstaus);
                       }
                    }
                }else{
                        if((num2)%350==0) {
                            that.creatbaozhi(that.baoshiimgstaus);
                        }
                }

            }
            for(var i=0;i<that.baoshiimgArr.length;i++){
                    that.baoshiimgArr[i].x-=that.speed;
                    that.baoshiimgArr[i].draw();
                if(hitPix(that.canvas,that.cobj,that.person,that.baoshiimgArr[i])) {
                    if(personp==that.baoshiimgArr[i].p){
                        if (type) {
                                that.baoshi.play();
                                //判断宝石类型
                                if(that.baoshiimgstaus==0){
                                    that.score++;
                                }else if(that.baoshiimgstaus==1){
                                    that.score+=2;
                                }else if(that.baoshiimgstaus==2){
                                    that.score+=3;
                                }else if(that.baoshiimgstaus==3){
                                    that.score+=4;
                                }
                                that.fenshu.innerHTML=that.score;
                            }

                    that.baoshiimgArr.splice(i,1);
                    i--;
                    }
                    //宝石增值
                    if(that.score>=100&&that.score<300){

                        that.baoshiimgstaus=1;
                    };
                    if(that.score>=300&&that.score<500){
                        that.baoshiimgstaus=2;
                    };
                    if(that.score>=500){
                        that.baoshiimgstaus=3;
                    };
                }
                if(that.clienW>1000){
                    for(var j=0;j<that.baoshiimgArr.length;j++){
                        if(that.baoshiimgArr[j].x<-300){
                            that.baoshiimgArr.splice(j,1);
                            i--;
                        }
                    }
                }else{
                    for(var j=0;j<that.baoshiimgArr.length;j++){
                        if(that.baoshiimgArr[j].x<-100){
                            that.baoshiimgArr.splice(j,1);
                            i--;
                        }
                    }
                }
            }
            for(var i=0;i<that.hiderimgArr.length;i++){
                //障碍物移动
                if(that.hiderimgArr[i].status!=0&&that.hiderimgArr[i].status!=2){
                    that.hiderimgArr[i].x-=that.speed;
                }else{
                    that.hiderimgArr[i].x-=(that.speed+that.dogspeed);
                }
                that.hiderimgArr[i].draw();
                if(hitPix(that.canvas,that.cobj,that.person,that.hiderimgArr[i])){
                    if(!that.hiderimgArr[i].flag&&(personp==that.hiderimgArr[i].p)){
                        if(type){
                         that.person.life--;
                            if( that.person.life<1){
                                that.person.life=0;
                            }
                        }
                        if(that.playtype){
                            that.pao.pause();
                            that.zhuang.play();
                        }
                        that.lifez.innerHTML=that.person.life;
                        xue(that.canvas,that.cobj,that.person.x+2*that.person.width/3,that.person.y+that.person.height/3);
                        //减血后生命值变化
                        that.hiderimgArr[i].flag=true;
                        if(that.playtype){
                        if(that.person.life<=0){
                            //游戏结束
                            that.mendie.play();
                            that.jieshu.play();
                            that.zhuang.addEventListener("ended",function () {
                                that.pao.pause();
                                that.pao.removeAttribute("loop");
                            },false);
                            that.pao.pause();
                            if(localStorage.paobu){
                                if(localStorage.paobu<that.score){
                                    localStorage.paobu= that.score;
                                }
                            }else{
                                localStorage.paobu= that.score;
                            }
                            clearInterval(that.playt);
                            setTimeout(function () {
                                that.pao.pause();
                                that.shijianflag=true;
                                that.speed=18;
                                that.person.p=0;
                                that.person.y=0;
                                that.play(false);
                            },10000)
                        }else{
                            that.zhuang.addEventListener("ended",fn,false);
                        }
                        }
                    }
                            function fn() {
                                that.pao.play();
                            }
                }else{
                    if((that.hiderimgArr[i].x+that.hiderimgArr[i].width)<that.person.x){
                        if(!that.hiderimgArr[i].flag&&!that.hiderimgArr[i].flags){
                            if(type) {
                                that.score++;
                            }
                            that.fenshu.innerHTML=that.score;
                                if(that.score>=100&&that.score<500){
                                    that.canvas.style.backgroundImage="url(img/cjs.jpg)";
                                };
                                if(that.score>=500){
                                    that.canvas.style.backgroundImage="url(img/cjt.jpg)";
                                };
                            that.hiderimgArr[i].flags=true;
                        }
                    }
                }
                //    自动游戏
                if(!type){
                    if(that.hiderimgArr[i].p==personp){
                        if(that.person.x+that.hiderimgArr[i].width+30>that.hiderimgArr[i].x&&that.hiderimgArr[i].x>that.person.x){
                            that.upflag=true;
                            if(that.hiderimgArr[i].status==2){
                                that.godown();
                            }else{
                                that.goup();
                            }
                        }
                    }
                           // that.zidongt=setTimeout(function () {
                                var numt=Math.random();
                                if(numt<0.005){
                                //    goright
                                    that.goright();

                                }else if(numt>0.995){
                                    //    goleft
                                    that.goleft();
                                }else{

                                }
                            // },30);
                }else{
                        //增加难度
                        var time= new Date();
                        if(time.getTime()-that.now>5000){
                            that.now=time.getTime();
                            that.guoguan+=2;
                            that.speed+=1;

                            if(that.speed>=80){
                                that.speed=80
                            }
                            that.hidertimeb-=50;
                            if(that.hidertimeb<300){
                                that.hidertimeb=300;
                            }
                            that.hidertimea-=1;
                            if(that.hidertimea<4){
                                that.hidertimea=4;
                            }

                        }
                    if(that.score%30==0){
                        if(!that.lifezflag){
                            that.person.life++;
                            that.lifezflag=true;
                            that.lifez.innerHTML=that.person.life;
                        }
                    }else{
                        that.lifezflag=false;
                    }
                }
                if(that.clienW>1000){
                    if(that.hiderimgArr[i].x<-300){
                        that.hiderimgArr.splice(i,1);
                        //删除不在屏幕中的障碍物，删除后数组遍历的指数i要减一，否则进入下一循环时会跳过一个。出现闪动
                        i--;
                    }
                }else{

                    if(that.hiderimgArr[i].x<-100){
                        that.hiderimgArr.splice(i,1);
                        //删除不在屏幕中的障碍物，删除后数组遍历的指数i要减一，否则进入下一循环时会跳过一个。出现闪动
                        i--;
                    }
                }


            }
        },50)
    },
    key:function () {

            var that=this;
            that.upflag=true;
            document.onkeydown=function (e) {
                if (!that.shijianflag) {
                    if (e.keyCode == 32) {
                        that.goup();
                    } else if (e.keyCode == 38) {
                        that.goright();
                    } else if (e.keyCode == 40) {
                        that.goleft();
                    } else if (e.keyCode == 37) {
                        that.godown();

                    }
                }else{
                    document.onkeydown=null;
                }
            }

    },
    touch:function () {
            var that=this;
            that.upflag=true;
            touch.on(this.canvas, 'tap', function(){
                that.goup();
            });
            touch.on(this.canvas, 'swipeleft', function(){
                that.godown();
            });
            touch.on(this.canvas, 'swipeup', function(){
                that.goright();
            });
            touch.on(this.canvas, 'swipedown', function(){
                that.goleft();
            });
    },
    goup:function () {
        var that=this;
        if(!that.person.downflag) {
            if (!that.person.yflag) {
                if (!that.person.keyflag) {
                    that.person.keyflag = true;
                    if (!that.upflag) {
                        return;
                    }
                    that.upflag = false;
                    that.person.statu = "jumpimg";
                    if (that.playtype) {
                        that.pao.pause();
                        that.qitiao.play();
                        that.qitiao.addEventListener("ended", function () {
                            that.tiaoxia.play();

                        }, false);
                        that.tiaoxia.addEventListener("ended", function () {
                            that.pao.play();
                        }, false);
                    }
                    //    跳跃高度
                    if (that.clienW > 1000) {
                        var r = 200;
                    } else {
                        var r = 100;
                    }

                    var intadeg = 0;
                    //    跳跃速度
                    var speeddeg = 15;
                    var tiaoy = 0;
                    var inity = that.person.y;
                   that.upt = setInterval(function () {
                        if (intadeg > 180) {
                            intadeg = 0;
                            that.person.y = inity;
                            that.person.statu = "runimg";
                            that.upflag = true;
                            that.person.keyflag = false;
                            clearInterval(that.upt)
                        } else {
                            intadeg += speeddeg;
                            tiaoy = Math.sin(intadeg * Math.PI / 180) * r;
                            that.person.y = inity - tiaoy;
                        }
                    }, 50)

                }
            }
        }

    },
    godown:function () {
        var that=this;
        if(!that.person.keyflag) {
                 if(!that.person.downflag){
                     that.person.downflag=true;
            if(that.playtype){
                that.pao.pause();
                that.dunxia.play();
                that.dunxia.addEventListener("ended", function () {
                    that.pao.play();
                }, false);
            }
            that.person.statu="downimg";
        }
        }

    },
    goleft:function () {
        var that=this;
        if(!that.person.downflag) {
            if (!that.person.keyflag) {
                if (!that.person.yflag) {
                    var weizhishu = that.weizhinum/ 10;
                    var huanp = parseInt(weizhishu / 2);
                    var y = 0;
                    var stary=that.person.y;
                    if (that.person.p > 0) {
                        that.person.yflag = true;
                        that.pytl = setInterval(function () {
                            y += 1;
                            that.person.y += 10;
                            if (y == huanp) {
                                //进入下一轨道
                                that.person.p--;
                            }
                            if (y >= weizhishu) {
                                y = 0;
                                that.person.yflag = false;
                                that.person.y=stary+ that.weizhinum;
                                clearInterval(that.pytl);
                            }
                        }, 50)
                    }
                }
            }
        }

    },
    goright:function () {
        var that=this;
        if(!that.person.downflag) {
            if (!that.person.keyflag) {
                if (!that.person.yflag) {
                    var weizhishu = that.weizhinum / 10;
                    var huanp = parseInt(weizhishu / 2);
                    var y = 0;
                    var stary=that.person.y;
                    if (that.person.p < 2) {
                        that.person.yflag = true;
                        that.pytr = setInterval(function () {
                            y += 1;
                            that.person.y -= 10;
                            if (y == huanp) {
                                //进入下一轨道
                                that.person.p++;
                            }
                            if (y >= weizhishu) {
                                y = 0;
                                that.person.yflag = false;
                                that.person.y=stary- that.weizhinum;
                                clearInterval(that.pytr);
                            }
                        }, 50)
                    }
                }
            }
        }

    },
    creathider:function () {
        var that=this;
        //过关后障碍物变化
        that.hidertime=that.hidertimeb+Math.floor(4*Math.random())*50*that.hidertimea;
        // that.hidertime=1000+Math.floor(2*Math.random())*50*200;
        var hiderobj=new hider(that.canvas,that.cobj,that.hiderimg);

        //上下中路间距
        that.weizhinum=hiderobj.height*2;
        //障碍物位置
        var hiderpos=Math.floor(Math.random()*3);
        if(hiderpos==0){
            hiderobj.p=0;
        }else if(hiderpos==1){
            hiderobj.p=1;
        }else{
            hiderobj.p=2;
        }
        //随机障碍物
        hiderobj.status=Math.floor(that.hidernum*Math.random());
        //障碍物高度（鸟高）
        if(hiderobj.status==2){
            hiderobj.y=that.clienH/2+that.person.height-hiderobj.height-that.weizhinum/4-hiderpos*that.weizhinum;
        }else if(hiderobj.status==0){
            hiderobj.y=that.clienH/2+that.person.height-hiderobj.height-hiderpos*that.weizhinum;
        }else {
            hiderobj.y=that.clienH/2+that.person.height-hiderobj.height-hiderpos*that.weizhinum;
        }
        that.hiderimgArr.push(hiderobj);
    },
    creatbaozhi:function (baoshiimgstaus) {
        var that=this;
        var baoshiobj=new baoshi(that.canvas,that.cobj,that.baoshiimg);

        //障碍物位置
        var hiderpos=Math.floor(Math.random()*3);
        if(hiderpos==0){
            baoshiobj.p=0;
        }else if(hiderpos==1){
            baoshiobj.p=1;
        }else{
            baoshiobj.p=2;
        }
        //随机障碍物
        baoshiobj.status=baoshiimgstaus;
        //障碍物高度（鸟高）

       baoshiobj.y=that.clienH/2+that.person.height-baoshiobj.height-hiderpos*that.weizhinum;

        that.baoshiimgArr.push(baoshiobj);
    }
}


function lizi(canvas,cobj,x,y) {
    this.x=x;
    this.y=y;
    this.canvas=canvas;
    this.cobj=cobj;
    this.r=2+3*Math.random();
    this.speedx=6*Math.random()-3;
    this.speedy=6*Math.random()-3;
    this.life=1;

}
lizi.prototype={
    draw:function () {
        this.cobj.save();
        this.cobj.translate(this.x,this.y);
        this.cobj.fillStyle="red";
        this.cobj.beginPath();
        this.cobj.arc(0,0,this.r,0,Math.PI*2);
        this.cobj.fill();
        this.cobj.restore();
    },
    updata:function () {
        this.x+=this.speedx;
        this.y+=this.speedy;
        this.r-=1;
        this.life-=0.2;
    }
}

function xue(canvas,cobj,x,y) {
    var num=10+parseInt(10*Math.random());
    var xuearr=[];
    for(var i=0;i<num;i++){
        var xueobj=new lizi(canvas,cobj,x,y);
        xueobj.x=x;
        xueobj.y=y;
        xuearr.push(xueobj);
    }
    var xt=setInterval(function () {
        for (var i=0;i<xuearr.length;i++){
            xuearr[i].draw();
            xuearr[i].updata();
            if(xuearr[i].left<=0||xuearr[i].r<=0){
                xuearr.splice(i,1);
            }
        }
        if(xuearr.length==0){
            clearInterval(xt);
        }
    },50)
}