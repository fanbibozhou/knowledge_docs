## 01-MySQL基础&SQL入门

### 1.数据库的基本概念

#### 1.1什么是数据库

- 数据库（DataBase）就是存储和管理数据的仓库
- 本质上就是一个文件系统，以文件的方式，将数据保存在电脑上

#### 1.2为什么使用数据库

- 数据存储方式的比较

| 存储方式 | 优点                                                         | 缺点                                           |
| :------- | ------------------------------------------------------------ | ---------------------------------------------- |
| 内存     | 速度快                                                       | 不能永久保存，数据是临时状态的                 |
| 文件     | 数据是可以永久保存的                                         | 使用IO流操作文件，不方便                       |
| 数据库   | 1.数据可以永久保存 <br />2.方便存储和管理数据 <br />3.使用统一的方式操作数据库 (SQL) | 占用资源，有些数据库需要付费（比如Oracle数据库 |

**通过上面的比较，我们可以看出，使用数据库存储数据，用户可以非常方便对数据库中的数据进行增加、删除、修改以及查询操作。**

#### 1.3 开发中常见的数据库

| 数据库名        | 介绍                                                         |
| :-------------- | ------------------------------------------------------------ |
| **MySQL数据库** | 开源免费的数据库<br />因为免费开源，运作简单的特点，常作为中小型的项目的数据库首选<br />MySQL1996年开始运作，目前以及被Oracle公司收购了，MySQL6.x开始收费 |
| Oracle数据库    | 收费的大型数据库，Oracle公司的核心产品<br />安全性高         |
| DB2             | IBM公司的数据库产品，收费的超大型数据库。<br />常在银行系统中使用 |
| SQL Server      | MicroSoft微软公司收费的中型数据库。<br />C#、.net等语言常使用<br />但该数据库只能运行在windows机器上，扩展性、稳定性、安全性、性能都表现平平。 |

为什么选择MySQL？

​	1、功能强大，足以应付web应用开发

​	2、开源，免费

### 2 .MySQL的启动和关闭

```mysql
1、首先以管理员身份打开dos窗口
2、启动MySQL
	net start mysql57
3、关闭mysl
	net stop mysql57
```

#### 2.1命令行登录数据库

​	MySQL是一个需要账户名密码登录的数据库，登陆后使用，它提供了一个默认的root账户，使用安装时设置的密码即可登录

| 命令                              | 说明                                              |
| :-------------------------------- | ------------------------------------------------- |
| mysql -u root -p 密码             | 使用指定用户名和密码登录当前计算机中的MySQL数据库 |
| mysql -h 主机IP -u 用户名 -p 密码 | -h 指定IP 方式进行登录                            |

退出命令

```mysql
exit或者quit
```

#### 2.2MySQL的目录结构

- MySQL安装目录

MySQL的默认安装目录在 C:\Program Files\MySQL\MySQL Server 5.7

| 目录    | 目录内容                   |
| :------ | -------------------------- |
| bin     | 放置一些可执行文件         |
| docs    | 文档                       |
| include | 包含（头）文件             |
| lib     | 依赖库                     |
| share   | 用于存放字符集、语言等信息 |

2.3 数据库管理系统

1）什么是数据库管理系统

​	数据库管理系统(DataBase Management System, DBMS) : 指一种操作和管理维护数据库的大型软件件。

MySQL就是一个数据库管理系统软件，安装了MySQL的电脑，我们叫它数据库服务器。

2）数据库管理系统的作用

​	用于建立、使用和维护数据库，对数据库进行统一的管理

3）数据库管理系统、数据库和表之间的关系

​	MySQL中管理着很多数据库，在实际开发环境中，一个数据库一般对应一个应用，数据库当中保存着多张表，每一张表对应着不同的业务，表中保存着对应业务的数据。

