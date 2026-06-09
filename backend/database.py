from sqlalchemy import create_engine, Column, String, DateTime, Integer, JSON
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from datetime import datetime
from config import DATABASE_URL

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

class DownloadHistory(Base):
    __tablename__ = "download_history"
    
    id = Column(String, primary_key=True, index=True)
    url = Column(String, index=True)
    title = Column(String)
    platform = Column(String)
    format = Column(String)
    format_id = Column(String)
    download_type = Column(String)  # 'video', 'audio', 'subtitle'
    file_size = Column(Integer, nullable=True)
    downloaded_at = Column(DateTime, default=datetime.utcnow, index=True)

class AnalysisCache(Base):
    __tablename__ = "analysis_cache"
    
    id = Column(String, primary_key=True, index=True)
    url = Column(String, unique=True, index=True)
    data = Column(JSON)
    created_at = Column(DateTime, default=datetime.utcnow)

class APIUsage(Base):
    __tablename__ = "api_usage"
    
    id = Column(String, primary_key=True, index=True)
    endpoint = Column(String, index=True)
    platform = Column(String, nullable=True)
    status = Column(String)  # 'success', 'error'
    error_message = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow, index=True)

# Create tables
Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
