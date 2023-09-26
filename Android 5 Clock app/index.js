// -------------Slider -------------
var tabs = document.querySelectorAll('.tab');
var alarm_tab = tabs[0];
var clock_tab = tabs[1];
var timer_tab = tabs[2];
var stopwatch_tab = tabs[3];
var nav_btns = document.querySelectorAll('.nav .fa');
var change_tab_css = {
    'show': {
        'visibility': 'visible',
        'transform': 'translate(0%, 0%)',
        'opacity': '1',
        'z-index': '9'
    },
    'hide': {
        'visibility': 'hidden',
        'opacity': '0',
        'transform': 'translate(-100%, 0%)',
        'z-index': '1'
    }
}
nav_btns.forEach(function (slide_btn) {
    slide_btn.onclick = () => {
        if (slide_btn.classList.contains('fa-bell')) {
            console.log('Alarm');
            Object.assign(alarm_tab.style, change_tab_css.show);
            Object.assign(clock_tab.style, change_tab_css.hide);
            Object.assign(timer_tab.style, change_tab_css.hide);
            Object.assign(stopwatch_tab.style, change_tab_css.hide);
            document.querySelector('.container').style.background = 'grey';
        }
        else if (slide_btn.classList.contains('fa-clock-o')) {
            console.log('Clock');
            Object.assign(alarm_tab.style, change_tab_css.hide);
            Object.assign(clock_tab.style, change_tab_css.show);
            Object.assign(timer_tab.style, change_tab_css.hide);
            Object.assign(stopwatch_tab.style, change_tab_css.hide);
            document.querySelector('.container').style.background = '#a9a9a9';
        }
        else if (slide_btn.classList.contains('fa-home')) {
            console.log('Timer');
            Object.assign(alarm_tab.style, change_tab_css.hide);
            Object.assign(clock_tab.style, change_tab_css.hide);
            Object.assign(timer_tab.style, change_tab_css.show);
            Object.assign(stopwatch_tab.style, change_tab_css.hide);
            document.querySelector('.container').style.background = '#bc8f93';
        }
        else if (slide_btn.classList.contains('fa-stop-circle-o')) {
            console.log('Stopwatch');
            Object.assign(alarm_tab.style, change_tab_css.hide);
            Object.assign(clock_tab.style, change_tab_css.hide);
            Object.assign(timer_tab.style, change_tab_css.hide);
            Object.assign(stopwatch_tab.style, change_tab_css.show);
            document.querySelector('.container').style.background = '#535051';
        }
    }
})

var bg_colors = ['#40a7d6', '#a9a9a9', '#bc8f93', '#535051'];
color_count = 0;
setInterval(() => {
    if(color_count == bg_colors.length -1){
        color_count = 0; 
    }
    else{
        color_count ++;
    }
    document.querySelector('.container').style.background = bg_colors[color_count];
}, 1000 * 60)

// -----------Clock --------------
var hour;
var minute;
var second;
var year;
setInterval(() => {
    var time = new Date();
    hour = time.getHours();
    minute = time.getMinutes();
    second = time.getSeconds();
    document.querySelector('.time_hour').innerHTML = hour;
    document.querySelector('.time_minute').innerHTML = minute;
    document.querySelector('.time_sec').innerHTML = second;
}, 1000);

const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
setInterval(() => {
    var date = new Date();
    year = date.toLocaleDateString(undefined, options);
    document.querySelector('.time_year').innerHTML = year;
}, 2000)

// ---------- Timer --------------
var box = document.querySelectorAll('.box');
var min_count = 0;
var sec_count = 0;
var milli_sec_count = 0;
start_val = 0;
var min_interval = 0;
var sec_interval = 0;
var milli_sec_interval = 0;

function start_timer() {
    min_interval = setInterval(() => {
        if (min_count == 60) {
            min_count = 0;
            min_count++;
        }
        else {
            min_count++;
        }
        box[0].innerHTML = min_count;
    }, 1000 * 60);
    sec_interval = setInterval(() => {
        if (sec_count == 60) {
            sec_count = 0;
            sec_count++;
        }
        else {
            sec_count++;
        }
        box[1].innerHTML = sec_count;
    }, 1000);
    milli_sec_interval = setInterval(() => {
        if (milli_sec_count == 100) {
            milli_sec_count = 0;
            milli_sec_count++;
        }
        else {
            milli_sec_count++;
        }
        box[2].innerHTML = milli_sec_count;
    }, 1);
}
function start_pause() {
    var start_btn = document.querySelector('.start_pause_btn');
    if (start_val == 0) {
        start_btn.innerHTML = '<i class="fa fa-pause"></i>';
        document.querySelector('.reset_btn').disabled = false;
        start_val = 1;
        start_timer();
    } else {
        start_btn.innerHTML = '<i class="fa fa-play"></i>';
        // document.querySelector('.reset_btn').disabled = true;
        start_val = 0;
        clearInterval(min_interval);
        clearInterval(sec_interval);
        clearInterval(milli_sec_interval);
    }
}
function reset_timer() {
    min_count = 0;
    sec_count = 0;
    milli_sec_count = 0;
    start_val = 0;
    box[0].innerHTML = '00';
    box[1].innerHTML = '00';
    box[2].innerHTML = '00';
    clearInterval(min_interval);
    clearInterval(sec_interval);
    clearInterval(milli_sec_interval);
    document.querySelector('.reset_btn').disabled = true;
    document.querySelector('.start_pause_btn').innerHTML = '<i class="fa fa-play"></i>';
}
