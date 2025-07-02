import os
import pyodbc
from fastapi import FastAPI
from dotenv import load_dotenv

load_dotenv()
SYBASE_DRIVER = os.getenv("SYBASE_DRIVER")
SYBASE_SERVER = os.getenv("SYBASE_SERVER")
SYBASE_DATABASE = os.getenv("SYBASE_DATABASE")
SYBASE_USERNAME = os.getenv("SYBASE_USERNAME")
SYBASE_PASSWORD = os.getenv("SYBASE_PASSWORD")
app = FastAPI()

def get_db_connection():
    conn_str = (
        f"DRIVER={SYBASE_DRIVER};"
        f"NetworkAddress={SYBASE_SERVER};"
        f"Database={SYBASE_DATABASE};"
        f"UID={SYBASE_USERNAME};"
        f"PWD={SYBASE_PASSWORD}"
    )
    return pyodbc.connect(conn_str)

@app.get("/customer/service/_active/status")
def get_active_services():
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT TOP 10 * FROM reservation WHERE status_code = 'INS'")
        columns = [column[0] for column in cursor.description]
        results = [dict(zip(columns, row)) for row in cursor.fetchall()]
        return results
    except Exception as e:
        return {"error": str(e)}

# If you want to test Postman with a random DB response, try this:
# from fastapi import FastAPI

# app = FastAPI()

# @app.get("/customer/service/_active/status")
# def get_active_services():
#     return [
#         {
#             "serviceId": 101,
#             "title": "FOX Sports HD",
#             "startTime": "2025-07-02T14:00:00Z",
#             "endTime": "2025-07-02T15:30:00Z",
#             "status": "Scheduled"
#         },
#         {
#             "serviceId": 102,
#             "title": "HBO Movies",
#             "startTime": "2025-07-02T16:00:00Z",
#             "endTime": "2025-07-02T17:00:00Z",
#             "status": "Scheduled"
#         }
#     ]