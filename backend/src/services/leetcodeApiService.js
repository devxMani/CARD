const axios = require('axios');

const LEETCODE_API_ENDPOINT = 'https://leetcode.com/graphql';

exports.fetchUserData = async (username) => {
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
};