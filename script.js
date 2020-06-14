"use strict";

var positioning = new Array(8);//配置確認用の配列
positioning[0]=null;//0は使わない
var score;//ゲームのスコア
var time;//残り時間
var maxScore;//最終結果は退治率で出すため、そのゲームで撮ることができる最大スコアを把握
var timeoutBox=new Array(8);//時間によって消すclearRect関数のIDを管理する配列
timeoutBox[0]=null;
var shootingBox=new Array(8);//打撃によって消すclearRect関数のIDを管理する配列
shootingBox[0]=null;
const coordinates =[//それぞれのマスの座標の定数[x,y]
	[null,null],
	[40,415],
	[200,415],
	[360,415],
	[40,255],
	[200,255],
	[360,255],
	[40,95],
	[200,95],
	[360,95]
];
const squareSize=150;//マスの大きさ
const alienDisappear=2.3;//宇宙人が消える時間を決める係数
const astronautDisappear=2.7;//宇宙飛行士が消える時間を決める係数
const ufoDisappear=0.8;//宇宙人が消える時間を決める係数
const scoreY=625;//スコアのy座標
const scoreX0=45;//スコアの千の位のx座標
const scoreX1=80;//スコアの百の位のx座標
const scoreX2=115;//スコアの十の位のx座標
const scoreX3=150;//スコアの一の位のx座標
const scoreXSize=143;//スコアボックスのx辺の大きさ
const scoreYSize=40;//スコアボックスのy辺の大きさ
const timeX0=240;//残り時間の十の位のx座標
const timeX1=280;//残り時間の一の位のx座標
const timeY=45//残り時間のy座標
const timeXSize=78;//残り時間表示エリアのx辺の大きさ
const timeYSize=40;//残り時間表示エリアのy辺の大きさ
const resultX=150;//RESULTを表示するx座標
const resultY=255;//RESULTを表示するy座標
const resultX0=90;//撃破率の百の位のx座標
const resultX1=160;//撃破率の十の位のx座標
const resultX2=230;//撃破率の一の位のx座標
const resultXPer=320;//%を表示するx座標
const resultPerY=resultY+50;//撃破率のy座標
const startMsgX=41;//スタートメッセージのx座標
const startMsgY=150;//スタートメッセージのy座標
const goBtnX=176;//GOボタンのx座標
const goBtnY=400;//GOボタンのy座標
const descriptionX=35;//操作説明のx座標
const descriptionY=85;//操作説明のy座標
const readyX=70;//READYのx座標
const readyY=255;//READYのy座標
const goX=70;//GOのx座標
const goY=255;//GOのy座標
const finishX=70;//FINISHのx座標
const finishY=255;//FINISHのy座標
const againBtnX=176;//AGAINボタンのx座標
const againBtnY=400;//AGAINボタンのy座標
const stagesTime=10000;//各ステージタイムの時間
const descriptionTime=2000;//説明を表示する長さ
const readyTime=1000;//READYを表示する長さ
const goTime=500;//GOを表示する長さ
const finishTime=1500;//FINISHを表示する長さ

function firstDraw(){
	const canvas=document.querySelector('#gameScreen');
	const context=canvas.getContext('2d');
	const flame=new Image();
	flame.src="img/flame.png";
	const description=new Image();
	description.src="img/description.png"
	flame.onload=function(){
		context.drawImage(flame,0,0);
		const startMsg=new Image();
		const goBtn=new Image();
		startMsg.src="img/startMsg.png";
		goBtn.src="img/goBtn.png";
		startMsg.onload=function(){
			context.drawImage(startMsg,41,150);//スタートメッセージ(ゲームの概要)を表示
		};
		goBtn.onload=function(){
			context.drawImage(goBtn,176,400);//goボタン(ゲームスタートボタン)を表示
		};
	};

	canvas.onclick=function(event){
		var x=event.clientX-canvas.offsetLeft;
		var y=event.clientY-canvas.offsetTop;
		if((176<=x&&x<=374)&&(400<=y&&y<=484)){//goボタンが押された時の挙動
			context.clearRect(0,0,550,700);
			context.drawImage(flame,0,0);
			context.drawImage(description,descriptionX,descriptionY);//操作方法の説明を表示
			setTimeout(function(){
				context.clearRect(0,0,550,700);
				context.drawImage(flame,0,0);
				readyGo();//readyGoを表示
				setTimeout(function(){
						game();//ゲームスタート
				},readyTime+goTime);
			},descriptionTime);
		}
	};
}

