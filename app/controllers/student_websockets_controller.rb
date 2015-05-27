class StudentWebsocketsController < WebsocketRails::BaseController
  def create
  	puts "hELLLLLLO"
  	student = Student.new message
  	if student.save
  	  send_message :create_success, student, :namespace => :tasks
  	else
  	  send_message :create_fail, student, :namespace => :tasks
  	end
  end
end
