const express = require('express');
const { google } = require('googleapis');
const multer = require('multer');
const fs = require('fs');

const app = express();
const port = 3000;

const CLIENT_ID = '976248356759-o87loo3vuv65cel2chhnrkp46p2l3n60.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground/';

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

const drive = google.drive({
  version: 'v3',
  auth: oauth2Client,
});

const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.single('file'), async (req, res) => {
  const fileMetadata = {
    name: req.file.originalname,
  };
  const media = {
    mimeType: req.file.mimetype,
    body: fs.createReadStream(req.file.path),
  };

  try {
    const response = await drive.files.create({
      resource: fileMetadata,
      media: media,
      fields: 'id',
    });
    console.log('File Id: ', response.data.id);
    res.send('File uploaded successfully!');
  } catch (err) {
    console.error('Error uploading file:', err);
    res.send('Error uploading file.');
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
