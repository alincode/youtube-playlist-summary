const PlaylistSummary = require('../index.js');

let config = {
  GOOGLE_API_KEY: process.env.GOOGLE_API_KEY
};

const ps = new PlaylistSummary(config);
const chai = require('chai');
chai.should();

const PLAYLIST_ITEM_KEY = ['publishedAt', 'title', 'description', 'videoId', 'videoUrl'];

describe('# index', function () {

  it('getPlaylistItems', async function () {
    this.timeout(10000);
    const PLAY_LIST_ID = 'PL6B08BAA57B5C7810';
    let result = await ps.getPlaylistItems(PLAY_LIST_ID);
    // console.dir(result);
    let KESY1 = ['channelId', 'channelTitle', 'channelUrl', 'playlistId', 'playlistTitle', 'playlistUrl', 'items', 'total'];
    result.should.to.have.all.keys(KESY1);
    result.total.should.be.a('number');
    result.items.should.be.a('array');
    result.items[0].should.to.have.all.keys(PLAYLIST_ITEM_KEY);
  });

  it('getPlaylists', async function () {
    const CHANNEL_ID = 'UCQCaS3atWyNHEy5PkDXdpNg';
    let result = await ps.getPlaylists(CHANNEL_ID);
    // console.dir(result);
    let KESY1 = ['channelId', 'channelTitle', 'channelUrl', 'channelDescription', 'channelVideoCount', 'items', 'total'];
    result.should.to.have.all.keys(KESY1);
    result.total.should.be.a('number');
    result.items.should.be.a('array');
    let KESY2 = ['publishedAt', 'title', 'description', 'playlistId', 'playlistUrl'];
    result.items[0].should.to.have.all.keys(KESY2);
  });

  it('getSummary 1', async function () {
    const CHANNEL_ID = 'UCQCaS3atWyNHEy5PkDXdpNg';
    let result = await ps.getSummary(CHANNEL_ID);
    // console.dir(result);
    let KEY1 = ['channelId', 'channelTitle', 'channelUrl', 'channelDescription', 'channelVideoCount', 'items'];
    result.should.to.have.all.keys(KEY1);
    result.items.should.be.a('array');
    let KEY2 = ['total', 'items', 'playlistTitle', 'playlistId', 'playlistUrl', 'channelId', 'channelUrl', 'channelTitle'];
    result.items[0].should.to.have.all.keys(KEY2);
    result.items[0].total.should.be.a('number');
    result.items[0].items.should.be.a('array');
    result.items[0].items[0].should.to.have.all.keys(PLAYLIST_ITEM_KEY);
  });

  it('getSummary 2', async function () {
    const CHANNEL_ID = 'UCJi9ZAuo99MqMuJUXiJjpsA';
    let result = await ps.getSummary(CHANNEL_ID);
    // console.dir(result);
    let KEY1 = ['channelId', 'channelTitle', 'channelUrl', 'channelDescription', 'channelVideoCount', 'items'];
    result.should.to.have.all.keys(KEY1);
    result.items.should.be.a('array');
    let KEY2 = ['total', 'items', 'playlistTitle', 'playlistId', 'playlistUrl', 'channelId', 'channelUrl', 'channelTitle'];
    result.items[0].should.to.have.all.keys(KEY2);
    result.items[0].total.should.be.a('number');
    result.items[0].items.should.be.a('array');
    result.items[0].items[0].should.to.have.all.keys(PLAYLIST_ITEM_KEY);
  });
});