const express = require('express')
const app = express();
const port = 8000;

app.use('/path1', express.static(__dirname + '/path1'));
app.use('/path2', express.static('path2'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
  console.log(`Executed at ${process.cwd()}`)
});
