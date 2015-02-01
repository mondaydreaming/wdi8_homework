### Plugins ###

require 'sinatra' # deployment necessary
require 'sinatra/reloader' 
require 'pry'
require 'active_record'
require 'sqlite3'

### Active Record Set Up ###
ActiveRecord::Base.logger = Logger.new(STDERR)
ActiveRecord::Base.establish_connection(
    :adapter => 'sqlite3',
    :database => 'posts.db'
    )
ActiveRecord::Base.default_timezone = :local

require_relative 'post'
### Error Check ###

get '/pry' do
    binding.pry
end

### All pages ###

before do
    @topics = Post.select(:topic).uniq
end

after do
    ActiveRecord::Base.connection.close
end

### Home Page ###

get '/' do
    erb :home
end

### Index ###

get '/posts' do
    @allposts = Post.all
    @posts = @allposts.order(:created_at)
    erb :index
end

### Posts by topic ###

get '/posts/topic/:topic_name' do
    @posts = Post.where(:topic => params[:topic_name])
    erb :index
end

### CREATE post ###

get '/posts/create' do
    erb :create
end

post '/posts' do
    post = Post.new
    post.title = params[:title]
    post.entry = params[:entry]
    post.image = params[:image]
    post.topic = params[:topic]

    post.save

    redirect to('/posts/#{post.id}')
end

### READ post ###

get '/posts/:id' do
    @post = Post.find_by(:id => params[:id])
    @time = @post.created_at.to_time.strftime("Created on %A, %e %B %Y at %I:%M%p")
    @updatetime = @post.updated_at.to_time.strftime("Updated on %A, %e %B %Y at %I:%M%p")
    erb :read
end

### EDIT post ###

get '/posts/:id/edit' do
    @post = Post.find params[:id]
    erb :edit
end

post '/posts/:id' do
    post = Post.find params[:id]
    post.title = params[:title]
    post.entry = params[:entry]
    post.image = params[:image]
    post.topic = params[:topic]

    post.save

    redirect to("/posts/#{post.id}")
end

### DELETE post ###

get '/posts/:id/delete' do
    post = Post.find params[:id]
    post.destroy
    redirect to('/posts')
end

### END ###
