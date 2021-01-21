const { request } = require("./request");
const cheerio = require("cheerio");
const { ifError } = require("./error");

/**
 * inTheaters - the function provide movies currently in Theaters
 *
 * @param {number} [n=10]       number of result
 * @param {string} [service=netflox] type of streaming service
 *
 * @returns {Promise<Array>} array with result
 */
function getWhatsOnTV(n = 10, service = 'netflix') {

  const urls = {
    netflix: 'https://www.imdb.com/whats-on-tv/new-on-netflix-streaming/ls082810391/',
    prime: 'https://www.imdb.com/whats-on-tv/new-on-prime-video-streaming/ls082823019/',
    disney: 'https://www.imdb.com/imdbpicks/new-on-disney-plus-streaming/ls082863156/',
    hbomax: 'https://www.imdb.com/whats-on-tv/new-on-hbo-max-streaming/ls082849306/',
    hulu: 'https://www.imdb.com/whats-on-tv/new-on-hulu-streaming/ls082844029/',
  }

  return request(urls[service]).then(data => {
    let items = [];
    let i = 1;
    const $ = cheerio.load(data);
    while (i <= n) {
      try {
        items.push({
          name: $(
            `.lister-item:nth-child(${i}) h3 a`
          ).text(),
          poster:
            $(
              `div.lister-item:nth-child(${i}) img`
            )[0].attribs.loadlate.split("@._")[0] + "@._V1_QL50.jpg",
          id: $(
            `.lister-item:nth-child(${i}) h3 a`
          )[0].attribs.href.split("/")[2]
        });
        i++;
      } catch (e) {
        i++;
        console.log(e);
      }
    }
    return { items };
  })
  .catch(ifError);
}

module.exports = { getWhatsOnTV };
