import cons from './constant';

export default {
	getParam:function(key){
		var reg = new RegExp("(^|&)"+ key +"=([^&]*)(&|$)");
    	var r = window.location.search.substr(1).match(reg);
    	if(r!=null)return  decodeURI(r[2]); return null;
	},
	cookie:{
		set: function (name, value, days) {
		    var d = new Date;
		    d.setTime(d.getTime() + 60*1000);
		    window.document.cookie = name + "=" + value + ";path=/;expires=" + d.toGMTString();
		},
		setMin: function (name,value,minute) {
			var d = new Date;
			d.setTime(d.getTime() + 1000*60*minute);
			window.document.cookie = name + "=" + value + ";path=/;expires=" + d.toGMTString();
		},
		get: function (name) {
		    var v = window.document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
		    return v ? v[2] : null;
		},
		delete: function (name) {
		    this.set(name, '', -1);
		}
	},
	getCurrentActivityInfo:function(){
		var info={
			area:'',
			status:cons.STATUS.SIGN
		}
		var curTime = (new Date()).getTime();
		for(var i in cons.timeLine){
			var signStamp = (new Date(cons.timeLine[i].start)).getTime();
			var activeStamp = (new Date(cons.timeLine[i].active)).getTime();
			var overStamp = (new Date(cons.timeLine[i].over)).getTime();
			if(curTime>=signStamp&&curTime<activeStamp){
				info.area=cons.timeLine[i].area;
				info.status=cons.STATUS.SIGN;
				return info;
			}
			else if(curTime>=activeStamp&&curTime<overStamp){
				info.area=cons.timeLine[i].area;
				info.status=cons.STATUS.ACTIVE;
				return info;
			}
			// else{
			// 	info.area=cons.timeLine[i].area;
			// 	info.status=cons.STATUS.END;
			// 	return info;
			// }
		}
	}
}
