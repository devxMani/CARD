const leetcodeApiService = require('../services/leetcodeApiService');
const leetcodeScraperService = require('../services/leetcodeScraperService');

exports.getUserStats = async (req, res, next) => {
  try {
    const { username } = req.params;
    const userData = await leetcodeApiService.fetchUserData(username);
    const additionalData = await leetcodeScraperService.scrapeAdditionalData(username);

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
    next(error);
  }
};