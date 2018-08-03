'use strict'

const app = angular.module('followersApp', []);

$('#users').modal('show');

app.controller('followersCtrl',
	function ($scope,$http){

		let users = 'https://api.github.com/users';
		$scope.titulo = 'SPA - GetHub Followers';

		$http.get(users)
		.success(function(users){
			$scope.users = users;
    })

    $scope.followers = function(login){
      if ($scope.active != login) {
        $scope.active = login;
      }
      else {
        $scope.active = null;
      }
			let userfollowers = 'https://api.github.com/users/' + login + '/followers';
      let html = '';
      $('#followers-' + login).html(html);

			$http.get(userfollowers)
				.success(function(userfollowers){
          html += '<ul class="list-group">'
					angular.forEach(userfollowers, function(userfollower, key) {
					  html += '<li class="list-group-item disabled">'+
                    '<img src="' + userfollower.avatar_url + '" class="img-rounded userIcon">@' + userfollower.login + '</li>';
          });
          html += '</ul>'
          $('#followers-'+login).html(html);
				})
		};
	}
);