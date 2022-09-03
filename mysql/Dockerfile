FROM mysql

ENV MYSQL_ROOT_PASSWORD='pw'
ENV MYSQL_DATABASE='test'
ENV MYSQL_ROOT_HOST='%'
ENV MYSQL_USER='cms_user'
ENV MYSQL_PASSWORD='pw'

COPY ./init.sql /tmp

CMD [ "mysqld", "--init-file=/tmp/init.sql" ]