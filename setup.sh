#!/bin/bash

# Development setup script for SocialGrab

echo "🚀 Setting up SocialGrab..."

# Create .env files if they don't exist
if [ ! -f backend/.env ]; then
  echo "📝 Creating backend .env file..."
  cp backend/.env.example backend/.env
  echo "⚠️  Please edit backend/.env with your configuration"
fi

# Check for required tools
echo "✅ Checking for required tools..."

# Check Node.js
if ! command -v node &> /dev/null; then
  echo "❌ Node.js not found. Please install Node.js 16+"
  exit 1
fi
echo "✅ Node.js $(node --version)"

# Check Python
if ! command -v python3 &> /dev/null; then
  echo "❌ Python not found. Please install Python 3.10+"
  exit 1
fi
echo "✅ Python $(python3 --version)"

# Check PostgreSQL
if ! command -v psql &> /dev/null; then
  echo "⚠️  PostgreSQL not found. Please install PostgreSQL 13+"
else
  echo "✅ PostgreSQL found"
fi

# Check Redis
if ! command -v redis-cli &> /dev/null; then
  echo "⚠️  Redis not found. Please install Redis 6+"
else
  echo "✅ Redis found"
fi

# Check FFmpeg
if ! command -v ffmpeg &> /dev/null; then
  echo "⚠️  FFmpeg not found. Please install FFmpeg"
else
  echo "✅ FFmpeg found"
fi

# Frontend setup
echo ""
echo "📦 Setting up frontend..."
cd frontend
npm install
cd ..

# Backend setup
echo ""
echo "📦 Setting up backend..."
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cd ..

echo ""
echo "✅ Setup complete!"
echo ""
echo "🚀 To start development:"
echo "   Terminal 1: cd frontend && npm run dev"
echo "   Terminal 2: cd backend && source venv/bin/activate && python main.py"
echo ""
echo "📖 Frontend: http://localhost:3000"
echo "📖 Backend:  http://localhost:8000"
echo "📖 API Docs: http://localhost:8000/docs"
