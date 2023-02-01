# Todo-Backend for the Angular Store Examples project

This backend was created in node using Express and TypeORM. 
if you want to test the backend or the full interaction with the angular store examples porject than follow the instructions.

1. Copy the repository.
```csharp
git@github.com:PascalSteffen/Todo-Backend.git
```
2. Install all dependencies
```csharp
npm install
```
3. Create a JWT-Secret => Open Node in the terminal and paste this line in
```csharp
crypto.randomBytes(32).toString('hex')
```

4. Create an .env file and fill it with your DB-Data and your JWT-Secret-Key.
```csharp
NODE_ENV=development
PORT=9000
LOGGER_LEVEL=debug

DB_HOST=
DB_PORT=
DB_USERNAME=
DB_PASSWORD=
DB_NAME=

JWT_SECRET=
```
5. Start the server
```csharp
npm run dev
```
