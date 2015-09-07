var event_constants = require('./constants.js').event_constants;

var cards_data = [
	{ color : 'red', shape : 'diamonds', fill : 'striped', number : 2 },  
	{ color : 'green', shape : 'spades', fill : 'solid', number : 1 },
	{ color : 'blue', shape : 'clubs', fill : 'solid', number : 3 },
	{ color : 'red', shape : 'diamonds', fill : 'empty', number : 2 },
	{ color : 'blue', shape: 'spades', fill: 'empty', number: 3},
	{ color : 'green', shape : 'clubs', fill : 'striped', number: 1}
];

var card_map = {
	shape : { 1 : 'clubs', 2 : 'diamonds', 3 : 'spades' },
	fill : { 1 : 'striped', 2 : 'empty', 3 : 'solid' },
	color : { 1 : 'blue', 2 : 'red', 3 : 'green' }
};

var CardGallery = module.exports = React.createClass({
	getInitialState : function() {
		this.selectedCards = [];

		return { data : cards_data.slice(0) };
	},
	componentDidMount: function() {
		var self = this;
		socket.on(event_constants.UPDATE_BOARD, function (board) {
			var cards_data = board.map(function(c) {
				return { color: card_map.color[c._color], shape: card_map.shape[c._shape], fill: card_map.fill[c._animation], number: c._number };
			});
			self.setState({data : cards_data});
		});
	},
	getRows: function() {
		var cardArray = this.state.data.slice(0);
        var numberOfCards = cardArray.length;
	
		var rows = [], size = numberOfCards/3;

		while (cardArray.length > 0)
    		rows.push(cardArray.splice(0, size));

    	var rowDiv = rows.map(function (row) {
    		var cards = [];

    		for (var i = 0; i < row.length; i++) {
    			var card = row[i];
    			cards.push( <Card color={card.color} shape={card.shape} fill={card.fill} number={card.number} />);
    		};

    		return (
    			<div className="card-row clearfix">
    				{cards}
    			</div>
    		);
    	});

    	return (
    		<div className="all-card-rows clearfix">
    			{rowDiv}
    		</div>
    	)
	},
	handleChildClick: function(e) {
		e.preventDefault();
		var className = e.target.className;
		var selectHash = this.formSelectHash(className);
		this.selectedCards.push(selectHash);

		if (this.selectedCards.length == 3)
			//send info to server
			console.log('this is three');
		else
			console.log('restart');

	},
	formSelectHash: function(string) {
		var classes = string.split(' ');
		classes.shift();

		var hash = {};
		hash['color'] = classes[0];
		hash['fill'] = classes[1];
		hash['shape'] = classes[2];

		if (classes[3] == 'one-item')
			hash['number'] = 1;
		else if (classes[3] == 'two-item')
			hash['number'] = 2;
		else if (classes[3] == 'three-item')
			hash['number'] = 3;

		return hash;
	},
    render: function() {
		return (
			<div className="card-gallery" onClick={this.handleChildClick}>
				{this.getRows()}
      		</div>
		);
	}
});

var Card = React.createClass({
	getInitialState: function() {
		return { selected : false};
	},
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
			itemDiv.push( <div className={classString}></div> );
		}

		return ( 
			<div className="centercolumn">
				{itemDiv}
			</div>
		)
	},
	childClick: function() {
		if (this.state.selected == false)
			this.setState({selected : true});
		else
			this.setState({selected : false});
	},
	render: function() {
		var classString = 'card-block';

		if (this.state.selected)
			classString += ' ' + 'selected';

        return (
        	<div className={classString} onClick={this.childClick}>
	            {this.numberSetUp()}
	        </div>
        );
    }

});

