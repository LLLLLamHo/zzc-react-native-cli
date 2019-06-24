# 租租车App React Native脚手架。

为了统一租租车的整个React Native的版本环境，以及使用同样的目录结构，所以开发出一个自动化创建工程目录的脚手架工具。所有新的RN项目都应该使用该脚手架来创建工程。

## 安装
脚手架工具需要安装到全局的node_modules中
```shell
znpm install zzc-react-native-cli -g
```
验证是否安装成功
```shell
zrn -v
```
如安装成功则会出现版本号。

## 使用
创建一个空白的工程目录，然后使用zrn来构建项目。
```shell
zrn init -n <project name>
```
创建完成后目录中将会出现以下结构：

```
├── __tests__ // RN测试文件 
├── src // 项目业务代码存放文件
├── .buckconfig
├── .flowconfig
├── .gitattributes
├── .gitignore
├── .watchmanconfig
├── App.js
├── app.json
├── babel.config.js
├── index.js
├── metro.config.jsmetro.config.js
├── package.json
├── zrn.cli.config.j
```

## 帮助
运行-help命令来获得帮助
```shell
zrn --help
```

## 构建
运行 bundle命令来构建你的应用
```shell
zrn bundle -t <ios|android 默认all>
```
更多的参数配置可以参考--help来获得。

## 更新
切勿自行更新自己项目中的RN以及一切和RN相关的文件，例如React，简单来说，项目初始化时就已经存在的依赖请勿自行更新，如果需要更新版本来获得一些新的特性，请联系原生开发组以及我来更新脚手架的配置进行更新。
```shell
zrn update
```
update命令会将脚手架中最新的配置更新到项目的package中，然后需要您自行install即可。