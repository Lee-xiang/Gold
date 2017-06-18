#! /usr/bin/expect -f
spawn bash -c "scp -r test/* root@120.55.240.129:/usr/share/nginx/html/test"
expect "*password:"
send "sMtiX:v4\n"
expect eof