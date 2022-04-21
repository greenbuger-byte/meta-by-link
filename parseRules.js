"use strict";
exports.__esModule = true;
var attr = function (element, attribute) { return element.getAttribute(attribute); };
var elementByContent = function (element) { return attr(element, 'content'); };
var elementByText = function (element) { return element.text; };
var parseRules = {
    title: [
        ['meta[property="og:title"]', elementByContent],
        ['meta[name="twitter:title"]', elementByContent],
        ['meta[property="twitter:title"]', elementByContent],
        ['title', function (element) { return elementByText(element); }],
    ]
};
exports["default"] = parseRules;
