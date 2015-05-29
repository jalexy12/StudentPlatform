var Events = {

	studentCreate: function(student){
		dispatcher.trigger('student.create', student)
		console.log("Triggered")
	},

	studentIndex: function(){
		dispatcher.trigger('student.index')
	}
}
