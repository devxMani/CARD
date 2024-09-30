const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const LEETCODE_API_ENDPOINT = 'https://leetcode.com/graphql';
const LEETCODE_URL = 'https://leetcode.com';

async function fetchUserData(username) {
  const query = `
    query userPublicProfile($username: String!) {
      matchedUser(username: $username) {
        username
        profile {
          realName
          countryName
          starRating
          aboutMe
          userAvatar
          reputation
          ranking
        }
        submitStats: submitStatsGlobal {
          acSubmissionNum {
            difficulty
            count
            submissions
          }
        }
      }
    }
  `;

  try {
    const response = await axios.post(LEETCODE_API_ENDPOINT, {
      query: query,
      variables: { username }
    });

    return response.data.data.matchedUser;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw new Error('Failed to fetch user data from LeetCode API');
  }
}

async function scrapeAdditionalData(username) {
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
}

app.get('/api/user/:username', async (req, res) => {
  try {
    const { username } = req.params;
    const userData = await fetchUserData(username);
    const additionalData = await scrapeAdditionalData(username);

    const processedData = {
      name: userData.profile.realName,
      username: userData.username,
      avatar: userData.profile.userAvatar,
      ranking: userData.profile.ranking,
      reputation: userData.profile.reputation,
      totalSolved: userData.submitStats.acSubmissionNum.reduce((acc, curr) => acc + curr.count, 0),
      problemsSolved: {
        easy: userData.submitStats.acSubmissionNum.find(stat => stat.difficulty === "Easy")?.count || 0,
        medium: userData.submitStats.acSubmissionNum.find(stat => stat.difficulty === "Medium")?.count || 0,
        hard: userData.submitStats.acSubmissionNum.find(stat => stat.difficulty === "Hard")?.count || 0
      },
      languageStats: additionalData.languageStats,
      badges: additionalData.badges
    };

    res.json(processedData);
  } catch (error) {
    console.error('Error processing request:', error);
    res.status(500).json({ error: 'An error occurred while fetching user data' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

