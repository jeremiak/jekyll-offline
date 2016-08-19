require 'jekyll'
require 'liquid'

module JekyllOffline
  class JavaScriptFile < Jekyll::Page
    def read_yaml(*)
      @data ||= {}
    end
  end

  class ServiceWorkerGenerator < Jekyll::Generator
    def generate(site)
      service_worker_source = File.join(File.dirname(__FILE__), '..', 'sw.js');
      service_worker_file = JavaScriptFile.new(site, File.dirname(__FILE__), '', 'sw.js')
      service_worker_file.content = File.read service_worker_source
      service_worker_file.data["layout"] = nil
      service_worker_file.render({}, site.site_payload)
      site.pages << service_worker_file
    end
  end

  class ServiceWorkerRegistrationTag < Liquid::Tag
    def render(context)
      html = ''
      html << '<script>'
      html << 'if ("serviceWorker" in navigator) {'
      html << 'navigator.serviceWorker.register("/sw.js").then(function(registration) {'
      html << 'console.log("ServiceWorker registration successful with scope: ",    registration.scope);'
      html << '}).catch(function(err) {'
      html << 'console.log("ServiceWorker registration failed: ", err);'
      html << '});'
      html << '}'
      html << '</script>'
      html
    end
  end

end

Liquid::Template.register_tag('register_service_worker', JekyllOffline::ServiceWorkerRegistrationTag)
