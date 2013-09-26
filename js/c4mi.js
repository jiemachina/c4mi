/*
 * cheat for miphone
 * skip the official wait time
 * @cheat_type {'box'|'phone'},default for phone
 */
var cheat_type = 'phone',//cheat for box/phone,default for phone
	cheat_interval = 1000,
	cheat_timer;

//for selling started
if ( !window['hdcontrol'] ) {
	alert('please wait for selling started!');
	return ;
}

//ask for type
if ( window.confirm('what do u want? phone(Ok),box(Cancll)') ) {
	cheat_type = 'phone'
}else{
	cheat_type = 'box'
}

if (!window['cheat_hdcontrol']) {
	cheat_hdcontrol = hdcontrol;
}

hdcontrol = function(json){
	//true hdcontrol need
	isRollStatus = true;
	isPhone=false;
	isBox=false;
	if ( cheat_type=='box' ) {
		isBox = true;
	}else{
		isPhone = true;
	}
	//stop req when in Q
	if (json.status.allow && (json.status.miphone.hdurl || json.status.mibox.hdurl )) {
		clearInterval(cheat_timer);
	}
	var phonestart = json.status.miphone.hdstart,
		phonestop = json.status.miphone.hdstop,
		boxstart = json.status.mibox.hdstart,
		boxstop = json.status.mibox.hdstop;
	servertime = downServertime = json.stime;
	var diffTime = parseInt(servertime - miphoneBuy.localTime());
	m.cookie("xm_difft_hd", diffTime, {
		path: '/',
		domain: '.xiaomi.com',
		expires: 1
	});
	if (json.status.allow) {
		if (isPhone === true) {
			isPhone === false;
			if (json.status.miphone.hdurl == null || json.status.miphone.hdurl == '') {
				//window.location.reload();
			}
			else {
				location.href = 'http://t.hd.xiaomi.com/s/' + json.status.miphone.hdurl;
			}
		} else if (isBox === true) {
			isBox === false;
			if (json.status.mibox.hdurl == '' || json.status.mibox.hdurl == null) {
				//window.location.reload();
			}
			else {
				location.href = 'http://t.hd.xiaomi.com/s/' + json.status.mibox.hdurl;
			}
		}
	}
	if (phonestart === true && phonestop === false && boxstart === false && boxstop === true) {
		m.cookie("xm_xt_obox", 1, {
			path: '/',
			domain: '.xiaomi.com',
			expires: 1
		});
		m.cookie('xm_xt_ophone', null, {
			path: '/',
			domain: '.xiaomi.com'
		});
		miphoneBuy.box(false);
		stepHtml.five();
	}
	if (phonestart === false && phonestop === true && boxstart === true && boxstop === false) {
		m.cookie("xm_xt_ophone", 1, {
			path: '/',
			domain: '.xiaomi.com',
			expires: 1
		});
		m.cookie('xm_xt_obox', null, {
			path: '/',
			domain: '.xiaomi.com'
		});
		miphoneBuy.box(false);
		stepHtml.six();
	}
	if (phonestart === false && phonestop === true && boxstart === false && boxstop === true) {
		m.cookie("xm_xt_pre", 1, {
			path: '/',
			domain: '.xiaomi.com',
			expires: 1
		});
		m.cookie('xm_xt_obox', null, {
			path: '/',
			domain: '.xiaomi.com'
		});
		m.cookie('xm_xt_ophone', null, {
			path: '/',
			domain: '.xiaomi.com'
		});
		miphoneBuy.saleOut();
	}
}
//send req
cheat_timer = setInterval(function(){
	miphoneBuy.jsonInter();
}, cheat_interval);

//pop up for dialog
showBox(cheat_type);
