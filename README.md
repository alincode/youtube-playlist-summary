# Youtube Playlist Summary

![Travis](https://img.shields.io/travis/alincode/youtube-playlist-summary.svg)
[![codecov](https://codecov.io/gh/alincode/youtube-playlist-summary/branch/master/graph/badge.svg)](https://codecov.io/gh/alincode/youtube-playlist-summary)
![GitHub package version](https://img.shields.io/github/package-json/v/alincode/youtube-playlist-summary.svg)
[![Dependency Status](https://img.shields.io/david/alincode/youtube-playlist-summary.svg?style=flat)](https://david-dm.org/alincode/youtube-playlist-summary) [![Greenkeeper badge](https://badges.greenkeeper.io/alincode/youtube-playlist-summary.svg)](https://greenkeeper.io/)
![npm downloads](https://img.shields.io/npm/dt/youtube-playlist-summary.svg)

<p align="center">
it could help you easy to get all playlists informations.
</p>

### Requirements

- node 8.x

### Install

```
$ npm install --save youtube-playlist-summary
```

### Usage

- [How to Get YouTube API Key - Easy way - YouTube](https://www.youtube.com/watch?v=_U_VS12uu-o)

```js
const PlaylistSummary = require('youtube-playlist-summary')
const config = {
  GOOGLE_API_KEY: 'YOUR_GOOGLE_API_KEY', // require
  PLAYLIST_ITEM_KEY: ['publishedAt', 'title', 'description', 'videoId', 'videoUrl'], // option
}

const ps = new PlaylistSummary(config)
const CHANNEL_ID = 'UCQCaS3atWyNHEy5PkDXdpNg'
const PLAY_LIST_ID = 'PL9f8_QifuTL4CS8-OyA-4WADhkddOnRS4'

ps.getPlaylistItems(PLAY_LIST_ID)
  .then((result) => {
    console.log(result)
  })
  .catch((error) => {
    console.error(error)
  })

ps.getPlaylists(CHANNEL_ID)
  .then((result) => {
    console.log(result)
  })
  .catch((error) => {
    console.error(error)
  })

ps.getSummary(CHANNEL_ID)
  .then((result) => {
    console.log(result)
  })
  .catch((error) => {
    console.error(error)
  })
```

## License

MIT © [alincode](https://github.com/alincode/youtube-playlist-summary)
