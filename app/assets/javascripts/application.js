// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require react
//= require react_ujs
//= require components
//= require react_router.min
//= require websocket_rails/main
//= require_tree .


dispatcher = new WebSocketRails('localhost:3000/websocket');

$(function() {

dispatcher.on_open = function(data) {
  console.log('Connection has been established: ', data);
  // You can trigger new server events inside this callback if you wish.
}
	
var task = {
  name: 'Start taking advantage of WebSockets',
}


dispatcher.trigger('student.create', task);

dispatcher.bind('student.create_success', function(task) {
  console.log('successfully created ' + task.name);
});

});
