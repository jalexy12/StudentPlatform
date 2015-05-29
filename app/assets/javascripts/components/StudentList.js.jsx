var StudentList = React.createClass({

	getInitialState: function(){
		return{
			events: Events,
			students: []
		}
	},

	createStudent: function(student){
		this.state.events.studentCreate(student)
		getStudents();
	},

	getStudents: function(){
		$.ajax({
			url: '/allstudents',
			success: function(data){
			  this.setState({
			  	students: data,
			  })
			}.bind(this), 
			 error: function(xhr, status, err) {
			 	  console.error(this.props.url, status, err.toString());
		    }.bind(this)
		})
	},


	componentDidMount: function(){
		dispatcher = new WebSocketRails('localhost:3000/websocket');

		dispatcher.on_open = function(data) {
		  console.log('Connection has been established: ', data);
		  // You can trigger new server events inside this callback if you wish.
		}

		//bindings
		dispatcher.bind('student.create_success', this.updateState)
		this.getStudents();
	},

	setEnrolled: function(){
		var enrolledStudents = _.where(this.state.students, {enrolled: true})

		this.setState({
			students: enrolledStudents
		})
	},

	setNotEnrolled: function(){
		this.getStudents();
		var unenrolledStudents = _.where(this.state.students, {enrolled: false})

		this.setState({
			students: unenrolledStudents
		})
	},

	render: function(){
		props = this.props
		studentNodes = this.state.students.map(function(student){
			  if (student.name.indexOf(this.props.filterText) === -1){
				 return 
			  }else{
			  	 return <Student key={student.id} student={student} />
			  }
			})
		return(
			   <div>
			   		<div className="row center-align">
			   		  <div className="col s4"><a className="waves-effect btn" onClick={this.getStudents}>All</a></div>
			   		  <div className="col s4"><a className="waves-effect btn" onClick={this.setEnrolled}>Enrolled</a></div>
			   		  <div className="col s4"><a className="waves-effect btn" onClick={this.setNotEnrolled}>Not Enrolled</a></div>
			   		</div>
				    <div className="row">
					  {studentNodes}
				   </div>
			   </div>
			   )
	}
})