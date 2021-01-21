const { request } = require("./request");
const cheerio = require("cheerio");
const { ifError } = require("./error");

/**
 * inTheaters - the function provide movies currently in Theaters
 *
 * @param {number} [n=10]       number of result
 *
 * @returns {Promise<Array>} array with result
 */
function getInTheaters(n = 10) {
  const url = 'https://www.imdb.com/movies-in-theaters/';
  return request(url)
    .then(data => {
      const $ = cheerio.load(data);
      let items = [];
      let i = 1;
      while (i <= n) {
        try {
          items.push({
            name: $(`.list_item:nth-child(${i+1}) h4 a`).text().trim(),
            poster:
              $(
                `.list_item:nth-child(${i+1}) img`
              )[0].attribs.src.split("@._")[0] + "@._V1_QL50.jpg",
            id: $(
              `.list_item:nth-child(${i+1}) h4 a`
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

module.exports = { getInTheaters };
