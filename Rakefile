namespace :jekyll do
  desc 'serve'
  task :serve do
    sh "bundle install --path vendor/bundle"
    sh "bundle exec jekyll serve --trace"
  end

  # desc 'setup'
  # task :setup do
  #   sh "bundle exec rake -f ./lib/tasks/category.rake category:create"
  #   sh "bundle exec rake -f ./lib/tasks/thumbnail.rake thumbnail:create"
  # end
end
