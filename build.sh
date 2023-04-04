#!/bin/bash -x

# build the frontend and backend and then push into docker container registry
# that is created in the terraform configuration

docker login --username "axwdgpdkjhye/syash12@gmail.com" \
              --password "${OCI_AUTH_TOKEN}" \
              us-chicago-1.ocir.io

cd backend
docker build -t us-chicago-1.ocir.io/axwdgpdkjhye/image-repo:backend .
docker push us-chicago-1.ocir.io/axwdgpdkjhye/image-repo:backend &

cd ../frontend
docker build -t us-chicago-1.ocir.io/axwdgpdkjhye/image-repo:frontend .
docker push us-chicago-1.ocir.io/axwdgpdkjhye/image-repo:frontend