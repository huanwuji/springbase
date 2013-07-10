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
            <div class="container">
                <ul class="nav">
                    <li><a href="#/menu">菜单管理</a></li>
                    <li><a href="#/entry">条目管理</a></li>
                    <li><a href="#">系统代码</a></li>
                    <li><a href="#">礼品管理</a></li>
                    <li><a href="#/about">关于</a></li>
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
        angular.module('ServiceModules', ['ngResource']).
                factory('Service', function ($resource) {
                    return {
                        Menu: $resource('/menu/:id/:parentId', {id: '@id', parentId: '@parentId'}),
                        Entry: $resource('/entry/:key/:fkId/:id', {key: '@key', fkId: '@fkId', id: '@id'})
                    };
                });
        angular.module('huanwuji', ['ui.compat', 'ServiceModules', 'angularTree', 'ui.bootstrap'])
                .config(
                        ['$stateProvider', '$routeProvider', '$urlRouterProvider',
                            function ($stateProvider, $routeProvider, $urlRouterProvider) {
//                                $urlRouterProvider
//                                        .when('/c?id', '/contacts/:id')
//                                        .otherwise('/');
                                $routeProvider
//                                    .when('/user/:id', {
//                                        redirectTo: '/contacts/:id'
//                                    })
                                        .when('/', {
                                            redirectTo: "/menu"
                                        });
                                $stateProvider
                                        .state('menu', {
                                            url: '/menu',
                                            templateUrl: '/tmpl/menu/main.html',
                                            controller: ['$scope', '$state', 'Service', '$window',
                                                function ($scope, $state, Service, $window) {
                                                    $scope.hc = $window.h.c;
                                                    $scope.menuTreeCache = {};
                                                    $scope.menus = [
                                                        {id: 0, parentId: 0, name: 'root',
                                                            clazz: h.c.treeIcon.open, open: true, leaf: false,
                                                            url: "#/menu", root: true,
                                                            children: Service.Menu.query({id: 0, resultType: 'tree'}, function (children) {
                                                                angular.forEach(children, function (menu) {
                                                                    if (!menu.leaf) {
                                                                        menu.clazz = h.c.treeIcon.close;
                                                                    }
                                                                    $scope.menuTreeCache[menu.id] = {curr: menu, parent: $scope.menus[0]};
                                                                })
                                                            })}
                                                    ];
                                                    $scope.menuTreeCache[0] = {curr: $scope.menus[0], parent: null};
                                                    $scope.toggle = function () {
                                                        var _item = this.item;
                                                        _item.open = !_item.open;
                                                        if (_item.open) {
                                                            _item.clazz = 'icon-folder-open';
                                                            _item.children = $scope.getChildren(_item.id, _item);
                                                        } else {
                                                            _item.clazz = 'icon-folder-close';
                                                            $scope.menuTreeCache[_item.id] = null;
                                                            _item.children = [];
                                                        }
                                                    };
                                                    $scope.getChildren = function (id, parent) {
                                                        return Service.Menu.query({id: id, resultType: 'tree'}, function (children) {
                                                            angular.forEach(children, function (menu) {
                                                                if (!menu.leaf) {
                                                                    menu.clazz = h.c.treeIcon.close;
                                                                }
                                                                $scope.menuTreeCache[menu.id] = {curr: menu, parent: parent};
                                                            })
                                                        });
                                                    };
                                                    $scope.add = function () {
                                                        $state.transitionTo('menu.detail', { id: -1, parentId: this.item.id});
                                                    };
                                                    $scope.edit = function () {
                                                        $state.transitionTo('menu.detail', {id: this.item.id,
                                                            parentId: $scope.menuTreeCache[this.item.id].parent.id});
                                                    };
                                                    $scope.delete = function () {
                                                        var delId = this.item.id;
                                                        Service.Menu.delete({id: delId}, function () {
                                                            var currMenu = $scope.menuTreeCache[delId];
                                                            var parent = currMenu.parent;
                                                            var children = parent.children;
                                                            for (var i in children) {
                                                                var menu = children[i];
                                                                if (menu.id == delId) {
                                                                    children.splice(i, 1);
                                                                    break;
                                                                }
                                                            }
                                                            if (children.length == 0) {
                                                                parent.leaf = true;
                                                                parent.clazz = '';
                                                            }
                                                        });
                                                    };
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
                                            controller: ['$scope', '$state', '$stateParams', 'Service',
                                                function ($scope, $state, $stateParams, Service) {
                                                    var id = $stateParams.id;
                                                    var parentId = $stateParams.parentId;
                                                    if (id > 0) {
                                                        $scope.menu = Service.Menu.get({id: $stateParams.id});
                                                    } else {
                                                        $scope.menu = {
                                                            valid: true
                                                        }
                                                    }
                                                    $scope.save = function () {
                                                        Service.Menu.save({parentId: parentId, id: id}, $scope.menu, function (menu) {
                                                            if (id > 0) {
                                                                $scope.menuTreeCache[id].curr.name = $scope.menu.name;
                                                            } else {
                                                                var parent = $scope.menuTreeCache[parentId].curr;
                                                                parent.clazz = h.c.treeIcon.open;
                                                                parent.leaf = false;
                                                                parent.children = $scope.getChildren(parentId, parent);
                                                            }
                                                            $state.transitionTo('menu.list');
                                                        });
                                                    }
                                                }]
                                        })
                                        .state('menu.entry', {
                                            parent: "menu",
                                            url: '/entry/{key}/{fkId}',
                                            templateUrl: '/tmpl/entry/list.html',
                                            controller: ['$scope', '$state', '$stateParams', 'Service',
                                                function ($scope, $state, $stateParams, Service) {
                                                    var key = $stateParams.key;
                                                    var fkId = $stateParams.fkId;
                                                    $scope.fkId = fkId;
                                                    $scope.maxSize = 10;
                                                    $scope.setPage = function (number) {
                                                        Service.Entry.get({key: key, fkId: fkId, page: number, size: 20}, function (result) {
                                                            $scope.entries = result.content;
                                                            $scope.totalPages = result.totalPages;
                                                            $scope.number = result.number + 1;
                                                        });
                                                    };
                                                    $scope.setPage(1);
                                                }]
                                        }).state('menu.entry.detail', {
                                            parent: "menu",
                                            url: '/entry/{key}/{fkId}/{id}',
                                            templateUrl: '/tmpl/entry/detail.html',
                                            controller: ['$scope', '$state', '$stateParams', 'Service',
                                                function ($scope, $state, $stateParams, Service) {
                                                    var key = $stateParams.key;
                                                    var fkId = $stateParams.fkId;
                                                    var id = $stateParams.id;
                                                    if (id > 0) {
                                                        $scope.entry = Service.Entry.get({key: key, fkId: fkId, id: id});
                                                    } else {
                                                        $scope.entry = {
                                                            valid: true
                                                        }
                                                    }
                                                    $scope.save = function () {
                                                        Service.Entry.save({key: key, fkId: fkId, id: id},
                                                                $scope.entry, function () {
                                                                    $state.transitionTo('menu.entry', {key: key, fkId: fkId});
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