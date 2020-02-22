                       WebDevelopment(FullStack Developer)
1)I used angular as frontend and node.js, express.js as backend and mongodb as database.
2)To run the project open command prompt and type cd task. It will enter into that folder.
3)After that type (code .).  code . will open the angular project.
4)Then type npm install to import all angular functionalities.
5)After that type ng serve -open to run the angular project.


For backend
1) Open other cmd and type cd task.
2) And to run the project type nodemon server.js

In case you are not able to access database then go to https://www.mongodb.com/
1) Register there.
2) Connect it with your database.
3) In my app.js file replace my name sameer with your name and my key e.g G5RJ7XAkqAPo3AQ0 with your key.

FOR E.G: mongoose.connect("mongodb+srv://Sameer:G5RJ7XAkqAPo3AQ0@cluster0-a79ii.mongodb.net/node-angular?retryWrites=true"


In backend all backend files are present.
In src folder all angular files are present.

In angular 
1)I have created 1 post folder to create post and post blog post .
2) there are two component 1 to create post i.e post-create 
and 1 to create to create list of post i.e post list component.
3) There is a header post which contain four links i.e new messages,
login, signin, signup and new post.
4) There is one error component to display error.
5) There is one auth folder which contain signup and login component.
6) there are auth service in auth folder and post service in post folder 
to connect with backend.



For node.js(Backend)
1) There is a backend folder which contains
a) middleware
b) models
c) routes
d) app.js

In middleware there is checkauth file to check authentication.

In models there are two files post.js and user.js 
a) in post there is a post schema for database.
b) in user there is a user schema for database.

in routes there i define get, post , delete and put request.
app.js file is use to export express and other important package.

and server.js work as cors to connect front end and backend.




  