function readyGo(){//readyGOを表示する
	const canvas=document.querySelector('#gameScreen');
	const context=canvas.getContext('2d');
	const ready=new Image();
	const go=new Image();
	ready.src="img/ready.png"
	go.src="img/go.png"
	ready.onload=function(){
		context.drawImage(ready,readyX,readyY);//readyを表示
		setTimeout(function(){
			context.clearRect(readyX,readyY,400,200);//readyを削除
			context.drawImage(go,goX,goY);//goを表示
			setTimeout(function(){
				context.clearRect(goX,goY,400,200);//goを削除
			},goTime);
		},readyTime);
	};
}

function game(){//ゲームの進行
	for(var i=1;i<10;i++){
		positioning[i]=0;//配置確認用の配列初期化
	}
	score=0;//スコア初期化
	maxScore=0;//最大スコア初期化
	drawScore(0);//スコアの欄に0を表示
	time=30;//残り時間初期化
	drawTime(30);//残り時間の欄に0を表示
	document.addEventListener("keydown", shotFunc);
	var timer=setInterval("timerFunc()",1000);//タイマーをスタート
	var firstStage=setInterval("appearance(1000)",1000);//ステージ1(遅い)スタート
	var secondStage,thirdStage;
	setTimeout(function(){clearInterval(firstStage);secondStage=setInterval("appearance(850)",600);},stagesTime);//10秒後にステージ1を終了、ステージ2(普通)スタート
	setTimeout(function(){clearTimeout(secondStage);thirdStage=setInterval("appearance(700)",400);},stagesTime*2);//20秒後にステージ2を終了、ステージ3(早い)スタート
	setTimeout(function(){clearTimeout(thirdStage);clearInterval(timer);finish();},stagesTime*3);//30秒後にステージ3を終了、タイマーをストップ、終了画面を出す
}

function finish(){//finishを表示する
	const canvas=document.querySelector('#gameScreen');
	const context=canvas.getContext('2d');
	const finish=new Image();
	finish.src="img/finish.png"
	for (var i = 1; i < 10; i++) {
		positioning[i]=0;//全ての場所から出現物を強制的に消す
		clearTimeout(shootingBox[i]);//全ての場所におけるclearRectの予約をキャンセル(打撃による)
		clearTimeout(timeoutBox[i]);//全ての場所におけるclearRectの予約をキャンセル(自動による)
	}
	context.clearRect(coordinates[7][0],coordinates[7][1],470,470);
	finish.onload=function(){
		context.drawImage(finish,finishX,finishY);//finishを表示
		setTimeout(function(){
			context.clearRect(finishX,finishY,400,200);//finishを削除
			result();//result関数を呼び出し
		},finishTime);
	}
}

function result(){//リザルト画面を表示する
	const canvas=document.querySelector('#gameScreen');
	const context=canvas.getContext('2d');
	const againBtn=new Image();
	const flame=new Image();
	againBtn.src="img/againBtn.png";
	flame.src="img/flame.png";
	var resultScore=Math.round(score/maxScore*100);//撃破率の計算
	drawPercentage(resultScore);//撃破率を画面上に表示する関数呼び出し
	againBtn.onload=function(){
		context.drawImage(againBtn,againBtnX,againBtnY);//againボタン表示
	};
	canvas.onclick=function(event){
		var x=event.clientX-canvas.offsetLeft;
		var y=event.clientY-canvas.offsetTop;
		if((176<=x&&x<=374)&&(400<=y&&y<=484)){//againボタンが押された時の挙動
			context.clearRect(0,0,550,700);
			context.drawImage(flame,0,0);
			readyGo();//readyGoを表示する
			setTimeout(function(){
				game();//再度ゲームを始める
			},readyTime+goTime);
		}
	};
}