![](https://gitee.com/iscn/md_images/raw/master/%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F/QQ%E6%88%AA%E5%9B%BE20211003210703.png)

### 3.SQL(重点)

1）什么是SQL？

​	结构化查询语言（Structured Query Language）简称SQL，是一种特殊目的的编程语言，是一种数据库查询和程序设计语言，用于存取数据以及查询、更新和管理关系数据库系统。

2）SQL的作用

- 是所有关系型数据库的统一查询规范，不同的关系型数据库都支持SQL
- 所有的关系型数据库都可以使用SQL
- 不同数据库之间的SQL有一些区别 方言

#### 3.2 SQL通用语法

1）SQL语句可以单行或者多行书写，以分号结尾；

2）可以使用空格和tab缩进来增加语句的可读性

3）MySQL使用SQL不区分大小写，一般关键字大写，数据库名、表名、列名小写、

4）注释方式

| 注释语法 | 说明                |
| :------- | ------------------- |
| -- 空格  | 单行注释            |
| /* */    | 多行注释            |
| #        | MySQL特有的单行注释 |

#### 3.3 SQL的分类

| 分类          | 说明                                                         |
| ------------- | :----------------------------------------------------------- |
| 数据定义语言  | 简称DDL（Data Definnition Language），用来定义数据库对象：数据库，表，列等。 |
| 数据操作语言  | 简称DML（Data Manipulation Language），用来对数据库中表的记录进行更新。 |
| 数据查询语 言 | 简称DQL(Data Query Language)，用来查询数据库中表的记录。     |
| 数据控制语 言 | 简称DCL(Date Control Language)，用来定义数据库的访问权限和安全级别， 及创建用户。(了解) |

注：我们重点学习DML与DQL

![](https://gitee.com/iscn/md_images/raw/master/%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F/QQ%E6%88%AA%E5%9B%BE20211003212916.png)

#### 3.4 DDL操作数据库

##### 3.4.1 创建数据库

| 命令                                            | 说明                                                     |
| ----------------------------------------------- | -------------------------------------------------------- |
| create database 数据库名                        | 创建指定名称的数据库                                     |
| create database 数据库名 character set 字符集； | 创建指定名称的数据库，并且指定字符集（一般都 指定utf-8） |

代码示例

```mysql
/*
方式1 直接指定数据库名进行创建
默认数据库字符集为：latin1
*/
CREATE DATABASE db1;
/*
方式2 指定数据库名称，指定数据库的字符集
一般都指定为 utf8,与Java中的编码保持一致
*/
CREATE DATABASE db1_1 CHARACTER SET utf8;
```

##### 3.4.2 查看/选择数据库

| 命令                          | 说明                      |
| ----------------------------- | ------------------------- |
| use 数据库                    | 切换数据库                |
| select database();            | 查看当前正在使用的数据库  |
| show databases；              | 查看MySQL中都有哪些数据库 |
| show create database 数据库名 | 查看一个数据库的定义信息  |

代码示例

```mysql
-- 切换数据库 从db1 切换到 db1_1
USE db1_1;
-- 查看当前正在使用的数据库
SELECT DATABASE();
-- 查看Mysql中有哪些数据库
SHOW DATABASES;
-- 查看一个数据库的定义信息
SHOW CREATE DATABASE db1_1;
```

##### 3.4.3 修改数据库

修改数据库字符集

| 命令                                           | 说明                   |
| ---------------------------------------------- | ---------------------- |
| alter database 数据库名 character set 字符集； | 数据库的字符集修改操作 |

```mysql
-- 将数据库db1 的字符集 修改为 utf8
ALTER DATABASE db1 CHARACTER SET utf8;
-- 查看当前数据库的基本信息，发现编码已更改
SHOW CREATE DATABASE db1;
```

##### 3.4.4 删除数据库

| 命令                   | 说明                          |
| ---------------------- | ----------------------------- |
| drop database 数据库名 | 从MySQL中永久的删除某个数据库 |

代码示例

```mysql
-- 删除某个数据库
DROP DATABASE db_1;
```

#### 3.5 DDL 操作数据表

##### 3.5.1 MySQL常见的数据类型

1）常用的数据类型

| 类型    | 描述                                        |
| ------- | ------------------------------------------- |
| int     | 整型                                        |
| double  | 浮点型                                      |
| varchar | 字符串型                                    |
| date    | 日期类型，yyyy-MM-dd,只有年月日，没有时分秒 |

2） 详细的数据类型（了解）

![](https://gitee.com/iscn/md_images/raw/master/%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F/QQ%E6%88%AA%E5%9B%BE20211003214826.png)

注意：MySQL中的char类型与varchar类型，都对应了Java中的字符串类型，区别在于：

- char类型是固定长度的：根据定义字符串长度分配足够的空间
- varchar类型是可变长度的：只使用字符串所需的空间

比如：保存字符串“abc”

```mysql
x char(10) 占用10个字节
y varchar(10) 占用3个字节
```

适用场景：

- char类型适合存储固定长度的字符串，比如密码，性别一类
- varchar类型适合存储在一定范围内，有长度变化的字符串

##### 3.5.2 创建表

语法格式：

```mysql
CREATE TABLE 表名(
字段名称1 字段类型（长度），
字段名称2 字段类型 注意 最后一列不要加逗号
)；
```

- 需求1：创建商品分类表

```mysql
表名：category
表中字段：
	分类ID：cid，整型
	分类名称：cname，字符串类型，指定长度20
	分类时间: cdate,为年月日的日期类型
```

SQL实现

```mysql
-- 切换到数据库 db1
USE db1;
-- 创建表
CREATE TABLE category(
cid INT,
cname VARCHAR(20),
tdate DATE
);
```

- 需求2：快速创建一个表结构相同的表（复制表结构）

- 语法格式：

```mysql
create table 新表名 like 旧表名
```

代码示例

```mysql
-- 创建一个表结构与 test1 相同的 test2表
CREATE TABLE test2 LIKE test1;
-- 查看表结构
DESC test2;
```

##### 3.5.3 查看表

| 命令          | 说明                       |
| ------------- | -------------------------- |
| show tables； | 查看当前数据库中的所有表名 |
| desc 表名     | 查看数据表的结构           |

代码示例

```mysql
-- 查看当前数据库中的所有表名
SHOW TABLES;
-- 显示当前数据表的结构
DESC category;
-- 查看创建表的SQL语句
SHOW CREATE TABLE category;
```

##### 3.5.4 删除表

| 命令                        | 说明                                           |
| --------------------------- | ---------------------------------------------- |
| drop table 表名;            | 删除表（从数据库中永久删除某一张表             |
| drop table if exists 表名； | 判断表是否存在，存在就删除，不存在就不执行删除 |

代码示例

```mysql
-- 直接删除 test1 表
DROP TABLE test1;
-- 先判断 再删除test2表
DROP TABLE IF EXISTS test2;
```

##### 3.5.5 修改表

1）修改表名

- 语法格式

```mysql
rename table 旧表名 to 新表名；
```

- 需求：将category表改为category1

```mysql
RENAME TABLE category TO categoty1;
```

2) 修改表的字符集

- 语法格式

```mysql
alter table 表名 character set 字符集;
```

- 需求：将category表的字符集修改为gbk

```mysql
ALTER TABLE category CHARACTER SET gbk;
```

3) 向表中添加列，关键字 ADD

- 语法格式

```mysql
alter table 表名 add 字段名称 字段类型
```

- 需求：为分类表添加一个新的字段为 分类描述 cdesc varchar(20)

```mysql
# 为分类表添加一个新的字段为 分类描述 cdesc varchar(20)
ALTER TABLE category ADD cdesc VARCHAR(20);
```

4) 修改表中列的数据类型或长度 ，关键字MODIFY

