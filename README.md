# Nagwa Todo Client

A basic todo app with jwt authentication.
## Live Demo
<a href="https://nagwa-todo.netlify.app">Live Demo</a> (Fully Working)<br>
The frontend is hosted in the above link and it connects with the backend that I uploaded on my own private server.

## Current Features
- Add/View task list and its progress level.
- Add/View/Edit/Delete list tasks.
- Keyboard shortcuts control.
- Reorder tasks and auto save that order in database.
- Same pink theme as the original Nagwa website.
- Same font (DroidArabicNaskh) as the original Nagwa website.
- JWT authentication with remember-me capability.
- Integrated with mongodb instead of json files.

## To be added
- Implement (Edit/Remove List) (Time was short to replicate the logic from the task view or maybe I was being lazy).
- Make Reorder of lists save to database (Currently only reorder of tasks saves to db for the same reason mentioned above).
- Use another reorder library as the current one has some bugs.
- Arabic support.

## How to build & start

```batch
cd NagwaTodoClient
npm install
npm run dev
```
