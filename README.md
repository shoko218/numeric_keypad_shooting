# ゲーム「[テンキーシューティング](http://seg218.sakura.ne.jp/numeric_keypad_shooting/)」
## 概要
テンキーで操作するシューティングゲームです。<br>
(PCのみ対応、GoogleChromeで動作確認済み、Safariではゲームプレイに支障のない程度に挙動に支障あり)<br>
画面内に出てくる宇宙人を、場所に対応するテンキーを押すことで攻撃し、やっつけます。宇宙人たちは一定時間が経つと逃げてしまいます。<br>

![appearance1](https://user-images.githubusercontent.com/52749338/84602117-050e5280-aec0-11ea-8b67-709e90dbd953.png)
![appearance2](https://user-images.githubusercontent.com/52749338/84602118-063f7f80-aec0-11ea-80d5-354d922dfaf3.png)
![appearance3](https://user-images.githubusercontent.com/52749338/84602119-06d81600-aec0-11ea-96db-c10dc93169d7.png)
![appearance4](https://user-images.githubusercontent.com/52749338/84602120-0770ac80-aec0-11ea-8b56-a61f857eba2c.png)<br>
これら普通の宇宙人はやっつけると+30点です。<br>
![appearance6](https://user-images.githubusercontent.com/52749338/84602122-08094300-aec0-11ea-9654-9b5a40ff6709.png)<br>
UFOはやっつけると+60点です。ただし、普通の宇宙人より早く逃げます。<br>
![appearance5](https://user-images.githubusercontent.com/52749338/84602121-0770ac80-aec0-11ea-9fbc-4bd3f089b353.png)<br>
宇宙飛行士は仲間なのでやっつけてしまうと-60点です。しかも普通の宇宙人より逃げるのが遅いので厄介です。<br>

ゲーム時間は30秒。どれだけ正確に多くの宇宙人を逃さず、やっつけたかのパーセンテージが最終スコアになります。<br>
## 使用した技術
JavaScript,HTML/CSS(ほぼ使っていない)<br>
## 機能
<img width="567" alt="スクリーンショット 2020-06-15 4 31 15" src="https://user-images.githubusercontent.com/52749338/84602287-2facdb00-aec1-11ea-806d-f3cd4104cff3.png"><br>
初期画面です。GOを押せば次の画面に移ります。<br><br>
<img width="567" alt="スクリーンショット 2020-06-15 4 31 19" src="https://user-images.githubusercontent.com/52749338/84602289-30457180-aec1-11ea-81b2-74d0d77d7569.png"><br>
操作説明が数秒表示されたのち、「READY」「GO」の表示が出て、ゲームが始まります。<br><br>
<img width="567" alt="スクリーンショット 2020-06-15 4 32 01" src="https://user-images.githubusercontent.com/52749338/84602291-320f3500-aec1-11ea-81d5-14b3c1c141c9.png"><br>
ゲームが始まると、このようにランダムな場所に宇宙人たちが現れるので、対応する場所のテンキーを押して宇宙人たちをやっつけます。<br>
宇宙人たちの現れる頻度と消えるまでの時間は10秒ごとに早くなり、ゲームの難易度が上がっていきます。<br><br>
<img width="567" alt="スクリーンショット 2020-06-15 4 36 07" src="https://user-images.githubusercontent.com/52749338/84602358-beb9f300-aec1-11ea-9290-b984b85b94c4.png"><br>
30秒が経つとゲームが終わり、最終スコアが発表されます。最終スコアがパーセンテージなのは、出現するものの種類が毎回ランダムなため、最大スコアが一定ではないためです。<br><br>
余談ですが、製作者の私でも最終スコア100％をとったことは一度しかありません。かなり難易度が高く、何度でも楽しんでいただける作品になっていると思います。
