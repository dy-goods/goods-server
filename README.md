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
- feature/v1.1
- feature/v2.0
- release/v2.0

每进行一个版本的开发就会创建一个`feature`分支，完成一个版本的开发就会创建一个`release`分支，确定功能都OK了就进行`finish`操作合并到`master`分支并打一个`tag`。

```
master -----------------------------------------o------
       \                                        ^\
        v                                      /  o-- tag 0.1.x
develop ---o------------------------------o---/--------
            \                             ^  /
             \                             \/
              \            release/0.1.x --o
               \                ^
                v              /
          feature/0.1.x ------o
```

#### 2. 开发流

每个人新建一个以自己名字开头的分支
- zhouxinkai/feature/v1.0
- zhouxinkai/feature/v1.1
- zhouxinkai/feature/v2.0

例子

```bash
$ # 当前所有分支为 feature/v1.0
$ git fetch origin # 拉取最新代码
$ git merge origin/feature/v1.0 # 假设当前正在开发v1.0版本，更新代码
$ git push origin zhouxinkai/feature/v1.0 # PR
```

## 三、运行

```bash
$ yarn
$ yarn dev
```

