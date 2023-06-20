build-client:
	docker build -t pmtool-client ./client
run-client:
	docker run -d -p 3000:3000 --env-file ./client/.env --rm --name pmtool-client pmtool-client
stop-client:
	docker stop pmtool-client
clear-client:
	docker rm pmtool-client && docker rmi pmtool-client

build-server:
	docker build -t pmtool-server ./server
run-server:
	docker run -d -p 8000:8000 --env-file ./server/.env --rm --name pmtool-server pmtool-server
stop-server:
	docker stop pmtool-server
clear-server:
	docker rm pmtool-server && docker rmi pmtool-server

compose-up:
	docker-compose up -d
compose-down:
	docker-compose down --rmi all -v --remove-orphans


