# 02-Shell变量

我们都知道变量是用于存储管理运行在内存中的数据。而shell中的变量又分为下面这几类

1. 系统环境变量  

2. 自定义变量  

3. 特殊符号变量    

## 2.1 系统环境变量  

系统环境变量是系统提供的共享变量，是 linux 系统加载 Shell 的配置文件中定义的变量，共享给所有的 Shell 程序使用。 

### 2.1.1Shell 的配置文件分类 

**1. 全局配置文件**

- /etc/profile 

- /etc/profile.d/*.sh 

- /etc/bashrc  

**2. 个人配置文件  **

- 当前用户/.bash_profile 

- 当前用户/.bashrc  

 一般情况下，我们都是直接针对全局配置进行操作。  

### 2.1.2 环境变量的分类  

在 Linux 系统中，环境变量按照其作用范围不同大致可以分为系统级环境变量和用户级环境变量。  

- **系统级环境变量：**Shell 环境加载全局配置文件中的变量共享给所有用户所有 Shell 程序使用，全局共享。

- **用户级环境变量：**Shell 环境加载个人配置文件中的变量共享当前用户的 Shell 程序使用，登录用户使用。   

### 2.1.3 查看当前 Shell 系统环境变量   

查看当前 Shell 系统环境变量，命令

```shell
env
```

效果如下：  

```bash
[root@server1 shell]# env
LS_COLORS=rs=0:di=01;34:ln=01;36:mh=00:pi=40;33:so=01;35:do=01;35:bd=40;33;01:cd=40;33;01:or=40;31;01:mi=01;05;37;41:su=37;41:sg=30;43:ca=30;41:tw=30;42:ow=34;42:st=37;44:ex=01;32:*.tar=01;31:*.tgz=01;31:*.arc=01;31:*.arj=01;31:*.taz=01;31:*.lha=01;31:*.lz4=01;31:*.lzh=01;31:*.lzma=01;31:*.tlz=01;31:*.txz=01;31:*.tzo=01;31:*.t7z=01;31:*.zip=01;31:*.z=01;31:*.dz=01;31:*.gz=01;31:*.lrz=01;31:*.lz=01;31:*.lzo=01;31:*.xz=01;31:*.zst=01;31:*.tzst=01;31:*.bz2=01;31:*.bz=01;31:*.tbz=01;31:*.tbz2=01;31:*.tz=01;31:*.deb=01;31:*.rpm=01;31:*.jar=01;31:*.war=01;31:*.ear=01;31:*.sar=01;31:*.rar=01;31:*.alz=01;31:*.ace=01;31:*.zoo=01;31:*.cpio=01;31:*.7z=01;31:*.rz=01;31:*.cab=01;31:*.wim=01;31:*.swm=01;31:*.dwm=01;31:*.esd=01;31:*.jpg=01;35:*.jpeg=01;35:*.mjpg=01;35:*.mjpeg=01;35:*.gif=01;35:*.bmp=01;35:*.pbm=01;35:*.pgm=01;35:*.ppm=01;35:*.tga=01;35:*.xbm=01;35:*.xpm=01;35:*.tif=01;35:*.tiff=01;35:*.png=01;35:*.svg=01;35:*.svgz=01;35:*.mng=01;35:*.pcx=01;35:*.mov=01;35:*.mpg=01;35:*.mpeg=01;35:*.m2v=01;35:*.mkv=01;35:*.webm=01;35:*.ogm=01;35:*.mp4=01;35:*.m4v=01;35:*.mp4v=01;35:*.vob=01;35:*.qt=01;35:*.nuv=01;35:*.wmv=01;35:*.asf=01;35:*.rm=01;35:*.rmvb=01;35:*.flc=01;35:*.avi=01;35:*.fli=01;35:*.flv=01;35:*.gl=01;35:*.dl=01;35:*.xcf=01;35:*.xwd=01;35:*.yuv=01;35:*.cgm=01;35:*.emf=01;35:*.ogv=01;35:*.ogx=01;35:*.aac=01;36:*.au=01;36:*.flac=01;36:*.m4a=01;36:*.mid=01;36:*.midi=01;36:*.mka=01;36:*.mp3=01;36:*.mpc=01;36:*.ogg=01;36:*.ra=01;36:*.wav=01;36:*.oga=01;36:*.opus=01;36:*.spx=01;36:*.xspf=01;36:
SSH_CONNECTION=172.25.0.1 54079 172.25.0.254 22
LANG=en_US.UTF-8
HISTCONTROL=ignoredups
DISPLAY=localhost:10.0
HOSTNAME=server1
XDG_SESSION_ID=4
USER=root
SELINUX_ROLE_REQUESTED=
PWD=/root/shell
HOME=/root
SSH_CLIENT=172.25.0.1 54079 22
SELINUX_LEVEL_REQUESTED=
XDG_DATA_DIRS=/root/.local/share/flatpak/exports/share:/var/lib/flatpak/exports/share:/usr/local/share:/usr/share
SSH_TTY=/dev/pts/1
MAIL=/var/spool/mail/root
TERM=xterm
SHELL=/bin/bash
SELINUX_USE_CURRENT_RANGE=
SHLVL=1
LOGNAME=root
DBUS_SESSION_BUS_ADDRESS=unix:path=/run/user/0/bus
XDG_RUNTIME_DIR=/run/user/0
PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/root/bin
HISTSIZE=1000
LESSOPEN=||/usr/bin/lesspipe.sh %s
_=/usr/bin/env
OLDPWD=/root
```

### 2.1.4 查看所有变量  

命令:  

```shell
set
```

篇幅过长，有兴趣的自行查看

### 2.1.5 常用系统环境变量  

| 变量名   | 含义                                                         |
| -------- | ------------------------------------------------------------ |
| PATH     | 与 windows 环境变量 PATH 功能一样，设置命令的搜索路径， 以冒号为分割 |
| HOME     | 当前用户目录：/root                                          |
| SHELL    | 当前 shell 解析器类型：/bin/bash                             |
| HISTFILE | 显示当前用户执行命令的历史列表文件：/root/.bash_history      |
| PWD      | 显示当前所在路径：/root                                      |
| OLDPWD   | 显示之前的路径                                               |
| HOSTNAME | 显示当前主机名                                               |
| HOSTTYPE | 显示主机的架构                                               |
| LANG     | 设置当前系统语言环境：zh_CN.UTF-8                            |


**【示例】查看 PATH 环境变量**

```bash
[root@server1 shell]# echo $PATH
/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/root/bin
```

**【示例】查看$HISTFILE 环境变量**  

```bash
[root@server1 shell]# echo $HISTFILE
/root/.bash_history
```

**【示例】查看$LANG** 环境变量 **** 

```sh
[root@server1 shell]# echo $LANG
en_US.UTF-8
```

## **2.2 自定义变量**  

### **2.2.1 自定义变量分类**  

1. 自定义局部变量
2. 自定义常量
3. 自定义全局变量

##  **2.3 自定义局部变量**  

就是在脚本或命令中定义，仅在当前 shell 实例中有效，其他 shell 启动的程序不能访问局部变量。  

### **2.3.1 变量定义规则：**  

> 1、命名只能使用英文字母，数字和下划线，首个字符不能以数字开头。  
>
> 2、中间不能有空格，可以使用下划线（_）。 
>
> 3、不能使用 Shell 中的关键字作为变量名称。 
>
> 4、在 bash 环境中，变量的默认类型都是字符串类型，无法直接进行数值运算。 
>
> 5、变量的值如果有空格，必须使用双引号括起来。  

### **2.3.2 定义变量语法**  

 `变量名=变量值`  

>  **注意：等号两边不能有空格**  

**【示例】定义局部变量**  

```shell
#!/bin/bash
your_name='tom'      # '='号两边不能有空格
echo $your_name
your_name="lili"
echo $your_name
```

### **2.3.3 查看变量**  

查看变量的值方式：  

```bash
#语法 1：直接使用变量名查询 
$var_name 
#语法 2：使用花括号 
${var_name} 
#区别：花括号方式适合拼接字符串  
```

**【示例】查看局部变量**  

```shell
#!/bin/bash
your_name='tom'
echo $your_name
echo ${your_name}
your_name="lili"
echo $your_name
echo ${your_name}
```

```bash
root@server1 shell]# your_name='tom'
[root@server1 shell]# echo $your_name
tom
[root@server1 shell]# echo ${your_name}
tom
[root@server1 shell]# echo $your_name123		# 拼接字符串只能用{}

[root@server1 shell]# echo ${your_name}123
tom123
```

### **2.3.4 删除局部变量** 

使用 `unset` 命令可以删除变量。语法：   

```shell
unset variable_name
```

变量被删除后不能再次使用。unset 命令不能删除只读变量。 

**【示例】删除局部变量**   

```bash
oot@server1 shell]# unset your_name
[root@server1 shell]# echo $your_name

[root@server1 shell]# echo ${your_name}
```

## **2.4 自定义常量** 

变量设置值以后不可修改的变量叫常量，也叫只读变量。  

使用 `readonly` 命令可以将变量定义为只读变量，只读变量的值不能被改变。

```shell
 readonly variable_nam  
```

**【示例】定义只读变量**  

```shell
#!/bin/bash
myUrl="https://www.google.com"
readonly myUrl
myUrl="https://www.baidu.com"
```

```bash
[root@server1 shell]# sh test.sh 
test.sh: line 4: myUrl: readonly variable		# 执行脚本错误，myUrl是只读变量
[root@server1 shell]# age=23
[root@server1 shell]# sex=male
[root@server1 shell]# echo $age
23
[root@server1 shell]# echo ${sex}
male
[root@server1 shell]# readonly sex
[root@server1 shell]# sex=123     # sex是只读变量，不可修改
-bash: sex: readonly variable
```

## **2.5 自定义全局变量**  

### **2.5.1 父子 Shell 环境介绍**  

例如：有 2 个 Shell 脚本文件 A.sh 和 B.sh 

如果在 A.sh 脚本文件中执行了 B.sh 脚本文件，那么 A.sh 就是父 Shell 环境，B.sh 就 是子 Shell 环境。  

### **2.5.2 自定义全局变量** 

就是在当前脚本文件中定义全局变量，这个全局变量可以在当前 Shell 环境与子 Shell 环境中都可以使用   

**语法：**  

```shell
export var_name1 var_name2
```

测试全局变量在子 Shell 中是否可用，在父 Shell 中是否可用  

**实现步骤：**  

  1. 创建 2 个脚本文件 test1.sh 和 test2.sh  

```bash
[root@server1 shell]# touch test1.sh test2.sh
```

  2. 编辑 test1.sh  

>  命令 1：定义全局变量 `global_var`  
>
>  命令 2：执行 test2.sh 脚本文件  

```shell
#!/bin/bash
global_var=100
export global_var
sh test2.sh
```

  3. 编辑 test2.sh ， 输出全局变量 global_var   

```shell
#!/bin/bash
echo "test1.sh中定义的全局变量：${global_var}"
```

  4. 执行 test2.sh 脚本文件  

```bash
[root@server1 shell]# sh test1.sh 
test1.sh中定义的全局变量：100
```

### **2.5.3 自定义系统环境变量**  

`/etc/profile` 定义存储自定义系统级环境变量数据，当前用户进入 Shell 环境初始化的时候会加载全局配置文件`/etc/profile` 里面的环境变量，供给所有 Shell 程序使用，以后只要是所有 Shell 程序或命令使用的变量，就可以定义在这个文件中。  

**创建环境变量步骤：**  

1. 编辑/etc/profile 全局配置文件， #增加命令：定义变量 VAR1=VAR1，并导出为环境变量  

>  注意：vim 直接打开全局配置文件是在配置文件的最顶端，使用 G 可以快速到文件底部， gg 重新回到文件的顶端。  

```bash
# 增加全局配置文件变量
export var1=var1
```

2. 重新加载配置文件/etc/profile，因为配置文件修改后要立刻加载里面的数据就需要重新加载，

语法：  

```shell
source /etc/profile
```

3. 在 Shell 环境中读取系统级环境变量 var1  

```bash
[root@server1 shell]# vim /etc/profile
[root@server1 shell]# source /etc/profile
[root@server1 shell]# echo $var1
var1
```

## 2.6 特殊符号变量  

| 参数处理 | 说明                                                         |
| -------- | ------------------------------------------------------------ |
| $n       | $n：用于接收脚本文件执行时传入的参数                         |
| $#       | 传递到脚本的参数个数                                         |
| $*       | 以一个单字符串显示所有向脚本传递的参数。 如"$*"用引号括起来的情况、以"$1 $2 … $n"的形式输出所有参数。 |
| $@       | 与$*相同，但是使用时加引号，并在引号中返回每个参数。 <br/>如"$@"用引号括起来的情况、以"$1" "$2" … "$n" 的形式输出所有参数。 |
| $$       | 脚本运行的当前进程 ID 号                                     |
| $?       | 显示最后命令的退出状态。0 表示没有错误，其他任何值表明有错误。 |


### **2.6.1 特殊符号变量：$n**  

- $n：用于接收脚本文件执行时传入的参数，  

- $0 用于获取当前脚本文件名称 。

- $1~$9 代表获取第一输入参数到第 9 个输入参数。 第 10 个以上参数获取参数的格式：${数字}，否则无法获取。  

**【示例】向脚本传递三个参数，并分别输出，其中 $0 为执行的文件名**  

 测试 10 个以上参数时候 

```shell
#!/bin/bash
echo "Shell传递参数示例"
echo "输出文件名：$0"
echo "第一个参数：$1"
echo "第二个参数：$2"
echo "第三个参数：$3"
echo "第四个参数：$4"
echo "第五个参数：$5"
echo "第六个参数：$6"
echo "第七个参数：$7"
echo "第八个参数：$8"
echo "第九个参数：$9"
echo "第十个参数：$10"    # 错误的写法
echo "第十个参数使用{}：${10}"    # 10个以上需要使用{}
```

```bash
[root@server1 shell]# sh test.sh t1 t2 t3 t4 t5 t6 t7 t8 t9 ttt
Shell传递参数示例
输出文件名：test.sh
第一个参数：t1
第二个参数：t2
第三个参数：t3
第四个参数：t4
第五个参数：t5
第六个参数：t6
第七个参数：t7
第八个参数：t8
第九个参数：t9
第十个参数：t10
第十个参数使用{}：ttt
```

### **2.6.2 符号符号变量：$#、 $* 和$@**

 **`$#`是获取所有输入参数的个数**  

**【示例】$#和$*的使用**  

```shell
#!/bin/bash
echo "Shell传递参数示例!";
echo "第一个参数：$1";
echo "参数个数为：$#";
echo "传递的参数作为一个字符串显示：$*";
```

**执行脚本，输出结果如下所示：**  

```bash
[root@server1 shell]# sh test.sh t1 t2 t3 t4 t5 t6 t7 t8 t9 ttt
Shell传递参数示例!
第一个参数：t1
参数个数为：10
传递的参数作为一个字符串显示：t1 t2 t3 t4 t5 t6 t7 t8 t9 ttt
```

> **$* 与 $@ 区别： ** 
> 相同点：都是引用所有参数。
>
> 不同点：只有在双引号中体现出来。  
>
> “$*”获取的所有参数拼接为一个字符串，格式为：“$1 $2 ... $n” 
>
> “$@”获取一组参数列表对象，格式为：“$1”“$2”...“$n”   
>
> 假设在脚本运行时写了三个参数 1、2、3，则 " * " 等价于 "1 2 3"（传递了一个参数）， 而 "@" 等价于 "1" "2" "3"（传递了三个参数）。  
>

**【示例】$* 与 $@ 区别：**  

```shell
#!/bin/bash
echo "--\$* 演示---"
for i in "$*";
do      
        echo $i
done    
echo "--\$@ 演示---"
for i in "$@";
do      
        echo $i
done  
```

```bash
[root@server1 shell]# sh test.sh s1 s2 s3 s4
--$*的演示--
s1 s2 s3 s4
--$@ 演示---
s1
s2
s3
s4
```

### **2.6.3 特殊符号变量$?**  

$?用于获取上一个 Shell 命令的退出码，或者是函数的返回值。  

每个 Shel 命令的执行都有一个返回值，这个返回值用于说明命令执行是否成功。一般来说，返回 0 代表命令代表执行成功，非 0 代表执行失败。  

**【示例】输入一个正确命令，再输出$？**  

```bash
[root@server1 shell]# echo "hello shell"
hello shell
[root@server1 shell]# echo $?
0
```

**【示例】输入一个错误命令，再输出$？**  

```bash
[root@server1 shell]# hh
bash: hh: command not found...
[root@server1 shell]# echo $?
127
[root@server1 shell]# hhh
bash: hhh: command not found...
[root@server1 shell]# echo $?
127
```

**【示例】获取函数的返回值**  

```shell
#!/bin/bash
function test_add(){
        echo "调用函数"
        return 10
}       
test_add
```

```bash
[root@server1 shell]# sh test.sh 
调用函数
[root@server1 shell]# echo $?
10
```

### **2.6.4 特殊符号$$**  

 **$$:用于获取当前 Shell 环境的进程 ID 号。**  

```bash
[root@server1 shell]# echo $$
2662
```

## **2.7 字符串变量**  

### **2.7.1 字符串创建**

字符串是 shell 编程中最常用最有用的数据类型（除了数字和字符串，也没啥其它类型好用了），字符串可以用单引号，也可以用双引号，也可以不用引号。 

**【示例】单引号创建字符串**   

```bash
[root@server1 shell]# echo $str
abc
```

**【示例】双引号创建字符串**  

```bash
[root@server1 shell]# your_name="lili"
[root@server1 shell]# echo $your_name
lili
```

**【示例】不使用引号创建字符串** 

```bash
[root@server1 shell]# s=adb
[root@server1 shell]# echo $s
adb
```

**区别：**

> 1、单引号里的任何字符都会原样输出，单引号字符串中的变量是无效的；双引号里可以有变量 
>
> 2、字符串中还可以出现双引号的子字符串，但是需要转义  
>
> 3、不被引号包围的字符串中出现变量时也会被解析，这一点和双引号“”包围的字符串一 样。字符串中不能出现空格，否则空格后边的字符串会作为其他命令解析（直接输出没有问题，但不能赋值给其它变量）。   

**【示例】单引号与双引号创建字符串的区别-引用变量 **

```bash
[root@server1 shell]# echo hello '${your_name}'
hello ${your_name}
[root@server1 shell]# echo hello "${your_name}"
hello lili
```

**【示例】字符串中出现双引号的子字符串** 

```bash
root@server1 shell]# echo "hello \"${your_name}\""
hello "lili"
```

**【示例】不被双引号包围的字符串中不能出现空格**  

```bash
[root@server1 shell]# var1=hello$your_name
[root@server1 shell]# echo $var1
hellolili
[root@server1 shell]# var1=hello $your_name    	# 中间有空格会作为命令解析
bash: lili: command not found...
```

### **2.7.2 获取字符串的长度**  

 **获取字符串长度语法：**  

```shell
${#字符串变量名}
```

**【示例】获取字符串长度**

```bash
[root@server1 shell]# s="abcd"
[root@server1 shell]# echo ${#s}
4
```

### **2.7.3 字符串的拼接**

**【示例】无符号拼接字符串**

```bash
[root@server1 shell]# var1="hello"
[root@server1 shell]# var2="world"
[root@server1 shell]# var3=$var1$var2
[root@server1 shell]# echo $var3
helloworld
```

**【示例】双引号拼接字符串** 

```bash
[root@server1 shell]# var4="$var1$var2"
[root@server1 shell]# echo $var4
helloworld
```

**【示例】混合拼接字符串**

```bash
[root@server1 shell]# var6=$var1"@"$var2
[root@server1 shell]# echo $var6
hello@world
```

**【示例】字符串拼接中间有空格需要使用双引号**  

```bash
[root@server1 shell]# var7="$var1 $var2"
[root@server1 shell]# echo $var7
hello world
```

**【示例】echo输出字符串中间可以有空格**  

```shell
[root@server1 shell]# echo hello $var2
hello world
```

###  **2.7.4 截取字符串**  

| 格式                        | 说明                                                         |
| --------------------------- | ------------------------------------------------------------ |
| ${变量名:start:length}      | 从 string 字符串的左边第 start 个字符开始，向右截取 length 个字符。start 从 0 开始 |
| ${变量名:start}             | 从 string 字符串的左边第 start 个字符开始截取，直 到最后     |
| ${ 变 量 名:0-start:length} | 从 string 字符串的右边第 start 个字符开始，向右截 取 length 个字符，start 从 1 开始，代表右侧第一个字符 |
| ${变量名:0-start}           | 从 string 字符串的右边第 start 个字符开始截取，直 到最后     |
| ${变量名#*chars}            | 从 string 字符串左边第一次出现*chars 的位置开始， 截取*chars 右边的所有字符 |
| ${变量名##*chars}           | 从 string 字符串左边最后一次出现*chars 的位置开 始，截取*chars 右边的所有字符 |
| ${变量名%chars*}            | 从 string 字符串右边第一次出现 chars*的位置开始， 截取 chars*左边的所有字符 |
| ${变量名%%chars*}           | 从 string 字符串右边最后一次出现 chars*的位置开 始，截取 chars*左边的所有字符 |


**【示例】提取子字符串${变量名:start:length}**  

```bash
[root@server1 shell]# string="I love Linux"
[root@server1 shell]# echo ${string:2:4}
love
```

**【示例】提取子字符串${变量名:start}**  

```bash
[root@server1 shell]# echo ${string:4}
ve Linux
```

**【示例】提取子字符串${变量名:0-start:length}**  

```bash
[root@server1 shell]# string="hello world!"
[root@server1 shell]# echo ${string:0-3:2}
ld
```

**【示例】提取子字符串${变量名:0-start}**  

```bash
[root@server1 shell]# string="hello world!"
[root@server1 shell]# echo ${string:0-5}
orld!
```

**【示例】提取子字符串${变量名#*chars}**  

```bash
[root@server1 shell]# string="hello world!"
[root@server1 shell]# echo ${string#*o}
world!
```

**【示例】提取子字符串${变量名##*chars}**  

```bash
[root@server1 shell]# string="hello world!"
[root@server1 shell]# echo ${string##*o}
rld!
```

**【示例】提取子字符串${变量名%chars*}**  

```bash
[root@server1 shell]# string="hello world!"
[root@server1 shell]# echo ${string%l*}
hello wor
```

**【示例】提取子字符串${变量名%%chars*}**  

```bash
[root@server1 shell]# string="hello world!"
[root@server1 shell]# echo ${string%%l*}
he
```

>  **注意：左边第一个字符的索引值为 0。右边第一个字符索引为1**

## 2.8 数组变量  

bash 支持一维数组（不支持多维数组），并且没有限定数组的大小。  

类似于 C 语言，数组元素的下标由 0 开始编号。获取数组中的元素要利用下标，下标可以是整数或算术表达式，其值应大于或等于 0。  

### **2.8.1 定义数组**

在 Shell 中，用括号来表示数组，数组元素用"空格"符号分割开。定义数组的一般形式为：

**【示例】定义数组**

```shell
array_name=(value0 value1 value2 value3)
```

数组的值类型任意，个数不限。

可以不使用连续的下标，而且下标的范围没有限制。  

```shell
array_name=([0]=value0 [3]=value3 [5]=value5)
```

**【示例】定义数组**

```bash
[root@server1 shell]# arr1=(1 2 3 4)
[root@server1 shell]# arr2=(10 20 '123')
[root@server1 shell]# arr3=([0]=10 [3]=30 [5]=50)
```

###   **2.8.2 读取数组**  

 **读取数组元素值的一般格式是：**  

```shell
${数组名[下标]}
```

 **@或*获取数组中的所有元素**  

```shell
${array_name[@]}
${array_name[*]}
```

**获取数组的长度或个数**

```shell
${#array_name[@]}
${#array_name[*]}
```

 **获取数组指定元素的字符长度**  

```shell
${#array_name[索引]}
```

 **【示例】读取数组**  

```bash
[root@server1 shell]# arr1=(1 2 3 4)
[root@server1 shell]# echo ${arr1[0]}
1
[root@server1 shell]# echo ${arr1[2]}
3
```

**【示例】读取数组所有元素**  

```bash
[root@server1 shell]# arr1=(1 2 3 4)
[root@server1 shell]# echo ${arr1[*]}
1 2 3 4
[root@server1 shell]# echo ${arr1[@]}
1 2 3 4
```

**【示例】读取数组长度**    

```bash
[root@server1 shell]# arr1=(1 2 3 4)
[root@server1 shell]# echo ${#arr1[*]}
4
[root@server1 shell]# echo ${#arr1[@]}
4
```

**【示例】读取数组中指定元素的字符长度**  

```bash
[root@server1 shell]# arr2=(10 20 '123')
[root@server1 shell]# echo ${#arr2[2]}
3
[root@server1 shell]# echo ${#arr2[1]}
2
```

###  **2.8.3 数组拼接**  

所谓的数组拼接就是将两个数组连接成一个数组。 

语法：使用@和*获取数组所有元素之后进行拼接。  

```shell
new_array = (${array1[@]} ${array2[@]} ...)
new_array = (${array1[*]} ${array2[*]} ...)
```

  **【示例】数组拼接**  

```bash
[root@server1 shell]# arr1=(1 2 3 4)
[root@server1 shell]# arr2=(10 20 '123')
[root@server1 shell]# new_array=(${arr1[@]} ${arr2[@]})
[root@server1 shell]# echo ${new_array[*]}
1 2 3 4 10 20 123
```

###  **2.8.4 数组删除**  

删除数组可以删除数组中指定元素，也可以删除整个数组。  

删除数组中的语法格式：  

```shell
unset array_name[index]    # 删除数组中指定元素
unset array_name     # 删除整个数组
```

 **【示例】删除数组**  

```bash
[root@server1 shell]# arr1=(1 2 3 4)
[root@server1 shell]# echo ${arr1[*]}
1 2 3 4
[root@server1 shell]# unset arr1[0]
[root@server1 shell]# echo ${arr1[@]}
2 3 4
[root@server1 shell]# unset arr1
[root@server1 shell]# echo ${arr1[*]}
```

