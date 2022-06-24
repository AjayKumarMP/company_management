import axios from "axios";

const httpClient = axios.create({
  baseURL: "http://localhost:8080/api/company",
  headers: [""],
});

const users = [{ "id": "62a1940f6d57f062b84ea7df", "userName": "basava", "isAdmin": "true", "isActive": "true", "createdDate": "2022-06-03T10:01:23:985Z", "updatedDate": "2022-06-23T17:09:17:655Z", "createdBy": "kemparaja", "updatedBy": "kemparaja" }, { "id": "62af4236b5f0fa3844693fac", "userName": "kiran", "isAdmin": "false", "isActive": "false", "createdDate": "2022-06-19T15:35:18:711Z", "updatedDate": "2022-06-21T17:09:54:706Z", "createdBy": "kemparaja", "updatedBy": "kemparaja" }];

export const GET = (url, params = {}, headers = {}) => {
  // return httpClient.get(url, {
  //   params,
  //   headers,
  // });
  return new Promise((res, rej) => {
    switch (url) {
      case 'APITest/users': {
        console.log(users);
        res(
          { "responseData": users }
        )
        break;
      }
      case 'APITest/user': {
        res({
          jwtToken: "test",
          isAdmin: true
        })
        break;
      }
      case 'APITest/getResults': {
        res({
          "responseData": [
            {
              "id": "628c7eb3ef20164f48261449",
              "insightName": "LOW_BALANCE_WARNING",
              "executionDate": "2022-05-23T19:44:03:000Z",
              "executionSource": "LOCAL",
              "buildInfo": "FBFeaturePlus_477",
              "testStatus": "FAILED",
              "testFailureReason": "java.lang.AssertionError: Account addition failed with status :: FAILED; Status Message :: LOGIN_FAILED",
              "pmTool": "JIRA",
              "testMethod": "setUp",
              "testClass": "com.yodlee.app.yodleeApi.Insights.Notifications.V2.TestGetInsightsForLowBalanceWarning",
              "executionHostName": "IN-L1588",
              "executionEnvironment": "Wellregu"
            }
          ]
        })
        break;
      }
      case 'APITest/getMetadata': {
        res({
          "responseData": {
      
              "insightNamesList": [
      
                  "LOW_BALANCE_WARNING",
      
                  "BILL_PAID",
      
                  "FINANCIAL_FEES",
      
                  "LOW_BALANCE_WARNING_ALL_ACCOUNTS",
      
                  "LARGE_DEPOSIT"
      
              ],
      
              "buildInfoList": [
      
                  "FBFeaturePlus_477",
      
                  "FBFeaturePlus_476",
      
                  "FBFeaturePlus_535",
      
                  "insightsdeveloperFBfeatureplus-releasevalue-541-00-build-v1",
      
                  "insightsdeveloperFBfeatureplus-releasevalue-542-00-build-v1"
      
              ]
      
          }
      
      })
      break;
      }
      default: return null;
    }
  })
};

export const POST = ({ url, requestBody, headers = {} }) => {
  // return httpClient.post(url, requestBody, {
  //   headers,
  // });
  return new Promise((res, rej) => {
    switch (url) {
      case 'authenticate': {
        res({
          jwtToken: "test",
          isAdmin: true
        })
        break;
      }
      case 'APITest/user': {
        users.push({...requestBody, 
           "id": "62a1940f6d57f062b84ea7df", "isActive": true, "createdDate": "2022-06-03T10:01:23:985Z", "updatedDate": "2022-06-23T17:09:17:655Z", "createdBy": "kemparaja", "updatedBy": "kemparaja" });
        res({
          jwtToken: "test",
          isAdmin: true
        })
        break;
      }
      default: return null;
    }
  })
};

export const PUT = ({ url, requestBody, headers = {} }) => {
  return httpClient.put(url, requestBody, {
    headers,
  });
};

export const DELETE = (url, params = {}, headers = {}) => {
  return httpClient.delete(url, {
    headers,
    params,
  });
};


export const setDefaultHeaders = (headerName, headerValue) => {
  httpClient.defaults.headers.common[headerName] = headerValue;
};

export const removeDefaultHeaders = (headerName) => {
  httpClient.defaults.headers.common[headerName] = "";
};