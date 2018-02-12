FROM almir/webhook

COPY redeploy-chat.sh /usr/local/bin/redeploy-chat
RUN chmod +x /usr/local/bin/redeploy-chat
COPY hooks.json /etc/webhook/hooks.json

CMD ["-verbose", "-hooks=/etc/webhook/hooks.json", "-cert=/var/certs/cert1.pem", "-key=/var/certs/privkey1.pem", "-hotreload"]
