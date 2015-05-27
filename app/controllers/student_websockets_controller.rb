class StudentWebsocketsController < WebsocketRails::BaseController
  def index
  	students = Student.all
  	if students.present?
  		send_message :all_students, students, :namespace => student
  	end
  end

  def create
  	student = Student.new message
  	if student.save
  	  send_message :create_success, student, :namespace => :student
  	else
  	  send_message :create_fail, student, :namespace => :student
  	end
  end
end
