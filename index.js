const debug = require('debug')('youtubePlaylistSummary');
const axios = require('axios');
const R = require('ramda');

const API_URL_BASE = 'https://www.googleapis.com/youtube/v3/';
const CHANNEL_URL_FORMAT = 'https://www.youtube.com/channel/';
const PLAY_LIST_URL_FORMAT = 'https://www.youtube.com/playlist?list=';
const VIDEO_URL_FORMAT = 'https://www.youtube.com/watch?v=';

const resetToDefault = R.merge(R.__, {
  part: 'snippet',
  maxResults: 50
});

class PlaylistSummary {

  constructor(config) {
    debug("config", config);
    this.GOOOGLE_API_KEY = config.GOOOGLE_API_KEY;
    this.ENV = config.ENV;

    resetToDefault({
      key: this.GOOOGLE_API_KEY
    });
  }

  pickPlaylistItems(items) {
    debug('=== pickPlaylistItems ===');
    let newItems = [];
    for (let item of items) {
      let newItem = R.pick(['publishedAt', 'title', 'description'], item.snippet);
      newItem.videoId = item.snippet.resourceId.videoId;
      newItem.videoUrl = VIDEO_URL_FORMAT + item.snippet.resourceId.videoId;
      newItems.push(newItem);
    }
    return newItems;
  }

  async getPlaylistItems(playlistId) {
    try {
      let params = resetToDefault({ key: this.GOOOGLE_API_KEY, playlistId });
      const options = { url: `${API_URL_BASE}playlistItems`, method: 'get', params };
      let { data } = await axios(options);
      let { pageInfo, items} = data;
      let result = {
        total: pageInfo.totalResults,
        items: this.pickPlaylistItems(items)
      }
      return result;
    } catch (error) {
      throw error;
    }
  }

  pickPlaylists(items) {
    let newItems = [];
    debug('=== pickPlaylists ===');
    for (let item of items) {
      let newItem = R.pick(['publishedAt', 'title', 'description'], item.snippet);
      newItem.playlistId = item.id;
      newItem.playlistUrl = PLAY_LIST_URL_FORMAT + item.id;
      newItems.push(newItem);
    }
    return newItems;
  }

  async getPlaylists(channelId) {
    try {
      let params = resetToDefault({ key: this.GOOOGLE_API_KEY, channelId });
      const options = { url: `${API_URL_BASE}playlists`, method: 'get', params };
      let { data } = await axios(options);
      let { pageInfo, items } = data;
      let result = {
        total: pageInfo.totalResults,
        items: this.pickPlaylists(items)
      }
      return result;
    } catch (error) {
      throw error;
    }
  }

  async getSummary(channelId) {
    let playlists = await this.getPlaylists(channelId);
    console.dir(playlists);
    let results = [];

    for(let item of playlists.items) {
      let result = await this.getPlaylistItems(item.playlistId);
      results.push(result);
    }
    return results;
  }
}

module.exports = PlaylistSummary;