const express = require('express');
const fs = require('fs');
const json2html = require('node-json2html');
const router = express.Router();
const folderPath = './data';

const data = [];

router.get('/', async (req, res) => {
  try {
    fs.readdir(folderPath, (err, files) => {
      files.forEach(file => {
        const fileName = folderPath + '/' + file;
        data.push(JSON.parse(fs.readFileSync(fileName)));
      });
    });

    let html = json2html.render(data, {
      '<>': 'body', 'class': '${name}', 'html': [
        {
          '{}': function () {
            return (this.children)
          }, 'html': [{
            '<>': '${name}', 'class': '${name}', 'html': [{
              '{}': function () {
                return (this.children)
              }, 'html': [{
                '<>': 'div', 'class': '${name}', 'html': [{
                  '{}': function () {
                    return (this.children)
                  }, 'html': [{'<>': 'h1', 'class': '${name}', 'text': '${settings.text}'}]
                }]
              }]
            }]
          }]
        }
      ]
    });

    res.send(html);
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;