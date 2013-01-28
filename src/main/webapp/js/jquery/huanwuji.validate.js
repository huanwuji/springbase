var huanwuji = {};
huanwuji.validateUtils = function (form, options) {
    var methods = {
        element: function (field) {
            if ($.type(field) === "string") {
                field = $('[name="' + field + '"]');
            }
            return field;
        }, elementValue: function (element) {
            var type = $(element).attr('type'),
                val = $(element).val();
            if (type === 'radio' || type === 'checkbox') {
                return $('input[name="' + $(element).attr('name') + '"]:checked').val();
            }
            if (typeof val === 'string') {
                return val.replace(/\r/g, "");
            }
            return val;
        }, checkable: function (element) {
            return (/radio|checkbox/i).test(element.prop("type"));
        }, findByName: function (name) {
            return $(form).find('[name="' + name + '"]');
        }, getLength: function (value, element) {
            switch (element.prop("nodeName").toLowerCase()) {
                case 'select':
                    return $("option:selected", element).length;
                case 'input':
                    if (methods.checkable(element)) {
                        return methods.findByName(element.prop("name")).filter(':checked').length;
                    }
            }
            return value.length;
        }, optional: function (element) {
            var val = methods.elementValue(element);
            return !methods.required(val, element);
        }, rules: {
            required: function (value, element) {
                if (element.prop("nodeName").toLowerCase() === "select") {
                    var val = $(element).val();
                    return val && val.length > 0;
                }
                if (methods.checkable(element)) {
                    return methods.getLength(value, element) > 0;
                }
                return $.trim(value).length > 0;
            }, minLength: function (value, element, param) {
                var length = $.isArray(value) ? value.length : methods.getLength($.trim(value), element);
                return methods.optional(element) || length >= param;
            }, maxLength: function (value, element, param) {
                var length = $.isArray(value) ? value.length : methods.getLength($.trim(value), element);
                return methods.optional(element) || length <= param;
            }, rangeLength: function (value, element, param) {
                var length = $.isArray(value) ? value.length : methods.getLength($.trim(value), element);
                var min = $(element).prop("minLength");
                var max = $(element).prop("maxLength");
                return methods.optional(element) || (length >= param[0] && length <= param[1]);
            }, min: function (value, element, param) {
                return methods.optional(element) || value >= param;
            }, max: function (value, element, param) {
                return methods.optional(element) || value <= param;
            }, range: function (value, element, param) {
                var min = $(element).prop("min");
                var max = $(element).prop("max");
                return methods.optional(element) || (value >= param[0] && value <= param[1]);
            }, email: function (value, element) {
                return methods.optional(element) || /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(value);
            }, url: function (value, element) {
                return methods.optional(element) || /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(value);
            }, date: function (value, element) {
                return methods.optional(element) || !/Invalid|NaN/.test(new Date(value).toString());
            }, dateISO: function (value, element) {
                return methods.optional(element) || /^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}$/.test(value);
            }, number: function (value, element) {
                return methods.optional(element) || /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value);
            }, digits: function (value, element) {
                return methods.optional(element) || /^\d+$/.test(value);
            }, equalTo: function (value, element, param) {
                var target = $(param);
                return value === target.val();
            }, regex: function (value, element, param) {
                return methods.optional(element) || new RegExp(param).test(value);
            }
        }, message: {
            required: "必选字段",
            remote: "请修正该字段",
            email: "请输入正确格式的电子邮件",
            url: "请输入合法的网址",
            date: "请输入合法的日期",
            dateISO: "请输入合法的日期 (ISO).",
            number: "请输入合法的数字",
            digits: "只能输入整数",
            creditcard: "请输入合法的信用卡号",
            equalTo: "请再次输入相同的值",
            accept: "请输入拥有合法后缀名的字符串",
            maxLength: _.template("请输入一个长度最多是 <%=ele.maxLength%> 的字符串"),
            minLength: _.template("请输入一个长度最少是 <%=ele.minLength%> 的字符串"),
            rangeLength: _.template("请输入一个长度介于 <%=ele.minLength%> 和 <%=ele.maxLength%> 之间的字符串"),
            range: _.template("请输入一个介于 <%=ele.min%> 和 <%=ele.max%> 之间的值"),
            max: _.template("请输入一个最大为 <%=ele.max%> 的值"),
            min: _.template("请输入一个最小为 <%=ele.min%> 的值")
        }, errorTemplate: '<div class="alert fade in"><button type="button" class="close" data-dismiss="alert">×</button><p class="errorMsg"></p></div>',
        prototype: {
            validate: function (field, value) {
                field = options.element(field);
                var result = this.check(field, value);
                if (result) {
                    this.showError(field, result.ruleName);
                    console.log(result);
                    return false;
                }
                return true;
            }, check: function (field, value) {
                field = options.element(field);
                var REQUIRED = "required";
                var result = {field: field};
                if (field.attr(REQUIRED)) {
                    if (options.rules[REQUIRED](value, field, field.attr(REQUIRED))) {
                        result.ruleName = REQUIRED;
                        return result;
                    }
                }
                if (field.prop("type")) {
                    var type = field.prop("type");
                    var rule = options.rules[type];
                    if (rule && rule(value, field, field.attr(ruleName))) {
                        result.ruleName = type;
                        return result;
                    }
                }
                for (var ruleName in options.rules) {
                    if (field.attr(ruleName)) {
                        var rule = options.rules[ruleName];
                        if (rule(value, field, field.attr(ruleName))) {
                            result.ruleName = ruleName;
                            return  result;
                        }
                    }
                }
                return false;
            }, showError: function (element, ruleName, message) {
                var errorMsg = message || options.message[ruleName];
                if (typeof errorMsg !== 'string') {
                    errorMsg = errorMsg({ele: element});
                }
                if (!element.parent().has(".errorMsg")) {
                    $(options.errorTemplate).insertAfter(ele);
                }
                element.parent().find(".errorMsg").html(errorMsg).parent().addClass("error");
            }
        }
    };
    if (options) {
        for (var method in methods) {
            $.extend(options[method], methods[method]);
        }
    } else {
        options = methods;
    }
    return (function () {
        var clazz = function () {
        };
        $.extend(clazz.prototype, options.prototype);
        return new clazz;
    })();
}