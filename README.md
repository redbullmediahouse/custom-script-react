# custom-script-react

## How to develop a custom script

* `yarn`
* `yarn serve`
* go to https://localhost:8080 and accept the exception of the self signed ssl certificate
* go to https://staging.redbull.com/pl-ay/local/8080/bundle.js
* use the example as a starting point
* changes to any `.js` and `.css` files will automatically trigger
 a recompilation of the source files
* reload the page to see the changes

## How to build the production-ready, bundled, minimized and uglified script from your sources

* `yarn build`
* check directory `dist` for `bundle.js`


