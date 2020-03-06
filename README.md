# Vehicle Import Parser

## Getting Started

`yarn install`

### Dev and Debugging

If using vscode, go to your debugger menu and select the play button for nodemon.

Otherwise `yarn run dev`

### Running the Application

`yarn run start`

## Testing

Change the user to whichever provider of your choosing

```
curl -X POST -H 'Content-Type: multipart/form-data' -F upload=@test/acme-dealer-inventory.csv -F provider="acme dealer" http://localhost:3000/vehicle-import
```
