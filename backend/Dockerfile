# Sử dụng image node.js
FROM node:latest

# Thiết lập thư mục làm việc
WORKDIR /app

# Sao chép package.json và package-lock.json (nếu có) vào thư mục làm việc
COPY package*.json ./

# Cài đặt các dependencies
RUN npm install

# Sao chép tất cả các file trong thư mục hiện tại vào thư mục làm việc
COPY . .

# Mở cổng 5000 (hoặc cổng mà bạn sử dụng cho server của mình)
EXPOSE 5000

# Khởi chạy server
CMD ["npm", "start"]
