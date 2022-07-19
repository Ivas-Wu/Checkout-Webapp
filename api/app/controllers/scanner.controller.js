const { spawn } = require('child_process')

exports.scan = (req, res) => {
  const userId = req.query.userId;
  let dataToSend
  let largeDataSet = []
  // spawn new child process to call the python script
  const python = spawn('python3', ['./app/controllers/scanner_util/scanner.py'])
  // collect data from script
  python.stdout.on('data', function (data) {
      console.log('Pipe data from python script ...')
      //dataToSend =  data;
      largeDataSet.push(data)
  })

  // in close event we are sure that stream is from child process is closed
  python.on('close', (code) => {
      console.log(`child process close all stdio with code ${code}`)
      // send data to browser
      res.send(largeDataSet.join(''))
  })

//   add receipt to database at POST http://localhost:3000/api/receipts/, request has body of {
//     "total": 123.45,
//     "store": "Walmart",
//     "userId": 1
// } you will get total and store from receipt, user id from request

// loop through all items on list, add each one to db
//   add items to database at POST http://localhost:3000/api/items/, request has body of {
//     "price": 0.99,
//     "productName": "apple",
//     "userId": 1
//     "receiptId": 1
//     "numberOf": 4
// } you will get price and productName from receipt, user id from request, receipt id from response of receipt id creation
// NOTE numberOf is optional, if not passed it defaults to 1

// run http://localhost:3000/api/scanner?userId=1 to test, ?userId=1 is the query param 
}