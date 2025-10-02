from fastapi import FastAPI, APIRouter, HTTPException, Depends, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr, validator
from typing import List, Optional
import uuid
from datetime import datetime, timezone, timedelta, date, time
import hashlib
import jwt
import re
from enum import Enum

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app
app = FastAPI(title="Edu-Mentor Services API", version="1.0.0")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# JWT Configuration
SECRET_KEY = "edu_mentor_secret_key_2024"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

security = HTTPBearer()

class UserRole(str, Enum):
    STUDENT = "student"
    COUNSELLOR = "counsellor"
    ADMIN = "admin"

class CourseType(str, Enum):
    BTECH = "B.Tech"
    DIPLOMA = "Diploma"
    BPT = "BPT"
    BPHARMA = "B.Pharma"
    MPHARMA = "M.Pharma"
    BHMS = "BHMS"
    BAMS = "BAMS"

class ApplicationStatus(str, Enum):
    PENDING = "pending"
    SUBMITTED = "submitted"
    UNDER_REVIEW = "under_review"
    APPROVED = "approved"
    REJECTED = "rejected"

# Helper functions
def prepare_for_mongo(data):
    if isinstance(data, dict):
        for key, value in data.items():
            if isinstance(value, date) and not isinstance(value, datetime):
                data[key] = value.isoformat()
            elif isinstance(value, time):
                data[key] = value.strftime('%H:%M:%S')
            elif isinstance(value, datetime):
                data[key] = value.isoformat()
    return data

def parse_from_mongo(item):
    if isinstance(item, dict):
        for key, value in item.items():
            if key.endswith('_date') and isinstance(value, str):
                try:
                    item[key] = datetime.fromisoformat(value).date()
                except:
                    pass
            elif key.endswith('_time') and isinstance(value, str):
                try:
                    item[key] = datetime.strptime(value, '%H:%M:%S').time()
                except:
                    pass
    return item

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode()).hexdigest()

