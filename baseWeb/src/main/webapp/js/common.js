var huanwuji = huanwuji || {};
huanwuji.basePageHelp = {
    toDataSourceFields: function (pojo) {
        var dsFields = {};
        for (var i = 0; i < pojo.length; i++) {
            var prop = pojo[i];
            if (prop.dsProps) {
                dsFields[prop.field] = prop.dsProps;
            }
        }
        return dsFields;
    },
    toColumns: function (pojo) {
        var columns = [];
        for (var i = 0; i < pojo.length; i++) {
            var prop = pojo[i];
            var column = {};
            column.field = prop.field;
            if (prop.colProps) {
                $.extend(column, prop.colProps);
                columns.push(column);
            }
        }
        return columns;
    },
    setValidation: function (ele, pojo) {
        for (var i = 0; i < pojo.length; i++) {
            var prop = pojo[i];
            var field = prop.field;
            var validateProps = prop.dsProps.validation;
            if (validateProps) {
                $("[name='" + field + "']", ele).attr(validateProps);
            }
        }
        $(ele).kendoValidator().data("kendoValidator");
        $(".save", ele).click(function (e) {
            e.preventDefault();
            $.post("/menu/save.do", $(ele).serialize()).success(function (data) {
//                $("#msg", ele).text("保存成功！").addClass("alert-success").alert();
                $("#msg", ele).attr("data-original-title", "保存成功！").tooltip({trigger: "manual"}).tooltip('show');
                window.setTimeout(function () {
                    $("#msg", ele).tooltip("hide");
                }, 3000);
            }).error(function () {
                    $("#msg", ele).attr("data-original-title", "保存失败！").tooltip({trigger: "manual"}).tooltip('show');
                    window.setTimeout(function () {
                        $("#msg", ele).tooltip("hide");
                    }, 3000);
                });
            return false;
        });
    },
    createEmptyPojo: function (pojo) {
        var emptyPojo = {};
        for (var i = 0; i < pojo.length; i++) {
            var prop = pojo[i];
            var defaultValue = "";
            if (prop.dsProps) {
                defaultValue = prop.dsProps.defaultValue || defaultValue;
            }
            emptyPojo[prop.field] = defaultValue;
        }
        return emptyPojo;
    }
};
huanwuji.formHelp = {
    radioChecked: function (data, value) {
        if (xeno.common.util.BooleanUtils.parse(data) === value) {
            return "checked";
        }
        return "";
    }
};
huanwuji.LoadTemp = function (url) {
    var temp;
    $.get(url).success(function (data) {
        temp = _.template(data);
    });
    this.tpl = function (data) {
        return temp(data);
    }
}
;