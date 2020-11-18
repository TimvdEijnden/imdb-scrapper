const { request } = require("./request");
const cheerio = require("cheerio");
const { ifError } = require("./error");

/**
 * getTop - the function provide Top based on type=['movie'.'tv']
 *
 * @param {number} [n=50]       number of result
 * @param {string} [type=movie] type of movie or tv
 *
 * @returns {Promise<Array>} array with result
 */
function getTop(n = 50, type = "movie") {
  const urls = {
    tv: "https://www.imdb.com/chart/toptv",
    movie: "https://www.imdb.com/chart/top"
  };
  return request(urls[type])
    .then(data => {
      const $ = cheerio.load(data);
      let Top = [];
      let i = 1;
      while (i <= n) {
        try {
          Top.push({
            name: $(
              `.lister-list > tr:nth-child(${i}) > td:nth-child(2) > a:nth-child(1)`
            ).text(),
            poster:
              $(
                `.lister-list > tr:nth-child(${i}) > td:nth-child(1) > a:nth-child(6) > img:nth-child(1)`
              )[0].attribs.src.split("@._")[0] + "@._V1_QL50.jpg",
            id: $(
              `.lister-list > tr:nth-child(${i}) > td:nth-child(1) > a:nth-child(6)`
            )[0].attribs.href.split("/")[2]
          });
          i++;
        } catch (e) {
          i++;
          console.log(e);
        }
      }
      return { Top };
    })
    .catch(ifError);
}

module.exports = { getTop };