- 语法格式：

```mysql
alter table 表名 modify 字段名称 字段类型
```

- 需求：对分类表的描述字段进行修改，类型为varchar(50)

```mysql
ALTER TABLE category MODIFY cdesc vatchar(50);
```

5) 修改列名称，关键字CHANGE

- 语法格式

```mysql
alter table 表名 change 旧列名 新列名 类型（长度）;
```

- 需求: 对分类表中的 cdesc字段进行更换, 更换为 description varchar(30)

```mysql
ALTER TABLE category CHANGE cdesc description varchar(30);
```

6) 删除列，关键字DROP

- 语法格式

```mysql
alter table 表名 drop 列名;
```

- 需求：删除分类表中的descrition这列

```mysql
ALTER TABLE category DROP description;
```

#### 3.6 DML操作表中数据

SQL中的DML用于对表中的数据进行增删改查

##### 3.6.1 插入数据

- 语法格式

```mysql
insert into 表名 (字段名1，字段名2...) values(字段值1，字段值2...);
```

1) 代码准备，创建一个学生表：

```mysql
表名：student
表中字段：
学员ID, sid int
姓名， sname varchar(20)
年龄， age int
性别， sex char(1)
地址， address varchar(40)
# 创建学生表
CREATE TABLE student(
sid INT,
sname VARCHAR(20),
age INT,
sex CHAR(1),
address VARCHAR(40)
);
```

