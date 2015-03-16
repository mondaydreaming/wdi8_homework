# rake twitter:clear
namespace :twitter do
  desc "Clear the user and tweet tables"
  task :clear => :environment do
    User.destroy_all
    Tweet.destroy_all
  end

  desc "Creates test data with fake Latin tweets"
  task :posts, [:user_count] => :environment do |t, args| #[:user_count] means this task can accept a parameter t= task itself, args is all of the users arguments
    FactoryGirl.create_list :user_with_tweets, args[:user_count].to_i
  end

  desc "Search Twitter for a query and a number of tweets"
  task :search,[:query, :limit] => :environment do |t, args|
    $client.search("to:#{args[:query]}", result_type: "recent").take(args[:limit].to_i).collect do |tweet|
      Tweet.create(:post => tweet.text)
    end
  end
end

