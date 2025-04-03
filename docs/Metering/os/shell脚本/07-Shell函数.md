# 07-Shell函数

Shell 函数和其他编程语言一样，函数是由若干条 Shell 命令组成的语句块，实现 Shell 脚本代码重用和模块化编程。  

## 7.1 系统函数  

### 7.1.1 basename

basename 返回完整路径最后 / 的部分，常用于获取文件名， 基本语法如下：    

```bash
basename [pathname] [suffix]
```

suffix 为后缀，如果 suffix 被指定了，basename 会将 pathname 或 string 中的 suffix 去掉。  

**【示例】basename 的使用**

![](https://gitee.com/iscn/md_images/raw/master/%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F/1687691712801-9d37e2a0-1d6d-47d4-8ed6-fded285eb93f.png)** ** 

**【示例】basename 的使用（写入到脚本文件）**

```bash
#!/bin/bash
#将变量赋值给变量
name1=`basename /root/test_for.sh` 
name2=$(basename /root/test_for.sh .sh)
#输出文件名
echo "name1 的值：$name1" 
echo "name2 的值：$name2" 
```

执行结果：  

![](https://gitee.com/iscn/md_images/raw/master/%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F/1687691843281-3064d60f-4f41-4a5a-ae4d-7d5bb9076105.png) 

### 7.1.2 dirname  

dirname 返回完整路径最后 / 的前面的部分，常用于返回路径部分。  

dirname 文件绝对路径（功能描述：从给定的包含绝对路径的文件名中去除文件名（非 目录的部分），然后返回剩下的路径（目录的部分））  

**【示例】dirname 的使用 **

![](https://gitee.com/iscn/md_images/raw/master/%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F/1687693515805-fe9a4593-c8eb-489a-a998-b0bfaf635abb.png)

**【示例】dirname 的使用（写到脚本中）**

```bash
#!/bin/bash
#获取文件名
filename=$(basename /root/test_for.sh)
#获取文件路径
mydir=`dirname /root/test_for.sh` 
echo "文件名：$filename" 
echo "文件路径：$mydir"
```

执行结果：  

![](https://gitee.com/iscn/md_images/raw/master/%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F/1687693647191-9ce2a379-73d5-4891-976f-18968a8beb66.png)

可以使用 declare -f 获取系统函数。

## 7.2 自定义函数    

### 7.2.1 函数定义  

shell 中函数的定义格式如下：  

```bash
[ function ] funname [()]
{
	action;
	[return int;]
}
```

> 说明： 
>
> 1、可以带 function fun() 定义，也可以直接 fun() 定义,不带任何参数。 
>
> 2、参数返回，可以显示加：return 返回，如果不加，将以最后一条命令运行结果，作为返回值。 return 后跟数值 n(0-255）  

**【示例】函数示例（无参数无返回值）  **

```bash
#!/bin/bash
function test_fun(){
echo "这是我的第一个 Shell 函数！"
}
echo “调用函数开始”
test_fun
```

执行结果：  

![](https://gitee.com/iscn/md_images/raw/master/%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F/1687694276660-6c892910-ef55-4a65-be82-af613efae854.png)

**【示例】函数示例（有返回值）**  

```bash
#!/bin/bash
fun_add(){
#"两数相加"
	read -p "请输入第一个数：" num1
	read -p "请输入第二个数：" num2
	echo "第一个数的值：$num1,第二个数的值：$num2"
	return $(($num1+$num2))
}
fun_add
echo "两数的和是：$?"
```

执行结果如图：

![](https://gitee.com/iscn/md_images/raw/master/%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F/1687694373692-6493ee8a-1155-48fa-b2b4-9804ab743244.png)

> 函数返回值在调用该函数后通过 $? 来获得  
>
> 注意：所有函数在使用前必须定义。这意味着必须将函数放在脚本开始部分，直至 shell 解释器首次发现它时，才可以使用。调用函数仅使用其函数名即可。  

### 7.2.2 函数参数  

在 Shell 中，调用函数时可以向其传递参数。在函数体内部，通过 $n 的形式来获取参 数的值，例如，$1 表示第一个参数，$2 表示第二个参数...  

注意，$10 不能获取第十个参数，获取第十个参数需要${10}。当 n>=10 时，需要使用${n}来获取参数。

**【示例】函数参数的使用  **

```bash
#!/bin/bash
fun_param(){
	echo "第一个参数：$1" 
 	echo "第二个参数：$2" 
  echo "第三个参数：$3" 
  echo "第十个参数：$10" 
  echo "第 10 个参数：${10}" 
  echo "第 11 个参数：${11}"
}
fun_param 1 2 3 4 5 6 7 8 9 101 102 
```

执行结果：  

![](https://gitee.com/iscn/md_images/raw/master/%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F/1687694793365-a7044922-53e5-4d63-8ba7-dc4dca230dcd.png)

从执行结果可以看到第 10 个参数及以上必须使用${}来获取。

**【示例】定义函数绘制直角三角形** 

```bash
test_fun(){
	for ((i=0;i<=6;i++))
	do
		for((j=0;j<=i;j++))
		do
			echo -n "*" 
   	done
			echo
	done
}
test_fun
```

 执行结果如图：

![](https://gitee.com/iscn/md_images/raw/master/%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F/1687694937348-fbac92f6-de89-4776-a29d-87fa18cb4a72.png) **【示例】定义函数绘制直角三角形  **

```bash
#!/bin/bash
test_triangle(){
#输出直角三角形
	for ((i=1;$i<=6;i++))
	do
		for ((j=7-$i;$j>0;j--))
		do
			echo -n '*' 
   	done
		echo '' 
	done
}
test_triangle
```

执行结果如图：

![](https://gitee.com/iscn/md_images/raw/master/%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F/1687695070786-948d86d9-7620-4901-9983-385eedce7df8.png)

### 7.2.3  Shell 程序与函数的区别  

函数和 Shell 程序比较相似，区别在于：  

Shell 程序（内置命令和外部脚本文件），外部脚本文件是在子 Shell 中运行，会开启 独立的进程运行。  

Shell 函数在当前 Shell 的进程中运行  

**【示例】Shell 程序与函数的区别 ** 

```bash
#!/bin/bash
fun_test(){
	echo "函数中打印当前进程 ID：$$"
}
	echo "当前脚本文件（Shell 程序）打印当前进程 ID：$$"
fun_test
```

执行结果如图：

![](https://gitee.com/iscn/md_images/raw/master/%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F/1687695179705-420f3c2b-6c0d-4782-a574-01468dea659d.png)

