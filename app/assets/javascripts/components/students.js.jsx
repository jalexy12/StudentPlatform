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

	createStudent: function(student){
		this.state.events.studentCreate(student)
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

	addStudent: function(students){
		return this.setState({
			students: students
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
		studentNodes = this.state.students.map(function(student){
			return(
		        <div className="col s4">
		          <div className="card blue-grey darken-1">
		            <div className="card-content white-text">
		              <span className="card-title">{student.name}</span>
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
		})
		return(
			  <div>
			   <NavSearch />
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

	getInitialState: function(){
		return {userInput: ''}
	},

	handleChange: function(e){
		this.setState({userInput: e.target.value}) 
	},

	clearAndFocusInput: function() {
	    this.setState({userInput: ''}, function() {
	      React.findDOMNode(this.refs.searchInput).focus();
	    });
	  },

	render: function(){
		return( 
		   <nav className="blue-grey">
		    <div className="nav-wrapper">
		      <form>
		        <div className="input-field">
		          <input id="search" type="search" ref="searchInput" value={this.state.userInput} onChange={this.handleChange} required />
		          <label for="search"><i className="mdi-action-search"></i></label>
		          <i className="mdi-navigation-close" onClick={this.clearAndFocusInput}></i>
		        </div>
		      </form>
		    </div>
		  </nav>)
	}
})