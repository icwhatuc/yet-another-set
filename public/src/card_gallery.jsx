var cards_data = [
	{ color : 'red', shape : 'diamonds', fill : 'striped', number : 2 },  
	{ color : 'green', shape : 'spades', fill : 'solid', number : 1 },
	{ color : 'blue', shape : 'clubs', fill : 'solid', number : 3 },
	{ color : 'red', shape : 'diamonds', fill : 'empty', number : 2 },
	{ color : 'blue', shape: 'spades', fill: 'empty', number: 3},
	{ color : 'green', shape : 'clubs', fill : 'striped', number: 1}
];

var CardGallery = React.createClass({
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
    render: function() {
		return (
			<div className="card-gallery">
				{this.getRows()}
      		</div>
		);
	}
});

var Card = React.createClass({
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
	render: function() {
        return (
        	<div className="card-block">
	            {this.numberSetUp()}
	        </div>
        );
    }

});

React.render(
  	<CardGallery />,
  	document.getElementById('content')
);

