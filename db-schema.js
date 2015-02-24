var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/reader');

//User schema
var userSchema = mongoose.Schema({ 
					_id: {type: Number, required: true}, 
	                uid: {type: String, required: true}, 
	                createdAt: {type: Date, required: true, default: Date.now},
	                updatedAt: {type: Date, required: true, default: Date.now},
	                last_synced_usn: Number,
	                learningParams: [{type: mongoose.Schema.Types.ObjectId, ref: 'LearningParams'}],
	                highlight: [{type: mongoose.Schema.Types.ObjectId, ref: "Highlights"}]
	            });
var Users = mongoose.model('Users', userSchema);

// Books schema
var bookSchema = mongoose.Schema({ 
					_id: {type: Number, required: true}, 
	                path: {type: String, required: true}, 
	                title:{type: String, required: true}, 
	                createdAt: {type: Date, required: true},
	                updatedAt: {type: Date, required: true}, 
	                zipMD5Hash: String, 
	                key: String,
	                page: [{type: mongoose.Schema.Types.ObjectId, ref: 'Pages'}],
	                learningParams: [{type: mongoose.Schema.Types.ObjectId, ref: 'LearningParams'}]
	            });
var Books = mongoose.model('Books', bookSchema);

//UserPreference Schema
var userPreferenceSchema = mongoose.Schema({
					_id: {type: Number, required: true},
					UserId: {type: Number, required: true}, 
					highlightColor: {type: String, required: true},
					fontSize: {type: Number, required: true}, 
					fontStyle: {type: String, required: true}, 
					createdAt: {type: Date, required: true, default: Date.now}, 
					updatedAt: {type: Date, required: true, default: Date.now},
					customHightlightColor: String, 
					language: {type: String, required: true, default: "en-US"}
				});
var UserPreference = mongoose.model('UserPreference',userPreferenceSchema);

//Device schema
var deviceSchema = mongoose.Schema({
					_id: {type: Number, required: true}, 
					UserId: {type: Number, required: true}, 
					deviceId: String, 
					createdAt:{type: Date, required: true},
					updatedAt: {type: Date, required: true}, 
					authToken: String, 
					deviceName: String
				});
var Device = mongoose.model('Device',deviceSchema);

//Pages schema 
var pagesSchema = mongoose.Schema({
					_id: {type: Number, required: true}, 
					pageSrc: {type: String, required: true}, 
					pageTitle: {type: String, required: true},
					bookId: {type: Number,required: true, ref: 'Books'},
					PageNumber: {type: String, required: true}, 
					createdAt: {type: Date, required: true},
					updatedAt: {type: Date, required: true},
					notes: {type: mongoose.Schema.Types.ObjectId, ref: "Notes"},
					highlight: [{type: mongoose.Schema.Types.ObjectId, ref: "Highlights"}],
					bookmarks: [{type: mongoose.Schema.Types.ObjectId, ref: "Bookmarks"}],
					recentAccessInfo: [{type: mongoose.Schema.Types.ObjectId, ref: "RecentAccessInfo"}]
				});
var Pages = mongoose.model('Pages',pagesSchema);

//Bookmarks schema
var bookmarksSchema = mongoose.Schema({
					_id:{type: Number, required: true}, 
					UserId: {type: Number, required: true},
					PageId: {type: Number, required: true, ref: "Pages"}, 
					title:{type: String, required: true}, 
					indexed:{type: Number, required: true}, 
					deleted:{type: Number, required: true}, 
					createdAt:{type: Date, required: true}, 
					updatedAt: {type: Date, required: true}, 
					usn:Number, 
					guid: String 
				});
var Bookmarks = mongoose.model('Bookmarks',bookmarksSchema);

