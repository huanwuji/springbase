<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html ng-app="huanwuji">
<head>
    <title></title>
    <meta charset="utf-8">
    <link rel="stylesheet" type="text/css" href="/style/bootstrap/css/bootstrap3.css">
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
                <a class="navbar-brand" href="#">Project Name</a>

                <div class="dropdown">
                    <ul class="nav navbar-nav">
                        <li ng-class="{dropdown:menu.leaf}" ng-repeat="menu in menus" ng-switch="menu.type">
                            <a ng-switch-default href="#/{{menu.type}}/menu-{{menu.id}}"
                               title="{{menu.title}}">{{menu.name}}
                            </a>
                            <a ng-switch-when="dropdown" href="#/{{menu.type}}/menu-{{menu.id}}" class="dropdown-toggle"
                               title="{{menu.title}}">{{menu.name}}
                                <b class="caret" ng-show="!menu.leaf"></b>
                            </a>
                            <ul class="dropdown-menu">
                                <li>
                                    <a ng-repeat="subMenu in menu.children"
                                       href="#/{{subMenu.type}}/menu-{{subMenu.id}}">{{subMenu.name}}</a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <div class="container">
        <div class="row-fluid" ui-view ng-animate="{enter:'fade-enter'}"></div>
        <hr>
        <footer>
            <p>&copy; Company 2013</p>
        </footer>
    </div>
</div>
<script>
    (function () {
        var commonTemplProvide = ['$http', '$stateParams', function ($http, $stateParams) {
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
        }];
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
                                $stateProvider
                                        .state('single', {
                                            url: '/single/{codeOrFkId}',
                                            templateProvider: commonTemplProvide,
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
                                    if (menu.type === 'dropdown') {
                                        menu.children = subMenus;
                                    }
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
            window.location.href = '#/single/home';
        }
    })();
</script>
</body>
</html>