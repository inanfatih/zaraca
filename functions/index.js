const functions = require('firebase-functions');
const app = require('express')();

const FBAuth = require('./util/FbAuth.js');

const cors = require('cors');
app.use(cors());

const {
  getContents,
  getContent,
  postContent,
  get2d3d,
  getSocialMedia,
  getVideos,
  updateContentImageLinks,
  deleteContent,
} = require('./handlers/content');


const {
  contactUs,
  getContactUsMessages,
  deleteContactUsMessage,
} = require('./handlers/contactUs');

const { login } = require('./handlers/users');

app.get('/content/:contentId', getContent);
app.get('/content', getContents);
app.get('/2d3d', get2d3d);
app.get('/social-media', getSocialMedia);
app.get('/videos', getVideos);
app.post('/content', FBAuth, postContent);
app.post(
  '/image/:contentId/:imageType/:imageFileName/:imageExtension/:index',
  FBAuth,
  updateContentImageLinks,
);

app.post('/contact', contactUs);
app.get('/contact', FBAuth, getContactUsMessages);
app.delete('/contact/:contactId', FBAuth, deleteContactUsMessage);

// app.post('/image/:contentId/mainImage/:imageFileName', FBAuth, postMainImage);
// app.post(
//   '/image/:contentId/imageList/:imageFileName/:index',
//   FBAuth,
//   postImageList,
// );
app.post('/login', login);

app.delete('/content/:contentId', FBAuth, deleteContent);

exports.api = functions.https.onRequest(app);
