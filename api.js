const debug = require('debug')('yps.api')
const R = require('ramda')
const axios = require('axios')
const API_URL_BASE = 'https://www.googleapis.com/youtube/v3/'
const maxResults = 50

class API {
  constructor(config) {
    this.config = config
    this.resetToDefault = R.merge(R.__, {
      part: 'snippet,contentDetails',
      maxResults,
      key: this.config.GOOGLE_API_KEY,
    })

    this.resetToChannelDefault = R.merge(R.__, {
      part: 'snippet, statistics',
      maxResults,
      key: this.config.GOOGLE_API_KEY,
    })

    debug('config: ', this.config)
  }

  async channel(channelId) {
    let params = this.resetToChannelDefault({ id: channelId })
    const options = { url: `${API_URL_BASE}channels`, method: 'get', params }
    let { data } = await axios(options)
    return data
  }

  async playlistById(playlistId) {
    let params = this.resetToDefault({ id: playlistId })
    const options = { url: `${API_URL_BASE}playlists`, method: 'get', params }
    const { data } = await axios(options)
    return data
  }

  async playlistByChannelId(channelId) {
    let params = this.resetToDefault({ channelId })
    const options = { url: `${API_URL_BASE}playlists`, method: 'get', params }
    let { data } = await axios(options)
    return data
  }

  async playlistItems(playlistId) {
    let params = this.resetToDefault({ playlistId })
    const options = { url: `${API_URL_BASE}playlistItems`, method: 'get', params }
    let { data } = await axios(options)
    let { nextPageToken } = data
    while (nextPageToken) {
      debug('nextPageToken:', nextPageToken)
      let result = await this.playlistItemsNextPage(playlistId, nextPageToken)
      data.items = data.items.concat(result.items)
      nextPageToken = result.nextPageToken
    }
    return data
  }

  async playlistItemsNextPage(playlistId, pageToken) {
    let params = this.resetToDefault({ playlistId, pageToken: pageToken })
    const options = { url: `${API_URL_BASE}playlistItems`, method: 'get', params }
    let { data } = await axios(options)
    let { nextPageToken } = data
    return {
      items: data.items,
      nextPageToken,
    }
  }
}

module.exports = API
