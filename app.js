const music = new Audio('1.mp3');



const songs = [
    {
        id: '1',
        songName: ` Sanu Kehndi <br>
        <div class="subtitle">Romy ,Brijesh Sandilya</div>`,
        poster: "1.jpg"
    },
    {
        id: '2',
        songName: ` Jeeya Mar Ke Tum Mile Dil Khile <br>
        <div class="subtitle">Parichay, Jonita Gandhi</div>`,
        poster: "2.jpg"
    },

    {
        id: "3",
        songName: `Enni Soni <br>
        <div class="subtitle">Guru Randhawa, Tulsi Kumar</div>`,
        poster: "3.jpg",
    },
    {
        id: "4",
        songName: `Call Aundi Hain <br><div class="subtitle">Yo Yo Honey Singh</div>`,
        poster: "4.jpg",
    },
    {
        id: "5",
        songName: `Aashiqan de seene<br>
        <div class="subtitle">Flint j</div>`,
        poster: "5.jpg",
    },
    {
        id: "6",
        songName: `Ve akhiyan ne tadap rahiyan <br><div class="subtitle">Garry Sandhu</div>`,
        poster: "6.jpg",
    },
    {
        id: "7",
        songName: `Kaise jiyunga Kaise <br><div class="subtitle">Atif Aaslam/div>`,
        poster: "7.jpg",
    },
    {
        id: "8",
        songName: `Baitha kinni door main <br><div class="subtitle">AYUSHMANN KHURRANA</div>`,
        poster: "8.jpg",
    },
    {
        id: "9",
        songName: `Agar Tum Saath Ho <br><div class="subtitle">Alka Yagnik, Arijit Singh</div>`,
        poster: "9.jpg",
    },
    {
        id: "10",
        songName: `Vande Mataram <br><div class="subtitle">Bankim Chandra Chatterjee</div>`,
        poster: "10.jpg",
    },
    {
        id: "11",
        songName: `Milegi Milegi <br><div class="subtitle">Mika Singh , Sachin Jigar 3D</div>`,
        poster: "11.jpg",
    },
    {
        id: "12",
        songName: `Bichde Kisi Da Na Yaar <br><div class="subtitle">Samrat Sarkar</div>`,
        poster: "12.jpg",
    },
    {
        id: "13",
        songName: `Baarishein <br><div class="subtitle">Atif Aslam</div>`,
        poster: "13.jpg",
    },
    {
        id: "14",
        songName: `Dilbar <br><div class="subtitle"> Neha Kakkar,Dhvani Bhanushali </div>`,
        poster: "14.jpg",
    },
    {
        id: "15",
        songName: `Main-Bhola-Parbat-Ka-Re <br><div class="subtitle"> KAKA </div>`,
        poster: "15.jpg",
    },
]

Array.from(document.getElementsByClassName('songItem')).forEach((element, i) => {
    element.getElementsByTagName('img')[0].src = songs[i].poster;
    element.getElementsByTagName('h5')[0].innerHTML = songs[i].songName;
})


let masterPlay = document.getElementById('masterPlay');
let wave = document.getElementsByClassName('wave')[0];

masterPlay.addEventListener('click', () => {
    if (music.paused || music.currentTime <= 0) {
        music.play();
        masterPlay.classList.remove('bi-play-fill');
        masterPlay.classList.add('bi-pause-fill');
        wave.classList.add('active2');
    } else {
        music.pause();
        masterPlay.classList.add('bi-play-fill');
        masterPlay.classList.remove('bi-pause-fill');
        wave.classList.remove('active2');
    }
})


const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('playListPlay')).forEach((element) => {
        element.classList.add('bi-play-circle-fill');
        element.classList.remove('bi-pause-circle-fill');
    })
}
const makeAllBackgrounds = () => {
    Array.from(document.getElementsByClassName('songItem')).forEach((element) => {
        element.style.background = "rgb(105, 105, 170, 0)";
    })
}

