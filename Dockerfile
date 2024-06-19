FROM node:18

# Set npm's default directory for the existing node user
RUN mkdir -p /home/node/.npm-global \
    && chown -R node:node /usr/local/lib/node_modules \
    && chown -R node:node /home/node/.npm-global
    
# Set environment variables for npm
ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH=$PATH:/home/node/.npm-global/bin

USER node

WORKDIR /home/node/app
COPY package.json ./
RUN npm install
COPY . .
RUN npm install -g @nestjs/cli@10.1.17
# RUN npm run build
CMD [ "tail", "-f", "/dev/null" ]
