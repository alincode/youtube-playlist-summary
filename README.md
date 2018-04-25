# youtube playlist summary

<p align="center">
it could help you easy to get all playlist informations.
</p>

<p align="center">
![Build Status](https://travis-ci.org/alincode/youtube-playlist-summary.svg?branch=master)](https://travis-ci.org/alincode/youtube-playlist-summary)
</p>

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