# Kanbanio

<a href="https://kanban-app-seventhfret-60e745ee43cf108070184e613a445975d2c208cb.gitlab.io">
    <img src="./frontend/src/logo.svg" height="250" alt="Kanbanio logo">
</a>

## Table of contents

- [Description](#description)
- [Backend](#backend)
- [Frontend](#frontend)
- [Resources](#resources)


## Description

*Fullstack project built on Django/Django REST Framework on backend and React.js/MaterialUI on frontend.*

### Backend

Backend built using following tech-stack:
- Python 3.11
- Django
- Django REST Framework
- PostgreSQL
- Apache2 (mod_wsgi) + nginx as web/proxy-servers


API includes Django models for: 
+ Folders
+ Notes
+ Todos
+ Profile
+ Token

List of API endpoints:

### Notes
> **/notes/** - GET, POST \
> *Get list of all notes filtered by user requesting them.*

> **/notes/?latest** - GET \
*Get latest 5 notes filtered by user requesting them.*

> **/notes/\<int:id\>** - GET, PATCH, DELETE \
> *Note entity endpoint to get info of concrete note, update or delete it.*

### Folders

> **/folder/** - GET, POST \
> *Get list of all folders filtered by user requesting them.*

> **/folder/?type=N** - GET \
> *Get list of all folders of type Note(N) filtered by user requesting them.*

> **/folder/?type=T** - GET (todos folders) \
> *Get list of all folders of type Todo(T) filtered by user requesting them.*

### Todos

> **/todo/** - GET, POST \
> *Get list of all todos filtered by user requesting them.*

> **/todo/?latest** - GET \
> *Get latest 5 todos filtered by user requesting them.*

> **/todo/\<int:id\>** - GET, PATCH, DELETE \
> *Todo entity endpoint to get info of concrete todo, update or delete it.*

### Authentication

> **/users/create/** - POST \
> *Endpoint to create user.*

> **/users/get/** - GET \
> *Get user who makes a request.*

> **/users/avatar/** - GET \
> *Get avatar link of user.*

> **/users/token/obtain/** - POST \
> *Endpoint to obtain JWT token by user credentials.*

> **/users/token/refresh/** - POST \
> *Endpoint to refresh acess JWT token.*


Authentication made by [django-rest-framework-simplejwt](https://django-rest-framework-simplejwt.readthedocs.io/en/latest/) library which provides secure way to authenticate users with temporary JWT tokens. Timeout for tokens validity is `5 minutes`.

List of dependencies is available in `backend/requirements.txt`

### Frontend

Fronted built using following tech-stack:
- Node.js v18.17.0
- React 18.2.0
- Material UI 5.14.12
- React-router-dom 6.16.0
- Axios 1.5.1

React project was created with create-react-app utility.

Web-site includes following paths:

> **/** - Home page

> **/register/** - Registration page

> **/login/** - Login page

> **/logout/** - Logout page \
> *Requires authentication*

> **/dashboard/** - Dashboard page \
> *Requires authentication*

> **/profile/** - Profile page \
> *Requires authentication*

> **/todos/** - Todos page \
> *Requires authentication*

> **/notes/** - Notes page \
> *Requires authentication*

List of dependencies is available in `frontend/package.json`

## Resources

[Kanbanio](https://kanban-app-seventhfret-60e745ee43cf108070184e613a445975d2c208cb.gitlab.io)


