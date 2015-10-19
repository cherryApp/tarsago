var http = require("http");
var postBody = '';
var server = http.createServer(function (request, response) {

  // Website you wish to allow to connect
  response.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  if (request.method == 'POST') {

    request.on('data', function (data) {
      console.log(data);
      postBody += data;
    });

    request.on('end', function () {

      console.log('postBody', postBody);

      var base64Data = postBody.split(";base64,/", "");

      require("fs").writeFileSync("out.jpg", base64Data[1], 'base64');

      response.writeHead(200, {
        "Content-Type": "text/html"
      });
      response.write("Save done");
      response.end();

    });
  }

});

server.listen(3555);
console.log("Server is listening :3555");

// file_put_contents( 'img/pofile.img', $_POST['profile'] );