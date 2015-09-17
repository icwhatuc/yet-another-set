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

var card_num_map = {
	shape : { 'clubs':1, 'diamonds':2, 'spades':3 },
	fill : { 'striped':1, 'empty':2, 'solid':3 },
	color : { 'blue':1, 'red':2, 'green':3 }
};

var CardGallery = module.exports = React.createClass({
	getInitialState : function() {
		this.selectedCards = [];

		return { data : cards_data.slice(0) };
	},
	componentDidMount: function() {
		var self = this;
		socket.on(event_constants.UPDATE_BOARD, function (board) {
			/*
            var cards_data = board.map(function(c) {
				return { color: card_map.color[c._color], shape: card_map.shape[c._shape], fill: card_map.fill[c._fill], number: c._number };
			});
            */
            console.log(board);
            for(var k = 0; k < board.length; k++)
            {
                var card = board[k];
                card.color = card_map.color[card._color];
                card.shape = card_map.shape[card._shape];
                card.fill = card_map.fill[card._fill];
                card.number = card._number;
            }
			self.setState({data : board});
		});
        
        console.log("registering: ", event_constants.SET_SUBMISSION_RESULT);
        socket.on(event_constants.SET_SUBMISSION_RESULT, function(is_set) {
            console.log("IS SET? ", is_set);
            if(!is_set) self.setState({ data : self.state.data });
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
    			cards.push( <Card color={card.color} shape={card.shape} fill={card.fill} number={card.number} index={card._index} />);
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
        console.log(selectHash);
		this.selectedCards.push(selectHash);

		if (this.selectedCards.length === 3) {
			//send info to server
            var selectedCardsNumberForm = [];
            var selectedCardsIndices = [];
            for(var ii=0; ii<3; ++ii) // 3 cards in one set
            {
                var selectedCardNumberForm =  {
                    color: card_num_map.color[this.selectedCards[ii].color],
                    fill: card_num_map.fill[this.selectedCards[ii].fill],
                    shape: card_num_map.shape[this.selectedCards[ii].shape], 
                    number: this.selectedCards[ii].number,
                    index: this.selectedCards[ii].index,
                    fake_key: 'some value',
                };
                selectedCardsNumberForm.push(selectedCardNumberForm);
                selectedCardsIndices.push(this.selectedCards[ii].index);
            }

            console.log(selectedCardsNumberForm);

            var data = {
                selectedCards: selectedCardsNumberForm,
                indices:selectedCardsIndices,
                gameId: this.props.id
            };

            socket.emit(event_constants.USER_SUBMITS_SET, data);
        }
	},
	formSelectHash: function(string) {
		var classes = string.split(' ');
		classes.shift();

		var hash = {};
		hash['color'] = classes[0];
		hash['fill'] = classes[1];
		hash['shape'] = classes[2];
        hash['index'] = classes[4].substring(6);

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

		var indexString = "index-" + this.props.index;
        var classString = ['card', this.props.color, this.props.fill, this.props.shape, numberText, indexString].join(' ');

		var itemDiv = [];
		for (var i = 0; i < number; i++) {
			itemDiv.push( <div className={classString} data-index={this.props.index} ref={this.props.index + '-' + i.toString()} ></div> );
		}

		return ( 
			<div className="centercolumn" data-child-classes={classString} >
				{itemDiv}
			</div>
		)
	},
	childClick: function(e) {
		if (this.state.selected == false)
			this.setState({selected : true});
		else
			this.setState({selected : false});
        
        e.target = React.findDOMNode(this.refs[this.props.index.toString() + '-0']); // React.Children.only(this.props.children); // TODO: hack - the target can be the card or one of the sub divs in the card but need the target to be a card
	},
	render: function() {
		var classString = 'card-block';

		if (this.state.selected)
			classString += ' ' + 'selected';

        return (
        	<div className={classString} onClick={this.childClick} data-child-ref={this.props.index}>
	            {this.numberSetUp()}
	        </div>
        );
    }
});

