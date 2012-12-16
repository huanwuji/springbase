/*!
 * NOTICE --- 2012/10/08
 * 
 * VERSION > 2.1.0
 * WEBSITE > HTTP://CODE.GOOGLE.COM/P/XENO/
 * 
 * COPYRIGHT (C) ERIC FENG, HTTP://WWW.SINCE10.COM, ALL RIGHTS RESERVED.
 * 
 * PERMISSION IS HEREBY GRANTED, FREE OF CHARGE, TO ANY PERSON OBTAINING
 * A COPY OF THIS SOFTWARE AND ASSOCIATED DOCUMENTATION FILES (THE
 * "SOFTWARE"), TO DEAL IN THE SOFTWARE WITHOUT RESTRICTION, INCLUDING
 * WITHOUT LIMITATION THE RIGHTS TO USE, COPY, MODIFY, MERGE, PUBLISH,
 * DISTRIBUTE, SUBLICENSE, AND/OR SELL COPIES OF THE SOFTWARE, AND TO
 * PERMIT PERSONS TO WHOM THE SOFTWARE IS FURNISHED TO DO SO, SUBJECT TO
 * THE FOLLOWING CONDITIONS:
 * 
 * THE ABOVE COPYRIGHT NOTICE AND THIS PERMISSION NOTICE SHALL BE
 * INCLUDED IN ALL COPIES OR SUBSTANTIAL PORTIONS OF THE SOFTWARE.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
 /**
 * @ignore
 */
var _Namespace__ = (function() {

	return {

		register: function(name) {
			var namesArr = name.split('.');
			var execCode = "";
			var shortName = "";

			for(var i = 0; i < namesArr.length; i += 1) {

				if(i != 0) {
					shortName += ".";
				}

				shortName += namesArr[i];
				execCode += "if (typeof(" + shortName + ") == 'undefined') " + shortName + " = {};";
			}

			if(execCode != "") {
				eval(execCode);
			}
		}
	};

})();

_Namespace__.register("xeno.common.lang");
_Namespace__.register("xeno.common.office");
_Namespace__.register("xeno.common.util");
/**
 * @class
 * <p>
 * This class provides some additional common functions for general using.
 * </p>
 * 
 * @description
 * <p>
 * The class constructor.
 * </p>
 * 
 * @since
 * 			1.0.0
 */
xeno.common.lang.Data = (function () {

	var _safeToExecute = function(data, ignoreNull, func) {

		if(ignoreNull && _isNull(data)) {
			return true;

		} else if(ignoreNull && _isUndefined(data)) {
			return false;

		} else if(_isUndefinedOrNull(data)) {
			return false;
		}

		return func();
	};

	// ------------------------------
	// Private Function Definitions
	// ------------------------------

	var _isUndefined = function(data) {
		return typeof(data) === "undefined";
	};

	var _isNull = function(data) {
		return data === null;
	};

	var _isUndefinedOrNull = function(data) {
		return _isUndefined(data) || _isNull(data);
	};

	var _isNumber = function(data, ignoreNull) {

		return _safeToExecute(data, ignoreNull, function() {
			return !_isString(data) && !isNaN(parseFloat(data)) && isFinite(data);
		});
	};

	var _isBoolean = function(data, ignoreNull) {

		return _safeToExecute(data, ignoreNull, function() {
			return data.constructor === Boolean;
		});
	};

	var _isString = function(data, ignoreNull) {

		return _safeToExecute(data, ignoreNull, function() {
			return data.constructor === String;
		});
	};

	var _isArray = function(data, ignoreNull) {

		return _safeToExecute(data, ignoreNull, function() {
			return data.constructor === Array;
		});
	};

	var _isDate = function(data, ignoreNull) {

		return _safeToExecute(data, ignoreNull, function() {
			return data.constructor === Date;
		});
	};

	var _isRegExp = function(data, ignoreNull) {

		return _safeToExecute(data, ignoreNull, function() {
			return data.constructor === RegExp;
		});
	};

	var _isFunction = function(data, ignoreNull) {

		return _safeToExecute(data, ignoreNull, function() {
			return data.constructor === Function;
		});
	};

	var _ensures = function(result, message) {

		if(!result) {
			throw new Error(message);
		}
	};

	// ------------------------------
	// Public Function Definitions
	// ------------------------------

	return {

		/**
		 * @description
		 * <p>
		 * Tests whether the "data" is undefined or not.
		 * </p>
		 * 
		 * @param data
		 * 			The data to be tested.
		 * 
		 * @return
		 * 			The Boolean.
		 * 
		 * @throws
		 * 			The Error will be thrown when the "data" is missing.
		 * 
		 * @since
		 * 			1.0.0
		 */
		isUndefined: function(data) {
			_ensures(arguments.length > 0, "The 'data' is required, index: 0");

			return _isUndefined(data);
		},

		/**
		 * @description
		 * <p>
		 * Tests whether the "data" is null or not.
		 * </p>
		 * 
		 * @param data
		 * 			The data to be tested.
		 * 
		 * @return
		 * 			The Boolean.
		 * 
		 * @throws
		 * 			The Error will be thrown when the "data" is missing.
		 * 
		 * @since
		 * 			1.0.0
		 */
		isNull: function(data) {
			_ensures(arguments.length > 0, "The 'data' is required, index: 0");

			return _isNull(data);
		},

		/**
		 * @description
		 * <p>
		 * Tests whether the "data" is undefined, null or not.
		 * </p>
		 * 
		 * @param data
		 * 			The data to be tested.
		 * 
		 * @return
		 * 			The Boolean.
		 * 
		 * @throws
		 * 			The Error will be thrown when the "data" is missing.
		 * 
		 * @since
		 * 			1.0.0
		 */
		isUndefinedOrNull: function(data) {
			_ensures(arguments.length > 0, "The 'data' is required, index: 0");

			return _isUndefinedOrNull(data);
		},

		/**
		 * @description
		 * <p>
		 * Tests whether the "data" is a Number or not.
		 * </p>
		 * <p>
		 * Normally, for any not Number "data", including undefined and null, the false returns.
		 * </p>
		 * 
		 * @param data
		 * 			The data to be tested.
		 * @param ignoreNull
		 * 			A Boolean value to decide whether ignore the null "data" situation during the test.<br/>
		 * 			If this value is set to true, for the null "data", the true returns.<br/>
		 * 			The default value is: false.
		 * 
		 * @return
		 * 			The Boolean.
		 * 
		 * @throws
		 * 			The Error will be thrown when the "data" is missing.<br/>
		 * 			Or it will be thrown when the "ignoreNull" is not a Boolean.
		 * 
		 * @since
		 * 			1.0.0
		 */
		isNumber: function(data, ignoreNull) {
			var _arguments = arguments.length;

			_ensures(_arguments > 0, "The 'data' is required, index: 0");

			var _ignoreNull = false;

			if(_arguments > 1) {
				_ensures(_isBoolean(ignoreNull), "The 'ignoreNull' is not a Boolean");

				_ignoreNull = ignoreNull;
			}

			return _isNumber(data, _ignoreNull);
		},

		/**
		 * @description
		 * <p>
		 * Tests whether the "data" is a Boolean or not.
		 * </p>
		 * <p>
		 * As in the "if" statement, any not undefined and null value will be considered as true, but in this function only return true when the "data" is the true or the false.
		 * </p>
		 * <p>
		 * Normally, for any not Boolean "data", including undefined and null, the false returns.
		 * </p>
		 * 
		 * @param data
		 * 			The data to be tested.
		 * @param ignoreNull
		 * 			A Boolean value to decide whether ignore the null "data" situation during the test.<br/>
		 * 			If this value is set to true, for the null "data", the true returns.<br/>
		 * 			The default value is: false.
		 * 
		 * @return
		 * 			The Boolean.
		 * 
		 * @throws
		 * 			The Error will be thrown when the "data" is missing.<br/>
		 * 			Or it will be thrown when the "ignoreNull" is not a Boolean.
		 * 
		 * @since
		 * 			1.0.0
		 */
		isBoolean: function(data, ignoreNull) {
			var _arguments = arguments.length;

			_ensures(_arguments > 0, "The 'data' is required, index: 0");

			var _ignoreNull = false;

			if(_arguments > 1) {
				_ensures(_isBoolean(ignoreNull), "The 'ignoreNull' is not a Boolean");

				_ignoreNull = ignoreNull;
			}

			return _isBoolean(data, _ignoreNull);
		},

		/**
		 * @description
		 * <p>
		 * Tests whether the "data" is a String or not.
		 * </p>
		 * <p>
		 * Normally, for any not String "data", including undefined and null, the false returns.
		 * </p>
		 * 
		 * @param data
		 * 			The data to be tested.
		 * @param ignoreNull
		 * 			A Boolean value to decide whether ignore the null "data" situation during the test.<br/>
		 * 			If this value is set to true, for the null "data", the true returns.<br/>
		 * 			The default value is: false.
		 * 
		 * @return
		 * 			The Boolean.
		 * 
		 * @throws
		 * 			The Error will be thrown when the "data" is missing.<br/>
		 * 			Or it will be thrown when the "ignoreNull" is not a Boolean.
		 * 
		 * @since
		 * 			1.0.0
		 */
		isString: function(data, ignoreNull) {
			var _arguments = arguments.length;

			_ensures(_arguments > 0, "The 'data' is required, index: 0");

			var _ignoreNull = false;

			if(_arguments > 1) {
				_ensures(_isBoolean(ignoreNull), "The 'ignoreNull' is not a Boolean");

				_ignoreNull = ignoreNull;
			}

			return _isString(data, _ignoreNull);
		},

		/**
		 * @description
		 * <p>
		 * Tests whether the "data" is an Array or not.
		 * </p>
		 * <p>
		 * Normally, for any not Array "data", including undefined and null, the false returns.
		 * </p>
		 * 
		 * @param data
		 * 			The data to be tested.
		 * @param ignoreNull
		 * 			A Boolean value to decide whether ignore the null "data" situation during the test.<br/>
		 * 			If this value is set to true, for the null "data", the true returns.<br/>
		 * 			The default value is: false.
		 * 
		 * @return
		 * 			The Boolean.
		 * 
		 * @throws
		 * 			The Error will be thrown when the "data" is missing.<br/>
		 * 			Or it will be thrown when the "ignoreNull" is not a Boolean.
		 * 
		 * @since
		 * 			1.0.0
		 */
		isArray: function(data, ignoreNull) {
			var _arguments = arguments.length;

			_ensures(_arguments > 0, "The 'data' is required, index: 0");

			var _ignoreNull = false;

			if(_arguments > 1) {
				_ensures(_isBoolean(ignoreNull), "The 'ignoreNull' is not a Boolean");

				_ignoreNull = ignoreNull;
			}

			return _isArray(data, _ignoreNull);
		},

		/**
		 * @description
		 * <p>
		 * Tests whether the "data" is a Date or not.
		 * </p>
		 * <p>
		 * Normally, for any not Date "data", including undefined and null, the false returns.
		 * </p>
		 * 
		 * @param data
		 * 			The data to be tested.
		 * @param ignoreNull
		 * 			A Boolean value to decide whether ignore the null "data" situation during the test.<br/>
		 * 			If this value is set to true, for the null "data", the true returns.<br/>
		 * 			The default value is: false.
		 * 
		 * @return
		 * 			The Boolean.
		 * 
		 * @throws
		 * 			The Error will be thrown when the "data" is missing.<br/>
		 * 			Or it will be thrown when the "ignoreNull" is not a Boolean.
		 * 
		 * @since
		 * 			1.0.0
		 */
		isDate: function(data, ignoreNull) {
			var _arguments = arguments.length;

			_ensures(_arguments > 0, "The 'data' is required, index: 0");

			var _ignoreNull = false;

			if(_arguments > 1) {
				_ensures(_isBoolean(ignoreNull), "The 'ignoreNull' is not a Boolean");

				_ignoreNull = ignoreNull;
			}

			return _isDate(data, _ignoreNull);
		},

		/**
		 * @description
		 * <p>
		 * Tests whether the "data" is a RegExp or not.
		 * </p>
		 * <p>
		 * Normally, for any not RegExp "data", including undefined and null, the false returns.
		 * </p>
		 * 
		 * @param data
		 * 			The data to be tested.
		 * @param ignoreNull
		 * 			A Boolean value to decide whether ignore the null "data" situation during the test.<br/>
		 * 			If this value is set to true, for the null "data", the true returns.<br/>
		 * 			The default value is: false.
		 * 
		 * @return
		 * 			The Boolean.
		 * 
		 * @throws
		 * 			The Error will be thrown when the "data" is missing.<br/>
		 * 			Or it will be thrown when the "ignoreNull" is not a Boolean.
		 * 
		 * @since
		 * 			1.0.0
		 */
		isRegExp: function(data, ignoreNull) {
			var _arguments = arguments.length;

			_ensures(_arguments > 0, "The 'data' is required, index: 0");

			var _ignoreNull = false;

			if(_arguments > 1) {
				_ensures(_isBoolean(ignoreNull), "The 'ignoreNull' is not a Boolean");

				_ignoreNull = ignoreNull;
			}

			return _isRegExp(data, _ignoreNull);
		},

		/**
		 * @description
		 * <p>
		 * Tests whether the "data" is a Function or not.
		 * </p>
		 * <p>
		 * Normally, for any not Function "data", including undefined and null, the false returns.
		 * </p>
		 * 
		 * @param data
		 * 			The data to be tested.
		 * @param ignoreNull
		 * 			A Boolean value to decide whether ignore the null "data" situation during the test.<br/>
		 * 			If this value is set to true, for the null "data", the true returns.<br/>
		 * 			The default value is: false.
		 * 
		 * @return
		 * 			The Boolean.
		 * 
		 * @throws
		 * 			The Error will be thrown when the "data" is missing.<br/>
		 * 			Or it will be thrown when the "ignoreNull" is not a Boolean.
		 * 
		 * @since
		 * 			1.0.0
		 */
		isFunction: function(data, ignoreNull) {
			var _arguments = arguments.length;

			_ensures(_arguments > 0, "The 'data' is required, index: 0");

			var _ignoreNull = false;

			if(_arguments > 1) {
				_ensures(_isBoolean(ignoreNull), "The 'ignoreNull' is not a Boolean");

				_ignoreNull = ignoreNull;
			}

			return _isFunction(data, _ignoreNull);
		},

		/**
		 * @description
		 * <p>
		 * Ensures the "result" is true, and an Error will be thrown when the validation failed.
		 * </p>
		 * 
		 * @param result
		 * 			The result to be ensured.
		 * @param message
		 * 			The message to be displayed when the validation failed.<br/>
		 * 			The default value is: "The 'result' could not be ensured".
		 * 
		 * @throws
		 * 		The Error will be thrown when the "result" is missing.<br/>
		 * 		Or it will be thrown when the "result" is not a Boolean.<br/>
		 * 		Or it will be thrown when the "message" is not null or not a String.<br/>
		 * 		Or it will be thrown when the validation failed.
		 * 
		 * @since
		 * 			1.0.0
		 */
		ensures: function(result, message) {
			var _arguments = arguments.length;

			_ensures(_arguments > 0, "The 'result' is required, index: 0");
			_ensures(_isBoolean(result), "The 'result' is not a Boolean");

			var _message = "The 'result' could not be ensured";

			if(_arguments > 1) {
				_ensures(_isString(message, true), "The 'message' is not null or not a String");

				_message = message;
			}

			_ensures(result, _message);
		}

	};

})();
/**
 * @class
 * <p>
 * This class provides constants for HTML event types.
 * </p>
 * 
 * @description
 * <p>
 * The class constructor.
 * </p>
 * 
 * @since
 * 			1.3.0
 */
xeno.common.lang.EventType = {

	/**
	 * @description
	 * <p>
	 * The "click" event type.
	 * </p>
	 */
	CLICK: "click",

	/**
	 * @description
	 * <p>
	 * The "mousedown" event type.
	 * </p>
	 */
	MOUSE_DOWN: "mousedown",

	/**
	 * @description
	 * <p>
	 * The "mouseup" event type.
	 * </p>
	 */
	MOUSE_UP: "mouseup",

	/**
	 * @description
	 * <p>
	 * The "mouseover" event type.
	 * </p>
	 */
	MOUSE_OVER: "mouseover",

	/**
	 * @description
	 * <p>
	 * The "mousemove" event type.
	 * </p>
	 */
	MOUSE_MOVE: "mousemove",

	/**
	 * @description
	 * <p>
	 * The "mouseout" event type.
	 * </p>
	 */
	MOUSE_OUT: "mouseout",

	/**
	 * @description
	 * <p>
	 * The "load" event type.
	 * </p>
	 */
	LOAD: "load",

	/**
	 * @description
	 * <p>
	 * The "unload" event type.
	 * </p>
	 */
	UNLOAD: "unload",

	/**
	 * @description
	 * <p>
	 * The "abort" event type.
	 * </p>
	 */
	ABORT: "abort",

	/**
	 * @description
	 * <p>
	 * The "error" event type.
	 * </p>
	 */
	ERROR: "error",

	/**
	 * @description
	 * <p>
	 * The "select" event type.
	 * </p>
	 */
	SELECT: "select",

	/**
	 * @description
	 * <p>
	 * The "change" event type.
	 * </p>
	 */
	CHANGE: "change",

	/**
	 * @description
	 * <p>
	 * The "submit" event type.
	 * </p>
	 */
	SUBMIT: "submit",

	/**
	 * @description
	 * <p>
	 * The "reset" event type.
	 * </p>
	 */
	RESET: "reset",

	/**
	 * @description
	 * <p>
	 * The "focus" event type.
	 * </p>
	 */
	FOCUS: "focus",

	/**
	 * @description
	 * <p>
	 * The "blur" event type.
	 * </p>
	 */
	BLUR: "blur",

	/**
	 * @description
	 * <p>
	 * The "resize" event type.
	 * </p>
	 */
	RESIZE: "resize",

	/**
	 * @description
	 * <p>
	 * The "scroll" event type.
	 * </p>
	 */
	SCROLL: "scroll"
};
/**
 * @class
 * <p>
 * This class has implemented the globally unique identifier (GUID) related operations.
 * </p>
 * 
 * @description
 * <p>
 * The class constructor.
 * </p>
 * 
 * @since
 * 			1.0.0
 */
xeno.common.lang.GUID = (function () {
	var _count = 0;
	var _guid = new RegExp("^(?:[A-F0-9]{8})(?:-[A-F0-9]{4}){3}-(?:[A-F0-9]{12})$", "i");

	// ------------------------------
	// Private Function Definitions
	// ------------------------------

	var _newValue = function(toUpperCase) {
		var i1 = new Date().getTime();
		var i2 = navigator.appCodeName + navigator.appName + navigator.appVersion + navigator.platform + navigator.userAgent;
		var i3 = Math.random() * Number.MAX_VALUE;
		var rs = xeno.common.util.CryptoUtils.md5Hex(i1 + i2 + i3 + _count++, toUpperCase);

		return rs.substring(0, 8) + "-" + rs.substring(8, 12) + "-" + rs.substring(12, 16) + "-" + rs.substring(16, 20) + "-" + rs.substring(20);
	};

	var _emptyValue = function() {
		return "00000000-0000-0000-0000-000000000000";
	};

	var _test = function(guid) {
		return _guid.test(guid);
	};

	return {

		/**
		 * @description
		 * <p>
		 * Generates and returns a new GUID value.
		 * </p>
		 * <p>
		 * The format of the value is: ########-####-####-####-############.
		 * </p>
		 * 
		 * @param toUpperCase
		 * 			A Boolean value to decide whether all characters in the return value are in upper case or not.<br/>
		 * 			The default value is: false.
		 * 
		 * @return
		 * 			The String.
		 * 
		 * @throws
		 * 			The Error will be thrown when the "toUpperCase" is not a Boolean.
		 * 
		 * @since
		 * 			1.0.0
		 */
		newValue: function(toUpperCase) {
			var _toUpperCase = false;

			if(arguments.length > 0) {
				xeno.common.lang.Data.ensures(xeno.common.lang.Data.isBoolean(toUpperCase), "The 'toUpperCase' is not a Boolean");

				_toUpperCase = toUpperCase;
			}

			return _newValue(_toUpperCase);
		},

		/**
		 * @description
		 * <p>
		 * Returns the empty GUID value: 00000000-0000-0000-0000-000000000000.
		 * </p>
		 * 
		 * @return
		 * 			The String.
		 * 
		 * @since
		 * 			1.0.0
		 */
		emptyValue: function() {
			return _emptyValue();
		},

		/**
		 * @description
		 * <p>
		 * Tests whether the "guid" is a valid GUID value or not.
		 * </p>
		 * <p>
		 * The function also handles null "guid" and returns false.
		 * </p>
		 * 
		 * @param guid
		 * 			The String to be tested.
		 * 
		 * @return
		 * 			The Boolean.
		 * 
		 * @throws
		 * 			The Error will be thrown when the "guid" is missing.<br/>
		 * 			Or it will be thrown when the "guid" is not null or not a String.
		 * 
		 * @since
		 * 			1.0.0
		 */
		test: function(guid) {
			xeno.common.lang.Data.ensures(arguments.length > 0, "The 'guid' is required, index: 0");
			xeno.common.lang.Data.ensures(xeno.common.lang.Data.isString(guid, true), "The 'guid' is not null or not a String");

			return _test(guid);
		}

	};

})();
/**
 * @class
 * <p>
 * The class is designed for handling pagination's calculations.
 * </p>
 * 
 * @description
 * <p>
 * The class constructor.
 * </p>
 * <p>
 * The "totalCount", "pageSize",  or the "currentPage" maybe a float value, the "Math.floor(n)" action will be processed first to convert it into an integer Number.
 * </p>
 * 
 * @param totalCount
 * 			The total count.<br/>
 * 			A negative value will be converted into 0 automatically.
 * @param pageSize
 * 			The page size.<br/>
 * 			A negative or 0 value will represent there is no page size defined and converted into -1 automatically.
 * @param currentPage
 * 			The current page number.<br/>
 * 			If the value is greater than the calculated total page, it will be converted into the total page automatically.
 * 
 * @throws
 * 			The Error will be thrown when the "totalCount", the "pageSize", or the "currentPage" is missing.<br/>
 * 			Or it will be thrown when the "totalCount", the "pageSize", or the "currentPage" is not a Number.<br/>
 * 
 * @since
 * 			1.2.0
 */
xeno.common.lang.Pagination = function(totalCount, pageSize, currentPage) {
	var _arguments = arguments.length;

	xeno.common.lang.Data.ensures(_arguments > 0, "The 'totalCount' is required, index: 0");
	xeno.common.lang.Data.ensures(_arguments > 1, "The 'pageSize' is required, index: 1");
	xeno.common.lang.Data.ensures(_arguments > 2, "The 'currentPage' is required, index: 2");
	xeno.common.lang.Data.ensures(xeno.common.lang.Data.isNumber(totalCount), "The 'totalCount' is not a Number");
	xeno.common.lang.Data.ensures(xeno.common.lang.Data.isNumber(pageSize), "The 'pageSize' is not a Number");
	xeno.common.lang.Data.ensures(xeno.common.lang.Data.isNumber(currentPage), "The 'currentPage' is not a Number");

	var _totalCount = Math.floor(totalCount);
	var _pageSize = Math.floor(pageSize);
	var _currentPage = Math.floor(currentPage);
	var _totalPage = 0;
	var _firstRow = 0;

	/**
	 * @description
	 * <p>
	 * Returns the total count.
	 * </p>
	 * 
	 * @return The Number.
	 */
	this.getTotalCount = function() {
		return _totalCount;
	};

	/**
	 * @description
	 * <p>
	 * Return the current page number, start from 1. If a 0 value returns, it represents there is no page.
	 * </p>
	 * 
	 * @return The Number.
	 */
	this.getCurrentPage = function() {
		return _currentPage;
	};

	/**
	 * @description
	 * <p>
	 * Return the total page.
	 * </p>
	 * 
	 * @return The Number.
	 */
	this.getTotalPage = function() {
		return _totalPage;
	};

	/**
	 * @description
	 * <p>
	 * Returns the first row position, start from 0.
	 * </p>
	 * 
	 * @return The Number.
	 */
	this.getFirstRow = function() {
		return _firstRow;
	};

	/**
	 * @description
	 * <p>
	 * Returns the page size, a negative value will represent there is no page size defined.
	 * </p>
	 * 
	 * @return The Number.
	 */
	this.getPageSize = function() {
		return _pageSize;
	};

	/**
	 * @ignore
	 */
	this.toString = function() {
		return "[totalCount=" + _totalCount + ", pageSize=" + _pageSize + ", currentPage=" + _currentPage + ", totalPage=" + _totalPage + ", firstRow=" + _firstRow + "]";
	};

	var _calculateCurrentPage = function(currentPage, totalPage) {

		if (totalPage === 0) {
			return 0;
		}

		if (currentPage <= 0) {
			return 1;

		} else if (currentPage > totalPage) {
			return totalPage;

		} else {
			return currentPage;
		}
	};

	var _calculateTotalPage = function(totalCount, pageSize) {

		if (totalCount === 0) {
			return 0;
		}

		if (pageSize > 0) {
			return Math.ceil(totalCount / pageSize);

		} else {
			return 1;
		}
	};

	var _calculateFirstRow = function(currentPage, pageSize) {

		if (pageSize < 0) {
			return 0;
		}

		var ret = pageSize * (currentPage - 1);

		if (ret < 0) {
			return 0;
		}

		return ret;
	};

	_totalCount = _totalCount < 0 ? 0 : _totalCount;
	_pageSize = _pageSize < 1 ? -1 : _pageSize;
	_totalPage = _calculateTotalPage(_totalCount, _pageSize);
	_currentPage = _calculateCurrentPage(_currentPage, _totalPage);
	_firstRow = _calculateFirstRow(_currentPage, _pageSize);
};
/**
 * @class
 * <p>
 * This class has implemented some excel cell related calculations.
 * </p>
 * 
 * @description
 * <p>
 * The class constructor.
 * </p>
 * 
 * @since
 * 			1.0.0
 */
