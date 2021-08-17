## Introduction
Basic app

## Requirements
* Python3
* Pipenv

## Run the development server

1. Before running the application make sure Python3 is already installed in your machine. If not you can download it here https://www.python.org/downloads/.
2. If pipenv is not installed yet on your machine run command ```pip install pipenv``` which creates and manages a virtualenv for your projects, as well as adds/removes packages from your Pipfile as you install/uninstall packages. It also generates the ever-important Pipfile.lock, which is used to produce deterministic builds.
3. Source the virtual environment ```pipenv shell```
4. Install the dependencies ```pipenv install```
5. Start the Django server. Run ```python manage.py runserver```. (You need to run this command while you are sourced into the virtual environment)
6. Verify if it works. Navigate to ```http://localhost:8000/basicapp/``` and you should see the text “Welcome to my basic django application.”.
