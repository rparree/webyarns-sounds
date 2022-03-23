## Project

- Original 2015 project was at https://github.com/rparree/webyarns-utils/tree/master/sound-api
- then moved in 2019 to https://github.com/rparree/reveal.js/commit/6978496a998fa20f3621443ede8e369c5987d65d

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
