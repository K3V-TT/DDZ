

/*search airports

const fetch = require('node-fetch');

const url = 'https://tripadvisor16.p.rapidapi.com/api/v1/flights/searchAirport?query=london';
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
}*/


/*get filter (flights/airports)

const fetch = require('node-fetch');

const url = 'https://tripadvisor16.p.rapidapi.com/api/v1/flights/getFilters?sourceAirportCode=BOM&destinationAirportCode=DEL&itineraryType=ONE_WAY&classOfService=ECONOMY';
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
}*/

/*Search flights

const fetch = require('node-fetch');

const url = 'https://tripadvisor16.p.rapidapi.com/api/v1/flights/searchFlights?sourceAirportCode=BOM&destinationAirportCode=DEL&itineraryType=ONE_WAY&sortOrder=ML_BEST_VALUE&numAdults=1&numSeniors=0&classOfService=ECONOMY&pageNumber=1&nearby=yes&nonstop=yes&currencyCode=USD&region=USA';
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
*/

/*Search airports Multicity
const fetch = require('node-fetch');

const url = 'https://tripadvisor16.p.rapidapi.com/api/v1/flights/searchFlightsMultiCity?legs=%5B%7B%22sourceAirportCode%22%3A%22BOS%22%2C%22destinationAirportCode%22%3A%22LON%22%2C%22date%22%3A%222025-10-18%22%7D%2C%7B%22sourceAirportCode%22%3A%22LON%22%2C%22destinationAirportCode%22%3A%22BOS%22%2C%22date%22%3A%222025-10-26%22%7D%5D&classOfService=ECONOMY&sortOrder=ML_BEST_VALUE&currencyCode=USD';
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
*/

/*Search hotel location

const fetch = require('node-fetch');

const url = 'https://tripadvisor16.p.rapidapi.com/api/v1/hotels/searchLocation?query=Panama';
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
}*/

/*get hotel filters

const fetch = require('node-fetch');

const url = 'https://tripadvisor16.p.rapidapi.com/api/v1/hotels/getHotelsFilter';
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

*/

/* Search hotels

const fetch = require('node-fetch');

const url = 'https://tripadvisor16.p.rapidapi.com/api/v1/hotels/searchHotels?pageNumber=1&currencyCode=USD';
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

*/

/* search hotel by location (uses the search location api)

const fetch = require('node-fetch');

const url = 'https://tripadvisor16.p.rapidapi.com/api/v1/hotels/searchHotelsByLocation?latitude=40.730610&longitude=-73.935242&pageNumber=1&currencyCode=USD';
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

*/

/* get hotel details

const fetch = require('node-fetch');

const url = 'https://tripadvisor16.p.rapidapi.com/api/v1/hotels/getHotelDetails?currency=USD';
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

*/

/* search car rentals location

const fetch = require('node-fetch');

const url = 'https://tripadvisor16.p.rapidapi.com/api/v1/rentals/searchLocation?query=new';
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

*/








