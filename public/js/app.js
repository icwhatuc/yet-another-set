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
        React.createElement("ul", {className: "pages"}, 
			React.createElement("li", {className: "chat page"}, 
				React.createElement("div", {className: "chatArea"}, 
					React.createElement("ul", {className: "messages"})
				), 
				React.createElement("input", {className: "inputMessage", placeholder: "Type here..."})
			), 
			React.createElement("li", {className: "login page"}, 
				React.createElement("div", {className: "form"}, 
					React.createElement("h3", {className: "title"}, "What's your nickname?"), 
					React.createElement("input", {className: "usernameInput", type: "text", maxlength: "14"})
				)
			)
		)
      );
    }
  });
});