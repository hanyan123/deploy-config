// module.exports = {
//     projectName: 'xdd-boss', // 项目名称
//     dev: { // 测试环境
//         name: '测试环境',
//         script: "npm run dev", // 测试环境打包脚本
//         host: '123456', // 开发服务器地址
//         port: 22, // ssh port，一般默认22
//         username: 'root', // 登录服务器用户名
//         password: '123456', // 登录服务器密码
//         distPath: 'xdd-boss',  // 本地打包dist目录
//         webDir: '/var/www/html/dev/test',  // // 测试环境服务器地址
//     },
//     prod: {  // 线上环境
//         name: '线上环境',
//         script: "npm run build", // 线上环境打包脚本
//         host: '123456', // 开发服务器地址
//         port: 22, // ssh port，一般默认22
//         username: 'root', // 登录服务器用户名
//         password: '123456', // 登录服务器密码
//         distPath: 'xdd-boss',  // 本地打包dist目录
//         privateKey: '123121',
//         webDir: '/var/www/html/prod/test' // 线上环境web目录
//     }
// // 再还有多余的环境按照这个格式写即可
// }
const config = [
    
    { // 测试环境
        command: "dev",
        projectName: 'test', // 远程项目文件夹名称
        name: '测试环境',
        script: "npm run dev", // 测试环境打包脚本
        host: '192.168.xxx.xxx', // 开发服务器地址
        port: 22, // ssh port，一般默认22
        username: 'wwww2', // 登录服务器用户名
        password: '123333', // 登录服务器密码
        distPath: 'test',  // 本地打包dist目录
        webDir: '/xdd/application/test',  // // 测试环境服务器地址
    },
    {  // 线上环境
        command: "prod",
        projectName: 'test', // 远程项目文件夹名称
        name: '测试环境',
        script: "npm run dev", // 测试环境打包脚本
        host: '192.168.xxx.xxx', // 开发服务器地址
        port: 22, // ssh port，一般默认22
        username: 'wwww2', // 登录服务器用户名
        password: '123333', // 登录服务器密码
        distPath: 'test',  // 本地打包dist目录
        webDir: '/xdd/application/test',  // // 测试环境服务器地址
    }
]

module.exports = {
    config
}