//Highlight schema
var highlightsSchema = mongoose.Schema({
					_id: {type: Number, required: true}, 
					startOffset: {type: Number, required: true},
					endOffset: {type: Number, required: true}, 
					selectedText: {type: String, required: true}, 
					highlightComment: String, 
					colorOverride: String, 
					UserId: {type: Number, required: true, ref: "Users"}, 
					PageId: {type: Number, required: true, ref: "Pages"},
					indexed: {type: Number, required: true}, 
					deleted: {type: Number, required: true}, 
					createdAt: {type: Date, required: true},
					updatedAt: {type: Date, required: true}, 
					usn:Number, 
					guid: String
				});
var Highlights = mongoose.model('Highlights',highlightsSchema);

//LearningParams schema 
var learningParamsSchema = mongoose.Schema({
					_id: {type: Number, required: true}, 
					accessId: {type: String, required: true}, 
					BookId: {type: Number, ref: 'Books', required: true}, 
					UserId: {type: Number, ref: 'Users', required: true}, 
					devAccessId: String, 
					isAlive: {type: Number, required: true, default: 0}, 
					lastUserActivityTime: Date, 
					createdAt:{type: Date, required: true}, 
					updatedAt: {type: Date, required: true},
					isConnected: {type: Number, required: true, default: 0}
				});
var LearningParams = mongoose.model('learningParams',learningParamsSchema);

//Notes Schema 
var notesSchema = mongoose.Schema({
					_id: {type: Number, required: true},
					UserId: {type: Number, required: true},
					PageId: {type: Number, required: true, ref : "Pages"},
					comments: {type: String, required: true},
					indexed: {type: Number, required: true}, 
					deleted: {type: Number, required: true}, 
					createdAt: {type: Date, required: true},
					updatedAt: {type: Date, required: true}, 
					usn:Number, 
					guid: String
});
var Notes = mongoose.model('Notes', notesSchema);

//RecentAccessInfo schema
var recentAccessInfoSchema = mongoose.Schema({
					_id: {type: Number, required: true},
					UserId: Number,
					BookId: Number, 
					PageId: {type: Number, ref: "Pages"},
					createdAt:Date, 
					updatedAt: Date
				});
var RecentAccessInfo = mongoose.model('recentAccessInfo',recentAccessInfoSchema);

//PagePrintDetail Schema
var pagePrintDetailSchema = mongoose.Schema({
					_id: {type: Number, required: true}, 
					UserId: {type: Number, required: true},
					BookId: {type: Number, required: true}, 
					accessId: {type: String, required: true},
					pageSrc: {type: String, required: true},
					PrintedAt : {type: Date, required: true},
					createdAt: {type: Date, required: true}, 
					updatedAt: {type: Date, required: true}
				});
var PagePrintDetail = mongoose.model("PagePrintDetail", pagePrintDetailSchema);

//PagePrintingCounters Schema
var pagePrintingCountersSchema = mongoose.Schema({
					_id: {type: Number, required: true},  
					UserId: {type: Number, required: true},
					BookId: {type: Number, required: true},
					printCount: {type: Number, required: true},
					createdAt: {type: Date, required: true}, 
					updatedAt: {type: Date, required: true}
				});
var PagePrintingCounters = mongoose.model('PagePrintingCounters',pagePrintingCountersSchema);


// Users
var insertUser = function(objUser){
	objUser.createdAt = new Date();
	objUser.updatedAt = new Date();
	var user = new Users(objUser);
	user.save(function (err, user) {
	  if (err) return console.error(err);
	  console.log("Saved");
	});
};

var getUsers = function(req, res){
	Users.find({}, function(error, objs) {
		if (error) { res.send(400, error); }
		else { 
          res.send(objs);
         }
	});
};

// Books
var insertBook = function(objBook){
	objBook.createdAt = new Date();
	objBook.updatedAt = new Date();
	var book = new Books(objBook);
	book.save(function (err, book) {
	  if (err) return console.error(err);
	  console.log("book Saved");
	  var Page1 = new Pages({
	  	_id:1,
	  	pageSrc:"acbd.html",
	  	bookId: book._id,
	  	pageTitle:"xyz",
	  	PageNumber:"1",
	  	createdAt : new Date(),
	  	updatedAt : new Date()

	  });
	  Page1.save(function(error,result) {
	  	if(error) { console.error(error); }
	  	console.log("Page1 saved");
	  });
	});
};

