docker rm $(docker ps -a -q)
docker-compose up -d
java -jar -Dspring.datasource.password=password instalura.jar
curl http://localhost:8080/gera/dados
