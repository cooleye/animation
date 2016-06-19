/*
 * @author：kongdejian
 * @date:2016.06.19
 * 
 * */

var Animation = (function($){
				
			var Animation = function(options){
				
				var defaults = {
					'container':'actionContainer',//动画元素外层元素
					'id':'bomb',	//动画元素id
					'jsonurl':'img/bomb/bomb.json',//动画json文件
					'texture':'img/bomb/bomb.png',//动画贴图
					'loop':false, //是否循环播放
					'isremove':false,//播放完毕是否从父元素移除
					'speed':5 ,// 默认是8,越小越快
					'AniFrames':[],
					'width':100,
					'height':100,
					'scale':{x:1,y:1},
					'position':{x:0,y:0}
				};
				
				this.opts = $.extend(true,{}, defaults , options||{});
				
				var self = this;
				
				(function(){

					$.getJSON(self.opts.jsonurl,function(data){
						
						if($("#"+self.opts.id).length <= 0){
							var div = document.createElement('div');
							$(div).attr('id',self.opts.id);
							$('#'+self.opts.container+'').append(div);
						}
						
						$(div).css({
							'background-image':'url('+self.opts.texture+')',
							'position':'absolute',
							'-moz-transform':'scale('+self.opts.scale.x+','+self.opts.scale.y+')', 
							'-webkit-transform':'scale('+self.opts.scale.x+','+self.opts.scale.y+')', 
							'-o-transform':'scale('+self.opts.scale.x+','+self.opts.scale.y+')',
							'transform':'scale('+self.opts.scale.x+','+self.opts.scale.y+')',
							'left':self.opts.position.x+'px',
							'top':self.opts.position.y+'px'
						});
	
						var frames = data.frames;	
						for(frame in  frames){
							var k = frame;
							var v = frames[k];
							self.opts.AniFrames.push(v);						
						};		

					})
			
				})()
				
			};
			
	
			Animation.prototype.play = function(loop){
				
				var actionTimer=null;
				
				window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
				
				var self = this;
				
				var AniFrames = this.opts.AniFrames;
				
				if(AniFrames.length > 0){
						
						cancelAnimationFrame(actionTimer);
						
						$("#" + this.opts.id).show();
						
						var l = AniFrames.length;
						var i = 0;
						
						var speed = this.opts.speed;

						actionTimer = requestAnimationFrame(step);
						
						function step(){
							
							if(speed <=0){
								speed = self.opts.speed;
								
								$("#" + self.opts.id).css({
									'background-position': (AniFrames[i].x)*-1 + 'px '+(AniFrames[i].y)*-1+'px',
									'width': (AniFrames[i].w)+'px',
									'height':(AniFrames[i].h)+'px',
								});
								if(i < l-1){
									i++;
								}else{
									if(loop){
										i = 0;
									}else{							
										cancelAnimationFrame(actionTimer)
										
										if(self.opts.isremove){
											$("#" + self.opts.container).remove();
										}else{
											$("#" + self.opts.id).hide();
										}
									}
								}	
							
							}
								
							speed--;
							
							actionTimer = requestAnimationFrame(step);
						}
					}
			}
			
	return Animation;
	
})(jQuery)
