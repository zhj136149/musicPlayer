	var lastPercentage=0;
	var alltime;
	var percentage;
	var curDuration;
	var frameId;
	var curTime;
	var render;
(function(root,song,index){
	render={
	renderInfo:function (){
		var a=song[index];
		var html1='<div class="main-info">'+
							"<p>"+
								'<span class="music-name">'+a.song+'</span>'+
								'<span class="label">'+a.label1+'</span>'+
								'<span class="label">'+a.label2+'</span>'+
							'</p>'+
							'<p> <span class="srouce">'+a.description+'</span></p>'+
							'<p>'+ 
								'<span>专辑：</span><a href="#">'+a.album+'</a>'+
								'<span>歌手：</span><a href="#">'+a.singer+'</a>'+
								'<span>来源：</span><a href="#">'+a.srouce+'</a>'+
							'</p>'+
						'</div>'+
						'<div class="music-text">'+
							'<div class="text-warpper">'+ a.lyrics+'</div>'+
						"</div>";
		 alltime=formatTime(song[index].duration);
		 curDuration=song[index].duration;
		$('.allTime').text(alltime);
		$('.music-info')[0].innerHTML=html1;
	},
	renderImage:function (){
		   var a=song[index];
			$('.music-round .round .round-image img').attr("src",a.image);
			// $('.main-body .main-top').css("background","red");
			// var bodyImg=$('.main-top')[0];
			// console.log(bodyImg);
		 	// root.blurImg(a.image,body);
		 //   	img.src=a.image;
	},
	formatTime:function (time){
		time=Math.round(time);
		var minute=Math.floor(time/60);
		var second=time-minute*60;
		if (minute<10) {
			minute="0"+minute;
		}
		if(second<10){
			second="0"+second;
		}
		return minute+":"+second;
	},
	progress:function(percentage){
		var percent=(percentage-1)*100+"%";
		$('.footer .foot-timeBar .timeBar-warpper .top-timeBar').css({"transform":"translateX("+percent+")"});
	},
	updata:function(percentage){
		var curTime=formatTime(percentage*curDuration);
		$('.nowTime').text(curTime);
	},
	startTime:function(){
		var starttime=new Date().getTime();
		function frame(){
			var currenttime= new Date().getTime();
			percentage=lastPercentage+(currenttime - starttime)/(curDuration*1000);
			if(percentage<1){
				// console.log(percentage);
				updata(percentage);
				frameId= requestAnimationFrame(frame);
			}else{
				cancelAnimationFrame(frameId);
			}
			progress(percentage);
		}
		frame();
	},
	stopTime:function(){
		curTime=new Date().getTime();
		lastPercentage=lastPercentage+(currenttime - starttime)/(curDuration*1000);
		cancelAnimationFrame(frameId);
	}
	}
	render.renderInfo();
	render.renderImage();
	render.startTime();
	}
	root.render=render()
})(root,song,index)