FROM nginx:alpine

# Remove config default do nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copia config customizada
COPY nginx.conf /etc/nginx/conf.d/

# Copia todos os arquivos do frontend
COPY . /usr/share/nginx/html

EXPOSE 80
