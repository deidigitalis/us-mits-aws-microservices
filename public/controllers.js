var myApp = angular.module("StoreListApp",[]);

// Movies controller
myApp.controller('MovieCtrl',['$scope','$http',function($scope,$http){
	console.log("Movie Controller initialized");

	var refresh = function (){
		$http.get('/movies').success(function (movies){
			console.log('Movies data received successfully');
			$scope.movieList = movies;
		});
	}

	refresh();

	$scope.addMovie = function(){
		console.log("Inserting movie ...");
		$http.post('/movies', $scope.movie);
		refresh();
	}

	$scope.deleteMovie = function(title){
		console.log("Deleting movie with " + title);
		$http.delete('/movies/' + title);
		refresh();
	}

}]);

// Books controller
myApp.controller('BookCtrl',['$scope','$http',function($scope,$http){
	console.log("Book Controller initialized");

	var refresh = function (){
		$http.get('/books').success(function (books){
			console.log('Books data received successfully');
			$scope.bookList = books;
		});
	}

	refresh();

	$scope.addBook = function(){
		console.log("Inserting book ...");
		$http.post('/books', $scope.book);
		refresh();
	}

	$scope.deleteBook = function(title){
		console.log("Deleting book with " + title);
		$http.delete('/books/' + title);
		refresh();
	}

}]);

// Music controller
myApp.controller('MusicCtrl',['$scope','$http',function($scope,$http){
	console.log("Music Controller initialized");

	var refresh = function (){
		$http.get('/musics').success(function (musics){
			console.log('Musics data received successfully');
			$scope.musicList = musics;
		});
	}

	refresh();

	$scope.addMusic = function(){
		console.log("Inserting music ...");
		$http.post('/musics', $scope.music);
		refresh();
	}

	$scope.deleteMusic = function(title){
		console.log("Deleting music with " + title);
		$http.delete('/musics/' + title);
		refresh();
	}

}]);
