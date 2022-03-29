import {audioMap} from "../webyarns-sound";
import "./style.css"

type Options = {
    initElement: HTMLElement;
    loaderElement?: HTMLElement;
}


function showLoader(loaderElement: HTMLElement | undefined, show: boolean = true) {
    if (loaderElement)
        document.addEventListener("DOMContentLoaded", () => {
            loaderElement.style.visibility = show ? "visible" : "hidden"
        })
}

export function init(options: Options): Promise<void> {
    showLoader(options.loaderElement, false) ;

    return new Promise<void>(res => {
        options.initElement.addEventListener("click", (e) => {
            e.preventDefault()
            options.initElement.classList.add("webyarns-sounds-init")
            showLoader(options.loaderElement) ;
            audioMap(() => {
                showLoader(options.loaderElement, false) ;
                res();
            })
        })
    })
}
