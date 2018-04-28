const PlaylistSummary = require('../index.js');
const config = require('config');
const ps = new PlaylistSummary(config);
const chai = require('chai');
const should = chai.should();

describe('# index', function () {

  it('getPlaylistItems', async function () {
    const PLAY_LIST_ID = 'PL9f8_QifuTL4CS8-OyA-4WADhkddOnRS4';
    let result = await ps.getPlaylistItems(PLAY_LIST_ID);
    let KESY1 = ['channelId', 'channelTitle', 'channelUrl', 'items', 'playlistId', 'playlistTitle', 'playlistUrl', 'total'];
    result.should.to.have.all.keys(KESY1);
    result.total.should.be.a('number');
    result.items.should.be.a('array');
    let KESY2 = ['publishedAt', 'title', 'description', 'videoId', 'videoUrl'];
    result.items[0].should.to.have.all.keys(KESY2);
  });

  it('getPlaylists', async function () {
    const CHANNEL_ID = 'UCQCaS3atWyNHEy5PkDXdpNg';
    let result = await ps.getPlaylists(CHANNEL_ID);
    let KESY1 = ['channelId', 'channelTitle', 'channelUrl', 'items', 'total'];
    result.should.to.have.all.keys(KESY1);
    result.total.should.be.a('number');
    result.items.should.be.a('array');
    let KESY2 = ['publishedAt', 'title', 'description', 'playlistId', 'playlistUrl'];
    result.items[0].should.to.have.all.keys(KESY2);
  });

  it('getSummary', async function () {
    const CHANNEL_ID = 'UCJi9ZAuo99MqMuJUXiJjpsA';
    let result = await ps.getSummary(CHANNEL_ID);
    let KEY1 = ['channelId', 'channelUrl', 'channelTitle', 'items', 'description', 'videoCount'];
    result.should.to.have.all.keys(KEY1);
    result.items.should.be.a('array');
    let KEY2 = ['total', 'items', 'playlistTitle', 'playlistId', 'playlistUrl', 'channelId', 'channelUrl', 'channelTitle'];
    result.items[0].should.to.have.all.keys(KEY2);
    result.items[0].total.should.be.a('number');
    result.items[0].items.should.be.a('array');
    let KEY3 = ['publishedAt', 'title', 'description', 'videoId', 'videoUrl'];
    result.items[0].items[0].should.to.have.all.keys(KEY3);
  });
});