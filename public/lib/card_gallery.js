(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var cards_data = [
	{ color : 'red', shape : 'diamonds', fill : 'striped', number : 2 },  
	{ color : 'green', shape : 'spades', fill : 'striped', number : 1 },
	{ color : 'blue', shape : 'clubs', fill : 'solid', number : 3 },
	{ color : 'green', shape : 'diamonds', fill : 'empty', number : 1 }
];

var CardGallery = React.createClass({displayName: "CardGallery",
	getInitialState : function() {
		return { data : cards_data };
	},
	getRows: function() {
		var cardArray = this.state.data;
		var numberOfCards = cardArray.length;
	
		var rows = [], size = 3;

		while (cardArray.length > 0)
    		rows.push(cardArray.splice(0, size));

    	var rowDiv = rows.map(function (row) {
    		var cards = [];

    		for (var i = 0; i < row.length; i++) {
    			var card = row[i];
    			cards.push( React.createElement(Card, {color: card.color, shape: card.shape, fill: card.fill, number: card.number}));
    		};

    		return (
    			React.createElement("div", {className: "card-row"}, 
    				cards
    			)
    		);
    	});

    	return (
    		React.createElement("div", {className: "all-card-rows"}, 
    			rowDiv
    		)
    	)
	},
    render: function() {
		return (
			React.createElement("div", {className: "card-gallery"}, 
				this.getRows()
      		)
		);
	}
});

var Card = React.createClass({displayName: "Card",
	numberSetUp: function() {
		var number = this.props.number;

		var numberText;

		if (number == 1) {
			numberText = 'one-item';
		} else if (number == 2) {
			numberText = 'two-item';
		} else if (number == 3) {
			numberText = 'three-item';
		}

		var classString = 'card ' + this.props.color + ' ' + this.props.fill + ' ' + this.props.shape + ' ' + numberText;

		var itemDiv = [];
		for (var i = 0; i < number; i++) {
			itemDiv.push( React.createElement("div", {className: classString}) );
		}

		return ( 
			React.createElement("div", {className: "centercolumn"}, 
				itemDiv
			)
		)
	},
	render: function() {
        return (
        	React.createElement("div", {className: "card-block"}, 
	            this.numberSetUp()
	        )
        );
    }

});

React.render(
  	React.createElement(CardGallery, null),
  	document.getElementById('content')
);


},{}]},{},[1]);
