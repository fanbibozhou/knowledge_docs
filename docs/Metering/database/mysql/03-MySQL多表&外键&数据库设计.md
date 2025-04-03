# 03-MySQL多表&外键&数据库设计

### 1. 多表

#### 1.1 多表简述

实际开发中，一个项目通常需要很多张表才能完成。 例如一个商城项目的数据库,需要有很多张表：用户表、分类表、商品表、订单表....

#### 1.2 单表的缺点

##### 1.2.1 数据准备

1）创建一个数据库db3

```sql
CREATE DATABASE dbs character set utf8;
```

2)数据库中创建一个员工表emp，

- 包含如下列 eid,ename,age,dep_name,dep_location
- eid为主键并自动增长，添加5条数据

```sql
-- 创建emp表 主键自增
CREATE TABLE emp(
eid INT PRIMARY KEY AUTO_INCREMENT,
ename VARCHAR(20),
age INT ,
dep_name VARCHAR(20),
dep_location VARCHAR(20)
);
```

```sql
-- 添加数据
INSERT INTO emp (ename, age, dep_name, dep_location) VALUES ('张百万', 20, '研发
部', '广州');
INSERT INTO emp (ename, age, dep_name, dep_location) VALUES ('赵四', 21, '研发
部', '广州');
INSERT INTO emp (ename, age, dep_name, dep_location) VALUES ('广坤', 20, '研发
部', '广州');
INSERT INTO emp (ename, age, dep_name, dep_location) VALUES ('小斌', 20, '销售
部', '深圳');
INSERT INTO emp (ename, age, dep_name, dep_location) VALUES ('艳秋', 22, '销售
部', '深圳');
INSERT INTO emp (ename, age, dep_name, dep_location) VALUES ('大玲子', 18, '销售
部', '深圳');
```

##### 1.2.2 单表的问题

1）冗余，同一个字段出现大量重复的数据

