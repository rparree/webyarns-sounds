import {Howl} from "howler";

export type AudioId = string

export interface SoundData {
    [id: string]: {
        loop?: boolean,
        src: string[]
    }
}

export  interface AudioMap {
    [id: string]: Howl
}
