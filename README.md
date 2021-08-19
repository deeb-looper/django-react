# Introduction

Simple Todo app bootstrapped with [Create React App] and Django (including the Django REST Framework for API CRUD operations).

## Requirements

* Python3
* Pipenv
* yarn

## Getting started on server side

1. Navigate to server folder ```cd server```
2. Before running the application make sure Python3 is already installed in your machine. If not you can download it here https://www.python.org/downloads/.
3. We will install ```pipenv``` which creates and manages a virtualenv for your projects, as well as adds/removes packages from your Pipfile as you install/uninstall packages. It also generates the ever-important Pipfile.lock, which is used to produce deterministic builds. If ```pipenv```is not yet installed, run command ```pip install pipenv```.
4. Source the virtual environment ```pipenv shell```
5. Install the dependencies ```pipenv install```
6. Start the Django server. Run command ```python manage.py runserver``` (You need to run this command while you are sourced into the virtual environment)
7. Verify if it works. Navigate to http://localhost:8000/admin/ to see the django administration.
8. Navigate to ```http://localhost:8000/api/``` to see Django rest framework interface and view todos API

## Run the react application

1. Make sure the django server is already running.
2. From ```django-react-app``` directory. Navigate to todo-list directory ```cd todo-list```.
3. Install the dependencies, run ```yarn install```. Make sure yarn is already installed, if not you can refer here <https://classic.yarnpkg.com/en/docs/install/#mac-stable>
4. Start the frontend development server and run command ```yarn start```.

### Django admin superuser credentials

```bash
username: admin
password: password
```

## Built With

* [React](https://reactjs.org) - A progressive JavaScript framework.
* [Python](https://www.python.org/) - A programming language that lets you work quickly and integrate systems more effectively.
* [Django](http://djangoproject.org/) - A high-level Python Web framework that encourages rapid development and clean, pragmatic design.
* [Django REST framework](https://www.django-rest-framework.org/) - Powerful and flexible toolkit for building Web APIs.
