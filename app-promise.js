const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Address to fetch weather for',
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

var encodedAddress = encodeURIComponent(argv.address);
var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyCjUgZq6Ik-j_fHu1WcmB3xx3_hek8k-bk`;

axios.get(geocodeUrl)
  .then((response) => {
    //console.log(response);
    if (response.data.status === 'ZERO_RESULTS') {
      throw new Error('Unable to find the address.');
    }
    var lat = response.data.results[0].geometry.location.lat;
    var lng = response.data.results[0].geometry.location.lng;
    var weatherUrl = `https://api.darksky.net/forecast/c8c16588581fb4e89b7d640e14878997/${lat},${lng}`;
    console.log(response.data.results[0].formatted_address);
    return axios.get(weatherUrl);
  })
  .then((response) => {
    var temperature = response.data.currently.temperature;
    var apparentTemperature = response.data.currently.apparentTemperature;

    console.log(`It's currently ${temperature} it feels like ${apparentTemperature}`);
  })
  .catch((e) => {
//console.log(e);
    if(e.response !== undefined && e.response.status === 404) {
      console.log('Unable to connect to server.');
    } else {
      console.log(e.message);
    }
  });
