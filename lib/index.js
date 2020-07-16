#!/usr/bin/env node

const path = require('path');
const fs = require('fs');
const childProcess = require('child_process');
const archiver = require('archiver');
const node_ssh = require('node-ssh');
let ssh = new node_ssh(); // 生成ssh实例
const projectDir = process.cwd();
// 部署流程入口
async function deploy(config) {
  const { script, webDir, distPath, projectName, name } = config;
  try {
    try {
      var workerProcess = childProcess.exec(script, { cwd: projectDir }, async () => {
        // successLog('  打包成功');
        await startZip(distPath, projectName);
        await connectSSH(config);
        await uploadFile(projectName, webDir);
        await unzipFile(webDir, projectName);
        await deleteLocalZip(projectName);
        console.log('发布成功')
        process.exit();
      });
      workerProcess.stdout.on('data', function (data) {
        console.log('\n' + data);
      });

      workerProcess.stderr.on('data', function (data) {
        console.log('\n' + data)
      });
    } catch (err) {
      process.exit(1);
    }
  } catch (err) {
    process.exit(1);
  }
}

function startZip (distPath, projectName) {
  return new Promise((resolve, reject) => {
    distPath = path.resolve(projectDir, distPath);
    const archive = archiver('zip', {
      zlib: { level: 9 },
    }).on('error', err => {
      throw err;
    });
    const output = fs.createWriteStream(`${projectDir}/${projectName}.zip`);
    output.on('close', err => {
      if (err) {
        // errorLog(`  关闭archiver异常 ${err}`);
        reject(err);
        process.exit(1);
      }
      console.log('zip打包成功');
      resolve();
    });
    archive.pipe(output);
    archive.directory(distPath, '/');
    archive.finalize();
  });
}
// 第三步，连接SSH
async function connectSSH(config) {
  const { host, port, username, password, distPath } = config;
  const sshConfig = {
    host,
    port,
    username,
    password
    // privateKey,
    // passphrase
  };
  try {
    console.log(`（3）连接${host}`);
    await ssh.connect(sshConfig);
    console.log('链接成功')
  } catch (err) {
    console.log(err)
    process.exit(1);
  }
}

// 第四部，上传zip包
async function uploadFile(projectName, webDir) {
  try {
    let date = new Date()
    let month = parseInt(date.getMonth()) + 1 > 9 ? parseInt(date.getMonth()) + 1 : '0' + (parseInt(date.getMonth()) + 1)
    let day = parseInt(date.getDate()) > 9 ? date.getDate() : '0' + date.getDate()
    let hours = parseInt(date.getHours()) > 9 ? date.getHours() : '0' + date.getHours()
    let minutes = parseInt(date.getMinutes()) > 9 ? date.getMinutes() : '0' + date.getMinutes()
    let dateNew = `${date.getFullYear()}-${month}-${day}_${hours}${minutes}`
    // lastDir项目所在目录 webDir项目目录
    const lastDir = webDir && webDir.split(projectName)[0]
    // console.log(lastDir)
    await ssh.execCommand(`cd ${lastDir}`, { cwd: lastDir });
    await ssh.execCommand(`cp -rf ${projectName} ${projectName}${dateNew}`, { cwd: lastDir });
    await ssh.putFile(`${projectDir}/${projectName}.zip`, `${lastDir}/${projectName}.zip`);
  } catch (err) {
    process.exit(1);
  }
}

// 运行命令
async function runCommand(command, webDir) {
  await ssh.execCommand(command, { cwd: webDir });
}

// 第五步，解压zip包
async function unzipFile(webDir, projectName) {
  try {
    console.log(`开始解压${projectName}`)
    const lastDir = webDir && webDir.split(projectName)[0]
    await runCommand(`cd ${lastDir} && unzip -o ${projectName}.zip -d ${webDir} && rm -f ${projectName}.zip`);
    console.log(`${projectName}解压成功`)
  } catch (err) {
    process.exit(1);
  }
}

// 第六步，删除本地dist.zip包
async function deleteLocalZip(projectName) {
  return new Promise((resolve, reject) => {
    fs.unlink(`${projectDir}/${projectName}.zip`, err => {
      if (err) {
        reject(err);
        process.exit(1);
      }
      resolve();
    });
  });
}
module.exports = deploy
