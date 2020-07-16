const path = require('path')
const fs = require('fs')
const deployPath = path.join(process.cwd(), './deploy'); // cmd命令运行的目录
const deployConfigPath = `${deployPath}/deploy.config.js`;// 获取文件夹下边的配置脚本
const agrs = process.argv.slice(2); // 获取命令参数
const firstArg = agrs[0];
const inquirer = require('inquirer');
const commander = require('commander');
const packageJson = require('../package.json');
console.log()
commander
    .version(packageJson.version, '-v, --version')
    .parse(process.argv)
if (!firstArg) {
    commander.outputHelp();
}
function deploy() {
    // 检测是否存在命令
    if (!firstArg) {
        return
    }
    const deployConfigs = require(deployConfigPath);
    if (!deployConfigs) {
        process.exit();
    }
    // 注册部署命令
    deployConfigs.config.forEach(config => {
        const { command, projectName, name } = config;
        commander
            .command(`${command}`)
            .description(`${projectName}项目${name}部署`)
            .action(() => {
                inquirer.prompt([
                    {
                        type: 'confirm',
                        message: `${projectName}项目是否部署到${name}？`,
                        name: 'sure'
                    }
                ]).then(answers => {
                    const { sure } = answers;
                    if (!sure) {
                        process.exit();
                    }
                    if (sure) {
                        const deploy = require('../lib/index.js');
                        deploy(config);
                    }
                });

            });
    });
}
deploy()
// 解析参数
commander.parse(process.argv);
