import {AudioId} from "./types";

export const soundData = (s: string | null) =>
    s ? s.split(",").map(s => s.trim()) : [];


export const audioId = (s: AudioId): AudioId => (s.startsWith("!") || s.startsWith(">") || s.startsWith("#")) ? s.substring(1) : s;

export const fadeValue = (e: SlideEvent,a: 'fade-out-speed'| "fade-in-speed") => {
    const s = e.currentSlide.getAttribute("data-sounds-" + a) || e.currentSlide.getAttribute(a);
    return s ? parseInt(s, 10) : 1500
}