async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    try:
        payload = jwt.decode(credentials.credentials, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("sub")
        if user_id is None:
            raise HTTPException(status_code=401, detail="Invalid authentication credentials")
        
        user = await db.users.find_one({"id": user_id})
        if user is None:
            raise HTTPException(status_code=401, detail="User not found")
        return User(**user)
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Invalid authentication credentials")

# Pydantic Models
class User(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: EmailStr
    phone: Optional[str] = None
    password_hash: str
    first_name: str
    last_name: str
    role: UserRole = UserRole.STUDENT
    is_active: bool = True
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    
    @validator('phone')
    def validate_phone(cls, v):
        if v and not re.match(r'^[0-9]{10}$', v):
            raise ValueError('Phone must be 10 digits')
        return v

class UserCreate(BaseModel):
    email: EmailStr
    phone: Optional[str] = None
    password: str
    first_name: str
    last_name: str
    
    @validator('password')
    def validate_password(cls, v):
        if len(v) < 6:
            raise ValueError('Password must be at least 6 characters')
        return v

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class College(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    location: str
    state: str
    courses: List[CourseType]
    fees_range: str
    rating: float = Field(ge=0, le=5)
    description: str
    established_year: int
    is_active: bool = True
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class CollegeCreate(BaseModel):
    name: str
    location: str
    state: str
    courses: List[CourseType]
    fees_range: str
    rating: float = Field(ge=0, le=5)
    description: str
    established_year: int

class Course(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    course_type: CourseType
    duration: str
    description: str
    eligibility: str
    career_opportunities: List[str]
    is_active: bool = True
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class CourseCreate(BaseModel):
    name: str
    course_type: CourseType
    duration: str
    description: str
    eligibility: str
    career_opportunities: List[str]

class Application(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    student_id: str
    college_id: str
    course_id: str
    status: ApplicationStatus = ApplicationStatus.PENDING
    documents: List[str] = []
    notes: Optional[str] = None
    applied_date: date = Field(default_factory=lambda: datetime.now(timezone.utc).date())
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ApplicationCreate(BaseModel):
    college_id: str
    course_id: str
    documents: List[str] = []
    notes: Optional[str] = None

class Appointment(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    student_id: str
    counsellor_id: Optional[str] = None
    appointment_date: date
    appointment_time: time
    purpose: str
    status: str = "scheduled"  # scheduled, completed, cancelled
    notes: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class AppointmentCreate(BaseModel):
    appointment_date: date
    appointment_time: time
    purpose: str
    notes: Optional[str] = None

class Enquiry(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    phone: str
    subject: str
    message: str
    is_resolved: bool = False
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class EnquiryCreate(BaseModel):
    name: str
    email: EmailStr
    phone: str
    subject: str
    message: str

class BlogPost(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    content: str
    author: str
    tags: List[str] = []
    is_published: bool = True
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class BlogPostCreate(BaseModel):
    title: str
    content: str
    author: str
    tags: List[str] = []
    is_published: bool = True

class Testimonial(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    student_name: str
    course: str
    college: str
    message: str
    rating: float = Field(ge=0, le=5)
    photo_url: Optional[str] = None
    is_featured: bool = False
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class TestimonialCreate(BaseModel):
    student_name: str
    course: str
    college: str
    message: str
    rating: float = Field(ge=0, le=5)
    photo_url: Optional[str] = None
    is_featured: bool = False

# Authentication Routes
@api_router.post("/auth/register")
async def register_user(user_data: UserCreate):
    # Check if user exists
    existing_user = await db.users.find_one({"email": user_data.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # Create new user
    user_dict = user_data.dict()
    user_dict["password_hash"] = hash_password(user_data.password)
    del user_dict["password"]
    
    user = User(**user_dict)
    user_mongo = prepare_for_mongo(user.dict())
    await db.users.insert_one(user_mongo)
    
    # Create access token
    access_token = create_access_token(data={"sub": user.id})
    
    return {
        "message": "User registered successfully",
        "access_token": access_token,
        "token_type": "bearer",
        "user": {"id": user.id, "email": user.email, "first_name": user.first_name, "role": user.role}
    }

@api_router.post("/auth/login")
async def login_user(login_data: UserLogin):
    user = await db.users.find_one({"email": login_data.email})
    if not user or user["password_hash"] != hash_password(login_data.password):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    
    access_token = create_access_token(data={"sub": user["id"]})
    
    return {
        "message": "Login successful",
        "access_token": access_token,
        "token_type": "bearer",
        "user": {"id": user["id"], "email": user["email"], "first_name": user["first_name"], "role": user["role"]}
    }

@api_router.get("/auth/me")
async def get_current_user_info(current_user: User = Depends(get_current_user)):
    return {
        "id": current_user.id,
        "email": current_user.email,
        "first_name": current_user.first_name,
        "last_name": current_user.last_name,
        "role": current_user.role
    }

# College Routes
@api_router.get("/colleges", response_model=List[College])
async def get_colleges(
    state: Optional[str] = None,
    course_type: Optional[CourseType] = None,
    limit: int = 50
):
    query = {"is_active": True}
    if state:
        query["state"] = state
    if course_type:
        query["courses"] = course_type
    
    colleges = await db.colleges.find(query).limit(limit).to_list(length=None)
    return [College(**parse_from_mongo(college)) for college in colleges]

@api_router.post("/colleges", response_model=College)
async def create_college(
    college_data: CollegeCreate,
    current_user: User = Depends(get_current_user)
):
    if current_user.role not in [UserRole.ADMIN, UserRole.COUNSELLOR]:
        raise HTTPException(status_code=403, detail="Permission denied")
    
    college = College(**college_data.dict())
    college_mongo = prepare_for_mongo(college.dict())
    await db.colleges.insert_one(college_mongo)
    return college

# Course Routes
@api_router.get("/courses", response_model=List[Course])
async def get_courses(course_type: Optional[CourseType] = None, limit: int = 50):
    query = {"is_active": True}
    if course_type:
        query["course_type"] = course_type
    
    courses = await db.courses.find(query).limit(limit).to_list(length=None)
    return [Course(**parse_from_mongo(course)) for course in courses]

@api_router.post("/courses", response_model=Course)
async def create_course(
    course_data: CourseCreate,
    current_user: User = Depends(get_current_user)
):
    if current_user.role not in [UserRole.ADMIN, UserRole.COUNSELLOR]:
        raise HTTPException(status_code=403, detail="Permission denied")
    
    course = Course(**course_data.dict())
    course_mongo = prepare_for_mongo(course.dict())
    await db.courses.insert_one(course_mongo)
    return course

# Application Routes
@api_router.get("/applications", response_model=List[Application])
async def get_applications(current_user: User = Depends(get_current_user)):
    query = {}
    if current_user.role == UserRole.STUDENT:
        query["student_id"] = current_user.id
    
    applications = await db.applications.find(query).to_list(length=None)
    return [Application(**parse_from_mongo(app)) for app in applications]

@api_router.post("/applications", response_model=Application)
async def create_application(
    app_data: ApplicationCreate,
    current_user: User = Depends(get_current_user)
):
    if current_user.role != UserRole.STUDENT:
        raise HTTPException(status_code=403, detail="Only students can create applications")
    
    # Check if college and course exist
    college = await db.colleges.find_one({"id": app_data.college_id})
    course = await db.courses.find_one({"id": app_data.course_id})
    
    if not college:
        raise HTTPException(status_code=404, detail="College not found")
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    
    application = Application(**app_data.dict(), student_id=current_user.id)
    app_mongo = prepare_for_mongo(application.dict())
    await db.applications.insert_one(app_mongo)
    return application

# Appointment Routes
@api_router.get("/appointments", response_model=List[Appointment])
async def get_appointments(current_user: User = Depends(get_current_user)):
    query = {}
    if current_user.role == UserRole.STUDENT:
        query["student_id"] = current_user.id
    elif current_user.role == UserRole.COUNSELLOR:
        query["counsellor_id"] = current_user.id
    
    appointments = await db.appointments.find(query).to_list(length=None)
    return [Appointment(**parse_from_mongo(apt)) for apt in appointments]

@api_router.post("/appointments", response_model=Appointment)
async def create_appointment(
    apt_data: AppointmentCreate,
    current_user: User = Depends(get_current_user)
):
    if current_user.role != UserRole.STUDENT:
        raise HTTPException(status_code=403, detail="Only students can book appointments")
    
    # Check if appointment slot is available
    existing_apt = await db.appointments.find_one({
        "appointment_date": apt_data.appointment_date.isoformat(),
        "appointment_time": apt_data.appointment_time.strftime('%H:%M:%S'),
        "status": "scheduled"
    })
    
    if existing_apt:
        raise HTTPException(status_code=400, detail="Appointment slot already booked")
    
    appointment = Appointment(**apt_data.dict(), student_id=current_user.id)
    apt_mongo = prepare_for_mongo(appointment.dict())
    await db.appointments.insert_one(apt_mongo)
    return appointment

# Enquiry Routes
@api_router.get("/enquiries", response_model=List[Enquiry])
async def get_enquiries(current_user: User = Depends(get_current_user)):
    if current_user.role not in [UserRole.ADMIN, UserRole.COUNSELLOR]:
        raise HTTPException(status_code=403, detail="Permission denied")
    
    enquiries = await db.enquiries.find().to_list(length=None)
    return [Enquiry(**parse_from_mongo(enq)) for enq in enquiries]

@api_router.post("/enquiries", response_model=Enquiry)
async def create_enquiry(enquiry_data: EnquiryCreate):
    enquiry = Enquiry(**enquiry_data.dict())
    enq_mongo = prepare_for_mongo(enquiry.dict())
    await db.enquiries.insert_one(enq_mongo)
    return enquiry

# Blog Routes
@api_router.get("/blogs", response_model=List[BlogPost])
async def get_blogs(limit: int = 10):
    blogs = await db.blogs.find({"is_published": True}).limit(limit).to_list(length=None)
    return [BlogPost(**parse_from_mongo(blog)) for blog in blogs]

@api_router.post("/blogs", response_model=BlogPost)
async def create_blog(
    blog_data: BlogPostCreate,
    current_user: User = Depends(get_current_user)
):
    if current_user.role not in [UserRole.ADMIN, UserRole.COUNSELLOR]:
        raise HTTPException(status_code=403, detail="Permission denied")
    
    blog = BlogPost(**blog_data.dict())
    blog_mongo = prepare_for_mongo(blog.dict())
    await db.blogs.insert_one(blog_mongo)
    return blog

# Testimonial Routes
@api_router.get("/testimonials", response_model=List[Testimonial])
async def get_testimonials(featured_only: bool = False, limit: int = 10):
    query = {}
    if featured_only:
        query["is_featured"] = True
    
    testimonials = await db.testimonials.find(query).limit(limit).to_list(length=None)
    return [Testimonial(**parse_from_mongo(test)) for test in testimonials]

@api_router.post("/testimonials", response_model=Testimonial)
async def create_testimonial(
    testimonial_data: TestimonialCreate,
    current_user: User = Depends(get_current_user)
):
    if current_user.role not in [UserRole.ADMIN, UserRole.COUNSELLOR]:
        raise HTTPException(status_code=403, detail="Permission denied")
    
    testimonial = Testimonial(**testimonial_data.dict())
    test_mongo = prepare_for_mongo(testimonial.dict())
    await db.testimonials.insert_one(test_mongo)
    return testimonial

# Statistics Route for Admin Dashboard
@api_router.get("/admin/stats")
async def get_admin_stats(current_user: User = Depends(get_current_user)):
    if current_user.role != UserRole.ADMIN:
        raise HTTPException(status_code=403, detail="Admin access required")
    
    # Get counts
    total_students = await db.users.count_documents({"role": "student"})
    total_applications = await db.applications.count_documents({})
    total_colleges = await db.colleges.count_documents({"is_active": True})
    total_enquiries = await db.enquiries.count_documents({"is_resolved": False})
    
    return {
        "total_students": total_students,
        "total_applications": total_applications,
        "total_colleges": total_colleges,
        "pending_enquiries": total_enquiries
    }

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()

# Initialize sample data
@api_router.post("/init-data")
async def initialize_sample_data():
    # Check if data already exists
    existing_colleges = await db.colleges.count_documents({})
    if existing_colleges > 0:
        return {"message": "Sample data already exists"}
    
    # Sample colleges
    sample_colleges = [
        {
            "name": "Indian Institute of Technology, Patna",
            "location": "Patna, Bihar",
            "state": "Bihar",
            "courses": ["B.Tech"],
            "fees_range": "₹2-8 Lakhs",
            "rating": 4.5,
            "description": "Premier engineering institute with excellent placement record",
            "established_year": 2008
        },
        {
            "name": "Patna Medical College",
            "location": "Patna, Bihar",
            "state": "Bihar",
            "courses": ["BHMS", "BAMS"],
            "fees_range": "₹1-3 Lakhs",
            "rating": 4.2,
            "description": "Leading medical college in Bihar",
            "established_year": 1925
        },
        {
            "name": "Birla Institute of Technology, Mesra",
            "location": "Ranchi, Jharkhand",
            "state": "Jharkhand",
            "courses": ["B.Tech", "B.Pharma"],
            "fees_range": "₹5-12 Lakhs",
            "rating": 4.3,
            "description": "Private engineering and pharmacy college",
            "established_year": 1955
        }
    ]
    
    for college_data in sample_colleges:
        college = College(**college_data)
        college_mongo = prepare_for_mongo(college.dict())
        await db.colleges.insert_one(college_mongo)
    
    # Sample courses
    sample_courses = [
        {
            "name": "Bachelor of Technology",
            "course_type": "B.Tech",
            "duration": "4 years",
            "description": "Undergraduate engineering program",
            "eligibility": "12th with PCM (75%+ marks)",
            "career_opportunities": ["Software Engineer", "System Analyst", "Project Manager"]
        },
        {
            "name": "Bachelor of Physiotherapy",
            "course_type": "BPT",
            "duration": "4.5 years",
            "description": "Healthcare program focusing on physical rehabilitation",
            "eligibility": "12th with PCB (50%+ marks)",
            "career_opportunities": ["Physiotherapist", "Sports Therapist", "Rehabilitation Specialist"]
        },
        {
            "name": "Bachelor of Pharmacy",
            "course_type": "B.Pharma",
            "duration": "4 years",
            "description": "Pharmaceutical sciences program",
            "eligibility": "12th with PCM/PCB (50%+ marks)",
            "career_opportunities": ["Pharmacist", "Drug Inspector", "Research Analyst"]
        }
    ]
    
    for course_data in sample_courses:
        course = Course(**course_data)
        course_mongo = prepare_for_mongo(course.dict())
        await db.courses.insert_one(course_mongo)
    
    # Sample testimonials
    sample_testimonials = [
        {
            "student_name": "Rahul Kumar",
            "course": "B.Tech Computer Science",
            "college": "IIT Patna",
            "message": "Edu-Mentor helped me secure admission in my dream college. The counselling was excellent!",
            "rating": 5.0,
            "is_featured": True
        },
        {
            "student_name": "Priya Singh",
            "course": "B.Pharma",
            "college": "BIT Mesra",
            "message": "Thanks to Edu-Mentor, I got admission with scholarship. Highly recommended!",
            "rating": 4.8,
            "is_featured": True
        }
    ]
    
    for testimonial_data in sample_testimonials:
        testimonial = Testimonial(**testimonial_data)
        test_mongo = prepare_for_mongo(testimonial.dict())
        await db.testimonials.insert_one(test_mongo)
    
    return {"message": "Sample data initialized successfully"}