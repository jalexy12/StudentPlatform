var Student = React.createClass({

	enrollStudent: function(student){
		console.log(student)
	},
	
	render: function(){
		var email = "mailto:" + this.props.student.email
			return(
		        <div className="col s4">
		          <div className="card blue-grey darken-1">
		            <div className="card-content white-text">
		              <span className="card-title">{this.props.student.name}</span>
		              <span className="right"><img className="user_avatar" src={this.props.student.image} /></span>
		              <p>I am a very simple card. I am good at containing small bits of information.
		              I am convenient because I require little markup to use effectively.</p>
		            </div>
		            <div className="card-action">
		              <div>
		                <a href={email}>Email</a>
		                <i className="mdi-content-add" onClick={this.enrollStudent()}></i>
		              </div>
		            </div>
		          </div>
		        </div>
		      )

	}
})