#!/bin/bash

echo "========================================"
echo "ORVIX Solutions - Deployment Script"
echo "========================================"
echo ""

GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

# Check Node.js
echo -e "${BLUE}Checking Node.js version...${NC}"
node -v || { echo -e "${RED}Node.js not found. Please install Node.js 18+${NC}"; exit 1; }

# Check MongoDB
echo -e "${BLUE}Checking MongoDB...${NC}"
mongod --version 2>/dev/null || echo -e "${BLUE}MongoDB not found locally. You can use MongoDB Atlas instead.${NC}"

echo ""
echo -e "${GREEN}Prerequisites check complete!${NC}"
echo ""

# Install dependencies
echo -e "${BLUE}Installing Frontend dependencies...${NC}"
cd frontend
npm install
cd ..

echo -e "${BLUE}Installing Backend dependencies...${NC}"
cd backend
npm install
cd ..

# Setup environment
echo ""
echo -e "${BLUE}Setting up environment...${NC}"
if [ ! -f backend/.env ]; then
    cp backend/.env.example backend/.env
    echo -e "${GREEN}Created backend/.env from example${NC}"
    echo -e "${RED}IMPORTANT: Please edit backend/.env with your actual settings${NC}"
fi

# Seed database
echo ""
echo -e "${BLUE}Seeding database...${NC}"
cd backend
node src/utils/seeder.js
cd ..

echo ""
echo "========================================"
echo -e "${GREEN}Setup Complete!${NC}"
echo "========================================"
echo ""
echo "To start the application:"
echo "  1. Start MongoDB: sudo systemctl start mongod"
echo "  2. Start Backend:  cd backend && npm run dev"
echo "  3. Start Frontend: cd frontend && npm start"
echo ""
echo "Access Points:"
echo "  - Website:    http://localhost:3000"
echo "  - Admin:      http://localhost:3000/admin/login"
echo "  - API:        http://localhost:5000/api"
echo ""
echo "Default Admin:"
echo "  - Email:    admin@orvix.com"
echo "  - Password: admin123"
echo ""
echo -e "${RED}Remember to change default credentials in production!${NC}"
echo ""
echo "For Docker deployment:"
echo "  docker-compose up -d"
