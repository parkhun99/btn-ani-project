var audioObj;
var isMuted = false;
var volume=1;
var isHashInit=true;
var win,doc,iframe;
var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
var adoEF;
var cd_no=1;
var chasi;
var chasiList;
var chasiIndex=0;
var previewMode = false;
var audio = './audio/beep.mp3';

window.scale=1;

$(document).ready(function() {
	isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
	// if(isChrome)
	// 	adoExt = 'ogg';

	calcScale();
	$('body')[0].oncontextmenu = function() { return false; };
	
    $('.close_btn').on('click touchstart', function(event) {
        event.preventDefault();
        event.stopPropagation();

		playAudio(audio);
        $('.popups').hide();
		handAni(0);
    });

	$('#smartGuideWrap .smartBtn').on('click', function(event) {
		event.preventDefault(); event.stopPropagation();

		$('.guide').show();
		$('.org_page').removeClass('on');
		$('.pgb').removeClass('on');
		$('.pgb').eq(0).addClass('on');
		$('.org_page').eq(0).addClass('on');
		$('.guide .prev').addClass('on');
		$('.guide .next').removeClass('on');
		handAni(0);
	});

	$('.home_icon').on('click touchstart', function (event) {
		event.preventDefault(); event.stopPropagation();
		
		playAudio(audio);
		$('#poppage').attr('src', $('#poppage').attr('src'));
	});

	hwpBtn();
	guideEvt();


	$('.content_box .tit').on('click touchstart', function (event) {
		event.preventDefault(); event.stopPropagation();
        
        playAudio(audio);
        $('.popups').hide();
	});
	$('.gauge').addClass('loading2').one('animationend', function () {
		$('.intros').removeClass('on');
		$('.head').removeClass('active');
	});
	$('.head').addClass('active');

	$('.sound_off').on('click touchstart', function (event) {
		event.preventDefault(); event.stopPropagation();

		$(this).addClass('on');
		$('.sound_on').removeClass('on');

		$('audio').each(function() {
			this.volume = 0; // 오디오 볼륨을 0으로 설정 (무음)
		});
	});
	$('.sound_on').on('click touchstart', function (event) {
		event.preventDefault(); event.stopPropagation();

		$(this).addClass('on');
		$('.sound_off').removeClass('on');
	});

	$('.out_section').on('click touchstart', function (event) {
		event.preventDefault(); event.stopPropagation();

		playAudio(audio);
		window.close();
	});
	$('.back_icon').on('click touchstart', function (event) {
		event.preventDefault(); event.stopPropagation();

		window.close();
	});
});

window.onload = function() {
	//initPage();
	calcScale();
};

window.addEventListener('resize', calcScale, true);

function calcScale() {
	var bw = 1920;
	var bh = 1080;
	var sw = $(window).width()/bw;
	var sh = $(window).height()/bh;
	// sw = sw>bw || sw>1?1:sw;
	// sh = sh>bh || sh>1?1:sh;
	window.scale = sw>sh?sh:sw;

	var tx = ($(window).width() - $('#container').width()*window.scale)/2/window.scale;
	var ty = ($(window).height() - $('#container').height()*window.scale)/2/window.scale;

	$('#container').css({
		'scale':window.scale,
		x:tx, y:ty,
		transformOrigin:'0% 0%'
	});
}

function guideEvt() {
	$('<div class="pageSlide"><div class="prev on"></div><div class="pgs"></div><div class="next"></div></div>').appendTo($('.guide'));
	$('.org_page').each(function(idx,obj) {
		pg = $('<div class="pgb"></div>').appendTo('.guide .pgs');
		pg[0].idx = idx;
		if(idx == 0) {
			$(pg).addClass('on');
		}
	});

	$('.guide .pgb').on('click', function(event) {
		event.preventDefault(); event.stopPropagation();

		if(!$(this).hasClass('on')) {
			handAni($(this).index());
		}
		$('.org_page').removeClass('on');
		$('.org_page').eq($(this)[0].idx).addClass('on');
		$('.guide .pgb').removeClass('on');
		$(this).addClass('on');
		$('.guide .prev').removeClass('on');
		$('.guide .next').removeClass('on');
		if($(this).index() == 0) {
			$('.guide .prev').addClass('on');
		}else if($(this).index() == $('.org_page').length-1) {
			$('.guide .next').addClass('on');
		}
	});

	$('.guide .prev').on('click', function(event) {
		event.preventDefault(); event.stopPropagation();

		playAudio(audio);
		var helper = $('.pgb.on');

		$('.guide .next').removeClass('on');
		if(helper.prev().length > 0) {
			helper.removeClass('on');
			helper.prev().addClass('on');
			$('.org_page').removeClass('on');
			$('.org_page').eq(helper.prev().index()).addClass('on');
			handAni(helper.prev().index());
			if(helper.prev().index() == 0) {
				$(this).addClass('on');
			}
		}
	});
	
	$('.guide .next').on('click', function(event) {
		event.preventDefault(); event.stopPropagation();
		
		playAudio(audio);
		var helper = $('.pgb.on');

		$('.guide .prev').removeClass('on');
		if(helper.next().length > 0) {
			helper.removeClass('on');
			helper.next().addClass('on');
			$('.org_page').removeClass('on');
			$('.org_page').eq(helper.next().index()).addClass('on');
			handAni(helper.next().index());
			if(helper.next().index()+1 == $('.org_page').length) {
				$(this).addClass('on');
			}
		}
	});

	$('.guide').on('click touchstart', handleGuideClick);
	function handleGuideClick(event) {
	    event.preventDefault();
	    event.stopPropagation();

	    var helper = $('.pgb.on');
	    $('.guide .prev').removeClass('on');

	    if (helper.next().length > 0) {
	        helper.removeClass('on');
	        helper.next().addClass('on');
	        $('.org_page').removeClass('on');
	        $('.org_page').eq(helper.next().index()).addClass('on');
	        handAni(helper.next().index());
	        if (helper.next().index() + 1 == $('.org_page').length) {
	            $('.guide .next').addClass('on');
	        }
	    }
	    if ($('.guide .next').hasClass('on')) {
	        $('.guide').off('click touchstart', handleGuideClick);
	        $('.guide').on('click touchstart', handleFinalGuideClick);
	    }
	}

	function handleFinalGuideClick(event) {
	    event.preventDefault();
	    event.stopPropagation();

	    $('.guide').hide();
	    $('.guide .ani').removeClass('ani');
	    $('.guide').off('click touchstart', handleFinalGuideClick);
	}


	$('.guide .close').on('click', function(event) {
		event.preventDefault(); event.stopPropagation();

		playAudio(audio);
		$('.guide').hide();
		$('.guide .ani').removeClass('ani');
	});
}

