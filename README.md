# vue-scavenger

> A basic texting scavenger hunt using Twilio, Vue JS, Python and AppEngine

## Local Setup

You'll need to have Node JS installed and the basics around npm to follow this:

```
cd scavenger
npm install
npm install -g webpack webpack-dev-server
npm install -g webpack-dev-server
```

Also ensure that the Python App-engine SDK (https://cloud.google.com/appengine/docs/standard/python/download) is installed.

## Install Google Cloud SDK
https://cloud.google.com/appengine/downloads

## configure python2.7 on mac m1 (or in general w/ pyenv and brew)
ala https://dev.to/jordicuevas/how-to-install-python2-in-a-macbook-m1-with-brew-bhi

Run the following in your terminal - this will allow the dev_appserver.py to run

* brew install pyenv
* pyenv install 2.7.18
* export PATH="$(pyenv root)/shims:${PATH}"
* echo 'PATH=$(pyenv root)/shims:$PATH' >> ~/.zshrc
* pyenv init
* pyenv local 2.7.18


## Running it locally

```
npm start # In one terminal window
npm run backend # In another terminal window
```

Then navigate to http://localhost:8080 login in as an administrator in order to access the api endpoints
Local development environment is available on http://localhost:3000

## Build Setup & Helpful Commands

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test

# clear datastore
dev_appserver.py server/ --clear_datastore true

# deploy indexes
gcloud app deploy server/index.yaml --project=vue-look-go
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