let index = 0;
let poster_master_play = document.getElementById('poster_master_play');
let title = document.getElementById('title');
Array.from(document.getElementsByClassName('playListPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        index = e.target.id;
        makeAllPlays();
        e.target.classList.remove('bi-play-circle-fill');
        e.target.classList.add('bi-pause-circle-fill');
        music.src = `${index}.mp3`;
        poster_master_play.src = `${index}.jpg`;
        music.play();
        let song_title = songs.filter((ele) => {
            return ele.id == index;
        })

        song_title.forEach(ele => {
            let { songName } = ele;
            title.innerHTML = songName;
        })
        masterPlay.classList.remove('bi-play-fill');
        masterPlay.classList.add('bi-pause-fill');
        wave.classList.add('active2');
        music.addEventListener('ended', () => {
            masterPlay.classList.add('bi-play-fill');
            masterPlay.classList.remove('bi-pause-fill');
            wave.classList.remove('active2');
        })
        makeAllBackgrounds();
        Array.from(document.getElementsByClassName('songItem'))[`${index - 1}`].style.background = "rgb(105, 105, 170, .1)";
    })
})


let currentStart = document.getElementById('currentStart');
let currentEnd = document.getElementById('currentEnd');
let seek = document.getElementById('seek');
let bar2 = document.getElementById('bar2');
let dot = document.getElementsByClassName('dot')[0];

music.addEventListener('timeupdate', () => {
    let music_curr = music.currentTime;
    let music_dur = music.duration;

    let min = Math.floor(music_dur / 60);
    let sec = Math.floor(music_dur % 60);
    if (sec < 10) {
        sec = `0${sec}`
    }
    currentEnd.innerText = `${min}:${sec}`;

    let min1 = Math.floor(music_curr / 60);
    let sec1 = Math.floor(music_curr % 60);
    if (sec1 < 10) {
        sec1 = `0${sec1}`
    }
    currentStart.innerText = `${min1}:${sec1}`;

    let progressbar = parseInt((music.currentTime / music.duration) * 100);
    seek.value = progressbar;
    let seekbar = seek.value;
    bar2.style.width = `${seekbar}%`;
    dot.style.left = `${seekbar}%`;
})

seek.addEventListener('change', () => {
    music.currentTime = seek.value * music.duration / 100;
})

music.addEventListener('ended', () => {
    masterPlay.classList.add('bi-play-fill');
    masterPlay.classList.remove('bi-pause-fill');
    wave.classList.remove('active2');
})


let back = document.getElementById('back');
let next = document.getElementById('next');

back.addEventListener('click', () => {
    index -= 1;
    if (index < 1) {
        index = Array.from(document.getElementsByClassName('songItem')).length;
    }
    music.src = `${index}.mp3`;
    poster_master_play.src = `${index}.jpg`;
    music.play();
    let song_title = songs.filter((ele) => {
        return ele.id == index;
    })

    song_title.forEach(ele => {
        let { songName } = ele;
        title.innerHTML = songName;
    })
    makeAllPlays()

    document.getElementById(`${index}`).classList.remove('bi-play-fill');
    document.getElementById(`${index}`).classList.add('bi-pause-fill');
    makeAllBackgrounds();
    Array.from(document.getElementsByClassName('songItem'))[`${index-1}`].style.background = "rgb(105, 105, 170, .1)";
})
next.addEventListener('click', () => {
    index -= 0;
    index += 1;
    if (index > Array.from(document.getElementsByClassName('songItem')).length) {
        index = 1;
    }
    music.src = `${index}.mp3`;   //audio
    poster_master_play.src = `${index}.jpg`;
    music.play();
    let song_title = songs.filter((ele) => {
        return ele.id == index;
    })

    song_title.forEach(ele => {
        let { songName } = ele;
        title.innerHTML = songName;
    })
    makeAllPlays()

    document.getElementById(`${index}`).classList.remove('bi-play-fill');
    document.getElementById(`${index}`).classList.add('bi-pause-fill');
    makeAllBackgrounds();
    Array.from(document.getElementsByClassName('songItem'))[`${index - 1}`].style.background = "rgb(105, 105, 170, .1)";

})

// Scroll left and right

let left_scroll = document.getElementById('left_scroll');
let right_scroll = document.getElementById('right_scroll');
let pop_song = document.getElementsByClassName('pop_song')[0];

left_scroll.addEventListener('click', () => {
    pop_song.scrollLeft -= 330;
})
right_scroll.addEventListener('click', () => {
    pop_song.scrollLeft += 330;
})

let left_scrolls = document.getElementById('pop_song_left');
let right_scrolls = document.getElementById('pop_song_right');
let item = document.getElementsByClassName('item')[0];

left_scrolls.addEventListener('click', ()=>{
    item.scrollLeft -= 330;
})
right_scrolls.addEventListener('click', ()=>{
    item.scrollLeft += 330;
})