xeno.common.office.ExcelCellCalculator = (function () {
	var _address = new RegExp("^[A-Z]+[1-9]\\d*$", "i");
	var _column = new RegExp("[A-Z]+", "i");

	var _getChar = function(value) {
		var mantissa = (value % 26) !== 0 ? value % 26 : 26;

		if (value - mantissa >= 26) {
			return _getChar(Math.floor((value - mantissa) / 26)) + String.fromCharCode(64 + mantissa);

		} else {
			return String.fromCharCode(64 + mantissa);
		}
	};

	var _getInt = function(value) {
		var val = value.toUpperCase();
		var dec = 0;

		for (var i = 0; i < val.length; i += 1) {
			dec += (val.charCodeAt(val.length - 1 - i) - 64) * Math.pow(26, i);
		}

		return dec - 1;
	};

	// ------------------------------
	// Private Function Definitions
	// ------------------------------

	var _getAddress = function(row, column, toUpperCase) {
		var _row = Math.floor(row);
		var _column = Math.floor(column);

		var ret = _getChar(_column + 1) + (_row + 1);

		return toUpperCase ? ret : ret.toLowerCase();
	};

	var _getIndex = function(address) {
		var column = _column.exec(address)[0];
		var row = xeno.common.util.StringUtils.remove(address, column);

		return {
			row: parseInt(row) - 1,
			column: _getInt(column)
		};
	};

	return {

		/**
		 * @description
		 * <p>
		 * Calculates and returns the excel cell address by the "row" and the "column" index.
		 * </p>
		 * <p>
		 * The result will be returned in "A1" format, and the passes in arguments "row" and "column" are zero based.
		 * </p>
		 * <p>
		 * The "row" or the "column" maybe a float value, the "Math.floor(n)" action will be processed first to convert it into an integer Number.
		 * </p>
		 * 
		 * @example
		 * <b>Examples</b>
		 * 
		 * xeno.common.office.ExcelCellCalculator.getAddress(8, 2) = "c9"
		 * 
		 * @param row
		 * 			The row index.
		 * @param column
		 * 			The column index.
		 * @param toUpperCase
		 * 			A Boolean value to decide whether all characters in the return value are in upper case or not.<br/>
		 * 			The default value is: false.
		 * 
		 * @return
		 * 			The String.
		 * 
		 * @throws
		 * 			The Error will be thrown when the "row" or the "column" is missing.<br/>
		 * 			Or it will be thrown when the "row" or the "column" is not a Number.<br/>
		 * 			Or it will be thrown when the "row" or the "column" is negative.
		 * 
		 * @since
		 * 			1.0.0
		 */
		getAddress: function(row, column, toUpperCase) {
			var _arguments = arguments.length;

			xeno.common.lang.Data.ensures(_arguments > 0, "The 'row' is required, index: 0");
			xeno.common.lang.Data.ensures(_arguments > 1, "The 'column' is required, index: 1");
			xeno.common.lang.Data.ensures(xeno.common.lang.Data.isNumber(row), "The 'row' is not a Number");
			xeno.common.lang.Data.ensures(xeno.common.lang.Data.isNumber(column), "The 'column' is not a Number");

			var _toUpperCase = false;

			if(_arguments > 2) {
				xeno.common.lang.Data.ensures(xeno.common.lang.Data.isBoolean(toUpperCase), "The 'toUpperCase' is not a Boolean");

				_toUpperCase = toUpperCase;
			}

			xeno.common.lang.Data.ensures(row >= 0, "The 'row' is negative");
			xeno.common.lang.Data.ensures(column >= 0, "The 'column' is negative");

			return _getAddress(row, column, _toUpperCase);
		},

		/**
		 * @description
		 * <p>
		 * Calculates and returns the excel cell address in "A1" format.
		 * </p>
		 * <p>
		 * The result will be returned in an Object with "row" and "column" properties, all values are zero based.
		 * </p>
		 * 
		 * @example
		 * <b>Examples</b>
		 * 
		 * xeno.common.office.ExcelCellCalculator.getIndex("c9") = { row: 8, column: 2 }
		 * 
		 * @param address
		 * 			The String value (case insensitive) in excel cell address (A1) format.
		 * 
		 * @return
		 * 			The Object with "row" and "column" properties.
		 * 
		 * @throws
		 * 			The Error will be thrown when the "address" is missing.<br/>
		 * 			Or it will be thrown when the "address" is not a String.<br/>
		 * 			Or it will be thrown when the "address" is an invalid excel cell address (A1) format.
		 * 
		 * @since
		 * 			1.0.0
		 */
		getIndex: function(address) {
			xeno.common.lang.Data.ensures(arguments.length > 0, "The 'address' is required, index: 0");
			xeno.common.lang.Data.ensures(xeno.common.lang.Data.isString(address), "The 'address' is not a String");
			xeno.common.lang.Data.ensures(_address.test(address), "Invalid excel cell address: " + address);

			return _getIndex(address);
		}

	};

})();
/**
 * @class
 * <p>
 * This class contains some utilities designed to provide a convenience for handling the Array related operations.
 * </p>
 * <p>
 * When you use this class for some certain functions which have return values, a new Array instance will be created and returns, so the original Array passes in will not be edited.
 * </p>
 * <p>
 * However, if data in the Array has a deep reference, this relationship will also bring to the copied Array.
 * </p>
 * <p>
 * This class tries to handle null input gracefully, and each function documents its behaviour.
 * </p>
 * 
 * @description
 * <p>
 * The class constructor.
 * </p>
 * 
 * @since
 * 			1.0.0
 */
xeno.common.util.ArrayUtils = (function () {

	var _safeToExecute = function(data, nullReturnVal, func) {
		return xeno.common.lang.Data.isNull(data) ? nullReturnVal : func();
	};

	// ------------------------------
	// Private Function Definitions
	// ------------------------------

	var _clone = function(arr) {

		return _safeToExecute(arr, null, function() {
			return arr.concat();
		});
	};

	var _isEmpty = function(arr) {
		return _length(arr) === 0;
	};

	var _isNotEmpty = function(arr) {
		return !_isEmpty(arr);
	};

	var _add = function(arr, data, index) {

		return _safeToExecute(arr, null, function() {
			var _index = Math.floor(index);

			var ret = _clone(arr);
			ret.splice(_index, 0, data);

			return ret;
		});
	};

	var _remove = function(arr, index) {

		return _safeToExecute(arr, null, function() {
			var _index = Math.floor(index);

			var ret = _clone(arr);

			if(_index < 0 || _index >= ret.length) {
				return ret;
			}

			ret.splice(_index, 1);

			return ret;
		});
	};

	var _get = function(arr, index) {
		var _index = Math.floor(index);

		var len = _length(arr);

		if(_index >= len) {
			throw new Error("The 'index' is out of range, length: " + len);
		}

		return arr[_index];
	};

	var _reverse = function(arr) {

		return _safeToExecute(arr, null, function() {
			return _clone(arr).reverse();
		});
	};

	var _length = function(arr) {

		return _safeToExecute(arr, 0, function() {
			return arr.length;
		});
	};

	var _firstIndexOf = function(arr, search) {

		return _safeToExecute(arr, -1, function() {

			for(var i = 0; i < arr.length; i += 1) {

				if(search === arr[i]) {
					return i;
				}
			}

			return -1;
		});
	};

	var _lastIndexOf = function(arr, search) {

		return _safeToExecute(arr, -1, function() {

			for(var i = arr.length - 1; i >= 0; i -= 1) {

				if(search === arr[i]) {
					return i;
				}
			}

			return -1;
		});
	};

	var _contains = function(arr, search) {
		return _firstIndexOf(arr, search) >= 0;
	};

	var _subarray = function(arr, begin, end) {

		return _safeToExecute(arr, null, function() {
			var _begin = Math.floor(begin);
			var _end = Math.floor(end);

			if(_begin >= arr.length) {
				return null;
			}

			return arr.slice(_begin, _end);
		});
	};

	return {

		/**
		 * @description
		 * <p>
		 * Copies all data in the "arr" and return it with a new Array instance.
		 * </p>
		 * 
		 * @example
		 * <b>Examples</b>
		 * 
		 * Assume the "obj" is: { id: 1, name: "eric" }
		 * Assume the "arr" is: ["1", null, undefined, obj, 6, true]
		 * 
		 * xeno.common.util.ArrayUtils.clone(null) = null
		 * xeno.common.util.ArrayUtils.clone(arr) = ["1", null, undefined, obj, 6, true], the "obj" is the same in the "arr"
		 * 
		 * @param arr
		 * 			The Array to be handled.
		 * 
		 * @return
		 * 			The Array.
		 * 
		 * @throws
		 * 			The Error will be thrown when the "arr" is missing.<br/>
		 * 			Or it will be thrown when the "arr" is not null or not an Array.
		 * 
		 * @since
		 * 			1.0.0
		 */
		clone: function(arr) {
			xeno.common.lang.Data.ensures(arguments.length > 0, "The 'arr' is required, index: 0");
			xeno.common.lang.Data.ensures(xeno.common.lang.Data.isArray(arr, true), "The 'arr' is not null or not an Array");

			return _clone(arr);
		},

		/**
		 * @description
		 * <p>
		 * Checks whether the "arr" is null or with zero length.
		 * </p>
		 * 
		 * @param arr
		 * 			The Array to be handled.
		 * 
		 * @return
		 * 			The Boolean.
		 * 
		 * @throws
		 * 			The Error will be thrown when the "arr" is missing.<br/>
		 * 			Or it will be thrown when the "arr" is not null or not an Array.
		 * 
		 * @since
		 * 			1.0.0
		 */
		isEmpty: function(arr) {
			xeno.common.lang.Data.ensures(arguments.length > 0, "The 'arr' is required, index: 0");
			xeno.common.lang.Data.ensures(xeno.common.lang.Data.isArray(arr, true), "The 'arr' is not null or not an Array");

			return _isEmpty(arr);
		},

		/**
		 * @description
		 * <p>
		 * Checks whether the "arr" is not null and not with zero length.
		 * </p>
		 * 
		 * @param arr
		 * 			The Array to be handled.
		 * 
		 * @return
		 * 			The Boolean.
		 * 
		 * @throws
		 * 			The Error will be thrown when the "arr" is missing.<br/>
		 * 			Or it will be thrown when the "arr" is not null or not an Array.
		 * 
		 * @since
		 * 			1.2.0
		 */
		isNotEmpty: function(arr) {
			xeno.common.lang.Data.ensures(arguments.length > 0, "The 'arr' is required, index: 0");
			xeno.common.lang.Data.ensures(xeno.common.lang.Data.isArray(arr, true), "The 'arr' is not null or not an Array");

			return _isNotEmpty(arr);
		},

		/**
		 * @description
		 * <p>
		 * Adds a certain "data" into the "arr" and returns it with a new Array instance.
		 * </p>
		 * <p>
		 * The "index" maybe a float value, the "Math.floor(n)" action will be processed first to convert it into an integer Number.
		 * </p>
		 * 
		 * @example
		 * <b>Examples</b>
		 * 
		 * Assume the "obj" is: { id: 1, name: "eric" }
		 * Assume the "arr" is: ["1", "2", "3", "4", "5"]
		 * 
		 * xeno.common.util.ArrayUtils.add(null, *) = null
		 * xeno.common.util.ArrayUtils.add(arr, "6") = ["1", "2", "3", "4", "5", "6"]
		 * xeno.common.util.ArrayUtils.add(arr, "6", 0) = ["6", "1", "2", "3", "4", "5"]
		 * xeno.common.util.ArrayUtils.add(arr, obj, 3) = ["1", "2", "3", obj, "4", "5"]
		 * xeno.common.util.ArrayUtils.add(arr, "6", 5) = ["1", "2", "3", "4", "5", "6"]
		 * xeno.common.util.ArrayUtils.add(arr, "6", 6) = ["1", "2", "3", "4", "5", "6"]
		 * 
		 * @param arr
		 * 			The Array to be handled.
		 * @param data
		 * 			The data to be added into.
		 * @param index
		 * 			The position to be added at.<br/>
		 * 			If this value is out of the Array's range, the "data" will be added at the last position.<br/>
		 * 			The default value is according to Number.MAX_VALUE.
		 * 
		 * @return
		 * 			The Array.
		 * 
		 * @throws
		 * 			The Error will be thrown when the "arr" or the "data" is missing.<br/>
		 * 			Or it will be thrown when the "arr" is not null or not an Array.<br/>
		 * 			Or it will be thrown when the "index" is not a Number.<br/>
		 * 			Or it will be thrown when the "index" is negative.
		 * 
		 * @since
		 * 			1.0.0
		 */
		add: function(arr, data, index) {
			var _arguments = arguments.length;

			xeno.common.lang.Data.ensures(_arguments > 0, "The 'arr' is required, index: 0");
			xeno.common.lang.Data.ensures(_arguments > 1, "The 'data' is required, index: 1");
			xeno.common.lang.Data.ensures(xeno.common.lang.Data.isArray(arr, true), "The 'arr' is not null or not an Array");

			var _index = Number.MAX_VALUE;

			if(_arguments > 2) {
				xeno.common.lang.Data.ensures(xeno.common.lang.Data.isNumber(index), "The 'index' is not a Number");

				_index = index;
			}

			xeno.common.lang.Data.ensures(_index >= 0, "The 'index' is negative");

			return _add(arr, data, _index);
		},

		/**
		 * @description
		 * <p>
		 * Removes a certain data from the "arr" by its index in it and returns a new Array instance.
		 * </p>
		 * <p>
		 * For the null "arr", this function will return the null.
		 * </p>
		 * <p>
		 * This function also handles the "index" passes in which is out of range, it will take no effect and return the same Array with different reference according to the "arr".
		 * </p>
		 * <p>
		 * The "index" maybe a float value, the "Math.floor(n)" action will be processed first to convert it into an integer Number.
		 * </p>
		 * 
		 * @param arr
		 * 			The Array to be handled.
		 * @param index
		 * 			The position to be removed at.
		 * 
		 * @return
		 * 			The Array.
		 * 
		 * @throws
		 * 			The Error will be thrown when the "arr" or the "index" is missing.<br/>
		 * 			Or it will be thrown when the "arr" is not null or not an Array.<br/>
		 * 			Or it will be thrown when the "index" is not a Number.<br/>
		 * 			Or it will be thrown when the "index" is negative.
		 * 
		 * @since
		 * 			1.0.0
		 */
		remove: function(arr, index) {
			var _arguments = arguments.length;

			xeno.common.lang.Data.ensures(_arguments > 0, "The 'arr' is required, index: 0");
			xeno.common.lang.Data.ensures(_arguments > 1, "The 'index' is required, index: 1");
			xeno.common.lang.Data.ensures(xeno.common.lang.Data.isArray(arr, true), "The 'arr' is not null or not an Array");
			xeno.common.lang.Data.ensures(xeno.common.lang.Data.isNumber(index), "The 'index' is not a Number");
			xeno.common.lang.Data.ensures(index >= 0, "The 'index' is negative");

			return _remove(arr, index);
		},

		/**
		 * @description
		 * <p>
		 * Returns the certain data in the "arr" by its index.
		 * </p>
		 * <p>
		 * The "index" maybe a float value, the "Math.floor(n)" action will be processed first to convert it into an integer Number.
		 * </p>
		 * 
		 * @example
		 * <b>Examples</b>
		 * 
		 * Assume the "obj" is: { id: 1, name: "eric" }
		 * Assume the "arr" is: ["1", "2", "3", "4", null, undefined, obj, "5", 6, true]
		 * 
		 * xeno.common.util.ArrayUtils.get(arr, 0) = "1"
		 * xeno.common.util.ArrayUtils.get(arr, 4) = null
		 * xeno.common.util.ArrayUtils.get(arr, 6) = obj
		 * xeno.common.util.ArrayUtils.get(arr, 8) = 6
		 * xeno.common.util.ArrayUtils.get(arr, 9) = true
		 * 
		 * @param arr
		 * 			The Array to be handled.
		 * @param index
		 * 			The position to be gotten.
		 * 
		 * @return
		 * 			Depends on what data to get.
		 * 
		 * @throws
		 * 			The Error will be thrown when the "arr" or the "index" is missing.<br/>
		 * 			Or it will be thrown when the "arr" is not null or not an Array.<br/>
		 * 			Or it will be thrown when the "index" is not a Number.<br/>
		 * 			Or it will be thrown when the "index" is negative.<br/>
		 * 			Or it will be thrown when the "index" is out of the Array's range.
		 * 
		 * @since
		 * 			1.0.0
		 */
		get: function(arr, index) {
			var _arguments = arguments.length;

			xeno.common.lang.Data.ensures(_arguments > 0, "The 'arr' is required, index: 0");
			xeno.common.lang.Data.ensures(_arguments > 1, "The 'index' is required, index: 1");
			xeno.common.lang.Data.ensures(xeno.common.lang.Data.isArray(arr, true), "The 'arr' is not null or not an Array");
			xeno.common.lang.Data.ensures(xeno.common.lang.Data.isNumber(index), "The 'index' is not a Number");
			xeno.common.lang.Data.ensures(index >= 0, "The 'index' is negative");

			return _get(arr, index);
		},

		/**
		 * @description
		 * <p>
		 * Reverses all data in the "arr" and returns a new Array instance.
		 * </p>
		 * <p>
		 * If the "arr" is null, the null returns.
		 * </p>
		 * 
		 * @param arr
		 * 			The Array to be handled.
		 * 
		 * @return
		 * 			The Array.
		 * 
		 * @throws
		 * 			The Error will be thrown when the "arr" is missing.<br/>
		 * 			Or it will be thrown when the "arr" is not null or not an Array.
		 * 
		 * @since
		 * 			1.0.0
		 */
		reverse: function(arr) {
			xeno.common.lang.Data.ensures(arguments.length > 0, "The 'arr' is required, index: 0");
			xeno.common.lang.Data.ensures(xeno.common.lang.Data.isArray(arr, true), "The 'arr' is not null or not an Array");

			return _reverse(arr);
		},

		/**
		 * @description
		 * <p>
		 * Returns the length of the "arr".
		 * </p>
		 * 
		 * @example
		 * <b>Examples</b>
		 * 
		 * xeno.common.util.ArrayUtils.length(null) = 0
		 * xeno.common.util.ArrayUtils.length([]) = 0
		 * xeno.common.util.ArrayUtils.length([undefined]) = 1
		 * xeno.common.util.ArrayUtils.length([undefined, undefined]) = 2
		 * xeno.common.util.ArrayUtils.length([null]) = 1
		 * xeno.common.util.ArrayUtils.length([1]) = 1
		 * xeno.common.util.ArrayUtils.length([1, 2]) = 2
		 * 
		 * @param arr
		 * 			The Array to be handled.
		 * 
		 * @return
		 * 			The Number, integer.
		 * 
		 * @throws
		 * 			The Error will be thrown when the "arr" is missing.<br/>
		 * 			Or it will be thrown when the "arr" is not null or not an Array.
		 * 
		 * @since
		 * 			1.0.0
		 */
		length: function(arr) {
			xeno.common.lang.Data.ensures(arguments.length > 0, "The 'arr' is required, index: 0");
			xeno.common.lang.Data.ensures(xeno.common.lang.Data.isArray(arr, true), "The 'arr' is not null or not an Array");

			return _length(arr);
		},

		/**
		 * @description
		 * <p>
		 * Finds the first index within the "arr" and returns the index.
		 * </p>
		 * <p>
		 * The rule of compare data's equal in the Array is the same to JavaScript.
		 * Complex Objects will compare their references, while others like Number or String and so on, will just compare their values.
		 * </p>
		 * 
		 * @example
		 * <b>Examples</b>
		 * 
		 * Assume the "obj" is: { id: 1, name: "eric" }
		 * Assume the "newObj" is: { id: 1, name: "eric" }
		 * Assume the "arr" is: ["1", "2", "2", null, undefined, null, obj, undefined, obj]
		 * 
		 * xeno.common.util.ArrayUtils.firstIndexOf(null, *) = -1
		 * xeno.common.util.ArrayUtils.firstIndexOf(arr, "11") = -1
		 * xeno.common.util.ArrayUtils.firstIndexOf(arr, "2") = 1
		 * xeno.common.util.ArrayUtils.firstIndexOf(arr, null) = 3
		 * xeno.common.util.ArrayUtils.firstIndexOf(arr, undefined) = 4
		 * xeno.common.util.ArrayUtils.firstIndexOf(arr, obj) = 6
		 * xeno.common.util.ArrayUtils.firstIndexOf(arr, newObj) = -1
		 * 
		 * @param arr
		 * 			The Array to be handled.
		 * @param search
		 * 			The data of the Array to be found.
		 * 
		 * @return
		 * 			The Number, integer.
		 * 
		 * @throws
		 * 			The Error will be thrown when the "arr" or the "search" is missing.<br/>
		 * 			Or it will be thrown when the "arr" is not null or not an Array.
		 * 
		 * @since
		 * 			1.0.0
		 */
		firstIndexOf: function(arr, search) {
			var _arguments = arguments.length;

			xeno.common.lang.Data.ensures(_arguments > 0, "The 'arr' is required, index: 0");
			xeno.common.lang.Data.ensures(_arguments > 1, "The 'search' is required, index: 1");
			xeno.common.lang.Data.ensures(xeno.common.lang.Data.isArray(arr, true), "The 'arr' is not null or not an Array");

			return _firstIndexOf(arr, search);
		},

		/**
		 * @description
		 * <p>
		 * Finds the last index within the "arr" and returns the index.
		 * </p>
		 * <p>
		 * The rule of compare data's equal in the Array is the same to JavaScript.
		 * Complex Objects will compare their references, while others like Number or String and so on, will just compare their values.
		 * </p>
		 * 
		 * @example
		 * <b>Examples</b>
		 * 
		 * Assume the "obj" is: { id: 1, name: "eric" }
		 * Assume the "newObj" is: { id: 1, name: "eric" }
		 * Assume the "arr" is: ["1", "2", "2", null, undefined, null, obj, undefined, obj]
		 * 
		 * xeno.common.util.ArrayUtils.lastIndexOf(null, *) = -1
		 * xeno.common.util.ArrayUtils.lastIndexOf(arr, "11") = -1
		 * xeno.common.util.ArrayUtils.lastIndexOf(arr, "2") = 2
		 * xeno.common.util.ArrayUtils.lastIndexOf(arr, null) = 5
		 * xeno.common.util.ArrayUtils.lastIndexOf(arr, undefined) = 7
		 * xeno.common.util.ArrayUtils.lastIndexOf(arr, obj) = 8
		 * xeno.common.util.ArrayUtils.lastIndexOf(arr, newObj) = -1
		 * 
		 * @param arr
		 * 			The Array to be handled.
		 * @param search
		 * 			The data of the Array to be found.
		 * 
		 * @return
		 * 			The Number, integer.
		 * 
		 * @throws
		 * 			The Error will be thrown when the "arr" or the "search" is missing.<br/>
		 * 			Or it will be thrown when the "arr" is not null or not an Array.
		 * 
		 * @since
		 * 			1.0.0
		 */
		lastIndexOf: function(arr, search) {
			var _arguments = arguments.length;

			xeno.common.lang.Data.ensures(_arguments > 0, "The 'arr' is required, index: 0");
			xeno.common.lang.Data.ensures(_arguments > 1, "The 'search' is required, index: 1");
			xeno.common.lang.Data.ensures(xeno.common.lang.Data.isArray(arr, true), "The 'arr' is not null or not an Array");

			return _lastIndexOf(arr, search);
		},

		/**
		 * @description
		 * <p>
		 * Checks whether the "arr" contains a "search" data or not.
		 * </p>
		 * 
		 * @example
		 * <b>Examples</b>
		 * 
		 * Assume the "obj" is: { id: 1, name: "eric" }
		 * Assume the "newObj" is: { id: 1, name: "eric" }
		 * Assume the "arr" is: ["1", null, undefined, obj, "5", undefined, 6, true, obj]
		 * 
		 * xeno.common.util.ArrayUtils.contains(null, "11") = false
		 * xeno.common.util.ArrayUtils.contains(arr, "11") = false
		 * xeno.common.util.ArrayUtils.contains(arr, "1") = true
		 * xeno.common.util.ArrayUtils.contains(arr, null) = true
		 * xeno.common.util.ArrayUtils.contains(arr, undefined) = true
		 * xeno.common.util.ArrayUtils.contains(arr, obj) = true
		 * xeno.common.util.ArrayUtils.contains(arr, newObj) = false
		 * 
		 * @param arr
		 * 			The Array to be checked.
		 * @param search
		 * 			The data of the Array to be found.
		 * 
		 * @return
		 * 			The Boolean.
		 * 
		 * @throws
		 * 			The Error will be thrown when the "arr" or the "search" is missing.<br/>
		 * 			Or it will be thrown when the "arr" is not null or not an Array.
		 * 
		 * @since
		 * 			1.0.0
		 */
		contains: function(arr, search) {
			var _arguments = arguments.length;

			xeno.common.lang.Data.ensures(_arguments > 0, "The 'arr' is required, index: 0");
			xeno.common.lang.Data.ensures(_arguments > 1, "The 'search' is required, index: 1");
			xeno.common.lang.Data.ensures(xeno.common.lang.Data.isArray(arr, true), "The 'arr' is not null or not an Array");

			return _contains(arr, search);
		},

		/**
		 * @description
		 * <p>
		 * Returns a new sub Array from the "arr", the returned sub Array starts with the data in the begin position and ends before the end position, and all position counting is zero-based.
		 * </p>
		 * <p>
		 * The "begin" or the "end" maybe a float value, the "Math.floor(n)" action will be processed first to convert it into an integer Number.
		 * </p>
		 * 
		 * @example
		 * <b>Examples</b>
		 * 
		 * Assume the "arr" is: [1, 2, 3, 4]
		 * 
		 * xeno.common.util.ArrayUtils.subarray(null, *) = null
		 * xeno.common.util.ArrayUtils.subarray([], 0) = null
		 * xeno.common.util.ArrayUtils.subarray([], 1) = null
		 * xeno.common.util.ArrayUtils.subarray(arr, 0) = [1, 2, 3, 4]
		 * xeno.common.util.ArrayUtils.subarray(arr, 2) = [3, 4]
		 * xeno.common.util.ArrayUtils.subarray(arr, 3) = [4]
		 * xeno.common.util.ArrayUtils.subarray(arr, 4) = null
		 * xeno.common.util.ArrayUtils.subarray(arr, 1, 3) = [2, 3]
		 * xeno.common.util.ArrayUtils.subarray(arr, 1, 4) = [2, 3, 4]
		 * xeno.common.util.ArrayUtils.subarray(arr, 1, 5) = [2, 3, 4]
		 * 
		 * @param arr
		 * 			The Array to get the sub Array from.
		 * @param begin
		 * 			The position to start from.
		 * @param end
		 * 			The position to end at (exclusive).<br/>
		 * 			The default value is according to Number.MAX_VALUE.
		 * 
		 * @return
		 * 			The Array.
		 * 
		 * @throws
		 * 			The Error will be thrown when the "arr" or the "begin" is missing.<br/>
		 * 			Or it will be thrown when the "arr" is not null or not an Array.<br/>
		 * 			Or it will be thrown when the "begin" or the "end" is not a Number.<br/>
		 * 			Or it will be thrown when the "arr" is a valid value and the "begin" or the "end" is negative.<br/>
		 * 			Or it will be thrown when the "begin" is greater than the "end".
		 * 
		 * @since
		 * 			1.0.0
		 */
		subarray: function(arr, begin, end) {
			var _arguments = arguments.length;

			xeno.common.lang.Data.ensures(_arguments > 0, "The 'arr' is required, index: 0");
			xeno.common.lang.Data.ensures(_arguments > 1, "The 'begin' is required, index: 1");
			xeno.common.lang.Data.ensures(xeno.common.lang.Data.isArray(arr, true), "The 'arr' is not null or not an Array");
			xeno.common.lang.Data.ensures(xeno.common.lang.Data.isNumber(begin), "The 'begin' is not a Number");

			var _end = Number.MAX_VALUE;

			if(_arguments > 2) {
				xeno.common.lang.Data.ensures(xeno.common.lang.Data.isNumber(end), "The 'end' is not a Number");

				_end = end;
			}

			xeno.common.lang.Data.ensures(begin >= 0, "The 'begin' is negative");
			xeno.common.lang.Data.ensures(begin <= _end, "The 'begin' is greater than the 'end'");

			return _subarray(arr, begin, _end);
		}

	};

})();
/**
 * @class
 * <p>
 * This class contains some utilities designed to provide a convenience for handling the Boolean related operations.
 * </p>
 * 
 * @description
 * <p>
 * The class constructor.
 * </p>
 * 
 * @since
 * 			1.0.0
 */
