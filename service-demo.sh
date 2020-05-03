#!/bin/sh

#define FOREGROUND_COL_BLUE             "34"

# Demo of metric service

HOST=http://localhost:8000

POST_1="${HOST}/metric/test" POST_BODY_1='{ "value": "10" }'
POST_2="${HOST}/metric/test" POST_BODY_2='{ "value": "1" }'
POST_3="${HOST}/metric/prod" POST_BODY_3='{ "value": "25" }'
POST_4="${HOST}/metric/test" POST_BODY_4='{ "value": "10" }'
GET_1="${HOST}/metric/test"
GET_2="${HOST}/metric/test/sum"
GET_3="${HOST}/metric/test/sum"

printf "\n%sPOST %s %s \n" "$FOREGROUND_COL_BLUE" "$POST_1" "$POST_BODY_1"
curl -H "Content-Type: application/json" --request POST --data "${POST_BODY_1}" "${POST_1}"

printf "\nWait 5 seconds to make time diference between requests"
sleep 5

printf "\nPOST %s %s \n" "$POST_2" "$POST_BODY_2"
curl -H "Content-Type: application/json" --request POST --data "${POST_BODY_2}" "${POST_2}"
sleep 1
printf "\nPOST %s %s \n" "$POST_3" "$POST_BODY_3"
curl -H "Content-Type: application/json" --request POST --data "${POST_BODY_3}" "${POST_3}"
sleep 1
printf "\nPOST %s %s \n" "$POST_4" "$POST_BODY_4"
curl -H "Content-Type: application/json" --request POST --data "${POST_BODY_4}" "${POST_4}"
sleep 1
printf "\nGET: %s \n" "$GET_1"
curl -H "Content-Type: application/json" --request GET "${GET_1}"
sleep 1
printf "\nGET: %s \n" "$GET_2"
curl -H "Content-Type: application/json" --request GET "${GET_2}"

printf "\nWait 5 more seconds to outdate first metric"
sleep 5

printf "\nGET: %s \n" "$GET_3"
curl -H "Content-Type: application/json" --request GET "${GET_3}"

printf "\n"