function handAni(idx) {
	$('.org_page .ani').removeClass('ani');
	$('.org_page .hand').removeAttr('style');
	if(idx == 0) {
		$('.page1 .hand').addClass('ani');
		$('.page1 .obj').addClass('ani');
		$('.page1 .obj2').addClass('ani');
		$('.page1 .obj3').addClass('ani');
		$('.page1 .hand').addClass('moving');
		// $('.page1 .txt').addClass('ani');
	}else if(idx == 1) {
		$('.page2 .obj').addClass('ani');
		$('.page2 .obj2').addClass('ani');
	}
}

function hwpBtn() {
	$('#smartLessonWrap .smartBtn').on('touchstart click', function(event) {
		event.preventDefault(); event.stopPropagation();

		var path = $(this).attr('data-hwp');
		if (top.ezviewer == undefined) {
			path = getFolderPath(top.location.href) + "/" + path;
			download_files([path]);
		} else {
			path = path.replace("/", "\\");
			console.log("#path:\\Documents\\" + path);
		}
		// messageBox(path);
	});

	$('#smartOrgWrap .smartBtn').on('touchstart click', function(event) {
		event.preventDefault(); event.stopPropagation();

		var path = $(this).attr('data-hwp');
		if (top.ezviewer == undefined) {
			path = getFolderPath(top.location.href) + "/" + path;
			download_files([path]);
		} else {
			path = path.replace("/", "\\");
			console.log("#path:\\Documents\\" + path);
		}
		// messageBox(path);
	});
}

function messageBox(this2) {
	$('.messageBox').show();

	$('.messageBox .close').on('touchstart click', function(event) {
		event.preventDefault(); event.stopPropagation();

		$('.messageBox').hide();
	});

	$('.messageBox .openBtn').on('touchstart click', function(event) {
		event.preventDefault(); event.stopPropagation();

	});

	$('.messageBox .downBtn').on('touchstart click', function(event) {
		event.preventDefault(); event.stopPropagation();

	});
}

function getFolderPath(path) {
    var pos = path.lastIndexOf("/");
    if (pos > -1) {
        return path.substr(0, pos);
    }

    return path;
}

function download_files(files) {
    function download_next(i) {
        if (i >= files.length) {
            return;
        }
        var a = document.createElement("a");
        //   a.href = files[i].download;
        a.href = files[i];
        a.target = "_parent";
        // Use a.download if available, it prevents plugins from opening.
        if ("download" in a) {
            a.download = getFileName(files[i]);
        }
        // Add a to the doc for click to work.
        (document.body || document.documentElement).appendChild(a);
        if (a.click) {
            a.click(); // The click method is supported by most browsers.
        } else {
            $(a).click(); // Backup using jquery
        }
        // Delete the temporary link.
        a.parentNode.removeChild(a);
        // Download the next file with a small timeout. The timeout is necessary
        // for IE, which will otherwise only download the first file.
        setTimeout(function () {
            download_next(i + 1);
        }, 500);
    }
    // Initiate the first download.
    download_next(0);
}

function getFileName(path) {
    var pos = path.lastIndexOf("/");
    if (pos > -1) {
        return path.substr(pos + 1);
    }

    return path;
}

function playAudio(audio) {
	var ado = new Audio(audio);
	ado.play().catch(function (err) {
	  console.log(err);
	});
}

function introPage() {
	
}