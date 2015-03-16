namespace :db do
  desc "Drop, create and remigrate the database"
  task :regenerate => :environment do
    # User.destroy_all
    Rake::Task['db:drop'].invoke
    Rake::Task['db:create'].invoke
    Rake::Task['db:migrate'].invoke
  end
    # Can also run a sh annotate optionally
end