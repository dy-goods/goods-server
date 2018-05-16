-- schema.sql mysql比较特殊，要处理汉字，所以要手动执行下面的sql语句
-- mysql -u root -p database_name
-- 登录数据库
-- source 'C:\schema.sql'
-- 在MySQL命令行执行一个sql文件

drop database if exists goods;
create database goods character set utf8 collate utf8_bin;

grant select, insert, update, delete on goods.* to 'www-data'@'localhost' identified by 'www-data';

use goods;

create table if not exists `Goods` (
    `id` varchar(50) primary key not null,
    `videoUrl` varchar(100) not null,
    `stars` int not null,
    `discount` int not null,
    `buyCount` int not null,
    `taobaoPrice` int not null,
    `price` int not null,
    `title` varchar(100) not null,
    `imgUrl` varchar(100) not null,
    `labels` varchar(100) not null,
    `createdAt` datetime,
    `updatedAt` datetime
) engine=innodb default charset=utf8;