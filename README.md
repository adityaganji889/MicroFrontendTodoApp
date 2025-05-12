# MicroFrontend - TodoApp 

Developed a TodoApp in React utilizing modern scalable microfrontend architecture.

## Features:

* This App consists of 3 microfrontend apps: host, todoform, todolist each having their corresponding functionalities and running on seperate ports, developed using webpack.
* MicroFrontends (On DEV environment):
  - Host-App: http://localhost:3000
  - Todoform-App: http://localhost:3001
  - Todolist-App: http://localhost:3002
* Host-App is the central point (like Eureka Discovery Service in Spring Netflix Eureka for Spring Microservices) where the components from remote apps: Todoform-App, Todolist-App are imported and rendered.
* Implemented Hot reload functionality using react-refresh plugin for the DEV environment.
* Imported and exported components from one project to another (remotely) using webpack module federation plugin.
* Handled routes and navigation in micro-frontend architecture using remoteEntry.js for each of the components.
* Further, this todoapp has Pagination, Sorting, Searching, CRUD, Toast Notifications, Scalable functionalities, utilizes Browser localStorage.

## Architecture Diagram:
![image](https://github.com/user-attachments/assets/1cb3bb72-b28a-420c-9c55-ec1bd00037b6)

## Tech Stack Used:
#### Front-End:
<img alt="React" src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB"/> <img alt="Webpack" src="https://img.shields.io/badge/webpack-%238DD6F9.svg?style=for-the-badge&logo=webpack&logoColor=black"/>

## Deployed Version:

https://micro-frontend-todo-app-host.vercel.app/

## Demonstration:

https://github.com/user-attachments/assets/304f813d-8083-43ec-bbe3-5d5a75d7e292



