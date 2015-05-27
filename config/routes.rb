Rails.application.routes.draw do
  get 'student_websockets/create'

  resources :students
  devise_for :users
  
end
