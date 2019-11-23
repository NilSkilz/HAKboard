const Nightmare = require('nightmare');
const cheerio = require('cheerio');

const fs = require('fs');

const scrape = () => {
  const nightmare = Nightmare({ show: false });
  nightmare
    .goto('https://www.dakboard.com/app?p=4b132e470c83c0740c257f9d994b773e')
    .wait(4000)
    .evaluate(() => document.querySelector('body').innerHTML)
    .end()
    .then(response => {
      const image = getImage(response);

      if (image) {
        fs.readFile('./public/images.txt', function(err, data) {
          if (err) throw err;
          if (!data.includes(image)) {
            fs.appendFile('./public/images.txt', `${image}\n`, function(err) {
              if (err) throw err;
              console.log('saved!');
              setTimeout(scrape, 1000);
            });
          } else {
            console.log('duplicate!');
            setTimeout(scrape, 1000);
          }
        });
      }
    });
};

const getImage = html => {
  const $ = cheerio.load(html);
  const underlay = $('#background-underlay-2').css('background');
  return underlay.split('"')[1].split('"')[0];
};

scrape();
