# ionic 5 Cinema App

## Description / Technologies
Project built with Ionic 5 and Angular 11 - in the frontend side - and Node Js in the backend to manage Login and Register Users, and custom favourites Movies.

It includes:
- [x] Login
- [x] Register
- [] Forgot Password ( pending )
- [ ] SideMenu
- [x] Fetch Movies information from TMDB api
- [x] CRUD favourites movies, once added as favourite from TMDB
- [ ] Search movies from home list ( pending )

## Prerequisite:
1. Node.js to be installed.
2. Ionic cli:
3. MongoDB ( I used MongoDB atlas and MongoDB compass for the project)
```
npm install -g @ionic/cli
```

## How to use:
1. clone the project.
2. cd into the project.
3. install the dependencies:

```
Frontend:
cd into client folder and then -> npm install

Backend:
cd into server folder and then -> npm install
```

4. Create a new mongoDB.

5. Additional configuration
In the file .env inside server folder, you must replace:
    - user
    - pass
    - mongoDB

 with your corresponding user, pass and mongoDB

    Example file .env
    DB_MONGO=mongodb+srv://user:pass@cluster0.anbnr.mongodb.net/mongoDB
    SECRET_WORD=my_secret_word

 In the file client/src/app/services/movies.service.ts ,I provide you a TMDB api_key so that you can test the app.
 You may need to change this api_key in the future for further purposes.

6. run the project:
```
Frontend:
ionic serve or ionic serve --lab ( to run with ionic lab)

Backend:
npm run dev

```
7. That's it, enjoy.