![](https://gitee.com/iscn/md_images/raw/master/%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F/QQ%E6%88%AA%E5%9B%BE20211005100827.png)

#### 1.3 解决方案

##### 1.3.1 设计为两张表

1. 多表方式设计

   department 部门表：id，dep_name,dep_location

   employee 员工表：eid，ename,age,dep_id

2. 删除emp，重新创建两张表

```sql
-- 创建部门表
-- 一方,主表
CREATE TABLE department(
id INT PRIMARY KEY AUTO_INCREMENT,
dep_name VARCHAR(30),
dep_location VARCHAR(30)
);
-- 创建员工表
-- 多方 ,从表
CREATE TABLE employee(
eid INT PRIMARY KEY AUTO_INCREMENT,
ename VARCHAR(20),
age INT,
dept_id INT
);
```

3.添加部门表 数据

```sql
-- 添加2个部门
INSERT INTO department VALUES(NULL, '研发部','广州'),(NULL, '销售部', '深圳');
SELECT * FROM department;
```

4.添加员工表数据

```sql
-- 添加员工,dep_id表示员工所在的部门
INSERT INTO employee (ename, age, dept_id) VALUES ('张百万', 20, 1);
INSERT INTO employee (ename, age, dept_id) VALUES ('赵四', 21, 1);
INSERT INTO employee (ename, age, dept_id) VALUES ('广坤', 20, 1);
INSERT INTO employee (ename, age, dept_id) VALUES ('小斌', 20, 2);
INSERT INTO employee (ename, age, dept_id) VALUES ('艳秋', 22, 2);
INSERT INTO employee (ename, age, dept_id) VALUES ('大玲子', 18, 2);
SELECT * FROM employee;
```

##### 1.3.2 表关系分析

- 部门表与员工表的关系

![](https://gitee.com/iscn/md_images/raw/master/%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F/QQ%E6%88%AA%E5%9B%BE20211005101927.png)

1）员工表中有一个字段dept_id 与部门表中的主键对应，员工表的这个字段就叫做外键

2） 拥有外键的员工表被称为从表，与外键对应的主键所在的表叫做主表

##### 1.3.3 多表设计上的问题

- 当我们在员工表的dept_id里面输入不存在的部门id，数据依然可以添加，显然这是不合理的

```sql
-- 插入一条 不存在部门的数据
INSERT INTO employee (ename,age,dept_id) VALUES('无名',35,3);
```

- 实际上我们应该保证，员工表所添加的dept_id,必须在部门表中存在。
- 解决方案：使用外键约束，约束dept_id，必须是部门表中存在的id

#### 1.4 外键约束

##### 1.4.1 什么是外键

- 外键指的是在 从表 中 与 主表 的主键对应的那个字段,比如员工表的 dept_id,就是外键
- 使用外键约束可以让两张表之间产生一个对应关系,从而保证主从表的引用的完整性

##### 1.4.2 创建外键约束

语法格式：

```sql
1. 新建表时添加外键
```

```sql
[CONSTRAINT] [外键约束名称] FOREIGN KEY(外键字段名) REFERENCES 主表名(主键字段名)
```

​	2.已有表添加外键

```sql
ALTER TABLE 从表 ADD [CONSTRAINT] [外键约束名称] FOREIGN KEY (外键字段名) REFERENCES 主表(主 键字段名);
```

##### 1.4.3 删除外键约束

语法格式

```sql
alter table 从表 drop foreign key 外键约束名称
```

##### 1.4.4 外键约束的注意事项

1）从表外键类型必须与主键类型一致 否则创建失败

2）添加数据时，应该先添加主表中的数据

3）删除数据时，应该先删除从表中的数据

##### 1.4.5 级联删除操作（了解）

- **如果想实现删除主表数据的同时，也删除掉从表数据，可以使用级联删除操作**

```sql
级联删除
ON DELETE CASCADE
```

```sql
-- 重新创建添加级联操作
CREATE TABLE employee(
eid INT PRIMARY KEY AUTO_INCREMENT,
ename VARCHAR(20),
age INT,
dept_id INT,
CONSTRAINT emp_dept_fk FOREIGN KEY(dept_id) REFERENCES department(id)
-- 添加级联删除
ON DELETE CASCADE
);
-- 添加数据
INSERT INTO employee (ename, age, dept_id) VALUES ('张百万', 20, 1);
INSERT INTO employee (ename, age, dept_id) VALUES ('赵四', 21, 1);
INSERT INTO employee (ename, age, dept_id) VALUES ('广坤', 20, 1);
INSERT INTO employee (ename, age, dept_id) VALUES ('小斌', 20, 2);
INSERT INTO employee (ename, age, dept_id) VALUES ('艳秋', 22, 2);
INSERT INTO employee (ename, age, dept_id) VALUES ('大玲子', 18, 2);
-- 删除部门编号为2 的记录
DELETE FROM department WHERE id = 2;
```

- 员工表中，外键值是2的记录，也被删除了

### 2. 多表关系设计

| 表与表之间的三种关系                               |
| -------------------------------------------------- |
| 一对多关系：最常见的关系，学生对班级，员工对部门   |
| 多对多关系：学生与课程，用户与角色                 |
| 一对一关系：使用较少，因为一对一关系可以合成一张表 |

#### 2.1 一对多关系（常见）

- 一对多关系(1:n)
  - 例如：班级和学生，部门和员工，客户和订单，分类和商品
- 一对多建表原则
  - 在从表（多方）创建一个字段，字段作为外键指向主表（一方）的主键

![](https://gitee.com/iscn/md_images/raw/master/%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F/%E4%B8%80%E5%AF%B9%E5%A4%9A.jpg)

#### 2.2 多对多关系（常见）

- 多对多（m：n）
  - 例如：老师和学生，学生和课程，用户和角色
- 多对多关系建表原则
  - 需要创建第三张表，中间表中至少两个字段，这两个字段分别作为外键指向各自一方的主键

![](https://gitee.com/iscn/md_images/raw/master/%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F/%E5%A4%9A%E5%AF%B9%E5%A4%9A.jpg)

#### 2.3 一对一关系（了解）

- 一对一（1：1）
  - 在实际的开发中应用不多，因为一对一可以创建称一张表
- 一对一建表原则
  - 外键唯一主表的主键和从表的外键（唯一），形成主外键关系，外键唯一UNIQUE

![](https://gitee.com/iscn/md_images/raw/master/%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F/%E4%B8%80%E5%AF%B9%E4%B8%80.jpg)

### 3.多表查询

#### 3.1 什么是多表查询

- DQL:查询多张表，获取到需要的数据
- 比如 我们要查询家电分类下 都有哪些商品,那么我们就需要查询分类与商品这两张表

#### 3.2 数据准备

1）创建db3_2数据库

```sql
-- 创建 db3_2 数据库,指定编码
CREATE DATABASE db3_2 CHARACTER SET utf8;
```

2）创建分类表与商品表

```sql
#分类表 (一方 主表)
CREATE TABLE category (
cid VARCHAR(32) PRIMARY KEY ,
cname VARCHAR(50)
);
#商品表 (多方 从表)
CREATE TABLE products(
pid VARCHAR(32) PRIMARY KEY ,
pname VARCHAR(50),
price INT,
flag VARCHAR(2), #是否上架标记为：1表示上架、0表示下架
category_id VARCHAR(32),
-- 添加外键约束
FOREIGN KEY (category_id) REFERENCES category (cid)
);
```

3）插入数据

```sql
#分类数据
INSERT INTO category(cid,cname) VALUES('c001','家电');
INSERT INTO category(cid,cname) VALUES('c002','鞋服');
INSERT INTO category(cid,cname) VALUES('c003','化妆品');
INSERT INTO category(cid,cname) VALUES('c004','汽车');
#商品数据
INSERT INTO products(pid, pname,price,flag,category_id) VALUES('p001','小米电视
机',5000,'1','c001');
INSERT INTO products(pid, pname,price,flag,category_id) VALUES('p002','格力空
调',3000,'1','c001');
INSERT INTO products(pid, pname,price,flag,category_id) VALUES('p003','美的冰
箱',4500,'1','c001');
INSERT INTO products (pid, pname,price,flag,category_id) VALUES('p004','篮球
鞋',800,'1','c002');
INSERT INTO products (pid, pname,price,flag,category_id) VALUES('p005','运动
裤',200,'1','c002');
INSERT INTO products (pid, pname,price,flag,category_id) VALUES('p006','T
恤',300,'1','c002');
INSERT INTO products (pid, pname,price,flag,category_id) VALUES('p007','冲锋
衣',2000,'1','c002');
INSERT INTO products (pid, pname,price,flag,category_id) VALUES('p008','神仙
水',800,'1','c003');
INSERT INTO products (pid, pname,price,flag,category_id) VALUES('p009','大
宝',200,'1','c003');
```

#### 3.3 笛卡尔积

交叉连接查询，因为会产生笛卡尔积，所以基本不会使用

1）语法格式

```sql
SELECT 字段名 FROM 表1，表2;
```

2）使用交叉连接查询商品表和分类表

```sql
SELECT * FROM cetegory,products;
```

3）笛卡尔积

假设集合A={a, b}，集合B={0, 1, 2}，则两个集合的笛卡尔积为{(a, 0), (a, 1), (a, 2), (b, 0), (b, 1), (b, 2)}。

#### 3.4 多表查询的分类

##### 3.4.1 内连接查询

- 内连接的特点：
  - 通过指定的条件去匹配两张表中的数据，匹配上就显示，匹配不上就不显示
    - 比如通过：从表的外键=主表的主键的方式去匹配

- **隐式内连接**

**from子句 后面直接写 多个表名 使用where指定连接条件的 这种连接方式是 隐式内连接. **
**使用where条件过滤无用的数据**

语法格式

```sql
SELECT 字段名 FROM 左表, 右表 WHERE 连接条件;
```

1）查询所有商品信息和对应的分类信息

```sql
# 隐式内连接
SELECT * FROM products,category WHERE category_id = cid;
```

2）查询商品表的商品名称和价格，以及商品的分类信息

**可以通过给表起别名的方式，方便我们的查询**

```sql
SELECT
p.`pname`,
p.`price`,
c.`cname`
FROM products p , category c WHERE p.`category_id` = c.`cid`;
```

3）查询格力空调是属于哪一分类下的商品

```sql
#查询 格力空调是属于哪一分类下的商品
SELECT p.`pname`,c.`cname` FROM products p , category c
WHERE p.`category_id` = c.`cid` AND p.`pid` = 'p002';
```

- **显示内连接**

使用inner join ...on这种方式，就是显示内连接

语法格式

```sql
SELECT 字段名 FROM 左表 [INNER] JOIN 右表 ON 条件
-- inner 可以省略
```

1) 查询所有商品信息和对应的分类信息

```sql
# 显式内连接查询
SELECT * FROM products p INNER JOIN category c ON p.category_id = c.cid;
```

2）查询鞋服分类下，价格大于500的商品名称和价格

```sql
# 查询鞋服分类下,价格大于500的商品名称和价格
-- 我们需要确定的几件事
-- 1.查询几张表 products & category
-- 2.表的连接条件 从表.外键 = 主表的主键
-- 3.查询的条件 cname = '鞋服' and price > 500
-- 4.要查询的字段 pname price
SELECT
p.pname,
p.price
FROM products p INNER JOIN category c ON p.category_id = c.cid
WHERE p.price > 500 AND cname = '鞋服';
```

##### 3.4.2 外连接查询

- **左外连接**
  - 左外连接，使用LEFT OUTER JOIN， OUTER可以省略
  - 左外连接的特点
    - 以坐表为基准，匹配右边表中的数据，如果匹配的上，就展示匹配到的数据
    - 如果匹配不到，左表的数据正常显示，右表的展示为null

1）语法格式

```sql
SELECT 字段名 FROM 左表 LEFT JOIN 右边 ON 条件
```

```sql
-- 左外连接查询
SELECT * FROM category c LEFT JOIN products p ON c.`cid`= p.`category_id`;
```

![](https://gitee.com/iscn/md_images/raw/master/%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F/QQ%E6%88%AA%E5%9B%BE20211005162743.png)

2）左外连接，查询每个分类下的商品个数

```sql
# 查询每个分类下的商品个数
/*
1.连接条件: 主表.主键 = 从表.外键
2.查询条件: 每个分类 需要分组
3.要查询的字段: 分类名称, 分类下商品个数
*/
SELECT
c.`cname` AS '分类名称',
COUNT(p.`pid`) AS '商品个数'
FROM category c LEFT JOIN products p ON c.`cid` = p.`category_id`
GROUP BY c.`cname`;
```

- **右外连接**
  - 右外连接，使用RIGHT OUTER JOIN,OUTER可以省略
  - 右外连接的特点
    - 以右表为基准，匹配左边表中的数据，如果能匹配到，展示匹配到的数据
    - 如果匹配不到，右表中的数据正常展示, 左边展示为null

1）语法格式

```sql
SELECT 字段名 FROM 左表 RIGHT [OUTER ]JOIN 右表 ON 条件
```

```sql
-- 右外连接查询
SELECT * FROM products p RIGHT JOIN category c ON p.`category_id` = c.`cid`;
```

##### 3.4.3 各种连接方式的总结

![](https://gitee.com/iscn/md_images/raw/master/%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F/%E5%A4%9A%E8%A1%A8%E6%9F%A5%E8%AF%A2%E6%80%BB%E7%BB%93.jpg)

- 内连接：inner join ，只获取两张表中交集部分的数据
- 左外连接：left join，以左表为基准，查询左表的所有数据，以及与右表有交集的部分
- 右外连接：right join ，以右表为基准，查询右表的所有数据，以及与左表有交集的部分

### 4 子查询

#### 4.1 什么是子查询

- 子查询的的概念
  - 一条select查询语句的结果，作为另一条select语句的一部分
- 子查询的特点
  - 子查询必须放在小括号中
  - 子查询一般作为父查询的查询条件使用
- 子查询常见分类
  - where型子查询：将子查询的结果，作为父查询的比较条件
  - from型子查询：将子查询的结果，作为一张表，提供给父查询使用
  - exists型子查询：子查询的结果是单列多行, 类似一个数组, 父层查询使用 IN 函数 ,包含子查 询的结果

#### 4.2 子查询的结果作为查询条件

语法格式

```sql
SELECT 查询字段 FROM 表 WHERE 字段=（子查询）;
```

1、通过子查询的方式，查询价格最高的商品信息

```sql
# 通过子查询的方式, 查询价格最高的商品信息
-- 1.先查询出最高价格
SELECT MAX(price) FROM products;
-- 2.将最高价格作为条件,获取商品信息
SELECT * FROM products WHERE price = (SELECT MAX(price) FROM products);
```

2、查询化妆品分类下的商品名称和商品价格

```sql
#查询化妆品分类下的 商品名称 商品价格
-- 先查出化妆品分类的 id
SELECT cid FROM category WHERE cname = '化妆品';
-- 根据分类id ,去商品表中查询对应的商品信息
SELECT
p.`pname`,
p.`price`
FROM products p
WHERE p.`category_id` = (SELECT cid FROM category WHERE cname = '化妆品');
```

3、查询小于平均价格的商品信息

```sql
-- 1.查询平均价格
SELECT AVG(price) FROM products; -- 1866
-- 2.查询小于平均价格的商品
SELECT * FROM products
WHERE price < (SELECT AVG(price) FROM products);
```

#### 4.3 子查询的结果作为一张表

语法格式

```sql
SELECT 查询字段 FROM （子查询）表别名 WHERE 条件;
```

1、查询商品中,价格大于500的商品信息,包括 商品名称 商品价格 商品所属分类名称

```sql
-- 1. 先查询分类表的数据
SELECT * FROM category;
-- 2.将上面的查询语句 作为一张表使用
SELECT
p.`pname`,
p.`price`,
c.cname
FROM products p
-- 子查询作为一张表使用时 要起别名 才能访问表中字段
INNER JOIN (SELECT * FROM category) c
ON p.`category_id` = c.cid WHERE p.`price` > 500;
```

**注意： 当子查询作为一张表的时候，需要起别名，否则无法访问表中的字段。**

#### 4.4子查询结果是单列多行

- 子查询的结果类似一个数组，父层查询使用IN函数，包含子查询的结果

语法格式

```sql
SELECT 查询字段 FROM 表 WHERE 字段 IN （子查询）;
```

1、查询价格小于两千的商品，来源于哪些分类（名称）

```sql
# 查询价格小于两千的商品,来自于哪些分类(名称)
-- 先查询价格小于2000 的商品的,分类ID
SELECT DISTINCT category_id FROM products WHERE price < 2000;
-- 在根据分类的id信息,查询分类名称
-- 报错: Subquery returns more than 1 row
-- 子查询的结果 大于一行
SELECT * FROM category
WHERE cid = (SELECT DISTINCT category_id FROM products WHERE price < 2000);
```

#### 4.5 子查询总结

1. 子查询如果查出的是一个字段(单列), 那就在where后面作为条件使用. 
2. 子查询如果查询出的是多个字段(多列), 就当做一张表使用(要起别名).

### 5. 数据库设计

#### 5.1数据库三范式（空间最省）

- 概念：三范式就是设计数据库的规则
  - 为了建立冗余较小、结构合理的数据库，设计数据库时必须遵循一定的规则。在关系型数据 库中这种规则就称为范式。范式是符合某一种设计要求的总结。要想设计一个结构合理的关 系型数据库，必须满足一定的范式
  - 满足最低要求的范式是第一范式（1NF）。在第一范式的基础上进一步满足更多规范要求的 称为第二范式（2NF） ， 其余范式以此类推。一般说来，数据库只需满足第三范式(3NF）就 行了

**第一范式 1NF**

- 概念：
  - 原子性，做到列不可拆分
  - 第一范式式最基本的范式，数据库表里面字段都是单一属性的，不可再分，如果数据表里面的字段都是不可再分的最小数据单元，则满足第一范式。
- 示例：
  - 有一个字段叫国家城市contry，内容有中国上海、中国北京，
  - 可以继续拆分为中国和上海，分别代表国家和城市，不符合第一范式

**第二范式 2NF**

- 概念：
  - 在第一范式的基础上更进一步，目标是确保表中的每列都和主键相关。
  - 一张表只能描述一件事.

- 示例：
  - 学员信息表中其实在描述两个事物 , 一个是学员的信息,一个是课程信息
  - 如果放在一张表中,会导致数据的冗余,如果删除学员信息, 成绩的信息也被删除了

![](https://gitee.com/iscn/md_images/raw/master/%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F/QQ%E6%88%AA%E5%9B%BE20211005170612.png)

**第三范式 3NF**

- 概念：
  - 消除传递依赖
  - 表的信息，如果能够被推导出来，就不应该单独的设计一个字段来存放
- 示例：
  - 通过number与price字段就可以计算出总金额，不要在表中再做记录（空间最省）

![](https://gitee.com/iscn/md_images/raw/master/%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F/QQ%E6%88%AA%E5%9B%BE20211005170838.png)

#### 5.2 数据库反三范式

##### 5.2.1 概念

- 反范式化指的是通过增加冗余或重复的数据来提高数据库的读性能
- 浪费存储空间，节省查询时间（以空间换时间）

##### 5.2.2 什么是冗余字段？

- 设计数据库时，某一个字段属于一张表，但它同时出现在另一个或多个表，且完全等同于它在其本来所属表的意义表示，那么这个字段就是一个冗余字段

##### 5.2.3 反三范式示例

- 两张表，用户表，订单表，用户表中有一个字段name，而订单表也存在字段name

![](https://gitee.com/iscn/md_images/raw/master/%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F/QQ%E6%88%AA%E5%9B%BE20211005170838.png)

- 使用场景
  - 当需要查询“订单表”所有数据并且只需要“用户表”的name字段时, 没有冗余字段 就需要去join 连接用户表,假设表中数据量非常的大, 那么会这次连接查询就会非常大的消耗系统的性能.
  - 这时候冗余的字段就可以派上用场了, 有冗余字段我们查一张表就可以了.

##### 5.2.4 总结

- 创建一个关系型数据库设计，我们有两种选择

  1、尽量遵循范式理论的规约，尽可能少的冗余字段，让数据库设计看起来精致、优雅、让人心 醉。

   2，合理的加入冗余字段这个润滑剂，减少join，让数据库执行性能更高更快