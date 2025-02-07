import http from 'k6/http';   // k6 library , http module to get,put,post..
import {sleep} from 'k6';

export const options = {
  executor: 'per-vu-iterations', 
  vus: 10, // virtual users- number of threads to execute the test
  iterations: 200,
  maxDuration: '30s', // test duration
};

//Load Testing Code
export default function(){
    http.get('https://k6.io');
    sleep(1); // pause for 1 second between requests
}

//k6 run perVUiterationsGetAPI.js
//iterations.....................: 200    9.220433/s
//http_req_duration..............: avg=41.73ms  min=21.53ms
//* default: 200 iterations shared among 10 VUs (maxDuration: 10m0s, gracefulStop: 30s)