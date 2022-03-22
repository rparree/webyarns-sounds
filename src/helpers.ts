import {AudioId} from "./types";
import {partition} from "./util";

export const soundData = (s: string | null) =>
    s ? s.split(",").map(s => s.trim()) : [];


export const audioId = (s: AudioId): AudioId => (s.startsWith("!") || s.startsWith(">") || s.startsWith("#")) ? s.substring(1) : s;

export const fadeValue = (e: SlideEvent,a: 'fade-out-speed'| "fade-in-speed") => {
    const s = e.currentSlide.getAttribute("data-sounds-" + a) || e.currentSlide.getAttribute(a);
    return s ? parseInt(s, 10) : 1500
}

// State
let persistentAudios: string[] = []
// end State

export const nextAudioActions = (currentSounds: string[], nextSounds: string[]): [string[], string[]] => {
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
