    let playing = false;
let play = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M4 4l12 6-12 6z"/></svg>`;
let pause = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M5 4h3v12H5V4zm7 0h3v12h-3V4z"/></svg>`;
setTimeout(() => {
    $('#play-pause-button').html(play);
    document.getElementById('play-pause-button').addEventListener('click', function () {
        if (!playing) {
            playing = true;
            $('#play-pause-button').html(pause)
        } else {
            playing = false;
            $('#play-pause-button').html(play);
        }
    });
}, 250);