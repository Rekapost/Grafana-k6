import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  vus: 10,
  duration: '30s',
  cloud: {
    // Project: Default project
    projectID: 3745848,
    // Test runs with the same name groups test runs together.
    name: 'Cloud Test'
  }
};

export default function() {
  http.get('https://quickpizza.grafana.com');
  sleep(1);
}

//k6 cloud login --token 297e6ddaf91a38e86ccb560e13bac26aca1c008807f8ac1
//k6 cloud cloud-test.js  
//Home-> Testing & synthetics->Performance->Projects->click Default project -> click cloud test
//https://rekapost.grafana.net/a/k6-app/runs/3957216