# config Folder

This directory is used to define environment variables for application.

By using a configuration file, you can centralize and manage these settings in one place.

## Convention

By default, the application will read environment variables from the `.env` file.

To create different versions for environment variables, such as test, production, etc., we need to follow the following naming convention.

- `.env.<<version_name>>`

Next, we will append a relevant script to the `package.json` file.

```json
{
  "scripts": {
    "start": "nodemon index.js",
    "start:<<version_name>>": "dotenvx run -f .env.<<version_name>> -- nodemon index.js",
  }
}
```

Finally, start the application using the command we added to the script.

```bash
npm run start:<<version_name>>
```

## Example

For the production environment, we'll copy `.env` and name it `.env.production`.

`package.json` file will look like:

```json
{
  "scripts": {
    "start": "nodemon index.js",
    "start:production": "dotenvx run -f .env.production -- nodemon index.js",
  }
}
```

Start the application:

```bash
npm run start:production
```
