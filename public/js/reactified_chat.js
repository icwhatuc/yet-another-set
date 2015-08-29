require.config({
  paths: {
    'jquery': '//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min',
    'underscore': '//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.5.2/underscore-min',
    'react': 'http://cdnjs.cloudflare.com/ajax/libs/react/0.12.2/react',
    'socketio': '/socket.io/socket.io'
  },
  shim: {
    'jquery': {
      exports: '$'
    },
    'underscore': {
      exports: '_'
    },
    'react': {
      exports: 'React'
    },
    'socketio': {
      exports: 'io'
    }
  }
})

define(['jquery', 'underscore', 'react', 'socketio', 'app'], function($, _, React, io, App) {
  console.log('app started on: ' + new Date());

  React.renderComponent(App(), document.getElementById('app'));

  var socket = io();
  socket.emit('log', { message: 'started web app'});
});