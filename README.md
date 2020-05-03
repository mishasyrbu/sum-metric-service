## Sum Metric Service

#### Demo GIF
![](service-demo.gif)

![](service-demo.png)

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the server.

### Test API

### `curl -H "Content-Type: application/json" --request POST --data '{ "value": "10" }' http://localhost:8000/metric/:key`

### `curl -H "Content-Type: application/json" --request GET http://localhost:8000/metric/:key/sum`
