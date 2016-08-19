# jekyll-offline

ruby gem/jekyll plugin to use service workers and make site content available offline

Many thanks to @gauntface since the service worker code is nearly wholesale copied from this [HTML 5 Rocks service worker tutorial]( http://www.html5rocks.com/en/tutorials/service-worker/introduction/).

## Installation

Add this line to your application's Gemfile:

```ruby
group 'jekyll-plugins' do
  gem 'jekyll-offline', :git => 'git://github.com/jeremiak/jekyll-offline.git'
end
```

And add this to your `_config.yml`:

```ruby
gems: ['jekyll-offline']
```

And then execute:

    $ bundle install

## Usage

The plugin does most of the work for you, but you have to initialize the service worker on the page with the `{% register_service_worker %}` liquid tag. It is generally a good idea to put this near the bottom of your default layout so that all pages have it.

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/[USERNAME]/jekyll-offline. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [Contributor Covenant](contributor-covenant.org) code of conduct.


## License

The gem is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).
