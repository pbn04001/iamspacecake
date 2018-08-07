##
# You should look at the following URL's in order to grasp a solid understanding
# of Nginx configuration files in order to fully unleash the power of Nginx.
# http://wiki.nginx.org/Pitfalls
# http://wiki.nginx.org/QuickStart
# http://wiki.nginx.org/Configuration
#
# Generally, you will want to move this file somewhere, and start with a clean
# file but keep this around for reference. Or just disable in sites-enabled.
#
# Please see /usr/share/doc/nginx-doc/examples/ for more detailed examples.
##

# Default server configuration
#
server {
	listen 80;
    listen [::]:80;

    root /var/www/html/iamspacecake-test;
    index index.html;

    server_name testing123.iamspacecake.com;

    location / {
      try_files $uri /index.html;
    }

    location /content/ {
        proxy_pass  http://127.0.0.1:8082/drupal/;
    }

    location /api/ {
        proxy_pass  http://127.0.0.1:8000/;
    }

    error_page   500 502 503 504  /50x.html;
}