xeno.common.util.BooleanUtils = (function () {

	// ------------------------------
	// Private Function Definitions
	// ------------------------------

	var _parse = function(data) {

		if(xeno.common.lang.Data.isBoolean(data)) {
			return data;

		} else if(xeno.common.lang.Data.isNumber(data)) {
			return data === 1;

		} else if(xeno.common.lang.Data.isString(data)) {
			var val = data.toLowerCase();

			return val === "true" || val === "t" || val === "yes" || val === "y" || val === "on";
		}

		return false;
	};

	return {

		/**
		 * @description
		 * <p>
		 * Parses the "data" into a Boolean.
		 * </p>
		 * <p>
		 * Only below values will be parsed into true.
		 * Others, including undefined and null, will be parsed into false.
		 * 	<ul>
		 * 		<li>Number: 1</li>
		 * 		<li>String: "true", "t", "yes", "y", or "on" (case insensitive)</li>
		 * 		<li>Boolean: true</li>
		 * 	</ul>
		 * </p>
		 * 
		 * @param data
		 * 			The data to be parsed.
		 * 
		 * @return
		 * 			The Boolean.
		 * 
		 * @throws
		 * 			The Error will be thrown when the "data" is missing.
		 * 
		 * @since
		 * 			1.0.0
		 */
		parse: function(data) {
			xeno.common.lang.Data.ensures(arguments.length > 0, "The 'data' is required");

			return _parse(data);
		}

	};

})();
/**
 * @class
 * <p>
 * This class contains some utilities designed to provide a convenience for handling the crypto related operations.
 * </p>
 * 
 * @description
 * <p>
 * The class constructor.
 * </p>
 * 
 * @since
 * 			1.0.0
 */
xeno.common.util.CryptoUtils = (function () {

	var _stringToBytes = function(str) {
		var bytes = [];

		for(var i = 0; i < str.length; i += 1) {
			bytes.push(str.charCodeAt(i) & 0xFF);
		}

		return bytes;
	};

	var _wordsToBytes = function(words) {
		var bytes = [];

		for(var i = 0; i < words.length * 32; i += 8) {
			bytes.push((words[i >>> 5] >>> (24 - i % 32)) & 0xFF);
		}

		return bytes;
	};

	var _bytesToWords = function(bytes) {
		var words = [];

		for(var i = 0, b = 0; i < bytes.length; i += 1, b += 8) {
			words[b >>> 5] |= (bytes[i] & 0xFF) << (24 - b % 32);
		}

		return words;
	};

	var _bytesToHex = function(bytes) {
		var hex = [];

		for(var i = 0; i < bytes.length; i += 1) {
			hex.push((bytes[i] >>> 4).toString(16));
			hex.push((bytes[i] & 0xF).toString(16));
		}

		return hex.join("");
	};

	var _rol = function(n, b) {
		return (n << b) | (n >>> (32 - b));
	};

	var _endian = function(n) {

		// If number given, swap endian.
		if(xeno.common.lang.Data.isNumber(n)) {
			return _rol(n, 8) & 0x00FF00FF | _rol(n, 24) & 0xFF00FF00;
		}

		// Else, assume array and swap all items.
		for(var i = 0; i < n.length; i++) {
			n[i] = _endian(n[i]);
		}

		return n;
	};

	var _ff = function(a, b, c, d, x, s, t) {
		var n = a + (b & c | ~b & d) + (x >>> 0) + t;

		return ((n << s) | (n >>> (32 - s))) + b;
	};

	var _gg = function(a, b, c, d, x, s, t) {
		var n = a + (b & d | c & ~d) + (x >>> 0) + t;

		return ((n << s) | (n >>> (32 - s))) + b;
	};

	var _hh = function(a, b, c, d, x, s, t) {
		var n = a + (b ^ c ^ d) + (x >>> 0) + t;

		return ((n << s) | (n >>> (32 - s))) + b;
	};

	var _ii = function(a, b, c, d, x, s, t) {
		var n = a + (c ^ (b | ~d)) + (x >>> 0) + t;

		return ((n << s) | (n >>> (32 - s))) + b;
	};

	var _md5 = function(str) {
		var message = _stringToBytes(unescape(encodeURIComponent(str)));

		var m = _bytesToWords(message);
		var l = message.length * 8;

		// Swaps endian.
		for (var i = 0; i < m.length; i += 1) {
			m[i] = ((m[i] << 8) | (m[i] >>> 24)) & 0x00FF00FF | ((m[i] << 24) | (m[i] >>> 8)) & 0xFF00FF00;
		}

		// Padding.
		m[l >>> 5] |= 0x80 << (l % 32);
		m[(((l + 64) >>> 9) << 4) + 14] = l;

		var a = 1732584193, b = -271733879, c = -1732584194, d = 271733878;
		var aa = 0, bb = 0, cc = 0, dd = 0;

		for(var i = 0; i < m.length; i += 16) {
			aa = a;
			bb = b;
			cc = c;
			dd = d;

			a = _ff(a, b, c, d, m[i + 0], 7, -680876936);
			d = _ff(d, a, b, c, m[i + 1], 12, -389564586);
			c = _ff(c, d, a, b, m[i + 2], 17, 606105819);
			b = _ff(b, c, d, a, m[i + 3], 22, -1044525330);
			a = _ff(a, b, c, d, m[i + 4], 7, -176418897);
			d = _ff(d, a, b, c, m[i + 5], 12, 1200080426);
			c = _ff(c, d, a, b, m[i + 6], 17, -1473231341);
			b = _ff(b, c, d, a, m[i + 7], 22, -45705983);
			a = _ff(a, b, c, d, m[i + 8], 7, 1770035416);
			d = _ff(d, a, b, c, m[i + 9], 12, -1958414417);
			c = _ff(c, d, a, b, m[i + 10], 17, -42063);
			b = _ff(b, c, d, a, m[i + 11], 22, -1990404162);
			a = _ff(a, b, c, d, m[i + 12], 7, 1804603682);
			d = _ff(d, a, b, c, m[i + 13], 12, -40341101);
			c = _ff(c, d, a, b, m[i + 14], 17, -1502002290);
			b = _ff(b, c, d, a, m[i + 15], 22, 1236535329);

			a = _gg(a, b, c, d, m[i + 1], 5, -165796510);
			d = _gg(d, a, b, c, m[i + 6], 9, -1069501632);
			c = _gg(c, d, a, b, m[i + 11], 14, 643717713);
			b = _gg(b, c, d, a, m[i + 0], 20, -373897302);
			a = _gg(a, b, c, d, m[i + 5], 5, -701558691);
			d = _gg(d, a, b, c, m[i + 10], 9, 38016083);
			c = _gg(c, d, a, b, m[i + 15], 14, -660478335);
			b = _gg(b, c, d, a, m[i + 4], 20, -405537848);
			a = _gg(a, b, c, d, m[i + 9], 5, 568446438);
			d = _gg(d, a, b, c, m[i + 14], 9, -1019803690);
			c = _gg(c, d, a, b, m[i + 3], 14, -187363961);
			b = _gg(b, c, d, a, m[i + 8], 20, 1163531501);
			a = _gg(a, b, c, d, m[i + 13], 5, -1444681467);
			d = _gg(d, a, b, c, m[i + 2], 9, -51403784);
			c = _gg(c, d, a, b, m[i + 7], 14, 1735328473);
			b = _gg(b, c, d, a, m[i + 12], 20, -1926607734);

			a = _hh(a, b, c, d, m[i + 5], 4, -378558);
			d = _hh(d, a, b, c, m[i + 8], 11, -2022574463);
			c = _hh(c, d, a, b, m[i + 11], 16, 1839030562);
			b = _hh(b, c, d, a, m[i + 14], 23, -35309556);
			a = _hh(a, b, c, d, m[i + 1], 4, -1530992060);
			d = _hh(d, a, b, c, m[i + 4], 11, 1272893353);
			c = _hh(c, d, a, b, m[i + 7], 16, -155497632);
			b = _hh(b, c, d, a, m[i + 10], 23, -1094730640);
			a = _hh(a, b, c, d, m[i + 13], 4, 681279174);
			d = _hh(d, a, b, c, m[i + 0], 11, -358537222);
			c = _hh(c, d, a, b, m[i + 3], 16, -722521979);
			b = _hh(b, c, d, a, m[i + 6], 23, 76029189);
			a = _hh(a, b, c, d, m[i + 9], 4, -640364487);
			d = _hh(d, a, b, c, m[i + 12], 11, -421815835);
			c = _hh(c, d, a, b, m[i + 15], 16, 530742520);
			b = _hh(b, c, d, a, m[i + 2], 23, -995338651);

			a = _ii(a, b, c, d, m[i + 0], 6, -198630844);
			d = _ii(d, a, b, c, m[i + 7], 10, 1126891415);
			c = _ii(c, d, a, b, m[i + 14], 15, -1416354905);
			b = _ii(b, c, d, a, m[i + 5], 21, -57434055);
			a = _ii(a, b, c, d, m[i + 12], 6, 1700485571);
			d = _ii(d, a, b, c, m[i + 3], 10, -1894986606);
			c = _ii(c, d, a, b, m[i + 10], 15, -1051523);
			b = _ii(b, c, d, a, m[i + 1], 21, -2054922799);
			a = _ii(a, b, c, d, m[i + 8], 6, 1873313359);
			d = _ii(d, a, b, c, m[i + 15], 10, -30611744);
			c = _ii(c, d, a, b, m[i + 6], 15, -1560198380);
			b = _ii(b, c, d, a, m[i + 13], 21, 1309151649);
			a = _ii(a, b, c, d, m[i + 4], 6, -145523070);
			d = _ii(d, a, b, c, m[i + 11], 10, -1120210379);
			c = _ii(c, d, a, b, m[i + 2], 15, 718787259);
			b = _ii(b, c, d, a, m[i + 9], 21, -343485551);

			a = (a + aa) >>> 0;
			b = (b + bb) >>> 0;
			c = (c + cc) >>> 0;
			d = (d + dd) >>> 0;
		}

		return _endian([a, b, c, d]);
	};

	var _sha1 = function(str) {
		var message = _stringToBytes(unescape(encodeURIComponent(str)));

		var m = _bytesToWords(message);
		var l = message.length * 8;

		// Padding.
		m[l >> 5] |= 0x80 << (24 - l % 32);
		m[((l + 64 >>> 9) << 4) + 15] = l;

		var w = [];
		var a = 1732584193, b = -271733879, c = -1732584194, d = 271733878, e = -1009589776;
		var aa = 0, bb = 0, cc = 0, dd = 0, ee = 0;

		for(var i = 0; i < m.length; i += 16) {
			aa = a;
			bb = b;
			cc = c;
			dd = d;
			ee = e;

			for(var j = 0; j < 80; j += 1) {

				if(j < 16) {
					w[j] = m[i + j];

				} else {
					var n = w[j-3] ^ w[j-8] ^ w[j-14] ^ w[j-16];
					w[j] = (n << 1) | (n >>> 31);
				}

				var t = ((a << 5) | (a >>> 27)) + e + (w[j] >>> 0) + (j < 20 ? (b & c | ~b & d) + 1518500249 : j < 40 ? (b ^ c ^ d) + 1859775393 : j < 60 ? (b & c | b & d | c & d) - 1894007588 : (b ^ c ^ d) - 899497514);

				e = d;
				d = c;
				c = (b << 30) | (b >>> 2);
				b = a;
				a = t;
			}

			a += aa;
			b += bb;
			c += cc;
			d += dd;
			e += ee;
		}

		return [a, b, c, d, e];
	};

	// ------------------------------
	// Private Function Definitions
	// ------------------------------

	var _md5Hex = function(str, toUpperCase) {
		var result = _bytesToHex(_wordsToBytes(_md5(str)));

		return toUpperCase ? result.toUpperCase() : result;
	};

	var _sha1Hex = function(str, toUpperCase) {
		var result = _bytesToHex(_wordsToBytes(_sha1(str)));

		return toUpperCase ? result.toUpperCase() : result;
	};

	return {

		/**
		 * @description
		 * <p>
		 * This function has implemented the RSA Data Security, Inc. Message Digest Algorithm, MD5, as defined in RFC 1321.
		 * It performs the MD5 algorithm on the "str" and returns a new instance value as a 32 characters length hex String.
		 * </p>
		 * 
		 * @param str
		 * 			The String to be hashed.
		 * @param toUpperCase
		 * 			A Boolean value to decide whether all characters in the return value are in upper case or not.<br/>
		 * 			The default value is: false.
		 * 
		 * @return
		 * 			The String.
		 * 
		 * @throws
		 * 			The Error will be thrown when the "str" is missing.<br/>
		 * 			Or it will be thrown when the "str" is not a String.<br/>
		 * 			Or it will be thrown when the "toUpperCase" is not a Boolean.
		 * 
		 * @since
		 * 			1.0.0
		 */
		md5Hex: function(str, toUpperCase) {
			var _arguments = arguments.length;

			xeno.common.lang.Data.ensures(_arguments > 0, "The 'str' is required, index: 0");
			xeno.common.lang.Data.ensures(xeno.common.lang.Data.isString(str), "The 'str' is not a String");

			var _toUpperCase = false;

			if(_arguments > 1) {
				xeno.common.lang.Data.ensures(xeno.common.lang.Data.isBoolean(toUpperCase), "The 'toUpperCase' is not a Boolean");

				_toUpperCase = toUpperCase;
			}

			return _md5Hex(str, _toUpperCase);
		},

		/**
		 * @description
		 * <p>
		 * This function has implemented the Secure Hash Algorithm, SHA-1, as defined in FIPS PUB 180-1.
		 * It performs the SHA1 algorithm on the "str" and returns a new instance value as a 40 characters length hex String.
		 * </p>
		 * 
		 * @param str
		 * 			The String to be hashed.
		 * @param toUpperCase
		 * 			A Boolean value to decide whether all characters in the return value are in upper case or not.<br/>
		 * 			The default value is: false.
		 * 
		 * @return
		 * 			The String.
		 * 
		 * @throws
		 * 			The Error will be thrown when the "str" is missing.<br/>
		 * 			Or it will be thrown when the "str" is not a String.<br/>
		 * 			Or it will be thrown when the "toUpperCase" is not a Boolean.
		 * 
		 * @since
		 * 			1.0.0
		 */
		sha1Hex: function(str, toUpperCase) {
			var _arguments = arguments.length;

			xeno.common.lang.Data.ensures(_arguments > 0, "The 'str' is required, index: 0");
			xeno.common.lang.Data.ensures(xeno.common.lang.Data.isString(str), "The 'str' is not a String");

			var _toUpperCase = false;

			if(_arguments > 1) {
				xeno.common.lang.Data.ensures(xeno.common.lang.Data.isBoolean(toUpperCase), "The 'toUpperCase' is not a Boolean");

				_toUpperCase = toUpperCase;
			}

			return _sha1Hex(str, _toUpperCase);
		}

	};

})();
/**
 * @class
 * <p>
 * This class contains some utilities designed to provide a convenience for handling the Date related operations.
 * </p>
 * <p>
 * When you use this class for some certain functions which have return values, a new Date instance will be created and returns, so the original Date passes in will not be edited.
 * </p>
 * <p>
 * This class tries to handle null input gracefully, and each function documents its behaviour.
 * </p>
 * 
 * @description
 * <p>
 * The class constructor.
 * </p>
 * 
 * @since
 * 			1.0.0
 */
