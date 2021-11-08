if (process.env.NODE_END !== 'production') {
    require('dotenv').config()
}

const mongoose = require('mongoose')
const Campground = require('../models/campground')
const User = require('../models/user')
const cities = require('./cities')
const { places, descriptors } = require('./seedHelpers')
const mapBoxToken = 'pk.eyJ1IjoiZXlhbGF2bmkiLCJhIjoiY2t2Z3BmMWZwNDI2MDJwbHUxb2lhajRsMCJ9.VY_JOZsQATUesmjb_KGnhw'
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding')
const geocoder = mbxGeocoding({ accessToken: mapBoxToken })


mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

const db = mongoose.connection
db.on('error', console.error.bind(console, "connection error:"))
db.once("open", () => {
    console.log("Database connected")
})

const sample = (array) => array[Math.floor(Math.random() * array.length)]

const seedDB = async () => {
    await Campground.deleteMany({})
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000)
        const price = Math.floor(Math.random() * 50)
        const camp = new Campground({
            author: '618944819f065032503dbd92',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            geometry: { type: 'Point', coordinates: [ 0, 0 ] },
            title: `${sample(descriptors)} ${sample(places)}`,
            images: [
                {
                    url: 'https://res.cloudinary.com/dvb3upbve/image/upload/v1636357519/YelpCamp/PRSF_130326_APAZ_179_2x1_falpq4.jpg',
                    filename: 'YelpCamp/PRSF_130326_APAZ_179_2x1_falpq4'
                },
                {
                    url: 'https://res.cloudinary.com/dvb3upbve/image/upload/v1636357517/YelpCamp/Campgrounds-in-Ohio_uprb5s.jpg',
                    filename: 'YelpCamp/Campgrounds-in-Ohio_uprb5s'
                },
                {
                    url: 'https://res.cloudinary.com/dvb3upbve/image/upload/v1636357517/YelpCamp/NFP_Campground_A80U1788_db6yd3.jpg',
                    filename: 'YelpCamp/NFP_Campground_A80U1788_db6yd3.jpg'
                },
                {
                    url: 'https://res.cloudinary.com/dvb3upbve/image/upload/v1635677584/YelpCamp/zyhypq4iostgu9t5ny2k.jpg',
                    filename: 'YelpCamp/zyhypq4iostgu9t5ny2k'
                }
            ],
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean a orci ac metus venenatis fringilla nec eget odio. Mauris a egestas neque. Sed sed imperdiet nunc. Pellentesque vehicula turpis id interdum dapibus. Ut at quam dictum, tempus mi vitae, eleifend tortor. Vivamus gravida dolor elementum velit finibus elementum. Cras vel nibh a mauris dictum interdum. Sed eu eleifend ante, nec ullamcorper nisi. Curabitur consectetur felis in accumsan interdum.',
            price: price
        })
        const geoData = await geocoder.forwardGeocode({
            query: camp.location,
            limit: 1
        }).send()
        camp.geometry = geoData.body.features[0].geometry
        await camp.save()
    }
}
seedDB().then(() => {
    console.log('Finished seeding!')
    mongoose.connection.close()
})