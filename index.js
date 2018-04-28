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

const resetToChannelDefault = R.merge(R.__, {
  part: 'snippet, statistics',
  maxResults: 50
});

class PlaylistSummary {

  constructor(config) {
    debug("config", config);
    this.GOOOGLE_API_KEY = process.env.GOOOGLE_API_KEY || config.GOOOGLE_API_KEY;

    if (!this.GOOOGLE_API_KEY) {
      throw new Error('missing required Youtube API key')
    } else {
      debug('GOOOGLE_API_KEY: ', this.GOOOGLE_API_KEY);
    }
    
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

  async getPlaylistItems(playlistId, playlistTitle, playlistUrl) {
    try {
      let params = resetToDefault({ key: this.GOOOGLE_API_KEY, playlistId });
      const options = { url: `${API_URL_BASE}playlistItems`, method: 'get', params };
      let { data } = await axios(options);
      let { pageInfo, items} = data;
      const result = {
        channelId: items[0].snippet.channelId,
        channelTitle: items[0].snippet.channelTitle,
        channelUrl: this.getChannelUrl(items[0].snippet.channelId),
        playlistId: playlistId,
        playlistTitle: await this.getPlaylistTitle(playlistId, playlistTitle),
        playlistUrl: this.getPlaylistUrl(playlistId),
        total: pageInfo.totalResults,
        items: this.pickPlaylistItems(items)
      }
      return result;
    } catch (error) {
      throw error;
    }
  }

  getPlaylistUrl(playlistId) {
    return PLAY_LIST_URL_FORMAT + playlistId;
  }

  getChannelUrl(channelId) {
    return CHANNEL_URL_FORMAT + channelId;
  }

  pickPlaylists(items) {
    let newItems = [];
    debug('=== pickPlaylists ===');
    for (let item of items) {
      let newItem = R.pick(['publishedAt', 'title', 'description'], item.snippet);
      newItem.playlistId = item.id;
      newItem.playlistUrl = this.getPlaylistUrl(item.id);
      newItems.push(newItem);
    }
    return newItems;
  }

  async getPlaylistTitle(playlistId, playlistTitle) {
    if (playlistTitle) return playlistTitle;
    let params = resetToDefault({ key: this.GOOOGLE_API_KEY, id: playlistId });
    const options = { url: `${API_URL_BASE}playlists`, method: 'get', params };
    const { data } = await axios(options);
    const { items } = data;
    return items[0].snippet.title;
  }

  async getPlaylists(channelId) {
    try {
      let channel = await this.getChannel(channelId);
      let params = resetToDefault({ key: this.GOOOGLE_API_KEY, channelId });
      const options = { url: `${API_URL_BASE}playlists`, method: 'get', params };
      let { data } = await axios(options);
      let { pageInfo, items } = data;
      let result = {
        channelId: channel.id,
        channelTitle: channel.title,
        channelUrl: channel.url,
        total: pageInfo.totalResults,
        items: this.pickPlaylists(items)
      }
      return result;
    } catch (error) {
      throw error;
    }
  }

  async getChannel(channelId) {
    try {
      let params = resetToChannelDefault({ key: this.GOOOGLE_API_KEY, id: channelId });
      const options = { url: `${API_URL_BASE}channels`, method: 'get', params };
      let { data } = await axios(options);
      let { items } = data;
      let result = {
        id: channelId,
        title: items[0].snippet.title,
        url: CHANNEL_URL_FORMAT + channelId,
        description: items[0].snippet.description,
        videoCount: items[0].statistics.videoCount
      }
      return result;
    } catch (error) {
      throw error;
    }
  }

  convertChannelObject(channel) {
    return {
      channelId: channel.id,
      channelTitle: channel.title,
      channelUrl: channel.url,
      description: channel.description,
      videoCount: channel.videoCount
    }
  }

  async getSummary(channelId) {
    let playlists = await this.getPlaylists(channelId);
    let promises = [];

    for (let item of playlists.items) {
      const promise = this.getPlaylistItems(item.playlistId, item.title, item.playlistUrl );
      promises.push(promise);
    }

    let items = [];
    let result = {};

    await Promise.all(promises).then(function (newPlaylists) {
      let Filterable = item => item.total != 0;
      result.items = R.filter(Filterable, newPlaylists);
    });
    let channel = await this.getChannel(channelId);
    result = R.merge(this.convertChannelObject(channel), result);
    return result;
  }
}

module.exports = PlaylistSummary;