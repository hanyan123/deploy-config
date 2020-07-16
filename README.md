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