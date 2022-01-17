FROM python:3.7-slim
RUN apt-get -y update && apt-get install -y libzbar-dev sudo
RUN apt-get install -y python3-pip python3-dev
RUN apt-get install -y nodejs npm
EXPOSE 5000
## We copy just the requirements.txt first to leverage Docker cache
COPY ./requirements.txt /app/requirements.txt
WORKDIR /app
RUN pip3 install -r requirements.txt
RUN pip3 install python-dotenv

COPY . /app
WORKDIR /server/src/client/app
RUN npm install --legacy-peer-deps
WORKDIR /app
RUN npm install --legacy-peer-deps
RUN npm run build --prefix server/src/client/app/
CMD ["flask", "run", "--host", "0.0.0.0"]
#   "--host", "0.0.0.0"

# docker build -t openml-docker -f Dockerfile .
# docker run -it -p 5000:5000 --name sahi-openml  openml-docker
#sqlite:///openml.db