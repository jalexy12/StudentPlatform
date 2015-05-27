class StudentWebsocketsController < WebsocketRails::BaseController
 

  def create
  	student = Student.new message
  	if student.save
  	  send_message :create_success, student, :namespace => :student
  	else
  	  send_message :create_fail, student, :namespace => :student
  	end
  end
end
