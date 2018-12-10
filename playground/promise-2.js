const request = require('request');

var geocodeAddress = (address) => {
  return new Promise((resolve, reject) => {
    var encodedAddress = encodeURIComponent(address);

    request({
      url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyCjUgZq6Ik-j_fHu1WcmB3xx3_hek8k-bk`,
      json: true
    }, (error, response, body) => {
      // console.log(JSON.stringify(body, undefined, 2));
      // console.log(JSON.stringify(response, undefined, 2));

      if (!error && body.status === 'OK') {
        resolve({
          address: body.results[0].formatted_address,
          latitude: body.results[0].geometry.location.lat,
          longitude: body.results[0].geometry.location.lng
        });
      } else {
        reject('Unable to find that address.');
      }
    });
  });
};

geocodeAddress('19146').then((location) => {
  console.log(JSON.stringify(location, undefined, 2));
}, (errorMessage) => {
  console.log(errorMessage);
});
