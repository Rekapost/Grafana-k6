/*
90% of requests to be under 300ms,
export const options = {
  vus: 5, // Virtual Users
  duration: '10s', // Test Duration
  thresholds: {
    'http_req_duration{expected_response:true}': ['p(90) < 300'], // 90% of requests must be under 300ms
  },
};
This ensures that 90% of requests complete within 300ms. If this condition is not met, K6 will fail the test.
*/
import http from 'k6/http';
import { check, fail } from 'k6';

export const options = {
  vus: 5, // Number of Virtual Users
  duration: '10s', // Duration of the Test
  thresholds: {
    'http_req_duration': ['p(90) < 300'], // Ensure 90% of responses are under 300ms
  },
};

export default function () {
  const url = 'https://reqres.in/api/users?page=2'; // Sample API
  const res = http.get(url);

  // Check if the response time is within limit
  const isFastResponse = res.timings.duration < 300; 

  check(res, {
    'Response time is under 300ms': (r) => isFastResponse,
  });

  // Hard Assertion: If response time > 300ms, fail the test
  if (!isFastResponse) {
    fail(`Response time exceeded 300ms! Actual: ${res.timings.duration}ms`);
  }
}

/*For 500ms, change:
'http_req_duration': ['p(90) < 500']
if (res.timings.duration > 500) { fail(`Response time exceeded 500ms!`); }
For 200ms, change:
'http_req_duration': ['p(90) < 200']
if (res.timings.duration > 200) { fail(`Response time exceeded 200ms!`); }
*/

/*
iterations.....................: 1554    155.119391/s
vus............................: 5       min=5            max=5
vus_max........................: 5       min=5            max=5
http_req_duration..............: avg=31.56ms  min=19.3ms med=30.18ms max=124.49ms p(90)=37.29ms  p(95)=41.46ms
*/