## Introduction:
Front-end project of xunwu online shopping mall system, based on HTML + jQuery, including user information, commodity release, commodity display, shopping cart and other modules. <br>
Back-end project: https://github.com/Freyyyyyyy/xun-wu

## Development Environment
| |version|download|
|:---|:---|:---|
|JDK|11|https://www.oracle.com/java/technologies/downloads/#java11|
|Mysql|8.0|https://dev.mysql.com/downloads/installer/|
|Nginx|1.20.2|http://nginx.org/en/download.html|

## Deployment
### Local Deployment
#### Please build the back-end project first：
https://github.com/Freyyyyyyy/xun-wu
#### Nginx
* Install Nginx1.20.2：http://nginx.org/en/download.html
* Clone the project to the `nginx-1.20.2/html` folder
* Modify `nginx-1.20.2/conf/nginx.conf` as follows:
```

worker_processes  1;

events {
    worker_connections  1024;
}

http {
    include       mime.types;
    default_type  application/octet-stream;

    sendfile        on;

    keepalive_timeout  65;
    
    client_max_body_size 10m;

    server {
        listen       7000; 
        server_name  localhost;

        proxy_set_header Cookie $http_cookie;
        proxy_set_header X-Forwarded-Host $host;
        proxy_set_header X-Forwarded-Server $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

        location /api/ {              
               proxy_pass http://localhost:8080/;        
        }
        
        location / {
               root   html; 
               index  index.html index.htm;  
        }           
        
    }
    
    server{
        listen  7070;
        server_name  localhost;

	    location /uploadProdPics/ {
		root D:/project/xun-wu;
		#autoindex on;
	    }
    }

}

```
Note: Please modify this line to the root path of your back-end project <br>
![image](https://user-images.githubusercontent.com/103989093/166082568-bc09727c-3c68-4014-a4a7-d6617623b742.png) <br>

#### Initiate
* start nginx
* Access: http://localhost:7000/xun-wu-front/html/index2试验.html
