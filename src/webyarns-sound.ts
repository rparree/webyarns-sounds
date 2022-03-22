import {partition} from "./util";
import {AudioMap} from "./types";
import {audioId, fadeValue, soundData} from "./helpers";
import {init} from "./init";

// State
let persistentAudios: string[] = []
// end State

let _audioMap: AudioMap | null

export const audioMap: () => AudioMap = ()=> {
    if (!_audioMap) {
        console.log("lazy loading");
        _audioMap = init()
    }
    return _audioMap;
}


const nextAudioActions = (currentSounds: string[], nextSounds: string[]): [string[], string[]] => {
    const [toRestart, nextToStartIds]: [string[], string[]] = partition(nextSounds, e => e.startsWith("!"));

    const persistentToStop = nextToStartIds.filter(e => e.startsWith("#")).map(audioId);
    const persistentStart = nextToStartIds.filter(e => e.startsWith(">")).map(audioId);
    persistentAudios = [...persistentAudios, ...persistentStart] // add to global state

    const currentSoundIds = currentSounds.map(audioId);
    const nextSoundsIds = nextSounds.map(audioId);
    const toRestartIds = toRestart.map(audioId);
    const toStop = [
        ...currentSoundIds
            .filter(e => !nextToStartIds.includes(e)) // remove the ones that carry over
            .filter(e => !toRestartIds.includes(e)) // remove the ones that need restarting
            .filter(e => persistentAudios.indexOf(e) === -1),
        ...persistentToStop]
    const toStart = [
        ...nextSoundsIds
            .filter(e => !currentSoundIds.includes(e)) // add new ones not carried over
            .filter(e => !persistentToStop.includes(e)), // remove the ones intended to stop
        ...toRestartIds, // add the ones that need restarted
    ]
    console.log("toStop:", toStop, "toStart", toStart)
    return [toStop, toStart]
}

function volumeHandler(e: SlideEvent) {
    const volumeChange = e.currentSlide.getAttribute('data-sounds-volume-change');
    if (!volumeChange)
        return
    const [id, v] = volumeChange?.split(":");
    const volume = parseFloat(v)
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
    console.log(toStop, toStart);
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

