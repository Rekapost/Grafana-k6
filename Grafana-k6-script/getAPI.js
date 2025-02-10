import http from 'k6/http';   // k6 library , http module to get,put,post..
import {sleep,check} from 'k6';

export const options = {
  vus: 3, // virtual users- number of threads to execute the test
  duration: '30s', // test duration
  iterations: 20
};
const url = "https://gorest.co.in/public/v2/users/"

//https://gorest.co.in/my-account/access-tokens
let headers_api = {
  'Authorization': '86ecc2c3f7f7647f49f07b169414fc61ffdfd0f5385977c798e96de46d1fd5f6'
};
const params = {
  headers:{
  'Authorization': '86ecc2c3f7f7647f49f07b169414fc61ffdfd0f5385977c798e96de46d1fd5f6'
  }
}

//Load Testing Code
export default function(){
  //const response =   http.get('https://gorest.co.in/public/v2/users/',{headers:headers_api});
  const response =   http.get('url',params);
    sleep(1); // pause for 1 second between requests

check(response, {
  "status code validation": (response) => response.status == 200,
 });
}
//PS C:\Users\nreka\docker\Devops\k6\k6-script> k6 run getAPI.js
//http_req_receiving time= second between requests