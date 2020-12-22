// Helper functions 
// for parsing Visionmax api reposnses and formatting requests
export default {

    checkApiCallSuccess: function(response) {
      // Check api call success status based on VisionMax's expected results
      // returns true only if calls was successful and brought back approriate data
      if (!response) return false;
      if (!response.data) return false;
      if (!response.data.response) {
        if (!response.data.responseContent) return false;
        if (response.data.responseContent.status &&
            response.data.responseContent.status.toLowerCase() === 'success') return true;
        if (response.data.responseContent.businessStatusModel &&
            response.data.responseContent.businessStatusModel.status &&
            response.data.responseContent.businessStatusModel.status.toLowerCase() === 'success') return true;

      } else {
        if (!response.data.response.responseContent) return false;
        if (response.data.response.responseContent.status &&
            response.data.response.responseContent.status.toLowerCase() === 'success') return true;
        if (response.data.response.responseContent.businessStatusModel &&
            response.data.response.responseContent.businessStatusModel.status &&
            response.data.response.responseContent.businessStatusModel.status.toLowerCase() === 'success') return true;
      }
        
      return false;
    },

    checkApiHeaderSuccess: function(response) {
      // returns true only if api call header returns success
      if (!response) return false;
      if (!response.data) return false;
      if (!response.data.response) {
        if (!response.data.responseHeader) return false;
        if (response.data.responseHeader.result &&
            response.data.responseHeader.result.toLowerCase() === 'success') return true;

      } else {
        if (!response.data.response.responseHeader) return false;
        if (response.data.response.responseHeader.result &&
            response.data.response.responseHeader.result.toLowerCase() === 'success') return true;
      }
      
      return false;
    },


    getApiResponseData: function(response) {
      // Return relevant data object, despite some variations in response from API
      // if anything is wrong it returns empty object
      if (!response) return {};
      if (!response.data) return {};
      if (!response.data.response) {
        if (!response.data.responseContent) return {};
        
        return response.data.responseContent;
      } else {
        if (!response.data.response.responseContent) return {};
        
        return response.data.response.responseContent;
      }
    },


    getApiCallError: function(response) {
      // Check api response for any error that may have come back from the server
      // and return the error string
      let errMsg = null;

      if (!response) return errMsg;
      if (!response.data) return errMsg;
      if (!response.data.response) {
        if (response.data.responseContent) {
          if (response.data.responseContent.businessStatusModel && 
              response.data.responseContent.businessStatusModel.screenMsg) {
                errMsg = response.data.responseContent.businessStatusModel.screenMsg;
          }
          if (response.data.responseContent.screenMsg) {
                errMsg = response.data.responseContent.screenMsg;
          }
        }

        // if no error code found in Content check Header too
        if (!errMsg && response.data.responseHeader && response.data.responseHeader.reason) {
          errMsg = response.data.responseHeader.reason;
        }          

      } else {
        if (response.data.response.responseContent) {
          if (response.data.response.responseContent.businessStatusModel && 
              response.data.response.responseContent.businessStatusModel.screenMsg) {
                errMsg = response.data.response.responseContent.businessStatusModel.screenMsg;
          }
          if (response.data.response.responseContent.screenMsg) {
                errMsg = response.data.response.responseContent.screenMsg;
          }
        }

        // if no error code found in Content check Header too
        if (!errMsg && response.data.response.responseHeader && response.data.response.responseHeader.reason) {
          errMsg = response.data.response.responseHeader.reason;
        }          
      }

      return errMsg;
    },

    getApiCallErrorCode: function(response) {
      // Check api response for any error that may have come back from the server
      // and return the error string
      let errMsg = null;

      if (!response) return errMsg;
      if (!response.data) return errMsg;
      if (!response.data.response) {
        if (response.data.responseContent) {
          if (response.data.responseContent.businessStatusModel && 
              response.data.responseContent.businessStatusModel.screenMsgCode) {
                errMsg = response.data.responseContent.businessStatusModel.screenMsgCode;
          }
          if (response.data.responseContent.screenMsgCode) {
                errMsg = response.data.responseContent.screenMsgCode;
          }
        }

        // if no error code found in Content check Header too
        if (!errMsg && response.data.responseHeader && response.data.responseHeader.errCode) {
          errMsg = response.data.responseHeader.errCode;
        }

      } else {
        if (response.data.response.responseContent) {
          if (response.data.response.responseContent.businessStatusModel && 
              response.data.response.responseContent.businessStatusModel.screenMsgCode) {
                errMsg = response.data.response.responseContent.businessStatusModel.screenMsgCode;
          }
          if (response.data.response.responseContent.screenMsgCode) {
                errMsg = response.data.response.responseContent.screenMsgCode;
          }
        }

        // if no error code found in Content check Header too
        if (!errMsg && response.data.response.responseHeader && response.data.response.responseHeader.errCode) {
          errMsg = response.data.response.responseHeader.errCode;
        }
      }

      return errMsg;
    }
  }