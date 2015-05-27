class StudentsController < ApplicationController
	def index 

	end

	 def all_students
	 	students = Student.all
		render json: students
	 end

end
