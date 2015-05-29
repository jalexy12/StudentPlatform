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
		<div className="container">
		  <NavSearch filterText={this.state.filterText} onUserInput={this.handleUserInput}  />
		  <StudentList
		    filterText={this.state.filterText} />
		</div>)
	}
})