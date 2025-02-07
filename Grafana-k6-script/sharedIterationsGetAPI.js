import http from 'k6/http';   // k6 library , http module to get,put,post..
import {sleep} from 'k6';

export const options = {
  executor: 'shared-iterations', 
  vus: 10, // virtual users- number of threads to execute the test
  iterations: 200,
  maxDuration: '30s', // test duration
};

//Load Testing Code
export default function(){
    http.get('https://k6.io');
    sleep(1); // pause for 1 second between requests
}

//k6 run sharedIterationsGetAPI.js
// iterations.....................: 200    8.973304/s
// http_req_duration..............: avg=50.46ms min=20.49ms