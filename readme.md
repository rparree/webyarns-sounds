## Project

- Original 2015 project was at https://github.com/rparree/webyarns-utils/tree/master/sound-api
- then moved in 2019 to https://github.com/rparree/reveal.js/commit/6978496a998fa20f3621443ede8e369c5987d65d

## Init

The sound needs to be initialised by a user-gesture (e.g., touch event). 

Here's an example HTML:

```html
<section data-disable-keyboard data-prevent-swipe>
    <h1><a id="init-sounds" href="#">click here to start</a></h1>
    <div id="sound-loader">
        <!-- anything here will be shown during the initialisation -->
        <div class="loader-pulsing-dot"></div>
    </div>
</section>
```

then use the following javascript (place this after loading Reveal)

```html
WebyarnsSounds.init({
    initElement: document.getElementById("init-sounds"),
    loaderElement: document.getElementById("sound-loader")
}).then(() => {
    Reveal.next() // proceed to next section
})
```

Some details:
- Options:
  - `initElement`: element that when clicked will start the loading of audio. This element will also disappear when clicked
  - `loaderElement`: element to show when initialisation has started 
- `WebyarnsSounds.init` returns a promise. It is completed when the sounds have been loaded.

## Usage

Sound API:

- `data-sounds` with operators::
  - `«id»`: no operator: continue sound from previous slide (if still playing) 
  - `!«id»`: restart a sound
  - `>«id»`: start persistently (needs to be stopped using `#`)
  - `#«id»`: stop a persistently started audio
- `data-sounds-volume-change` change volume (syntax: `id:volume`, where `volume` is between `0` and `1`)
- `data-fade-in-speed` and `data-fade-out-speed`

## Dev setup

```shell 
$ yarn install --ignore-engines
```
