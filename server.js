const http = require('http');
const fs = require('fs');
const path = require('path');
const PORT = 3000;

const server = http.createServer((req, res) => {
    let filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url);
    let extName = path.extname(filePath);

    //------------------------ SET CONTENT TYPE ----------------------------------
    let contentType = 'text/html';
    if (extName === '.js') contentType = 'text/javascript';
    else if (extName === '.css') contentType = 'text/.css';

    //------------------------ READ and SERVE FILE ----------------------------------
    fs.readFile(filePath, (err, content) => {
        if (err){
            res.writeHead(404);
            res.end("404 not found.");
        } else {
            res.writeHead(200, { 'Content-Type': contentType});
            res.end(content);
        }
    });
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
})