#!/bin/bash

error() {
    (set +x; tput -Tscreen bold
    tput -Tscreen setaf 1
    echo $*
    tput -Tscreen sgr0) >&2
}

get_certificate() {
    echo "Getting certificate for domain $1 on behalf of user $2"
    certbot certonly --agree-tos --keep -n --text --email $2 --server \
        https://acme-v01.api.letsencrypt.org/directory -d $1 --http-01-port 1337 \
        --standalone --standalone-supported-challenges http-01 --debug
}

if [ -z "$EMAIL" ]; then
    error "CERTBOT_EMAIL environment variable undefined; certbot will do nothing"
    exit 1
fi

if [ -f "/var/certs/cert1.pem" ] || [ -f "/var/certs/privkey1.pem" ]; then
    error "Certificates already received."
    exit 1
fi

letsencrypt certonly --webroot -w /var/www/letsencrypt -d "$CN" --agree-tos --email "$EMAIL" --non-interactive --text

cp /etc/letsencrypt/archive/"$CN"/cert1.pem /var/certs/cert1.pem
cp /etc/letsencrypt/archive/"$CN"/privkey1.pem /var/certs/privkey1.pem
cp /etc/letsencrypt/archive/"$CN"/fullchain1.pem /var/certs/fullchain1.pem
