# Youtube Playlist Summary

<p align="center">
it could help you easy to get all playlist informations.
</p>

![Travis](https://img.shields.io/travis/alincode/youtube-playlist-summary.svg)
![GitHub release](https://img.shields.io/github/release/alincode/youtube-playlist-summary.svg)
[![](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Dependency Status](https://img.shields.io/david/alincode/youtube-playlist-summary.svg?style=flat)](https://david-dm.org/alincode/youtube-playlist-summary)
![npm](https://img.shields.io/npm/dm/youtube-playlist-summary.svg)
![node](https://img.shields.io/node/v/youtube-playlist-summary.svg)


### Requirements

* node 8.x.x
### Install

```
$ npm install --save youtube-playlist-summary
```

### Usage

```js
const CHANNEL_ID = 'UCQCaS3atWyNHEy5PkDXdpNg';
const PLAY_LIST_ID = 'PL9f8_QifuTL4CS8-OyA-4WADhkddOnRS4';

ps.getPlaylistItems(PLAY_LIST_ID).then(result => {
  console.log(result);
}).catch(error => {
  console.error(error);
});

ps.getPlaylists(CHANNEL_ID).then(result => {
  console.log(result);
}).catch(error => {
  console.error(error);
});

ps.getSummary(CHANNEL_ID).then(result => {
  console.log(result);
}).catch(error => {
  console.error(error);
});
```

## License

[MIT](LICENSE)