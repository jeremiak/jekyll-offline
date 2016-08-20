var urlsToCache = [];

{% for post in site.posts %}
  urlsToCache.push("{{ post.permalink }}");
{% endfor %}

var x = '{{ site.offline }}';

{% for page in site.pages %}
  {% if page.permalink %}
    urlsToCache.push("{{ page.permalink }}");
  {% endif %}

  {% if page.url %}
    urlsToCache.push("{{ page.url }}");
  {% endif %}
{% endfor %}

var CACHE_NAME = '{{ site.title | slugify }}-cache-v1';

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(caches.open(CACHE_NAME).then(function(cache) {
    return cache.addAll(urlsToCache);
  }).catch(function(err) {
    console.log('cache add err', err);
  }));
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.match(event.request).then(function (response) {
        return response || fetch(event.request).then(function(response) {
          cache.put(event.request, response.clone());
          return response;
        });
      });
    })
  );
});

// strategies from the offline cookbook by jake archibald
// https://jakearchibald.com/2014/offline-cookbook/#serving-suggestions-responding-to-requests

{% assign strategy = site.offline.strategy | default: 'cache-then-network' %}
{% if strategy == 'cache-only' %}
  self.addEventListener('fetch', function(event) {
    // If a match isn't found in the cache, the response
    // will look like a connection error
    event.respondWith(caches.match(event.request));
  });
{% elsif strategy == 'network-only' %}
  self.addEventListener('fetch', function(event) {
    event.respondWith(fetch(event.request));
    // or simply don't call event.respondWith, which
    // will result in default browser behaviour
  });
{% elsif strategy == 'cache-first-network-fallback' %}
  self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request).then(function(response) {
        return response || fetch(event.request);
      })
    );
  });
{% elsif strategy == 'network-first-cache-fallback' %}
  self.addEventListener('fetch', function(event) {
    event.respondWith(
      fetch(event.request).catch(function() {
        return caches.match(event.request);
      })
    );
  });
{% elsif strategy == 'cache-network-race' %}
  // Promise.race is no good to us because it rejects if
  // a promise rejects before fulfilling. Let's make a proper
  // race function:
  function promiseAny(promises) {
    return new Promise((resolve, reject) => {
      // make sure promises are all promises
      promises = promises.map(p => Promise.resolve(p));
      // resolve this promise as soon as one resolves
      promises.forEach(p => p.then(resolve));
      // reject if all promises reject
      promises.reduce((a, b) => a.catch(() => b))
        .catch(() => reject(Error("All failed")));
    });
  };

  self.addEventListener('fetch', function(event) {
    event.respondWith(
      promiseAny([
        caches.match(event.request),
        fetch(event.request)
      ])
    );
  });
{% elsif strategy == 'cache-then-network' %}
  self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.open(CACHE_NAME).then(function(cache) {
        return fetch(event.request).then(function(response) {
          cache.put(event.request, response.clone());
          return response;
        });
      })
    );
  });
{% endif %}
