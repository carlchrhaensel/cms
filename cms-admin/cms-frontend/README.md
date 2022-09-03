# cms-frontend

## config-files for local development

### Apache: C:\xampp\apache\conf\extra\httpd-vhosts.conf
All other requests except customer.cms
```
<VirtualHost *:80>
    DocumentRoot "C:/xampp/htdocs"
    ServerName localhost
    <Directory "C:/xampp/htdocs/">
	AllowOverride All
	Allow from All
    </Directory>
</VirtualHost>
```

customer.cms Requests
```
<VirtualHost *:80>
    DocumentRoot "C:\xampp\htdocs\cms-customer"
    ServerName customer.cms
    <Directory "C:\xampp\htdocs\cms-customer">
    </Directory>
</VirtualHost>
```

### Windows: C:\Windows\System32\drivers\etc\hosts
```
127.0.0.1 customer.cms
```

### C:/xampp/phpMyAdmin/config.inc.php

```
$i++;
$cfg['Servers'][$i]['host'] = 'localhost:3308'; //provide hostname and port if other than default
$cfg['Servers'][$i]['user'] = 'root';   //user name for your remote server
$cfg['Servers'][$i]['password'] = 'helloworld';  //password
$cfg['Servers'][$i]['auth_type'] = 'config';       // keep it as config
```

## Docker build
```
docker build -t cms-frontend .
```