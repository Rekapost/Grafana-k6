import http from 'k6/http';   // k6 library , http module to get,put,post..
import {sleep} from 'k6';

export const options = {
  executor: 'per-vu-iterations', 
  vus: 100, // virtual users- number of threads to execute the test
  iterations: 100,
  maxDuration: '30s', // test duration
};

//Load Testing Code
export default function(){
    http.get('https://k6.io');
    sleep(1); // pause for 1 second between requests
}
/*
1. We're using 'per-vu-iterations' executor here which means that each VU (Virtual User) will run the test for the specified number of iterations.
2. The 'vus' option defines the number of VUs to run.
3. The 'iterations' option defines the number of times the test will run for each VU.
4. The 'maxDuration' option defines the maximum duration for the test.
*/
/*
 http_req_duration..............: avg=46.38ms  min=23.43ms med=34.22ms max=163.92ms p(90)=84.86ms  p(95)=106.27ms
 p(90)=84.86ms 90 users got response within 84.86ms
 p(95)=106.27ms  95 percent users got response within 106.27ms
*/ 