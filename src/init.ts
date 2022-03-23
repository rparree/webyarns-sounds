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
    const dataKeys = Object.keys(data);
    return dataKeys.reduce((acc, id) => {
        const howl = new Howl({
            src: data[id].src,
            // html5: true,
            // pool: dataKeys.length,
            loop: Boolean(data[id].loop),
            onplayerror: function () {
                console.log("error");
                howl.once('unlock', function () {
                    howl.play();
                });
            }
        });


        howl.on("fade", (n) => {
            if (howl.volume() === 0) {
                console.log("stopping");
                howl.stop(n);
            }
        });
        return Object.assign(acc, {
            [id]: howl
        });
    }, {})

}
