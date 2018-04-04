![Travis-CI](https://travis-ci.org/bradwoo8621/preset-process-env.svg?branch=master)

# preset-process-env
Preset node process.env before run scripts

# Install
`npm i preset-process-env`

# Usage
## Basic
Assume there are 2 environments, `prod` and `test`. Build your source code by `npm run build` command.

```javscript
"scripts": {
	"build": "your command",
	"build:prod": "preset-process-env build prod",
	"build:test": "preset-process-env build test"
}
```
`preset-process-env` should  
1. Find the corresponding environment config file under `/envs` directory. File name is `.env.xxx.js`, `xxx` is from command line,  
	> eg. `preset-process-env build prod` -> `/envs/.env.prod.js`  
	> eg. `preset-process-env build test` -> `/envs/.env.test.js`  
2. Read the export JSON object from environment js file, copy properties to `process.env`,
3. Run command by given command line,  
	> eg. `preset-process-env build prod` -> `npm run build`  
	> eg. `preset-process-env test prod` -> `npm run test`  

## Additional
Variables also can be passed by command line,  
> eg. `preset-process-env build prod VAR-A=abc` -> `process.env['VAR-A']` // output: "abc"
> eg. `preset-process-env build prod VAR-B=false` -> `process.env['VAR-B']` // output: false
> eg. `preset-process-env build prod VAR-C` -> `process.env['VAR-C']` // output: true

* `true`/`false` should be converted to boolean value,  
* `true` is optional.
