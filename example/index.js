const PlaylistSummary = require('../index.js');

let config = {
  GOOOGLE_API_KEY: process.env.GOOOGLE_API_KEY
};

const ps = new PlaylistSummary(config);

const CHANNEL_ID = 'UCQCaS3atWyNHEy5PkDXdpNg';
const PLAY_LIST_ID = 'PL9f8_QifuTL4CS8-OyA-4WADhkddOnRS4';

ps.getPlaylistItems(PLAY_LIST_ID).then(result => {
  console.log(result);
}).catch(error => {
  console.error(error);
});

ps.getPlaylists(CHANNEL_ID).then(result => {
  console.log(result);
}).catch(error => {
  console.error(error);
});

ps.getSummary(CHANNEL_ID).then(result => {
  console.log(result);
}).catch(error => {
  console.error(error);
});
