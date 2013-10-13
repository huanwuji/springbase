<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html ng-app="huanwuji">
<head>
    <title></title>
    <meta charset="utf-8">
    <link rel="stylesheet" type="text/css" href="/style/bootstrap/css/bootstrap.css">
    <%--<link rel="stylesheet" type="text/css" href="/style/bootstrap/css/bootstrap-theme.css">--%>
    <link rel="stylesheet" type="text/css" href="/style/angular/angular-animate.css">
    <link rel="stylesheet" type="text/css" href="/style/me/huanwuji.css">
    <%--<link rel="stylesheet" type="text/css" href="/style/bootstrap/js/bootstrap.js">--%>
    <script src="/style/me/huanwuji.js"></script>
    <script src="/style/jquery/jquery-2.0.3.js"></script>
    <script src="/style/angular/angular.js"></script>
    <script src="/style/angular/ui-bootstrap-tpls-0.3.0.js"></script>
    <script src="/style/angular/angular-resource.js"></script>
    <script src="/style/angular/angular-route.js"></script>
    <script src="/style/angular/ui-router/angular-ui-router.js"></script>
    <script src="/style/angular/angular.tree.js"></script>
    <script src="/style/angular/angular-animate.js"></script>
    <script src="/style/me/index.js"></script>
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
    <div class="row" ui-view></div>
    <hr>
    <footer>
        <p>&copy; Company 2013</p>
    </footer>
</div>
</body>
</html>