2) 向学生表中添加数据，3种方式

- 方式1：插入全部字段，将所有字段名都写出来

```mysql
INSERT INTO student (sid,sname,age,sex,address) VALUES(1,'孙悟空',20,'男','花果
山');
```

- 方式2：插入全部字段，不写字段名

```mysql
INSERT INTO student VALUES(2,'孙悟饭',10,'男','地球');
```

- 方式3：插入指定字段的值

```mysql
INSERT INTO category (cname) VALUES('白骨精');
```

- 注意
  - 值与字段必须要对应，个数相同&数据类型相同
  - 值的数据大小，必须在字段指定的长度范围内
  - varchar char date类型的值必须使用单引号，或者双引号包裹。
  - 如果要插入空值，可以忽略不写，或者插入null
  - 如果插入指定字段的值，必须要写上列名

##### 3.6.2更改数据

- 语法格式1：不带条件的修改

```mysql
update 表名 set 列名 = 值;
```

- 语法格式2：带条件的修改

```mysql
uodate 表名 set 列名 = 值 [where 条件表达式：字段名 = 值];
```

1）不带条件的修改，将所有的性别改为女（慎用！！！）

```mysql
UPDATE student SET sex = '女';
```

2）带条件的修改，将sid为3的学生，性别改为男

```mysql
UPDATE student SET sex = "男" WHERE sid = 3;
```

3）一次修改多个列，将sid为2的学员，年龄改成20，地址改为北京

```mysql
UPDATE student SET age = 20 , address = '北京' WHERE sid = 2;
```

##### 3.6.3 删除数据

- 语法格式1：删除所有数据

```mysql
delete from 表名;
```

- 语法格式2：指定条件删除数据

```mysql
delete from 表名 [where 字段名 = 值];
```

1)删除sid为2的数据

```mysql
DELETE FROM student WHERE sid = 2;
```

2）删除所有数据

```mysql
DELETE FROM student ;
```

3）如果要删除表中的所有数据，有两种做法

> 1. `delete from 表名；`不推荐，有多少条记录旧执行多少次删除操作，效率低
> 2. `truncate table 表名；`推荐，先删除整张表，然后再重新创建一张一模一样的表，效率高

```mysql
truncate table student;
```

#### 3.7 DQL查询表中数据

##### 3.7.1准备数据

```mysql
#创建员工表
表名 emp
表中字段：
eid 员工id，int
ename 姓名，varchar
sex 性别，char
salary 薪资，double
hire_date 入职时间，date
dept_name 部门名称，varchar
#创建员工表
CREATE TABLE emp(
eid INT,
ename VARCHAR(20),
sex CHAR(1),
salary DOUBLE,
hire_date DATE,
dept_name VARCHAR(20)
);
#添加数据
INSERT INTO emp VALUES(1,'孙悟空','男',7200,'2013-02-04','教学部');
INSERT INTO emp VALUES(2,'猪八戒','男',3600,'2010-12-02','教学部');
INSERT INTO emp VALUES(3,'唐僧','男',9000,'2008-08-08','教学部');
INSERT INTO emp VALUES(4,'白骨精','女',5000,'2015-10-07','市场部');
INSERT INTO emp VALUES(5,'蜘蛛精','女',5000,'2011-03-14','市场部');
INSERT INTO emp VALUES(6,'玉兔精','女',200,'2000-03-14','市场部');
INSERT INTO emp VALUES(7,'林黛玉','女',10000,'2019-10-07','财务部');
INSERT INTO emp VALUES(8,'黄蓉','女',3500,'2011-09-14','财务部');
INSERT INTO emp VALUES(9,'吴承恩','男',20000,'2000-03-14',NULL);
INSERT INTO emp VALUES(10,'孙悟饭','男', 10,'2020-03-14',财务部);
INSERT INTO emp VALUES(11,'兔八哥','女', 300,'2010-03-14',财务部);
```

##### 3.7.2 简单查询

- 查询不会对数据库就行修改，知识一种显示数据的方式
- SELECT语法格式

```mysql
select 列名 from 表名;
```

- 需求1：查询emp中的所有数据

```mysql
SELECT * FROM emp; -- 使用 * 表示所有列
```

- 需求1：查询emp表中的所有记录，仅显示id和name字段

```mysql
SELECT eid,ename FROM emp;
```

