import {SoundData} from "./types";
import {Howl} from "howler";

export function init() {
    console.log("initialing audio-map");
    const loadData = (): SoundData => {
        const elementById = document.getElementById('sounds');
        if (elementById == null) {
            console.error('Cannot find <script id="sounds" type="application/json">')
            return {}
        } else
            return JSON.parse(elementById.innerHTML);
    }


    const data: SoundData = loadData()
    return Object.keys(data).reduce((acc, id) => {
        const howl = new Howl({
            src: data[id].src,
            html5: true,
            autoplay: false,
            loop: Boolean(data[id].loop),
            // howl: null,
            onplayerror: function () {
                console.log("error");
                howl.once('unlock', function () {
                    howl.play();
                });
            }
        });


        howl.on("fade", (n) => {
            if (howl.volume() === 0) {
                howl.stop(n);
            }
        });
        return Object.assign(acc, {
            [id]: howl
        });
    }, {})

}
