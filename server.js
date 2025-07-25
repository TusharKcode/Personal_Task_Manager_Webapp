const http = require('http');
const fs = require('fs');
const path = require('path');
const { error } = require('console');
const PORT = 3000;

const server = http.createServer((req, res) => {
    //----------------- HANDLE API ROUTE FOR TASKS ----------------------
    
    if(req.url === '/tasks' && req.method === 'GET'){
        fs.readFile('./data/tasks.json', 'utf-8', (err, data) => {
            if (err){
            res.writeHead(500);
            res.end(JSON.stringify({ error: 'Failed to read tasks' }));
        } else {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(data);
        }
        });
    }

    else if (req.url === '/tasks' && req.method === 'POST'){
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
            const task = JSON.parse(body);
            fs.readFile('/data/tasks.json', 'utf-8', (err, data) => {
                const tasks = data ? JSON.parse(data) : [];
                tasks.push(task);
                fs.writeFile('./data/tasks.json', JSON.stringify(tasks), err =>{
                    if(err){
                        res.writeHead(500);
                        res.end(JSON.stringify({ error: 'Failed to save task.' }));
                    } else {
                        res.writeHead(200, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ message: 'Task saved' }));
                    }
                });
            });
        });
    }
    //----------------- STATIC file serving (HTML, CSS, JS) -----------------
    else {
        let filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url);
        let extName = path.extname(filePath);

        let contentType = 'text/html';
        if (extName === '.js') contentType = 'text/javascript';
        else if (extName === '.css') contentType = 'text/css';

        fs.readFile(filePath, (err, content) => {
            if (err) {
                res.writeHead(404);
                res.end("404 not found.");
            } else {
                res.writeHead(200, { 'Content-Type': contentType });
                res.end(content);
            }
        });
    }
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});