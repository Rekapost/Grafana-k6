import http from 'k6/http';   // k6 library , http module to get,put,post..
import {sleep} from 'k6';
import {check} from 'k6';        //check object for assertion
import { randomString } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import faker from 'https://cdnjs.cloudflare.com/ajax/libs/Faker/3.0.1/faker.min.js';
export const options = {
  vus: 3, // virtual users- number of threads to execute the test
  duration: '1s', // test duration
}

const url= 'https://reqres.in/api/users';

const params= {
        headers: {
            'Content-Type': 'application/json'
        },     
    }
const payload = JSON.stringify({
    //"name": randomString(8),             //'ab'+randomString(8)
    "name": faker.name.findName(),         
    "job": "QA"
    });

//Load Testing Code
export default function(){                     //default is prdefined function 
   const response= http.post(url,payload,params);
   console.log("**** Print Response****",response.body);
   console.log("**** Print Payload****",payload);
   
   check(response,{
    'is status 201': (response) => response.status === 201,
    'is response body has id': (response) => response.body.includes('id'),
    }); 
}