#!/bin/bash -x

# build the frontend and backend and then push into docker container registry
# that is created in the terraform configuration

docker login --username "${OCI_USERNAME}" \
              --password "${OCI_AUTH_TOKEN}" \
              us-chicago-1.ocir.io

cd backend
docker build -t us-chicago-1.ocir.io/$NAMESPACE/image-repo:backend .
docker push us-chicago-1.ocir.io/$NAMESPACE/image-repo:backend &

cd ../frontend
docker build -t us-chicago-1.ocir.io/$NAMESPACE/image-repo:frontend .
docker push us-chicago-1.ocir.io/$NAMESPACE/image-repo:frontend