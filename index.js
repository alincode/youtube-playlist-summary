const debug = require('debug')('yps.index')
const R = require('ramda')
const API = require('./api')
const Format = require('./format')

const DEFAULT_PLAYLIST_ITEM_KEY = ['publishedAt', 'title', 'description', 'videoId', 'videoUrl']

class PlaylistSummary {
  constructor(config) {
    this.config = {}
    if (config) {
      this.config.GOOGLE_API_KEY = config.GOOGLE_API_KEY
      this.config.PLAYLIST_ITEM_KEY = config.PLAYLIST_ITEM_KEY
    }
    if (process.env.GOOGLE_API_KEY) this.config.GOOGLE_API_KEY = process.env.GOOGLE_API_KEY
    if (process.env.PLAYLIST_ITEM_KEY) this.config.PLAYLIST_ITEM_KEY = process.env.PLAYLIST_ITEM_KEY
    if (!this.config.GOOGLE_API_KEY) throw new Error('missing required YouTube API key')
    this.config.PLAYLIST_ITEM_KEY =
      process.env.PLAYLIST_ITEM_KEY || config.PLAYLIST_ITEM_KEY || DEFAULT_PLAYLIST_ITEM_KEY
    this.api = new API(this.config)
    this.format = new Format(this.config)
  }

  async getPlaylistTitle(playlistId, playlistTitle) {
    if (playlistTitle) return playlistTitle
    const { items } = await this.api.playlistById(playlistId)
    return items[0].snippet.title
  }

  async getChannel(channelId) {
    try {
      let { items } = await this.api.channel(channelId)
      let result = this.format.channel(
        channelId,
        items[0].snippet.title,
        items[0].snippet.description,
        items[0].statistics.videoCount
      )
      return result
    } catch (error) {
      throw error
    }
  }

  // public
  async getPlaylistItems(playlistId, playlistTitle) {
    try {
      let { pageInfo, items } = await this.api.playlistItems(playlistId)
      let newPlaylistTitle = await this.getPlaylistTitle(playlistId, playlistTitle)
      const result = await this.format.playlistItems(playlistId, newPlaylistTitle, pageInfo, items)
      return result
    } catch (error) {
      throw error
    }
  }

  // public
  async getPlaylists(channelId) {
    try {
      let channel = await this.getChannel(channelId)
      let { pageInfo, items } = await this.api.playlistByChannelId(channelId)
      let result = this.format.playlists(channel, pageInfo, items)
      return result
    } catch (error) {
      throw error
    }
  }

  // public
  async getSummary(channelId) {
    let playlists = await this.getPlaylists(channelId)
    let promises = []

    for (let item of playlists.items) {
      const promise = this.getPlaylistItems(item.playlistId, item.title, item.playlistUrl)
      promises.push(promise)
    }

    let result = {}

    await Promise.all(promises).then(function(newPlaylists) {
      let Filterable = (item) => item.total != 0
      result.items = R.filter(Filterable, newPlaylists)
    })
    let channel = await this.getChannel(channelId)
    result = R.merge(channel, result)
    return result
  }
}

module.exports = PlaylistSummary
