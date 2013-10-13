(function () {
    var commonTemplProvide = ['$http', '$stateParams', function ($http, $stateParams) {
        var type = $stateParams.type;
        var fkId = $stateParams.fkId;
        return  getTmpl($http, type, fkId);
    }];

    function getTmpl($http, type, fkId) {
        var url = '/entry/' + type + '/' + fkId;
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

    angular.module('huanwuji', ['ngResource', 'ngRoute', 'ui.router', 'angularTree', 'ui.bootstrap', 'ngAnimate'])
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
                        .when('/list_news/:type/:id', '/list_news/:id')
                        .when('/left_nav_news/:type/:id', '/left_nav_news/:id');
                    $routeProvider
                        .when('/gift_index/:type/:id', {
                            redirectTo: '/gifts'
                        }).when('/photo_news/:type/:id', {
                            redirectTo: '/photo_news/:id'
                        }).when('/list_news/:type/:id', {
                            redirectTo: '/list_news/:id'
                        }).when('/left_nav_news/:type/:id', {
                            redirectTo: '/left_nav_news/:id'
                        });
                    $stateProvider
                        .state('single', {
                            url: '/single/{type}/{fkId}',
                            templateProvider: commonTemplProvide
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
                            controller: ['$scope', '$stateParams', 'RestService',
                                function ($scope, $stateParams, RestService) {
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
                        .state('left_nav_news', {
                            abstract: true,
                            url: '/left_nav_news/{id}',
                            templateUrl: '/tmpl/common/entry/left_nav_news.html',
                            controller: ['$scope', '$state', '$stateParams', 'RestService',
                                function ($scope, $state, $stateParams, RestService) {
                                    var id = $scope.id = $stateParams.id;
                                    RestService.Menu.query({
                                            's-parent.id-eq': id,
                                            sorts: 'treeId-asc'},
                                        function (data) {
                                            $scope.news = data;
                                            if (data && data.length > 0) {
                                                var new0 = data[0];
                                                var fkId = new0.id;
                                                if (new0.leaf) {
                                                    if (!$state.params.fkId) {
                                                        $state.transitionTo('left_nav_news.detail', {
                                                            type: 'menu', fkId: fkId, id: id
                                                        });
                                                    }
                                                } else {
                                                    $state.transitionTo('left_nav_news.list', {
                                                        menu_id: fkId, id: id
                                                    });
                                                }
                                            }
                                        });
                                }]
                        })
                        .state('left_nav_news.main', {
                            url: '',
                            parent: 'left_nav_news',
                            template: ''
                        })
                        .state('left_nav_news.list', {
                            url: '/list/{menu_id}',
                            parent: 'left_nav_news',
                            templateUrl: '/tmpl/common/entry/sub_list_news.html',
                            controller: ['$scope', '$stateParams', 'RestService',
                                function ($scope, $stateParams, RestService) {
                                    var id = $stateParams.menu_id;
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
                        .state('left_nav_news.detail', {
                            url: '/page/{type}/{fkId}',
                            parent: 'left_nav_news',
                            templateProvider: commonTemplProvide
                        })
                }
            ])
        .controller('MenuCtrl', ['$scope', '$window', 'RestService', function ($scope, $window, RestService) {
            RestService.Menu.query({'s-parent.id-null': 0}, function (menus) {
                $scope.menus = menus;
                angular.forEach($scope.menus, function (menu) {
                    if (!menu.leaf) {
                        if (menu.type === 'dropdown') {
                            RestService.Menu.query({'s-parent.id-eq': menu.id}, (function (menu) {
                                return function (subMenus) {
                                    menu.children = subMenus;
                                }
                            })(menu));
                        }
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