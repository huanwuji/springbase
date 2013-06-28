<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html ng-app="huanwuji">
<head>
    <title></title>
    <meta charset="utf-8">
    <link rel="stylesheet" type="text/css" href="/style/bootstrap/css/bootstrap.css">
    <%--<link rel="stylesheet" type="text/css" href="/style/bootstrap/js/bootstrap.js">--%>
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
            <div class="container">
                <ul class="nav">
                    <li><a href="#/menu">菜单管理</a></li>
                    <li><a href="#">条目管理</a></li>
                    <li><a href="#">系统代码</a></li>
                    <li><a href="#">礼品管理</a></li>
                </ul>
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
        angular.module('Domain', ['ngResource']).
                factory('$Bean', function ($resource) {
                    return {
                        Menu: (function () {
                            return $resource('/menu/:id/:parentId', {id: '@id', parentId: '@parentId'});
                        })()
                    };
                });
        angular.module('huanwuji', ['ui.compat', 'Domain', 'angularTree', 'ui.bootstrap'])
                .config(
                        ['$stateProvider', '$routeProvider', '$urlRouterProvider',
                            function ($stateProvider, $routeProvider, $urlRouterProvider) {
//                            $urlRouterProvider
//                                    .when('/c?id', '/contacts/:id')
//                                    .otherwise('/');
//
//                            $routeProvider
//                                    .when('/user/:id', {
//                                        redirectTo: '/contacts/:id'
//                                    })
//                                    .when('/', {
//                                        template: '<p class="lead">Welcome to the ngStates sample</p><p>Use the menu above to navigate</p>' +
//                                                '<p>Look at <a href="#/c?id=1">Alice</a> or <a href="#/user/42">Bob</a> to see a URL with a redirect in action.</p>'
//                                    });
                                $stateProvider
                                        .state('menu', {
                                            url: '/menu',
                                            templateUrl: '/tmpl/menu/main.html',
                                            controller: ['$scope', '$state', '$Bean',
                                                function ($scope, $state, $Bean) {
                                                    $scope.menus = [
                                                        {id: "", parentId: "", name: 'root',
                                                            clazz: 'icon-folder-open', open: true,
                                                            url: "#/menu",
                                                            children: $Bean.Menu.query({resultType: 'tree'})}
                                                    ];
                                                    $scope.toggle = function () {
                                                        var _item = this.item;
                                                        _item.open = !_item.open;
                                                        if (_item.open) {
                                                            _item.clazz = 'icon-folder-open';
                                                            _item.children = $Bean.Menu.query({id: _item.id, resultType: 'tree'});
                                                        } else {
                                                            _item.clazz = 'icon-folder-close';
                                                            _item.children = [];
                                                        }
                                                    };
                                                    $scope.add = function () {
                                                        $state.transitionTo('menu.detail', { id: this.item.id, parentId: this.item.parentId});
                                                    };
                                                    $scope.edit = function () {
                                                        $state.transitionTo('menu.detail', {id: this.item.id, parentId: this.item.parentId});
                                                    };
                                                    $scope.delete = function () {
                                                        $Bean.Menu.delete({id: this.item.id}, function () {
                                                            $scope.menus = root;
                                                        });
                                                    }
                                                }]
                                        })
                                        .state('menu.list', {
                                            parent: 'menu',
                                            url: '',
                                            templateUrl: '/tmpl/menu/list.html'
                                        })
                                        .state('menu.detail', {
                                            parent: 'menu',
                                            url: '/{id}/{parentId}',
                                            templateUrl: '/tmpl/menu/detail.html',
                                            controller: ['$scope', '$state', '$stateParams', '$Bean',
                                                function ($scope, $state, $stateParams, $Bean) {
                                                    var id = $stateParams.id;
                                                    var parentId = $stateParams.parentId;
                                                    if (id) {
                                                        $scope.menu = $Bean.Menu.get({id: $stateParams.id});
                                                    } else {
                                                        $scope.menu = {
                                                            valid: true
                                                        }
                                                    }
                                                    $scope.save = function () {
                                                        if (!parentId) {
                                                            parentId = -1;
                                                        }
                                                        if (!id) {
                                                            id = -1;
                                                        }
                                                        $Bean.Menu.save({parentId: parentId}, $scope.menu, function (menu) {
                                                            $state.transitionTo('menu');
                                                        });
                                                    }
                                                }]
                                        })
                                        .state('about', {
                                            url: '/about',
                                            templateProvider: ['$timeout',
                                                function ($timeout) {
                                                    return $timeout(function () {
                                                        return "Hello world"
                                                    }, 100);
                                                }]
                                        });
                            }])
                .run(['$rootScope', '$state', '$stateParams',
                    function ($rootScope, $state, $stateParams) {
                        $rootScope.$state = $state;
                        $rootScope.$stateParams = $stateParams;
                    }]);
    })();
</script>
</body>
</html>