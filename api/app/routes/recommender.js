const express = require('express');
const router = express.Router();
const recommender = require('../controllers/recommender.controller');

// get total average
router.get('/average', recommender.getAverage);
// get weekly average
router.get('/weeklyAverage', recommender.getAverageWeekly);
// get monthly average
router.get('/monthlyAverage', recommender.getAverageMonthly);

module.exports = router;
