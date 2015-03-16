FactoryGirl.define do
  factory :user do |f|
    f.sequence(:name) { Faker::Name.name }
    f.sequence(:email) {Faker::Internet.email}
    # f.sequence(:email) { |n| "george#{n}@best.com"}

    factory :user_with_tweets do |f|
      after(:create) do |u|
        FactoryGirl.create_list :tweet, Random.rand(10..100), :user => u
      end
    end

  end

  factory :tweet do |f|
    f.sequence(:post) {Faker::Lorem.sentence}
  end
end