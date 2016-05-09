var express = require('express');
var path = require('path');
var fs = require('fs');
var bodyParser = require('body-parser');
var DataStore = require('nedb');
var governify = require('governify');

var port = (process.env.PORT || 10000);

var app = express();

//Governify simple. 
//El portal es: http://portal.governify.io/app/#/portal?configurl=http:%2F%2Flabs.isa.us.es%2Fir%2Fsagoca%2Fawsmicroservices%2FPlans%2Fportal-config.json
//La API Key es multiPlan_C2_gr5_ag
//governify.control(app, {namespace: "gr5", defaultPath: ["/movies","/books", "/musics"]});

//Governify con nueva métrica de Movies
governify.control(app, {namespace: "gr5", defaultPath: ["/movies","/books", "/musics"], customMetrics: [
	{
		path: "/movies",
			method: "GET",
			term: 'MoviesTerm',
			metric: 'Movies',
			calculate: function(actualValue, req, res, callback){
				//asynchronousCalculation
				dbMovies.find({}, function(err,movies){
					callback(movies.length);
				});							
			}
	}]});

var dbMoviesFileName = path.join(__dirname,'movies.json');
var dbMovies = new DataStore({
	filename : dbMoviesFileName,
	autoload: true
});

var dbBooksFileName = path.join(__dirname,'books.json');
var dbBooks = new DataStore({
	filename : dbBooksFileName,
	autoload: true
});

var dbMusicsFileName = path.join(__dirname,'musics.json');
var dbMusics = new DataStore({
	filename : dbMusicsFileName,
	autoload: true
});

console.log('DB initialized');

dbMovies.find({},function (err,movies){

	if(movies.length == 0){
		console.log('Empty DB, loading initial data');

		dbMovies.insert({
			title: "Batman: El Regreso del Caballero Oscuro. Segunda Parte",
			year: 2013,
			poster: "http://ia.media-imdb.com/images/M/MV5BMTQ1Mjk1NTY2NV5BMl5BanBnXkFtZTgwMTA2MDEwNzE@._V1_SX300.jpg",
			summary: "The Batman has returned after a 10-year absence. The Gotham authorities want to arrest him. An old foe wants a reunion. The Feds want the Man of Tomorrow to put a stop to him.",
			director: "Jay Oliva",
			cast : "Peter Weller, Ariel Winter, Michael Emerson"
		});

		dbMovies.insert({
			title: "Vengadores: La era de Ultrón",
			year: 2015,
			poster: "http://ia.media-imdb.com/images/M/MV5BMTM4OGJmNWMtOTM4Ni00NTE3LTg3MDItZmQxYjc4N2JhNmUxXkEyXkFqcGdeQXVyNTgzMDMzMTg@._V1_SX640_SY720_.jpg",
			summary: "When Tony Stark and Bruce Banner try to jump-start a dormant peacekeeping program called Ultron, things go horribly wrong and it's up to Earth's Mightiest Heroes to stop the villainous Ultron from enacting his terrible plans.",
			director: "Joss Whedon",
			cast : "Samuel L. Jackson, Robert Downey Jr., James Spader, Paul Bettany, Chris Evans, Scarlett Johansson, Elizabeth Olsen, Jeremy Renner, Mark Ruffalo, Aaron Taylor-Johnson, Chris Hemsworth"
		});

		dbMovies.insert({
			title: "Batman v. Superman: El amanecer de la justicia",
			year: 2016,
			poster: "http://ia.media-imdb.com/images/M/MV5BNTE5NzU3MTYzOF5BMl5BanBnXkFtZTgwNTM5NjQxODE@._V1_SX640_SY720_.jpg",
			summary: "Fearing that the actions of Superman are left unchecked, Batman takes on the Man of Steel, while the world wrestles with what kind of a hero it really needs.",
			director: "Zack Snyder",
			cast : "Ben Affleck, Henry Cavill, Gal Gadot"
		});

		dbMovies.insert({
			title: "Matrix",
			year: 1999,
			poster: "http://ia.media-imdb.com/images/M/MV5BMTkxNDYxOTA4M15BMl5BanBnXkFtZTgwNTk0NzQxMTE@._V1_SX640_SY720_.jpg",
			summary: "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
			director: "Lana Wachowski, Lilly Wachowski",
			cast : "Keanu Reeves, Laurence Fishburne, Carrie-Anne Moss, Joe Pantoliano"
		});

	}else{
		console.log('DB has ' + movies.length + ' movies ');
	}

});

dbBooks.find({},function (err,books){

	if(books.length == 0){
		console.log('Empty DB, loading initial data');

		dbBooks.insert({
			title: "The Colour of Magic",
			year: 1983,
			cover: "https://upload.wikimedia.org/wikipedia/en/4/4d/The_Colour_of_Magic_%28cover_art%29.jpg",
			summary: "The Colour of Magic (also known as The Color of Magic) is a 1983 comic fantasy novel by Terry Pratchett, and is the first book of the Discworld series. The first printing of the British edition consisted of 506 copies.",
			author: "Terry Pratchett",
			genre : "Fantasy",
			isbn : "0-86140-324-X"
		});

		dbBooks.insert({
			title: "The Hound of the Baskervilles",
			year: 1902,
			cover: "https://upload.wikimedia.org/wikipedia/commons/3/3b/Cover_%28Hound_of_Baskervilles%2C_1902%29.jpg",
			summary: "The Hound of the Baskervilles is the third of the crime novels written by Sir Arthur Conan Doyle featuring the detective Sherlock Holmes.",
			author: "Michael Crichton",
			genre : "Science fiction, Techno-thriller, Horror fiction",
			isbn : "0-394-58816-9"
		});

		dbBooks.insert({
			title: "2099. Antología de Ciencia Ficción",
			year: 2012,
			cover: "http://leelibros.com/biblioteca/files/images/2099_0.jpg",
			summary: "La Colección Narrativas, de Ediciones Irreverentes (editorial fundada en 1999), llega a su número 100. Y lo hace con una compilación de relatos futuristas titulada 2099. Antología de Ciencia Ficción, coordinada por Félix Díaz y Miguel Ángel de Rus.",
			author: "Philip K. Dick, Arthur C. Clarke, Julio Verne, Carlos Sáiz Cidoncha,...",
			genre : "Science fiction, Narrative",
			isbn : "0-394-58816-9"
		});

	}else{
		console.log('DB has '+ books.length + ' books ');
	}

});

