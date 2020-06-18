# Advertisement Request Enhancer - Interview Project Assignment 

### A NodeJS API to enrich Incoming Advertisement requests
#### Presented as part of an interview process in 2018
- NodeJS
- Express
- Validation of **request** and **response** using [@hapi/joi](https://github.com/hapijs/joi)
using schemas architecturial approach.
- Find geolocation using MaxMind based module [geoip-lite](https://github.com/bluesmoon/node-geoip)
- Monitor status and performance using [express-status-monitor](https://github.com/RafalWilinski/express-status-monitor) (Used for demo purpose, **open it at: localhost:3000/status**)
- Process management + Clustering on logical cores using [pm2](https://github.com/Unitech/pm2). **PS: must install pm2 globall to be able to run this app**

### run
> npm start

Will run project in clustered mode (pm2 - will use all available logical cores)

> Runs on port: 3000

Check POSTMAN collection to test.

### Test
> npm test

or for auto-reload

> npm run test-watch

Runs integration tests (using mocha,chai and supertest)

> Runs on port: 3333

### Stop pm2 clusters
> npm run stop-pm2

# Benchmarking using Apache benchmark

## Test for 1 request
> ab -p latency-test-request-body.txt -T application/json -c 1 -n 1 -k -H "Accept-Encoding: gzip, deflate" http://localhost:3000/ad/dispatch

➔ (My tests) Got on average: time = 246.587ms ie < 500ms

## Test with some more concurrency: 100 requests with 8 concurent at a time
> ab -p latency-test-request-body.txt -T application/json -c 8 -n 100 -k -H "Accept-Encoding: gzip, deflate" http://localhost:3000/ad/dispatch

➔ (My tests) For 100 requests - running 8 at a time - the average time per request is 214.135ms ie < 500ms

## Test with higher concurrency and check latency: 200 requests with 20 concurrent
> ab -p latency-test-request-body.txt -T application/json -c 20 -n 200 -k -H "Accept-Encoding: gzip, deflate" http://localhost:3000/ad/dispatch

> **Output**<br>
Time taken for tests: 3.486 seconds <br>
Time per request: 348.634 [ms] (mean)<br>
Time per request: 17.432 [ms] (mean, across all concurrent requests)

➔ **348.634 ms** This is the average amount of time it took for a concurrent group of requests to process. Ie: (sum of ms of 20 requests)/20

➔ **17.432ms** This tells you the average time it took a single request to process by itself. We have 200 requests and time taken for test: 3.486 seconds (3486ms).
>3486ms/200 ~= 17.43 ms

## Can this API run an average of 50 requests per second over an extended period of time?

**Tried using 10000 requests with 50 running concurrently**

> ab -p latency-test-request-body.txt -T application/json -c 50 -n 10000 -k -H "Accept-Encoding: gzip, deflate" http://localhost:3000/ad/dispatch

> **Output** <br>
Requests per second: 43.01 [#/sec] (mean)

➔ On average it is 43 requests / second which is not too far from 50. **I ran this same test 5 times** and it ranged between **43** and **48.2** . Keep in mind there are several side factors that play a role in the process; for example the device that you are using, its cpu, rams, gpu or not etc…
