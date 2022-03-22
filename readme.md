## Usage

Sound API:

- `data-sounds` with operators (prefix)
  - `!`: restart a sound
  - `>`: start persistently (needs to be stopped using `#`)
  - `#`: stop a persistently started audio
- `data-sounds-volume-change` change volume (syntax: `id:volume`, where `volume` is between `0` and `1`)
- `data-fade-in-speed` and `data-fade-out-speed`

## Dev setup

```shell 
$ yarn install --ignore-engines
```