function shotFunc(e){ //キーボードを押したときの動作
	var key=e.keyCode;
	switch(key){
		case 49:case 97:key=1;break;//テンキーのキーコードを実際に対応する場所の数字に置き換え
		case 50:case 98:key=2;break;
		case 51:case 99:key=3;break;
		case 52:case 100:key=4;break;
		case 53:case 101:key=5;break;
		case 54:case 102:key=6;break;
		case 55:case 103:key=7;break;
		case 56:case 104:key=8;break;
		case 57:case 105:key=9;break;
	}
	if(positioning[key]>0&&positioning[key]<7){//出現物を管理する配列の中に出現物が入っていたら点数処理をする
		switch(positioning[key]){
			case 1:
			case 2:
			case 3:
			case 4:score+=30;break;//宇宙人
			case 5:if(score<=60){score=0;}else if(score>60){score-=60;}break;//宇宙飛行士
			case 6:score+=60;break;//UFO
			default:break;
		}
		positioning[key]=200;//処理中ステータス
		drawExplosion(key);//出現物の上に爆発波を描画する
		shootingBox[key]=setTimeout(function() {disappear(key);},200);//爆発波を消す
		drawScore(score);//スコアを更新
	}
}

function appearance(standardSec){//出現
	const canvas=document.querySelector('#gameScreen');
	const context=canvas.getContext('2d');
	var cheakCounter=0;//全部のマスに出現物がいるかどうか確認するためのカウンター

	for(var i=1;i<10;i++){
		if(positioning[i]!=0)cheakCounter++;//出現物がいればカウンターを増やす
	}

	if(cheakCounter==9){//全部埋まっていたら新たな出現物は出現させない
		return;
	}else{//そうでなければあいているところのどこかに新たな出現物を出現させる
		while(1){//空いているところに当たるまで乱数を出し続ける
			var place=(parseInt(Math.random()*10)%9+1);
			if(positioning[place]==0)break;//空いているところに当たれば抜け出す
		}
		var num=(parseInt(Math.random()*10)%6+1);//どの出現物を出すか決める
		const appearance=new Image();
		appearance.src="img/appearance"+num+".png";//出現物の画像を取り出す

		appearance.onload=function(){
			if(place>0&&place<10){//先ほど決めた場所に先ほど決めた出現物を出現させる
				context.drawImage(appearance,coordinates[place][0],coordinates[place][1]);
			}else{
				console.log("appearance_error");
			}
			positioning[place]=num;//出現物を管理する配列の対応する場所に出現物の情報を入れる
			var timeoutSec;
			switch(num){
				case 1:
				case 2:
				case 3:
				case 4:timeoutSec=standardSec*alienDisappear;maxScore+=30;break;//出現物の種類によって消えるまでの時間を割り出し、取れる最高得点の点数を更新する
				case 5:timeoutSec=standardSec*astronautDisappear;break;
				case 6:timeoutSec=standardSec*ufoDisappear;maxScore+=60;break;
				default:console.log("timeout_error");break;
			}

			timeoutBox[place]=setTimeout(function(){disappear(place);}, timeoutSec);//出現物を消す関数の予約
		};
	}
}

function drawExplosion(place){ //爆発波を描く関数
	const canvas=document.querySelector('#gameScreen');
	const context=canvas.getContext('2d');
	const explosion=new Image();
	explosion.src="img/explosion.png";
	explosion.onload=function(){
		if(place>0&&place<10){//応じた場所に爆発波を描写
			context.drawImage(explosion,coordinates[place][0],coordinates[place][1]);
		}else{
			console.log("explosion_error");
		}
	}
}

function disappear(place){//対象物を消す関数
	positioning[place]=0;
	const canvas=document.querySelector('#gameScreen');
	const context=canvas.getContext('2d');
	if(place>0&&place<10){//応じた場所をclearRectする
		context.clearRect(coordinates[place][0],coordinates[place][1],squareSize,squareSize);
	}else{
		console.log("disappear_error");
	}
	clearTimeout(timeoutBox[place]);//消したところのclearRectの予約をキャンセル
}

