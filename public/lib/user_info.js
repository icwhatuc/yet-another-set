(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var user_data = [ { name : 'user_1', score : '', status : 'ready' }, { name : 'user_2', score : '', status : 'waiting' } ];

var User = React.createClass({displayName: "User",
	getInitialState : function() {
		return { 
			user_data : user_data
		};
	},
	render : function() {
		var userList = this.state.user_data.map(function (user) {
			return (
				React.createElement("div", {className: "user-info"}, 
					React.createElement("dt", {className: "user-name"}, 
						user.name
					), 
					React.createElement("dd", {className: "user-status"}, 
						user.status
					)
				)
			)
		});
		return (
		    React.createElement("dl", {className: "user-list"}, 
		        userList
		    )
	    );
	}
});

var UserBlock = React.createClass({displayName: "UserBlock",
	getInitialState : function() {
		return { data : [] };
	},
    render : function() {
		return (
			React.createElement("div", {className: "user-block"}, 
        		React.createElement(User, null)
      		)
		)
	}
});

React.render(
  	React.createElement(UserBlock, null),
  	document.getElementById('content')
);

},{}]},{},[1]);
