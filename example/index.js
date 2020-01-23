const PlaylistSummary = require('../index.js')

let config = {
  GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
  PLAYLIST_ITEM_KEY: ['publishedAt', 'title', 'description', 'videoId', 'videoUrl'],
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
