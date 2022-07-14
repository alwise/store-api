
git clone https://github.com/alwise/store-api.git

cd store-api

yarn install

yarn build

pm2 kill all

pm2 delate all

pm2 start dist/app.js --name api --watch true