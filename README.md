## ChatApp
Simple chat app build with node.js, express, redis, socket.io and compatible with running app with multiple instances such as nginx load balancing.

Project features
1. It can run while multiple instances running.
2. Users nickname stored in session and shared via Redis.
3. Messages and "typing" information is recieving and broadcasting via socket.io
4. When you logout all previous messages will be lost

## Running 

* Clone the app
* `cd project_folder`
* `npm install` 
* `node server.js` to run it in node or  `npm run dev` to run with nodemon 
* you might start it with `pm2 start ecosystem.config.js` will start 4 instances starting from on 3000 to 3003 ports

## Nginx Conf

To configure your ngnix proxy host see [localhost.conf](localhost.conf) under ngnix/conf/sites-enabled
