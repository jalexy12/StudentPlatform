class AddColumnsToStudents < ActiveRecord::Migration
  def change
    add_column :students, :image, :string
    add_column :students, :skill_level, :string
    add_column :students, :enrolled, :boolean, default: false
  end
end
