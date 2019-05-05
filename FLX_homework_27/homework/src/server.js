const express = require('express');
const port = 3000;
const carRouter = require('./routes');
const app = express();

app.use('/car', carRouter);

app.listen(port, (err) => {
  if (err) {
    return console.log(err)
  }
  console.log(`server is listening on ${port}`)
})
