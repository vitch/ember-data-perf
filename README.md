# ember-data performance test

This demo shows a problem I am having with JSON-API responses and ember-data 2.

In my app I need to side-load thousands of records with relationships at 
application startup (to support offline scenarios). I noticed a big slowdown
when I converted my API to use ember-data 2 with data in a JSON-API format.

This repository contains my work to reproduce the problem. I wrote a simple script
to generate some test date (users, posts and comments from an immaginary blog) with
relationships between them. The data is available in a format which suits the 
"old" `RESTAPI` adapters/serializers and in a format which suits the new `JSON-API`
adapters/ serializers.

On my laptop I get the following results with the code in this branch (built 
in production mode running in a clean browser tab without developer tools):

 * Loading JSON-API based data: ~7100 milliseconds
 * Loading REST API based data: ~3400 milliseconds

Interestingly the results were different pre 
[5806214](https://github.com/vitch/ember-data-perf/commit/5806214939e32651c14ae99ed7e674b7d55bd911) 
(when I defined the posts and comments on a user rather than specifying the author 
on posts/ comments):

 * Loading JSON-API based data: ~1200 milliseconds
 * Loading REST API based data: ~3400 milliseconds

I'm interested in whether this is a known phenomenon and whether there is any information
on the best way to structure your data to get the best performance from ember-data. Or should
ember-data be clever enough to behave performantly in any situation?

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM)
* [Bower](http://bower.io/)
* [Ember CLI](http://www.ember-cli.com/)
* [PhantomJS](http://phantomjs.org/)

## Installation

* `git clone <repository-url>` this repository
* change into the new directory
* `npm install`
* `bower install`

## Running / Development

* `ember server`
* Visit your app at [http://localhost:4200](http://localhost:4200).

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

* `ember test`
* `ember test --server`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

Specify what it takes to deploy your app.

## Further Reading / Useful Links

* [ember.js](http://emberjs.com/)
* [ember-cli](http://www.ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)

