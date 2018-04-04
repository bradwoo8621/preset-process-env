#!/usr/bin/env node
const spawn = require('cross-spawn');
const path = require('path');
const fs = require('fs');

const script = process.argv[2];
let env = process.argv[3];
const variables = process.argv.slice(4);

console.log(`Custom script[${script}] run for environment[${env}].`);

const appDirectory = fs.realpathSync(process.cwd());
console.log(`Application directory is [${appDirectory}].`);
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

const envFile = resolveApp(`envs/.env.${env}`);
console.log(`Environment file is [${envFile}].`);
const environmentVariables = require(envFile);
// 复制环境参数到process.env, 可能会覆盖全局参数
Object.keys(environmentVariables).forEach((key) => {
	process.env[key] = environmentVariables[key];
});

// 如果命令有额外指定的参数, 解析之后放到process.env
// 参数指定的方式为x[=y], 如果只有x, 则认为x的值为true
// 如果y为字符串true, 则设置为boolean值true
// 如果y未字符串false, 则设置为boolean值false
// 其他y值不变, 以字符串形式设置
if (variables) {
	variables.forEach((variable) => {
		let parsed = variable.split('=');
		if (parsed.length === 1 || parsed[1] === 'true') {
			process.env[parsed[0]] = true;
		} else if (parsed[1] === 'false') {
			process.env[parsed[0]] = false;
		} else {
			process.env[parsed[0]] = parsed[1];
		}
	});
}

const result = spawn.sync('npm', ['run', script], { stdio: 'inherit' });
if (result.signal) {
	if (result.signal === 'SIGKILL') {
		console.log(
			'The build failed because the process exited too early. ' +
				'This probably means the system ran out of memory or someone called ' +
				'`kill -9` on the process.'
		);
	} else if (result.signal === 'SIGTERM') {
		console.log(
			'The build failed because the process exited too early. ' +
				'Someone might have called `kill` or `killall`, or the system could ' +
				'be shutting down.'
		);
	}
	process.exit(1);
}
process.exit(result.status);
