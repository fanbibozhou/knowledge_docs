# 04-Shell运算符

Shell 和其他编程语言一样，支持多种运算符，包括： 

- 算数运算符 

- 关系运算符    
- 逻辑运算符
- 文件测试运算符    

原生 bash 不支持简单的数学运算，需要通过其他命令来实现，如`expr`。

`expr` 是 evaluate expressions 的缩写，译为“求值表达式”。`Shell expr` 是一个功能强大，并且比较复杂的命令，它除了可以实现整数计算，还可以结合一些选项对字符串进行处理，例如计算字符串长度、字符串比较、字符串匹配、字符串提取等。  

`expr` 语法：

```shell
expr 算术运算符表达式
```

获取计算结果赋值给新变量语法：

```shell
result=`expr 算术运算符表达式`
```

> 注意：这里不是单引号是反引号。运算表达式运算符两边必须要有空格。运算不能是小数运算必须是整数运算。 

## 4.1 算术运算符

下表列出了常用的算术运算符，假定变量 a 为 10，变量 b 为 20：

| 运算符 | 说明                                          | 举例                                 |
| ------ | --------------------------------------------- | ------------------------------------ |
| +      | 加法                                          | &#96;expr $a + $b&#96;   结果为 30。 |
| -      | 减法                                          | &#96;expr $a - $b`结果为 -10。       |
| *      | 乘法                                          | &#96;expr $a \\* $b` 结果为 200      |
| /      | 除法&#96;                                     | expr $b / $a` 结果为 2。             |
| %      | 取余                                          | &#96;expr $b % $a`  结果为0          |
| =      | 赋值                                          | a=$b 将把变量 b 的值赋给 a。         |
| ==     | 相等。用于比较两个数字，相同则返回 true。     | [ $a == $b ]   返回 false。          |
| !=     | 不相等。用于比较两个数字，不相同则返回 true。 | [ $a != $b ]   返回 true。           |


>  注意：条件表达式要放在方括号之间，并且要有空格，例如: [$a==$b] 是错误的，必须写 成 [ $a == $b ]。  

**【示例】算术运算符测试  **

```shell
#!/bin/bash
read -p "请输入第一个数：" a
read -p "请输入第二个数：" b
# 输出a和b的值
echo "a:$a,b:$b"

# 进行算术运算
result=`expr $a + $b`
echo "a+b:$result"
result=`expr $a - $b`
echo "a-b:$result"
result=`expr $a \* $b`
echo "a*b:$result"
result=`expr $a / $b`
echo "a/b:$result"
result=`expr $a % $b`
echo "a%b:$result"
```

 执行脚本，输出结果如下所示：  

```bash
[root@server1 shell]# sh test.sh 
请输入第一个数：10
请输入第二个数：20
a:10,b:20
a+b:30
a-b:-10
a*b:200
a/b:0
a%b:10
```

## 4.2 比较运算符

### 4.2.1 整数比较运算符  

假定变量 a 为 10，变量 b 为 20：  

| 运算符 | 说明                                               | 举例                   |
| ------ | -------------------------------------------------- | ---------------------- |
| -eq    | 检测两个数是否相等，相等返回 0，否则返回 1。       | [ $a -eq $b ] 返回 1。 |
| -ne    | 检测两个数是否不相等，不相等返回 0。               | [ $a -ne $b ] 返回 0。 |
| -gt    | 检测左边的数是否大于右边的，如果是，则返回 0。     | [ $a -gt $b ] 返回 1。 |
| -lt    | 检测左边的数是否小于右边的，如果是，则返回 0。     | [ $a -lt $b ] 返回 0。 |
| -ge    | 检测左边的数是否大于等于右边的，如果是，则返回 0。 | [ $a -ge $b ] 返回 1   |
| -le    | 检测左边的数是否小于等于右边的，如果是，则返回 0。 | [ $a -le $b ] 返回 0   |


**【示例】整数关系运算符测试  **

```bash
[root@server1 shell]# [ 10 -ne 20 ]
[root@server1 shell]# echo $?
0
[root@server1 shell]# [ 10 -eq 20 ]
[root@server1 shell]# echo $?
1
[root@server1 shell]# [ 10 -ne 20 ]
[root@server1 shell]# echo $?
0
[root@server1 shell]# [ 10 -ge 20 ]
[root@server1 shell]# echo $?
1
[root@server1 shell]# [ 10 -le 20 ]
[root@server1 shell]# echo $?
0
```

