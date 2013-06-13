##############################
XENO-COMMON JAVASCRIPT LIBRARY
##############################

Date	: 2012/10/08
Version	: 2.1.0
Author	: Eric Feng



---------------
1. INTRODUCTION
---------------

The standard JavaScript libraries fail to provide enough functions for manipulation of its core classes.
The "xeno-common" library provides much needed additions to it.
Very generic, very reusable components for everyday using.
You could find them and know how to use in the API document files included in the release package.

This library could work well in below 4 types kernel’s browsers:
	Trident - typical browsers are: IE, Maxthon
	Geckos - typical browser is: Firefox
	Webkit - typical browsers are: Safari, Chrome
	Presto - typical browser is: Opera

All unit tests have been tested and passed on above browsers, and all expected results are consistent.



----------------
2. RELEASE NOTES
----------------

This release comes with below structure:

<xeno-common-2.1.0>
	<apidocs> - The API & source code documents folder.
	readme.txt - This document file.
	xeno-common-2.1.0.js - The all combined together file with readable code format and comments.
	xeno-common-2.1.0.min.js - The all combined together file in minified code format.



------------------
3. GETTING STARTED
------------------

Please consult the project home page at "http://code.google.com/p/xeno/" for more details.



------------------
4. UPGRADE NOTICES
------------------

Namespaces have been added for each class since 2.x, to upgrade from 1.x to 2.x, you should add namespaces or create shortcuts:

// Uses xeno.common.lang.Data with full namespace.
var result = xeno.common.lang.Data.isString("abc");

// Or creates a shortcut for xeno.common.lang.Data.
var Data = xeno.common.lang.Data;
var result = Data.isString("abc");



--------------
5. CHANGE LOGS
--------------

[2.1.0]

** API Changes
	> Change "truncate" function of the "StringUtils" class to "abbreviate".

[2.0.0]

** Features
	> Added namespace of each package.

** Improvements
	> Improved the documentation.

[1.3.0]

** Features
	> Added "EventType" class and completed all related functions.

[1.2.0]

** Features
	> Added "isNotEmpty", "isNotBlank", and "isNotWhitespace" functions for the "StringUtils" class.
	> Added "isNotEmpty" function for the "ArrayUtils" class.
	> Added "Pagination" class and completed all related functions.

** Improvements
	> Improved the documentation.

[1.1.0]

** Features
	> Added "ObjectUtils" class and completed all related functions.

** Improvements
	> Improved the documentation.

[1.0.0]

** Features
	> Added "Data" class and completed all related functions.
	> Added "GUID" class and completed all related functions.
	> Added "ExcelCellCalculator" class and completed all related functions.
	> Added "ArrayUtils" class and completed all related functions.
	> Added "BooleanUtils" class and completed all related functions.
	> Added "CryptoUtils" class and completed all related functions.
	> Added "DateUtils" class and completed all related functions.
	> Added "FileUtils" class and completed all related functions.
	> Added "NumberUtils" class and completed all related functions.
	> Added "RandomUtils" class and completed all related functions.
	> Added "StringUtils" class and completed all related functions.
