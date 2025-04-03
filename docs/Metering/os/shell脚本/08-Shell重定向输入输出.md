# 08-Shell重定向输入输出

## 8.1 概念  

### 8.1.1 标准输入

从键盘读取用户输入的数据，然后再把数据拿到 Shell 程序中使用。  

### 8.1.2 标准输出

Shell 程序产生的数据，这些数据一般都是呈现到显示器上供用户浏览查看    

### 8.1.3 输入输出重定向

输入方向就是数据从哪里流向程序。数据默认从键盘流向程序，如果改变了它的方向， 数据就从其它地方流入，这就是输入重定向。   

输出方向就是数据从程序流向哪里。数据默认从程序流向显示器，如果改变了它的方向， 数据就流向其它地方，这就是输出重定向。  

## 8.2 文件描述符  

linux 命令默认从标准输入设备(stdin)获取输入，将结果输出到标准输出设备(stdout) 显示。一般情况下，标准输入设备就是键盘，标准输出设备就是终端，即显示器。  

在 linux shell 执行命令时，每个进程都和三个打开的文件相联系，并使用文件描述符 来引用这些文件。由于文件描述符不容易记忆，shell 同时也给出了相应的文件名。  

| 文件名          | 文件描述符 | 功能                     |
| --------------- | ---------- | ------------------------ |
| 标准输入stdin   | 0          | 获取键盘的输入数据       |
| 标准输出 stdout | 1          | 将正确数据输出到显示器上 |
| 标准错误 stderr | 2          | 将错误信息输出到显示器上 |


## 8.3 重定向命令列表  

| 命令                  | 说明                                               |
| --------------------- | -------------------------------------------------- |
| command > file        | 将输出重定向到 file。                              |
| command < file        | 将输入重定向到 file。                              |
| command >> file       | 将输出以追加的方式重定向到 file。                  |
| command < file1>file2 | 从 file1 文件读取数据，输出到 file2 文件           |
| n > file              | 将文件描述符为 n 的文件重定向到 file。             |
| n >> file             | 将文件描述符为 n 的文件以追加的方式重定向到 file。 |
| n >& m                | 将文件描述符 m 和 n 合并，输出到文件。             |
| n <& m                | 将文件描述符 m 和 n 合并，从文件读取输入。         |
| << tag                | 将开始标记 tag 和结束标记 tag 之间的内容作为输入。 |


### 8.3.1 输出重定向

**【示例】Shell 输出重定向  **

```bash
[root@terminal test]# echo "hello world" > log.txt    
[root@terminal test]# cat log.txt
hello world
[root@terminal test]# echo "hi girl" > log.txt     # 覆盖输出
[root@terminal test]# cat log.txt 
hi girl
[root@terminal test]# echo "hello world" >> log.txt   # 追加输出
[root@terminal test]# cat log.txt 
hi girl
hello world
[root@terminal test]# aaaa 2>> log.txt    # 默认只输出正确信息，2代表错误信息
[root@terminal test]# cat log.txt 
hi girl
hello world
-bash: aaaa：未找到命令
```

这里的 2 和 > 之间不可以有空格，2>  

### 8.3.2 输入重定向

wc 命令可以用来对文本进行统计，包括单词个数、行数、字节数。  

wc 语法格式：

```bash
wc [options] [文件名]
```

options 有如下：  

| 选项 | 含义                  |
| ---- | --------------------- |
| -c   | character，统计字节数 |
| -w   | word，统计单词数      |
| -l   | line，统计行数        |


**【示例】wc 的使用**

```bash
[root@terminal test]# wc -l < log.txt 
4
[root@terminal test]# wc -w < log.txt 
8
[root@terminal test]# wc -c < log.txt 
80
```

**【示例】读取文件内容  **

```bash
#!/bash/bin
while read msg
do
	echo $msg
done < log.txt
```

执行结果如图所示：

![](https://gitee.com/iscn/md_images/raw/master/%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F/1687746113660-8540f742-cfa4-43ad-9fb4-079befe812e4.png)

**【示例】读取文件每行内容  **

```bash
#!/bin/bash
rnum=1
while read msg
do
	echo "第$rnum 行，内容是：$msg"
	let rnum++
done < log.txt
```

执行结果：

![](https://gitee.com/iscn/md_images/raw/master/%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F/1687746220424-745acc1f-56af-47ff-aae3-34a09b568e09.png)

**【示例】标记位读取内容  **

```bash
[root@terminal test]# wc -l << EOF
> hello
> world
> boys
> EOF
3
[root@terminal test]# cat << EOF
> h
> e
> l
> l
> o
> EOF
h
e
l
l
o

```

