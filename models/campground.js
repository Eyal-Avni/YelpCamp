const mongoose = require('mongoose')
const { campgroundSchema } = require('../schemas')
const Review = require('./review')
const Schema = mongoose.Schema
const mongooseValidator = require('mongoose-id-validator')
const GeoJSON = require('mongoose-geojson-schema');

const ImageSchema = new Schema({
    url: String,
    filename: String
})
ImageSchema.virtual('thumbnail').get(function () {
    return this.url.replace('/upload', '/upload/w_200')
})

const CampgroundSchema = new Schema({
    title: String,
    images: [ImageSchema],
    geometry: mongoose.Schema.Types.Geometry,
    price: Number,
    description: String,
    location: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
})
CampgroundSchema.plugin(mongooseValidator)

CampgroundSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        })
    }
})

// CampgroundSchema.post('findOneAndUpdate', async function (doc) {
//     if (doc) {
//         console.log(doc)
//         console.log('middleware ran')
//     }
// })


module.exports = mongoose.model('Campground', CampgroundSchema)