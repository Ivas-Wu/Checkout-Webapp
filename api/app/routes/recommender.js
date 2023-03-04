const express = require('express');
const router = express.Router();
const recommender = require('../controllers/recommender.controller');

// get total average
router.get('/average', recommender.getAverage);
// get weekly average
router.get('/weeklyAverage', recommender.getAverageWeekly);
// get monthly average
router.get('/monthlyAverage', recommender.getAverageMonthly);
// get total sum
router.get('/total', recommender.getTotal);
// get weekly sum
router.get('/weeklyTotal', recommender.getTotalWeekly);
// get monthly sum
router.get('/monthlyTotal', recommender.getTotalMonthly);

module.exports = router;
