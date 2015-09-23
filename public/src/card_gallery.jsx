var event_constants = require('./constants.js').event_constants;

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
		return { data : [], selectedCards : [] };
	},
	componentDidMount: function() {
		var self = this;
		socket.on(event_constants.UPDATE_BOARD, function (board) {
            for(var k = 0; k < board.length; k++)
            {
                var card = board[k];
                card.color = card_map.color[card._color];
                card.shape = card_map.shape[card._shape];
                card.fill = card_map.fill[card._fill];
                card.number = card._number;
                card.index = card._index;
            }
			self.setState({data : board});
		});
        
        socket.on(event_constants.SET_SUBMISSION_RESULT, function(is_set) {
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

		var found = 0;

		for (var i = 0; i < this.state.selectedCards.length; i++) {
			if (this.state.selectedCards[i].index == selectHash.index) {
				this.state.selectedCards.splice(i, 1);
				found = 1;
			}
		}

		if (!found) {
			this.state.selectedCards.push(selectHash);
		}

		if (this.state.selectedCards.length === 3) {
			//send info to server
            var selectedCardsNumberForm = [];
            var selectedCardsIndices = [];
            for(var ii=0; ii<3; ++ii) // 3 cards in one set
            {
                var selectedCardNumberForm =  {
                    index: this.state.selectedCards[ii].index
                };
                selectedCardsNumberForm.push(selectedCardNumberForm);
                selectedCardsIndices.push(this.state.selectedCards[ii].index);
            }

            var data = {
                selectedCards: selectedCardsNumberForm,
                indices:selectedCardsIndices,
                gameId: this.props.id
            };

            socket.emit(event_constants.USER_SUBMITS_SET, data);

            this.setState({selectedCards : []});
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
		var game_board = [];
		var board_cards = this.state.data.slice(0);
		var cards_per_row = board_cards.length/3;
        var card_rows = [];
        
		while(board_cards.length > 0) card_rows.push(board_cards.splice(0, cards_per_row));

        for(var k = 0; k < card_rows.length; k++)
        {
            var card_row = card_rows[k];
            var board_row = [];
            for(var l = 0; l < card_row.length; l++)
            {
                var card = card_row[l];
                console.log(card);
                board_row.push(
    			    <Card key={[card.index.toString() + Math.random()].join('-')} color={card.color} shape={card.shape} fill={card.fill} number={card.number} index={card.index}/>
                );
            }

            game_board.push(
    			<div className="card-row clearfix">
    				{board_row}
    			</div>
            );
        }
    	
        return (
			<div className="card-gallery" onClick={this.handleChildClick}>
				{game_board}
      		</div>
		);
	}
});

var Card = React.createClass({
	getInitialState: function() {
		return { selected : false};
	},
	componentWillReceiveProps: function() {
		this.setState({ selected : false });
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
		if (this.state.selected === false)
			this.setState({ selected : true });
		else
			this.setState({ selected : false });

        e.target = React.findDOMNode(this.refs[this.props.index.toString() + '-0']); // React.Children.only(this.props.children); // TODO: hack - the target can be the card or one of the sub divs in the card but need the target to be a card
	},
	render: function() {
		var classString = 'card-block';

		if (this.state.selected == true)
			classString += ' ' + 'selected';

        return (
        	<div className={classString} onClick={this.childClick}>
	            {this.numberSetUp()}
	        </div>
        );
    }
});

