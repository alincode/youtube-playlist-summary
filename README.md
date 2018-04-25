# Youtube Playlist Summary

<p align="center">
it could help you easy to get all playlist informations.
</p>

<p align="center">
  <a href="http://travis-ci.org/alincode/youtube-playlist-summary"><img src="https://api.travis-ci.org/alincode/youtube-playlist-summary.svg?branch=master" alt="Build Status"></a>
</p>

[![](https://img.shields.io/github/release/alincode/youtube-playlist-summary.svg)](https://github.com/alincode/youtube-playlist-summary/releases)
[![](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Dependency Status](https://img.shields.io/david/alincode/youtube-playlist-summary.svg?style=flat)](https://david-dm.org/alincode/youtube-playlist-summary)
[![Downloads](https://img.shields.io/npm/dt/youtube-playlist-summary.svg)](https://www.npmjs.com/package/youtube-playlist-summary) 


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