Rails.application.routes.draw do
  get 'student_websockets/create'
  get '/allstudents' => "students#all_students"
  resources :students
  devise_for :users
  
end
