FROM php:8.0-apache

RUN docker-php-ext-install mysqli
RUN docker-php-ext-enable mysqli
RUN docker-php-ext-install pdo
RUN docker-php-ext-enable pdo
RUN docker-php-ext-install pdo_mysql
RUN docker-php-ext-enable pdo_mysql

RUN cp /etc/apache2/mods-available/rewrite.load /etc/apache2/mods-enabled/ && \
    cp /etc/apache2/mods-available/headers.load /etc/apache2/mods-enabled/

RUN apt-get update && apt-get upgrade -y

COPY / /var/www/html/