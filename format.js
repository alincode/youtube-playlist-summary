const debug = require('debug')('yps.format')
const R = require('ramda')

const CHANNEL_URL_FORMAT = 'https://www.youtube.com/channel/'
const PLAY_LIST_URL_FORMAT = 'https://www.youtube.com/playlist?list='
const VIDEO_URL_FORMAT = 'https://www.youtube.com/watch?v='

class Format {
  constructor(config) {
    this.config = config
  }

  getVideoUrl(video) {
    return VIDEO_URL_FORMAT + video
  }
  getPlaylistUrl(playlistId) {
    return PLAY_LIST_URL_FORMAT + playlistId
  }
  getChannelUrl(channelId) {
    return CHANNEL_URL_FORMAT + channelId
  }

  shortChannel(channelId, channelTitle) {
    return {
      channelId,
      channelTitle,
      channelUrl: this.getChannelUrl(channelId),
    }
  }

  channel(channelId, channelTitle, channelDescription, channelVideoCount) {
    let videoCount = parseInt(channelVideoCount)
    return R.merge(this.shortChannel(channelId, channelTitle), {
      channelDescription,
      channelVideoCount: videoCount,
    })
  }

  playlists(channel, pageInfo, items) {
    return R.merge(channel, {
      total: pageInfo.totalResults,
      items: this.pickPlaylists(items),
    })
  }

  async playlistItems(playlistId, playlistTitle, pageInfo, items) {
    const channelId = items.length == 0 ? null : items[0].snippet.channelId
    const channelTitle = items.length == 0 ? null : items[0].snippet.channelTitle
    return {
      channelId,
      channelTitle,
      channelUrl: this.getChannelUrl(channelId),

      playlistId,
      playlistTitle,
      playlistUrl: this.getPlaylistUrl(playlistId),

      total: pageInfo.totalResults,
      items: this.pickPlaylistItems(items),
    }
  }

  pickPlaylists(items) {
    let newItems = []
    for (let item of items) {
      let newItem = R.pick(this.config.PLAYLIST_ITEM_KEY, item.snippet)
      const playlistId = item.id
      newItem.playlistId = playlistId
      newItem.playlistUrl = this.getPlaylistUrl(playlistId)
      newItems.push(newItem)
    }
    return newItems
  }

  pickPlaylistItems(items) {
    let newItems = []
    for (let item of items) {
      let newItem = R.pick(this.config.PLAYLIST_ITEM_KEY, item.snippet)
      const videoId = item.snippet.resourceId.videoId
      newItem.videoId = videoId
      newItem.videoUrl = this.getVideoUrl(videoId)
      newItems.push(newItem)
    }
    return newItems
  }
}

module.exports = Format
