/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var EchoChamber = (function (window, undefined) {

	  var EchoChamber = __webpack_require__(1); 

	  var ec = Object.create(EchoChamber);
	  ec.init();
	  
	  return ec;

	})(window);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var CommentList = __webpack_require__(2);
	var Form = __webpack_require__(3);
	var EchoChamber = window.EchoChamber || {};

	EchoChamber.init = function() {
	  this.entry = document.getElementsByTagName('script')[0];
	  this.iframe = this.attachIframe(); 
	  this.form = Object.create(Form);
	  this.form.init(this.iframe);
	};

	EchoChamber.attachIframe = function() {
	  var iframe = document.createElement('iframe');
	  iframe.style.width = '250px';
	  iframe.style.height = '300px';
	  iframe.style.border = 'none';
	  this.entry.parentNode.insertBefore(iframe, this.entry);
	  return iframe;
	}

	module.exports = EchoChamber;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var CommentList = {};

	CommentList.init = function() {
	  this.comments = [];
	};

	CommentList.save = function() {
	  localStorage.setItem("comments", this.stringify());
	};

	CommentList.stringify = function() {
	  return JSON.stringify(this.comments.map(function(item) {
	    return {
	      text: item.text,
	      author: item.author,
	      email: item.email,
	      children: item.children
	    }
	  }));
	};

	module.exports = CommentList;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var CommentList = __webpack_require__(2);
	var Comment = __webpack_require__(4);

	var Form = {};

	Form.init = function(iframe) {
	  this.iframe = iframe; 
	  this.DOM = {};
	  this.initDOM(this.iframe);
	  this.commentsList = Object.create(CommentList);
	  this.commentsList.init();
	  this.addEventListeners();
	}

	Form.template = function() {
	  return (
	    "<div class='ec-form-wrapper'>" + 
	      "<form id='ECForm' class='ec-form'>" + 
	        "<input type='text' name='author' placeholder='name'>" +
	        "<input type='email' name='email' placeholder='email'>" +
	        "<textarea name='text' id='ECFormField'></textarea>" + 
	        "<input id='ECFormSubmit' type='submit' value='submit'>" + 
	      "</form>" + 
	    "</div>"
	  );
	};

	Form.addEventListeners = function() {
	  this.DOM.form.addEventListener('submit', _onClick.bind(this));
	};

	Form.initDOM = function(target) {
	  this.doc = target.contentWindow.document;
	  this.doc.write(this.template());
	  this.doc.close();
	  this.DOM.form = this.doc.getElementById('ECForm');
	  this.DOM.button = this.doc.getElementById('ECFormSubmit');
	};

	Form.submit = function(form) {
	  var comment = Object.create(Comment);
	  comment.init(form.elements["text"].value, form.elements["author"].value, form.elements["email"].value);
	  this.commentsList.comments.push(comment);
	  this.commentsList.save();
	}

	var _onClick = function(e) {
	  e.preventDefault();
	  this.submit(this.DOM.form);
	}

	module.exports = Form;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	  var Comment = {};

	  Comment.init = function(text, author, email) {
	    this.text = text;
	    this.author = author;
	    this.email = email;
	  };

	  var EchoChamber = window.EchoChamber || {};

	  module.exports = Comment;


/***/ }
/******/ ]);