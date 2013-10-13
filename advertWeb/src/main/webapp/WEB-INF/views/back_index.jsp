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
    <script src="/style/jquery/jquery-2.0.3.js"></script>
    <script src="/style/angular/angular.js"></script>
    <script src="/style/angular/ui-bootstrap-tpls-0.3.0.js"></script>
    <script src="/style/angular/angular-resource.js"></script>
    <script src="/style/angular/angular-route.js"></script>
    <script src="/style/angular/ui-router/angular-ui-router.js"></script>
    <script src="/style/angular/angular.tree.js"></script>
    <script src="/style/me/back.js"></script>
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
            <ul class="nav navbar-nav navbar-right">
                <li><a href="/logout">Logout</a></li>
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
<script src="/style/ueditor/ueditor.config.js"></script>
<script src="/style/ueditor/ueditor.all.js"></script>