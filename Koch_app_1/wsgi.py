"""
WSGI Entry Point für Production Server
Verwenden Sie diese Datei für Apache/Nginx mit mod_wsgi
"""
from app import app

if __name__ == "__main__":
    app.run()
