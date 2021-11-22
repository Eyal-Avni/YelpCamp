mapboxgl.accessToken = mapToken;
const mapboxClient = mapboxSdk({ accessToken: mapboxgl.accessToken });

const map = new mapboxgl.Map({
  container: "map", // container ID
  style: "mapbox://styles/mapbox/streets-v11",
  zoom: 8,
  trackResize: true,
});

map.on("load", async () => {
  const camp = campground;
  console.log(`before gecoder: ${camp.geometry.coordinates}`);
  mapboxClient.geocoding
    .forwardGeocode({
      query: camp.location,
      limit: 1,
    })
    .send()
    .then(async (res) => {
      if (res && res.body && res.body.features && res.body.features.length) {
        const newGeo = res.body.features[0].geometry;
        map.setCenter(newGeo.coordinates);
        new mapboxgl.Marker()
          .setLngLat(newGeo.coordinates)
          .setPopup(
            new mapboxgl.Popup({ offset: 25 }).setHTML(
              `<h3>${campground.title}</h3><p>${campground.location}</p>`
            )
          )
          .addTo(map);
      }
    });
});