| 运算符 | 说明                                               | 举例                |
| ------ | -------------------------------------------------- | ------------------- |
| ==     | 检测两个数是否相等，相等返回 0，否则返回 1。       | (($a==$b)) 返回 1。 |
| !=     | 检测两个数是否不相等，不相等返回 0。               | (($a!=$b)) 返回 0。 |
| >      | 检测左边的数是否大于右边的，如果是，则返回 0。     | (($a>$b)) 返回 1。  |
| <      | 检测左边的数是否小于右边的，如果是，则返回 0。     | (($a<$b)) 返回 0。  |
| >=     | 检测左边的数是否大于等于右边的，如果是，则返回 0。 | (($a>=$b)) 返回 1。 |
| <=     | 检测左边的数是否小于等于右边的，如果是，则返回 0。 | (($a<=$b)) 返回 0。 |


**【示例】整数关系运算符测试  **

```bash
[root@server1 shell]# ((10<20))
[root@server1 shell]# echo $?
0
[root@server1 shell]# ((10>=20))
[root@server1 shell]# echo $?
1
```

**【示例】整数关系运算符使用到条件中 ** 

```shell
#!/bin/bash
a=10
b=20
if [ $a -eq $b ]
then    
        echo "a等于b"
else    
        echo "a不等于b"
fi      

# -gt
if [ $a -gt $b ]
then    
        echo "a大于b"
else    
        echo "a不大于b"
fi      

# -le
if [ $a -lt $b ]
then    
        echo "a小于b"
else    
        echo "a不小于b"
fi  
```

运行结果:

```
[root@server1 shell]# sh test.sh 
a不等于b
a不大于b
a小于b
```

>  注意：整数比较运算符只支持整数，不支持小数与字符串。除非字符串的值是整数数字((“1” ==”1”))，每个命令都有返回值，返回 0 表示成功，返回 1 表示失败。  

### 4.2.2 字符串比较运算符  

字符串比较运算符可以比较 2 个变量，变量的类型可以为数字（整数，小数）与字符串。  

下表列出了常用的字符串运算符，假定变量 a 为 "abc"，变量 b 为 "efg"。  

字符串比较可以使用`[[]]`和`[]`2 种方式。  

| 运算符 | 说明                                                         | 举例                                                         |
| ------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| ==或=  | 检测两个字符串是否相等，相等返回 0。                         | [ $a = $b ] 返回 1。<br/>[ $a == $b ] 返回 1。 <br/>[[ $a = $b]] 返回 1。<br/>[[$a == $b]] 返回 1。 |
| !=     | 检测两个字符串是否不相等，不相等返回 0。                     | [ $a != $b ] 返回 0。 <br/>[[ $a != $b ]] 返回 0。           |
| <      | 检测左边字符串是否小于右边字符串，如果小于返回 0，否则返回 1 | [ $a \< $b ] 返回 0<br/>[[ $a < $b ]] 返回 0                 |
| >      | 检测左边字符串是否大于右边字符串，如果大于 返回 0，否则返回 1 | [ $a \> $b ] 返回 1 <br/>[[ $a < $b ]] 返回                  |
| -z     | 检测字符串长度是否为 0，为 0 返回 0，否则返回 1。            | [ -z $a ] 返回 1。                                           |
| -n     | 检测字符串长度是否不为 0，不为 0 返回 0。                    | [ -n "$a" ] 返回 0。                                         |
| $      | 检测字符串是否不为空，不为空返回 0                           | [ $a ] 返回 0。                                              |


字符串比较没有<=可以通过`[[ “a”< “b”|| “a”== “b”]]`

**【示例】字符串运算符测试 ** 

