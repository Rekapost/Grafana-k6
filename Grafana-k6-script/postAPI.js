import http from 'k6/http';   // k6 library , http module to get,put,post..
import {sleep} from 'k6';
import {check} from 'k6';        //check object for assertion

export const options = {
  vus: 1, // virtual users- number of threads to execute the test
  duration: '1s', // test duration
};

// Load payload at the global scope (init stage)
const data = open('./payload.json');

//Load Testing Code
export default function(){                     //default is prdefined function 
    const url= 'https://reqres.in/api/register/user';
/*    const payload = JSON.stringify({
        'email': 'eve.holt@reqres.in',
        'password': 'pistol'
    });
*/
    const params= {
        headers: {
            'Content-Type': 'application/json'
        },     
    };

   const response= http.post(url,data,params);
   console.log("**** Print Response****",response.body);
   //console.log("**** Print Payload****",payload);
   console.log("**** Print Payload****",data);
   check(response,{
    'is status 201': (response) => response.status === 201,
    'is response body has email': (response) => response.body.includes('eve.holt@reqres.in'),
    'is response body has password': (response) => response.body.includes('pistol'),
    'is response body has id': (response) => response.body.includes('id'),
    }); 
}
//PS C:\Users\nreka\docker\Devops\k6\k6-script> k6 run postAPI.js
/*Assertions:
✓ is status 201
✓ is response body has email
✓ is response body has password
✓ is response body has id
*/
//Passing vus and duration through command line:
// PS C:\Users\nreka\docker\Devops\k6\k6-script> k6 run --vus 1 --duration 1s postAPI.js