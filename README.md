# 抖友好物说

# GitHook配置*

```bash
$ yarn add --dev pre-commit
```

## 一、代码提交规范

1. 保证提交的用户信息是准确的

```bash
$ git config --local user.name '周新凯' # 你的中文姓名
$ git config --local user.email '846673264@qq.com'
```

## 二、分支管理

#### 1. 使用`Git Flow`模型

- master
- develop
- feature/v1.0
- feature/v2.0
- release/v1.0

每进行一个版本的开发就会创建一个`feature`分支，完成一个版本的开发就会创建一个`release`分支，确定功能都OK了就进行`finish`操作合并到`master`分支并打一个`tag`。

```
master -----------------------------------------o------
       \                                        ^\
        v                                      /  o-- tag v1.0
develop ---o------------------------------o---/--------
            \                             ^  /
             \                             \/
              \            release/v1.0 --o
               \                ^
                v              /
          feature/v1.0 ------o
```

#### 2. 使用`Fork`开发流

代码的同步是从upstream拉取的

```
local <- pull <- upstream
```

代码的提交是通过PR的方式

```
local -> push -> origin -> pull request -> upstream
```

upstream配置

```bash
$ gt remote add upstream https://github.com/dy-goods/goods-server.git
```

例子

```bash
$ # 当前所有分支为 feature/0.1.0
$ git fetch upstream # 拉取upstream最新代码
$ git pull upstream/feature/v1.0 # 假设当前正在开发v1.0版本
$ git push origin feature/0.1.0 # 推送代码到origin仓库
```

## 三、运行

```bash
$ yarn
$ yarn dev
```
- 127.0.0.1:9090/是客户端
- 127.0.0.1:9090/graphql是graphql服务

