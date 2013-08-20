<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html ng-app="huanwuji">
<head>
    <title></title>
    <meta charset="utf-8">
    <link rel="stylesheet" type="text/css" href="/style/bootstrap/css/bootstrap.css">
    <link rel="stylesheet" type="text/css" href="/style/bootstrap/css/bootstrap-theme.css">
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
    <div class="container" ng-controller="MenuCtrl">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="#">Project Name</a>
        </div>
        <div class="collapse navbar-collapse">
            <ul class="nav navbar-nav">
                <li ng-class="{dropdown:menu.leaf}" ng-repeat="menu in menus" ng-switch="menu.type">
                    <a ng-switch-default href="#/{{menu.type}}/menu/{{menu.id}}"
                       title="{{menu.title}}">{{menu.name}}
                    </a>
                    <a ng-switch-when="dropdown" href="#/{{menu.type}}/menu/{{menu.id}}"
                       class="dropdown-toggle"
                       title="{{menu.title}}">{{menu.name}}
                        <b class="caret" ng-show="!menu.leaf"></b>
                    </a>
                    <ul class="dropdown-menu">
                        <li>
                            <a ng-repeat="subMenu in menu.children"
                               href="#/{{subMenu.type}}/menu/{{subMenu.id}}">{{subMenu.name}}</a>
                        </li>
                    </ul>
                </li>
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
    var commonTemplProvide = ['$http', '$stateParams', function ($http, $stateParams) {
        var type = $stateParams.type;
        var id = $stateParams.id;
        return  getTmpl($http, type, id);
    }];

    function getTmpl($http, type, id) {
        var url = '/entry/' + type + '/' + id;
        return  $http.get(url)
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
    }

    angular.module('huanwuji', ['ngResource', 'ui.compat', 'angularTree', 'ui.bootstrap'])
            .factory('RestService', function ($resource) {
                return {
                    Menu: $resource('/menu'),
                    SystemCode: $resource('/systemCode'),
                    Entry: $resource('/entry'),
                    Gift: $resource('/gift')
                }
            })
            .factory('Utils', function () {
                return {
                    splitArr: function (arr, limit) {
                        var _arrs = [];
                        for (var i = 0; i < arr.length; i += limit) {
                            _arrs.push(arr.slice(i, i + limit));
                        }
                        return _arrs;
                    }
                };
            })
            .constant('hwjConfig', {
                giftTypes: hwjGiftTypes
            })
            .config(
                    ['$stateProvider', '$routeProvider', '$urlRouterProvider',
                        function ($stateProvider, $routeProvider, $urlRouterProvider) {
                            $urlRouterProvider
                                    .when('/gift_index/:type/:id', '/gifts')
                                    .when('/photo_news/:type/:id', '/photo_news/:id')
                                    .when('/list_news/:type/:id', '/list_news/:id');
                            $routeProvider
                                    .when('/gift_index/:type/:id', {
                                        redirectTo: '/gifts'
                                    }).when('/photo_news/:type/:id', {
                                        redirectTo: '/photo_news/:id'
                                    }).when('/list_news/:type/:id', {
                                        redirectTo: '/list_news/:id'
                                    });
                            $stateProvider
                                    .state('single', {
                                        url: '/single/{type}/{id}',
                                        templateProvider: commonTemplProvide,
                                        controller: ['$scope', '$stateParams', 'RestService',
                                            function ($scope, $stateParams, RestService) {
                                            }]
                                    })
                                    .state('gift_index', {
                                        abstract: true,
                                        url: '/gifts',
                                        templateUrl: '/tmpl/common/gift_index.html',
                                        controller: ['$scope', '$stateParams', 'RestService',
                                            function ($scope, $stateParams, RestService) {
                                                RestService.SystemCode.query({
                                                    's-parent-null': null
                                                }, function (parentTypes) {
                                                    $scope.giftParentTypes = parentTypes;
                                                    for (var i = 0; i < parentTypes.length; i++) {
                                                        RestService.SystemCode.query({
                                                            's-parent.id': parentTypes[i].id
                                                        }, (function () {
                                                            var parentType = parentTypes[i];
                                                            return function (subTypes) {
                                                                parentType.subTypes = subTypes;
                                                            }
                                                        })());
                                                    }
                                                });
                                            }]
                                    })
                                    .state('gift_index.main', {
                                        parent: 'gift_index',
                                        url: '',
                                        templateUrl: '/tmpl/common/gift/main.html',
                                        controller: ['$scope', '$stateParams', 'RestService', 'Utils', 'hwjConfig',
                                            function ($scope, $stateParams, RestService, Utils, hwjConfig) {
                                                $scope.giftTypes = angular.copy(hwjConfig.giftTypes);
                                                $scope.giftTypes.unshift({name: '最新上架', value: 'modify'});
                                                $scope.gifts = {};
                                                RestService.Gift.get({
                                                    page: 1,
                                                    size: 8,
                                                    sorts: 'modifyDate-desc'
                                                }, function (data) {
                                                    $scope.gifts.modify = Utils.splitArr(data.content, 4);
                                                });
                                                for (var i = 0; i < hwjConfig.giftTypes.length; i++) {
                                                    var giftType = hwjConfig.giftTypes[i];
                                                    RestService.Gift.get({
                                                        page: 1,
                                                        size: 8,
                                                        's-type-eq': giftType.value
                                                    }, (function () {
                                                        var _giftType = angular.copy(giftType);
                                                        return    function (data) {
                                                            $scope.gifts[_giftType.value] = Utils.splitArr(data.content, 4);
                                                        }
                                                    })());
                                                }
                                            }]
                                    }).state('gift_index.list', {
                                        parent: 'gift_index',
                                        url: '/{cid}',
                                        templateUrl: '/tmpl/common/gift/list.html',
                                        controller: ['$scope', '$stateParams', 'RestService', 'Utils',
                                            function ($scope, $stateParams, RestService, Utils) {
                                                var cid = $stateParams.cid;
                                                $scope.maxSize = 10;
                                                $scope.setPage = function (number) {
                                                    RestService.Gift.get({
                                                                's-category.id-eq': cid, page: number, size: 16,
                                                                sorts: 'modifyDate-desc'},
                                                            function (data) {
                                                                $scope.totalPages = data.totalPages;
                                                                $scope.number = data.number + 1;
                                                                $scope.gifts = Utils.splitArr(data.content, 4);
                                                            });
                                                };
                                                $scope.setPage(1);
                                            }]
                                    }).state('gift_index.detail', {
                                        parent: 'gift_index',
                                        url: '/id/{id}',
                                        templateUrl: '/tmpl/common/gift/detail.html',
                                        controller: ['$scope', '$stateParams', 'RestService', '$http',
                                            function ($scope, $stateParams, RestService, $http) {
                                                var id = $stateParams.id;
                                                RestService.Gift.query({
                                                    's-id-eq': id
                                                }, function (data) {
                                                    $scope.gift = data[0];
                                                });
                                                $scope.tmpl = getTmpl($http, 'gift', id);
                                            }]
                                    }).state('photo_news', {
                                        url: '/photo_news/{id}',
                                        templateUrl: '/tmpl/common/entry/photo_news_list.html',
                                        controller: ['$scope', '$stateParams', 'RestService', '$http', 'Utils',
                                            function ($scope, $stateParams, RestService, $http, Utils) {
                                                var id = $stateParams.id;
                                                $scope.maxSize = 10;
                                                $scope.setPage = function (number) {
                                                    RestService.Menu.get({
                                                                's-parent.id-eq': id, page: number, size: 16,
                                                                sorts: 'modifyDate-desc'},
                                                            function (data) {
                                                                $scope.totalPages = data.totalPages;
                                                                $scope.number = data.number + 1;
                                                                $scope.news = Utils.splitArr(data.content, 6);
                                                            });
                                                };
                                                $scope.setPage(1);
                                            }]
                                    }).state('list_news', {
                                        url: '/list_news/{id}',
                                        templateUrl: '/tmpl/common/entry/list_news.html',
                                        controller: ['$scope', '$stateParams', 'RestService', '$http', 'Utils',
                                            function ($scope, $stateParams, RestService, $http, Utils) {
                                                var id = $stateParams.id;
                                                $scope.maxSize = 10;
                                                $scope.setPage = function (number) {
                                                    RestService.Menu.get({
                                                                's-parent.id-eq': id, page: number, size: 16,
                                                                sorts: 'modifyDate-desc'},
                                                            function (data) {
                                                                $scope.totalPages = data.totalPages;
                                                                $scope.number = data.number + 1;
                                                                $scope.news = data.content;
                                                            });
                                                };
                                                $scope.setPage(1);
                                            }]
                                    })
                        }
                    ])
            .controller('MenuCtrl', ['$scope', '$window', 'RestService', function ($scope, $window, RestService) {
                RestService.Menu.query({'s-parent.id-null': 0}, function (menus) {
                    $scope.menus = menus;
                    angular.forEach($scope.menus, function (menu) {
                        if (!menu.leaf) {
                            RestService.Menu.query({'s-parent.id-eq': menu.id}, (function (menu) {
                                return function (subMenus) {
                                    if (menu.type === 'dropdown') {
                                        menu.children = subMenus;
                                    }
                                }
                            })(menu));
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