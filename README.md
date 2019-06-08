# Finance management

## How does it works?

Finance management is used for managing your finances. It allows you to categorize your expenses
and revenues and shows basic month and year statistics. All data are stored locally in your
browser but you can import and export them on settings page.

Data in the browser are stored in local storage. Application store object contains key-value pairs,
where key represents username and value represents object that contains user's info and user's
store. This user object is encrypted with hash of user's password and whole application store
object is encrypted with secret from configuration just for sure, application store object can
be of course decrypted, because hash is stored in browser, but user's data are always stored safely.
During user session, user's credentials are stored in session storage to enable application to read
and write to user's store saved in local storage. Password is never used directly, application
always use and store hashed password only. Credentials in session storage are encrypted also with
secret stored in configuration.

It is progressive web application so it can be run without connection to the internet and it is
possible to transform web application to the native application on your mobile device. If you
use Safari, you just need to click on "Save to the desktop" button and on Android, Google Chrome
will ask you to install this application locally. PWA was tested on iOS 12, but works on Android,
too.


## Build

To build the project:

1. Install local npm packages: `npm install`
2. Create `config/config.js` from `config.example.js`
3. Run the build `npm run build`

## Development

To run the dev server:

1. Install local npm packages: `npm install`
2. Create `config/config.js` from `config.example.js`
3. Run the build `npm start`

### Testing

To run eslint, stylelint and jest tests:

* `npm tests`

### Deployment

Application is deployed on [https://finance-management.surge.sh/]. To redeploy application:

* `npm run surge`