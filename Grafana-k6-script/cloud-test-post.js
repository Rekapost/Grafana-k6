import http from 'k6/http';
import { check , sleep } from 'k6';

export const options = {
  vus: 2, // virtual users- number of threads to execute the test
  duration: '30s', // test duration
  cloud: {
    // Project: Default project
    projectID: 3745848,
    // Test runs with the same name groups test runs together.
    name: 'Cloud Post Test'
  }
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
//Home-> Testing & synthetics->Performance->Projects->click Default project -> click Cloud Post Test