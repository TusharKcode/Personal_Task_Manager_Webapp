const http = require('http');
const fs = require('fs');
const path = require('path');
const PORT = 3000;

const server = http.createServer((req, res) => {
    if(req.method === 'POST' && req.url === '/tasks'){
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            const task = JSON.parse(body);
            const tasksFile = path.join(__dirname, 'data', 'tasks.json');

            fs.readFile(tasksFile, 'utf-8', (err, data) => {
                let tasks = [];
                if(!err && data) {
                    tasks = JSON.parse(data);
                }

                tasks.push(task);

                fs.writeFile(tasksFile, JSON.stringify(tasks, null, 2), err => {
                    if (err){
                        res.writeHead(500);
                        return res.end('Failed to save task')
                    }

                    res.writeHead(200, {'Content-Type': 'application/json'});
                    res.end(JSON.stringify({message: 'Task saved'}));
                });
            });
        });
        return;
    }

    //----------------- STATIC file serving (HTML, CSS, JS) -----------------
    let filePath = path.join(__dirname, 'public', req.url === '/')
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
})