var ComponentGallery = require("react-component-gallery");

var Cards = React.createClass({
	getInitialState : function() {
		return { data : [] };
	},
    render: function() {
		return (
			<div className="card-item">
        		{this.state.data}
      		</div>
		);
	}
});



