const debug = require('debug')('yps.api');
const R = require('ramda');
const axios = require('axios');
const API_URL_BASE = 'https://www.googleapis.com/youtube/v3/';
const maxResults = 50;

class API {

  constructor(config) {
    this.GOOOGLE_API_KEY = process.env.GOOOGLE_API_KEY || config.GOOOGLE_API_KEY;
    if (!this.GOOOGLE_API_KEY) throw new Error('missing required Youtube API key');

    this.resetToDefault = R.merge(R.__, {
      part: 'snippet,contentDetails',
      maxResults,
      key: this.GOOOGLE_API_KEY
    });

    this.resetToChannelDefault = R.merge(R.__, {
      part: 'snippet, statistics',
      maxResults,
      key: this.GOOOGLE_API_KEY
    });

    debug('GOOOGLE_API_KEY: ', this.GOOOGLE_API_KEY);
  }

  async channel(channelId) {
    let params = this.resetToChannelDefault({ id: channelId });
    const options = { url: `${API_URL_BASE}channels`, method: 'get', params };
    let { data } = await axios(options);
    return data;
  }

  async playlistById(playlistId) {
    let params = this.resetToDefault({ id: playlistId });
    const options = { url: `${API_URL_BASE}playlists`, method: 'get', params };
    const { data } = await axios(options);
    return data;
  }

  async playlistByChannelId(channelId) {
    let params = this.resetToDefault({ channelId });
    const options = { url: `${API_URL_BASE}playlists`, method: 'get', params };
    let { data } = await axios(options);
    return data;
  }

  async playlistItems(playlistId) {
    let params = this.resetToDefault({ playlistId });
    const options = { url: `${API_URL_BASE}playlistItems`, method: 'get', params };
    let { data } = await axios(options);
    return data;
  }
}

module.exports = API;