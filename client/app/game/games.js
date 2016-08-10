angular.module('TeamUp.games',[])

.controller('gamesController',function($scope, $location, Game, User){
	$scope.data={};
	$scope.initaize = function () {
		Game.getAll()
		.then(function (games) {
			$scope.data.games = games;
		})
		.catch(function (err) {
			console.log(err);
		});
	};
	$scope.viewGame = function (gameId) {
		console.log('asdsa')
		$location.path('/game/'+gameId);
	}
	$scope.initaize();
	
});