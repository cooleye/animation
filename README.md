#animation

这时一个使用js做的一个帧动库。😊
原理：使用定时器不断修改div元素，background-image 的 background-position

使用方法：
  1、在页面引入 <script type="text/javascript" src="js/FramesAnimation.js" ></script>
  
  2、创建一个 Animation对象
  var ani = new Animation({
				'container':'actionContainer',	//动画元素外层元素（***必须）
				'id':'bomb',					//动画元素id（***必须）
				'jsonurl':'img/bomb/bomb.json', //动画json文件（***必须）
				'texture':'img/bomb/bomb.png',  //动画贴图（***必须）
				'loop':false, 					//是否循环播放（可选）
				'isremove':false,				//播放完毕是否从父元素移除（可选）
				'speed':100 ,					//播放速度（可选）
				'scale':{x:2,y:2}, 				//缩放（可选）
				'position':{x:100,y:200}		//位置，使用绝地定位（可选）
			});
			
	3、播放动画
	ani.play(false); // 参数可选，布尔值，表示是否loop
	
	4、通过 ani.getInstance() 来返回 html元素，此元素即是动画帖图所在的div元素。
