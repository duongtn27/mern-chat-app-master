# Sử dụng image node.js có sẵn
FROM node:latest

# Thiết lập thư mục làm việc
WORKDIR /app

# Sao chép package.json và package-lock.json (nếu có) vào thư mục làm việc
COPY package*.json ./

# Cài đặt dependencies
RUN npm install

# Sao chép tất cả các file trong thư mục hiện tại vào thư mục làm việc
COPY . .

# Build ứng dụng
RUN npm run build

# Mở cổng 3000 (hoặc cổng mà bạn sử dụng cho ứng dụng React của mình)
EXPOSE 3000

# Khởi chạy ứng dụng
CMD ["npm", "start"]
