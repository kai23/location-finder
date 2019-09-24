npm run build
rsync -av --progress -e 'ssh -p 22022' build/* flo@consolelog.ovh:/home/flo/sites/locations/location-front