reddit-mobile is a web server and build system for building polymorphic
React applications in node. It is part of a larger series of plugins that,
together, form frontend applications for reddit.

See [the wiki](https://github.com/reddit/reddit-mobile/wiki) for an in-depth
explanation of how everything fits together.

Getting Up and Running
----------------------

0. Install [node.js](https://nodejs.org/download/) v4.2 and npm 3.5
1. [Fork](https://github.com/reddit/reddit-mobile/fork) and clone
  this project.
2. Run `npm install` to install other dependencies.
3. Run `git submodule update --init` to download this project's submodules.
4. Run `npm run build` to build the assets (`npm run watch` to set up a filesystem watcher.)
5. Register a new [oauth application](https://www.reddit.com/prefs/apps/) and
  set up your [environment variables](./CONFIG.md). Redirect URI should be
  `http://localhost:4444/oauth2/token`.
6. Run `npm run dev-server` to start the web server. Optionally, create a startup script
  at `start.sh` that sets environment variables and starts the server. Create a file in the root called `start.sh` and make it executable `chmod +x start.sh`. This file is automatically ignore by git and you can use it to start the server instead of `npm run`. `start.sh` has been added to the `.gitignore` and will not get checked in.

  #### Example

	```sh
	#!/bin/bash
	GOOGLE_ANALYTICS_ID='UA-XXXXXX-1' \
	LIVERELOAD=true \
	DEBUG_LEVEL='info' \
	OAUTH_CLIENT_ID=XXXXXXXXX \
	SECRET_OAUTH_CLIENT_ID=XXXXXXXXX \
	OAUTH_SECRET=XXXXXXXXX \
	PROCESSES=2 \
	API_PASS_THROUGH_HEADERS='accept-language' \
	LOGIN_PATH="/login" \
	MINIFY_ASSETS="false" \
	STATSD_DEBUG="true" \
	npm run dev-server
	```

7. If you need to work on dependencies (snoode, horse-react, etc):
    1. Delete the dependencies you installed from ./node_modules
    2. Fork and clone the dependencies somewhere
    3. Run `npm link` within the dependency that you cloned
    4. Repeat recursively if you need to work on a dependency's dependency
    5. Re-run the build and restart your server (`npm run watch` *will* watch
      linked files)
8. Commit hooks - symlink `hooks` into `.git/hooks` (`ln -s -f ./hooks .git/hooks`), which
  will run some safety checks before committing and pushing code.

#### Running without a script:
  dev: `npm run dev-server`
  production: `npm run server`

#### Helpful chrome extensions:
- React Developer Tools
- Redux DevTools
