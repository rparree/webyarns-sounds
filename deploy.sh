rm -fr dist
yarn build

rsync  -auHzP \
   dist/ \
   --delete \
   eabigelowjr@webyarns.com:www/rptest/webyarns-sounds/$(git branch --show-current)


rsync  -auHzP \
   dist/ \
   --delete \
   --exclude "css/" \
   --exclude "js/" \
   --exclude "sounds/" \
   --exclude "*.html" \
   /home/rparree/documents/nextcloud-private/shares/alan/webyarns-sounds/$(git branch --show-current)
