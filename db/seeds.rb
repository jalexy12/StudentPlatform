# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', csity: cities.first)

100.times do 
	Student.create(name: Faker::Name.name, email: Faker::Internet.email)
end

students = Student.all

students.each do |student|
	student.image = Faker::Avatar.image
	student.save
end