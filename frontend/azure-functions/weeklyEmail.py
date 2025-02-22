# weeklyEmail.py
from backend.email import send_email
from backend.logger import log_info

def send_weekly_report():
    log_info("Sending weekly report email")
    send_email("Weekly Report", "Here is the weekly report.", "recipient@example.com")
    return {"message": "Weekly email sent"}