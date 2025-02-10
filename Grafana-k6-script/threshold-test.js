import http from 'k6/http'

export const options = {
    vus: 2,
    iterations: 2,
    thresholds: {
        http_req_failed: ['rate<0.01'],
        http_req_duration: ['p(95)<200', 'p(90)<195','p(99)<300']
    }
}

const url = "https://k6.io"

export default function () {
    http.get(url)
}
/*
    ✓ http_req_duration..............: avg=85.26ms  min=85ms     med=85.26ms  max=85.52ms  p(90)=85.47ms  p(95)=85.49ms
        { expected_response:true }...: avg=85.26ms  min=85ms     med=85.26ms  max=85.52ms  p(90)=85.47ms  p(95)=85.49ms
    ✓ http_req_failed................: 0.00%  0 out of 2
    negative test : p(95)<50
    ERRO[0000] thresholds on metrics 'http_req_duration' have been crossed  
*/