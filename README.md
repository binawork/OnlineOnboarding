# Online Onboarding system
This project is online onboarding system for small, medium and huge organization. It is specially designed to for remote work, home office during coronavirus pandemia.

# Links & Resources
* **www** www.onlineonboarding.net
* **email** onlineonboardingnet@gmail.com
* **GitHub** https://github.com/binawork/OnlineOnboarding
* **Google Drive** https://drive.google.com/drive/folders/1_l1zUqGpWLETLL0MxekPrqh3OUcHVxz1
* **Balsamiq** https://balsamiq.cloud/sviuzng/p1y6lm3
* **Diagram bazy danych** https://drive.google.com/file/d/1v__3IoSzLdQVxtVwABCnvgfaCTsj9M7U/view?usp=sharing

# Working on this Project
1. Daily MON - THU at 10:30 on Discord #kennedy-głosowy, TUE @ 11:15
Google Calendar - kliknij link i dołącz
https://calendar.google.com/calendar?cid=Zzdocm82YXZrOG45Nzl2cWI1b2wzcHRxZ2NAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ
2. After Daily Magda creates note for Wiktor with questions to Product Owner

## Github - Dodawanie ticketów

### Zgłaszanie ticketu
1. Propozycje zadań zgłaszamy na Discord na kanale propozycje
2. Po zaakceptowaniu propozycji przez zespół można założyć ticket
3. Za dodanie i opisanie ticketu odpowiada Srum Mastger - Magda
4. Wszystkie tickety dodajemy w głównym repozytorium https://github.com/binawork/OnlineOnboarding/issues

### Zawartrtość ticketu
1. Nazwa:
2. Opis: co trzeba zrobić, jak to ma działać. Podpięcie makiety (jeżeli nie ma napisać do Michała żeby zrobił)
   * User Story - Jako <rola> chcę <co> aby <podać cel>, np. As a starup we want to know stars of our landing page and who is visiting (bits or real people) so we can track our landing performance.
   * Tasks - Ogólnie lub szczegółówo subtaski aby zrobić zadanie, np. 1. create Google Analitics account, 2. add GA dode to <head>
   * Definition of Done / Definition of Ready - Jaki ma być konkretny efekt po wykonaniu zadania, żeby User Story faktycznie działało w praktyce np. Google analytics tracking landing page performance
3. Zadania:
   * FRONTEND: Ustalić z Adamem co trzeba zrobić
   * BACKEND: Ustalić z Michałem co trzeba zrobić
   * NIESTANDARDOWE: Ustalić jakie to zadania i kto ma je zrobić

## Github - Tickets, branch workflow, commit workflow
* Each ticket (issue) that is in developement should have it own branch in repo
* Branch should be named <issue numbar> <issue name>
* In this way all developers will know why given changes in code were made (you will have biz req described in ticket)
* If you are commiting to branch created this way you dont have to tag ticket in the commit message. In other cases always tag issue in commit message for project transparency oand organisation.

# Paswswords

## Balsamiq - makiety
Read

https://balsamiq.cloud/sviuzng/p1y6lm3

Write
https://balsamiq.cloud/#login

Login 
```
onlineonboardingnet@gmail.com
```
Pass
```
mwUS@VQR8qCwD.#
```

## Gmail - Google Analitics
https://mail.google.com/

Login 
```
onlineonboardingnet@gmail.com
```
Pass
```
Cgr7Yy=n-H'2:$7b
```

### Email Alias
kontakt@bina.work
```
8lk4SnV4jgeb5gjAtT7u
```
kontakt@onlineonboarding.net - jest aliasem powyższego

## MyDevil - server
https://panel47.mydevil.net/
Login
```
bina
````
Pass
```
1lv6PPT^czlYzVtk@825
```
Adres serwera SSH/SFTP
```
s47.mydevil.net
```

### Database
DB
```
p1253_onboarding
```
User
```
p1253_onboarding
```
Pass
```
HTFoDP=+-*yRkZ3pM>EboKq^
```
* Po ssh w terminalu wpisujemy:
```
psql -d p1253_onboarding -U p1253_onboarding -h pgsql47.mydevil.net
```

### SSH SFTP
Klucz ssh na serwer SSH/SFTP:
```
s47.mydevil.net
```
Ma też swoje hasło-klucz (klucz ma klucz :p)
```
MAM#Onboarding
```

# Quick Start
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
