/** @jsx React.DOM */
define(['react', 'underscore', 'socketio'], function(React, _, io) {
  return React.createClass({
    getInitialState: function() {
      return {
        data: []
      };
    },
    componentWillMount: function() {
    },
    render: function() {
      var self = this;
      // var notes = this.state.data.map(function (note) {
      //   return <Note data={note} markNoteAsRead={self.markNoteAsRead} />;
      // });
      return (
        <ul className="pages">
			<li className="chat page">
				<div className="chatArea">
					<ul className="messages"></ul>
				</div>
				<input className="inputMessage" placeholder="Type here..."/>
			</li>
			<li className="login page">
				<div className="form">
					<h3 className="title">What's your nickname?</h3>
					<input className="usernameInput" type="text" maxlength="14" />
				</div>
			</li>
		</ul>
      );
    }
  });
});