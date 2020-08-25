# Online Onboarding system
This project is online onboarding system for small, medium and huge organization. It is specially designed to for remote work, home office during coronavirus pandemia.

# Links & Resources
* **www** www.onlineonboarding.net
* **email** onlineonboardingnet@gmail.com
* **GitHub** https://github.com/binawork/OnlineOnboarding
* **Google Drive** https://drive.google.com/drive/folders/1_l1zUqGpWLETLL0MxekPrqh3OUcHVxz1
* **Balsamiq** https://balsamiq.cloud/sviuzng/p1y6lm3
* **Diagram bazy danych** https://drive.google.com/file/d/1v__3IoSzLdQVxtVwABCnvgfaCTsj9M7U/view?usp=sharing

# Quick Start

To get this project up and running locally on your computer:
1. Set up the [Python development environment](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Django/development_environment).
   We recommend using a Python virtual environment.
1. Create Database [How install and join PostgreSQL](https://www.digitalocean.com/community/tutorials/how-to-use-postgresql-with-your-django-application-on-ubuntu-14-04).
1. For local settings (like database credentials, secret_key or email host settings) create local_settings.py in the OnlineOnboarding directory and put your settings there. 
1. Assuming you have Python setup, run the following commands (if you're on Windows you may use `py` or `py -3` instead of `python` to start Python):
   ```
   pip3 install -r requirements.txt
   python3 manage.py makemigrations
   python3 manage.py migrate
   python3 manage.py collectstatic
   python3 manage.py test # Run the standard tests. These should all pass.
   python3 manage.py createsuperuser # Create a superuser
   python3 manage.py runserver
   ```
1. Open a browser to `http://127.0.0.1:8000/admin/` to open the admin site
1. Create a few test objects of each type.
1. Open tab to `http://127.0.0.1:8000` to see the main site, with your new objects.
