FROM nginx:1.29-alpine

COPY index.html /usr/share/nginx/html/index.html
COPY styles.css /usr/share/nginx/html/styles.css
COPY app.js /usr/share/nginx/html/app.js
COPY notes.md /usr/share/nginx/html/notes.md
COPY assets /usr/share/nginx/html/assets

EXPOSE 80
