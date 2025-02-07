import http from 'k6/http';   // k6 library , http module to get,put,post..
import {sleep} from 'k6';
import {check} from 'k6';        //check object for assertion
export const options = {
  vus: 1, // virtual users- number of threads to execute the test
  duration: '1s', // test duration
};

//Load Testing Code
export default function(){                     //default is prdefined function 
    const url= 'https://reqres.in/api/register/user';
    const payload = JSON.stringify({
        'email': 'eve.holt@reqres.in',
        'password': 'pistol'
    });
    const params= {
        headers: {
            'Content-Type': 'application/json'
        },     
    };

   const res= http.post(url,payload,params);
   check(res,{
    'is status 201': (r) => r.status === 201,
    'is response body has email': (r) => r.body.includes('eve.holt@reqres.in'),
    'is response body has password': (r) => r.body.includes('pistol'),
    }); 
}
//PS C:\Users\nreka\docker\Devops\k6\k6-script> k6 run postAPI.js
/*Assertions:
✓ is status 201
✓ is response body has email
✓ is response body has password
*/
//Passing vus and duration through command line:
// PS C:\Users\nreka\docker\Devops\k6\k6-script> k6 run --vus 1 --duration 1s postAPI.js