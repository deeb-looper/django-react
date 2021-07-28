## Introduction
Simple Todo app bootstrapped with [Create React App] and Django (including the Django REST Framework for API CRUD operations).
## Requirements
* Python3
* Pipenv
* yarn

## Getting started
1. Before running the application make sure Python3 is already installed in your machine. If not you can download it here https://www.python.org/downloads/.
2. Run command ```pip install pipenv``` which creates and manages a virtualenv for your projects, as well as adds/removes packages from your Pipfile as you install/uninstall packages. It also generates the ever-important Pipfile.lock, which is used to produce deterministic builds.
3. Source the virtual environment ```[pipenv shell]```
4. Install the dependencies ```[pipenv install]```
5. Navigate to todo-list directory ```[cd todo-list]```
6. Install the dependencies ```[yarn install]```. Make sure yarn is already installed, if not you can refer here https://classic.yarnpkg.com/en/docs/install/#mac-stable


## Run the application
1. Start the Django server. Navigate to ```todoBackend``` directory and run ```python manage.py runserver```. (You need to run this command while you are sourced into the virtual environment)
2. Verify if it works. Navigate to ```localhost:8000/admin``` to see the django administration.
3. Navigate to ```http://localhost:8000/admin/``` to see the django administration.
4. Navigate to ```http://localhost:8000/api/``` to see Django rest framework interface and view todos API
5. Start the frontend development server. Navigate to ```todo-list``` directory and run ```yarn start```.

### Django admin superuser credentials
```
username: admin
password: password
```

## Built With
* [React](https://reactjs.org) - A progressive JavaScript framework.
* [Python](https://www.python.org/) - A programming language that lets you work quickly and integrate systems more effectively.
* [Django](http://djangoproject.org/) - A high-level Python Web framework that encourages rapid development and clean, pragmatic design.