var insertUserPreferences = function(objUserPreference) {
	objUserPreference.createdAt = new Date();
	objUserPreference.updatedAt = new Date();
	var userPref = new UserPreference(objUserPreference);
	userPref.save(function(err, userPref1 ) {
		if (err) return console.error(err);
		console.log("UserPreference Saved");
	});
}

var insertRecentAccessInfo = function ( objRecentInfo) {
	objRecentInfo.createdAt = new Date();
	objRecentInfo.updatedAt = new Date();
	var recentInfo = new RecentAccessInfo(objRecentInfo);
	recentInfo.save(function(err, recentInfo1) {
		if (err) return console.error(err);
		console.log("RecentAccessInfo saved");
	})
}

var insertHighlight = function(objHighlight) {
	objHighlight.createdAt = new Date();
	objHighlight.updatedAt = new Date();

	var highlight = new Highlights(objHighlight);
	highlight.save(function(err, results) {
		if (err) return console.error(err);
		console.log("Highlights saved");
	})
}

var getHighlight = function(req, res) {
	Highlights.find({}, function(err, result) {
		if (err) { res.send(400, err); }
		else { 
          res.send(result);
         }
	})
}

var getHighlightFromPageAndUser = function(req, res) {
	Highlights.find({PageId: req.params.pageId, UserId: req.params.userId}).populate("PageId UserId").exec(function(err, result) {
		if (err) { res.send(400, err); }
		else { 
          res.send(result);
         }
	})
}

var getHighlightFromPage = function(req, res) {
	Highlights.find({PageId: req.params.pageId}).populate("PageId").exec(function(err, result) {
		if (err) { res.send(400, err); }
		else { 
          res.send(result);
         }
	})
}

var getBooks = function(req, res){
	Books.find({}, function(error, objs) {
		if (error) { res.send(400, error); }
		else { 
          res.send(objs);
         }
	});
};

var getBook = function(req, res){
	Books.findOne({"id": req.params.id}, function(error, objs) {
		if (error) { res.send(400, error); }
		else { 
          res.send(objs);
         }
	});
};

var insertPage = function(objPage) {
	objPage.createdAt = new Date();
	var page = new Pages(objPage);
	page.save(function (err, book) {
	  if (err) return console.error(err);
	  console.log("Saved to pages");
	});
}

var getPages = function(req, res) {
	console.log("Inside get")
	Pages.find({}, function(error, objs) {
		if (error) { res.send(400, error); }
		else { 
          res.send(objs);
         }
	});
}


var findBookFromPage = function(req, res) {
	Pages.findOne({}).populate('bookId').exec(function(err, page){
		if (err) { res.send(400, err); }
		else {
			 console.log('The book title is::::: '+ page.bookId._id);
			 res.send(page.bookId);
		}
	})
}

var getUserPreferences = function(req, res) {
	UserPreference.find({id: req.params.id}, function(err, result) {
		if(err) {
			res.send(400, error);
		} else {
			res.send(result);
		}
	})
}

var getRecentAccessInfo = function(req, res) {
	RecentAccessInfo.find({UserId: req.params.uid , BookId: req.params.bookid},function(err, result) {
		if(err) {
			res.send(400, error);
		} else {
			res.send(result);
		}
	})
}

var getLearingParams = function (req, res) {
	LearningParams.find({}, function(err, result) {
		if(err) {
			res.send(400, error);
		} else {
			res.send(result);
		}
	})
}

