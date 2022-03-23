import {partition} from "./util";
import {AudioMap} from "./types";
import {audioId, fadeValue, nextAudioActions, soundData} from "./helpers";
import {init} from "./init";



let _audioMap: AudioMap | null

export const audioMap: (doneFn?: () => void) => AudioMap = (doneFn)=> {
    if (!_audioMap) {
        console.log("lazy loading");
        _audioMap = init(doneFn)
    }
    return _audioMap;
}



function volumeHandler(e: SlideEvent) {
    const volumeChange = e.currentSlide.getAttribute('data-sounds-volume-change');
    if (!volumeChange)
        return
    const [id, v] = volumeChange?.split(":");
    const volume = parseFloat(v)
    console.log("adjusting volume for",id,"to", volume);
    audioMap()[id].volume(volume)
}

export const soundHandler = (e: SlideEvent) => {
    console.log("handler");


    const currentSoundData = e.previousSlide?.getAttribute('data-sounds');
    const nextSoundData = e.currentSlide.getAttribute("data-sounds");

    const nextSounds = soundData(nextSoundData)
    // @ts-ignore TODO
    const currentSounds = soundData(currentSoundData);

    const [toStop, toStart] = nextAudioActions(currentSounds, nextSounds);
    volumeHandler(e)

    toStop.map(id => {
        if (!audioMap()[id])
            console.error("no invalid audioMap for " + id)
        else
            audioMap()[id].fade(1, 0, fadeValue(e,'fade-out-speed'));
    })
    toStart.map(id => {
        if (!audioMap()[id])
            console.error("no invalid audioMap for " + id)
        else {
            audioMap()[id].stop()
            audioMap()[id].play()
            audioMap()[id].fade(0, 1, fadeValue(e,"fade-in-speed"))
        }
    })

}

