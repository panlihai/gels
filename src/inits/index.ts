//初始化在app定义好后运行，以init开的头文件都会被处理，传输参数app并要求返回一个带有init方法的对象。
let requireDir = require('require-dir')
export default {
    async init(app) {
        const inits = []
        let dirData = requireDir(__dirname)
        global.__.each(dirData, (item, name) => {
            if (name.match(/^init/) && item && item.default && item.default.init) {
                inits.push(item.default)
            }
        })
        for (let item of inits) {
            await item.init(app)
        }
    }
}