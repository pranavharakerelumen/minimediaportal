from fastapi import FastAPI

app = FastAPI()

@app.get("/customer/service/_active/status")
def get_active_services():
    # Temporary mock data to simulate your database response
    return [
        {
            "serviceId": 101,
            "title": "FOX Sports HD",
            "startTime": "2025-07-02T14:00:00Z",
            "endTime": "2025-07-02T15:30:00Z",
            "status": "Scheduled"
        },
        {
            "serviceId": 102,
            "title": "HBO Movies",
            "startTime": "2025-07-02T16:00:00Z",
            "endTime": "2025-07-02T17:00:00Z",
            "status": "Scheduled"
        }
    ]