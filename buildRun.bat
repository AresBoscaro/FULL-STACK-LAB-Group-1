call npm run build
call docker build -t next .
call docker run -dp 3000:3000 next