- 需求3：将所有员工信息查询处理，并将列名改为中文

```mysql
# 使用 AS关键字,为列起别名
SELECT
eid AS '编号',
ename AS '姓名' ,
sex AS '性别',
salary AS '薪资',
hire_date '入职时间', -- AS 可以省略
dept_name '部门名称'
FROM emp;
```

- 需求4：查询一共有几个部门

```mysql
-- 使用distinct 关键字,去掉重复部门信息
SELECT DISTINCT dept_name FROM emp;
```

- 需求5：将所有员工的工资+1000元进行显示
  - 运算查询（查询结构参与运算）

```mysql
SELECT ename , salary + 1000 FROM emp;
```

##### 3.7.3 条件查询

**如果查询语句中没有设置条件，就会查询所有的行信息，在实际应用中，一定要指定查询条件，对记录进行过滤**

- 语法格式

```mysql
select 列名 from 表名 where 条件表达式
```

**运算符**

1）比较运算符

| 运算符             | 说明                                                         |
| ------------------ | ------------------------------------------------------------ |
| > < <= >= = <> !=  | 大于、小于、小于(大于)等于、不等于                           |
| BETWEEN ... AND... | 显示在某一区间的值，例如<br />2000-10000之间：BETWEEN 2000 AND 10000 |
| IN(集合)           | 集合表示多个值，使用逗号分隔，例如name in(悟空，八戒)<br />in中的每个数据都会作为一次条件，只有满足条件就会显示 |
| LIKE '%张%'        | 模糊查询                                                     |
| IS NULL            | 查询某一列为NULL的值，注：不能写=NULL                        |

2）逻辑运算符

| 运算符  | 说明             |
| ------- | ---------------- |
| and&&   | 多个条件同时成立 |
| or \|\| | 多个条件任一成立 |
| not     | 不成立，取反。   |

- 需求1：

```mysql
# 查询员工姓名为黄蓉的员工信息
# 查询薪水价格为5000的员工信息
# 查询薪水价格不是5000的所有员工信息
# 查询薪水价格大于6000元的所有员工信息
# 查询薪水价格在5000到10000之间所有员工信息
# 查询薪水价格是3600或7200或者20000的所有员工信息
```

代码实现

```mysql
# 查询员工姓名为黄蓉的员工信息
SELECT * FROM emp WHERE ename = '黄蓉';
# 查询薪水价格为5000的员工信息
SELECT * FROM emp WHERE salary = 5000;
# 查询薪水价格不是5000的所有员工信息
SELECT * FROM emp WHERE salary != 5000;
SELECT * FROM emp WHERE salary <> 5000;
SELECT *FROM emp WHERE NOT salary = 5000;
# 查询薪水价格大于6000元的所有员工信息
SELECT * FROM emp WHERE salary > 6000;
# 查询薪水价格在5000到10000之间所有员工信息
SELECT * FROM emp WHERE salary BETWEEN 5000 AND 10000;
# 查询薪水价格是3600或7200或者20000的所有员工信息
-- 方式1: or
SELECT * FROM emp WHERE salary = 3600 OR salary = 7200 OR salary = 20000;
-- 方式2: in() 匹配括号中指定的参数
SELECT * FROM emp WHERE salary IN(3600,7200,20000);
```

- 需求2

```mysql
# 查询含有'精'字的所有员工信息
# 查询以'孙'开头的所有员工信息
# 查询第二个字为'兔'的所有员工信息
# 查询没有部门的员工信息
# 查询有部门的员工信息
```

模糊查询 通配符

| 通配符 | 说明                     |
| ------ | ------------------------ |
| %      | 表示匹配任意多个字符串， |
| -      | 表示匹配一个字符         |

代码实现

```mysql
#查询含有'精'字的所有员工信息
SELECT * FROM emp WHERE ename LIKE '%精%';
# 查询以'孙'开头的所有员工信息
SELECT * FROM emp WHERE ename LIKE '孙%';
# 查询第二个字为'兔'的所有员工信息
SELECT * FROM emp WHERE ename LIKE '_兔%';
# 查询没有部门的员工信息
SELECT * FROM emp WHERE dept_name IS NULL;
-- SELECT * FROM emp WHERE dept_name = NULL;
# 查询有部门的员工信息
SELECT * FROM emp WHERE dept_name IS NOT NULL;
```

## 