JOB=`docker run -itd wernight/phantomjs`
cat ./src.js | docker exec -i $JOB phantomjs
echo "EXITING"
docker stop $JOB
