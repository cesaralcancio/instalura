docker rm $(docker ps -a -q)
docker-compose up -d
nohup java -jar -Dspring.datasource.password=password instalura.jar > instalura_backend.log &
curl http://localhost:8080/gera/dados
