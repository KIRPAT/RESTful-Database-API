### TECHNICAL NOTES
---

**Express**
This API has been written using Express framework. Mostly for routing. If you need information about it:
https://expressjs.com/

**Morgan**
A middleware that logs HTTP requests to console.

**body-parser**
Parses http request bodies. (*No shit.*)

**Nodemon**
Nodemon watches every JS file in the project and restarts the server whenever a js file edited and saved (or just saved). So that the developer can focus on coding, instead of stopping and restarting server each time they edit a single line of code. Keeping the server console nearby is recommended, so that if there are any errors, it becomes easier to see.

There is a limit for allowed watches on a single Linux user. Nodemon is a node that watches the changes on files you write code and restarts the server. By doing that, it sometimes exceeds that watch limit. Remember, Nodemon has to watch every single file if they are edited or not. That's why you need to increase the allowed watch limit.

The shell command for that job;
sudo sysctl fs.inotify.max_user_watches=982222 && sudo sysctl -p

If you don't need Nodemon anymore, edit, "package.json", it's in the main folder.
Find the line,
"start": "nodemon server.js"
Change it to,
"start": "npm server.js"

