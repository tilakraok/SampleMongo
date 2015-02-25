//mongod --dbpath /usr/local/Cellar/mongodb/2.6.3/data/db
var http = require('http'),
    express = require('express'),
    path = require('path'),
    MongoDbServer = require('mongodb').Server,
    MongoClient = require('mongodb').MongoClient,
    dbSchema = require("./db-schema");

    var app = express();
    app.set('views', path.join(__dirname, 'views'));
	app.set('view engine', 'jade');
    app.use(express.bodyParser()); // <-- add
    var server1 = http.createServer(app);
    
 var mongotest123='localhost';
server.listen(5050);
// app.set('port', process.env.PORT || 3000); 
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');
// app.use(express.bodyParser()); // <-- add

var mongoHost = 'localhost'; //A
var mongoPort = 27017; 
var collectionDriver;
 
var mongoClient = new MongoClient(new MongoDbServer(mongoHost, mongoPort)); //B
mongoClient.open(function(err, mongoClient) { //C //mongod --dbpath /usr/local/Cellar/mongodb/2.6.3/data/db
  if (!mongoClient) {
      console.error("Error! Exiting... Must start MongoDB first");
      process.exit(1); //D
  }
});

app.use(express.static(path.join(__dirname, 'public')));
 
app.get('/', function (req, res) {
	console.log("Hi");
  res.send('<html><body><h1>Hello World</h1></body></html>');
});

app.get('/books', function (req, res) {
	dbSchema.getBooks(req, res);
});

app.get('/books/:id', function (req, res) {
	dbSchema.getBook(req, res);
});


app.get('/pages', function(req,res){
  dbSchema.getPages(req,res);
});

app.get('/users', function (req, res) {
  dbSchema.getUsers(req, res);
});

app.get('/users/:id', function (req, res) {
  dbSchema.getUsers(req, res);
});


app.get('/findBookFromPage', function (req, res) {
  dbSchema.findBookFromPage(req, res);
});


app.get('/findPageFromRecentAccessInfo/:id', function(req, res) {
  dbSchema.findPageFromRecentAccessInfo(req, res);
})

app.get('/findBookFromLearingParams', function(req, res) {
  dbSchema.findBookFromLearingParams(req,res);
})

app.get('/findUserAndBookFromLearingParams', function(req, res) {
  dbSchema.findUserFromLearingParams(req,res);
})

app.get('/userPreference/:id', function (req, res) {
  dbSchema.getUserPreferences(req, res);
});

app.get('/recentAccessInfo/:uid/:bookid', function (req,res) {
  dbSchema.getRecentAccessInfo(req, res);
})

app.get("/learningParams", function(req,res) {
  dbSchema.getLearingParams(req,res);
});

app.get("/highlight", function (req, res) {
  dbSchema.getHighlight(req,res);
})

app.get('/getHighlightFromPageAndUser/:pageId/:userId' , function(req, res) {
  dbSchema.getHighlightFromPageAndUser(req, res);
})

app.get('/getHighlightFromPage/:pageId' , function(req, res) {
  dbSchema.getHighlightFromPage(req, res);
})

app.get('/note', function (req, res) {
  dbSchema.getNotes(req, res);
})

app.get('/getNotesFromPage/:pageId', function (req, res) {
  dbSchema.getNotesFromPage(req, res);
})


app.get('/bookmark', function (req, res) {
  dbSchema.getBookmark(req, res);
})

app.get('/getBookmarksFromPage/:pageId', function (req, res) {
  dbSchema.getBookmarksFromPage(req, res);
})


app.post("/users", function(req, res) {
  var object = req.body;
  dbSchema.insertUser(object);
  res.send("");
});

app.post("/books", function(req, res) {
  var object = req.body;
  dbSchema.insertBook(object);
  res.send("");
});

app.post("/pages", function(req, res) {
  var object = req.body;
  dbSchema.insertPage(object);
  res.send("");
});


app.post("/userPreference", function (req, res){
  var object = req.body;
  dbSchema.insertUserPreferences(object);
  res.send("");
});


app.post("/recentAccessInfo", function (req, res) {
  var object = req.body;
  dbSchema.insertRecentAccessInfo(object);
  res.send("");
});

app.post("/learningParams", function(req, res) {
  var object = req.body;
  dbSchema.insertLearningParams(object);
  res.send("");
})

app.post("/highlight", function (req, res) {
  var object = req.body;
  dbSchema.insertHighlight(object);
  res.send("");
})

app.post("/note" , function (req,res) {
  var object = req.body;
  dbSchema.insertNote(object);
  res.send("");
})

app.post("/bookmark" , function (req, res) {
  var object = req.body;
  dbSchema.insertBookmark(object);
  res.send("");
});