xeno.common.util.DateUtils = (function () {
	var _millisecond = 1;
	var _second = 1000 * _millisecond;
	var _minute = 60 * _second;
	var _hour = 60 * _minute;
	var _day = 24 * _hour;
	var _markers = ["am", "pm"];

	var _safeToExecute = function(data, nullReturnVal, func) {
		return xeno.common.lang.Data.isNull(data) ? nullReturnVal : func();
	};

	var _elapsedTo = function(begin, end, offset) {
		var millisecond = Math.abs(end.getTime() - begin.getTime());
		var result = Math.floor(millisecond / offset);

		return _compare(begin, end) < 0 ? 0 - result : result;
	};

	// This function will cost many calculations on the Date field.
	// It is a simple way to avoid leap year issue, but it causes the performance issue actually.
	// We should find a better way to calculate it in the future.
	var _elapsedToInternal = function(begin, end, func) {
		var result = _compare(begin, end);

		if(result === 0) {
			return 0;

		} else if(result < 0) {
			return 0 - _elapsedToInternal(end, begin, func);
		}

		var offset = 1;
		var date = _clone(begin);

		while(true) {
			date = func(date, 1);

			if(_compare(date, end) < 0) {
				return offset - 1;

			} else if(_compare(date, end) === 0) {
				return offset;
			}

			offset += 1;
		}
	};

	var _getMarker = function(hour, minute, second, millisecond) {
		var ret = null;

		if(hour < 12) {
			ret = _markers[0];

		} else if(hour > 12) {
			ret = _markers[1];

		} else {

			if(minute === 0 && second === 0 && millisecond === 0) {
				ret = _markers[0];

			} else {
				ret = _markers[1];
			}
		}

		return ret;
	};

	// ------------------------------
	// Private Function Definitions
	// ------------------------------

	_clone = function(date) {

		return _safeToExecute(date, null, function() {
			return new Date(date.getTime());
		});
	};

	_isLeapYear = function(year) {

		return _safeToExecute(year, false, function() {
			var _year = Math.floor(year);

			if(_year % 400 === 0) {
				return true;
			}

			if(_year % 4 === 0 && _year % 100 !== 0) {
				return true;
			}

			return false;
		});
	};

	_compare = function(left, right) {

		if(xeno.common.lang.Data.isNull(left) && xeno.common.lang.Data.isNull(right)) {
			return 0;

		} else if(xeno.common.lang.Data.isNull(left)) {
			return 1;

		} else if(xeno.common.lang.Data.isNull(right)) {
			return -1;
		}

		var _left = left.getTime();
		var _right = right.getTime();

		if(_left > _right) {
			return -1;

		} else if(_left < _right) {
			return 1;

		} else {
			return 0;
		}
	};

	_getMaxDayInMonth = function(date) {

		return _safeToExecute(date, null, function() {
			var next = new Date(date.getFullYear(), date.getMonth() + 1);

			return _addDays(next, -1).getDate();
		});
	};

	_getDayOfWeek = function(date) {

		return _safeToExecute(date, null, function() {
			return date.getDay();
		});
	};

	_getYear = function(date) {

		return _safeToExecute(date, null, function() {
			return date.getFullYear();
		});
	};

	_getMonth = function(date) {

		return _safeToExecute(date, null, function() {
			return date.getMonth();
		});
	};

	_getWeek = function(date) {

		return _safeToExecute(date, null, function() {
			var first = new Date(date.getFullYear(), 0, 1);

			return Math.ceil((((date.getTime() - first.getTime()) / _day) + first.getDay() + 1 ) / 7);
		});
	};

	_getDay = function(date) {

		return _safeToExecute(date, null, function() {
			return date.getDate();
		});
	};

	_getHour = function(date) {

		return _safeToExecute(date, null, function() {
			return date.getHours();
		});
	};

	_getMinute = function(date) {

		return _safeToExecute(date, null, function() {
			return date.getMinutes();
		});
	};

	_getSecond = function(date) {

		return _safeToExecute(date, null, function() {
			return date.getSeconds();
		});
	};

	_getMillisecond = function(date) {

		return _safeToExecute(date, null, function() {
			return date.getMilliseconds();
		});
	};

	_getTime = function(date) {

		return _safeToExecute(date, null, function() {
			return date.getTime();
		});
	};

	_setYear = function(date, value) {

		return _safeToExecute(date, null, function() {
			var _value = Math.floor(value);

			var ret = _clone(date);
			ret.setFullYear(_value);

			return ret;
		});
	};

	_setMonth = function(date, value) {

		return _safeToExecute(date, null, function() {
			var _value = Math.floor(value);

			var ret = _clone(date);
			ret.setMonth(_value);

			return ret;
		});
	};

	_setDay = function(date, value) {

		return _safeToExecute(date, null, function() {
			var _value = Math.floor(value);

			var ret = _clone(date);
			ret.setDate(_value);

			return ret;
		});
	};

	_setHour = function(date, value) {

		return _safeToExecute(date, null, function() {
			var _value = Math.floor(value);

			var ret = _clone(date);
			ret.setHours(_value);

			return ret;
		});
	};

	_setMinute = function(date, value) {

		return _safeToExecute(date, null, function() {
			var _value = Math.floor(value);

			var ret = _clone(date);
			ret.setMinutes(_value);

			return ret;
		});
	};

	_setSecond = function(date, value) {

		return _safeToExecute(date, null, function() {
			var _value = Math.floor(value);

			var ret = _clone(date);
			ret.setSeconds(_value);

			return ret;
		});
	};

	_setMillisecond = function(date, value) {

		return _safeToExecute(date, null, function() {
			var _value = Math.floor(value);

			var ret = _clone(date);
			ret.setMilliseconds(_value);

			return ret;
		});
	};

	_setTime = function(date, value) {

		return _safeToExecute(date, null, function() {
			var _value = Math.floor(value);

			var ret = _clone(date);
			ret.setTime(_value);

			return ret;
		});
	};

	_addYears = function(date, offset) {

		return _safeToExecute(date, null, function() {
			return _setYear(date, date.getFullYear() + offset);
		});
	};

	_addMonths = function(date, offset) {

		return _safeToExecute(date, null, function() {
			return _setMonth(date, date.getMonth() + offset);
		});
	};

	_addDays = function(date, offset) {

		return _safeToExecute(date, null, function() {
			return _setDay(date, date.getDate() + offset);
		});
	};

	_addHours = function(date, offset) {

		return _safeToExecute(date, null, function() {
			return _setHour(date, date.getHours() + offset);
		});
	};

	_addMinutes = function(date, offset) {

		return _safeToExecute(date, null, function() {
			return _setMinute(date, date.getMinutes() + offset);
		});
	};

	_addSeconds = function(date, offset) {

		return _safeToExecute(date, null, function() {
			return _setSecond(date, date.getSeconds() + offset);
		});
	};

	_addMilliseconds = function(date, offset) {

		return _safeToExecute(date, null, function() {
			return _setMillisecond(date, date.getMilliseconds() + offset);
		});
	};

	_elapsedYears = function(begin, end) {
		return _elapsedToInternal(begin, end, _addYears);
	};

	_elapsedMonths = function(begin, end) {
		return _elapsedToInternal(begin, end, _addMonths);
	};

	_elapsedDays = function(begin, end) {
		return _elapsedTo(begin, end, _day);
	};

	_elapsedHours = function(begin, end) {
		return _elapsedTo(begin, end, _hour);
	};

	_elapsedMinutes = function(begin, end) {
		return _elapsedTo(begin, end, _minute);
	};

	_elapsedSeconds = function(begin, end) {
		return _elapsedTo(begin, end, _second);
	};

	_elapsedMilliseconds = function(begin, end) {
		return _elapsedTo(begin, end, _millisecond);
	};

	_format = function(date, pattern) {

		return _safeToExecute(date, null, function() {
			var year = date.getFullYear().toString();
			var shortYear = year.substring(2);
			var month = date.getMonth();
			var day = date.getDate();
			var hour_24 = date.getHours();
			var hour_12 = hour_24 < 12 ? hour_24 : hour_24 - 12;
			var minute = date.getMinutes();
			var second = date.getSeconds();
			var millisecond = date.getMilliseconds();
			var dayOfWeek = date.getDay();
			var marker = _getMarker(hour_24, minute, second, millisecond);

			var ret = xeno.common.util.StringUtils.replace(pattern, "yyyy", year);
			ret = xeno.common.util.StringUtils.replace(ret, "yy", shortYear);
			ret = xeno.common.util.StringUtils.replace(ret, "MM", xeno.common.util.NumberUtils.format(month + 1, "00"));
			ret = xeno.common.util.StringUtils.replace(ret, "M", (month + 1).toString());
			ret = xeno.common.util.StringUtils.replace(ret, "dd", xeno.common.util.NumberUtils.format(day, "00"));
			ret = xeno.common.util.StringUtils.replace(ret, "d", day.toString());
			ret = xeno.common.util.StringUtils.replace(ret, "hh", xeno.common.util.NumberUtils.format(hour_12, "00"));
			ret = xeno.common.util.StringUtils.replace(ret, "h", hour_12.toString());
			ret = xeno.common.util.StringUtils.replace(ret, "HH", xeno.common.util.NumberUtils.format(hour_24, "00"));
			ret = xeno.common.util.StringUtils.replace(ret, "H", hour_24.toString());
			ret = xeno.common.util.StringUtils.replace(ret, "mm", xeno.common.util.NumberUtils.format(minute, "00"));
			ret = xeno.common.util.StringUtils.replace(ret, "m", minute.toString());
			ret = xeno.common.util.StringUtils.replace(ret, "ss", xeno.common.util.NumberUtils.format(second, "00"));
			ret = xeno.common.util.StringUtils.replace(ret, "s", second.toString());
			ret = xeno.common.util.StringUtils.replace(ret, "SSS", xeno.common.util.NumberUtils.format(millisecond, "000"));
			ret = xeno.common.util.StringUtils.replace(ret, "S", millisecond.toString());
			ret = xeno.common.util.StringUtils.replace(ret, "a", marker);
			ret = xeno.common.util.StringUtils.replace(ret, "A", marker.toUpperCase());
			ret = xeno.common.util.StringUtils.replace(ret, "E", dayOfWeek.toString());

			return ret;
		});
	};

	return {

		/**
		 * @description
		 * <p>
		 * Clones the "date" and returns a Date object, all properties will be copied into a new Date instance and returns.
		 * </p>
		 * <p>
		 * For the null "date", this function will return the null.
		 * </p>
		 * 
		 * @param date
		 * 			The Date to be cloned.
		 * 
		 * @return
		 * 			The Date.
		 * 
		 * @throws
		 * 			The Error will be thrown when the "date" is missing.<br/>
		 * 			Or it will be thrown when the "date" is not null or not a Date.
		 * 
		 * @since
		 * 			1.0.0
		 */
		clone: function(date) {
			xeno.common.lang.Data.ensures(arguments.length > 0, "The 'date' is required, index: 0");
			xeno.common.lang.Data.ensures(xeno.common.lang.Data.isDate(date, true), "The 'date' is not null or not a Date");

			return _clone(date);
		},

		/**
		 * @description
		 * <p>
		 * Tests whether the "year" is a leap year or not.
		 * </p>
		 * <p>
		 * For the null "year", this function will return the null.
		 * </p>
		 * <p>
		 * The "year" maybe a float value, the "Math.floor(n)" action will be processed first to convert it into an integer Number.
		 * </p>
		 * 
		 * @param year
		 * 			The year to be tested.
		 * 
		 * @return
		 * 			The Boolean.
		 * 
		 * @throws
		 * 			The Error will be thrown when the "year" is missing.<br/>
		 * 			Or it will be thrown when the "year" is not null or not a Number.<br/>
		 * 			Or it will be thrown then the "year" is negative.
		 * 
		 * @since
		 * 			1.0.0
		 */
		isLeapYear: function(year) {
			xeno.common.lang.Data.ensures(arguments.length > 0, "The 'year' is required, index: 0");
			xeno.common.lang.Data.ensures(xeno.common.lang.Data.isNumber(year, true), "The 'year' is not null or not a Number");
			xeno.common.lang.Data.ensures(year >= 0, "The 'year' is negative");

			return _isLeapYear(year);
		},

		/**
		 * @description
		 * <p>
		 * Compares two Dates and returns a Number about their relationship:
		 * 	<ul>
		 * 		<li>-1: if the "left" is greater than the "right", or the "left" is not null but the "right" is null</li>
		 * 		<li>1: if the "right" is greater than the "left", or the "left" is null but the "right" is not null</li>
		 * 		<li>0: if both are in the same time, or both are null</li>
		 * 	</ul>
		 * </p>
		 * 
		 * @param left
		 * 			The Date to be compared.
		 * @param right
		 * 			The Date to be compared.
		 * 
		 * @return
		 * 			The Number, integer.
		 * 
		 * @throws
		 * 			The Error will be thrown when the "left" or the "right" is missing.<br/>
		 * 			Or it will be thrown when the "left" or the "right" is not null or not a Date.
		 * 
		 * @since
		 * 			1.0.0
		 */
		compare: function(left, right) {
			var _arguments = arguments.length;

			xeno.common.lang.Data.ensures(_arguments > 0, "The 'left' is required, index: 0");
			xeno.common.lang.Data.ensures(_arguments > 1, "The 'right' is required, index: 1");
			xeno.common.lang.Data.ensures(xeno.common.lang.Data.isDate(left, true), "The 'left' is not null or not a Date");
			xeno.common.lang.Data.ensures(xeno.common.lang.Data.isDate(right, true), "The 'right' is not null or not a Date");

			return _compare(left, right);
		},

		/**
		 * @description
		 * <p>
		 * Returns the max day in the month of the "date".
		 * </p>
		 * <p>
		 * For the null "date", this function will return the null.
		 * </p>
		 * 
		 * @param date
		 * 			The Date.
		 * 
		 * @return
		 * 			The Number, integer.
		 * 
		 * @throws
		 * 			The Error will be thrown when the "date" is missing.<br/>
		 * 			Or it will be thrown when the "date" is not null or not a Date.
		 * 
		 * @since
		 * 			1.0.0
		 */
		getMaxDayInMonth: function(date) {
			xeno.common.lang.Data.ensures(arguments.length > 0, "The 'date' is required, index: 0");
			xeno.common.lang.Data.ensures(xeno.common.lang.Data.isDate(date, true), "The 'date' is not null or not a Date");

			return _getMaxDayInMonth(date);
		},

		/**
		 * @description
		 * <p>
		 * Returns the day of the week of the "date".
		 * The return value start from 0 to 6, Sunday is 0 and Saturday is 6.
		 * </p>
		 * <p>
		 * For the null "date", this function will return the null.
		 * </p>
		 * 
		 * @param date
		 * 			The Date.
		 * 
		 * @return
		 * 			The Number, integer.
		 * 
		 * @throws
		 * 			The Error will be thrown when the "date" is missing.<br/>
		 * 			Or it will be thrown when the "date" is not null or not a Date.
		 * 
		 * @since
		 * 			1.0.0
		 */
		getDayOfWeek: function(date) {
			xeno.common.lang.Data.ensures(arguments.length > 0, "The 'date' is required, index: 0");
			xeno.common.lang.Data.ensures(xeno.common.lang.Data.isDate(date, true), "The 'date' is not null or not a Date");

			return _getDayOfWeek(date);
		},

		/**
		 * @description
		 * <p>
		 * Returns the full year of the providing "date".
		 * </p>
		 * <p>
		 * For the null "date", this function will return the null.
		 * </p>
		 * 
		 * @param date
		 * 			The Date.
		 * 
		 * @return
		 * 			The Number, integer.
		 * 
		 * @throws
		 * 			The Error will be thrown when the "date" is missing.<br/>
		 * 			Or it will be thrown when the "date" is not null or not a Date.
		 * 
		 * @since
		 * 			1.0.0
		 */
		getYear: function(date) {
			xeno.common.lang.Data.ensures(arguments.length > 0, "The 'date' is required, index: 0");
			xeno.common.lang.Data.ensures(xeno.common.lang.Data.isDate(date, true), "The 'date' is not null or not a Date");

			return _getYear(date);
		},

		/**
		 * @description
		 * <p>
		 * Returns the month of the providing "date".
		 * </p>
		 * <p>
		 * For the null "date", this function will return the null.
		 * </p>
		 * 
		 * @param date
		 * 			The Date.
		 * 
		 * @return
		 * 			The Number, integer.
		 * 
		 * @throws
		 * 			The Error will be thrown when the "date" is missing.<br/>
		 * 			Or it will be thrown when the "date" is not null or not a Date.
		 * 
		 * @since
		 * 			1.0.0
		 */
		getMonth: function(date) {
			xeno.common.lang.Data.ensures(arguments.length > 0, "The 'date' is required, index: 0");
			xeno.common.lang.Data.ensures(xeno.common.lang.Data.isDate(date, true), "The 'date' is not null or not a Date");

			return _getMonth(date);
		},

		/**
		 * @description
		 * <p>
		 * Returns the week of the providing "date".
		 * </p>
		 * <p>
		 * For the null "date", this function will return the null.
		 * </p>
		 * 
		 * @param date
		 * 			The Date.
		 * 
		 * @return
		 * 			The Number, integer.
		 * 
		 * @throws
		 * 			The Error will be thrown when the "date" is missing.<br/>
		 * 			Or it will be thrown when the "date" is not null or not a Date.
		 * 
		 * @since
		 * 			1.0.0
		 */
		getWeek: function(date) {
			xeno.common.lang.Data.ensures(arguments.length > 0, "The 'date' is required, index: 0");
			xeno.common.lang.Data.ensures(xeno.common.lang.Data.isDate(date, true), "The 'date' is not null or not a Date");

			return _getWeek(date);
		},

		/**
		 * @description
		 * <p>
		 * Returns the day of the providing "date".
		 * </p>
		 * <p>
		 * For the null "date", this function will return the null.
		 * </p>
		 * 
		 * @param date
		 * 			The Date.
		 * 
		 * @return
		 * 			The Number, integer.
		 * 
		 * @throws
		 * 			The Error will be thrown when the "date" is missing.<br/>
		 * 			Or it will be thrown when the "date" is not null or not a Date.
		 * 
		 * @since
		 * 			1.0.0
		 */
		getDay: function(date) {
			xeno.common.lang.Data.ensures(arguments.length > 0, "The 'date' is required, index: 0");
			xeno.common.lang.Data.ensures(xeno.common.lang.Data.isDate(date, true), "The 'date' is not null or not a Date");

			return _getDay(date);
		},

		/**
		 * @description
		 * <p>
		 * Returns the hour of the providing "date".
		 * </p>
		 * <p>
		 * For the null "date", this function will return the null.
		 * </p>
		 * 
		 * @param date
		 * 			The Date.
		 * 
		 * @return
		 * 			The Number, integer.
		 * 
		 * @throws
		 * 			The Error will be thrown when the "date" is missing.<br/>
		 * 			Or it will be thrown when the "date" is not null or not a Date.
		 * 
		 * @since
		 * 			1.0.0
		 */
		getHour: function(date) {
			xeno.common.lang.Data.ensures(arguments.length > 0, "The 'date' is required, index: 0");
			xeno.common.lang.Data.ensures(xeno.common.lang.Data.isDate(date, true), "The 'date' is not null or not a Date");

			return _getHour(date);
		},

		/**
		 * @description
		 * <p>
		 * Returns the minute of the providing "date".
		 * </p>
		 * <p>
		 * For the null "date", this function will return the null.
		 * </p>
		 * 
		 * @param date
		 * 			The Date.
		 * 
		 * @return
		 * 			The Number, integer.
		 * 
		 * @throws
		 * 			The Error will be thrown when the "date" is missing.<br/>
		 * 			Or it will be thrown when the "date" is not null or not a Date.
		 * 
		 * @since
		 * 			1.0.0
		 */
		getMinute: function(date) {
			xeno.common.lang.Data.ensures(arguments.length > 0, "The 'date' is required, index: 0");
			xeno.common.lang.Data.ensures(xeno.common.lang.Data.isDate(date, true), "The 'date' is not null or not a Date");

			return _getMinute(date);
		},

		/**
		 * @description
		 * <p>
		 * Returns the second of the providing "date".
		 * </p>
		 * <p>
		 * For the null "date", this function will return the null.
		 * </p>
		 * 
		 * @param date
		 * 			The Date.
		 * 
		 * @return
		 * 			The Number, integer.
		 * 
		 * @throws
		 * 			The Error will be thrown when the "date" is missing.<br/>
		 * 			Or it will be thrown when the "date" is not null or not a Date.
		 * 
		 * @since
		 * 			1.0.0
		 */
		getSecond: function(date) {
			xeno.common.lang.Data.ensures(arguments.length > 0, "The 'date' is required, index: 0");
			xeno.common.lang.Data.ensures(xeno.common.lang.Data.isDate(date, true), "The 'date' is not null or not a Date");

			return _getSecond(date);
		},

		/**
		 * @description
		 * <p>
		 * Returns the millisecond of the providing "date".
		 * </p>
		 * <p>
		 * For the null "date", this function will return the null.
		 * </p>
		 * 
		 * @param date
		 * 			The Date.
		 * 
		 * @return
		 * 			The Number, integer.
		 * 
		 * @throws
		 * 			The Error will be thrown when the "date" is missing.<br/>
		 * 			Or it will be thrown when the "date" is not null or not a Date.
		 * 
		 * @since
		 * 			1.0.0
		 */
		getMillisecond: function(date) {
			xeno.common.lang.Data.ensures(arguments.length > 0, "The 'date' is required, index: 0");
			xeno.common.lang.Data.ensures(xeno.common.lang.Data.isDate(date, true), "The 'date' is not null or not a Date");

			return _getMillisecond(date);
		},

		/**
		 * @description
		 * <p>
		 * Returns the time (in millisecond) of the providing "date".
		 * </p>
		 * <p>
		 * For the null "date", this function will return the null.
		 * </p>
		 * 
		 * @param date
		 * 			The Date.
		 * 
		 * @return
		 * 			The Number, integer.
		 * 
		 * @throws
		 * 			The Error will be thrown when the "date" is missing.<br/>
		 * 			Or it will be thrown when the "date" is not null or not a Date.
		 * 
		 * @since
		 * 			1.0.0
		 */
		getTime: function(date) {
			xeno.common.lang.Data.ensures(arguments.length > 0, "The 'date' is required, index: 0");
			xeno.common.lang.Data.ensures(xeno.common.lang.Data.isDate(date, true), "The 'date' is not null or not a Date");

			return _getTime(date);
		},

		/**
		 * @description
		 * <p>
		 * Sets the year of the providing "date" and return a new instance Date with the "value" set.
		 * </p>
		 * <p>
		 * For the null "date", this function will return the null.
		 * </p>
		 * <p>
		 * The "value" maybe a float value, the "Math.floor(n)" action will be processed first to convert it into an integer Number.
		 * </p>
		 * 
		 * @param date
		 * 			The Date.
		 * @param value
		 * 			The value to be set.
		 * 
		 * @return
		 * 			The Date.
		 * 
		 * @throws
		 * 			The Error will be thrown when the "date" or the "value" is missing.<br/>
		 * 			Or it will be thrown when the "date" is not null or not a Date.<br/>
		 * 			Or it will be thrown when the "value" is not a Number.<br/>
		 * 			Or it will be thrown when the "value" is negative.
		 * 
		 * @since
		 * 			1.0.0
		 */
		setYear: function(date, value) {
			var _arguments = arguments.length;

			xeno.common.lang.Data.ensures(_arguments > 0, "The 'date' is required, index: 0");
			xeno.common.lang.Data.ensures(_arguments > 1, "The 'value' is required, index: 1");
			xeno.common.lang.Data.ensures(xeno.common.lang.Data.isDate(date, true), "The 'date' is not null or not a Date");
			xeno.common.lang.Data.ensures(xeno.common.lang.Data.isNumber(value), "The 'value' is not a Number");
			xeno.common.lang.Data.ensures(value >= 0, "The 'value' is negative");

			return _setYear(date, value);
		},

		/**
		 * @description
		 * <p>
		 * Sets the month of the providing "date" and return a new instance Date with the "value" set.
		 * </p>
		 * <p>
		 * For the null "date", this function will return the null.
		 * </p>
		 * <p>
		 * The "value" maybe a float value, the "Math.floor(n)" action will be processed first to convert it into an integer Number.
		 * </p>
		 * 
		 * @param date
		 * 			The Date.
		 * @param value
		 * 			The value to be set.
		 * 
		 * @return
		 * 			The Date.
		 * 
		 * @throws
		 * 			The Error will be thrown when the "date" or the "value" is missing.<br/>
		 * 			Or it will be thrown when the "date" is not null or not a Date.<br/>
		 * 			Or it will be thrown when the "value" is not a Number.<br/>
		 * 			Or it will be thrown when the "value" is negative.
		 * 
		 * @since
		 * 			1.0.0
		 */
		setMonth: function(date, value) {
			var _arguments = arguments.length;

			xeno.common.lang.Data.ensures(_arguments > 0, "The 'date' is required, index: 0");
			xeno.common.lang.Data.ensures(_arguments > 1, "The 'value' is required, index: 1");
			xeno.common.lang.Data.ensures(xeno.common.lang.Data.isDate(date, true), "The 'date' is not null or not a Date");
			xeno.common.lang.Data.ensures(xeno.common.lang.Data.isNumber(value), "The 'value' is not a Number");
			xeno.common.lang.Data.ensures(value >= 0, "The 'value' is negative");

			return _setMonth(date, value);
		},

		/**
		 * @description
		 * <p>
		 * Sets the day of the providing "date" and return a new instance Date with the "value" set.
		 * </p>
		 * <p>
		 * For the null "date", this function will return the null.
		 * </p>
		 * <p>
		 * The "value" maybe a float value, the "Math.floor(n)" action will be processed first to convert it into an integer Number.
		 * </p>
		 * 
		 * @param date
		 * 			The Date.
		 * @param value
		 * 			The value to be set.
		 * 
		 * @return
		 * 			The Date.
		 * 
		 * @throws
		 * 			The Error will be thrown when the "date" or the "value" is missing.<br/>
		 * 			Or it will be thrown when the "date" is not null or not a Date.<br/>
		 * 			Or it will be thrown when the "value" is not a Number.<br/>
		 * 			Or it will be thrown when the "value" is less than 1.
		 * 
		 * @since
		 * 			1.0.0
		 */
		setDay: function(date, value) {
			var _arguments = arguments.length;

			xeno.common.lang.Data.ensures(_arguments > 0, "The 'date' is required, index: 0");
			xeno.common.lang.Data.ensures(_arguments > 1, "The 'value' is required, index: 1");
			xeno.common.lang.Data.ensures(xeno.common.lang.Data.isDate(date, true), "The 'date' is not null or not a Date");
			xeno.common.lang.Data.ensures(xeno.common.lang.Data.isNumber(value), "The 'value' is not a Number");
			xeno.common.lang.Data.ensures(value >= 1, "The 'value' is less than 1");

			return _setDay(date, value);
		},

		/**
		 * @description
		 * <p>
		 * Sets the hour of the providing "date" and return a new instance Date with the "value" set.
		 * </p>
		 * <p>
		 * For the null "date", this function will return the null.
		 * </p>
		 * <p>
		 * The "value" maybe a float value, the "Math.floor(n)" action will be processed first to convert it into an integer Number.
		 * </p>
		 * 
		 * @param date
		 * 			The Date.
		 * @param value
		 * 			The value to be set.
		 * 
		 * @return
		 * 			The Date.
		 * 
		 * @throws
		 * 			The Error will be thrown when the "date" or the "value" is missing.<br/>
		 * 			Or it will be thrown when the "date" is not null or not a Date.<br/>
		 * 			Or it will be thrown when the "value" is not a Number.<br/>
		 * 			Or it will be thrown when the "value" is negative.
		 * 
		 * @since
		 * 			1.0.0
		 */
		setHour: function(date, value) {
			var _arguments = arguments.length;

			xeno.common.lang.Data.ensures(_arguments > 0, "The 'date' is required, index: 0");
			xeno.common.lang.Data.ensures(_arguments > 1, "The 'value' is required, index: 1");
			xeno.common.lang.Data.ensures(xeno.common.lang.Data.isDate(date, true), "The 'date' is not null or not a Date");
			xeno.common.lang.Data.ensures(xeno.common.lang.Data.isNumber(value), "The 'value' is not a Number");
			xeno.common.lang.Data.ensures(value >= 0, "The 'value' is negative");

			return _setHour(date, value);
		},

		/**
		 * @description
		 * <p>
		 * Sets the minute of the providing "date" and return a new instance Date with the "value" set.
		 * </p>
		 * <p>
		 * For the null "date", this function will return the null.
		 * </p>
		 * <p>
		 * The "value" maybe a float value, the "Math.floor(n)" action will be processed first to convert it into an integer Number.
		 * </p>
		 * 
		 * @param date
		 * 			The Date.
		 * @param value
		 * 			The value to be set.
		 * 
		 * @return
		 * 			The Date.
		 * 
		 * @throws
		 * 			The Error will be thrown when the "date" or the "value" is missing.<br/>
		 * 			Or it will be thrown when the "date" is not null or not a Date.<br/>
		 * 			Or it will be thrown when the "value" is not a Number.<br/>
		 * 			Or it will be thrown when the "value" is negative.
		 * 
		 * @since
		 * 			1.0.0
		 */
		setMinute: function(date, value) {
			var _arguments = arguments.length;

			xeno.common.lang.Data.ensures(_arguments > 0, "The 'date' is required, index: 0");
			xeno.common.lang.Data.ensures(_arguments > 1, "The 'value' is required, index: 1");
			xeno.common.lang.Data.ensures(xeno.common.lang.Data.isDate(date, true), "The 'date' is not null or not a Date");
			xeno.common.lang.Data.ensures(xeno.common.lang.Data.isNumber(value), "The 'value' is not a Number");
			xeno.common.lang.Data.ensures(value >= 0, "The 'value' is negative");

			return _setMinute(date, value);
		},

		/**
		 * @description
		 * <p>
		 * Sets the second of the providing "date" and return a new instance Date with the "value" set.
		 * </p>
		 * <p>
		 * For the null "date", this function will return the null.
		 * </p>
		 * <p>
		 * The "value" maybe a float value, the "Math.floor(n)" action will be processed first to convert it into an integer Number.
		 * </p>
		 * 
		 * @param date
		 * 			The Date.
		 * @param value
		 * 			The value to be set.
		 * 
		 * @return
		 * 			The Date.
		 * 
		 * @throws
		 * 			The Error will be thrown when the "date" or the "value" is missing.<br/>
		 * 			Or it will be thrown when the "date" is not null or not a Date.<br/>
		 * 			Or it will be thrown when the "value" is not a Number.<br/>
		 * 			Or it will be thrown when the "value" is negative.
		 * 
		 * @since
		 * 			1.0.0
		 */
		setSecond: function(date, value) {
			var _arguments = arguments.length;

			xeno.common.lang.Data.ensures(_arguments > 0, "The 'date' is required, index: 0");
			xeno.common.lang.Data.ensures(_arguments > 1, "The 'value' is required, index: 1");
			xeno.common.lang.Data.ensures(xeno.common.lang.Data.isDate(date, true), "The 'date' is not null or not a Date");
			xeno.common.lang.Data.ensures(xeno.common.lang.Data.isNumber(value), "The 'value' is not a Number");
			xeno.common.lang.Data.ensures(value >= 0, "The 'value' is negative");

			return _setSecond(date, value);
		},

		/**
		 * @description
		 * <p>
		 * Sets the millisecond of the providing "date" and return a new instance Date with the "value" set.
		 * </p>
		 * <p>
		 * For the null "date", this function will return the null.
		 * </p>
		 * <p>
		 * The "value" maybe a float value, the "Math.floor(n)" action will be processed first to convert it into an integer Number.
		 * </p>
		 * 
		 * @param date
		 * 			The Date.
		 * @param value
		 * 			The value to be set.
		 * 
		 * @return
		 * 			The Date.
		 * 
		 * @throws
		 * 			The Error will be thrown when the "date" or the "value" is missing.<br/>
		 * 			Or it will be thrown when the "date" is not null or not a Date.<br/>
		 * 			Or it will be thrown when the "value" is not a Number.<br/>
		 * 			Or it will be thrown when the "value" is negative.
		 * 
		 * @since
		 * 			1.0.0
		 */
		setMillisecond: function(date, value) {
			var _arguments = arguments.length;

			xeno.common.lang.Data.ensures(_arguments > 0, "The 'date' is required, index: 0");
			xeno.common.lang.Data.ensures(_arguments > 1, "The 'value' is required, index: 1");
			xeno.common.lang.Data.ensures(xeno.common.lang.Data.isDate(date, true), "The 'date' is not null or not a Date");
			xeno.common.lang.Data.ensures(xeno.common.lang.Data.isNumber(value), "The 'value' is not a Number");
			xeno.common.lang.Data.ensures(value >= 0, "The 'value' is negative");

			return _setMillisecond(date, value);
		},

		/**
		 * @description
		 * <p>
		 * Sets the time (in millisecond) of the providing "date" and return a new instance Date with the "value" set.
		 * </p>
		 * <p>
		 * For the null "date", this function will return the null.
		 * </p>
		 * <p>
		 * The "value" maybe a float value, the "Math.floor(n)" action will be processed first to convert it into an integer Number.
		 * </p>
		 * 
		 * @param date
		 * 			The Date.
		 * @param value
		 * 			The value to be set.
		 * 
		 * @return
		 * 			The Date.
		 * 
		 * @throws
		 * 			The Error will be thrown when the "date" or the "value" is missing.<br/>
		 * 			Or it will be thrown when the "date" is not null or not a Date.<br/>
		 * 			Or it will be thrown when the "value" is not a Number.<br/>
		 * 			Or it will be thrown when the "value" is negative.
		 * 
		 * @since
		 * 			1.0.0
		 */
		setTime: function(date, value) {
			var _arguments = arguments.length;

			xeno.common.lang.Data.ensures(_arguments > 0, "The 'date' is required, index: 0");
			xeno.common.lang.Data.ensures(_arguments > 1, "The 'value' is required, index: 1");
			xeno.common.lang.Data.ensures(xeno.common.lang.Data.isDate(date, true), "The 'date' is not null or not a Date");
			xeno.common.lang.Data.ensures(xeno.common.lang.Data.isNumber(value), "The 'value' is not a Number");
			xeno.common.lang.Data.ensures(value >= 0, "The 'value' is negative");

			return _setTime(date, value);
		},

		/**
		 * @description
		 * <p>
		 * Adds certain years to the "date" and return a new instance Date with the "offset" added.
		 * </p>
		 * <p>
		 * For the null "date", this function will return the null.
		 * </p>
		 * <p>
		 * The negative "offset" value will be taken as to do the minus calculation.
		 * </p>
		 * <p>
		 * The "offset" maybe a float value, the "Math.floor(n)" action will be processed first to convert it into an integer Number.
		 * </p>
		 * 
		 * @param date
		 * 			The Date to be calculated.
		 * @param offset
		 * 			The value to be added.
		 * 
		 * @return
		 * 			The Date.
		 * 
		 * @throws
		 * 			The Error will be thrown when the "date" or the "offset" is missing.<br/>
		 * 			Or it will be thrown when the "date" is not null or not a Date.<br/>
		 * 			Or it will be thrown when the "offset" is not a Number.
		 * 
		 * @since
		 * 			1.0.0
		 */
		addYears: function(date, offset) {
			var _arguments = arguments.length;

			xeno.common.lang.Data.ensures(_arguments > 0, "The 'date' is required, index: 0");
			xeno.common.lang.Data.ensures(_arguments > 1, "The 'offset' is required, index: 1");
			xeno.common.lang.Data.ensures(xeno.common.lang.Data.isDate(date, true), "The 'date' is not null or not a Date");
			xeno.common.lang.Data.ensures(xeno.common.lang.Data.isNumber(offset), "The 'offset' is not a Number");

			return _addYears(date, offset);
		},

		/**
		 * @description
		 * <p>
		 * Adds certain months to the "date" and return a new instance Date with the "offset" added.
		 * </p>
		 * <p>
		 * For the null "date", this function will return the null.
		 * </p>
		 * <p>
		 * The negative "offset" value will be taken as to do the minus calculation.
		 * </p>
		 * <p>
		 * The "offset" maybe a float value, the "Math.floor(n)" action will be processed first to convert it into an integer Number.
		 * </p>
		 * 
		 * @param date
		 * 			The Date to be calculated.
		 * @param offset
		 * 			The value to be added.
		 * 
		 * @return
		 * 			The Date.
		 * 
		 * @throws
		 * 			The Error will be thrown when the "date" or the "offset" is missing.<br/>
		 * 			Or it will be thrown when the "date" is not null or not a Date.<br/>
		 * 			Or it will be thrown when the "offset" is not a Number.
		 * 
		 * @since
		 * 			1.0.0
		 */
		addMonths: function(date, offset) {
			var _arguments = arguments.length;

			xeno.common.lang.Data.ensures(_arguments > 0, "The 'date' is required, index: 0");
			xeno.common.lang.Data.ensures(_arguments > 1, "The 'offset' is required, index: 1");
			xeno.common.lang.Data.ensures(xeno.common.lang.Data.isDate(date, true), "The 'date' is not null or not a Date");
			xeno.common.lang.Data.ensures(xeno.common.lang.Data.isNumber(offset), "The 'offset' is not a Number");

			return _addMonths(date, offset);
		},

		/**
		 * @description
		 * <p>
		 * Adds certain days to the "date" and return a new instance Date with the "offset" added.
		 * </p>
		 * <p>
		 * For the null "date", this function will return the null.
		 * </p>
		 * <p>
		 * The negative "offset" value will be taken as to do the minus calculation.
		 * </p>
		 * <p>
		 * The "offset" maybe a float value, the "Math.floor(n)" action will be processed first to convert it into an integer Number.
		 * </p>
		 * 
		 * @param date
		 * 			The Date to be calculated.
		 * @param offset
		 * 			The value to be added.
		 * 
		 * @return
		 * 			The Date.
		 * 
		 * @throws
		 * 			The Error will be thrown when the "date" or the "offset" is missing.<br/>
		 * 			Or it will be thrown when the "date" is not null or not a Date.<br/>
		 * 			Or it will be thrown when the "offset" is not a Number.
		 * 
		 * @since
		 * 			1.0.0
		 */
		addDays: function(date, offset) {
			var _arguments = arguments.length;

			xeno.common.lang.Data.ensures(_arguments > 0, "The 'date' is required, index: 0");
			xeno.common.lang.Data.ensures(_arguments > 1, "The 'offset' is required, index: 1");
			xeno.common.lang.Data.ensures(xeno.common.lang.Data.isDate(date, true), "The 'date' is not null or not a Date");
			xeno.common.lang.Data.ensures(xeno.common.lang.Data.isNumber(offset), "The 'offset' is not a Number");

			return _addDays(date, offset);
		},

		/**
		 * @description
		 * <p>
		 * Adds certain hours to the "date" and return a new instance Date with the "offset" added.
		 * </p>
		 * <p>
		 * For the null "date", this function will return the null.
		 * </p>
		 * <p>
		 * The negative "offset" value will be taken as to do the minus calculation.
		 * </p>
		 * <p>
		 * The "offset" maybe a float value, the "Math.floor(n)" action will be processed first to convert it into an integer Number.
		 * </p>
		 * 
		 * @param date
		 * 			The Date to be calculated.
		 * @param offset
		 * 			The value to be added.
		 * 
		 * @return
		 * 			The Date.
		 * 
		 * @throws
		 * 			The Error will be thrown when the "date" or the "offset" is missing.<br/>
		 * 			Or it will be thrown when the "date" is not null or not a Date.<br/>
		 * 			Or it will be thrown when the "offset" is not a Number.
		 * 
		 * @since
		 * 			1.0.0
		 */
		addHours: function(date, offset) {
			var _arguments = arguments.length;

			xeno.common.lang.Data.ensures(_arguments > 0, "The 'date' is required, index: 0");
			xeno.common.lang.Data.ensures(_arguments > 1, "The 'offset' is required, index: 1");
			xeno.common.lang.Data.ensures(xeno.common.lang.Data.isDate(date, true), "The 'date' is not null or not a Date");
			xeno.common.lang.Data.ensures(xeno.common.lang.Data.isNumber(offset), "The 'offset' is not a Number");

			return _addHours(date, offset);
		},

		/**
		 * @description
		 * <p>
		 * Adds certain minutes to the "date" and return a new instance Date with the "offset" added.
		 * </p>
		 * <p>
		 * For the null "date", this function will return the null.
		 * </p>
		 * <p>
		 * The negative "offset" value will be taken as to do the minus calculation.
		 * </p>
		 * <p>
		 * The "offset" maybe a float value, the "Math.floor(n)" action will be processed first to convert it into an integer Number.
		 * </p>
		 * 
		 * @param date
		 * 			The Date to be calculated.
		 * @param offset
		 * 			The value to be added.
		 * 
		 * @return
		 * 			The Date.
		 * 
		 * @throws
		 * 			The Error will be thrown when the "date" or the "offset" is missing.<br/>
		 * 			Or it will be thrown when the "date" is not null or not a Date.<br/>
		 * 			Or it will be thrown when the "offset" is not a Number.
		 * 
		 * @since
		 * 			1.0.0
		 */
		addMinutes: function(date, offset) {
			var _arguments = arguments.length;

			xeno.common.lang.Data.ensures(_arguments > 0, "The 'date' is required, index: 0");
			xeno.common.lang.Data.ensures(_arguments > 1, "The 'offset' is required, index: 1");
			xeno.common.lang.Data.ensures(xeno.common.lang.Data.isDate(date, true), "The 'date' is not null or not a Date");
			xeno.common.lang.Data.ensures(xeno.common.lang.Data.isNumber(offset), "The 'offset' is not a Number");

			return _addMinutes(date, offset);
		},

		/**
		 * @description
		 * <p>
		 * Adds certain seconds to the "date" and return a new instance Date with the "offset" added.
		 * </p>
		 * <p>
		 * For the null "date", this function will return the null.
		 * </p>
		 * <p>
		 * The negative "offset" value will be taken as to do the minus calculation.
		 * </p>
		 * <p>
		 * The "offset" maybe a float value, the "Math.floor(n)" action will be processed first to convert it into an integer Number.
		 * </p>
		 * 
		 * @param date
		 * 			The Date to be calculated.
		 * @param offset
		 * 			The value to be added.
		 * 
		 * @return
		 * 			The Date.
		 * 
		 * @throws
		 * 			The Error will be thrown when the "date" or the "offset" is missing.<br/>
		 * 			Or it will be thrown when the "date" is not null or not a Date.<br/>
		 * 			Or it will be thrown when the "offset" is not a Number.
		 * 
		 * @since
		 * 			1.0.0
		 */
		addSeconds: function(date, offset) {
			var _arguments = arguments.length;

			xeno.common.lang.Data.ensures(_arguments > 0, "The 'date' is required, index: 0");
			xeno.common.lang.Data.ensures(_arguments > 1, "The 'offset' is required, index: 1");
			xeno.common.lang.Data.ensures(xeno.common.lang.Data.isDate(date, true), "The 'date' is not null or not a Date");
			xeno.common.lang.Data.ensures(xeno.common.lang.Data.isNumber(offset), "The 'offset' is not a Number");

			return _addSeconds(date, offset);
		},

		/**
		 * @description
		 * <p>
		 * Adds certain milliseconds to the "date" and return a new instance Date with the "offset" added.
		 * </p>
		 * <p>
		 * For the null "date", this function will return the null.
		 * </p>
		 * <p>
		 * The negative "offset" value will be taken as to do the minus calculation.
		 * </p>
		 * <p>
		 * The "offset" maybe a float value, the "Math.floor(n)" action will be processed first to convert it into an integer Number.
		 * </p>
		 * 
		 * @param date
		 * 			The Date to be calculated.
		 * @param offset
		 * 			The value to be added.
		 * 
		 * @return
		 * 			The Date.
		 * 
		 * @throws
		 * 			The Error will be thrown when the "date" or the "offset" is missing.<br/>
		 * 			Or it will be thrown when the "date" is not null or not a Date.<br/>
		 * 			Or it will be thrown when the "offset" is not a Number.
		 * 
		 * @since
		 * 			1.0.0
		 */
		addMilliseconds: function(date, offset) {
			var _arguments = arguments.length;

			xeno.common.lang.Data.ensures(_arguments > 0, "The 'date' is required, index: 0");
			xeno.common.lang.Data.ensures(_arguments > 1, "The 'offset' is required, index: 1");
			xeno.common.lang.Data.ensures(xeno.common.lang.Data.isDate(date, true), "The 'date' is not null or not a Date");
			xeno.common.lang.Data.ensures(xeno.common.lang.Data.isNumber(offset), "The 'offset' is not a Number");

			return _addMilliseconds(date, offset);
		},

		/**
		 * @description
		 * <p>
		 * Calculates the years between these two Dates.
		 * <p>
		 * </p>
		 * If the "begin" is greater than the "end", a negative value which represent the past result will return.
		 * </p>
		 * 
		 * @param begin
		 * 			The begin Date.
		 * @param end
		 * 			The end Date.
		 * 
		 * @return
		 * 			The Number, integer.
		 * 
		 * @throws
		 * 			The Error will be thrown when the "begin" or the "end" is missing.<br/>
		 * 			Or it will be thrown when the "begin" or the "end" is not a Date.
		 * 
		 * @since
		 * 			1.0.0
		 */
		elapsedYears: function(begin, end) {
			var _arguments = arguments.length;

			xeno.common.lang.Data.ensures(_arguments > 0, "The 'begin' is required, index: 0");
			xeno.common.lang.Data.ensures(_arguments > 1, "The 'end' is required, index: 1");
			xeno.common.lang.Data.ensures(xeno.common.lang.Data.isDate(begin), "The 'begin' is not a Date");
			xeno.common.lang.Data.ensures(xeno.common.lang.Data.isDate(end), "The 'end' is not a Date");

			return _elapsedYears(begin, end);
		},

		/**
		 * @description
		 * <p>
		 * Calculates the months between these two Dates.
		 * <p>
		 * </p>
		 * If the "begin" is greater than the "end", a negative value which represent the past result will return.
		 * </p>
		 * 
		 * @param begin
		 * 			The begin Date.
		 * @param end
		 * 			The end Date.
		 * 
		 * @return
		 * 			The Number, integer.
		 * 
		 * @throws
		 * 			The Error will be thrown when the "begin" or the "end" is missing.<br/>
		 * 			Or it will be thrown when the "begin" or the "end" is not a Date.
		 * 
		 * @since
		 * 			1.0.0
		 */
		elapsedMonths: function(begin, end) {
			var _arguments = arguments.length;

			xeno.common.lang.Data.ensures(_arguments > 0, "The 'begin' is required, index: 0");
			xeno.common.lang.Data.ensures(_arguments > 1, "The 'end' is required, index: 1");
			xeno.common.lang.Data.ensures(xeno.common.lang.Data.isDate(begin), "The 'begin' is not a Date");
			xeno.common.lang.Data.ensures(xeno.common.lang.Data.isDate(end), "The 'end' is not a Date");

			return _elapsedMonths(begin, end);
		},

		/**
		 * @description
		 * <p>
		 * Calculates the days between these two Dates.
		 * <p>
		 * </p>
		 * If the "begin" is greater than the "end", a negative value which represent the past result will return.
		 * </p>
		 * 
		 * @param begin
		 * 			The begin Date.
		 * @param end
		 * 			The end Date.
		 * 
		 * @return
		 * 			The Number, integer.
		 * 
		 * @throws
		 * 			The Error will be thrown when the "begin" or the "end" is missing.<br/>
		 * 			Or it will be thrown when the "begin" or the "end" is not a Date.
		 * 
		 * @since
		 * 			1.0.0
		 */
		elapsedDays: function(begin, end) {
			var _arguments = arguments.length;

			xeno.common.lang.Data.ensures(_arguments > 0, "The 'begin' is required, index: 0");
			xeno.common.lang.Data.ensures(_arguments > 1, "The 'end' is required, index: 1");
			xeno.common.lang.Data.ensures(xeno.common.lang.Data.isDate(begin), "The 'begin' is not a Date");
			xeno.common.lang.Data.ensures(xeno.common.lang.Data.isDate(end), "The 'end' is not a Date");

			return _elapsedDays(begin, end);
		},

		/**
		 * @description
		 * <p>
		 * Calculates the hours between these two Dates.
		 * <p>
		 * </p>
		 * If the "begin" is greater than the "end", a negative value which represent the past result will return.
		 * </p>
		 * 
		 * @param begin
		 * 			The begin Date.
		 * @param end
		 * 			The end Date.
		 * 
		 * @return
		 * 			The Number, integer.
		 * 
		 * @throws
		 * 			The Error will be thrown when the "begin" or the "end" is missing.<br/>
		 * 			Or it will be thrown when the "begin" or the "end" is not a Date.
		 * 
		 * @since
		 * 			1.0.0
		 */
		elapsedHours: function(begin, end) {
			var _arguments = arguments.length;

			xeno.common.lang.Data.ensures(_arguments > 0, "The 'begin' is required, index: 0");
			xeno.common.lang.Data.ensures(_arguments > 1, "The 'end' is required, index: 1");
			xeno.common.lang.Data.ensures(xeno.common.lang.Data.isDate(begin), "The 'begin' is not a Date");
			xeno.common.lang.Data.ensures(xeno.common.lang.Data.isDate(end), "The 'end' is not a Date");

			return _elapsedHours(begin, end);
		},

		/**
		 * @description
		 * <p>
		 * Calculates the minutes between these two Dates.
		 * <p>
		 * </p>
		 * If the "begin" is greater than the "end", a negative value which represent the past result will return.
		 * </p>
		 * 
		 * @param begin
		 * 			The begin Date.
		 * @param end
		 * 			The end Date.
		 * 
		 * @return
		 * 			The Number, integer.
		 * 
		 * @throws
		 * 			The Error will be thrown when the "begin" or the "end" is missing.<br/>
		 * 			Or it will be thrown when the "begin" or the "end" is not a Date.
		 * 
		 * @since
		 * 			1.0.0
		 */
		elapsedMinutes: function(begin, end) {
			var _arguments = arguments.length;

			xeno.common.lang.Data.ensures(_arguments > 0, "The 'begin' is required, index: 0");
			xeno.common.lang.Data.ensures(_arguments > 1, "The 'end' is required, index: 1");
			xeno.common.lang.Data.ensures(xeno.common.lang.Data.isDate(begin), "The 'begin' is not a Date");
			xeno.common.lang.Data.ensures(xeno.common.lang.Data.isDate(end), "The 'end' is not a Date");

			return _elapsedMinutes(begin, end);
		},

		/**
		 * @description
		 * <p>
		 * Calculates the seconds between these two Dates.
		 * <p>
		 * </p>
		 * If the "begin" is greater than the "end", a negative value which represent the past result will return.
		 * </p>
		 * 
		 * @param begin
		 * 			The begin Date.
		 * @param end
		 * 			The end Date.
		 * 
		 * @return
		 * 			The Number, integer.
		 * 
		 * @throws
		 * 			The Error will be thrown when the "begin" or the "end" is missing.<br/>
		 * 			Or it will be thrown when the "begin" or the "end" is not a Date.
		 * 
		 * @since
		 * 			1.0.0
		 */
		elapsedSeconds: function(begin, end) {
			var _arguments = arguments.length;

			xeno.common.lang.Data.ensures(_arguments > 0, "The 'begin' is required, index: 0");
			xeno.common.lang.Data.ensures(_arguments > 1, "The 'end' is required, index: 1");
			xeno.common.lang.Data.ensures(xeno.common.lang.Data.isDate(begin), "The 'begin' is not a Date");
			xeno.common.lang.Data.ensures(xeno.common.lang.Data.isDate(end), "The 'end' is not a Date");

			return _elapsedSeconds(begin, end);
		},

		/**
		 * @description
		 * <p>
		 * Calculates the milliseconds between these two Dates.
		 * <p>
		 * </p>
		 * If the "begin" is greater than the "end", a negative value which represent the past result will return.
		 * </p>
		 * 
		 * @param begin
		 * 			The begin Date.
		 * @param end
		 * 			The end Date.
		 * 
		 * @return
		 * 			The Number, integer.
		 * 
		 * @throws
		 * 			The Error will be thrown when the "begin" or the "end" is missing.<br/>
		 * 			Or it will be thrown when the "begin" or the "end" is not a Date.
		 * 
		 * @since
		 * 			1.0.0
		 */
		elapsedMilliseconds: function(begin, end) {
			var _arguments = arguments.length;

			xeno.common.lang.Data.ensures(_arguments > 0, "The 'begin' is required, index: 0");
			xeno.common.lang.Data.ensures(_arguments > 1, "The 'end' is required, index: 1");
			xeno.common.lang.Data.ensures(xeno.common.lang.Data.isDate(begin), "The 'begin' is not a Date");
			xeno.common.lang.Data.ensures(xeno.common.lang.Data.isDate(end), "The 'end' is not a Date");

			return _elapsedMilliseconds(begin, end);
		},

		/**
		 * @description
		 * <p>
		 * Converts a Date into a readable format by the pattern provides.
		 * </p>
		 * 
		 * @example
		 * <b>Examples</b>
		 * 
		 * Assume the "date" is: new Date(2000, 9, 1, 2, 3, 4, 5)
		 * 
		 * xeno.common.util.DateUtils.format(null, *) = null
		 * xeno.common.util.DateUtils.format(date, "yyyy-MM-dd") = "2000-10-01"
		 * 
		 * @example
		 * <b>Patterns</b>
		 * 
		 * yy: short year value (eg. 09)
		 * yyyy: full year value (eg. 2009)
		 * M: month value (1 - 12)
		 * MM: month value (01 - 12)
		 * d: date value (1 - 31)
		 * dd: date value (01 - 31)
		 * h: hour value (1 - 12)
		 * hh: hour value (01 - 12)
		 * H: hour value (0 - 23)
		 * HH: hour value (00 - 23)
		 * m: minute value (0 - 59)
		 * mm: minute value (00 - 59)
		 * s: second value (0 - 59)
		 * ss: second value (00 - 59)
		 * S: millisecond value (0 - 999)
		 * SSS: millisecond value (000 - 999)
		 * a: maker (am / pm)
		 * A: maker (AM / PM)
		 * E: day in week value (0 - 6)
		 * 
		 * @param date
		 * 			The Date to be formatted.
		 * @param pattern
		 * 			The pattern to be used.
		 * 
		 * @return
		 * 			The String.
		 * 
		 * @throws
		 * 			The Error will be thrown when the "date" or the "pattern" is missing.<br/>
		 * 			Or it will be thrown when the "date" is not null or not a Date.<br/>
		 * 			Or it will be thrown when the "pattern" is not a String.
		 * 
		 * @since
		 * 			1.0.0
		 */
		format: function(date, pattern) {
			var _arguments = arguments.length;

			xeno.common.lang.Data.ensures(_arguments > 0, "The 'date' is required, index: 0");
			xeno.common.lang.Data.ensures(_arguments > 1, "The 'pattern' is required, index: 1");
			xeno.common.lang.Data.ensures(xeno.common.lang.Data.isDate(date, true), "The 'date' is not null or not a Date");
			xeno.common.lang.Data.ensures(xeno.common.lang.Data.isString(pattern), "The 'pattern' is not a String");

			return _format(date, pattern);
		}

	};

})();
/**
 * @class
 * <p>
 * This class contains some utilities designed to provide a convenience for handling the file related operations.
 * </p>
 * 
 * @description
 * <p>
 * The class constructor.
 * </p>
 * 
 * @since
 * 			1.0.0
 */
