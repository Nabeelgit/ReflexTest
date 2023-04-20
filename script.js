const text = document.getElementById('text');
const svgs = {
    check: document.getElementById('check_icon'),
    x: document.getElementById('x_icon'),
    clock: document.getElementById('clock_icon')
}
let wait_for_change = null;
let wait_for_click = null;
let milliseconds = 0;
let phase = 'start';
document.body.addEventListener('click', function(){
    if(phase === 'start' || phase === 'again') {
        svgs.x.style.display = 'none';
        svgs.check.style.display = 'none';
        svgs.clock.style.display = 'inline';
        milliseconds = 0;
        document.body.style.backgroundColor = 'black';
        text.innerText = 'Click when the color changes to Green';
        phase = 'wait';
        wait_for_change = setTimeout(function(){
            wait_for_click = setInterval(function(){
                document.body.style.backgroundColor = '#1faf32';
                text.innerText = 'Click!';
                phase = 'click';
                milliseconds += 1;
            }, 1)
        }, Math.random() * 3000 + 1000);
    } else if(phase === 'wait'){
        if(wait_for_change !== null){
            if(wait_for_click !== null){
                clearInterval(wait_for_click);
            }
            clearTimeout(wait_for_change);
            wait_for_click = null;
            wait_for_change = null;
            svgs.clock.style.display = 'none';
            svgs.x.style.display = 'inline';
            document.body.style.backgroundColor = '#c72222';
            text.innerText = 'You clicked too early! Click to try again';
            phase = 'again'
        }
    } else if(phase === 'click'){
        if(wait_for_click !== null && wait_for_change !== null){
            clearInterval(wait_for_click);
            clearTimeout(wait_for_change);
            wait_for_click = null;
            wait_for_change = null;
            svgs.clock.style.display = 'none';
            svgs.check.style.display = 'inline';
            text.innerText = milliseconds + ' ms! Click anywhere to retry';
            document.body.style.backgroundColor = '#1faf32';
            phase = 'again';
        }
    }
})