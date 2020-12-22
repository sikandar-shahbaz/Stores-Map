import axios from 'axios';
import Calls from './calls.js'
import Helper from './helper.js'

const API_URL = 'https://uatiosapi.swisschalet.com/CaraAPI';
axios.defaults.baseURL = API_URL;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';


// external functions and properties
////////////////////////////////////
export default {
  apiUrl: API_URL,

  // sub-components
  calls: Calls,
  apiHelper: Helper,  

  apiObject (method, apiParameters)  {
    // build and return api object to send for http request to axios, mixin and format apiParameters
    ///////////////////////////////////

    method = method || "get";
    apiParameters = apiParameters || {};

    const pathSuffix = apiParameters.path || '';

    let objApiCall = {
      method: method
    }

    if (method == 'get') {
      // set GET method url path for api call
      objApiCall.url = this.apiUrl + '/APIService/' + pathSuffix;
    }

    return objApiCall
  },

  httpGet (apiParameters, callback) {
    let apiObject = this.apiObject('get', apiParameters);
    axios(apiObject)
    .then((response) => {
		  if (response.status !== 200) {  
        console.log('Error - Status Code: ' + response.status);  
        return;  
      }
      
      if (typeof callback === "function") {
        callback(response);
      }
	  })  
    .catch(function (error) {
      console.log(error);
    });
  }

}
