FROM nginx:alpine

# Uygulama dosyalarını Nginx'in sunacağı dizine kopyalayın
COPY . /usr/share/nginx/html

# İsteğe bağlı: Kendi Nginx yapılandırmanızı eklemek isterseniz
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Nginx portunu açın
EXPOSE 80

# Nginx'i başlatın
CMD ["nginx", "-g", "daemon off;"]
