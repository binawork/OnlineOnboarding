# Online Onboarding system

# Resources
* [Google Drive](https://drive.google.com/drive/folders/1_l1zUqGpWLETLL0MxekPrqh3OUcHVxz1)
* [Balsamiq](https://balsamiq.cloud/s353db/p2xgepg/r9870)
* [Notion](https://www.notion.so/plywoodandfriends/Kennedy-Onboarding-System-f5f463966bfd4741826f52f0114c30f6)

## Working on this Project
1. Daily MON - THU at 10:30 on Discord #kennedy-głosowy, TUE @ 11:15
2. After Daily Magda creates note for Wiktor with questions to Product Owner

## Quick Start

To get this project up and running locally on your computer:
1. Set up the [Python development environment](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Django/development_environment).
   We recommend using a Python virtual environment.
1. Create Database [How install and join PostgreSQL](https://www.digitalocean.com/community/tutorials/how-to-use-postgresql-with-your-django-application-on-ubuntu-14-04).
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