function drawScore(score){ //スコアを表示する関数
	const canvas=document.querySelector('#gameScreen');
	const context=canvas.getContext('2d');
	context.clearRect(scoreX0,scoreY,scoreXSize,scoreYSize);//今表示されているスコアを削除
	var copyScore=score;
	var scores = new Array(3);
	var digitCounter=0;//桁数のカウンター

	if(score>=1000){
		digitCounter=0;
	}else if(score>=100){
		digitCounter=1;
	}else if (score>=10) {
		digitCounter=2;
	}else{
		digitCounter=3;
	}

	for(var i=3;i>=0;i--){//スコアをバラバラにして配列に一桁ずつ格納する
		scores[i]=copyScore-(Math.floor(copyScore/10)*10);
		copyScore=Math.floor(copyScore/10);
	}

	switch(digitCounter){//桁数によって違う段階からスコアの描画を始める
		case 0:var value0=new Image();value0.src="img/"+scores[0]+".png";
		value0.onload=function(){context.drawImage(value0,scoreX0,scoreY);}
		case 1:var value1=new Image();value1.src="img/"+scores[1]+".png";
		value1.onload=function(){context.drawImage(value1,scoreX1,scoreY);}
		case 2:var value2=new Image();value2.src="img/"+scores[2]+".png";
		value2.onload=function(){context.drawImage(value2,scoreX2,scoreY);}
		case 3:var value3=new Image();value3.src="img/0.png";
		value3.onload=function(){context.drawImage(value3,scoreX3,scoreY);}
		default:break;
	}
}

function timerFunc(){//タイマー
	time-=1;
	drawTime(time);//残り時間の描画をする関数の呼び出し
}

function drawTime(nowTime){//残り時間を描画する関数
	var copyTime=nowTime;
	const canvas=document.querySelector('#gameScreen');
	const context=canvas.getContext('2d');
	context.clearRect(timeX0,timeY,timeXSize,timeYSize);
	if(nowTime<10){//残り時間によって描写方法を変える　10秒未満なら十の位として0を描画し、一の位は残り時間をそのまま描画する
		var value0=new Image();value0.src="img/0.png";
		value0.onload=function(){context.drawImage(value0,timeX0,timeY)};
		var value1=new Image();value1.src="img/"+nowTime+".png";
		value1.onload=function(){context.drawImage(value1,timeX1,timeY)};
	}else{//10秒以上なら秒数をバラバラにして配列に一桁ずつ格納し、それぞれの値を描画する
		var times = new Array(1);
		for(var i=1;i>=0;i--){
			times[i]=copyTime-(Math.floor(copyTime/10)*10);
			copyTime=Math.floor(copyTime/10);
		}
		var value0=new Image();value0.src="img/"+times[0]+".png";
		value0.onload=function(){context.drawImage(value0,timeX0,timeY)};
		var value1=new Image();value1.src="img/"+times[1]+".png";
		value1.onload=function(){context.drawImage(value1,timeX1,timeY)};
	}
}



function drawPercentage(resultScore){
	const canvas=document.querySelector('#gameScreen');
	const context=canvas.getContext('2d');
	var copyresultScore=resultScore;
	var percentages = new Array(2);
	var resultStr=new Image();
	resultStr.src="img/result.png";
	var per=new Image();
	per.src="img/rPer.png";
	var digitCounter=0;//桁数のカウンター

	if(resultScore==100){
		digitCounter=0;
	}else if(resultScore>=10) {
		digitCounter=1;
	}else{
		digitCounter=2;
	}

	for(var i=2;i>=0;i--){//撃破率をバラバラにして配列に一桁ずつ格納する
		percentages[i]=copyresultScore-(Math.floor(copyresultScore/10)*10);
		copyresultScore=Math.floor(copyresultScore/10);
	}

	switch(digitCounter){//桁数によって違う段階から撃破率の描画を始める
		case 0:var value0=new Image();value0.src="img/r"+percentages[0]+".png";
		value0.onload=function(){context.drawImage(value0,resultX0,resultPerY);};
		case 1:var value1=new Image();value1.src="img/r"+percentages[1]+".png";
		value1.onload=function(){context.drawImage(value1,resultX1,resultPerY);};
		case 2:var value2=new Image();value2.src="img/r"+percentages[2]+".png";
		value2.onload=function(){context.drawImage(value2,resultX2,resultPerY);};
		default:break;
	}

	resultStr.onload=function(){context.drawImage(resultStr,resultX,resultY);};//"result"の文字を描写

	per.onload=function(){context.drawImage(per,resultXPer,resultPerY);};//"%"の文字を描写
}
