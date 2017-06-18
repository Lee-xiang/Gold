#!/bin/sh

echo -n "请输入开始时间:(格式：2017-06-01 16:30:00) "
read startTime
echo "你输入的开始日期为：$startTime"
echo -n "请输入结束时间:(格式：2017-06-02 16:30:00) "
read endTime
echo "你输入的结束日期为：$endTime"

query="{createTime:{\"\$gt\":\"$startTime\",\"\$lte\":\"$endTime\"}}"

mongoexport -h 120.55.240.129:26103 -d participant -c participants -f userName,phone,createTime,rewardFlag --type=csv -o ./user.csv -q "$query"




