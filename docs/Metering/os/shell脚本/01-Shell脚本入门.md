# 01-Shell脚本入门

## 1.1 Shell 是什么  

Shell 英文是“壳”，Shell 是一块包裹着系统核心的壳，处于操作系统的最外层。  

Shell 是一个用 C 语言编写的程序，它是用户使用 Linux 的桥梁。通过编写 Shell 命令发送给 linux 内核去执行，操作就是计算机硬件，所以 Shell 命令是用户操作计算机硬件的桥梁，Shell 是命令，类似于 Windows 系统中的Dos命令。 

![](https://gitee.com/iscn/md_images/raw/master/%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F/1676640722121-3c2e37b7-4813-487b-85e6-d041fcd4fac7.png)

同时它可以作为命令语言，它交互式解释和执行用户输入的命令或者自动地解释和执行预先设定好的一连串的命令；作为程序设计语言，它定义了各种变量和参数，并提供了许多在高级语言中才具有的控制结构，包括循环和分支。

**为什么学习 Shell 脚本？**  

Shell 脚本语言的好处是简单、易学、易用，适合处理文件和目录之类的对象，以简单的方式快速完成某些复杂的事情。通过 Shell 命令编程语言来提高 Linux 系统的管理工作效率。

## 1.2 Shell 的运行过程    

![](https://gitee.com/iscn/md_images/raw/master/%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F/1676640822332-e2c6614e-f337-4724-8931-1e8d28da05f4.png)当用户下达指令给该操作系统的时候，实际上是把指令告诉 shell，经过 shell 解释， 处理后让内核做出相应的动作。系统的回应和输出的信息也由 shell 处理，然后显示在用户的屏幕上。

##  1.3 Shell 解析器  

**查看 linux 系统 centos 支持的 shell 解析器**

```shell
cat /etc/shells
```

执行结果：

```bash
[root@server1 ~]# cat /etc/shells

/bin/sh

/bin/bash

/usr/bin/sh

/usr/bin/bash
```

**打印输出当前 centos 默认的解析器是 bash 语法：**

```shell
语法
echo $SHELL

[root@server1 ~]# echo $SHELL
/bin/bash
```

其中：`echo`：用于打印输出数据到终端，`$SHELL`:是全局共享的读取解析器类型环境变量，所有的 Shell 程序都可以读取的变量   

## 1.4 Shell 编写格式与执行方式  

### 1.4.1 脚本格式  

**1. 脚本文件后缀名规范  **

Shell 脚本文件就是一个文本文件，后缀名建议使用`.sh`结尾。 

**2. 首行格式规范 ** 

```shell
#!/bin/bash
```

设置当前 Shell 脚本文件采用 bash 解析器运行脚本代码  

**3. 注释格式  **

单行注释  

```shell
# 注释内容
```

多行注释  

```shell
:<<!
#注释内容 1
#注释内容 2
!
```

**【示例】第一个 Shell 脚本 HelloWorld**  

1. 进入 Linux 终端，编写一个 Shell 脚本 hello.sh。  

```shell
[root@server1 shell]# touch hello.sh
[root@server1 shell]# vi hello.sh
```

2. 编辑文件  

```shell
#!/bin/bash 
echo 'hello world!'  
```

### 1.4.2 脚本文件执行的三种方式

| 执行方式            | 命令            | 描述                                                         |
| ------------------- | --------------- | ------------------------------------------------------------ |
| sh 解析器执行方式   | `sh 脚本文件`   | 利用 sh 命令执行脚本，本质就是使 用 Shell 解析器运行脚本文件 |
| bash 解析器执行方式 | `bash 脚本文件` | 利用 bash 命令执行脚本，本质就是 使用 Shell 解析器运行脚本文件 |
| 仅路径执行方式      | `./脚本文件`    | 执行当前目录下脚本文件，注意：脚本文件自己执行需要具有可执行权限，否 则无法执行。 |


>  添加权限：chmod a+x helloworld.sh  

三种方式的区别：`sh`或 `bash`执行脚本文件方式是直接使用 Shell 解析器运行脚本文件，不需要可执行权限，仅路径方式执行脚本文件方式，需要可执行权限。 

```bash
[root@server1 shell]# sh hello.sh 		# sh方式执行	
hello world!
[root@server1 shell]# bash hello.sh 	# bash方式执行
hello world!
[root@server1 shell]# ./hello.sh		# 仅路径方式执行
-bash: ./hello.sh: Permission denied		<font style="color:#DF2A3F;"># 权限不够</font>
[root@server1 shell]# chmod a+x hello.sh 		<font style="color:#DF2A3F;"># 分配权限</font>
[root@server1 shell]# ./hello.sh 
hello world!
```

##  1.5 解释执行多个命令

>  案例：执行 test.sh 脚本，实现在/root/shell/目录下创建一个 onetest.txt，在 onetest.txt 文件中增加内容“hello onetest shell”  

**实现步骤： **

1. 使用 touch 创建test.sh文件

```bash
[root@server1 shell]# touch /root/shell/test.sh
[root@server1 shell]# vim test.sh
```

  2. 编辑脚本文件

> 命令 1：vim 创建文件，文件名/root/shell/onetest.txt 3.2 
>
> 命令 2：输出数据“hello onetest shell”到 onetest.txt 文件中 输出数据到文件中的命令：`数据 >>文件名 `
>
> `echo “hello onetest shell”>>/root/bjsxt/onetest.txt`    

```shell
#!/bin/bash
touch /root/shell/onetest.txt
echo "hello onetest shell" >> /root/shell/onetest.txt
```

3. 执行脚本文件使用 cat 命令查看文件内容  

```bash
[root@server1 shell]# ll       	# 查看目录，onetest.txt文件还没有被创建
total 8
-rwxr-xr-x. 1 root root 32 Feb 17 21:47 hello.sh
-rw-r--r--. 1 root root 96 Feb 17 22:06 test.sh      
[root@server1 shell]# sh test.sh 		# 执行脚本
[root@server1 shell]# cat onetest.txt 	# 查看结果
hello onetest shell
```