xeno.common.util.FileUtils = (function () {
	var _separators = ["\\", "/"];

	var _safeToExecute = function(data, nullReturnVal, func) {
		return xeno.common.lang.Data.isNull(data) ? nullReturnVal : func();
	};

	// ------------------------------
	// Private Function Definitions
	// ------------------------------

	var _getName = function(file) {

		return _safeToExecute(file, null, function() {
			var ret = file;

			for(var i = 0; i < _separators.length; i += 1) {
				var index = ret.lastIndexOf(_separators[i]);

				if(index >= 0) {
					ret = ret.substring(index + 1);
				}
			}

			return xeno.common.util.StringUtils.isBlank(ret) ? null : ret;
		});
	};

	var _getExtName = function(file) {

		return _safeToExecute(file, null, function() {
			var len = file.length;
			var pos = file.lastIndexOf(".");

			if(pos === -1) {
				return null;

			} else if(pos === len - 1) {
				return "";
			}

			var ret = file.substring(pos + 1, len);

			for(var i = 0; i < _separators.length; i += 1) {

				if(ret.indexOf(_separators[i]) !== -1) {
					return null;
				}
			}

			return ret;
		});
	};

	return {

		/**
		 * @description
		 * <p>
		 * Returns the name of the "file", or returns null if there is no name.
		 * </p>
		 * <p>
		 * This function handles both absolute and relative file paths.
		 * </p>
		 * 
		 * @example
		 * <b>Examples</b>
		 * 
		 * xeno.common.util.FileUtils.getName(null) = null
		 * xeno.common.util.FileUtils.getName("") = null
		 * xeno.common.util.FileUtils.getName("a.gif") = "a.gif"
		 * xeno.common.util.FileUtils.getName("/abc/a.exe") = "a.exe"
		 * xeno.common.util.FileUtils.getName("/abc/a.") = "a."
		 * xeno.common.util.FileUtils.getName("/abc/a") = "a"
		 * xeno.common.util.FileUtils.getName("c:\abc.gif\a.png") = "a.png"
		 * 
		 * @param file
		 * 			The file path to be handled.
		 * 
		 * @return
		 * 			The String.
		 * 
		 * @throws
		 * 			The Error will be thrown when the "file" is missing.<br/>
		 * 			Or it will be thrown when the "file" is not null or not a String.
		 * 
		 * @since
		 * 			1.0.0
		 */
		getName: function(file) {
			xeno.common.lang.Data.ensures(arguments.length > 0, "The 'file' is required, index: 0");
			xeno.common.lang.Data.ensures(xeno.common.lang.Data.isString(file, true), "The 'file' is not null or not a String");

			return _getName(file);
		},

		/**
		 * @description
		 * <p>
		 * Returns the extension name of the "file", or returns null if there is no extension.
		 * </p>
		 * <p>
		 * This function handles both absolute and relative file paths.
		 * </p>
		 * 
		 * @example
		 * <b>Examples</b>
		 * 
		 * xeno.common.util.FileUtils.getExtName(null) = null
		 * xeno.common.util.FileUtils.getExtName("") = null
		 * xeno.common.util.FileUtils.getExtName("a.gif") = "gif"
		 * xeno.common.util.FileUtils.getExtName("/abc/a.exe") = "exe"
		 * xeno.common.util.FileUtils.getExtName("/abc/a.") = ""
		 * xeno.common.util.FileUtils.getExtName("/abc/a") = null
		 * xeno.common.util.FileUtils.getExtName("c:\abc.gif\a.png") = "png"
		 * 
		 * @param file
		 * 			The file path to be handled.
		 * 
		 * @return
		 * 			The String.
		 * 
		 * @throws
		 * 			The Error will be thrown when the "file" is missing.<br/>
		 * 			Or it will be thrown when the "file" is not null or not a String.
		 * 
		 * @since
		 * 			1.0.0
		 */
		getExtName: function(file) {
			xeno.common.lang.Data.ensures(arguments.length > 0, "The 'file' is required, index: 0");
			xeno.common.lang.Data.ensures(xeno.common.lang.Data.isString(file, true), "The 'file' is not null or not a String");

			return _getExtName(file);
		}

	};

})();
/**
 * @class
 * <p>
 * This class contains some utilities designed to provide a convenience for handling the Number related operations.
 * </p>
 * 
 * @description
 * <p>
 * The class constructor.
 * </p>
 * 
 * @since
 * 			1.0.0
 */
