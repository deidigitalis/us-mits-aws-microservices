var myApp = angular.module("StoreListApp",[]);

//Factory
myApp.factory('Data', function (){
	var data = {
        loc: ''
    };

    return {
        getLoc: function () {
            return data.loc;
        },
        setLoc: function (loc) {
            data.loc = loc;
        }
    };
});

//API Key Controller
myApp.controller('URLCtrl',['$scope','Data','$rootScope', function($scope, Data,$rootScope){
	$scope.changeURL = function(){
		Data.setLoc($scope.loc);
		$rootScope.$broadcast('ChangeData');
	}
	
}]);

// Movies controller
myApp.controller('MovieCtrl',['$scope','$http','Data',function($scope,$http, Data){
	console.log("Movie Controller initialized");

	var apikey= "";
	
	$scope.$on('ChangeData', function (event) {
		apikey = "?apikey=" + Data.getLoc();
		refresh();
    });

	var refresh = function (){
		$http.get('/movies'+apikey).success(function (movies){
			console.log('Movies data received successfully');
			$scope.movieList = movies;
		});
	}

	refresh();

	$scope.addMovie = function(){
		console.log("Inserting movie ...");
		$http.post('/movies/'+apikey, $scope.movie);
		refresh();
	}

	$scope.deleteMovie = function(title){
		console.log("Deleting movie with " + title);
		$http.delete('/movies/' + title + '/' + apikey);
		refresh();
	}
}]);

// Books controller
myApp.controller('BookCtrl',['$scope','$http','Data',function($scope,$http,Data){
	console.log("Book Controller initialized");

	var apikey= "";
	
	$scope.$on('ChangeData', function (event) {
		apikey = "?apikey=" + Data.getLoc();
		refresh();
    });

	var refresh = function (){
		$http.get('/books'+apikey).success(function (books){
			console.log('Books data received successfully');
			$scope.bookList = books;
		});
	}

	refresh();

	$scope.addBook = function(){
		console.log("Inserting book ...");
		$http.post('/books/'+apikey, $scope.book);
		refresh();
	}

	$scope.deleteBook = function(title){
		console.log("Deleting book with " + title);
		$http.delete('/books/' + title + '/' + apikey);
		refresh();
	}

}]);

// Music controller
myApp.controller('MusicCtrl',['$scope','$http','Data',function($scope,$http,Data){
	console.log("Music Controller initialized");

	var apikey= "";
	
	$scope.$on('ChangeData', function (event) {
		apikey = "?apikey=" + Data.getLoc();
		refresh();
    });

	var refresh = function (){
		$http.get('/musics'+apikey).success(function (musics){
			console.log('Musics data received successfully');
			$scope.musicList = musics;
		});
	}

	refresh();

	$scope.addMusic = function(){
		console.log("Inserting music ...");
		$http.post('/musics/'+apikey, $scope.music);
		refresh();
	}

	$scope.deleteMusic = function(title){
		console.log("Deleting music with " + title);
		$http.delete('/musics/' + title + '/' + apikey);
		refresh();
	}

}]);
