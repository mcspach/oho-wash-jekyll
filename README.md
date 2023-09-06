# Jekyll Gulp Sass Foundation

A starting point for a Jekyll site that uses the Foundation Sass framework and includes modern front-end tools like gulp.js and BrowserSync that streamline your workflow

## System Preparation

To use this starter project, you'll need the following things installed on your machine.

1. [Jekyll](https://jekyllrb.com) - Install through Ruby gems: `bundle install`
2. [NodeJS](https://nodejs.org) - Drupal VM: Add `nodejs_version: "10.x"` to local.config.yml. Or install globally.
3. [NPM](https://www.npmjs.com) - Drupal VM: Add `- name: npm` to `nodejs_npm_global_packages` in local.config.yml. Or install globally.
4. [Yarn](https://yarnpkg.com) - Drupal VM: Add `- name: yarn` to `nodejs_npm_global_packages` in local.config.yml. Or install globally.
5. (Optional) If using Drupal VM reprovision the Vagrant machine.

## Local Installation

1. Clone this repo, or download it into a directory of your choice.
2. Install front-end libraries: `yarn install-libraries`.
3. Install dev-dependencies: `yarn install-dev`.

## Usage

1. Compile everything – `yarn gulp` - This will give you file watching, browser synchronisation, auto-rebuild, CSS injecting etc.
2. Only Compile Sass – `yarn sass`
3. Only Build Jekyll Site – `yarn jekyll-build` - Since this is just a Jekyll project, you can use any of the commands listed in their [docs](https://jekyllrb.com/docs/usage/)

See "scripts" in package.json for more gulp commands through yarn. Alternatively you can always run `yarn gulp [command]`.


## Please use the following command for lando Env

## after initial install the lando run this -->
`lando ssh -s appserver -c 'cd /app && bundle install'`

## run this for jekyll watch and generate the static on change -->
`lando jekyll-watch`
## Run this for generate the complete _site folder by Jekyll  -->
`lando jekyll-build`

## run this for sass watch and compile -->
`lando yarn gulp watch`