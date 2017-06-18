#! /usr/bin/expect -f
spawn bash -c "scp -r dist/* root@120.55.240.129:/usr/share/nginx/html/"
expect "*password:"
send "sMtiX:v4\n"
expect eof