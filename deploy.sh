npm run build --prod
scp -i ~/.ssh/droplet_rsa -r build/ root@159.89.186.48:/opt/fitness-app/meal-app/