dbMusics.find({},function (err,musics){

	if(musics.length == 0){
		console.log('Empty DB, loading initial data');

		dbMusics.insert({
			title: "The Exodus",
			album: "Harry Potter & The Deathly Hallows. Part I",
			year: 2010,
			cover: "http://a2.mzstatic.com/us/r30/Music3/v4/aa/b6/1c/aab61c52-97a0-bae4-65a8-50da8db9a829/cover170x170.jpeg",
			artist: "Alexandre Desplat",
			compositor: "Alexandre Desplat",
			genre : "Sound Track",
			track : 15,
			notracks : 26,
			disc : 1,
			nodiscs : 2,
			duration : 97.593
		});

		dbMusics.insert({
			title: "A Way of Life",
			album: "The Last Samurai",
			year: 2004,
			cover: "http://a1.mzstatic.com/us/r30/Video/v4/f9/d9/1a/f9d91aa7-94a1-be34-417b-6e2cc9bd43dc/poster227x227.jpeg",
			artist: "Hans Zimmer",
			compositor: "Hans Zimmer",
			genre : "Sound Track",
			track : 1,
			notracks : 11,
			disc : 1,
			nodiscs : 1,
			duration : 483.787
		});

	}else{
		console.log('DB has '+ musics.length + ' musics ');
	}

});

app.use(express.static(__dirname+"/public"));
app.use(bodyParser.json());

// MOVIES

app.get('/movies',function(req,res){
	console.log('New GET request');

	dbMovies.find({},function (err,contacts){
		res.json(contacts);
	});
});

app.post('/movies',function(req,res){
	console.log('New POST request');
	console.log(req.body);
	dbMovies.insert(req.body);
	res.sendStatus(200);
});

app.get('/movies/:title',function(req,res){
	var n = req.params.title;
	console.log('New GET request for contact with name '+n);

	dbMovies.find({ type : 'movies', title : n},function (err,movies){
		console.log("Movies obtained: " + movies.length);
		if(movies.length  > 0){
			res.send(movies[0]);
		}else{
			res.sendStatus(404);
		}
	});
});

app.delete('/movies/:title',function(req,res){
	var n = req.params.title;
	console.log('New DELETE request for contact with title '+n);

	dbMovies.remove({ title: n},{}, function(err,numRemoved){
		console.log("Movies removed: "+numRemoved);
		if(numRemoved  == 1)
		res.sendStatus(200);
		else
		res.sendStatus(404);
	});
});

// BOOKS

app.get('/books',function(req,res){
	console.log('New GET request');

	dbBooks.find({},function (err,contacts){
		res.json(contacts);
	});
});

app.post('/books',function(req,res){
	console.log('New POST request');
	console.log(req.body);
	dbBooks.insert(req.body);
	res.sendStatus(200);
});

app.get('/books/:title',function(req,res){
	var n = req.params.title;
	console.log('New GET request for contact with name '+n);

	dbBooks.find({ type : 'books', title : n},function (err,books){
		console.log("books obtained: "+books.length);
		if(books.length  > 0){
			res.send(books[0]);
		}else{
			res.sendStatus(404);
		}
	});
});

app.delete('/books/:title',function(req,res){
	var n = req.params.title;
	console.log('New DELETE request for contact with title '+n);

	dbBooks.remove({ title: n},{}, function(err,numRemoved){
		console.log("books removed: "+numRemoved);
		if(numRemoved  == 1)
		res.sendStatus(200);
		else
		res.sendStatus(404);
	});
});

// MUSIC

app.get('/musics',function(req,res){
	console.log('New GET request');

	dbMusics.find({},function (err,contacts){
		res.json(contacts);
	});
});

app.post('/musics',function(req,res){
	console.log('New POST request');
	console.log(req.body);
	dbMusics.insert(req.body);
	res.sendStatus(200);
});

app.get('/musics/:title',function(req,res){
	var n = req.params.title;
	console.log('New GET request for contact with name '+n);

	dbMusics.find({ type : 'musics', title : n},function (err,musics){
		console.log("musics obtained: "+musics.length);
		if(musics.length  > 0){
			res.send(musics[0]);
		}else{
			res.sendStatus(404);
		}
	});
});

app.delete('/musics/:title',function(req,res){
	var n = req.params.title;
	console.log('New DELETE request for contact with title '+n);

	dbMusics.remove({ title: n},{}, function(err,numRemoved){
		console.log("musics removed: "+numRemoved);
		if(numRemoved  == 1)
		res.sendStatus(200);
		else
		res.sendStatus(404);
	});
});

app.listen(port);
console.log('Magic is happening on port '+port);
