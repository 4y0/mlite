# mlite *A simple "Log and go" NodeJS wrapper for LOGLITE*

## What is LOGLITE?
Loglite is a very simple, lightweight, cloud-based logging service. It is slightly similar to Loggly but stripped of some more advanced features. Loglite provides logging with keys and a means to storify function / service calls in your node js applications.
No registration / login required. All you need to get going is a valid LOGLITE token. You can get one here  https://loglite.herokuapp.com/. To view logs associated with your token, you can do so here  https://loglite.herokuapp.com/logs.html (You will also need to provide your LOGLITE token)

## Using mlite
To use mlite, the first thing you need to do is get a LOGLITE token. You can get one for free from here https://loglite.herokuapp.com/ 
After you have gotten your LOGLITE token, install mlite using NPM:
```
npm install mlite
```
You can then use mlite in your NodeJS code like so:
```
var mlite = require('mlite')('YOUR LOGLITE TOKEN');
mlite.log(DATA_TO_LOG, OPTIONAL_KEY, TYPE);
```
`DATA_TO_LOG` Is what you wish to log. 
`OPTIONAL_KEY` Is a key (any string value) you can use to track logged entries. Very useful for storifying function calls. It is optional
`TYPE` Is just for semantics and rendering on the LOGLITE dashboard. Examples could be `warning`, `info`, `error` e.t.c. To this end, mlite provides helper functions for basic log types. You can do any of the following:
```
mlite.info('DATA_TO_LOG', 'OPTIONAL_KEY'); //type is passed as INFO
```
```
mlite.warning('DATA_TO_LOG', 'OPTIONAL_KEY'); //type is passed as WARNING
```
```
mlite.error('DATA_TO_LOG', 'OPTIONAL_KEY'); //type is passed as ERROR
```
```
mlite.errorX('DATA_TO_LOG', 'OPTIONAL_KEY'); //type is passed as ERROR-X
```

NOTE:
`mlite.errorX('DATA_TO_LOG', 'OPTIONAL_KEY')` Will attempt to stringify and log the stack trace if `DATA_TO_LOG` is an instance of the Error object while `mlite.error('DATA_TO_LOG', 'OPTIONAL_KEY');` will log the data passed to it as is.

Also, it's possible to use `mlite` with a custom LOGLITE build. You can deploy and host your own LOGLITE instance. If this is the case, your `mlite` initialization will look something like this:
```
var mlite = require('mlite')('CUSTOM_LOGLITE_TOKEN', 'CUSTOM_LOGLITE_SERVERURL');
//use mlite as you'd normally
mlite.log('somedata'); //Log can be retrieved from your custom LOGLITE server
```

