## Introduction
Simple Todo app bootstrapped with [Create React App] and Django (including Django REST Framework).

## Requirements
* Python3
* Pipenv
* yarn

## Getting started on server side

1. Navigte to server folder ```cd server```
2. Before running the application make sure Python3 is already installed in your machine. If not you can download it here https://www.python.org/downloads/.
3. If pipenv is not installed yet on your machine run command ```pip install pipenv``` which creates and manages a virtualenv for your projects, as well as adds/removes packages from your Pipfile as you install/uninstall packages. It also generates the ever-important Pipfile.lock, which is used to produce deterministic builds.
4. Source the virtual environment ```pipenv shell```
5. Install the dependencies ```pipenv install```

## Running the server locally

6. Start the Django server. Run ```python manage.py runserver```. (You need to run this command while you are sourced into the virtual environment)
7. Verify if it works. Navigate to ```http://localhost:8000/admin/``` to see the django administration.
8. For now we disabled Django rest framework interface.

## Run the application locally

1. Make sure the server is already running.
2. Navigate to todo-list directory ```cd todo-list```
3. Install the dependencies ```yarn install```. Make sure yarn is already installed, if not you can refer here https://classic.yarnpkg.com/en/docs/install/#mac-stable
4. Start the frontend development server and run command ```yarn start```.

## Create your own superuser

1. After following the ``Getting started on server side`` part
2. Run command ```python manage.py createsuperuser``` and this will prompt you to enter the ```email```, ```username```, ```firstname```, ```password```, ```password(again)```.
3. Now youve created new superuser. Navigate to ```http://localhost:8000/admin/``` to see the django administration login page.
4. Logged in the superuser account you created earlier then you will be redirected to the admin page. You can now add and delete items from it.

### Django admin superuser credentials
```
username: admin@email.com
password: password
```

## Built With
* [React](https://reactjs.org) - A progressive JavaScript framework.
* [Python](https://www.python.org/) - A programming language that lets you work quickly and integrate systems more effectively.
* [Django](http://djangoproject.org/) - A high-level Python Web framework that encourages rapid development and clean, pragmatic design.
* [Django REST framework](https://www.django-rest-framework.org/) - Powerful and flexible toolkit for building Web APIs.
