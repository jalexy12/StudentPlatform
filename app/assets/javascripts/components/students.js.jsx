var Events = {

	studentCreate: function(student){
		dispatcher.trigger('student.create', student)
		console.log("Triggered")
	},

	studentIndex: function(){
		dispatcher.trigger('student.index')
	}
}

var Student = React.createClass({
	render: function(){
			return(
		        <div className="col s4">
		          <div className="card blue-grey darken-1">
		            <div className="card-content white-text">
		              <span className="card-title">{this.props.student.name}</span>
		              <p>I am a very simple card. I am good at containing small bits of information.
		              I am convenient because I require little markup to use effectively.</p>
		            </div>
		            <div className="card-action">
		              <a href="#">This is a link</a>
		              <a href='#'>This is a link</a>
		            </div>
		          </div>
		        </div>
		      )

	}
})


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

	render: function(){
		props = this.props
		studentNodes = this.state.students.map(function(student){
			  if (student.name.indexOf(this.props.filterText) === -1){
				 return 
			  }else{
			  	 return <Student student={student} />
			  }
			})
		return(
			  <div>
			     <div className="container">
				    <div className="row">
					  {studentNodes}
				   </div>
			     </div>
			   </div>
			   )
	}
})

var NavSearch = React.createClass({


	handleChange: function(e){
		this.props.onUserInput(
	    	this.refs.searchInput.getDOMNode().value
	    	)
	},

	render: function(){
		return( 
		   <nav className="blue-grey">
		    <div className="nav-wrapper">
		      <form>
		        <div className="input-field">
		          <input 
		           id="search"
		           type="search"
		           ref="searchInput" 
		           value={this.props.userInput} 
		           onChange={this.handleChange}
		           required />
		          <label for="search"><i className="mdi-action-search"></i></label>
		          <i className="mdi-navigation-close" onClick={this.clearAndFocusInput}></i>
		        </div>
		      </form>
		    </div>
		  </nav>)
	}
})

var searchableStudentList = React.createClass({

	getInitialState: function() {
	     return {
	         filterText: '',
	     };
	 },

	 handleUserInput: function(filterText, inStockOnly) {
	     this.setState({
	         filterText: filterText,
	         inStockOnly: inStockOnly
	     });
	 },

	render: function(){
		return(
		<div>
		  <NavSearch filterText={this.state.filterText} onUserInput={this.handleUserInput}  />
		  <StudentList
		    filterText={this.state.filterText} />
		</div>)
	}
})