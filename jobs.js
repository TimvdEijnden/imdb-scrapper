const {
  scrapper,
  getTrendingGenre,
  getTrending,
  search,
  getFull,
  awardsPage,
  episodesPage,
  getCast,
  getActor,
  searchActor,
  simpleSearch,
  getUpcoming,
  getTop,
  getComingSoon,
  getInTheaters,
  getWhatsOnTV
} = require("./index");

const jobs = excuteMe => [
  getFull("tt2395427").then(movieDetails => {
    return excuteMe("getFull-tt2395427", movieDetails);
  }),

  simpleSearch("flash").then(data => {
    return excuteMe("simpleSearch-flash", data);
  }),

  getTrending(7).then(data => {
    return excuteMe("getTrending-7", data);
  }),

  getTrendingGenre("comedy", 7).then(data => {
    return excuteMe("getTrending-comedy-7", data);
  }),

  awardsPage("tt2395427").then(movieDetails => {
    return excuteMe("awardsPage-tt5580390", movieDetails);
  }),

  scrapper("tt1825683").then(movieDetails => {
    return excuteMe("scrapper-tt1825683", movieDetails);
  }),

  search("new").then(result => {
    return excuteMe("search-'new world'", result);
  }),

  episodesPage("tt3107288", 2).then(episodes => {
    return excuteMe("episodesPage-tt3107288-2", episodes);
  }),
  getCast("tt1825683").then(movieDetails => {
    return excuteMe("getCast-tt1825683", movieDetails);
  }),

  getActor("nm2652716").then(actorDetails => {
    return excuteMe("getActor-nm2652716", actorDetails);
  }),

  searchActor("govinda").then(val => {
    return excuteMe("searchActor-govinda", val);
  }),

  getUpcoming(20).then(val => {
    return excuteMe("getUpcoming-20", val);
  }),

  getTop(10).then(val => {
    return excuteMe("getTop-10", val);
  }),

  getComingSoon(10).then(val => {
    return excuteMe("getComingSoon", val);
  }),

  getInTheaters(10).then(val => {
    return excuteMe("getInTheaters", val);
  }),

  getWhatsOnTV(10, 'netflix').then(val => {
    return excuteMe("getWhatsOnTV-10-'netflix'", val);
  }),

  getWhatsOnTV(10, 'prime').then(val => {
    return excuteMe("getWhatsOnTV-10-'prime", val);
  }),

  getWhatsOnTV(10, 'disney').then(val => {
    return excuteMe("getWhatsOnTV-10-'disney", val);
  }),

  getWhatsOnTV(10, 'hbomax').then(val => {
    return excuteMe("getWhatsOnTV-10-'hbomax", val);
  }),

  getWhatsOnTV(10, 'hulu').then(val => {
    return excuteMe("getWhatsOnTV-10-'hulu", val);
  }),
];

module.exports = jobs;
