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
                    <li ng-class="{ active: $state.includes('menu') }"><a href="#/menu">菜单管理</a></li>
                    <li ng-class="{ active: $state.includes('systemCode') }"><a href="#/systemCode">系统代码</a></li>
                    <li ng-class="{ active: $state.includes('about') }"><a href="#/about">关于</a></li>
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
                    SystemCode: $resource('/systemCode/:id/:parentId', {id: '@id', parentId: '@parentId'}),
                    Entry: $resource('/entry/:key/:fkId/:id', {key: '@key', fkId: '@fkId', id: '@id'}),
                    Item: $resource('/item/:cid/:id', { fkId: '@cid', id: '@id'})
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
                            var stateConfig = {
                                tree: {
                                    main: function (name, serviceName) {
                                        return [name, {
                                            url: '/' + name,
                                            templateUrl: '/tmpl/' + name + '/main.html',
                                            controller: ['$scope', '$state', 'Service', '$window',
                                                function ($scope, $state, Service, $window) {
                                                    $scope.hc = $window.h.c;
                                                    $scope.treeCache = {};
                                                    $scope.items = [
                                                        {id: 0, parentId: 0, name: 'root',
                                                            clazz: h.c.treeIcon.open, open: true, leaf: false,
                                                            url: "#/" + name, root: true,
                                                            children: Service[serviceName].query({id: 0, resultType: 'tree'}, function (children) {
                                                                angular.forEach(children, function (item) {
                                                                    if (!item.leaf) {
                                                                        item.clazz = h.c.treeIcon.close;
                                                                    }
                                                                    $scope.treeCache[item.id] = {curr: item, parent: $scope.items[0]};
                                                                })
                                                            })}
                                                    ];
                                                    $scope.treeCache[0] = {curr: $scope.items[0], parent: null};
                                                    $scope.toggle = function () {
                                                        var _item = this.item;
                                                        _item.open = !_item.open;
                                                        if (_item.open) {
                                                            _item.clazz = 'icon-folder-open';
                                                            _item.children = $scope.getChildren(_item.id, _item);
                                                        } else {
                                                            _item.clazz = 'icon-folder-close';
                                                            $scope.treeCache[_item.id] = null;
                                                            _item.children = [];
                                                        }
                                                    };
                                                    $scope.getChildren = function (id, parent) {
                                                        return Service[serviceName].query({id: id, resultType: 'tree'}, function (children) {
                                                            angular.forEach(children, function (item) {
                                                                if (!item.leaf) {
                                                                    item.clazz = h.c.treeIcon.close;
                                                                }
                                                                $scope.treeCache[item.id] = {curr: item, parent: parent};
                                                            })
                                                        });
                                                    };
                                                    $scope.add = function () {
                                                        $state.transitionTo(name + '.detail', { id: -1, parentId: this.item.id});
                                                    };
                                                    $scope.edit = function () {
                                                        $state.transitionTo(name + '.detail', {id: this.item.id,
                                                            parentId: $scope.treeCache[this.item.id].parent.id});
                                                    };
                                                    $scope.delete = function () {
                                                        var delId = this.item.id;
                                                        Service[serviceName].delete({id: delId}, function () {
                                                            var currItem = $scope.treeCache[delId];
                                                            var parent = currItem.parent;
                                                            var children = parent.children;
                                                            for (var i in children) {
                                                                var item = children[i];
                                                                if (item.id == delId) {
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
                                        }]
                                    },
                                    list: function (name, serviceName) {
                                        return [name + '.list', {
                                            parent: name,
                                            url: '',
                                            templateUrl: '/tmpl/' + name + '/list.html'
                                        }]
                                    },
                                    detail: function (name, serviceName) {
                                        return [name + '.detail', {
                                            parent: name,
                                            url: '/{id}/{parentId}',
                                            templateUrl: '/tmpl/' + name + '/detail.html',
                                            controller: ['$scope', '$state', '$stateParams', 'Service',
                                                function ($scope, $state, $stateParams, Service) {
                                                    var id = $stateParams.id;
                                                    var parentId = $stateParams.parentId;
                                                    if (id > 0) {
                                                        $scope[name] = Service[serviceName].get({id: $stateParams.id});
                                                    } else {
                                                        $scope[name] = {
                                                            valid: true
                                                        }
                                                    }
                                                    $scope.save = function () {
                                                        Service[serviceName].save({parentId: parentId, id: id}, $scope[name], function (bean) {
                                                            if (id > 0) {
                                                                $scope.treeCache[id].curr.name = $scope[name].name;
                                                            } else {
                                                                var parent = $scope.treeCache[parentId].curr;
                                                                parent.clazz = h.c.treeIcon.open;
                                                                parent.leaf = false;
                                                                parent.children = $scope.getChildren(parentId, parent);
                                                            }
                                                            $state.transitionTo(name + '.list');
                                                        });
                                                    }
                                                }]
                                        }];
                                    }
                                },
                                entry: {
                                    detail: function (parent, name) {
                                        return [parent + '.entry.detail', {
                                            parent: parent,
                                            url: '/entry/{key}/{fkId}',
                                            templateUrl: '/tmpl/entry/detail.html',
                                            controller: ['$scope', '$state', '$stateParams', 'Service',
                                                function ($scope, $state, $stateParams, Service) {
                                                    var key = $stateParams.key;
                                                    var fkId = $stateParams.fkId;
                                                    $scope.entry = Service.Entry.get({key: key, fkId: fkId});
                                                    var ue;
                                                    $scope.save = function () {
                                                        if (ue) {
                                                            $scope.entry.content = ue.getContent();
                                                        }
                                                        Service.Entry.save({key: key, fkId: fkId, id: $scope.id || -1}, $scope.entry, function () {
                                                            $state.transitionTo(parent + '.entry.detail', {key: key, fkId: fkId});
                                                        });
                                                    };
                                                    var init = false;
                                                    $scope.editTemplate = function () {
                                                        try {
                                                            UE.getEditor('editor').destroy();
                                                        } catch (e) {
                                                        }
                                                        if (!init) {
                                                            init = true;
                                                            ue = UE.getEditor('editor');
                                                            var params = '/' + key + '/' + fkId;
                                                            ue.options.imageManagerUrl = window.UEDITOR_CONFIG.imageManagerUrl + params;
                                                            ue.options.imageUrl = window.UEDITOR_CONFIG.imageUrl + params;
                                                            ue.options.fileUrl = window.UEDITOR_CONFIG.fileUrl + params;
                                                        }
                                                    };
                                                }]
                                        }];
                                    }
                                }
                            };
                            for (var key in stateConfig.tree) {
                                var state = stateConfig.tree[key];
                                $stateProvider.state.apply($stateProvider, state('menu', 'Menu'));
                                $stateProvider.state.apply($stateProvider, state('systemCode', 'SystemCode'));
                            }
                            $stateProvider.state.apply($stateProvider, stateConfig.entry.detail('menu', 'entry'));
                            $stateProvider
                                    .state('systemCode.item', {
                                        parent: "systemCode",
                                        url: '/item/cid/{cid}',
                                        templateUrl: '/tmpl/item/list.html',
                                        controller: ['$scope', '$state', '$stateParams', 'Service',
                                            function ($scope, $state, $stateParams, Service) {
                                                var cid = $stateParams.cid;
                                                $scope.cid = cid;
                                                $scope.maxSize = 10;
                                                $scope.setPage = function (number) {
                                                    Service.Item.get({cid: cid, page: number, size: 20}, function (result) {
                                                        $scope.items = result.content;
                                                        $scope.totalPages = result.totalPages;
                                                        $scope.number = result.number + 1;
                                                    });
                                                };
                                                $scope.setPage(1);
                                            }]
                                    })
                                    .state('systemCode.item.detail', {
                                        parent: 'systemCode',
                                        url: '/item/{cid}/{id}',
                                        templateUrl: '/tmpl/item/detail.html',
                                        controller: ['$scope', '$state', '$stateParams', 'Service',
                                            function ($scope, $state, $stateParams, Service) {
                                                var cid = $stateParams.cid;
                                                var id = $stateParams.id;
                                                $scope.item = Service.Item.get({id: id, cid: cid});
                                                $scope.save = function () {
                                                    Service.Item.save({id: id || -1, cid: cid}, $scope.item, function () {
                                                        $state.transitionTo(parent + '.item.detail', {id: id, cid: cid});
                                                    });
                                                };
                                            }]
                                    });
                            $stateProvider.state.apply($stateProvider, stateConfig.entry.detail('systemCode', 'entry'));
                            $stateProvider.state('about', {
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
<script src="/style/ueditor/ueditor.config.js"></script>
<script src="/style/ueditor/ueditor.all.js"></script>