FROM node:20.11.0-alpine3.18

WORKDIR /usr/app/
COPY ./ /usr/app/

ENV NEXT_TELEMETRY_DISABLED=1

RUN npm i && npm run build && npm prune --production

CMD [ "npm", "start" ]
