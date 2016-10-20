# jekyll-offline

ruby gem/jekyll plugin to use service workers and make site content available offline. When visitors load a site, the service worker will be registered and cache content on their device, enabling people to read the content offline/without a network connection.

Many thanks to @gauntface and @jakearchibald for two great resources on Service Workers:
* [HTML 5 Rocks service worker tutorial]( http://www.html5rocks.com/en/tutorials/service-worker/introduction/)
* [Offline cookbook](https://jakearchibald.com/2014/offline-cookbook)

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

You can use a variety of strategies to respond to requests. These strategies were pulled from [the offline cookbook](https://jakearchibald.com/2014/offline-cookbook/#serving-suggestions-responding-to-requests) with minimal changes.

Configure `jekyll-offline` to use a given strategy by adding the following to your `_config.yml`:
```
...
offline:
  strategy: << whatever you want >>
```

You can supply the following options as the value for `strategy`:
* `cache-only`
* `network-only`
* `cache-first-network-fallback`
* `network-first-cache-fallback`
* `cache-network-race`
* `cache-then-network` (default)

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/[USERNAME]/jekyll-offline. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [Contributor Covenant](contributor-covenant.org) code of conduct.


## License

The gem is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).
