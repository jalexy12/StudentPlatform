var Events = {

	studentCreate: function(student){
		dispatcher.trigger('student.create', student)
		console.log("Triggered")
	},

	studentIndex: function(){
		dispatcher.trigger('student.index')
	}
}


var StudentComponent = React.createClass({

	getInitialState: function(){
		return{
			events: Events,
			students: []
		}
	},

	createStudent: function(){
		this.state.events.studentCreate(Student)
	},

	getStudents: function(students){
		this.state.events.studentIndex
		this.setState({
			students: students
		})
	},

	componentDidMount: function(){
		dispatcher.on_open = function(data) {
		  console.log('Connection has been established: ', data);
		  // You can trigger new server events inside this callback if you wish.
		}

		//bindings
		dispatcher.bind('student.create_success', this.getStudents(message))
		dispatcher.bind('student.all_students', this.getStudents(message))
		this.getStudents();
	},

	render: function(){
		console.log(this.state.events);
		return(<div><h1>Hello world</h1></div>)
	}
})