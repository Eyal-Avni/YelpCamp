const Campground = require('../models/campground')
const { cloudinary } = require('../cloudinary')
const mapBoxToken = process.env.MAPBOX_TOKEN
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding')
const geocoder = mbxGeocoding({ accessToken: mapBoxToken })
const mongoose = require('mongoose')

const ObjectId = require('mongoose').Types.ObjectId;
function isValidObjectId(id){
    if(ObjectId.isValid(id)){
        if((String)(new ObjectId(id)) === id)
            return true;
        return false;
    }
    return false;
}

module.exports.index = async (req, res, next) => {
    const campgrounds = await Campground.find({})
    res.render('campgrounds/index.ejs', { campgrounds })
}

module.exports.renderNewForm = (req, res) => {
    res.render('campgrounds/new.ejs')
}

module.exports.createCampground = async (req, res, next) => {
    const geoData = await geocoder.forwardGeocode({
        query: req.body.campground.location,
        limit: 1
    }).send()
    const campground = new Campground(req.body.campground)
    campground.geometry = geoData.body.features[0].geometry
    campground.images = req.files.map(f => ({ url: f.path, filename: f.filename }))
    campground.author = req.user._id
    await campground.save()
    req.flash('success', 'Successfully made a new campground!')
    res.redirect(`/campgrounds/${campground._id}`)
}

module.exports.showCampground = async (req, res, next) => {
    let { id } = req.params
    if(!isValidObjectId(id)){
        req.flash('error', 'Campground not found!')
        return res.redirect(`/campgrounds`)
    }
    const campground = await Campground.findById(id).populate({
        path: 'reviews',
        populate: {
            path: 'author'
        }
    }).populate('author')
    if (!campground) {
        req.flash('error', 'Campground not found!')
        return res.redirect(`/campgrounds`)
    }
    res.render('campgrounds/show.ejs', { campground })
}

module.exports.renderEditForm = async (req, res, next) => {
    const { id } = req.params
    const campground = await Campground.findById(id)
    if (!campground) {
        req.flash('error', 'Campground not found!')
       return res.redirect(`/campgrounds`)
    }
    res.render('campgrounds/edit.ejs', { campground })
}

module.exports.editCampground = async (req, res, next) => {
    const { id } = req.params
    console.log(req.body)
    const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground })
    const images = req.files.map(f => ({ url: f.path, filename: f.filename }))
    campground.images.push(...images)
    await campground.save()
    if (req.body.deleteImages) {
        for (let filename of req.body.deleteImages) {
            await cloudinary.uploader.destroy(filename)
        }
        const trimedImagesForDelete = req.body.deleteImages.map((aImg) => aImg.trim());
        await campground.updateOne({ $pull: { images: { filename: { $in: trimedImagesForDelete } } } })
        console.log(campground.images)
    }
    req.flash('success', 'Campground successfully updated!')
    res.redirect(`/campgrounds/${campground._id}`)
}

module.exports.deleteCampground = async (req, res, next) => {
    const { id } = req.params
    const campground = await Campground.findByIdAndDelete(id)
    req.flash('success', 'Campground successfully deleted!')
    res.redirect(`/campgrounds`)
}