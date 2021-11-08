const express = require('express')
const router = express.Router({ mergeParams: true })
const catchAsync = require('../Utils/catchAsync')
const Campground = require('../models/campground')
const Review = require('../models/review')
const reviews = require('../controllers/reviews')
const ExpressError = require('../Utils/ExpressError')
const { reviewSchema } = require('../schemas.js')
const { validateReview, isLoggedIn, isReviewAuthor } = require('../Utils/middleware')


router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview))
router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview))

module.exports = router