xeno.common.util.NumberUtils = (function () {
	var _regex = new RegExp("^#*0*(\\.0*#*)?$");

	var _safeToExecute = function(data, nullReturnVal, func) {
		return xeno.common.lang.Data.isNull(data) ? nullReturnVal : func();
	};

	var _getIntegerOrDecimal = function(num, ignore, flag) {
		var abs = Math.abs(num);
		var val = null;

		if(_isFloat(abs)) {
			var str = abs.toString();
			var pos = str.indexOf(".");

			val = flag ? str.substring(0, pos) : "0." + str.substring(pos + 1);

		} else {
			val = flag ? abs.toString() : "0";
		}

		if(num >= 0 || ignore) {
			return flag ? parseInt(val) : parseFloat(val);

		} else {
			return 0 - (flag ? parseInt(val) : parseFloat(val));
		}
	};

	var _convertToPatternObject = function(pattern) {
		var parts = pattern.split(".");
		var integer = parts[0];
		var decimal = parts[1];

		return {
			integer: integer.length === 0 ? "" : integer,
			decimal: xeno.common.lang.Data.isUndefined(decimal) || decimal.length === 0 ? "" : decimal
		};
	};

	var _convertToNumericObject = function(numeric) {
		var negetive = numeric.indexOf("-") === 0;
		var original = negetive ? numeric.substring(1) : numeric;
		var data = _convertToPatternObject(original);

		return {
			negetive: negetive,
			integer: data.integer,
			decimal: data.decimal
		};
	};

	var _formatNumber = function(numeric, pattern) {
		var signMarker = numeric.negetive ? "-" : "";
		var integerStr = _formatInteger(numeric.integer, pattern.integer);
		var decimalStr = _formatDecimal(numeric.decimal, pattern.decimal);

		return signMarker + integerStr + decimalStr;
	};

	var _formatInteger = function(integer, pattern) {
		var numericPrefix = "";
		var patternPrefix = "";

		if(integer.length < pattern.length) {

			for(var i = 0; i < pattern.length - integer.length; i += 1) {
				numericPrefix += "0";
			}

		} else if(integer.length > pattern.length) {

			for(var i = 0; i < integer.length - pattern.length; i += 1) {
				patternPrefix += "0";
			}
		}

		var result = _formatDigit(numericPrefix + integer, patternPrefix + pattern);

		return result.length === 0 ? "0" : result;
	};

	var _formatDecimal = function(decimal, pattern) {

		if(pattern.length === 0) {
			return "";
		}

		var result = _formatDigit(decimal, pattern);

		return result.length === 0 ? "" : "." + result;
	};

	var _formatDigit = function(numeric, pattern) {
		var bits = numeric.split("");

		for(var i = 0; i < pattern.length; i += 1) {
			var mark = pattern.charAt(i);
			var value = parseInt(bits[i]);

			if(mark === "#" && value === 0) {
				bits[i] = "";
			}
		}

		var ret = "";

		for(var i = 0; i < bits.length; i += 1) {
			ret += bits[i];
		}

		return ret;
	};

	var _insertSeparator = function(str) {
		var data = _convertToNumericObject(str);

		var signMarker = data.negetive ? "-" : "";
		var integerStr = _insertSeparatorInternal(data.integer);
		var decimalStr = data.decimal.length === 0 ? "" : "." + data.decimal;

		return signMarker + integerStr + decimalStr;
	};

	var _insertSeparatorInternal = function(input) {
		var temp = [];
		var seed = xeno.common.util.StringUtils.reverse(input);
		var loop = Math.ceil(seed.length / 3);

		for(var i = 0; i < loop; i += 1) {
			var begin = 3 * i;
			var end = 3 * (i + 1);
			var item = seed.substring(begin, end);

			temp.push(item);
		}

		var raw = "";

		for(var i = 0; i < temp.length; i += 1) {
			var part = temp[i];

			raw += part.length === 3 ? part + "," : part;
		}

		var ret = xeno.common.util.StringUtils.reverse(raw);

		if(xeno.common.util.StringUtils.beginsWith(ret, ",")) {
			return ret.substring(1);

		} else {
			return ret;
		}
	};

	// ------------------------------
	// Private Function Definitions
	// ------------------------------

	var _isInt = function(num) {

		return _safeToExecute(num, false, function() {
			return num.toString().indexOf(".") < 0;
		});
	};

	var _isFloat = function(num) {

		return _safeToExecute(num, false, function() {
			return num.toString().indexOf(".") >= 0;
		});
	};

	var _getInteger = function(num, ignoreSign) {

		return _safeToExecute(num, null, function() {
			return _getIntegerOrDecimal(num, ignoreSign, true);
		});
	};

	var _getDecimal = function(num, ignoreSign) {

		return _safeToExecute(num, null, function() {
			return _getIntegerOrDecimal(num, ignoreSign, false);
		});
	};

	var _format = function(num, pattern, useThousandSeparator) {

		return _safeToExecute(num, null, function() {
			var po = _convertToPatternObject(pattern);
			var ns = num.toFixed(po.decimal.length);
			var no = _convertToNumericObject(ns);

			var result = _formatNumber(no, po);

			if(useThousandSeparator) {
				return _insertSeparator(result);
			}

			return result;
		});
	};

	return {

		/**
		 * @description
		 * <p>
		 * Tests whether the "num" is an integer or not.
		 * </p>
		 * <p>
		 * To test whether the "num" is a Number or not, please see "xeno.common.lang.Data.isNumber(data, ignoreNull)".
		 * </p>
		 * 
		 * @example
		 * <b>Examples</b>
		 * 
		 * xeno.common.util.NumberUtils.isInt(null) = false
		 * xeno.common.util.NumberUtils.isInt(0) = true
		 * xeno.common.util.NumberUtils.isInt(1.0) = true
		 * xeno.common.util.NumberUtils.isInt(0.01) = false
		 * xeno.common.util.NumberUtils.isInt(1.234E4) = true
		 * xeno.common.util.NumberUtils.isInt(1.234E2) = false
		 * 
		 * @param num
		 * 			The Number to be tested.
		 * 
		 * @return
		 * 			The Boolean.
		 * 
		 * @throws
		 * 			The Error will be thrown when the "num" is missing.<br/>
		 * 			Or it will be thrown when the "num" is not null or not a Number.
		 * 
		 * @since
		 * 			1.0.0
		 */
		isInt: function(num) {
			xeno.common.lang.Data.ensures(arguments.length > 0, "The 'num' is required, index: 0");
			xeno.common.lang.Data.ensures(xeno.common.lang.Data.isNumber(num, true), "The 'num' is not null or not a Number");

			return _isInt(num);
		},

		/**
		 * @description
		 * <p>
		 * Tests whether the "num" is a float or not.
		 * </p>
		 * <p>
		 * To test whether the "num" is a Number or not, please see "xeno.common.lang.Data.isNumber(data, ignoreNull)".
		 * </p>
		 * 
		 * @example
		 * <b>Examples</b>
		 * 
		 * xeno.common.util.NumberUtils.isFloat(null) = false
		 * xeno.common.util.NumberUtils.isFloat(0) = false
		 * xeno.common.util.NumberUtils.isFloat(1.0) = false
		 * xeno.common.util.NumberUtils.isFloat(0.01) = true
		 * xeno.common.util.NumberUtils.isFloat(1.234E4) = false
		 * xeno.common.util.NumberUtils.isFloat(1.234E2) = true
		 * 
		 * @param num
		 * 			The Number to be tested.
		 * 
		 * @return
		 * 			The Boolean.
		 * 
		 * @throws
		 * 			The Error will be thrown when the "num" is missing.<br/>
		 * 			Or it will be thrown when the "num" is not null or not a Number.
		 * 
		 * @since
		 * 			1.0.0
		 */
		isFloat: function(num) {
			xeno.common.lang.Data.ensures(arguments.length > 0, "The 'num' is required, index: 0");
			xeno.common.lang.Data.ensures(xeno.common.lang.Data.isNumber(num, true), "The 'num' is not null or not a Number");

			return _isFloat(num);
		},

		/**
		 * @description
		 * <p>
		 * Returns the integer part of the "num".
		 * </p>
		 * 
		 * @example
		 * <b>Examples</b>
		 * 
		 * xeno.common.util.NumberUtils.getInteger(null) = null
		 * xeno.common.util.NumberUtils.getInteger(0) = 0
		 * xeno.common.util.NumberUtils.getInteger(1.0) = 1
		 * xeno.common.util.NumberUtils.getInteger(12.345) = 12
		 * xeno.common.util.NumberUtils.getInteger(-12.345) = -12
		 * xeno.common.util.NumberUtils.getInteger(-12.345, true) = 12
		 * xeno.common.util.NumberUtils.getInteger(-12.345, false) = -12
		 * xeno.common.util.NumberUtils.getInteger(-1.234E3) = -1234
		 * xeno.common.util.NumberUtils.getInteger(-1.234E2) = -123
		 * 
		 * @param num
		 * 			The Number to be handled.
		 * @param ignoreSign
		 * 			A flag to determine whether to get the integer part without considering the sign or not.<br/>
		 * 			The default value is: false.
		 * 
		 * @return
		 * 			The Number, integer.
		 * 
		 * @throws
		 * 			The Error will be thrown when the "num" is missing.<br/>
		 * 			Or it will be thrown when the "num" is not null or not a Number.<br/>
		 * 			Or it will be thrown when the "ignoreSign" is not a Boolean.
		 * 
		 * @since
		 * 			1.0.0
		 */
		getInteger: function(num, ignoreSign) {
			var _arguments = arguments.length;

			xeno.common.lang.Data.ensures(_arguments > 0, "The 'num' is required, index: 0");
			xeno.common.lang.Data.ensures(xeno.common.lang.Data.isNumber(num, true), "The 'num' is not null or not a Number");

			var _ignoreSign = false;

			if(_arguments > 1) {
				xeno.common.lang.Data.ensures(xeno.common.lang.Data.isBoolean(ignoreSign), "The 'ignoreSign' is not a Boolean");

				_ignoreSign = ignoreSign;
			}

			return _getInteger(num, _ignoreSign);
		},

		/**
		 * @description
		 * <p>
		 * Returns the decimal part of the "num".
		 * </p>
		 * 
		 * @example
		 * <b>Examples</b>
		 * 
		 * xeno.common.util.NumberUtils.getDecimal(null) = null
		 * xeno.common.util.NumberUtils.getDecimal(0) = 0
		 * xeno.common.util.NumberUtils.getDecimal(1.0) = 0
		 * xeno.common.util.NumberUtils.getDecimal(12.345) = 0.345
		 * xeno.common.util.NumberUtils.getDecimal(-12.345) = -0.345
		 * xeno.common.util.NumberUtils.getDecimal(-12.345, true) = 0.345
		 * xeno.common.util.NumberUtils.getDecimal(-12.345, false) = -0.345
		 * xeno.common.util.NumberUtils.getDecimal(-1.234E2) = -0.4
		 * xeno.common.util.NumberUtils.getDecimal(-1.234E3) = 0
		 * 
		 * @param num
		 * 			The Number to be handled.
		 * @param ignoreSign
		 * 			A flag to determine whether to get the decimal part without considering the sign or not.<br/>
		 * 			The default value is: false.
		 * 
		 * @return
		 * 			The Number.
		 * 
		 * @throws
		 * 			The Error will be thrown when the "num" is missing.<br/>
		 * 			Or it will be thrown when the "num" is not null or not a Number.<br/>
		 * 			Or it will be thrown when the "ignoreSign" is not a Boolean.
		 * 
		 * @since
		 * 			1.0.0
		 */
		getDecimal: function(num, ignoreSign) {
			var _arguments = arguments.length;

			xeno.common.lang.Data.ensures(_arguments > 0, "The 'num' is required, index: 0");
			xeno.common.lang.Data.ensures(xeno.common.lang.Data.isNumber(num, true), "The 'num' is not null or not a Number");

			var _ignoreSign = false;

			if(_arguments > 1) {
				xeno.common.lang.Data.ensures(xeno.common.lang.Data.isBoolean(ignoreSign), "The 'ignoreSign' is not a Boolean");

				_ignoreSign = ignoreSign;
			}

			return _getDecimal(num, _ignoreSign);
		},

		/**
		 * @description
		 * <p>
		 * Converts a Number into a readable format by the pattern provides.
		 * </p>
		 * <p>
		 * The "num" could be rounded to the specified number of decimal places by the "pattern" provides, the "Number.toFixed(n)" action will be processed.
		 * </p>
		 * 
		 * @example
		 * <b>Examples</b>
		 * 
		 * xeno.common.util.NumberUtils.format(null, *, *) = null
		 * xeno.common.util.NumberUtils.format(1000.2, "00000.##", true) = "01,000.2"
		 * xeno.common.util.NumberUtils.format(1.235, "00.00") = "01.24"
		 * 
		 * @example
		 * <b>Patterns</b>
		 * 
		 * 0: digit
		 * #: digit, zero shows as absent
		 * .: decimal separator, should appear only once and not start or end with
		 * 
		 * @param num
		 * 			The Number to be formatted.
		 * @param pattern
		 * 			The pattern to be used.
		 * @param useThousandSeparator
		 * 			A flag to determine whether to add the thousand separator in the final result.<br/>
		 * 			The default value is: false.
		 * 
		 * @return
		 * 			The String.
		 * 
		 * @throws
		 * 			The Error will be thrown when the "num" or the "pattern" is missing.<br/>
		 * 			Or it will be thrown when the "num" is not null or not a Number.<br/>
		 * 			Or it will be thrown when the "pattern" is not a String.<br/>
		 * 			Or it will be thrown when the "useThousandSeparator" is not a Boolean.<br/>
		 * 			Or it will be thrown when the "pattern" is invalid.
		 * 
		 * @since
		 * 			1.0.0
		 */
		format: function(num, pattern, useThousandSeparator) {
			var _arguments = arguments.length;

			xeno.common.lang.Data.ensures(_arguments > 0, "The 'num' is required, index: 0");
			xeno.common.lang.Data.ensures(_arguments > 1, "The 'pattern' is required, index: 1");
			xeno.common.lang.Data.ensures(xeno.common.lang.Data.isNumber(num, true), "The 'num' is not null or not a Number");
			xeno.common.lang.Data.ensures(xeno.common.lang.Data.isString(pattern), "The 'pattern' is not a String");

			var _useThousandSeparator = false;

			if(_arguments > 2) {
				xeno.common.lang.Data.ensures(xeno.common.lang.Data.isBoolean(useThousandSeparator), "The 'useThousandSeparator' is not a Boolean");

				_useThousandSeparator = useThousandSeparator;
			}

			xeno.common.lang.Data.ensures(_regex.test(pattern) && !xeno.common.util.StringUtils.beginsWith(pattern, ".") && !xeno.common.util.StringUtils.endsWith(pattern, "."), "Invalid number pattern: " + pattern);

			return _format(num, pattern, _useThousandSeparator);
		}

	};

})();
/**
 * @class
 * <p>
 * This class contains some utilities designed to provide a convenience for handling the Object related operations.
 * </p>
 * 
 * @description
 * <p>
 * The class constructor.
 * </p>
 * 
 * @since
 * 			1.1.0
 */
xeno.common.util.ObjectUtils = (function () {

	// ------------------------------
	// Private Function Definitions
	// ------------------------------

	var _hasProperty = function(obj, name) {
		var target = obj[name];

		return !xeno.common.lang.Data.isUndefined(target) && !xeno.common.lang.Data.isFunction(target);
	};

	var _hasFunction = function(obj, name) {
		return xeno.common.lang.Data.isFunction(obj[name]);
	};

	return {

		/**
		 * @description
		 * <p>
		 * Tests whether the "obj" has the named property or not.
		 * </p>
		 * 
		 * @example
		 * <b>Examples</b>
		 * 
		 * Assume the "obj" is: { id: 1, name: null, func: function(a, b) {} }
		 * 
		 * xeno.common.util.ObjectUtils.hasProperty(obj, "id") = true
		 * xeno.common.util.ObjectUtils.hasProperty(obj, "name") = true
		 * xeno.common.util.ObjectUtils.hasProperty(obj, "age") = false
		 * xeno.common.util.ObjectUtils.hasProperty(obj, "func") = false
		 * 
		 * @param obj
		 * 			The Object to be tested.
		 * @param name
		 * 			The property name.
		 * 
		 * @return
		 * 			The Boolean.
		 * 
		 * @throws
		 * 			The Error will be thrown when the "obj" or the "name" is missing.<br/>
		 * 			Or it will be thrown when the "obj" is undefined or null.<br/>
		 * 			Or it will be thrown when the "name" is not a String.<br/>
		 * 			Or it will be thrown when the "name" is a blank String.
		 * 
		 * @since
		 * 			1.1.0
		 */
		hasProperty: function(obj, name) {
			var _arguments = arguments.length;

			xeno.common.lang.Data.ensures(_arguments > 0, "The 'obj' is required, index: 0");
			xeno.common.lang.Data.ensures(_arguments > 1, "The 'name' is required, index: 1");
			xeno.common.lang.Data.ensures(!xeno.common.lang.Data.isUndefinedOrNull(obj), "The 'obj' is undefined or null");
			xeno.common.lang.Data.ensures(xeno.common.lang.Data.isString(name), "The 'name' is not a String");
			xeno.common.lang.Data.ensures(!xeno.common.util.StringUtils.isBlank(name), "The 'name' is a blank String");

			return _hasProperty(obj, name);
		},

		/**
		 * @description
		 * <p>
		 * Tests whether the "obj" has the named function or not.
		 * </p>
		 * 
		 * @example
		 * <b>Examples</b>
		 * 
		 * Assume the "obj" is: { id: 1, name: null, func: function(a, b) {} }
		 * 
		 * xeno.common.util.ObjectUtils.hasFunction(obj, "id") = false
		 * xeno.common.util.ObjectUtils.hasFunction(obj, "name") = false
		 * xeno.common.util.ObjectUtils.hasFunction(obj, "age") = false
		 * xeno.common.util.ObjectUtils.hasFunction(obj, "func") = true
		 * 
		 * @param obj
		 * 			The Object to be tested.
		 * @param name
		 * 			The function name.
		 * 
		 * @return
		 * 			The Boolean.
		 * 
		 * @throws
		 * 			The Error will be thrown when the "obj" or the "name" is missing.<br/>
		 * 			Or it will be thrown when the "obj" is undefined or null.<br/>
		 * 			Or it will be thrown when the "name" is not a String.<br/>
		 * 			Or it will be thrown when the "name" is a blank String.
		 * 
		 * @since
		 * 			1.1.0
		 */
		hasFunction: function(obj, name) {
			var _arguments = arguments.length;

			xeno.common.lang.Data.ensures(_arguments > 0, "The 'obj' is required, index: 0");
			xeno.common.lang.Data.ensures(_arguments > 1, "The 'name' is required, index: 1");
			xeno.common.lang.Data.ensures(!xeno.common.lang.Data.isUndefinedOrNull(obj), "The 'obj' is undefined or null");
			xeno.common.lang.Data.ensures(xeno.common.lang.Data.isString(name), "The 'name' is not a String");
			xeno.common.lang.Data.ensures(!xeno.common.util.StringUtils.isBlank(name), "The 'name' is a blank String");

			return _hasFunction(obj, name);
		}

	};

})();
/**
 * @class
 * <p>
 * This class contains some utilities designed to provide a convenience for handling the random related operations.
 * </p>
 * 
 * @description
 * <p>
 * The class constructor.
 * </p>
 * 
 * @since
 * 			1.0.0
 */
xeno.common.util.RandomUtils = (function () {

	// ------------------------------
	// Private Function Definitions
	// ------------------------------

	var _generateInt = function(min, max) {
		var _min = Math.floor(min);
		var _max = Math.floor(max);

		return Math.floor(Math.random() * (_max - _min + 1)) + _min;
	};

	var _generateBoolean = function() {
		return _generateInt(0, 1) === 0;
	};

	var _generateString = function(length, candidate) {
		var len = Math.floor(length);
		var ret = "";

		for(var i = 0; i < len; i += 1) {
			var index = _generateInt(0, candidate.length - 1);

			ret += candidate.charAt(index);
		}

		return ret;
	};

	var _randomizeItems = function(arr) {

		if(xeno.common.lang.Data.isNull(arr)) {
			return null;
		}

		var ret = [];
		var tmp = arr.concat();

		for(var i = 0; i < tmp.length; i += 1) {
			var index = _generateInt(0, tmp.length - 1);
			ret.push(tmp[index]);
			tmp.splice(index, 1);

			i -= 1;
		}

		return ret;
	};

	return {

		/**
		 * @description
		 * <p>
		 * Generates and returns an integer Number between (inclusive) the "min" and "max" in randomly.
		 * </p>
		 * <p>
		 * The "min" or the "max" maybe a float value, the "Math.floor(n)" action will be processed first to convert it into an integer Number.
		 * </p>
		 * 
		 * @param min
		 * 			The minimum value.
		 * @param max
		 * 			The maximum value.
		 * 
		 * @return
		 * 			The Number, integer.
		 * 
		 * @throws
		 * 			The Error will be thrown when the "min" or the "max" is missing.<br/>
		 * 			Or it will be thrown when the "min" or the "max" is not a Number.<br/>
		 * 			Or it will be thrown when the "min" is greater than the "max".
		 * 
		 * @since
		 * 			1.0.0
		 */
		generateInt: function(min, max) {
			var _arguments = arguments.length;

			xeno.common.lang.Data.ensures(_arguments > 0, "The 'min' is required, index: 0");
			xeno.common.lang.Data.ensures(_arguments > 1, "The 'max' is required, index: 1");
			xeno.common.lang.Data.ensures(xeno.common.lang.Data.isNumber(min), "The 'min' is not a Number");
			xeno.common.lang.Data.ensures(xeno.common.lang.Data.isNumber(max), "The 'max' is not a Number");
			xeno.common.lang.Data.ensures(min <= max, "The 'min' is greater than the 'max'");

			return _generateInt(min, max);
		},

		/**
		 * @description
		 * <p>
		 * Generates and returns a Boolean in randomly.
		 * </p>
		 * 
		 * @return
		 * 			The Boolean.
		 * 
		 * @since
		 * 			1.0.0
		 */
		generateBoolean: function() {
			return _generateBoolean();
		},

		/**
		 * @description
		 * <p>
		 * Generates and returns a String in randomly, you could pass the "candidate" to generate your random String.
		 * </p>
		 * <p>
		 * The "length" maybe a float value, the "Math.floor(n)" action will be processed first to convert it into an integer Number.
		 * </p>
		 * 
		 * @param length
		 * 			The length of the String to generate.
		 * @param candidate
		 * 			The candidate to use.<br/>
		 * 			The default value is: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ".
		 * 
		 * @return
		 * 			The String.
		 * 
		 * @throws
		 * 			The Error will be thrown when the "length" is missing.<br/>
		 * 			Or it will be thrown when the "length" is not a Number.<br/>
		 * 			Or it will be thrown when the "candidate" is not a String.<br/>
		 * 			Or it will be thrown when the "length" is negative.<br/>
		 * 			Or it will be thrown when the "candidate" is an empty String.
		 * 
		 * @since
		 * 			1.0.0
		 */
		generateString: function(length, candidate) {
			var _arguments = arguments.length;

			xeno.common.lang.Data.ensures(_arguments > 0, "The 'length' is required, index: 0");
			xeno.common.lang.Data.ensures(xeno.common.lang.Data.isNumber(length), "The 'length' is not a Number");

			var _candidate = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

			if(_arguments > 1) {
				xeno.common.lang.Data.ensures(xeno.common.lang.Data.isString(candidate), "The 'candidate' is not a String");

				_candidate = candidate;
			}

			xeno.common.lang.Data.ensures(length >= 0, "The 'length' is negative");
			xeno.common.lang.Data.ensures(_candidate.length > 0, "The 'candidate' is an empty String");

			return _generateString(length, _candidate);
		},

		/**
		 * @description
		 * <p>
		 * Randomizes each item in the Array and returns a new Array instance.
		 * </p>
		 * <p>
		 * The original Array will not be edited, but if data in the "arr" has a deep reference, this relationship will also bring to the copied Array as well.
		 * </p>
		 * 
		 * @param arr
		 * 			The Array to be handled.
		 * 
		 * @return
		 * 			The Array.
		 * 
		 * @throws
		 * 			The Error will be thrown when the "arr" is missing.<br/>
		 * 			Or it will be thrown when the "arr" is not null or not an Array.
		 * 
		 * @since
		 * 			1.0.0
		 */
		randomizeItems: function(arr) {
			xeno.common.lang.Data.ensures(arguments.length > 0, "The 'arr' is required, index: 0");
			xeno.common.lang.Data.ensures(xeno.common.lang.Data.isArray(arr, true), "The 'arr' is not null or not an Array");

			return _randomizeItems(arr);
		}

	};

})();
/**
 * @class
 * <p>
 * This class contains some utilities designed to provide a convenience for handling the String related operations.
 * </p>
 * <p>
 * We have defined some certain words related to the String handling:
 * 	<ul>
 * 		<li>undefined: undefined</li>
 * 		<li>null: null</li>
 * 		<li>empty: undefined, null, or a zero-length String ("")</li>
 * 		<li>blank: undefined, null, empty, or a String is only contains whitespace characters</li>
 * 	</ul>
 * </p>
 * <p>
 * When you use this class for some certain functions which have return values, a new String instance will be created and returns, so the original String passes in will not be edited.
 * </p>
 * <p>
 * This class tries to handle null input gracefully, and each function documents its behaviour.
 * </p>
 * 
 * @description
 * <p>
 * The class constructor.
 * </p>
 * 
 * @since
 * 			1.0.0
 */