```bash
[root@server1 shell]# [ 1.2 == 1.4 ]
[root@server1 shell]# echo $?
1
[root@server1 shell]# [ 1.2 = 1.4 ]
[root@server1 shell]# echo $?
1
[root@server1 shell]# [[ 'abc' = 'abc' ]]
[root@server1 shell]# echo $?
0
[root@server1 shell]# [ 'abc' = 'abc' ]
[root@server1 shell]# echo $?
0
[root@server1 shell]# [ 'abc' > 'abc' ]
[root@server1 shell]# echo $?
0
[root@server1 shell]# [ 'abc' \> 'abc' ]     # 需要转义
[root@server1 shell]# echo $?
1
[root@server1 shell]# [[ 'abc' > 'abc' ]]   # 不需要转义
[root@server1 shell]# echo $?
1
[root@server1 shell]# [[ 10 > 10 || 10 == 10 ]]
[root@server1 shell]# echo $?
0
[root@server1 shell]# [[ 10 >= 10 ]]      # 不能直接使用>=,需要拆分为上面的两个表达式
-bash: syntax error in conditional expression
-bash: syntax error near `10'
[root@server1 shell]# echo $?
2
```

**【示例】字符串运算符测试  **

```bash
[root@server1 shell]# [ -z 'abc' ]
[root@server1 shell]# echo $?
1
[root@server1 shell]# [ -n 'abc' ]
[root@server1 shell]# echo $?
0
[root@server1 shell]# b=''
[root@server1 shell]# [ $b ]
[root@server1 shell]# echo $?
1
[root@server1 shell]# b='abc'
[root@server1 shell]# [ $b ]
[root@server1 shell]# echo $?
0
```

### 4.2.3 [[]]和[]的区别  

由于`(())`只能比较整数，不能比较小数和字符串所以不建议使用。

> 区别 1:`[]`会产生单词分隔现象，`[[]]`不会产生单词分隔    

**【示例】测试区别 1**  

```bash
[root@server1 shell]# m='a'
[root@server1 shell]# n='a b'
[root@server1 shell]# [ $m == $n ]
-bash: [: too many arguments      # 参数太多,因为单词分隔了
[root@server1 shell]# [[ $m == $n ]]
[root@server1 shell]# echo $?
1
```

> 区别 2：`[]`需要对`>`和`<`进行转义  

**【示例】测试区别 2  **

```bash
[root@server1 shell]# m='abc'
[root@server1 shell]# n='efg'
[root@server1 shell]# [ $m > $n ]      # 不加转义,结果是错误的
[root@server1 shell]# echo $?
0
[root@server1 shell]# [ $m \> $n ]
[root@server1 shell]# echo $?
1
[root@server1 shell]# [[ $m \> $n ]]      # [[]] 不需要转义
-bash: conditional binary operator expected
-bash: syntax error near `\>'
[root@server1 shell]# [[ $m > $n ]]
[root@server1 shell]# echo $?
1
```

## 4.3 布尔运算符  

下表列出了常用的布尔运算符，假定变量 a 为 10，变量 b 为 20  

| 运算符 | 说明                                               | 举例                                     |
| ------ | -------------------------------------------------- | ---------------------------------------- |
| !      | 非运算，表达式为 true 则返回 false，否则返 回 true | [ ! false ] 返回 true。                  |
| -o     | 或运算，有一个表达式为 true 则返回 true。          | [ $a -lt 20 -o $b -gt 100 ]  返回 true   |
| -a     | 与运算，两个表达式都为 true 才返回 true。          | [ $a -lt 20 -a $b -gt 100 ] 返回 false。 |


> 注意：布尔运算符必须放在[]或与 test 命令配合使用才有用

**【示例】布尔运算符测试  **

```bash
[root@server1 shell]# [ 1 \> 1 ]     # 需要转义
[root@server1 shell]# echo $?
1
[root@server1 shell]# [ ! 1 \> 1 ]		# 非
[root@server1 shell]# echo $?
0
[root@server1 shell]# [ 1 \> 1 -o 1==1 ]     # 或
[root@server1 shell]# echo $?
0
[root@server1 shell]# [ 1 \> 1 -a 1==1 ]    # 并且
[root@server1 shell]# echo $?
1
```

**【示例】布尔运算符应用到条件语句中**

```shell
#!/bin/bash
# 布尔运算发运用到条件中
str='字符串'
if [ $str ]
then    
        echo "字符串不为空"
else    
        echo "字符串为空"
fi      
if [ ! $str ]
then    
        echo "字符串为空"
else    
        echo "字符串不为空"
fi 
```

 执行结果:

```shell
[root@server1 shell]# sh test.sh 
字符串不为空
字符串不为空
```

## 4.4 逻辑运算符 

假定变量 a 为 10，变量 b 为 20:   

| 运算符 | *说明      | 举例                                       |
| ------ | ---------- | ------------------------------------------ |
| &&     | 逻辑的 AND | [[ $a -lt 100 && $b -gt 100 ]] 返回 false  |
| \|\|   | 逻辑的 OR  | [[ $a -lt 100 \|\| $b -gt 100 ]] 返回 true |


**【示例】逻辑运算符测试  **

```bash
[root@server1 shell]# a=10
[root@server1 shell]# b=20
[root@server1 shell]# [[ $a -lt $b || $b -gt 100 ]]
[root@server1 shell]# echo $?
0
[root@server1 shell]# [[ $a -lt $b && $b -gt 100 ]]
[root@server1 shell]# echo $?
1
```

**【示例】逻辑运算符使用到 if 中**

```shell
#!/bin/bash
a=10
b=20
if [[ $a -lt 100 && $b -gt 100 ]]
then    
        echo "返回 true"
else    
        echo "返回 false"
fi      
if [[ $a -lt 100 || $b -gt 100 ]]
then
        echo "返回 true"
else
        echo "返回 false"
fi
```

执行脚本，输出结果如下所示：  

```bash
[root@server1 shell]# sh test.sh 
返回 false
返回 true
```

**【示例】逻辑运算符与布尔运算符使用到 if 中的区别  **

```shell
#!/bin/bash
a=10
b=20
if [ $a > 1 -a $b > 2 ]
then
        echo "[ $a > 1 -a $b > 2 ]成立"
else
        echo "[ $a > 1 -a $b > 2 ]不成立"
fi
if [[ $a > 1 && $b > 2 ]]
then
        echo "[ $a > 1 -a $b > 2 ]成立"
else
        echo "[ $a > 1 -a $b > 2 ]不成立"
fi
```

执行结果 :

```
[root@server1 shell]# sh test.sh 
[ 10 > 1 -a 20 > 2 ]成立
[ 10 > 1 -a 20 > 2 ]成立
```

由此可以看到逻辑运算符需要放到“`[[]]`”中，布尔运算符放到“`[]`”。

## 4.5 文件测试运算符

文件测试运算符用于检查文件，如检查文件是否存在、是否可读、是否可执行、是否为 空、是否可写、是否是目录、是否是普通文件。

属性检测描述如下：

| 操作  符 | 说明                                                         | 示例                      |
| -------- | ------------------------------------------------------------ | ------------------------- |
| -b file  | 检测文件是否是块设备文件，如果是，则返回true。               | [ -b $file ] 返回false。  |
| -c file  | 检测文件是否是字符设备文件，如果是，则返回 true。            | [ -c $file ] 返回 false。 |
| -d file  | 检测文件是否是目录，如果是，则返回 true。                    | [ -d $file ] 返回 false。 |
| -f file  | 检测文件是否是普通文件（既不是目录，也不是 设备文件），如果是，则返回 true。 | [ -f $file ] 返回 true。  |
| -g file  | 检测文件是否设置了 SGID 位，如果是，则返回 true。            | [ -g $file ] 返回 false。 |
| -k file  | 检测文件是否设置了粘着位(Sticky Bit)，如果是， 则返回 true。 | [ -k $file ] 返回 false。 |
| -p file  | 检测文件是否是有名管道，如果是，则返回 true。                | [ -p $file ] 返回 false。 |
| -u file  | 检测文件是否设置了 SUID 位，如果是，则返回 true。            | [ -u $file ] 返回 false。 |
| -r file  | 检测文件是否可读，如果是，则返回 true。                      | [ -r $file ] 返回 true。  |
| -w file  | 检测文件是否可写，如果是，则返回 true。                      | [ -w $file ] 返回 true。  |
| -x file  | 检测文件是否可执行，如果是，则返回 true。                    | [ -x $file ] 返回 true。  |
| -s file  | 检测文件是否为空（文件大小是否大于 0），不 为空返回 true。   | [ -s $file ] 返回 true    |
| -e file  | 检测文件（包括目录）是否存在，如果是，则返 回 true。         | [ -e $file ] 返回 true。  |


**【示例】文件测试运算符**      

```shell
#!/bin/bash
file="/root/operation.sh"
if [ -r $file ]
then
        echo "文件可读"
else
        echo "文件不可读"
fi
if [ -w $file ]
then
        echo "文件可写"
else
        echo "文件不可写0"
fi
if [ -x $file ]
then
        echo "文件可执行"
else
        echo "文件不可执行"
fi
if [ -f $file ]
then
        echo "文件为普通文件"
else
        echo "文件为特殊文件"
fi
if [ -d $file ]
then
        echo "文件是个目录"
else
        echo "文件不是个目录"
fi
if [ -s $file ]
then
        echo "文件不为空"
else
        echo "文件为空"
fi
if [ -e $file ]
then
        echo "文件存在"
else
        echo "文件不存在"
fi
```

执行结果:

```bash
[root@server1 shell]# sh test.sh
文件不可读
文件不可写0
文件不可执行
文件为特殊文件
文件不是个目录
文件为空
文件不存在
```

