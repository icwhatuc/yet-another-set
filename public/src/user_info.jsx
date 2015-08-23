var user_data = [ { name : 'user_1', score : '', status : 'ready' }, { name : 'user_2', score : '', status : 'waiting' } ];

var User = React.createClass({
	getInitialState : function() {
		return { 
			user_data : user_data
		};
	},
	render : function() {
		var userList = this.state.user_data.map(function (user) {
			return (
				<div className="user-info">
					<dt className="user-name">
						{user.name}
					</dt>
					<dd className="user-status">
						{user.status}
					</dd>
				</div>
			)
		});
		return (
		    <dl className="user-list">
		        {userList}
		    </dl>
	    );
	}
});

var UserBlock = React.createClass({
	getInitialState : function() {
		return { data : [] };
	},
    render : function() {
		return (
			<div className="user-block">
        		<User />
      		</div>
		)
	}
});

React.render(
  	<UserBlock />,
  	document.getElementById('content')
);