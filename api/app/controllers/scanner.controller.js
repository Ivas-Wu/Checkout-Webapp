const { spawn } = require('child_process');
const db = require('../models');
const fs = require('fs');
const { detect } = require('file-detector');
const sharp = require('sharp');

exports.scan = (req, res) => {
  const userId = req.query.userId;
  
  // Get the uploaded file buffer
  const fileBuffer = req.file.buffer;
  const tempFilePath = `./app/controllers/scanner_util/uploads/current_image.jpg`;

  sharp(fileBuffer)
  .jpeg()
  .toBuffer()
  .then(jpegBuffer => {
    fs.writeFileSync(tempFilePath, jpegBuffer);
  })
  .catch(err => {
    console.error(`Error converting image to JPEG: ${err}`);
  });

  let scanData;
  // spawn new child process to call the python script
  const python = spawn(
    'python3', 
    ['./app/controllers/scanner_util/scanner.py', tempFilePath]
  );
  // collect data from script
  python.stdout.on('data', function (data) {
    console.log('Pipe data from python script ...');
    scanData = data.toString();
  });

  //check error
  python.on('error', (err) => {
    console.error(err);
    res.status(500).send('An error occurred while parsing the image.');
  });

  // in close event we are sure that stream is from child process is closed
  python.on('close', (code) => {
    console.log(`Python API function ended with code: ${code}`);
    const json = JSON.parse(scanData);
    //create receipt
    const storename = json.Store;
    const category = 'mock';
    const total = json.Total;
    const receipt = {
      store: storename,
      category: category,
      total: total,
      userId: userId,
    };
    //create items
    var itemList = [];
    for (var key of Object.keys(json)) {
      if (json[key] == json.Store || key == 'Total') {
        continue;
      } else {
        const item = {
          productName: key,
          category: 'mock',
          price: json[key],
          userId: userId,
        };
        itemList.push(item);
      }
    }
    var returnJSON = {
      receipt: receipt,
      items: itemList,
    };
    
    // Delete the temporary file
    fs.unlinkSync(tempFilePath);
    res.write(JSON.stringify(returnJSON));
    res.end();
    
    // const request = {
    //   body : receipt
    // }
    // var status = 100
    // const response = res
    //create_receipt(request, response);
  });
};