var findPageFromRecentAccessInfo = function(req, res) {
	RecentAccessInfo.findOne({UserId: req.params.id}).populate("PageId").exec(function(err, result) {
		if (err) { res.send(400, err); }
		else {
			 console.log('The result is::::: '+ result.PageId);
			 res.send(result.PageId);
		}
	});
}


var insertLearningParams = function(objLearingParam) {
	objLearingParam.createdAt = new Date();
	objLearingParam.updatedAt = new Date();

	var learningParams = new LearningParams(objLearingParam);
	learningParams.save(function(err, result) {
		if (err) return console.error(err);
	  	console.log("Saved to LearningParams");
	});	
}

var findUserAndBookFromLearingParams = function(req, res) {
	LearningParams.findOne().populate("UserId BookId").exec(function(err, result) {
		if (err) { res.send(400, err); }
		else {
			 console.log('The result is::::: '+ result.UserId);
			 res.send(result.UserId);
		}
	});
}

var insertNote = function(objNote) {
	objNote.createdAt = new Date();
	objNote.updatedAt = new Date();

	var note = new Notes(objNote);
	note.save(function(err, results) {
		if (err) return console.error(err);
		console.log("Notes saved");
	})
}

var getNotes = function(req, res) {
	Notes.find({}, function(err, result) {
		if (err) { res.send(400, err); }
		else { 
          res.send(result);
         }
	})
}

var getNotesFromPage = function (req, res) {
	Notes.find({PageId: req.params.pageId}).populate("PageId").exec(function(err, result) {
		if (err) { res.send(400, err); }
		else { 
          res.send(result);
        }
	});
}


var insertBookmark = function(objBookmark) {
	objBookmark.createdAt = new Date();
	objBookmark.updatedAt = new Date();

	var bookmark = new Bookmarks(objBookmark);
	bookmark.save(function(err, results) {
		if (err) return console.error(err);
		console.log("bookmark saved");
	})
}

var getBookmark = function(req, res) {
	Bookmarks.find({}, function(err, result) {
		if (err) { res.send(400, err); }
		else { 
          res.send(result);
         }
	})
}

var getBookmarksFromPage = function (req, res) {
	Bookmarks.find({PageId: req.params.pageId}).populate("PageId").exec(function(err, result) {
		if (err) { res.send(400, err); }
		else { 
          res.send(result);
        }
	});
}



// var findBookFromLearingParams = function(req, res) {
// 	LearningParams.findOne().populate("BookId").exec(function(err, result) {
// 		if (err) { res.send(400, err); }
// 		else {
// 			 console.log('The result is::::: '+ result.BookId);
// 			 res.send(result.BookId);
// 		}
// 	});
// }

exports.insertUser = insertUser;
exports.getUsers = getUsers;
exports.insertBook = insertBook;
exports.getBooks = getBooks;
exports.getBook = getBook;
exports.insertPage = insertPage;
exports.getPages = getPages;
exports.findBookFromPage = findBookFromPage;
exports.insertUserPreferences = insertUserPreferences;
exports.getUserPreferences = getUserPreferences;
exports.insertRecentAccessInfo = insertRecentAccessInfo;
exports.getRecentAccessInfo = getRecentAccessInfo;
exports.findPageFromRecentAccessInfo = findPageFromRecentAccessInfo;
exports.insertLearningParams = insertLearningParams;
exports.getLearingParams = getLearingParams;
// exports.findBookFromLearingParams = findBookFromLearingParams;
exports.findUserAndBookFromLearingParams = findUserAndBookFromLearingParams;
exports.insertHighlight = insertHighlight;
exports.getHighlight = getHighlight;
exports.getHighlightFromPageAndUser = getHighlightFromPageAndUser;
exports.getHighlightFromPage = getHighlightFromPage;
exports.insertNote = insertNote;
exports.getNotesFromPage = getNotesFromPage;
exports.getNotes = getNotes;
exports.insertBookmark = insertBookmark;
exports.getBookmark = getBookmark;
exports.getBookmarksFromPage = getBookmarksFromPage;