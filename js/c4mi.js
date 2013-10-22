/*
 * cheat for miphone
 * skip the official wait time
 * @cheat_type {'phone'|'box'|'tv'},default for phone
 */
var cheat_type = 'phone',//cheat for box/phone/tv,default for phone
	cheat_interval = 1000,
	cheat_timer;

//for selling started
if ( !window['hdcontrol'] ) {
	alert('please wait for selling started!');
	return ;
}

//ask for type
if ( window.confirm('what do u want? phone(Ok),other(Cancel)') ) {
	cheat_type = 'phone'
}else if ( window.confirm('box(Ok),tv(Cancel)') ){
	cheat_type = 'box'
}else{
	cheat_type = 'tv'
}

//hook
if (!window['cheat_hdcontrol']) {
	cheat_hdcontrol = hdcontrol;
}

//get hdcontrol source
//hdcontrol.toString().replace(/_\$\[([0-9])+\]/ig,function(src){
//	return '"'+ eval(src) +'"';
//});

//rewrite callback
function hdcontrol(e) {
	//cheat
	isRollStatus=true;
	isPhone=false;
	isBox=false;
	isTv=true;
	if ( cheat_type == 'phone' ) {
		isPhone = true;
		rollProduct = 'phone';
	}else if( cheat_type == 'box' ) {
		isBox = true;
		rollProduct = 'box';
	}else{
		isTv = true;
		rollProduct = 'tv';
	}
	//stop req when in Q
	if (window.cheat_timer) {
		clearInterval(cheat_timer)
	}
	//origin
    var t = e.status,
        n = t.miphone.hdurl,
        i = t.mibox.hdurl,
        a = t.mitv.hdurl,
        o = t.miphone.hdstart === false && t.miphone.hdstop === true ? true : false,
        r = t.mibox.hdstart === false && t.mibox.hdstop === true ? true : false,
        l = t.mitv.hdstart === false && t.mitv.hdstop === true ? true : false,
        s = e.stime + (0x8 - (new Date).getTimezoneOffset() / 0x3c * -0x1) * 0xe10;
    servertime = downServertime = s;
    var c = parseInt(servertime - miphoneBuy.localTime());
    m.cookie("xm_difft_hd", c, {
        path: "/",
        domain: ".xiaomi.com",
        expires: 0x1
    });

    function d(e) {
        if (e == null || e == "") {
            //window.location.reload()
        } else {
            location.href = "http://t.hd.xiaomi.com/s/" + e
        }
    };

    function h(e) {
        m.cookie("xm_xt_prex", e, {
            path: "/",
            domain: ".xiaomi.com",
            expires: 0x1
        })
    };
    if (isRollStatus) {
        if (t.allow) {
            if (isPhone === true) {
                isPhone = false;
                d(n)
            } else if (isBox === true) {
                isBox = false;
                d(i)
            } else if (isTv === true) {
                isTv = false;
                d(a)
            }
        };
        isRollStatus = false
    };
    if (l || o || r) {
        if (window.timeInter) {
            clearInterval(timeInter)
        }
    };
    if (l && rollProduct === "tv" || o && rollProduct === "phone" || r && rollProduct === "box") {
        miphoneBuy.box(false)
    };
    if (l && o && r) {
        h(0x4);
        miphoneBuy.saleOut();
        if (window.endInter) {
            clearInterval(endInter)
        }
    } else if (l && o && !r) {
        h(0x7);
        stepHtml.seven()
    } else if (l && !o && !r) {
        h(0x5);
        stepHtml.five()
    } else if (l && !o && r) {
        h(0x8);
        stepHtml.eight()
    } else if (!l && o && r) {
        h(0x9);
        stepHtml.nine()
    } else if (!l && !o && r) {
        h(0xa);
        stepHtml.ten()
    } else if (!l && o && !r) {
        h(0x6);
        stepHtml.six()
    }
}
//send req
cheat_timer = setInterval(function(){
	miphoneBuy.jsonInter();
}, cheat_interval);

//pop up for dialog
showBox(cheat_type);
