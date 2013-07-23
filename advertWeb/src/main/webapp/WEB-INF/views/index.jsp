<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html ng-app="huanwuji">
<head>
    <title></title>
    <meta charset="utf-8">
    <link rel="stylesheet" type="text/css" href="/style/bootstrap/css/bootstrap.css">
    <link rel="stylesheet" type="text/css" href="/style/me/huanwuji.css">
    <%--<link rel="stylesheet" type="text/css" href="/style/bootstrap/js/bootstrap.js">--%>
    <script src="/style/me/huanwuji.js"></script>
    <script src="/style/jquery/jquery-2.0.2.js"></script>
    <script src="/style/angular/angular.js"></script>
    <script src="/style/angular/ui-bootstrap-tpls-0.3.0.js"></script>
    <script src="/style/angular/angular-resource.js"></script>
    <script src="/style/angular/ui-router/angular-ui-router.js"></script>
    <script src="/style/angular/angular.tree.js"></script>
</head>
<body>
<div>
    <div class="navbar">
        <div class="navbar-inner">
            <div class="container" ng-controller="menuCtrl">
                <div class="dropdown">
                    <ul class="nav">
                        <li class="dropdown" ng-repeat="menu in menus" ng-switch="menu.leaf">
                            <a ng-switch-when="false" href="#/main/single/menu-{{menu.id}}" class="dropdown-toggle"
                               title="{{menu.title}}">{{menu.name}}
                                <b class="caret" ng-show="!menu.leaf"></b>
                            </a>
                            <a ng-switch-when="true" href="#/main/single/menu-{{menu.id}}"
                               title="{{menu.title}}">{{menu.name}}
                            </a>
                            <ul class="dropdown-menu">
                                <li>
                                    <a ng-repeat="subMenu in menu.children">{{subMenu.name}}</a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <div class="container-fluid">
        <div class="row-fluid" ui-view ng-animate="{enter:'fade-enter'}"></div>
        <hr>
        <footer>
            <p>&copy; Company 2013</p>
        </footer>
    </div>
</div>
<script>
    (function () {
        angular.module('huanwuji', ['ngResource', 'ui.compat', 'angularTree', 'ui.bootstrap'])
                .factory('RestService', function ($resource) {
                    return {
                        Menu: $resource('/menu/:id/:parentId', {id: '@id', parentId: '@parentId'}),
                        SystemCode: $resource('/systemCode/:id/:parentId', {id: '@id', parentId: '@parentId'}),
                        Entry: $resource('/entry/:key/:fkId/:id', {key: '@key', fkId: '@fkId', id: '@id'}),
                        Gift: $resource('/gift/:cid/:id', { cid: '@cid', id: '@id'})
                    }
                })
                .config(
                        ['$stateProvider', '$routeProvider', '$urlRouterProvider',
                            function ($stateProvider, $routeProvider, $urlRouterProvider) {
//                                $urlRouterProvider
//                                        .when('', '/')
//                                        .otherwise('/');
//                                $routeProvider
//                                        .when('', {
//                                            redirectTo: '/'
//                                        })
//                                        .when('/', {
//                                            redirectTo: "/"
//                                        });
                                $stateProvider
                                        .state('main', {
                                            url: '/main/{type}/{codeOrFkId}',
                                            templateProvider: ['$http', '$stateParams', function ($http, $stateParams) {
                                                var codeOrFkId = $stateParams.codeOrFkId;
                                                var url;
                                                if (/^\w+?-\d+$/.test(codeOrFkId)) {
                                                    var arr = codeOrFkId.split('-');
                                                    url = '/entry/' + arr[0] + '/' + arr[1];
                                                } else {
                                                    url = '/entry/' + codeOrFkId;
                                                }
                                                return $http.get(url)
                                                        .then(function (response) {
                                                            var entry = response.data;
                                                            if (entry.url) {
                                                                return $http.get(entry.url).then(function (resp) {
                                                                    return resp.data;
                                                                });
                                                            } else {
                                                                return entry.content;
                                                            }
                                                        });
                                            }],
                                            controller: ['$scope', '$stateParams', 'RestService',
                                                function ($scope, $stateParams, RestService) {
                                                    var type = $stateParams.type;
                                                }]
                                        })
                            }
                        ])
                .controller('menuCtrl', ['$scope', '$window', 'RestService', function ($scope, $window, RestService) {
                    RestService.Menu.query({id: 0, resultType: 'tree'}, function (menus) {
                        $scope.menus = menus;
                        angular.forEach($scope.menus, function (menu) {
                            if (!menu.leaf) {
                                RestService.Menu.query({id: menu.id, resultType: 'tree'}, function (subMenus) {
                                    menu.children = subMenus;
                                    console.log($scope.menus);
                                });
                            }
                        });
                    });
                }])
                .run(['$rootScope', '$state', '$stateParams',
                    function ($rootScope, $state, $stateParams) {
                        $rootScope.$state = $state;
                        $rootScope.$stateParams = $stateParams;
                    }]);

        if (window.location.href.indexOf('#') == -1) {
            window.location.href = '#/main/single/home';
        }
    })();
</script>
</body>
</html>