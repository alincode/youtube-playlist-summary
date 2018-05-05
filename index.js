const debug = require('debug')('yps.index');
const R = require('ramda');
const API = require('./api');
const Format = require('./format');

class PlaylistSummary {

  constructor(config) {
    debug('config', config);
    this.GOOGLE_API_KEY = process.env.GOOGLE_API_KEY || config.GOOGLE_API_KEY;
    if (!this.GOOGLE_API_KEY) throw new Error('missing required Youtube API key');
    this.api = new API(this.GOOGLE_API_KEY);
    this.format = new Format();
  }

  async getPlaylistTitle(playlistId, playlistTitle) {
    if (playlistTitle) return playlistTitle;
    const { items } = await this.api.playlistById(playlistId);
    return items[0].snippet.title;
  }

  async getChannel(channelId) {
    try {
      let { items } = await this.api.channel(channelId);
      let result = this.format.channel(channelId, items[0].snippet.title, items[0].snippet.description, items[0].statistics.videoCount);
      return result;
    } catch (error) {
      throw error;
    }
  }

  // public
  async getPlaylistItems(playlistId, playlistTitle) {
    try {
      let { pageInfo, items } = await this.api.playlistItems(playlistId);
      let newPlaylistTitle = await this.getPlaylistTitle(playlistId, playlistTitle);
      const result = await this.format.playlistItems(playlistId, newPlaylistTitle, pageInfo, items);
      return result;
    } catch (error) {
      throw error;
    }
  }

  // public
  async getPlaylists(channelId) {
    try {
      let channel = await this.getChannel(channelId);
      let { pageInfo, items } = await this.api.playlistByChannelId(channelId);
      let result = this.format.playlists(channel, pageInfo, items);
      return result;
    } catch (error) {
      throw error;
    }
  }

  // public
  async getSummary(channelId) {
    let playlists = await this.getPlaylists(channelId);
    let promises = [];

    for (let item of playlists.items) {
      const promise = this.getPlaylistItems(item.playlistId, item.title, item.playlistUrl);
      promises.push(promise);
    }

    let result = {};

    await Promise.all(promises).then(function (newPlaylists) {
      let Filterable = item => item.total != 0;
      result.items = R.filter(Filterable, newPlaylists);
    });
    let channel = await this.getChannel(channelId);
    result = R.merge(channel, result);
    return result;
  }
}

module.exports = PlaylistSummary;