#!/bin/sh
mongoexport -h 120.55.240.129:26103 -d participant -c participants -f userName,phone,createTime,rewardFlag --type=csv -o ./user-all.csv




