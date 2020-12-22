// API calls - common module
import api from '.'

export default {
    getStoreDetailsPath: 'service=OrganizationService&command=getStoreDetails',
    getStoreDetails (storeNumber, resultCallback) {
        console.log('getStoreDetails api call for store: ' + storeNumber);
        const daysAhead = 30;

        // use GET call with querystring parameters
        const apiParameters = {
            path: 'getStoreDetails' 
                    + '?storeNumber=' + storeNumber 
                    + '&numberOfStoreHours=' + daysAhead
                    + '&lang=EN'
        };

        api.httpGet(apiParameters, (response) => {
            this.getStoreDetailsResponseHandler(response, resultCallback);
        });
    },
    getStoreDetailsResponseHandler (response, resultCallback) {
        let storeDetails = api.apiHelper.getApiResponseData(response);

        if (api.apiHelper.checkApiCallSuccess(response)) {
            // remove non-relevant data from response
            delete storeDetails.businessStatusModel;

            if (resultCallback && typeof resultCallback === 'function') {
                resultCallback(storeDetails);
            }   
        } else {
            if (resultCallback && typeof resultCallback === 'function') {
                // callback result with errors parsed
                resultCallback(storeDetails, 
                               api.apiHelper.getApiCallError(response),
                               api.apiHelper.getApiCallErrorCode(response)
                              );
            }   
        }
    },


    getStoreListPath: 'service=OrganizationService&command=getStoreList',
    getStoreList (bounds, resultCallback) {
        // set default bounds:  all of Canada
        let fromLat = 60;
        let fromLng= -150;

        let toLat = 39;
        let toLng = -50;

        // check custom bounds parameter
        if (bounds && bounds.fromLat && bounds.toLat && bounds.fromLng && bounds.toLng) {
            fromLat = bounds.fromLat;
            toLat = bounds.toLat;
            fromLng = bounds.fromLng;
            toLng = bounds.toLng;
        }

        console.log('getStoreList api call');

        // use GET call with querystring parameters
        const apiParameters = {
                                path: 'getStoreList'
                                        + '?from=' + fromLat + ',' + fromLng
                                        + '&to=' + toLat + ',' + toLng 
                                        + '&includeHours=w'
                                        + '&lang=EN'
                              };

        api.httpGet(apiParameters, (response) => {
            this.getStoreListResponseHandler(response, resultCallback);
        });
    },
    getStoreListResponseHandler (response, resultCallback) {
        this.pendingStoreListCall = false;
        if (api.apiHelper.checkApiCallSuccess(response)) {
            let stores = api.apiHelper.getApiResponseData(response).storeModel || [];

            // Arrayify
            if (!(stores instanceof Array)) {
                stores = [stores];
            }

            // add markers based on returned stores
            for (let m=0; m < stores.length; m++) {
                // for overriden store list call, some details come back in this call
                // build a partial details object in this case and link it to store element in array
                stores[m].label = stores[m].streetNumber + ' ' + stores[m].street;
                stores[m].details = {
                    storeNumber: stores[m].storeNumber,
                    streetNumber: stores[m].streetNumber,
                    street: stores[m].street,
                    city: stores[m].city,
                    province: stores[m].province,
                    postalCode: stores[m].postalCode,
                    hours: stores[m].hours,
                    partialDetail: true  // set flag to indicate this is not the full details and a call to getStoreDetails will need to be made later
                }
            }

            if (resultCallback && typeof resultCallback === 'function') {
                resultCallback(stores);
            }                   
        } else {
            if (resultCallback && typeof resultCallback === 'function') {
                // callback result with errors parsed
                resultCallback([], 
                               api.apiHelper.getApiCallError(response),
                               api.apiHelper.getApiCallErrorCode(response)
                              );
            }   
        }
    }

}
  