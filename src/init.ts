import {SoundData} from "./types";
import {Howl} from "howler";


const completionHelper = (total: number, doneFn?: () => void,) => {
    let counter = 0;
    return function (p: any) {
        counter++
        if (counter == total) {
            console.log("done")
            if (doneFn) doneFn()
        }
    }
}

export function init(doneFn?: () => void) {
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
    const count = dataKeys.length
    const completionTrigger = completionHelper(count, doneFn)
    return dataKeys.reduce((acc, id) => {
        const howl = new Howl({
            src: data[id].src,
            loop: Boolean(data[id].loop),
            onplayerror: function () {
                console.log("error");
                howl.once('unlock', function () {
                    howl.play();
                });
            },
            onload: completionTrigger,
            onloaderror: completionTrigger
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
