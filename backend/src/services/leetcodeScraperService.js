const axios = require('axios');
const cheerio = require('cheerio');

const LEETCODE_URL = 'https://leetcode.com';

exports.scrapeAdditionalData = async (username) => {
  try {
    const response = await axios.get(`${LEETCODE_URL}/${username}`);
    const $ = cheerio.load(response.data);

    const languageStats = [];
    $('div[class^="flex items-start"]').each((i, elem) => {
      const language = $(elem).find('span[class^="text-label-1 dark:text-dark-label-1 font-medium"]').text().trim();
      const count = $(elem).find('span[class^="text-label-1 dark:text-dark-label-1 font-medium ml-[5px]"]').text().trim();
      if (language && count) {
        languageStats.push({ language, count });
      }
    });

    const badges = [];
    $('img[class^="h-8 w-8"]').each((i, elem) => {
      const badgeUrl = $(elem).attr('src');
      if (badgeUrl) {
        badges.push(badgeUrl);
      }
    });

    return { languageStats, badges };
  } catch (error) {
    console.error('Error scraping additional data:', error);
    return { languageStats: [], badges: [] };
  }
};