#!/bin/bash

ls -al /var

PROJECT_PATH="/var/www"
COMMIT_ID=$1
PUSHER_NAME=$2

su -c "cd $PROJECT_PATH; artisan down; git pull; composer install; artisan up" -s /bin/bash laradock
