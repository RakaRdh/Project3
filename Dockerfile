# Menggunakan NGINX sebagai base image
FROM nginx:alpine

# Set lokasi direktori default NGINX untuk file HTML
WORKDIR /usr/share/nginx/html

# Hapus file default dari NGINX
RUN rm -rf ./*

# Salin semua file HTML dari proyek Anda ke direktori NGINX
COPY . .

# Ekspos port 80 untuk aplikasi
EXPOSE 80
