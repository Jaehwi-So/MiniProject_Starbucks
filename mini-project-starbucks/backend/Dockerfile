FROM node:14

WORKDIR /miniproject-starbucks/

# 패키지 먼저 카피 후 인스톨해야 캐시를 사용할 수 있음. 전체 복사를 한 이후 하면 캐싱을 사용하지 않음
COPY ./package.json /miniproject-starbucks/
COPY ./yarn.lock /miniproject-starbucks/
RUN yarn install

COPY . /miniproject-starbucks/

# RUN yarn install

CMD yarn dev