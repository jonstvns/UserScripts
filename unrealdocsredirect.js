// ==UserScript==
// @name         Unreal Docs Redirect
// @namespace    http://tampermonkey.net/
// @version      2024-05-10
// @description  Redirect unreal documentation pages from 4.x to 5.3
// @author       Colin Haber
// @match        https://docs.unrealengine.com/*
// @match        https://dev.epicgames.com/documentation/*
// @icon         none
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

var forceVersion = '5.3';
var apiVersionRegex = /docs\.unrealengine\.com\/(?<apiVersion>\d+\.\d+)\/(?<languageTag>[0-9A-Za-z\-]+)\/(?<docPath>.*)$/;
var url = document.location.href;
var match = apiVersionRegex.exec(url);
var isVersionForced = typeof forceVersion !== 'undefined' && !isNaN(parseFloat(forceVersion));
if (match !== null) {
  var apiVersion = match.groups['apiVersion'];
  var languageTag = match.groups['languageTag'];
  var docPath = match.groups['docPath'];
  if (apiVersion !== undefined && languageTag !== undefined && docPath !== undefined) {
    var forceMajorVersion;
    var redirectUrl;
    if (isVersionForced) {
      //forceMajorVersion = parseInt(forceVersion.split('.')[0]);
      //if (forceMajorVersion < 5) {
        redirectUrl = `https://docs.unrealengine.com/${forceVersion}/${languageTag}/${docPath}`;
      //} else {
      //  redirectUrl = `https://dev.epicgames.com/documentation/${languageTag}/unreal-engine/${docPath}?application_version=${forceVersion}`;
      //}
    } else {
      redirectUrl = `https://dev.epicgames.com/documentation/${languageTag}/unreal-engine/${docPath}`;
    }
    window.location.replace(redirectUrl);
  }
}

})();
