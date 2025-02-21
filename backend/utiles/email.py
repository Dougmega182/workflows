# email.py
import smtplib
from email.mime.text import MIMEText

def send_email(subject, body, recipient):
    sender = "your-email@example.com"
    msg = MIMEText(body)
    msg["Subject"] = subject
    msg["From"] = sender
    msg["To"] = recipient

    with smtplib.SMTP("smtp.example.com", 587) as server:
        server.starttls()
        server.login("your-email@example.com", "your-password")
        server.sendmail(sender, recipient, msg.as_string())