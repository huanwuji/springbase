<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html ng-app="huanwuji">
<head>
    <title></title>
    <meta charset="utf-8">
    <link rel="stylesheet" type="text/css" href="/style/bootstrap/css/bootstrap.min.css">
    <%--<link rel="stylesheet" type="text/css" href="/style/bootstrap/css/bootstrap-theme.css">--%>
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
<div class="navbar navbar-default navbar-fixed-top">
    <div class="container">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="#/menu">后台管理</a>
        </div>
        <div class="collapse navbar-collapse">
            <ul class="nav navbar-nav">
                <li ng-class="{ active: $state.includes('menu') }"><a href="#/menu">菜单管理</a></li>
                <li ng-class="{ active: $state.includes('systemCode') }"><a href="#/systemCode">礼品类目</a></li>
            </ul>
        </div>
    </div>
</div>
<div class="container">
    <div class="row" ui-view ng-animate="{enter:'fade-enter'}"></div>
    <hr>
    <footer>
        <p>&copy; Company 2013</p>
    </footer>
</div>
</body>
</html>
<script>
(function () {
    angular.module('huanwuji', ['ui.compat', 'angularTree', 'ui.bootstrap', 'ngResource'])
            .factory('Service', function ($resource) {
                return {
                    Menu: $resource('/menu/:id/:parentId', {id: '@id', parentId: '@parentId'}),
                    SystemCode: $resource('/systemCode/:id/:parentId', {id: '@id', parentId: '@parentId'}),
                    Entry: $resource('/entry/:key/:fkId/:id', {key: '@key', fkId: '@fkId', id: '@id'}),
                    Gift: $resource('/gift/:cid/:id', { cid: '@cid', id: '@id'})
                };
            })
            .constant('hwjConfig', {
                menuTypes: [
                    {value: 'single', text: '普通单页'},
                    {value: 'dropdown', text: '下拉菜单'},
                    {value: 'gift_index', text: '礼品首页'},
                    {value: 'photo_news', text: '图片新闻'},
                    {value: 'list_news', text: '新闻列表'},
                    {value: 'left_nav_news', text: '左侧导航栏新闻'}
                ],
                treeIcon: {
                    open: 'glyphicon glyphicon-folder-open',
                    close: 'glyphicon glyphicon-folder-close'
                },
                giftTypes: hwjGiftTypes
            })
            .config(
                    ['$stateProvider', '$routeProvider', '$urlRouterProvider',
                        function ($stateProvider, $routeProvider, $urlRouterProvider) {
                            $urlRouterProvider
                                    .when('', '/');
                            $routeProvider
                                    .when('', {
                                        redirectTo: '/menu'
                                    });
                            var stateConfig = {
                                tree: {
                                    main: function (name, serviceName) {
                                        return [name, {
                                            url: '/' + name,
                                            templateUrl: '/tmpl/' + name + '/main.html',
                                            controller: ['$scope', '$state', 'Service', '$window', 'hwjConfig',
                                                function ($scope, $state, Service, $window, hwjConfig) {
                                                    $scope.treeCache = {};
                                                    $scope.items = [
                                                        {id: 0, parentId: 0, name: 'root',
                                                            clazz: hwjConfig.treeIcon.open, open: true, leaf: false,
                                                            url: "#/" + name, root: true,
                                                            children: Service[serviceName].query({id: 0, resultType: 'tree'}, function (children) {
                                                                angular.forEach(children, function (item) {
                                                                    if (!item.leaf) {
                                                                        item.clazz = hwjConfig.treeIcon.close;
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
                                                            _item.clazz = 'glyphicon glyphicon-folder-open';
                                                            _item.children = $scope.getChildren(_item.id, _item);
                                                        } else {
                                                            _item.clazz = 'glyphicon glyphicon-folder-close';
                                                            $scope.treeCache[_item.id] = null;
                                                            _item.children = [];
                                                        }
                                                    };
                                                    $scope.getChildren = function (id, parent) {
                                                        return Service[serviceName].query({id: id, resultType: 'tree'}, function (children) {
                                                            angular.forEach(children, function (item) {
                                                                if (!item.leaf) {
                                                                    item.clazz = hwjConfig.treeIcon.close;
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
                                                        if (!$window.confirm("是否删除!")) {
                                                            return;
                                                        }
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
                                                    $scope.swap = function (direction) {
                                                        var id = this.item.id;
                                                        var currItem = $scope.treeCache[id];
                                                        var parent = currItem.parent;
                                                        var children = parent.children;
                                                        for (var i = 0; i < children.length; i++) {
                                                            if (children[i] == currItem.curr) {
                                                                var index1, index2;
                                                                if (direction == 'up') {
                                                                    if (i != 0) {
                                                                        index1 = i;
                                                                        index2 = i - 1;
                                                                    }
                                                                } else if (direction == 'down') {
                                                                    if (i != (children.length - 1)) {
                                                                        index1 = i;
                                                                        index2 = i + 1;
                                                                    }
                                                                }
                                                                if (index2 !== undefined) {
                                                                    Service[serviceName].get({id: 'swap', id1: children[index1].id,
                                                                        id2: children[index2].id}, function () {
                                                                        var swap = children[index1];
                                                                        children[index1] = children[index2];
                                                                        children[index2] = swap;
                                                                    });
                                                                }
                                                            }
                                                        }
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
                                            controller: ['$scope', '$state', '$stateParams', 'Service', 'hwjConfig',
                                                function ($scope, $state, $stateParams, Service, hwjConfig) {
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
                                                                parent.clazz = hwjConfig.treeIcon.open;
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
                                                    Service.Entry.get({key: key, fkId: fkId}, function (entry) {
                                                        entry.type = entry.type || 'single';
                                                        $scope.entry = entry;
                                                    });
                                                    var ue;
                                                    $scope.save = function () {
                                                        if (ue) {
                                                            $scope.entry.content = ue.getContent();
                                                        }
                                                        Service.Entry.save({key: key, fkId: fkId, id: $scope.id || -1}, $scope.entry, function () {
                                                            $state.transitionTo(parent + '.list', {key: key, fkId: fkId});
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
                                    .state('systemCode.gift', {
                                        parent: "systemCode",
                                        url: '/gift/cid/{cid}',
                                        templateUrl: '/tmpl/gift/list.html',
                                        controller: ['$scope', '$state', '$stateParams', 'Service', '$window',
                                            function ($scope, $state, $stateParams, Service, $window) {
                                                var cid = $stateParams.cid;
                                                $scope.cid = cid;
                                                $scope.maxSize = 10;
                                                $scope.setPage = function (number) {
                                                    Service.Gift.get({cid: cid, page: number, size: 20}, function (result) {
                                                        $scope.gifts = result.content;
                                                        $scope.totalPages = result.totalPages;
                                                        $scope.number = result.number + 1;
                                                    });
                                                };
                                                $scope.setPage(1);
                                                $scope.giftDelete = function (id) {
                                                    if (!$window.confirm("是否删除!")) {
                                                        return;
                                                    }
                                                    Service.Gift.delete({id: id, cid: cid});
                                                    $scope.setPage(1);
                                                }
                                            }]
                                    })
                                    .state('systemCode.gift.detail', {
                                        parent: 'systemCode',
                                        url: '/gift/cid/{cid}/{id}',
                                        templateUrl: '/tmpl/gift/detail.html',
                                        controller: ['$scope', '$state', '$stateParams', 'Service', 'hwjConfig',
                                            function ($scope, $state, $stateParams, Service, hwjConfig) {
                                                var cid = $stateParams.cid;
                                                var id = $stateParams.id;
                                                $scope.giftTypes = hwjConfig.giftTypes;
                                                if (id < 1) {
                                                    $scope.gift = {valid: true};

                                                } else {
                                                    $scope.gift = Service.Gift.get({id: id, cid: cid});
                                                }
                                                $scope.save = function () {
                                                    Service.Gift.save({id: id || -1, cid: cid}, $scope.gift, function () {
                                                        $state.transitionTo('systemCode.gift', {cid: cid});
                                                    });
                                                };
                                            }]
                                    });
                            $stateProvider.state.apply($stateProvider, stateConfig.entry.detail('systemCode', 'entry'));
                        }])
            .filter('vaild', function () {
                return function (input) {
                    return input ? '是' : '否';
                };
            })
            .run(['$rootScope', '$state', '$stateParams', 'hwjConfig',
                function ($rootScope, $state, $stateParams, hwjConfig) {
                    $rootScope.hwjConfig = hwjConfig;
                    $rootScope.$state = $state;
                    $rootScope.$stateParams = $stateParams;
                }]);
})();
</script>
<script src="/style/ueditor/ueditor.config.js"></script>
<script src="/style/ueditor/ueditor.all.js"></script>