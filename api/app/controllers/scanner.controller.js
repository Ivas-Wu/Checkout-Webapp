const { spawn } = require('child_process')
const { create:create_receipt } = require('./receipt.controller')
const { create:create_item } = require('./item.controller')
const db = require('../models');
const Receipt = db.receipt;
const Item = db.item;
const StoreName = 'Store';


exports.scan = (req, res) => {
  const userId = req.query.userId;
  let scanData
  // spawn new child process to call the python script
  const python = spawn('python3', ['./app/controllers/scanner_util/scanner.py'])
  // collect data from script
  python.stdout.on('data', function (data) {
      console.log('Pipe data from python script ...')
      scanData = data.toString();
  });
  
  // in close event we are sure that stream is from child process is closed
  python.on('close', (code) => {
      console.log(`Python API function ended with code: ${code}`)
      const json = JSON.parse(scanData);
      //create receipt
      console.log('Creating receipt with scanner info')
      const storename = json.Store;
      const category = "mock";
      const total = json.Total;
      const receipt = {
        store: storename,
        category: category,
        total: total,
        userId: userId,
      };
      //create items
      var itemList = []
      for (var key of Object.keys(json)) {
        if (json[key] == json.Store || key == "Total") {
          continue;
        } else {
          const item = {
            productName: key,
            category: "mock",
            price: json[key],
            userId: userId,
          };
          itemList.push(item)
        }
        
      }
      var returnJSON = {
        receipt: receipt,
        items: itemList
      }
      res.write(JSON.stringify(returnJSON))
      console.log("Receipt and items created")
      res.end();
      // const request = {
      //   body : receipt
      // }
      // var status = 100
      // const response = res
      //create_receipt(request, response);
  });
 };

