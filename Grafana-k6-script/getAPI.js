import http from 'k6/http';   // k6 library , http module to get,put,post..
import {sleep} from 'k6';

export const options = {
  vus: 10, // virtual users- number of threads to execute the test
  duration: '30s', // test duration
};

//Load Testing Code
export default function(){
    http.get('https://k6.io');
    sleep(1); // pause for 1 second between requests
}
//PS C:\Users\nreka\docker\Devops\k6\k6-script> k6 run getAPI.js
//http_req_receiving time= second between requests