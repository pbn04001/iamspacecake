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

    server_name iamspacecake.com www.iamspacecake.com;
    return 301 https://www.iamspacecake.com$request_uri;
}

server {
    listen 443 ssl http2;
    server_name iamspacecake.com;

    # redirects non-www to www. wasn't work for me without this server block
    return 301 $scheme://www.iamspacecake.com$request_uri;
}

server {
	listen 443 ssl http2 default_server;
    listen [::]:443 ssl http2 default_server;

    ssl on;
    ssl_certificate /etc/ssl/cert_chain.crt;
    ssl_certificate_key /etc/ssl/iamspacecake_com.key;

    root /var/www/html/iamspacecake;
    index index.html;

    server_name www.iamspacecake.com;

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

