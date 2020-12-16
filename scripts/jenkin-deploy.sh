node -v
npm install
npm run build
rm -rf deploy/*
cp -vr dist/* deploy/
cp scripts/web.config deploy/
