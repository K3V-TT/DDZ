
const fetch = require('node-fetch');

const url = 'https://tripadvisor16.p.rapidapi.com/api/v1/restaurant/searchRestaurants?locationId=304554';
const options = {
  method: 'GET',
  headers: {
    'x-rapidapi-key': '4b34154c75msha7b904a0e8c010dp12510djsn96d217884c5d',
    'x-rapidapi-host': 'tripadvisor16.p.rapidapi.com'
  }
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}