xeno.common.util.StringUtils = (function () {

	var _safeToExecute = function(data, nullReturnVal, func) {
		return xeno.common.lang.Data.isNull(data) ? nullReturnVal : func();
	};

	var _toUpperOrLowerCase = function(str, flag) {

		if(_isEmpty(str)) {
			return str;
		}

		return flag ? str.toUpperCase() : str.toLowerCase();
	};

	var _indexOf = function(str, search, flag) {

		if(_isEmpty(str) || _isEmpty(search)) {
			return -1;
		}

		return flag ? str.indexOf(search) : str.lastIndexOf(search);
	};

	var _isEquals = function(left, right, flag) {

		if(xeno.common.lang.Data.isNull(left) && xeno.common.lang.Data.isNull(right)) {
			return true;

		} else if(xeno.common.lang.Data.isNull(left) || xeno.common.lang.Data.isNull(right)) {
			return false;
		}

		return flag ? left === right : left.toLowerCase() === right.toLowerCase();
	};

	var _toCapitalizeOrUncapitalize = function(str, flag) {

		if(_isEmpty(str)) {
			return str;
		}

		var first = flag ? str.charAt(0).toUpperCase() : str.charAt(0).toLowerCase();

		return first + str.substring(1);
	};

	var _isBeginsOrEndsWith = function(str, search, flag) {

		if(xeno.common.lang.Data.isNull(str) && xeno.common.lang.Data.isNull(search)) {
			return true;

		} else if(xeno.common.lang.Data.isNull(str) || xeno.common.lang.Data.isNull(search)) {
			return false;
		}

		if(search.length === 0) {
			return true;
		}

		if(flag) {
			return str.indexOf(search) === 0;

		} else {
			var index = str.lastIndexOf(search);

			return index < 0 ? false : search === str.substring(index);
		}
	};

	// ------------------------------
	// Private Function Definitions
	// ------------------------------

	var _toUpperCase = function(str) {
		return _toUpperOrLowerCase(str, true);
	};

	var _toLowerCase = function(str) {
		return _toUpperOrLowerCase(str, false);
	};

	var _isEmpty = function(str) {

		return _safeToExecute(str, true, function() {
			return str.length === 0;
		});
	};

	var _isNotEmpty = function(str) {
		return !_isEmpty(str);
	};

	var _isBlank = function(str) {

		return _safeToExecute(str, true, function() {
			return _trim(str).length === 0;
		});
	};

	var _isNotBlank = function(str) {
		return !_isBlank(str);
	};

	var _isWhitespace = function(str) {

		return _safeToExecute(str, false, function() {
			return _trim(str).length === 0;
		});
	};

	var _isNotWhitespace = function(str) {
		return !_isWhitespace(str);
	};

	var _charAt = function(str, index) {

		return _safeToExecute(str, null, function() {
			var _index = Math.floor(index);

			if(_index >= str.length) {
				return null;
			}

			return str.charAt(_index);
		});
	};

	var _substring = function(str, begin, end) {

		return _safeToExecute(str, null, function() {
			var _begin = Math.floor(begin);
			var _end = Math.floor(end);

			if(_begin >= str.length) {
				return null;
			}

			return str.substring(_begin, _end);
		});
	};

	var _firstIndexOf = function(str, search) {
		return _indexOf(str, search, true);
	};

	var _lastIndexOf = function(str, search) {
		return _indexOf(str, search, false);
	};

	var _contains = function(str, search) {

		if(xeno.common.lang.Data.isNull(str) && xeno.common.lang.Data.isNull(search)) {
			return true;

		} else if(xeno.common.lang.Data.isNull(str) || xeno.common.lang.Data.isNull(search)) {
			return false;
		}

		return _firstIndexOf(str, search) >= 0 || search.length === 0;
	};

	var _equals = function(left, right) {
		return _isEquals(left, right, true);
	};

	var _equalsIgnoreCase = function(left, right) {
		return _isEquals(left, right, false);
	};

	var _trim = function(str) {
		return _isEmpty(str) ? str : str.replace(/(^\s*)|(\s*$)/g, "");
	};

	var _trimToNull = function(str) {
		var result = _trim(str);

		return _isEmpty(result) ? null : result;
	};

	var _trimToEmpty = function(str) {
		var result = _trim(str);

		return _isEmpty(result) ? "" : result;
	};

	var _capitalize = function(str) {
		return _toCapitalizeOrUncapitalize(str, true);
	};

	var _uncapitalize = function(str) {
		return _toCapitalizeOrUncapitalize(str, false);
	};

	var _beginsWith = function(str, search) {
		return _isBeginsOrEndsWith(str, search, true);
	};

	var _endsWith = function(str, search) {
		return _isBeginsOrEndsWith(str, search, false);
	};

	var _split = function(str, separator) {

		return _safeToExecute(str, [], function() {
			return xeno.common.lang.Data.isNull(separator) ? [str] : str.split(separator);
		});
	};

	var _reverse = function(str) {

		return _safeToExecute(str, null, function() {
			var ret = "";

			for(var i = str.length; i > 0; i -= 1) {
				ret += str.charAt(i - 1);
			}

			return ret;
		});
	};

	var _replace = function(str, search, replace) {

		if(xeno.common.lang.Data.isNull(str) && xeno.common.lang.Data.isNull(search)) {
			return replace;

		} else if(xeno.common.lang.Data.isNull(str) || xeno.common.lang.Data.isNull(search)) {
			return str;
		}

		// Could not use the regex to replace all search String, because the "search" String may contains some regex reserved characters.
		// For an example: xeno.common.util.StringUtils.replace("m{0}ya", "{0}", "a") will cause error, becuase "{" is a regex reserved character.
		// To ensure this function to work correct, you must input: xeno.common.util.StringUtils.replace("m{0}ya", "\\{0\\}", "a"), but this is not what we want.
		// return str.replace(new RegExp(search, "gm"), replace);

		var found = false;
		var sLen = str.length;
		var rLen = search.length;
		var ret = "";

		for(var i = 0; i < sLen; i += 1) {

			if(str.charAt(i) === search.charAt(0)) {
				found = true;

				for(var j = 0; j < rLen; j += 1) {

					if(!(str.charAt(i + j) === search.charAt(j))) {
						found = false;

						break;
					}
				}

				if(found) {
					ret += "" + replace;

					i = i + rLen - 1;

					continue;
				}
			}

			ret += str.charAt(i);
		}

		return ret;
	};

	var _remove = function(str, search) {
		return _replace(str, search, "");
	};

	var _length = function(str, calActual) {

		return _safeToExecute(str, 0, function() {

			if(calActual) {
				var count = 0;

				for(var i = 0; i < str.length; i += 1) {
					var ascii = str.charCodeAt(i);

					if(ascii > 255) {
						count += 2;

					} else {
						count += 1;
					}
				}

				return count;
			}

			return str.length;
		});
	};

	var _abbreviate = function(str, lengthToKeep, calActual) {

		return _safeToExecute(str, null, function() {
			var len = Math.floor(lengthToKeep);
			var sLen = _length(str, calActual);
			var rLen = len < 3 ? 3 : len;

			if (sLen <= rLen) {
				return str;
			}

			var ret = "";

			for (var i = 0; i < str.length; i += 1) {
				var current = str.substring(0, i) + "...";

				if (_length(current, calActual) > rLen) {
					break;

				} else {
					ret = current;
				}
			}

			return ret;
		});
	};

	var _format = function(str, replaces) {

		return _safeToExecute(str, null, function() {
			var ret = str;

			for(var i = 0; i < replaces.length; i += 1) {
				var replace = replaces[i];

				ret = _replace(ret, "{" + i + "}", replace);
			}

			return ret;
		});
	};

	// ------------------------------
	// Public Function Definitions
	// ------------------------------

	return {

		/**
		 * @description
		 * <p>
		 * Converts all characters in the "str" into upper case and returns a new String instance.
		 * </p>
		 * 
		 * @example
		 * <b>Examples</b>
		 * 
		 * xeno.common.util.StringUtils.toUpperCase(null) = null
		 * xeno.common.util.StringUtils.toUpperCase("a") = "A"
		 * xeno.common.util.StringUtils.toUpperCase("abc") = "ABC"
		 * xeno.common.util.StringUtils.toUpperCase("aBc") = "ABC"
		 * 
		 * @param str
		 * 			The String to be handled.
		 * 
		 * @return
		 * 			The String.
		 * 
		 * @throws
		 * 			The Error will be thrown when the "str" is missing.<br/>
		 * 			Or it will be thrown when the "str" is not null or not a String.
		 * 
		 * @since
		 * 			1.0.0
		 */
		toUpperCase: function(str) {
			xeno.common.lang.Data.ensures(arguments.length > 0, "The 'str' is required, index: 0");
			xeno.common.lang.Data.ensures(xeno.common.lang.Data.isString(str, true), "The 'str' is not null or not a String");

			return _toUpperCase(str);
		},

		/**
		 * @description
		 * <p>
		 * Converts all characters in the "str" into lower case and returns a new String instance.
		 * </p>
		 * 
		 * @example
		 * <b>Examples</b>
		 * 
		 * xeno.common.util.StringUtils.toLowerCase(null) = null
		 * xeno.common.util.StringUtils.toLowerCase("A") = "a"
		 * xeno.common.util.StringUtils.toLowerCase("ABC") = "abc"
		 * xeno.common.util.StringUtils.toLowerCase("aBc") = "abc"
		 * 
		 * @param str
		 * 			The String to be handled.
		 * 
		 * @return
		 * 			The String.
		 * 
		 * @throws
		 * 			The Error will be thrown when the "str" is missing.<br/>
		 * 			Or it will be thrown when the "str" is not null or not a String.
		 * 
		 * @since
		 * 			1.0.0
		 */
		toLowerCase: function(str) {
			xeno.common.lang.Data.ensures(arguments.length > 0, "The 'str' is required, index: 0");
			xeno.common.lang.Data.ensures(xeno.common.lang.Data.isString(str, true), "The 'str' is not null or not a String");

			return _toLowerCase(str);
		},

		/**
		 * @description
		 * <p>
		 * Checks whether the "str" is empty or not.
		 * </p>
		 * 
		 * @example
		 * <b>Examples</b>
		 * 
		 * xeno.common.util.StringUtils.isEmpty(null) = true
		 * xeno.common.util.StringUtils.isEmpty("") = true
		 * xeno.common.util.StringUtils.isEmpty(" ") = false
		 * xeno.common.util.StringUtils.isEmpty("aBc") = false
		 * xeno.common.util.StringUtils.isEmpty("\n") = false
		 * xeno.common.util.StringUtils.isEmpty("\n\n") = false
		 * xeno.common.util.StringUtils.isEmpty("\na\n") = false
		 * 
		 * @param str
		 * 			The String to be checked.
		 * 
		 * @return
		 * 			The Boolean.
		 * 
		 * @throws
		 * 			The Error will be thrown when the "str" is missing.<br/>
		 * 			Or it will be thrown when the "str" is not null or not a String.
		 * 
		 * @since
		 * 			1.0.0
		 */
		isEmpty: function(str) {
			xeno.common.lang.Data.ensures(arguments.length > 0, "The 'str' is required, index: 0");
			xeno.common.lang.Data.ensures(xeno.common.lang.Data.isString(str, true), "The 'str' is not null or not a String");

			return _isEmpty(str);
		},

		/**
		 * @description
		 * <p>
		 * Checks whether the "str" is not empty or not.
		 * </p>
		 * 
		 * @example
		 * <b>Examples</b>
		 * 
		 * xeno.common.util.StringUtils.isNotEmpty(null) = false
		 * xeno.common.util.StringUtils.isNotEmpty("") = false
		 * xeno.common.util.StringUtils.isNotEmpty(" ") = true
		 * xeno.common.util.StringUtils.isNotEmpty("aBc") = true
		 * xeno.common.util.StringUtils.isNotEmpty("\n") = true
		 * xeno.common.util.StringUtils.isNotEmpty("\n\n") = true
		 * xeno.common.util.StringUtils.isNotEmpty("\na\n") = true
		 * 
		 * @param str
		 * 			The String to be checked.
		 * 
		 * @return
		 * 			The Boolean.
		 * 
		 * @throws
		 * 			The Error will be thrown when the "str" is missing.<br/>
		 * 			Or it will be thrown when the "str" is not null or not a String.
		 * 
		 * @since
		 * 			1.2.0
		 */
		isNotEmpty: function(str) {
			xeno.common.lang.Data.ensures(arguments.length > 0, "The 'str' is required, index: 0");
			xeno.common.lang.Data.ensures(xeno.common.lang.Data.isString(str, true), "The 'str' is not null or not a String");

			return _isNotEmpty(str);
		},

		/**
		 * @description
		 * <p>
		 * Checks whether the "str" is blank or not.
		 * </p>
		 * 
		 * @example
		 * <b>Examples</b>
		 * 
		 * xeno.common.util.StringUtils.isBlank(null) = true
		 * xeno.common.util.StringUtils.isBlank("") = true
		 * xeno.common.util.StringUtils.isBlank(" ") = true
		 * xeno.common.util.StringUtils.isBlank("aBc") = false
		 * xeno.common.util.StringUtils.isBlank("\n") = true
		 * xeno.common.util.StringUtils.isBlank("\n\n") = true
		 * xeno.common.util.StringUtils.isBlank("\na\n") = false
		 * 
		 * @param str
		 * 			The String to be checked.
		 * 
		 * @return
		 * 			The Boolean.
		 * 
		 * @throws
		 * 			The Error will be thrown when the "str" is missing.<br/>
		 * 			Or it will be thrown when the "str" is not null or not a String.
		 * 
		 * @since
		 * 			1.0.0
		 */
		isBlank: function(str) {
			xeno.common.lang.Data.ensures(arguments.length > 0, "The 'str' is required, index: 0");
			xeno.common.lang.Data.ensures(xeno.common.lang.Data.isString(str, true), "The 'str' is not null or not a String");

			return _isBlank(str);
		},

		/**
		 * @description
		 * <p>
		 * Checks whether the "str" is not blank or not.
		 * </p>
		 * 
		 * @example
		 * <b>Examples</b>
		 * 
		 * xeno.common.util.StringUtils.isNotBlank(null) = false
		 * xeno.common.util.StringUtils.isNotBlank("") = false
		 * xeno.common.util.StringUtils.isNotBlank(" ") = false
		 * xeno.common.util.StringUtils.isNotBlank("aBc") = true
		 * xeno.common.util.StringUtils.isNotBlank("\n") = false
		 * xeno.common.util.StringUtils.isNotBlank("\n\n") = false
		 * xeno.common.util.StringUtils.isNotBlank("\na\n") = true
		 * 
		 * @param str
		 * 			The String to be checked.
		 * 
		 * @return
		 * 			The Boolean.
		 * 
		 * @throws
		 * 			The Error will be thrown when the "str" is missing.<br/>
		 * 			Or it will be thrown when the "str" is not null or not a String.
		 * 
		 * @since
		 * 			1.2.0
		 */
		isNotBlank: function(str) {
			xeno.common.lang.Data.ensures(arguments.length > 0, "The 'str' is required, index: 0");
			xeno.common.lang.Data.ensures(xeno.common.lang.Data.isString(str, true), "The 'str' is not null or not a String");

			return _isNotBlank(str);
		},

		/**
		 * @description
		 * <p>
		 * Checks whether the "str" is whitespace or not.
		 * </p>
		 * 
		 * @example
		 * <b>Examples</b>
		 * 
		 * xeno.common.util.StringUtils.isWhitespace(null) = false
		 * xeno.common.util.StringUtils.isWhitespace("") = true
		 * xeno.common.util.StringUtils.isWhitespace(" ") = true
		 * xeno.common.util.StringUtils.isWhitespace("aBc") = false
		 * xeno.common.util.StringUtils.isWhitespace("\n") = true
		 * xeno.common.util.StringUtils.isWhitespace("\n\n") = true
		 * xeno.common.util.StringUtils.isWhitespace("\na\n") = false
		 * 
		 * @param str
		 * 			The String to be checked.
		 * 
		 * @return
		 * 			The Boolean.
		 * 
		 * @throws
		 * 			The Error will be thrown when the "str" is missing.<br/>
		 * 			Or it will be thrown when the "str" is not null or not a String.
		 * 
		 * @since
		 * 			1.0.0
		 */
		isWhitespace: function(str) {
			xeno.common.lang.Data.ensures(arguments.length > 0, "The 'str' is required, index: 0");
			xeno.common.lang.Data.ensures(xeno.common.lang.Data.isString(str, true), "The 'str' is not null or not a String");

			return _isWhitespace(str);
		},

		/**
		 * @description
		 * <p>
		 * Checks whether the "str" is not whitespace or not.
		 * </p>
		 * 
		 * @example
		 * <b>Examples</b>
		 * 
		 * xeno.common.util.StringUtils.isNotWhitespace(null) = true
		 * xeno.common.util.StringUtils.isNotWhitespace("") = false
		 * xeno.common.util.StringUtils.isNotWhitespace(" ") = false
		 * xeno.common.util.StringUtils.isNotWhitespace("aBc") = true
		 * xeno.common.util.StringUtils.isNotWhitespace("\n") = false
		 * xeno.common.util.StringUtils.isNotWhitespace("\n\n") = false
		 * xeno.common.util.StringUtils.isNotWhitespace("\na\n") = true
		 * 
		 * @param str
		 * 			The String to be checked.
		 * 
		 * @return
		 * 			The Boolean.
		 * 
		 * @throws
		 * 			The Error will be thrown when the "str" is missing.<br/>
		 * 			Or it will be thrown when the "str" is not null or not a String.
		 * 
		 * @since
		 * 			1.2.0
		 */
		isNotWhitespace: function(str) {
			xeno.common.lang.Data.ensures(arguments.length > 0, "The 'str' is required, index: 0");
			xeno.common.lang.Data.ensures(xeno.common.lang.Data.isString(str, true), "The 'str' is not null or not a String");

			return _isNotWhitespace(str);
		},

		/**
		 * @description
		 * <p>
		 * Returns the character in the "str" according to the "index" provides.
		 * </p>
		 * <p>
		 * The "index" maybe a float value, the "Math.floor(n)" action will be processed first to convert it into an integer Number.
		 * </p>
		 * 
		 * @example
		 * <b>Examples</b>
		 * 
		 * xeno.common.util.StringUtils.charAt(null, *) = null
		 * xeno.common.util.StringUtils.charAt("", 0) = null
		 * xeno.common.util.StringUtils.charAt("", 1) = null
		 * xeno.common.util.StringUtils.charAt("maya", 0) = "m"
		 * xeno.common.util.StringUtils.charAt("maya", 2) = "y"
		 * xeno.common.util.StringUtils.charAt("maya", 4) = null
		 * xeno.common.util.StringUtils.charAt("\nmaya", 0) = "\n"
		 * 
		 * @param str
		 * 			The String to be handled.
		 * @param index
		 * 			The index of the character in the String, starts from 0.
		 * 
		 * @return
		 * 			The String.
		 * 
		 * @throws
		 * 			The Error will be thrown when the "str" or the "index" is missing.<br/>
		 * 			Or it will be thrown when the "str" is not null or not a String.<br/>
		 * 			Or it will be thrown when the "index" is not a Number.<br/>
		 * 			Or it will be thrown when the "index" is negative.
		 * 
		 * @since
		 * 			1.0.0
		 */
		charAt: function(str, index) {
			var _arguments = arguments.length;

			xeno.common.lang.Data.ensures(_arguments > 0, "The 'str' is required, index: 0");
			xeno.common.lang.Data.ensures(_arguments > 1, "The 'index' is required, index: 1");
			xeno.common.lang.Data.ensures(xeno.common.lang.Data.isString(str, true), "The 'str' is not null or not a String");
			xeno.common.lang.Data.ensures(xeno.common.lang.Data.isNumber(index), "The 'index' is not a Number");
			xeno.common.lang.Data.ensures(index >= 0, "The 'index' is negative");

			return _charAt(str, index);
		},

		/**
		 * @description
		 * <p>
		 * Returns a sub String instance from the "str", the returned sub String starts with the character in the begin position and ends before the end position, all position counting is zero-based.
		 * </p>
		 * <p>
		 * The "begin" or the "end" maybe a float value, the "Math.floor(n)" action will be processed first to convert it into an integer Number.
		 * </p>
		 * 
		 * @example
		 * <b>Examples</b>
		 * 
		 * xeno.common.util.StringUtils.substring(null, *, *) = null
		 * xeno.common.util.StringUtils.substring("", 0) = null
		 * xeno.common.util.StringUtils.substring("", 1) = null
		 * xeno.common.util.StringUtils.substring("maya", 0) = "maya"
		 * xeno.common.util.StringUtils.substring("maya", 2) = "ya"
		 * xeno.common.util.StringUtils.substring("maya", 4) = null
		 * xeno.common.util.StringUtils.substring("maya", 0, 3) = "may"
		 * xeno.common.util.StringUtils.substring("maya", 1, 3) = "ay"
		 * xeno.common.util.StringUtils.substring("maya", 3, 3) = ""
		 * xeno.common.util.StringUtils.substring("maya", 1, 4) = "aya"
		 * xeno.common.util.StringUtils.substring("maya", 1, 5) = "aya"
		 * xeno.common.util.StringUtils.substring("\nmaya", 1, 3) = "ma"
		 * 
		 * @param str
		 * 			The String to get the sub String from.
		 * @param begin
		 * 			The position to start from.
		 * @param end
		 * 			The position to end at (exclusive).<br/>
		 * 			The default value is according to Number.MAX_VALUE.
		 * 
		 * @return
		 * 			The String.
		 * 
		 * @throws
		 * 			The Error will be thrown when the "str" or the "begin" is missing.<br/>
		 * 			Or it will be thrown when the "str" is not null or not a String.<br/>
		 * 			Or it will be thrown when the "begin" or the "end" is not a Number.<br/>
		 * 			Or it will be thrown when the "begin" or the "end" is negative.<br/>
		 * 			Or it will be thrown when the "begin" is greater than the "end".
		 * 
		 * @since
		 * 			1.0.0
		 */
		substring: function(str, begin, end) {
			var _arguments = arguments.length;

			xeno.common.lang.Data.ensures(_arguments > 0, "The 'str' is required, index: 0");
			xeno.common.lang.Data.ensures(_arguments > 1, "The 'begin' is required, index: 1");
			xeno.common.lang.Data.ensures(xeno.common.lang.Data.isString(str, true), "The 'str' is not null or not a String");
			xeno.common.lang.Data.ensures(xeno.common.lang.Data.isNumber(begin), "The 'begin' is not a Number");

			var _end = Number.MAX_VALUE;

			if(_arguments > 2) {
				xeno.common.lang.Data.ensures(xeno.common.lang.Data.isNumber(end), "The 'end' is not a Number");

				_end = end;
			}

			xeno.common.lang.Data.ensures(begin >= 0, "The 'begin' is negative");
			xeno.common.lang.Data.ensures(begin <= _end, "The 'begin' is greater than the 'end'");

			return _substring(str, begin, _end);
		},

		/**
		 * @description
		 * <p>
		 * Finds the first index within the "str", the -1 returns if there is no such String in it.
		 * </p>
		 * 
		 * @example
		 * <b>Examples</b>
		 * 
		 * xeno.common.util.StringUtils.firstIndexOf(null, *) = -1
		 * xeno.common.util.StringUtils.firstIndexOf(*, null) = -1
		 * xeno.common.util.StringUtils.firstIndexOf(*, "") = -1
		 * xeno.common.util.StringUtils.firstIndexOf("maya", "a") = 1
		 * xeno.common.util.StringUtils.firstIndexOf("mayaya", "ya") = 2
		 * xeno.common.util.StringUtils.firstIndexOf("maya", "b") = -1
		 * xeno.common.util.StringUtils.firstIndexOf("m y ", " ") = 1
		 * xeno.common.util.StringUtils.firstIndexOf("ma\nya\na", "\n") = 2
		 * xeno.common.util.StringUtils.firstIndexOf("ma\nya\na", "a\n") = 1
		 * 
		 * @param str
		 * 			The String to be handled.
		 * @param search
		 * 			The element of the String to be found.
		 * 
		 * @return
		 * 			The Number, integer.
		 * 
		 * @throws
		 * 			The Error will be thrown when the "str" or the "search" is missing.<br/>
		 * 			Or it will be thrown when the "str" or the "search" is not null or not a String.
		 * 
		 * @since
		 * 			1.0.0
		 */
		firstIndexOf: function(str, search) {
			var _arguments = arguments.length;

			xeno.common.lang.Data.ensures(_arguments > 0, "The 'str' is required, index: 0");
			xeno.common.lang.Data.ensures(_arguments > 1, "The 'search' is required, index: 1");
			xeno.common.lang.Data.ensures(xeno.common.lang.Data.isString(str, true), "The 'str' is not null or not a String");
			xeno.common.lang.Data.ensures(xeno.common.lang.Data.isString(search, true), "The 'search' is not null or not a String");

			return _firstIndexOf(str, search);
		},

		/**
		 * @description
		 * <p>
		 * Finds the last index within the "str", the -1 returns if there is no such String in it.
		 * </p>
		 * 
		 * @example
		 * <b>Examples</b>
		 * 
		 * xeno.common.util.StringUtils.lastIndexOf(null, *) = -1
		 * xeno.common.util.StringUtils.lastIndexOf(*, null) = -1
		 * xeno.common.util.StringUtils.lastIndexOf(*, "") = -1
		 * xeno.common.util.StringUtils.lastIndexOf("maya", "a") = 3
		 * xeno.common.util.StringUtils.lastIndexOf("mayaya", "ya") = 4
		 * xeno.common.util.StringUtils.lastIndexOf("maya", "b") = -1
		 * xeno.common.util.StringUtils.lastIndexOf("m y ", " ") = 3
		 * xeno.common.util.StringUtils.lastIndexOf("ma\nya\na", "\n") = 5
		 * xeno.common.util.StringUtils.lastIndexOf("ma\nya\na", "a\n") = 4
		 * 
		 * @param str
		 * 			The String to be handled.
		 * @param search
		 * 			The element of the String to be found.
		 * 
		 * @return
		 * 			The Number, integer.
		 * 
		 * @throws
		 * 			The Error will be thrown when the "str" or the "search" is missing.<br/>
		 * 			Or it will be thrown when the "str" or the "search" is not null or not a String.
		 * 
		 * @since
		 * 			1.0.0
		 */
		lastIndexOf: function(str, search) {
			var _arguments = arguments.length;

			xeno.common.lang.Data.ensures(_arguments > 0, "The 'str' is required, index: 0");
			xeno.common.lang.Data.ensures(_arguments > 1, "The 'search' is required, index: 1");
			xeno.common.lang.Data.ensures(xeno.common.lang.Data.isString(str, true), "The 'str' is not null or not a String");
			xeno.common.lang.Data.ensures(xeno.common.lang.Data.isString(search, true), "The 'search' is not null or not a String");

			return _lastIndexOf(str, search);
		},

		/**
		 * @description
		 * <p>
		 * Checks whether the "str" contains the "search" or not.
		 * </p>
		 * 
		 * @example
		 * <b>Examples</b>
		 * 
		 * xeno.common.util.StringUtils.contains(null, null) = true
		 * xeno.common.util.StringUtils.contains("", "a") = false
		 * xeno.common.util.StringUtils.contains("maya", "a") = true
		 * xeno.common.util.StringUtils.contains("maya", "ay") = true
		 * xeno.common.util.StringUtils.contains("maya", "aa") = false
		 * xeno.common.util.StringUtils.contains("maya", "") = true
		 * xeno.common.util.StringUtils.contains("", "") = true
		 * xeno.common.util.StringUtils.contains("m y ", " ") = true
		 * xeno.common.util.StringUtils.contains("ma\nya\na", "\n") = true
		 * xeno.common.util.StringUtils.contains("ma\nya\na", "a\n") = true
		 * 
		 * @param str
		 * 			The String to be checked.
		 * @param search
		 * 			The element of the String to be found.
		 * 
		 * @return
		 * 			The Boolean.
		 * 
		 * @throws
		 * 			The Error will be thrown when the "str" or the "search" is missing.<br/>
		 * 			Or it will be thrown when the "str" or the "search" is not null or not a String.
		 * 
		 * @since
		 * 			1.0.0
		 */
		contains: function(str, search) {
			var _arguments = arguments.length;

			xeno.common.lang.Data.ensures(_arguments > 0, "The 'str' is required, index: 0");
			xeno.common.lang.Data.ensures(_arguments > 1, "The 'search' is required, index: 1");
			xeno.common.lang.Data.ensures(xeno.common.lang.Data.isString(str, true), "The 'str' is not null or not a String");
			xeno.common.lang.Data.ensures(xeno.common.lang.Data.isString(search, true), "The 'search' is not null or not a String");

			return _contains(str, search);
		},

		/**
		 * @description
		 * <p>
		 * Compares two Strings whether they have the same value and return the result.
		 * </p>
		 * 
		 * @example
		 * <b>Examples</b>
		 * 
		 * xeno.common.util.StringUtils.equals(null, null) = true
		 * xeno.common.util.StringUtils.equals("", "") = true
		 * xeno.common.util.StringUtils.equals("", " ") = false
		 * xeno.common.util.StringUtils.equals("a", "a") = true
		 * xeno.common.util.StringUtils.equals("a", "A") = false
		 * xeno.common.util.StringUtils.equals("ab", "ab") = true
		 * xeno.common.util.StringUtils.equals("ab", "Ab") = false
		 * xeno.common.util.StringUtils.equals("ab", "ac") = false
		 * 
		 * @param left
		 * 			The left String to be compared.
		 * @param right
		 * 			The right String to be compared.
		 * 
		 * @return
		 * 			The Boolean.
		 * 
		 * @throws
		 * 			The Error will be thrown when the "left" or the "right" is missing.<br/>
		 * 			Or it will be thrown when the "left" or the "right" is not null or not a String.
		 * 
		 * @since
		 * 			1.0.0
		 */
		equals: function(left, right) {
			var _arguments = arguments.length;

			xeno.common.lang.Data.ensures(_arguments > 0, "The 'left' is required, index: 0");
			xeno.common.lang.Data.ensures(_arguments > 1, "The 'right' is required, index: 1");
			xeno.common.lang.Data.ensures(xeno.common.lang.Data.isString(left, true), "The 'left' is not null or not a String");
			xeno.common.lang.Data.ensures(xeno.common.lang.Data.isString(right, true), "The 'right' is not null or not a String");

			return _equals(left, right);
		},

		/**
		 * @description
		 * <p>
		 * Compares two Strings whether they have the same value (ignore the case) and return the result.
		 * </p>
		 * 
		 * @example
		 * <b>Examples</b>
		 * 
		 * xeno.common.util.StringUtils.equalsIgnoreCase(null, null) = true
		 * xeno.common.util.StringUtils.equalsIgnoreCase("", "") = true
		 * xeno.common.util.StringUtils.equalsIgnoreCase("", " ") = false
		 * xeno.common.util.StringUtils.equalsIgnoreCase("a", "a") = true
		 * xeno.common.util.StringUtils.equalsIgnoreCase("a", "A") = true
		 * xeno.common.util.StringUtils.equalsIgnoreCase("ab", "ab") = true
		 * xeno.common.util.StringUtils.equalsIgnoreCase("ab", "Ab") = true
		 * xeno.common.util.StringUtils.equalsIgnoreCase("ab", "ac") = false
		 * 
		 * @param left
		 * 			The left String to be compared.
		 * @param right
		 * 			The right String to be compared.
		 * 
		 * @return
		 * 			The Boolean.
		 * 
		 * @throws
		 * 			The Error will be thrown when the "left" or the "right" is missing.<br/>
		 * 			Or it will be thrown when the "left" or the "right" is not null or not a String.
		 * 
		 * @since
		 * 			1.0.0
		 */
		equalsIgnoreCase: function(left, right) {
			var _arguments = arguments.length;

			xeno.common.lang.Data.ensures(_arguments > 0, "The 'left' is required, index: 0");
			xeno.common.lang.Data.ensures(_arguments > 1, "The 'right' is required, index: 1");
			xeno.common.lang.Data.ensures(xeno.common.lang.Data.isString(left, true), "The 'left' is not null or not a String");
			xeno.common.lang.Data.ensures(xeno.common.lang.Data.isString(right, true), "The 'right' is not null or not a String");

			return _equalsIgnoreCase(left, right);
		},

		/**
		 * @description
		 * <p>
		 * Removes empty Strings and control characters (char ASCII less than or equals to 32) from both ends of the "str" and return a new String instance.
		 * </p>
		 * 
		 * @example
		 * <b>Examples</b>
		 * 
		 * xeno.common.util.StringUtils.trim(null) = null
		 * xeno.common.util.StringUtils.trim("") = ""
		 * xeno.common.util.StringUtils.trim(" ") = ""
		 * xeno.common.util.StringUtils.trim(" aBc ") = "aBc"
		 * xeno.common.util.StringUtils.trim(" a c ") = "a c"
		 * xeno.common.util.StringUtils.trim("\n") = ""
		 * xeno.common.util.StringUtils.trim("\n\n") = ""
		 * xeno.common.util.StringUtils.trim("\na\n") = "a"
		 * 
		 * @param str
		 * 			The String to be trimmed.
		 * 
		 * @return
		 * 			The String.
		 * 
		 * @throws
		 * 			The Error will be thrown when the "str" is missing.<br/>
		 * 			Or it will be thrown when the "str" is not null or not a String.
		 * 
		 * @since
		 * 			1.0.0
		 */
		trim: function(str) {
			xeno.common.lang.Data.ensures(arguments.length > 0, "The 'str' is required, index: 0");
			xeno.common.lang.Data.ensures(xeno.common.lang.Data.isString(str, true), "The 'str' is not null or not a String");

			return _trim(str);
		},

		/**
		 * @description
		 * <p>
		 * Removes empty Strings and control characters (char ASCII less than or equals to 32) from both ends of the "str" and return a new String instance, handling empty by returning null.
		 * </p>
		 * 
		 * @example
		 * <b>Examples</b>
		 * 
		 * xeno.common.util.StringUtils.trimToNull(null) = null
		 * xeno.common.util.StringUtils.trimToNull("") = null
		 * xeno.common.util.StringUtils.trimToNull(" ") = null
		 * xeno.common.util.StringUtils.trimToNull(" aBc ") = "aBc"
		 * xeno.common.util.StringUtils.trimToNull(" a c ") = "a c"
		 * xeno.common.util.StringUtils.trimToNull("\n") = null
		 * xeno.common.util.StringUtils.trimToNull("\n\n") = null
		 * xeno.common.util.StringUtils.trimToNull("\na\n") = "a"
		 * 
		 * @param str
		 * 			The String to be trimmed.
		 * 
		 * @return
		 * 			The String.
		 * 
		 * @throws
		 * 			The Error will be thrown when the "str" is missing.<br/>
		 * 			Or it will be thrown when the "str" is not null or not a String.
		 * 
		 * @since
		 * 			1.0.0
		 */
		trimToNull: function(str) {
			xeno.common.lang.Data.ensures(arguments.length > 0, "The 'str' is required, index: 0");
			xeno.common.lang.Data.ensures(xeno.common.lang.Data.isString(str, true), "The 'str' is not null or not a String");

			return _trimToNull(str);
		},

		/**
		 * @description
		 * <p>
		 * Removes empty Strings and control characters (char ASCII less than or equals to 32) from both ends of the "str" and return a new String instance, handling null by returning "".
		 * </p>
		 * 
		 * @example
		 * <b>Examples</b>
		 * 
		 * xeno.common.util.StringUtils.trimToEmpty(null) = ""
		 * xeno.common.util.StringUtils.trimToEmpty("") = ""
		 * xeno.common.util.StringUtils.trimToEmpty(" ") = ""
		 * xeno.common.util.StringUtils.trimToEmpty(" aBc ") = "aBc"
		 * xeno.common.util.StringUtils.trimToEmpty(" a c ") = "a c"
		 * xeno.common.util.StringUtils.trimToEmpty("\n") = ""
		 * xeno.common.util.StringUtils.trimToEmpty("\n\n") = ""
		 * xeno.common.util.StringUtils.trimToEmpty("\na\n") = "a"
		 * 
		 * @param str
		 * 			The String to be trimmed.
		 * 
		 * @return
		 * 			The String.
		 * 
		 * @throws
		 * 			The Error will be thrown when the "str" is missing.<br/>
		 * 			Or it will be thrown when the "str" is not null or not a String.
		 * 
		 * @since
		 * 			1.0.0
		 */
		trimToEmpty: function(str) {
			xeno.common.lang.Data.ensures(arguments.length > 0, "The 'str' is required, index: 0");
			xeno.common.lang.Data.ensures(xeno.common.lang.Data.isString(str, true), "The 'str' is not null or not a String");

			return _trimToEmpty(str);
		},

		/**
		 * @description
		 * <p>
		 * Capitalizes a String, changing the first letter in the "str" to upper case, no other letters is changed.
		 * </p>
		 * 
		 * @example
		 * <b>Examples</b>
		 * 
		 * xeno.common.util.StringUtils.capitalize(null) = null
		 * xeno.common.util.StringUtils.capitalize("abc") = "Abc"
		 * xeno.common.util.StringUtils.capitalize("\na") = "\na"
		 * xeno.common.util.StringUtils.capitalize("a\n") = "A\n"
		 * 
		 * @param str
		 * 			The String to be capitalized.
		 * 
		 * @return
		 * 			The String.
		 * 
		 * @throws
		 * 			The Error will be thrown when the "str" is missing.<br/>
		 * 			Or it will be thrown when the "str" is not null or not a String.
		 * 
		 * @since
		 * 			1.0.0
		 */
		capitalize: function(str) {
			xeno.common.lang.Data.ensures(arguments.length > 0, "The 'str' is required, index: 0");
			xeno.common.lang.Data.ensures(xeno.common.lang.Data.isString(str, true), "The 'str' is not null or not a String");

			return _capitalize(str);
		},

		/**
		 * @description
		 * <p>
		 * Uncapitalizes a String, changing the first letter in the "str" to lower case, no other letters is changed.
		 * </p>
		 * 
		 * @example
		 * <b>Examples</b>
		 * 
		 * xeno.common.util.StringUtils.uncapitalize(null) = null
		 * xeno.common.util.StringUtils.uncapitalize("Abc") = "abc"
		 * xeno.common.util.StringUtils.uncapitalize("\na") = "\na"
		 * xeno.common.util.StringUtils.uncapitalize("A\n") = "a\n"
		 * 
		 * @param str
		 * 			The String to be uncapitalized.
		 * 
		 * @return
		 * 			The String.
		 * 
		 * @throws
		 * 			The Error will be thrown when the "str" is missing.<br/>
		 * 			Or it will be thrown when the "str" is not null or not a String.
		 * 
		 * @since
		 * 			1.0.0
		 */
		uncapitalize: function(str) {
			xeno.common.lang.Data.ensures(arguments.length > 0, "The 'str' is required, index: 0");
			xeno.common.lang.Data.ensures(xeno.common.lang.Data.isString(str, true), "The 'str' is not null or not a String");

			return _uncapitalize(str);
		},

		/**
		 * @description
		 * <p>
		 * Determines whether the "str" begins with the specified prefix or not.
		 * </p>
		 * 
		 * @example
		 * <b>Examples</b>
		 * 
		 * xeno.common.util.StringUtils.beginsWith(null, null) = true
		 * xeno.common.util.StringUtils.beginsWith("", "") = true
		 * xeno.common.util.StringUtils.beginsWith("abc", "a") = true
		 * xeno.common.util.StringUtils.beginsWith("abc", "") = true
		 * xeno.common.util.StringUtils.beginsWith("abc", "ab") = true
		 * xeno.common.util.StringUtils.beginsWith("abc", "b") = false
		 * xeno.common.util.StringUtils.beginsWith("\nabc", "\n") = true
		 * 
		 * @param str
		 * 			The String that the prefix will be checked.
		 * @param search
		 * 			The prefix that will be tested.
		 * 
		 * @return
		 * 			The Boolean.
		 * 
		 * @throws
		 * 			The Error will be thrown when the "str" or the "search" is missing.<br/>
		 * 			Or it will be thrown when the "str" or the "search" is not null or not a String.
		 * 
		 * @since
		 * 			1.0.0
		 */
		beginsWith: function(str, search) {
			var _arguments = arguments.length;

			xeno.common.lang.Data.ensures(_arguments > 0, "The 'str' is required, index: 0");
			xeno.common.lang.Data.ensures(_arguments > 1, "The 'search' is required, index: 1");
			xeno.common.lang.Data.ensures(xeno.common.lang.Data.isString(str, true), "The 'str' is not null or not a String");
			xeno.common.lang.Data.ensures(xeno.common.lang.Data.isString(search, true), "The 'search' is not null or not a String");

			return _beginsWith(str, search);
		},

		/**
		 * @description
		 * <p>
		 * Determines whether the "str" ends with the specified suffix or not.
		 * </p>
		 * 
		 * @example
		 * <b>Examples</b>
		 * 
		 * xeno.common.util.StringUtils.endsWith(null, null) = true
		 * xeno.common.util.StringUtils.endsWith("", "") = true
		 * xeno.common.util.StringUtils.endsWith("abc", "c") = true
		 * xeno.common.util.StringUtils.endsWith("abc", "") = true
		 * xeno.common.util.StringUtils.endsWith("abc", "bc") = true
		 * xeno.common.util.StringUtils.endsWith("abc", "b") = false
		 * xeno.common.util.StringUtils.endsWith("abc\n", "\n") = true
		 * 
		 * @param str
		 * 			The String that the suffix will be checked.
		 * @param search
		 * 			The suffix that will be tested.
		 * 
		 * @return
		 * 			The Boolean.
		 * 
		 * @throws
		 * 			The Error will be thrown when the "str" or the "search" is missing.<br/>
		 * 			Or it will be thrown when the "str" or the "search" is not null or not a String.
		 * 
		 * @since
		 * 			1.0.0
		 */
		endsWith: function(str, search) {
			var _arguments = arguments.length;

			xeno.common.lang.Data.ensures(_arguments > 0, "The 'str' is required, index: 0");
			xeno.common.lang.Data.ensures(_arguments > 1, "The 'search' is required, index: 1");
			xeno.common.lang.Data.ensures(xeno.common.lang.Data.isString(str, true), "The 'str' is not null or not a String");
			xeno.common.lang.Data.ensures(xeno.common.lang.Data.isString(search, true), "The 'search' is not null or not a String");

			return _endsWith(str, search);
		},

		/**
		 * @description
		 * <p>
		 * Splits the "str" into an Array by the "separator" specified.
		 * </p>
		 * 
		 * @example
		 * <b>Examples</b>
		 * 
		 * xeno.common.util.StringUtils.split(null, *) = []
		 * xeno.common.util.StringUtils.split(*, null) = [*]
		 * xeno.common.util.StringUtils.split("", "") = []
		 * xeno.common.util.StringUtils.split("", "a") = [""]
		 * xeno.common.util.StringUtils.split("maya", "") = ["m", "a", "y", "a"]
		 * xeno.common.util.StringUtils.split("maya", "a") = ["m", "y", ""]
		 * xeno.common.util.StringUtils.split("maya", "m") = ["", "aya"]
		 * xeno.common.util.StringUtils.split("ma\nya", "\n") = ["ma", "ya"]
		 * xeno.common.util.StringUtils.split("ma\n", "a") = ["m", "\n"]
		 * 
		 * @param str
		 * 			The String to be splitted.
		 * @param separator
		 * 			The String used as the separator.
		 * 
		 * @return
		 * 			The Array.
		 * 
		 * @throws
		 * 			The Error will be thrown when the "str" or the "separator" is missing.<br/>
		 * 			Or it will be thrown when the "str" or the "separator" is not null or not a String.
		 * 
		 * @since
		 * 			1.0.0
		 */
		split: function(str, separator) {
			var _arguments = arguments.length;

			xeno.common.lang.Data.ensures(_arguments > 0, "The 'str' is required, index: 0");
			xeno.common.lang.Data.ensures(_arguments > 1, "The 'separator' is required, index: 1");
			xeno.common.lang.Data.ensures(xeno.common.lang.Data.isString(str, true), "The 'str' is not null or not a String");
			xeno.common.lang.Data.ensures(xeno.common.lang.Data.isString(separator, true), "The 'separator' is not null or not a String");

			return _split(str, separator);
		},

		/**
		 * @description
		 * <p>
		 * Reverses each character in the "str" and returns it with a new String instance.
		 * </p>
		 * 
		 * @example
		 * <b>Examples</b>
		 * 
		 * xeno.common.util.StringUtils.reverse(null) = null
		 * xeno.common.util.StringUtils.reverse("bat") = "tab"
		 * xeno.common.util.StringUtils.reverse(" ba\nt") = "t\nab "
		 * 
		 * @param str
		 * 			The String to be reversed.
		 * 
		 * @return
		 * 			The String.
		 * 
		 * @throws
		 * 			The Error will be thrown when the "str" is missing.<br/>
		 * 			Or it will be thrown when the "str" is not null or not a String.
		 * 
		 * @since
		 * 			1.0.0
		 */
		reverse: function(str) {
			xeno.common.lang.Data.ensures(arguments.length > 0, "The 'str' is required, index: 0");
			xeno.common.lang.Data.ensures(xeno.common.lang.Data.isString(str, true), "The 'str' is not null or not a String");

			return _reverse(str);
		},

		/**
		 * @description
		 * <p>
		 * Replaces all "search" String in the "str" with the "replace" and return it with a new String instance.
		 * </p>
		 * <p>
		 * Different from String.replace(p, s), this method will replace all matches elements.
		 * </p>
		 * 
		 * @example
		 * <b>Examples</b>
		 * 
		 * xeno.common.util.StringUtils.replace(null, null, *) = *
		 * xeno.common.util.StringUtils.replace(null, "maya", *) = null
		 * xeno.common.util.StringUtils.replace("maya", null, *) = "maya"
		 * xeno.common.util.StringUtils.replace("maya", "a", "b") = "mbyb"
		 * xeno.common.util.StringUtils.replace("maya", "ay", "c") = "mca"
		 * xeno.common.util.StringUtils.replace("maya", "a", "cd") = "mcdycd"
		 * xeno.common.util.StringUtils.replace("maya", "ay", "cd") = "mcda"
		 * 
		 * @param str
		 * 			The String to be handled.
		 * @param search
		 * 			The element of the String to be replaced.
		 * @param replace
		 * 			The replacement String.
		 * 
		 * @return
		 * 			The String.
		 * 
		 * @throws
		 * 			The Error will be thrown when the "str", the "search", or the "replace" is missing.<br/>
		 * 			Or it will be thrown when the "str" or the "search" is not null or not a String.
		 * 			Or it will be thrown when the "replace" is not a String.
		 * 
		 * @since
		 * 			1.0.0
		 */
		replace: function(str, search, replace) {
			var _arguments = arguments.length;

			xeno.common.lang.Data.ensures(_arguments > 0, "The 'str' is required, index: 0");
			xeno.common.lang.Data.ensures(_arguments > 1, "The 'search' is required, index: 1");
			xeno.common.lang.Data.ensures(_arguments > 2, "The 'replace' is required, index: 2");
			xeno.common.lang.Data.ensures(xeno.common.lang.Data.isString(str, true), "The 'str' is not null or not a String");
			xeno.common.lang.Data.ensures(xeno.common.lang.Data.isString(search, true), "The 'search' is not null or not a String");
			xeno.common.lang.Data.ensures(xeno.common.lang.Data.isString(replace), "The 'replace' is not a String");

			return _replace(str, search, replace);
		},

		/**
		 * @description
		 * <p>
		 * Removes all "search" String in the "str" and returns it with a new String instance.
		 * </p>
		 * 
		 * @example
		 * <b>Examples</b>
		 * 
		 * xeno.common.util.StringUtils.remove(null, null) = ""
		 * xeno.common.util.StringUtils.remove("maya", "a") = "my"
		 * xeno.common.util.StringUtils.remove("maya", null) = "maya"
		 * xeno.common.util.StringUtils.remove("maya", "ay") = "ma"
		 * xeno.common.util.StringUtils.remove("ma\na", "\n") = "maa"
		 * 
		 * @param str
		 * 			The String to be handled.
		 * @param search
		 * 			The element of the String to be removed.
		 * 
		 * @return
		 * 			The String.
		 * 
		 * @throws
		 * 			The Error will be thrown when the "str" or the "search" is missing.<br/>
		 * 			Or it will be thrown when the "str" or the "search" is not null or not a String.
		 * 
		 * @since
		 * 			1.0.0
		 */
		remove: function(str, search) {
			var _arguments = arguments.length;

			xeno.common.lang.Data.ensures(_arguments > 0, "The 'str' is required, index: 0");
			xeno.common.lang.Data.ensures(_arguments > 1, "The 'search' is required, index: 1");
			xeno.common.lang.Data.ensures(xeno.common.lang.Data.isString(str, true), "The 'str' is not null or not a String");
			xeno.common.lang.Data.ensures(xeno.common.lang.Data.isString(search, true), "The 'search' is not null or not a String");

			return _remove(str, search);
		},

		/**
		 * @description
		 * <p>
		 * Calculates and returns the length of the "str".
		 * </p>
		 * 
		 * @example
		 * <b>Examples</b>
		 * 
		 * xeno.common.util.StringUtils.length(null) = 0
		 * xeno.common.util.StringUtils.length("") = 0
		 * xeno.common.util.StringUtils.length(" ") = 1
		 * xeno.common.util.StringUtils.length("abc") = 3
		 * xeno.common.util.StringUtils.length("ab\nc") = 4
		 * xeno.common.util.StringUtils.length("啊b�?) = 3
		 * xeno.common.util.StringUtils.length("啊b�?, false) = 3
		 * xeno.common.util.StringUtils.length("啊b�?, true) = 5
		 * 
		 * @param str
		 * 			The String to be handled.
		 * @param calActual
		 * 			A Boolean value to decide whether to calculate the actual String length.<br/>
		 * 			If this passes as true, those characters begin with 256 will be considered as the length with 2.<br/>
		 * 			The default value is: false.
		 * 
		 * @return
		 * 			The Number, integer.
		 * 
		 * @throws
		 * 			The Error will be thrown when the "str" is missing.<br/>
		 * 			Or it will be thrown when the "str" is not null or not a String.<br/>
		 * 			Or it will be thrown when the "calActual" is not a Boolean.
		 * 
		 * @since
		 * 			1.0.0
		 */
		length: function(str, calActual) {
			var _arguments = arguments.length;

			xeno.common.lang.Data.ensures(_arguments > 0, "The 'str' is required, index: 0");
			xeno.common.lang.Data.ensures(xeno.common.lang.Data.isString(str, true), "The 'str' is not null or not a String");

			var _calActual = false;

			if(_arguments > 1) {
				xeno.common.lang.Data.ensures(xeno.common.lang.Data.isBoolean(calActual), "The 'calActual' is not a Boolean");

				_calActual = calActual;
			}

			return _length(str, _calActual);
		},

		/**
		 * @description
		 * <p>
		 * Returns the "str" with content by the length defined, rest will be truncated and be displayed with "...".
		 * </p>
		 * <p>
		 * The "lengthToKeep " maybe a float value, the "Math.floor(n)" action will be processed first to convert it into an integer Number.
		 * </p>
		 * 
		 * @example
		 * <b>Examples</b>
		 * 
		 * xeno.common.util.StringUtils.abbreviate(null, *, *) = null
		 * xeno.common.util.StringUtils.abbreviate("", *, *) = ""
		 * xeno.common.util.StringUtils.abbreviate("abcd", 0) = "..."
		 * xeno.common.util.StringUtils.abbreviate("abcd", 2) = "..."
		 * xeno.common.util.StringUtils.abbreviate("abcd", 3) = "..."
		 * xeno.common.util.StringUtils.abbreviate("abcd", 4) = "abcd"
		 * xeno.common.util.StringUtils.abbreviate("abcd", 5) = "abcd"
		 * xeno.common.util.StringUtils.abbreviate("abcdefg", 5) = "ab..."
		 * xeno.common.util.StringUtils.abbreviate("阿宝", 2) = "阿宝"
		 * xeno.common.util.StringUtils.abbreviate("阿宝", 2, false) = "阿宝"
		 * xeno.common.util.StringUtils.abbreviate("阿宝", 2, true) = "..."
		 * xeno.common.util.StringUtils.abbreviate("啊a错d恶风", 6) = "啊a错d恶风"
		 * xeno.common.util.StringUtils.abbreviate("啊a错d恶风", 6, false) = "啊a错d恶风"
		 * xeno.common.util.StringUtils.abbreviate("啊a错d恶风", 6, true) = "啊a..."
		 * xeno.common.util.StringUtils.abbreviate("啊不c的恶风给", 6) = "啊不c..."
		 * xeno.common.util.StringUtils.abbreviate("啊不c的恶风给", 6, false) = "啊不c..."
		 * xeno.common.util.StringUtils.abbreviate("啊不c的恶风给", 6, true) = "�?.."
		 * 
		 * @param str
		 * 			The String to be abbreviated.
		 * @param lengthToKeep
		 * 			The length of content to remain, the extended content will be truncated and be displayed with "...".
		 * @param calActual
		 * 			A Boolean value to decide whether to calculate the actual String length.<br/>
		 * 			If this passes as true, those characters begin with 256 will be considered as the length with 2.<br/>
		 * 			The default value is: false.
		 * 
		 * @return
		 * 			The String.
		 * 
		 * @throws
		 * 			The Error will be thrown when the "str" or the "lengthToKeep" is missing.<br/>
		 * 			Or it will be thrown when the "str" is not null or not a String.<br/>
		 * 			Or it will be thrown when the "lengthToKeep" is not a Number.<br/>
		 * 			Or it will be thrown when the "calActual" is not a Boolean.<br/>
		 * 			Or it will be thrown when the "lengthToKeep" is negative.
		 * 
		 * @since
		 * 			2.1.0
		 */
		abbreviate: function(str, lengthToKeep, calActual) {
			var _arguments = arguments.length;

			xeno.common.lang.Data.ensures(_arguments > 0, "The 'str' is required, index: 0");
			xeno.common.lang.Data.ensures(_arguments > 1, "The 'lengthToKeep' is required, index: 1");
			xeno.common.lang.Data.ensures(xeno.common.lang.Data.isString(str, true), "The 'str' is not null or not a String");
			xeno.common.lang.Data.ensures(xeno.common.lang.Data.isNumber(lengthToKeep), "The 'lengthToKeep' is not a Number");

			var _calActual = false;

			if(_arguments > 2) {
				xeno.common.lang.Data.ensures(xeno.common.lang.Data.isBoolean(calActual), "The 'calActual' is not a Boolean");

				_calActual = calActual;
			}

			xeno.common.lang.Data.ensures(lengthToKeep >= 0, "The 'lengthToKeep' is negative");

			return _abbreviate(str, lengthToKeep, _calActual);
		},

		/**
		 * @description
		 * <p>
		 * Formats the "str" and returns with a new String instance�?
		 * </p>
		 * 
		 * @example
		 * <b>Examples</b>
		 * 
		 * xeno.common.util.StringUtils.format(null, *) = null
		 * xeno.common.util.StringUtils.format("abc{0}defg") = "abc{0}defg"
		 * xeno.common.util.StringUtils.format("abc{0}defg", "#") = "abc#defg"
		 * xeno.common.util.StringUtils.format("abc{0}def{1}g", "#", "ABC") = "abc#defABCg"
		 * xeno.common.util.StringUtils.format("abc{0}defg", "#", "ABC") = "abc#defg"
		 * xeno.common.util.StringUtils.format("abc{0}def{1}g", "#") = "abc#def{1}g"
		 * xeno.common.util.StringUtils.format("{1}abc{0}defg", "#", "ABC") = "ABCabc#defg"
		 * xeno.common.util.StringUtils.format("{1}abc{0}de{3}fg{2}", "#", "ABC", "ooo", "ba") = "ABCabc#debafgooo"
		 * xeno.common.util.StringUtils.format("{2}abc{0}de{3}fg{2}", "#", "ABC", "ooo", "ba") = "oooabc#debafgooo"
		 * 
		 * @param str
		 * 			The String to be formatted.
		 * @param replaces
		 * 			Strings to be replaced.<br/>
		 * 			These are dynamic arguments.
		 * 
		 * @return
		 * 			The String.
		 * 
		 * @throws
		 * 			The Error will be thrown when the "str" is missing.<br/>
		 * 			Or it will be thrown when the "str" is not null or not a String.<br/>
		 * 			Or it will be thrown when one of dynamic arguments is not a String.
		 * 
		 * @since
		 * 			1.0.0
		 */
		format: function(str, replaces) {
			var _arguments = arguments.length;

			xeno.common.lang.Data.ensures(_arguments > 0, "The 'str' is required, index: 0");
			xeno.common.lang.Data.ensures(xeno.common.lang.Data.isString(str, true), "The 'str' is not null or not a String");

			var _replaces = [];

			if(_arguments > 1) {

				for(var i = 1; i < _arguments; i += 1) {
					var replace = arguments[i];

					xeno.common.lang.Data.ensures(xeno.common.lang.Data.isString(replace), "The 'replace" + (i - 1) + "' is not a String");

					_replaces.push(replace);
				}
			}

			return _format(str, _replaces);
		}

	};

})();
