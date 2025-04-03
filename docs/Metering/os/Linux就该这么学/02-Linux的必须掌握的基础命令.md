# 02-Linux的必须掌握的基础命令

Linux系统中有些图形化工具（比如逻辑卷管理器[Logical Volume Manager，LVM]）确实非常好用，极大地降低了运维人员出错的概率，值得称赞。但是，很多图形化工具其实只是调用了命令脚本来完成相应的工作，或往往只是为了完成某种特定工作而设计的，缺乏Linux命令原有的灵活性及可控性。再者，图形化工具相较于Linux命令行界面会更加消耗系统资源，因此经验丰富的运维人员甚至都不会给Linux系统安装图形界面，在需要开始运维工作时直接通过命令行模式远程连接过去。不得不说，这样做确实挺高效的。

上一章我们安装了linux环境后，下面开始学习如何操作linux的命令

## 1、学习命令前的必备知识

### 1.1 命令的组成结构

要想准确、高效地完成各种任务，仅依赖于命令本身是不够的，还应该根据实际情况来灵活调整各种命令的参数。

常见的执行Linux命令的格式是下面这样的。

> **命令名称   [命令参数]   [命令对象]**

**命令名称**：就是语法中的“动词”，表达的是想要做的事情，例如创建用户、查看文件、重启系统等操作。

**命令参数**：用于对命令进行调整，让“修改”过的命令能更好地贴合工作需求，达到事半功倍的效果。就像买衣服一样，衣服的尺码总会感觉偏大或偏小，要么只能将就着穿，要么就再裁剪修改一下，而这种对命令进行“裁剪”的行为就是加参数。例如创建一个编码为888的用户、仅查看文件的前20行、重启系统前先提醒其他用户等。参数可以用长格式（完整的选项名称），也可以用短格式（单个字母的缩写），两者分别用“--”与“-”作为前缀

 Linux命令参数的长格式与短格式示例

| 长格式 | man --help |
| ------ | ---------- |
| 短格式 | man -h     |



**命令对象**：一般指要处理的文件、目录、用户等资源名称，也就是命令执行后的“承受方”。例如创建一位叫小明的用户、查看一个叫工资表的文件、重启一个IP为192.168.10.10的系统等。

> 命令名称、命令参数与命令对象之间要用空格进行分隔，且字母严格区分大小写。

在Linux相关的图书中，我们会约定俗成地将可选择的、可加或可不加的、非必需的参数使用中括号引起来，例如“man [命令参数]”；而命令所要求的、必须有的参数或对象值，则不带中括号。这样一来，读者可以更好地理解下面出现的命令格式。

### 1.2 如何输入命令

默认的主机登录界面中只有我们刚刚新建的普通用户，因此在正式进入系统之前，还需要先单击“Not listed?”选项切换至root管理员身份。这是红帽RHEL 8系统为了避免用户乱使用权限而采取的一项小措施，如图2-2所示。

![第2章 新手必须掌握的Linux命令第2章 新手必须掌握的Linux命令](https://www.linuxprobe.com/wp-content/uploads/2020/05/%E5%88%87%E6%8D%A2%E8%87%B3root%E7%AE%A1%E7%90%86%E5%91%98%E8%BA%AB%E4%BB%BD-1024x614.png)

如果使用默认的linuxprobe用户登录到主机中，那么本章后面的一些命令会因为权限不足而无法执行，我们需要有足够的权限才能完成接下来的实验。至于同学们关心的“root管理员和普通用户之间的区别，在生产环境时又该如何选择”的疑问，将会在第5章慢慢讲给大家。

登录成功后，单击桌面左上角的Activities按钮，在左侧弹出的菜单中单击命令行终端图标即可打开Bash解释器

![第2章 新手必须掌握的Linux命令第2章 新手必须掌握的Linux命令](https://www.linuxprobe.com/wp-content/uploads/2020/05/%E6%89%93%E5%BC%80%E5%91%BD%E4%BB%A4%E8%A1%8C%E7%BB%88%E7%AB%AF-1024x614.png)

在命令行终端中输入man man命令来查看man命令自身的帮助信息

![第2章 新手必须掌握的Linux命令第2章 新手必须掌握的Linux命令](https://www.linuxprobe.com/wp-content/uploads/2020/05/%E6%9F%A5%E7%9C%8Bman%E5%91%BD%E4%BB%A4%E7%9A%84%E5%B8%AE%E5%8A%A9%E4%BF%A1%E6%81%AF-1024x614.png)

敲击回车键后即可看到如下图所示的帮助信息。

![第2章 新手必须掌握的Linux命令第2章 新手必须掌握的Linux命令](https://www.linuxprobe.com/wp-content/uploads/2020/05/man%E5%91%BD%E4%BB%A4%E7%9A%84%E5%B8%AE%E5%8A%A9%E4%BF%A1%E6%81%AF-1024x614.png)

小试牛刀成功。大家是不是热情倍增！不过还是要注意Linux系统中的命令、参数、对象都是严格区分大小写的。比如，分别执行几次man命令，大家能看得出来哪个是正确的吗？

```shell
[root@linuxprobe ~]# Man
bash: Man: command not found...
Similar command is: 'man'
[root@linuxprobe ~]# MAN
bash: MAN: command not found...
Similar command is: 'man'
[root@linuxprobe ~]# man
What manual page do you want?
```

在man命令帮助信息的界面中，所包含的常用操作按键及其作用如下表所示。

man命令中常用按键以及作用

| 按键      | 作用                               |
| --------- | ---------------------------------- |
| 空格键    | 向下翻一页                         |
| PaGe down | 向下翻一页                         |
| PaGe up   | 向上翻一页                         |
| home      | 直接前往首页                       |
| end       | 直接前往尾页                       |
| /         | 从上至下搜索某个关键词，如“/linux” |
| ?         | 从下至上搜索某个关键词，如“?linux” |
| n         | 定位到下一个搜索到的关键词         |
| N         | 定位到上一个搜索到的关键词         |
| b         | 向上翻一页                         |
| g         | 跳转到第一页                       |
| h         | 显示帮助界面                       |
| u         | 向上滚动半页                       |
| d         | 向下滚动半页                       |
| q         | 退出帮助文档                       |



一般来讲，使用man命令查看到的帮助内容信息都会很长很多，如果读者不了解帮助文档信息的目录结构和操作方法，乍一看到这么多信息可能会感到相当困惑。man命令的帮助信息的结构及其代表意义如表2-3所示。

表2-3                     man命令中帮助信息的结构以及意义

| 结构名称    | 代表意义                 |
| ----------- | ------------------------ |
| NAME        | 命令的名称               |
| SYNOPSIS    | 参数的大致使用方法       |
| DESCRIPTION | 介绍说明                 |
| EXAMPLES    | 演示（附带简单说明）     |
| OVERVIEW    | 概述                     |
| DEFAULTS    | 默认的功能               |
| OPTIONS     | 具体的可用选项（带介绍） |
| ENVIRONMENT | 环境变量                 |
| FILES       | 用到的文件               |
| SEE ALSO    | 相关的资料               |
| HISTORY     | 维护历史与联系方式       |



需要多说一句的是，在输入命令前就已经存在的“[root@linuxprobe～]#”这部分内容是终端提示符，它用于向用户展示一些基本的信息—当前登录用户名为root，简要的主机名是linuxprobe，所在目录是～（这里的～是指用户家目录，第6章会讲解），#表示管理员身份（如果是$则表示普通用户，相应的权限也会小一些）。

额外的4个快捷键/组合键小技巧

**Tab键**：

在Bash解释器的快捷键中，Tab键绝对是使用频率最高的，它能够实现对命令、参数或文件的内容补全。例如，如果想执行reboot重启命令，但一时想不起来该命令的完整拼写，则可以这样输入：

```
[root@linuxprobe ~]# re<Tab键><Tab键>
read                    redhat-access-insights  rescan-scsi-bus.sh
readarray               reject                  reset
readelf                 remotectl               resize2fs
readlink                rename                  resizecons
readmult                renew-dummy-cert        resizepart
readonly                renice                  resolvconf
readprofile             report-cli              resolvectl
realm                   reporter-rhtsupport     restorecon
realpath                reporter-upload         restorecon_xattr
reboot                  report-gtk              return
recode-sr-latin         repquota                rev
red                     request-key     
[root@linuxprobe ~]# reb<Tab键>
[root@linuxprobe ~]# reboot
```

在上面的实验中，先输入了两个字母re，随后敲击了两下Tab键。由于以re开头的命令不止一个，所以系统将所有以re开头的命令全部显示了出来。而第二次输入reb后再敲击Tab键，由于此时没有以reb开头的其他命令，所以系统就显示出了完整的reboot重启命令。

对于文件名也是一样的操作—只需要输入前面的一部分名称，且不存在多个以这部分名称开头的文件名，系统就会自动补全。不仅速度快，而且避免了手动输入有可能出错的问题。

**Ctrl+C组合键**：

当同时按下键盘上的Ctrl和字母C的时候，意味着终止当前进程的运行。假如执行了一个错误命令，或者是执行某个命令后迟迟无法结束，这时就可以冷静地按下Ctrl+C组合键，命令行终端的控制权会立刻回到我们手中。

下述命令的执行效果是每1s刷新一次系统负载情况（先不用管命令的作用），直到按下Ctrl+c组合键时才停止运行。

```
[root@linuxprobe ~]# watch -n 1 uptime
Every 1.0s: uptime                        localhost.localdomain: Mon Sep 28 19:11:44 2020
19:11:44 up 59 min,  2 users,  load average: 0.00, 0.00, 0.00
<Ctrl>+<c>
[root@linuxprobe ~]#
```

**Ctrl+D组合键**：

当同时按下键盘上的Ctrl和字母D的时候，表示键盘输入结束。

**Ctrl+L组合键**：

当同时按下键盘上的Ctrl和字母L的时候，会清空当前终端中已有的内容（相当于清屏操作）。

从现在开始，本书后面的内容都是重磅内容。本书将会带领读者掌握大约150个常用的Linux命令，以及50多个热门的命令。这50多个热门的命令是以Linux命令大全网（www.linuxcool.com）的查询阅览量为基础筛选出来的。当然，将这些命令全都放到第2章讲完肯定不现实，所以刘遄老师根据10多年来的运维经验优先筛选出了10多个高频使用的基础命令。由于后面的章节中会反复用到这些命令，因此大家需要好好学习并掌握它们，这样才能在后面章节的学习中做到游刃有余。加油！

## 2、常用工作命令

### 2.1．echo命令

echo命令用于在终端设备上`输出字符串或变量提取后的值`，语法格式为“`echo [字符串] [$变量]`”。

这是Linux系统中最常用的几个命令之一，它的操作却非常简单，执行“`echo字符串`”或“`echo $变量`”就行，其中`$`符号的意思是提取变量的实际值，以便后续的输出操作。

例如，把指定字符串“LinuxProbe.com”输出到终端屏幕的命令为：

```bash
[root@linuxprobe ~]# echo LinuxProbe.com
```

该命令会在终端屏幕上显示如下信息：

```
LinuxProbe.com
```

下面使用“$变量”的方式提取出变量SHELL的值，并将其输出到屏幕上：

```bash
[root@linuxprobe ~]# echo $SHELL
/bin/bash
```

### 2.2．date命令

`date`命令用于显示或设置系统的时间与日期，语法格式为“`date [+指定的格式]`”。

用户只需在强大的date命令后输入以“+”号开头的参数，即可按照指定格式来输出系统的时间或日期，这样在日常工作时便可以把备份数据的命令与指定格式输出的时间信息结合到一起。例如，把打包后的文件自动按照“年-月-日”的格式打包成“backup-2020-9-1.tar.gz”，用户只需要看一眼文件名称就能大致了解到每个文件的备份时间了。date命令中常见的参数格式及其作用如表2-4所示。

表2-4                        date命令中的参数及其作用

| 参数 | 作用                             |
| ---- | -------------------------------- |
| %S   | 秒（00～59）                     |
| %M   | 分钟（00～59）                   |
| %H   | 小时（00～23）                   |
| %I   | 小时（00～12）                   |
| %m   | 月份（1~12）                     |
| %p   | 显示出AM或PM                     |
| %a   | 缩写的工作日名称（例如：Sun）    |
| %A   | 完整的工作日名称（例如：Sunday） |
| %b   | 缩写的月份名称（例如：Jan）      |
| %B   | 完整的月份名称（例如：January）  |
| %q   | 季度（1~4）                      |
| %y   | 简写年份（例如：25）             |
| %Y   | 完整年份（例如：2025）           |
| %d   | 本月中的第几天                   |
| %j   | 今年中的第几天                   |
| %n   | 换行符（相当于按下回车键）       |
| %t   | 跳格（相当于按下Tab键）          |

按照默认格式查看当前系统时间的date命令如下所示：

```bash
[root@linuxprobe ~]# date
Sat Sep 5 09:13:45 CST 2020
```

按照“年-月-日 小时:分钟:秒”的格式查看当前系统时间的date命令如下所示：

```bash
[root@linuxprobe ~]# date "+%Y-%m-%d %H:%M:%S"
2020-09-05 09:14:35
```

将系统的当前时间设置为2020年11月1日8点30分的date命令如下所示：

```bash
[root@linuxprobe ~]# date -s "20201101 8:30:00"
Sun Nov 1 08:30:00 CST 2020
```

再次使用date命令并按照默认的格式查看当前的系统时间，如下所示：

```bash
[root@linuxprobe ~]# date
Sun Nov 1 08:30:08 CST 2020
```

date命令中的参数`%j`可用来查看今天是当年中的第几天。这个参数能够很好地区分备份时间的早晚，即数字越大，越靠近当前时间。该参数的使用方式以及显示结果如下所示：

```bash
[root@linuxprobe ~]# date "+%j"
306
```

### 2.3．timedatectl命令

`timedatectl`命令用于设置系统的时间，英文全称为“time date control”，语法格式为“`timedatectl [参数]`”。

发现电脑时间跟实际时间不符？如果只差几分钟的话，我们可以直接调整。但是，如果差几个小时，那么除了调整当前的时间，还有必要检查一下时区了。`timedatectl`命令中常见的参数格式及作用如下表所示。

`timedatectl`命令中的参数以及作用

| 参数           | 作用         |
| -------------- | ------------ |
| status         | 显示状态信息 |
| list-timezones | 列出已知时区 |
| set-time       | 设置系统时间 |
| set-timezone   | 设置生效时区 |
| set-ntp        | 设置NTP服务  |

查看系统时间与时区的方法如下：

```bash
[root@linuxprobe ~]# timedatectl status
               Local time: Sun 2020-09-06 19:51:22 CST
           Universal time: Sun 2020-09-06 11:51:22 UTC
                 RTC time: Sun 2020-09-06 19:51:21
                Time zone: Asia/Shanghai (CST, +0800)
System clock synchronized: no
              NTP service: inactive
          RTC in local TZ: no
```

如果您查到的时区不是上海（Asia/Shanghai），可以手动进行设置：

```bash
[root@linuxprobe ~]# timedatectl set-timezone Asia/Shanghai
```

如果时间还是不正确，可再手动修改系统日期：

```bash
[root@linuxprobe ~]# timedatectl set-time 2021-05-18
```

而如果想修改时间的话，也很简单：

```bash
[root@linuxprobe ~]# timedatectl set-time 9:30
[root@linuxprobe ~]# date 
Tue May 18 09:30:01 CST 2021
```

### 2.4．reboot命令

`reboot`命令用于重启系统，输入该命令后按回车键执行即可。

由于重启计算机这种操作会涉及硬件资源的管理权限，因此最好是以`root`管理员的身份来重启，普通用户在执行该命令时可能会被拒绝。`reboot`的命令如下：

```bash
[root@linuxprobe ~]# reboot
```

### 2.5．poweroff命令

`poweroff`命令用于关闭系统，输入该命令后按回车键执行即可。

与上面相同，该命令也会涉及硬件资源的管理权限，因此最好还是以root管理员的身份来关闭电脑，其命令如下：

```bash
[root@linuxprobe ~]# poweroff
```

### 2.6．wget命令

`wget`命令用于在终端命令行中下载网络文件，英文全称为“web get”，语法格式为“`wget [参数] 网址`”。

借助于`wget`命令，可以无须打开浏览器，直接在命令行界面中就能下载文件。如果您没有Linux系统的管理经验，当前只需了解一下wget命令的参数以及作用，然后看一眼下面的演示实验就够了，切记不要急于求成。后面章节将逐步讲解Linux系统的配置管理方法，可以等掌握了网卡的配置方法后再来进行这个实验操作。下表所示为`wget`命令中的参数以及参数的作用。

wget命令中的参数以及作用

| 参数 | 作用                                 |
| ---- | ------------------------------------ |
| -b   | 后台下载模式                         |
| -P   | 下载到指定目录                       |
| -t   | 最大尝试次数                         |
| -c   | 断点续传                             |
| -p   | 下载页面内所有资源，包括图片、视频等 |
| -r   | 递归下载                             |

尝试使用`wget`命令从本书的配套站点中下载本书最新的PDF格式的电子文档。执行该命令后的下载效果如下：

```bash
[root@linuxprobe ~]# wget https://www.linuxprobe.com/docs/LinuxProbe.pdf
--2020-09-28 19:24:39--  https://www.linuxprobe.com/docs/LinuxProbe.pdf
Resolving www.linuxprobe.com (www.linuxprobe.com)... 221.15.64.1
Connecting to www.linuxprobe.com (www.linuxprobe.com)|221.15.64.1|:443... connected.
HTTP request sent, awaiting response... 200 OK
Length: 17676281 (17M) [application/pdf]
Saving to: ‘LinuxProbe.pdf’

LinuxProbe.pdf      100%[===================>]  16.86M  15.9MB/s    in 1.1s    

2020-09-28 19:24:40 (15.9 MB/s) - ‘LinuxProbe.pdf’ saved [17676281/17676281]
```

接下来，使用wget命令递归下载www.linuxprobe.com网站内的所有页面数据以及文件，下载完后会自动保存到当前路径下一个名为www.linuxprobe.com的目录中。该命令的执行结果如下：

```bash
[root@linuxprobe ~]# wget -r -p https://www.linuxprobe.com
--2020-09-28 19:26:12--  https://www.linuxprobe.com/
Resolving www.linuxprobe.com (www.linuxprobe.com)... 221.15.64.1
Connecting to www.linuxprobe.com (www.linuxprobe.com)|221.15.64.1|:443... connected.
HTTP request sent, awaiting response... 200 OK
Length: unspecified [text/html]
Saving to: ‘www.linuxprobe.com/index.html’
………………省略下载过程………………
```

### 2.7．ps命令

`ps`命令用于查看系统中的进程状态，英文全称为“processes”，语法格式为“`ps [参数]`”。

估计读者在第一次执行这个命令时都要惊呆一下—怎么会有这么多输出值，这可怎么看得过来？其实，高手通常会将ps命令与第3章的管道符技术搭配使用，用来抓取与某个指定服务进程相对应的PID号码。ps命令的常见参数以及作用如表2-7所示。

ps命令中的参数以及作用

| 参数 | 作用                               |
| ---- | ---------------------------------- |
| -a   | 显示所有进程（包括其他用户的进程） |
| -u   | 用户以及其他详细信息               |
| -x   | 显示没有控制终端的进程             |

Linux系统中时刻运行着许多进程，如果能够合理地管理它们，则可以优化系统的性能。在Linux系统中有5种常见的进程状态，分别为运行、中断、不可中断、僵死与停止，其各自含义如下所示。

> **R（运行）**：进程正在运行或在运行队列中等待。
>
> **S（中断）**：进程处于休眠中，当某个条件形成后或者接收到信号时，则脱离该  状态。
>
> **D（不可中断）**：进程不响应系统异步信号，即便用kill命令也不能将其中断。
>
> **Z（僵死）**：进程已经终止，但进程描述符依然存在, 直到父进程调用wait4()系统函数后将进程释放。
>
> **T（停止）**：进程收到停止信号后停止运行。

除了上面5种常见的进程状态，还有可能是高优先级（<）、低优先级（N）、被锁进内存（L）、包含子进程（s）以及多线程（l）这5种补充形式。

当执行ps aux命令后通常会看到如下表所示的进程状态。下面只是列举了部分输出值，而且正常的输出值中不包括中文注释。

进程状态

| USER         | PID      | %CPU             | %MEM       | VSZ                      | RSS                        | TTY      | STAT     | START        | TIME              | COMMAND                                                      |
| ------------ | -------- | ---------------- | ---------- | ------------------------ | -------------------------- | -------- | -------- | ------------ | ----------------- | ------------------------------------------------------------ |
| 进程的所有者 | 进程ID号 | 运算器占用率     | 内存占用率 | 虚拟内存使用量(单位是KB) | 占用的固定内存量(单位是KB) | 所在终端 | 进程状态 | 被启动的时间 | 实际使用CPU的时间 | 命令名称与参数                                               |
| root         | 1        | 0.0              | 0.8        | 172520                   | 16372                      | ?        | Ss       | 18:49        | 0:01              | /usr/lib/systemd/s ystemd rhgb --switched-root --system --deserialize 31 |
| root         | 2        | 0.0              | 0.0        | 0                        | 0                          | ?        | S        | 18:49        | 0:00              | [kthreadd]                                                   |
| root         | 3        | 0.0              | 0.0        | 0                        | 0                          | ?        | I        | 18:49        | 0:00              | [rcu_gp]                                                     |
| root         | 4        | 0.0              | 0.0        | 0                        | 0                          | ?        | I        | 18:49        | 0:00              | [rcu_par_gp]                                                 |
| root         | 5        | 0.0              | 0.0        | 0                        | 0                          | ?        | I        | 18:49        | 0:00              | [slub_flushwq]                                               |
| root         | 6        | 0.0              | 0.0        | 0                        | 0                          | ?        | I        | 18:49        | 0:00              | [netns]                                                      |
| root         | 7        | 0.0              | 0.0        | 0                        | 0                          | ?        | I        | 18:49        | 0:00              | [kworker/0:0H-even                                           |
| root         | 8        | 0.0              | 0.0        | 0                        | 0                          | ?        | I        | 18:49        | 0:00              | ts_highpri]                                                  |
| root         | 9        | 0.0              | 0.0        | 0                        | 0                          | ?        | I        | 18:49        | 0:00              | [kworker/0:1H-kblo                                           |
|              | ………………   | 省略部分输出信息 | ………………     | ckd]                     |                            |          |          |              |                   |                                                              |

> 如前面所提到的，在Linux系统中的命令参数有长短格式之分，长格式和长格式之间不能合并，长格式和短格式之间也不能合并，但短格式和短格式之间是可以合并的，合并后仅保留一个减号（-）即可。另外ps命令可允许参数不加减号（-），因此可直接写成ps aux的样子。

### 2.8．pstree命令

pstree命令用于以树状图的形式展示进程之间的关系，英文全称为“process tree”，输入该命令后按回车键执行即可。

前文提到，在执行ps命令后，产生的信息量太大又没有规律，很难让人再想看第二眼。如果想让进程以树状图的形式，有层次地展示出进程之间的关系，则可以使用pstree命令：

```bash
[root@linuxprobe ~]# pstree
systemd─┬─ModemManager───2*[{ModemManager}]
├─NetworkManager───2*[{NetworkManager}]
├─VGAuthService
├─accounts-daemon───2*[{accounts-daemon}]
├─atd
├─auditd─┬─sedispatch
│ └─2*[{auditd}]
├─avahi-daemon───avahi-daemon
├─boltd───2*[{boltd}]
├─colord───2*[{colord}]
├─crond
├─cupsd
├─dbus-daemon───{dbus-daemon}
├─dnsmasq───dnsmasq
├─firewalld───{firewalld}
├─fprintd───{fprintd}
├─fwupd───4*[{fwupd}]
………………省略部分输出信息………………
```

### 2.9．top命令

`top`命令用于动态地监视进程活动及系统负载等信息，输入该命令后按回车键执行即可。

前面介绍的命令都是静态地查看系统状态，不能实时滚动最新数据，而top命令能够动态地查看系统状态，因此完全可以将它看作是Linux中“强化版的Windows任务管理器”。top是相当好用的性能分析工具，该命令的运行界面如下图所示。

![第2章 新手必须掌握的Linux命令第2章 新手必须掌握的Linux命令](https://www.linuxprobe.com/wp-content/uploads/2020/05/top%E5%91%BD%E4%BB%A4-1024x648.png)

top命令执行结果的前5行为系统整体的统计信息，其所代表的含义如下。

> 第1行：系统时间、运行时间、登录终端数、系统负载（3个数值分别为1分钟、5分钟、15分钟内的平均值，数值越小意味着负载越低）。
>
> 第2行：进程总数、运行中的进程数、睡眠中的进程数、停止的进程数、僵死的进程数。
>
> 第3行：用户占用资源百分比、系统内核占用资源百分比、改变过优先级的进程资源百分比、空闲的资源百分比等。其中数据均为CPU数据并以百分比格式显示，例如“99.9 id”意味着有99.9%的CPU处理器资源处于空闲。
>
> 第4行：物理内存总量、内存空闲量、内存使用量、作为内核缓存的内存量。
>
> 第5行：虚拟内存总量、虚拟内存空闲量、虚拟内存使用量、已被提前加载的内存量。

### 2.10．nice命令

`nice`命令用于调整进程的优先级，语法格式为“`nice优先级数字 服务名称`”。

在top命令输出的结果中，PR和NI值代表的是进程的优先级，数字越低（取值范围是-20～19），优先级越高。在日常的生产工作中，可以将一些不重要进程的优先级调低，让紧迫的服务更多地利用CPU和内存资源，以达到合理分配系统资源的目的。例如将bash服务的优先级调整到最高：

```bash
[root@linuxprobe ~]# nice -n -20 bash
[root@linuxprobe ~]#
```

### 2.11．pidof命令

`pidof`命令用于查询某个指定服务进程的PID号码值，语法格式为“`pidof [参数] 服务名称`”。

每个进程的进程号码值（PID）是唯一的，可以用于区分不同的进程。例如，执行如下命令来查询本机上sshd服务程序的PID：

```bash
[root@linuxprobe ~]# pidof sshd
2156
```

### 2.12．kill命令

`kill`命令用于终止某个指定PID值的服务进程，语法格式为“`kill [参数] 进程的PID`”。

接下来，使用kill命令把上面用`pidof`命令查询到的PID所代表的进程终止掉，其命令如下所示。这种操作的效果等同于强制停止sshd服务。

```bash
[root@linuxprobe ~]# kill 2156
```

但有时系统会提示进程无法被终止，此时可以加参数`-9`，表示最高级别地强制杀死进程：

```bash
[root@linuxprobe ~]# kill -9 2156
```

### 2.13．killall命令

`killall`命令用于终止某个指定名称的服务所对应的全部进程，语法格式为“`killall [参数] 服务名称`”。

通常来讲，复杂软件的服务程序会有多个进程协同为用户提供服务，如果用kill命令逐个去结束这些进程会比较麻烦，此时可以使用`killall`命令来批量结束某个服务程序带有的全部进程。下面以`httpd`服务程序为例，来结束其全部进程。由于RHEL 8系统默认没有安装httpd服务程序，因此大家此时只需看操作过程和输出结果即可，等学习了相关内容之后再来实践。

```bash
[root@linuxprobe ~]# pidof httpd
13581 13580 13579 13578 13577 13576
[root@linuxprobe ~]# killall httpd
[root@linuxprobe ~]# pidof httpd
[root@linuxprobe ~]# 
```

如果在系统终端中执行一个命令后想立即停止它，可以同时按下`Ctrl + C`组合键（生产环境中比较常用的一个组合键），这样将立即终止该命令的进程。或者，如果有些命令在执行时不断地在屏幕上输出信息，影响到后续命令的输入，则可以在执行命令时在末尾3添加一个&符号，这样命令将进入系统后台来执行。

## 3、系统状态检测命令

为了更快、更好地了解Linux服务器，必须具备快速查看系统运行状态的能力，因此接下来会逐个讲解与网卡网络、系统内核、系统负载、内存使用情况、当前启用终端数量、历史登录记录、命令执行记录以及救援诊断等相关命令的使用方法。

### 3.1．ifconfig命令

`ifconfig`命令用于获取网卡配置与网络状态等信息，英文全称为“interface config”，语法格式为“`ifconfig [参数] [网络设备]`”。

使用`ifconfig`命令来查看本机当前的网卡配置与网络状态等信息时，其实主要查看的就是网卡名称、inet参数后面的IP地址、ether参数后面的网卡物理地址（又称为MAC地址），以及RX、TX的接收数据包与发送数据包的个数及累计流量（即下面加粗的信息内容）：

```bash
[root@linuxprobe ~]# ifconfig
ens160: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 192.168.10.10  netmask 255.255.255.0  broadcast 192.168.10.255
        inet6 fe80::c8f8:f5c5:8251:aeaa  prefixlen 64  scopeid 0x20
        ether 00:0c:29:7d:27:bf  txqueuelen 1000  (Ethernet)
        RX packets 304  bytes 33283 (32.5 KiB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 91  bytes 11052 (10.7 KiB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

lo: flags=73<UP,LOOPBACK,RUNNING>  mtu 65536
        inet 127.0.0.1  netmask 255.0.0.0
        inet6 ::1  prefixlen 128  scopeid 0x10
        loop  txqueuelen 1000  (Local Loopback)
        RX packets 376  bytes 31784 (31.0 KiB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 376  bytes 31784 (31.0 KiB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

virbr0: flags=4099<UP,BROADCAST,MULTICAST>  mtu 1500
        ether 52:54:00:a2:89:54  txqueuelen 1000  (Ethernet)
        RX packets 0  bytes 0 (0.0 B)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 0  bytes 0 (0.0 B)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0
```

### 3.2．uname命令

uname命令用于查看系统内核版本与系统架构等信息，英文全称为“unix name”，语法格式为“`uname [-a]`”。

在使用`uname`命令时，一般要固定搭配上`-a`参数来完整地查看当前系统的内核名称、主机名、内核发行版本、节点名、压制时间、硬件名称、硬件平台、处理器类型以及操作系统名称等信息：

```bash
[root@linuxprobe ~]# uname -a
Linux linuxprobe.com 4.18.0-80.el8.x86_64 #1 SMP Wed Mar 13 12:02:46 UTC 2019 x86_64 x86_64 x86_64 GNU/Linux
```

顺带一提，如果要查看当前系统版本的详细信息，则需要查看`redhat-release`文件，其命令以及相应的结果如下：

```bash
[root@linuxprobe ~]# cat /etc/redhat-release
Red Hat Enterprise Linux release 8.0 (Ootpa)
```

### 3.3．uptime命令

`uptime`命令用于查看系统的负载信息，输入该命令后按回车键执行即可。

`uptime`命令真的很棒，它可以显示当前系统时间、系统已运行时间、启用终端数量以及平均负载值等信息。平均负载值指的是系统在最近1分钟、5分钟、15分钟内的压力情况（下面加粗的信息部分），负载值越低越好：

```bash
[root@linuxprobe ~]# uptime
22:49:55 up 10 min, 1 users, load average: 0.01, 0.19, 0.18
```

> “负载值越低越好”是对运维人员来讲的，越低表示越安全省心。但是公司购置的硬件设备如果长期处于空闲状态，则明显是种资源浪费，老板也不会开心。所以建议负载值保持在1左右，在生产环境中不要超过5就好。

### 3.4．free命令

free命令用于显示当前系统中内存的使用量信息，语法格式为“`free [-h]`”。

为了保证Linux系统不会因资源耗尽而突然宕机，运维人员需要时刻关注内存的使用量。在使用free命令时，可以结合使用-h参数以更人性化的方式输出当前内存的实时使用量信息。下表所示为在刘遄老师的电脑上执行`free -h`命令之后的输出信息。需要注意的是，输出信息中的中文注释是作者自行添加的内容，实际输出时没有相应的参数解释。

```bash
[root@linuxprobe ~]# free -h
```

执行`free -h`命令后的输出信息

|       | 内存总量 | 已用量 | 空闲量 | 共享使用的内存量 | 缓存的内存量 | 可用量    |
| ----- | -------- | ------ | ------ | ---------------- | ------------ | --------- |
|       | total    | used   | free   | shared           | buff/cache   | available |
| Mem:  | 1.9Gi    | 1.5Gi  | 126Mi  | 16Mi             | 487Mi        | 437Mi     |
| Swap: | 2.0Gi    | 56Mi   | 1.9Gi  |                  |              |           |

如果不使用`-h（易读模式）`查看内存使用量情况，则默认以`KB`为单位。这样一来，服务器如果有几百`GB`的内存，则换算下来就会是一大长串的数字，真不利于阅读。

### 3.5．who命令

`who`命令用于查看当前登入主机的用户终端信息，输入该命令后按回车键执行即可。

这3个简单的字母可以快速显示出所有正在登录本机的用户名称以及他们正在开启的终端信息；如果有远程用户，还会显示出来访者的IP地址。下表所示为执行`who`命令后的结果。

```bash
[root@linuxprobe ~]# who
```

执行`who`命令的结果

| 登录的用户名 | 终端设备 | 登录到系统的时间                |
| ------------ | -------- | ------------------------------- |
| root         | seat0    | 2025-05-18 02:31 (login screen) |
| root         | tty2     | 2025-05-18 02:31 (tty2)         |

### 3.6．last命令

`last`命令用于调取主机的被访记录，输入该命令后按回车键执行即可。

Linux系统会将每次的登录信息都记录到日志文件中，如果哪天想翻阅了，直接执行这条命令就行：

```bash
[root@linuxprobe ~]# last
root     pts/1        192.168.10.1     Tue May 18 10:30 - 11:03  (00:32)
root     tty2         tty2             Fri Jul 24 06:26    gone - no logout
reboot   system boot  4.18.0-80.el8.x8 Fri Jul 24 05:59   still running
root     tty2         tty2             Tue Jul 21 05:19 - down   (00:00)
reboot   system boot  4.18.0-80.el8.x8 Tue Jul 21 05:16 - 05:19  (00:02)

wtmp begins Tue Jul 21 05:16:47 2020
```

### 3.7．ping命令

`ping`命令用于测试主机之间的网络连通性，语法格式为“`ping [参数] 主机地址`”。

即便大家没有学习过Linux系统，相信也肯定见过别人使用`ping`命令。执行`ping`命令时，系统会使用ICMP向远端主机发出要求回应的信息，若连接远端主机的网络没有问题，远端主机会回应该信息。由此可见，ping命令可用于判断远端主机是否在线并且网络是否正常。ping命令的常见参数以及作用如下表所示。

**`ping`命令中的参数以及作用**

| 参数 | 作用               |
| ---- | ------------------ |
| -c   | 总共发送次数       |
| -l   | 指定网卡名称       |
| -i   | 每次间隔时间（秒） |
| -W   | 最长等待时间（秒） |

我们使用`ping`命令测试一台在线的主机（其IP地址为192.168.10.10），得到的回应是这样的：

```bash
[root@linuxprobe ~]# ping -c 4 192.168.10.10
PING 192.168.10.10 (192.168.10.10) 56(84) bytes of data.
64 bytes from 192.168.10.10: icmp_seq=1 ttl=64 time=0.155 ms
64 bytes from 192.168.10.10: icmp_seq=2 ttl=64 time=0.110 ms
64 bytes from 192.168.10.10: icmp_seq=3 ttl=64 time=0.112 ms
64 bytes from 192.168.10.10: icmp_seq=4 ttl=64 time=0.209 ms

--- 192.168.10.10 ping statistics ---
4 packets transmitted, 4 received, 0% packet loss, time 56ms
rtt min/avg/max/mdev = 0.110/0.146/0.209/0.042 ms
```

测试一台不在线的主机（其IP地址为192.168.10.20），得到的回应是这样的：

```bash
[root@linuxprobe ~]# ping -c 4 192.168.10.20
PING 192.168.10.20 (192.168.10.20) 56(84) bytes of data.
From 192.168.10.10 icmp_seq=1 Destination Host Unreachable
From 192.168.10.10 icmp_seq=2 Destination Host Unreachable
From 192.168.10.10 icmp_seq=3 Destination Host Unreachable
From 192.168.10.10 icmp_seq=4 Destination Host Unreachable

--- 192.168.10.20 ping statistics ---
4 packets transmitted, 0 received, +4 errors, 100% packet loss, time 68ms
pipe 4
```

### 3.8．tracepath命令

`tracepath`命令用于显示数据包到达目的主机时途中经过的所有路由信息，语法格式为“`tracepath [参数] 域名`”。

当两台主机之间无法正常`ping`通时，要考虑两台主机之间是否有错误的路由信息，导致数据被某一台设备错误地丢弃。这时便可以使用`tracepath`命令追踪数据包到达目的主机时途中的所有路由信息，以分析是哪台设备出了问题。下面的情况就很清晰了：

```bash
[root@linuxprobe ~]# tracepath www.linuxprobe.com
 1?: [LOCALHOST]                                          pmtu 1500
 1:  no reply
 2:  11.223.0.189                                          5.954ms asymm  1 
 3:  11.223.0.14                                           6.256ms asymm  2 
 4:  11.220.159.62                                         3.313ms asymm  3 
 5:  116.251.107.13                                        1.841ms 
 6:  140.205.50.237                                        2.416ms asymm  5 
 7:  101.95.211.117                                        2.772ms 
 8:  101.95.208.45                                        40.839ms 
 9:  101.95.218.217                                       13.898ms asymm  8 
10:  202.97.81.162                                         8.113ms asymm  9 
11:  221.229.193.238                                      15.693ms asymm 10 
12:  no reply
13:  no reply
14:  no reply
15:  no reply
16:  no reply
17:  no reply
18:  no reply
………………省略部分输出信息………………
```

### 3.9．netstat命令

`netstat`命令用于显示如网络连接、路由表、接口状态等的网络相关信息，英文全称为“network status”，语法格式为“`netstat [参数]`”。

只要`netstat`命令使用得当，便可以查看到网络状态的方方面面信息。我们找出一些常用的参数让大家感受一下。`netstat`命令的常见参数以及作用如下表所示。

`netstat`命令中的参数以及作用

| 参数 | 作用                     |
| ---- | ------------------------ |
| -a   | 显示所有连接中的Socket   |
| -p   | 显示正在使用的Socket信息 |
| -t   | 显示TCP协议的连接状态    |
| -u   | 显示UDP协议的连接状态    |
| -n   | 使用IP地址，不使用域名   |
| -l   | 仅列出正在监听的服务状态 |
| -i   | 显示网卡列表信息         |
| -r   | 显示路由表信息           |

使用`netstat`命令显示详细的网络状况：

```bash
[root@linuxprobe ~]# netstat -a
Active Internet connections (servers and established)
Proto Recv-Q Send-Q Local Address           Foreign Address         State      
tcp        0      0 0.0.0.0:ssh             0.0.0.0:*               LISTEN     
tcp        0      0 localhost:ipp           0.0.0.0:*               LISTEN     
tcp        0      0 0.0.0.0:sunrpc          0.0.0.0:*               LISTEN     
tcp6       0      0 [::]:ssh                [::]:*                  LISTEN     
tcp6       0      0 localhost:ipp           [::]:*                  LISTEN     
tcp6       0      0 [::]:sunrpc             [::]:*                  LISTEN     
udp        0      0 0.0.0.0:bootps          0.0.0.0:*                          
udp        0      0 0.0.0.0:sunrpc          0.0.0.0:*                          
udp        0      0 0.0.0.0:mdns            0.0.0.0:*                          
udp        0      0 0.0.0.0:37396           0.0.0.0:*                          
udp6       0      0 [::]:sunrpc             [::]:*                             
udp6       0      0 [::]:mdns               [::]:*                             
udp6       0      0 [::]:38541              [::]:*       
………………省略部分输出信息………………     
```

使用`netstat`命令显示网卡列表：

```bash
[root@linuxrpobe ~]# netstat -i 
Kernel Interface table
Iface             MTU    RX-OK RX-ERR RX-DRP RX-OVR    TX-OK TX-ERR TX-DRP TX-OVR Flg
ens160           1500       70      0      0 0            79      0      0      0 BMRU
lo              65536      248      0      0 0           248      0      0      0 LRU
virbr0           1500        0      0      0 0             0      0      0      0 BMU
```

### 3.10．history命令

`history`命令用于显示执行过的命令历史，语法格式为“`history [-c]`”。

`history`命令应该是运维人员最喜欢的命令。执行`history`命令能显示出当前用户在本地计算机中执行过的最近1000条命令记录。如果觉得1000不够用，可以自定义`/etc/profile`文件中的`HISTSIZE`变量值。在使用`history`命令时，可以使用`-c`参数清空所有的命令历史记录。还可以使用“`!编码数字`”的方式来重复执行某一次的命令。总之，`history`命令有很多有趣的玩法等待您去开发。

```bash
[root@linuxprobe ~]# history
1 ifconfig
2 uname -a
3 cat /etc/redhat-release
4 uptime
5 free -h
6 who
7 last
8 ping -c 192.168.10.10
9 ping -c 192.168.10.20
10 tracepath www.linuxprobe.com
11 netstat -a
12 netstat -i
13 history
[root@linuxprobe ~]# !3
cat /etc/redhat-release
Red Hat Enterprise Linux release 8.0 (Ootpa)
```

历史命令会被保存到用户家目录中的`.bash_history`文件中。Linux系统中以点（.）开头的文件均代表隐藏文件，这些文件大多数为系统服务文件，可以用`cat`命令查看其文件内容：

```bash
[root@linuxprobe ~]# cat ~/.bash_history
```

要清空当前用户在本机上执行的Linux命令历史记录信息，可执行如下命令：

```bash
[root@linuxprobe ~]# history -c
```

### 3.11．sosreport命令

`sosreport`命令用于收集系统配置及架构信息并输出诊断文档，输入该命令后按回车键执行即可。

当Linux系统出现故障需要联系技术支持人员时，大多数时候都要先使用这个命令来简单收集系统的运行状态和服务配置信息，以便让技术支持人员能够远程解决一些小问题，抑或让他们能提前了解某些复杂问题。在下面的输出信息中，加粗的部分是收集好的资料压缩文件以及校验码，将其发送给技术支持人员即可：

```bash
[root@linuxprobe ~]# sosreport
sosreport (version 3.6)
This command will collect diagnostic and configuration information from
this Red Hat Enterprise Linux system and installed applications.

An archive containing the collected information will be generated in
/var/tmp/sos.9_i0glu8 and may be provided to a Red Hat support
representative.

Any information provided to Red Hat will be treated in accordance with
the published support policies at:
https://access.redhat.com/support/
The generated archive may contain data considered sensitive and its
content should be reviewed by the originating organization before being
passed to any third party.

No changes will be made to system configuration.
Press ENTER to continue, or CTRL-C to quit.
此处按下回车键进行确认
Please enter the case id that you are generating this report for []:此处按下回车键进行确认
Setting up archive ...
Setting up plugins ...
Running plugins. Please wait ...
………………省略部分输出信息………………
Finished running plugins 
Creating compressed archive...

Your sosreport has been generated and saved in:
/var/tmp/sosreport-linuxprobe.com-2021-05-18-jnkaspu.tar.xz

The checksum is: 9fbecbd167b7e5836db1ff8f068c4db3
Please send this file to your support representative.
```

## 4、查找定位文件命令

工作目录指的是用户当前在系统中所处的位置。由于工作目录会牵涉系统存储结构相关的知识，因此第6章将详细讲解这部分内容。读者只需简单了解一下这里的操作实验即可，如果不能完全掌握也没有关系，毕竟Linux系统的知识体系太过庞大，每一位初学人员都需要经历这么一段时期。

### 4.1．pwd命令

`pwd`命令用于显示用户当前所处的工作目录，英文全称为“print working directory”，输入该命令后按回车键执行即可。

使用`pwd`命令查看当前所处的工作目录：

```bash
[root@linuxprobe etc]# pwd
/etc
```

### 4.2．cd命令

`cd`命令用于切换当前的工作路径，英文全称为“change directory”，语法格式为“`cd [参数] [目录]`”。

这个命令应该是最常用的一个Linux命令了。可以通过`cd`命令迅速、灵活地切换到不同的工作目录。除了常见的切换目录方式，还可以使用“`cd -`”命令返回到上一次所处的目录，使用“`cd ..`”命令进入上级目录，以及使用“`cd ~`”命令切换到当前用户的家目录，抑或使用“`cd ~username`”命令切换到其他用户的家目录（就像在游戏中使用了“回城”技能一样）。例如，使用下述的`cd`命令切换进`/etc`目录中：

```bash
[root@linuxprobe ~]# cd /etc
```

同样的道理，可使用下述命令切换到`/bin`目录中：

```bash
[root@linuxprobe etc]# cd /bin
```

此时，要返回到上一次的目录（即`/etc`目录），可执行如下命令：

```bash
[root@linuxprobe bin]# cd -
/etc
[root@linuxprobe etc]#
```

还可以通过下面的命令快速切换到用户的家目录：

```bash
[root@linuxprobe etc]# cd ~
[root@linuxprobe ~]#
```

> 随着切换目录的操作，命令提示符也在发生变化，例如`[root@linuxprobe etc]#`就是在告诉我们当前处于/etc中。

### 4.3．ls命令

`ls`命令用于显示目录中的文件信息，英文全称为“list”，语法格式为“`ls [参数] [文件名称]`”。

所处的工作目录不同，当前工作目录下能看到的文件肯定也不同。使用`ls`命令的`-a`参数可以看到全部文件（包括隐藏文件），使用-l参数可以查看文件的属性、大小等详细信息。将这两个参数整合之后，再执行ls命令即可查看当前目录中的所有文件并输出这些文件的属性信息：

```bash
[root@linuxprobe ~]# ls -al
total 48
dr-xr-x---. 15 root root 4096 Jul 24 06:33 .
dr-xr-xr-x. 17 root root  224 Jul 21 05:04 ..
-rw-------.  1 root root 1407 Jul 21 05:09 anaconda-ks.cfg
-rw-------.  1 root root  335 Jul 24 06:33 .bash_history
-rw-r--r--.  1 root root   18 Aug 13  2018 .bash_logout
-rw-r--r--.  1 root root  176 Aug 13  2018 .bash_profile
-rw-r--r--.  1 root root  176 Aug 13  2018 .bashrc
drwx------. 10 root root  230 Jul 21 05:19 .cache
drwx------. 11 root root  215 Jul 24 06:27 .config
-rw-r--r--.  1 root root  100 Aug 13  2018 .cshrc
drwx------.  3 root root   25 Jul 21 05:16 .dbus
drwxr-xr-x.  2 root root    6 Jul 21 05:19 Desktop
drwxr-xr-x.  2 root root    6 Jul 21 05:19 Documents
drwxr-xr-x.  2 root root    6 Jul 21 05:19 Downloads
-rw-------.  1 root root   16 Jul 21 05:19 .esd_auth
-rw-------.  1 root root  620 Jul 24 06:26 .ICEauthority
-rw-r--r--.  1 root root 1562 Jul 21 05:18 initial-setup-ks.cfg
drwx------.  3 root root   19 Jul 21 05:19 .local
drwxr-xr-x.  2 root root    6 Jul 21 05:19 Music
drwxr-xr-x.  2 root root    6 Jul 21 05:19 Pictures
drwxr-----.  3 root root   19 Jul 21 05:19 .pki
drwxr-xr-x.  2 root root    6 Jul 21 05:19 Public
-rw-r--r--.  1 root root  129 Aug 13  2018 .tcshrc
drwxr-xr-x.  2 root root    6 Jul 21 05:19 Templates
drwxr-xr-x.  2 root root    6 Jul 21 05:19 Videos
-rw-------.  1 root root 3235 Jul 24 06:32 .viminfo
```

如果想要查看目录属性信息，则需要额外添加一个`-d`参数。例如，可使用如下命令查看`/etc`目录的权限与属性信息：

```bash
[root@linuxprobe ~]# ls -ld /etc
drwxr-xr-x. 132 root root 8192 Jul 10 10:48 /etc
```

### 4.4．tree命令

`tree`命令用于以树状图的形式列出目录内容及结构，输入该命令后按回车键执行即可。

虽然ls命令可以很便捷地查看目录内有哪些文件，但无法直观地获取到目录内文件的层次结构。比如，假如目录A中有个B，B中又有个C，那么ls命令就只能看到最外面的A目录，显然有些时候这不太够用。`tree`命令则能够以树状图的形式列出目录内所有文件的结构。

我们来对比一下两者的区别。

使用`ls`命令查看目录内的文件：

```bash
[root@linuxprobe ~]# ls
A                Desktop    Downloads             Music     Public     Videos
anaconda-ks.cfg  Documents  initial-setup-ks.cfg  Pictures  Templates
```

使用`tree`命令查看目录内文件名称以及结构：

```bash
[root@linuxprobe ~]# tree
.
├── A
│   └── B
│       └── C
├── anaconda-ks.cfg
├── Desktop
├── Documents
├── Downloads
├── initial-setup-ks.cfg
├── Music
├── Pictures
├── Public
├── Templates
└── Videos
```

### 4.5．find命令

`find`命令用于按照指定条件来查找文件所对应的位置，语法格式为“`find [查找范围] 寻找条件`”。

本书中会多次提到“Linux系统中的一切都是文件”，接下来就要见证这句话的分量了。在Linux系统中，搜索工作一般都是通过`find`命令来完成的，它可以使用不同的文件特性作为寻找条件（如文件名、大小、修改时间、权限等信息），一旦匹配成功则默认将信息显示到屏幕上。find命令的参数以及作用如下表所示。

`find`命令中的参数以及作用

| 参数              | 作用                                                         |
| ----------------- | ------------------------------------------------------------ |
| -name             | 匹配名称                                                     |
| -perm             | 匹配权限（mode为完全匹配，-mode为包含即可）                  |
| -user             | 匹配所有者                                                   |
| -group            | 匹配所有组                                                   |
| -mtime -n +n      | 匹配修改内容的时间（-n指n天以内，+n指n天以前）               |
| -atime -n +n      | 匹配访问文件的时间（-n指n天以内，+n指n天以前）               |
| -ctime -n +n      | 匹配修改文件权限的时间（-n指n天以内，+n指n天以前）           |
| -nouser           | 匹配无所有者的文件                                           |
| -nogroup          | 匹配无所有组的文件                                           |
| -newer f1 !f2     | 匹配比文件f1新但比f2旧的文件                                 |
| -type b/d/c/p/l/f | 匹配文件类型（后面的字母依次表示块设备、目录、字符设备、管道、链接文件、文本文件） |
| -size             | 匹配文件的大小（+50KB为查找超过50KB的文件，而-50KB为查找小于50KB的文件） |
| -prune            | 忽略某个目录                                                 |
| `-exec …… {}\;`   | 后面可跟用于进一步处理搜索结果的命令（下文会有演示）         |



这里需要重点讲解`-exec`参数的重要作用。这个参数用于把`find`命令搜索到的结果交由紧随其后的命令作进一步处理。它十分类似于第3章将要讲解的管道符技术，并且由于`find`命令对参数有特殊要求，因此虽然`exec`是长格式形式，但它的前面依然只需要一个减号（-）。

根据文件系统层次标准（Filesystem Hierarchy Standard）协议，Linux系统中的配置文件会保存到/etc目录中（详见第6章）。如果要想获取该目录中所有以host开头的文件列表，可以执行如下命令：

```bash
[root@linuxprobe ~]# find /etc -name "host*" -print
/etc/host.conf
/etc/hosts
/etc/hosts.allow
/etc/hosts.deny
/etc/avahi/hosts
/etc/hostname
```

如果要在整个系统中搜索权限中包括SUID权限的所有文件（详见第5章），只需使用-4000即可：

```bash
[root@linuxprobe ~]# find / -perm -4000 -print
/usr/bin/fusermount
/usr/bin/chage
/usr/bin/gpasswd
/usr/bin/newgrp
/usr/bin/umount
/usr/bin/mount
/usr/bin/su
/usr/bin/pkexec
/usr/bin/crontab
/usr/bin/passwd
………………省略部分输出信息………………
```

> 进阶实验：
>
> 在整个文件系统中找出所有归属于`linuxprobe`用户的文件并复制到`/root/findresults`目录中。
> 该实验的重点是`“-exec {} \;`”参数，其中的`{}`表示`find`命令搜索出的每一个文件，并且命令的结尾必须是“`\;`”。完成该实验的具体命令如下：
>
> ```bash
> [root@linuxprobe ~]# find / -user linuxprobe -exec cp -a {} /root/findresults/ \;
> ```

### 4.6．locate命令

`locate`命令用于按照名称快速搜索文件所对应的位置，语法格式为“`locate 文件名称`”。

使用`find`命令进行全盘搜索虽然更准确，但是效率有点低。如果仅仅是想找一些常见的且又知道大概名称的文件，不如试试`locate`命令。在使用`locate`命令时，先使用`updatedb`命令生成一个索引库文件，这个库文件的名字是`/var/lib/mlocate/mlocate.db`，后续在使用`locate`命令搜索文件时就是在该库中进行查找操作，速度会快很多。

第一次使用`locate`命令之前，记得先执行`updatedb`命令来生成索引数据库，然后再进行查找：

```bash
[root@linuxprobe ~]# updatedb 
[root@linuxprobe ~]# ls -l /var/lib/mlocate/mlocate.db
-rw-r-----. 1 root slocate 2945917 Sep 13 17:54 /var/lib/mlocate/mlocate.db
```

使用`locate`命令搜索出所有包含“`whereis`”名称的文件所在的位置：

```bash
[root@linuxprobe ~]# locate whereis
/usr/bin/whereis
/usr/share/bash-completion/completions/whereis
/usr/share/man/man1/whereis.1.gz
```

### 4.7．whereis命令

`whereis`命令用于按照名称快速搜索二进制程序（命令）、源代码以及帮助文件所对应的位置，语法格式为“`whereis 命令名称`”。

简单来说，`whereis`命令也是基于`updatedb`命令所生成的索引库文件进行搜索，它与`locate`命令的区别是不关心那些相同名称的文件，仅仅是快速找到对应的命令文件及其帮助文件所在的位置。

下面使用`whereis`命令分别查找出`ls`和`pwd`命令所在的位置：

```
[root@linuxprobe ~]# whereis ls
ls: /usr/bin/ls /usr/share/man/man1/ls.1.gz /usr/share/man/man1p/ls.1p.gz
[root@linuxprobe ~]# whereis pwd
pwd: /usr/bin/pwd /usr/share/man/man1/pwd.1.gz /usr/share/man/man1p/pwd.1p.gz
```

### 4.8．which命令

`which`命令用于按照指定名称快速搜索二进制程序（命令）所对应的位置，语法格式为“`which 命令名称`”。

`which`命令是在`PATH`变量所指定的路径中，按照指定条件搜索命令所在的路径。也就是说，如果我们既不关心同名文件（`find`与`locate`），也不关心命令所对应的源代码和帮助文件（`whereis`），仅仅是想找到命令本身所在的路径，那么这个`which`命令就太合适了。下面查找一下`locate`和`whereis`命令所对应的路径：

```
[root@linuxprobe ~]# which locate
/usr/bin/locate
[root@linuxprobe ~]# which whereis
/usr/bin/whereis
```

## 5、文本文件编辑命令

在Linux系统中，一切都是文件，对服务程序进行配置自然也就是编辑程序的配置文件。如果不能熟练地查阅系统或服务的配置文件，那以后工作时可就真的要尴尬了。本节将讲解几条用于查看文本文件内容的命令。至于相对比较复杂的文本编辑器工具，将在第4章与Shell脚本一起讲解。

### 5.1．cat命令

`cat`命令用于查看纯文本文件（内容较少的），英文全称为“concatenate”，语法格式为“`cat [参数] 文件名称`”。

Linux系统中有多个用于查看文本内容的命令，每个命令都有自己的特点，比如这个`cat`命令就是用于查看**内容较少的纯文本文件**。`cat`这个命令也很好记，因为cat在英语中是“猫”的意思，小猫咪是不是给您一种娇小、可爱的感觉呢？

如果在查看文本内容时还想顺便显示行号的话，不妨在`cat`命令后面追加一个`-n`参数：

```bash
[root@linuxprobe ~]# cat -n initial-setup-ks.cfg 
     1	#version=RHEL8
     2	# X Window System configuration information
     3	xconfig  --startxonboot
     4	# License agreement
     5	eula --agreed
     6	# Use graphical install
     7	graphical
     8	# Network information
     9	network  --bootproto=dhcp --device=ens160 --onboot=off --ipv6=auto --no-activate
    10	network  --bootproto=dhcp --hostname=localhost.localdomain
    11	repo --name="AppStream" --baseurl=file:///run/install/repo/AppStream
    12	ignoredisk --only-use=sda
    13	# Use CDROM installation media
    14	cdrom
    15	# Run the Setup Agent on first boot
    16	firstboot --enable
    17	# System services
………………省略部分输出信息………………
```

### 5.2．more命令

`more`命令用于查看纯文本文件（内容较多的），语法格式为“`more [参数] 文件名称`”。

如果需要阅读长篇小说或者非常长的配置文件，那么“小猫咪”可就真的不适合了。因为一旦使用`cat`命令阅读长篇的文本内容，信息就会在屏幕上快速翻滚，导致自己还没有来得及看到，内容就已经翻篇了。因此对于长篇的文本内容，推荐使用`more`命令来查看。`more`命令会在最下面使用百分比的形式来提示您已经阅读了多少内容；还可以使用`空格键`或`回车键`向下翻页：

```bash
[root@linuxprobe ~]# more initial-setup-ks.cfg 
#version=RHEL8
# X Window System configuration information
xconfig  --startxonboot
# License agreement
eula --agreed
# Use graphical install
graphical
# Network information
network  --bootproto=dhcp --device=ens160 --onboot=off --ipv6=auto --no-activate
network  --bootproto=dhcp --hostname=localhost.localdomain
repo --name="AppStream" --baseurl=file:///run/install/repo/AppStream
ignoredisk --only-use=sda
# Use CDROM installation media
cdrom
# Run the Setup Agent on first boot
firstboot --enable
# System services
services --disabled="chronyd"
# Keyboard layouts
keyboard --vckeymap=us --xlayouts='us'
# System language
lang en_US.UTF-8
--More--(41%)
```

### 5.3．head命令

`head`命令用于查看纯文本文件的前*N*行，语法格式为“`head [参数] 文件名称`”。

在阅读文本内容时，谁也难以保证会按照从头到尾的顺序往下看完整个文件。如果只想查看文本中前10行的内容，该怎么办呢？`head`命令就能派上用场了：

```bash
[root@linuxprobe ~]# head -n 10 initial-setup-ks.cfg 
#version=RHEL8
# X Window System configuration information
xconfig --startxonboot
# License agreement
eula --agreed
# Use graphical install
graphical
# Network information
network --bootproto=dhcp --device=ens160 --onboot=off --ipv6=auto --no-activate
network --bootproto=dhcp --hostname=localhost.localdomain
```

### 5.4．tail命令

`tail`命令用于查看纯文本文件的后*N*行或持续刷新文件的最新内容，语法格式为“`tail [参数] 文件名称`”。

我们可能还会遇到另外一种情况，比如需要查看文本内容的最后10行，这时就需要用到`tail`命令了。`tail`命令的操作方法与`head`命令非常相似，只需要执行“`tail -n 10文件名称`”命令就可以达到这样的效果：

```bash
[root@linuxprobe ~]# tail -n 10 initial-setup-ks.cfg 
%addon com_redhat_subscription_manager 
%end
%addon ADDON_placeholder --disable --reserve-mb=auto
%end

%anaconda
pwpolicy root --minlen=6 --minquality=1 --notstrict --nochanges --notempty
pwpolicy user --minlen=6 --minquality=1 --notstrict --nochanges --emptyok
pwpolicy luks --minlen=6 --minquality=1 --notstrict --nochanges --notempty
%end
```

`tail`命令最强悍的功能是能够持续刷新一个文件的内容，当想要实时查看最新的日志文件时，这特别有用，此时的命令格式为“`tail -f文件名称`”：

```bash
[root@linuxprobe ~]# tail -f /var/log/messages
Sep 15 00:14:01 localhost rsyslogd[1392]: imjournal: sd_journal_get_cursor() failed: Cannot assign requested address [v8.37.0-9.el8]
Sep 15 00:14:01 localhost rsyslogd[1392]: imjournal: journal reloaded... [v8.37.0-9.el8 try http://www.rsyslog.com/e/0 ]
Sep 15 00:14:01 localhost systemd[1]: Started update of the root trust anchor for DNSSEC validation in unbound.
Sep 15 00:14:01 localhost sssd[kcm][2764]: Shutting down
Sep 15 00:14:06 localhost systemd[1]: Starting SSSD Kerberos Cache Manager...
Sep 15 00:14:06 localhost systemd[1]: Started SSSD Kerberos Cache Manager.
Sep 15 00:14:06 localhost sssd[kcm][3989]: Starting up
Sep 15 00:14:26 localhost NetworkManager[1203]: <info> [1600100066.4675] audit: op="sleep-control" arg="off" pid=3990 uid=0 result="fail" reason="Already awake"
Sep 15 00:19:04 localhost org.gnome.Shell.desktop[2600]: Window manager warning: last_user_time (2361102) is greater than comparison timestamp (2361091). This most likely represents a buggy client sending inaccurate timestamps in messages such as _NET_ACTIVE_WINDOW. Trying to work around...
Sep 15 00:19:04 localhost org.gnome.Shell.desktop[2600]: Window manager warning: W14 (root@local) appears to be one of the offending windows with a timestamp of 2361102. Working around...
```

### 5.5．tr命令

`tr`命令用于替换文本内容中的字符，英文全称为“transform”，语法格式为“`tr [原始字符] [目标字符]`”。

在很多时候，我们想要快速地替换文本中的一些词汇，又或者想把整个文本内容都进行替换。如果进行手工替换，难免工作量太大，尤其是需要处理大批量的内容时，进行手工替换更是不现实。这时，就可以先使用`cat`命令读取待处理的文本，然后通过管道符（详见第3章）把这些文本内容传递给`tr`命令进行替换操作即可。例如，把某个文本内容中的英文全部替换为大写：

```bash
[root@linuxprobe ~]# cat anaconda-ks.cfg | tr [a-z] [A-Z]
#VERSION=RHEL8
IGNOREDISK --ONLY-USE=SDA
AUTOPART --TYPE=LVM
# PARTITION CLEARING INFORMATION
CLEARPART --ALL --INITLABEL --DRIVES=SDA
# USE GRAPHICAL INSTALL
GRAPHICAL
REPO --NAME="APPSTREAM" --BASEURL=FILE:///RUN/INSTALL/REPO/APPSTREAM
# USE CDROM INSTALLATION MEDIA
CDROM
# KEYBOARD LAYOUTS
KEYBOARD --VCKEYMAP=US --XLAYOUTS='US'
# SYSTEM LANGUAGE
LANG EN_US.UTF-8
# NETWORK INFORMATION
NETWORK --BOOTPROTO=DHCP --DEVICE=ENS160 --ONBOOT=OFF --IPV6=AUTO --NO-ACTIVATE
NETWORK --HOSTNAME=LOCALHOST.LOCALDOMAIN
# ROOT PASSWORD
ROOTPW --ISCRYPTED $6$TTBUW5DKOPYQQ.VI$RMK9FCGHOJOQ2QAPRURTQM.QOK2NN3YFN/I4F/FALVGGGND9XOIYFBRXDN16WWIZIASJ0/CR06U66IPEOGLPJ.
# X WINDOW SYSTEM CONFIGURATION INFORMATION
XCONFIG --STARTXONBOOT
# RUN THE SETUP AGENT ON FIRST BOOT
FIRSTBOOT --ENABLE
# SYSTEM SERVICES
SERVICES --DISABLED="CHRONYD"
# SYSTEM TIMEZONE
TIMEZONE ASIA/SHANGHAI --ISUTC --NONTP
………………省略部分输出信息………………
```

### 5.6．wc命令

`wc`命令用于统计指定文本文件的行数、字数或字节数，英文全称为“word counts”，语法格式为“`wc [参数] 文件名称`”。

每次我在课堂上讲到这个命令时，总有同学会联想到一种公共设施，其实这两者毫无关联。`wc`命令用于统计文本的行数、字数、字节数等。如果为了方便自己记住这个命令的作用，也可以联想到上厕所时好无聊，无聊到数完了手中的如厕读物上有多少行字。

`wc`命令中的参数以及作用

| 参数 | 作用         |
| ---- | ------------ |
| -l   | 只显示行数   |
| -w   | 只显示单词数 |
| -c   | 只显示字节数 |



在Linux系统中，`/etc/passwd`是用于保存所有用户信息的文件，要统计当前系统中有多少个用户，可以使用下面的命令来进行查询，是不是很神奇：

```bash
[root@linuxprobe ~]# wc -l /etc/passwd
45 /etc/passwd
```

### 5.7．stat命令

`stat`命令用于查看文件的具体存储细节和时间等信息，英文全称为“status”，语法格式为“`stat 文件名称`”。

大家都知道，文件有一个修改时间。其实，除了修改时间之外，Linux系统中的文件包含3种时间状态，分别是Access Time（内容最后一次被访问的时间，简称为Atime），Modify Time（内容最后一次被修改的时间，简称为Mtime）以及Change Time（文件属性最后一次被修改的时间，简称为Ctime）。

下面使用state命令查看文件的这3种时间状态信息：

```bash
[root@linuxprobe ~]# stat anaconda-ks.cfg
  File: anaconda-ks.cfg
  Size: 1407      	Blocks: 8          IO Block: 4096   regular file
Device: fd00h/64768d	Inode: 35321091    Links: 1
Access: (0600/-rw-------)  Uid: (    0/    root)   Gid: (    0/    root)
Context: system_u:object_r:admin_home_t:s0
Access: 2020-07-21 05:16:52.347279499 +0800
Modify: 2020-07-21 05:09:16.421009316 +0800
Change: 2020-07-21 05:09:16.421009316 +0800
 Birth: -
```

### 5.8．grep命令

`grep`命令用于按行提取文本内容，语法格式为“`grep [参数] 文件名称`”。

`grep`命令是用途最广泛的文本搜索匹配工具。它虽然有很多参数，但是大多数基本上都用不到。刘遄老师在总结了10多年的运维工作和培训教学的经验后，提出的本书的写作理念“去掉不实用的内容”绝对不是信口开河。如果一名IT培训讲师的水平只能停留在“技术的搬运工”层面，而不能对优质技术知识进行提炼总结，对他的学生来讲绝非好事。有鉴于此，我们在这里只讲grep命令两个最常用的参数：

> `-n`参数用来显示搜索到的信息的行号；
>
> `-v`参数用于反选信息（即没有包含关键词的所有信息行）。

这两个参数几乎能完成您日后80%的工作需要，至于其他上百个参数，即使以后在工作期间遇到了，再使用man grep命令查询也来得及。

grep命令中的参数及其作用

| 参数 | 作用                                           |
| ---- | ---------------------------------------------- |
| -b   | 将可执行文件(binary)当作文本文件（text）来搜索 |
| -c   | 仅显示找到的行数                               |
| -i   | 忽略大小写                                     |
| -n   | 显示行号                                       |
| -v   | 反向选择——仅列出没有“关键词”的行               |

在Linux系统中，`/etc/passwd`文件保存着所有的用户信息，而一旦用户的登录终端被设置成`/sbin/nologin`，则不再允许登录系统，因此可以使用`grep`命令查找出当前系统中不允许登录系统的所有用户的信息：

```bash
[root@linuxprobe ~]# grep /sbin/nologin /etc/passwd
bin:x:1:1:bin:/bin:/sbin/nologin
daemon:x:2:2:daemon:/sbin:/sbin/nologin
adm:x:3:4:adm:/var/adm:/sbin/nologin
lp:x:4:7:lp:/var/spool/lpd:/sbin/nologin
mail:x:8:12:mail:/var/spool/mail:/sbin/nologin
operator:x:11:0:operator:/root:/sbin/nologin
games:x:12:100:games:/usr/games:/sbin/nologin
………………省略部分输出过程信息………………
```

### 5.9．cut命令

`cut`命令用于按“列”提取文本内容，语法格式为“`cut [参数] 文件名称`”。

系统文件在保存用户数据信息时，每一项值之间是采用冒号来间隔的，先查看一下：

```bash
[root@linuxprobe ~]# head -n 2 /etc/passwd 
root:x:0:0:root:/root:/bin/bash 
bin:x:1:1:bin:/bin:/sbin/nologin
```

一般而言，按基于“行”的方式来提取数据是比较简单的，只需要设置好要搜索的关键词即可。但是如果按“列”搜索，不仅要使用`-f`参数设置需要查看的列数，还需要使用`-d`参数来设置间隔符号。

接下来使用下述命令尝试提取出passwd文件中的用户名信息，即提取以冒号（`：`）为间隔符号的第一列内容：

```bash
[root@linuxprobe ~]# cut -d : -f 1 /etc/passwd
root
bin
daemon
adm
lp
sync
shutdown
halt
mail
operator
games
ftp
nobody
dbus
………………省略部分输出信息………………
```

### 5.10．diff命令

`diff`命令用于比较多个文件之间内容的差异，英文全称为“different”，语法格式为“`diff [参数] 文件名称A 文件名称B`”。

在使用`diff`命令时，不仅可以使用`--brief`参数来确认两个文件是否相同，还可以使用`-c`参数来详细比较出多个文件的差异之处。这绝对是判断文件是否被篡改的有力神器。例如，先使用`cat`命令分别查看`diff_A.txt`和`diff_B.txt`文件的内容，然后进行比较：

```bash
[root@linuxprobe ~]# cat diff_A.txt
Welcome to linuxprobe.com
Red Hat certified
Free Linux Lessons
Professional guidance
Linux Course
[root@linuxprobe ~]# cat diff_B.txt
Welcome tooo linuxprobe.com

Red Hat certified
Free Linux LeSSonS
////////.....////////
Professional guidance
Linux Course
```

接下来使用`diff --brief`命令显示比较后的结果，判断文件是否相同：

```bash
[root@linuxprobe ~]# diff --brief diff_A.txt diff_B.txt
Files diff_A.txt and diff_B.txt differ
```

最后使用带有`-c`参数的`diff`命令来描述文件内容具体的不同：

```bash
[root@linuxprobe ~]# diff -c diff_A.txt diff_B.txt
*** diff_A.txt 2020-08-30 18:07:45.230864626 +0800
--- diff_B.txt 2020-08-30 18:08:52.203860389 +0800
***************
*** 1,5 ****
! Welcome to linuxprobe.com
Red Hat certified
! Free Linux Lessons
Professional guidance
Linux Course
--- 1,7 ----
! Welcome tooo linuxprobe.com
!
Red Hat certified
! Free Linux LeSSonS
! ////////.....////////
Professional guidance
Linux Course
```

### 5.11．uniq命令

`uniq`命令用于去除文本中连续的重复行，英文全称为“unique”，语法格式为“`uniq [参数] 文件名称`”。

由`uniq`命令的英文全称unique（独特的，唯一的）可知，该命令的作用是用来去除文本文件中连续的重复行，中间不能夹杂其他文本行（非相邻的默认不会去重）—去除了重复的，保留的都是唯一的，自然也就是“独特的”“唯一的”了。

我们使用`uniq`命令对两个文本内容进行操作，区别一目了然：

```bash
[root@linuxprobe ~]# cat uniq.txt 
Welcome to linuxprobe.com
Welcome to linuxprobe.com
Welcome to linuxprobe.com
Welcome to linuxprobe.com
Red Hat certified
Free Linux Lessons
Professional guidance
Linux Course
[root@linuxprobe ~]# uniq uniq.txt 
Welcome to linuxprobe.com
Red Hat certified
Free Linux Lessons
Professional guidance
Linux Course
```

### 5.12．sort命令

`sort`命令用于对文本内容进行再排序，语法格式为“`sort [参数] 文件名称`”。

有时文本中的内容顺序不正确，一行行地手动修改实在太麻烦了。此时使用`sort`命令就再合适不过了，它能够对文本内容进行再次排序。这个命令千万不能只讲理论，一定要借助于实战让大家一看就懂。

`sort`命令中的参数及其作用

| 参数 | 作用           |
| ---- | -------------- |
| -f   | 忽略大小写     |
| -b   | 忽略缩进与空格 |
| -n   | 以数值型排序   |
| -r   | 反向排序       |
| -u   | 去除重复行     |
| -t   | 指定间隔符     |
| -k   | 设置字段范围   |



首先，在执行`sort`命令后默认会按照字母顺序进行排序，非常方便：

```bash
[root@linuxprobe ~]# cat fruit.txt 
banana
pear
apple
orange
raspaberry
[root@linuxprobe ~]# sort fruit.txt 
apple
banana
orange
pear
raspaberry
```

此外，与`uniq`命令不同，`sort`命令是无论内容行之间是否夹杂有其他内容，只要有两个一模一样的内容行，立马就可以使用`-u`参数进行去重操作：

```bash
[root@linuxprobe ~]# cat sort.txt 
Welcome to linuxprobe.com
Red Hat certified
Welcome to linuxprobe.com
Free Linux Lessons
Linux Course
[root@linuxprobe ~]# sort -u sort.txt 
Free Linux Lessons
Linux Course
Red Hat certified
Welcome to linuxprobe.com
```

想对数字进行排序？一点问题都没有，而且完全不用担心出现1大于20这种问题（因为有些命令只比较数字的第一位，忽略了十、百、千的位）：

```bash
[root@linuxprobe ~]# cat number.txt 
45
12
3
98
82
67
24
56
9
[root@linuxprobe ~]# sort -n number.txt 
3
9
12
24
45
56
67
82
98
```

最后，我们挑战一个“高难度”的小实验。下面的内容节选自`/etc/passwd`文件中的前5个字段，并且进行了混乱排序。

```bash
[root@linuxprobe ~]# cat user.txt 
tss:x:59:59:Account used by the trousers package to sandbox the tcsd daemon
polkitd:x:998:996:User for polkitd
geoclue:x:997:995:User for geoclue
rtkit:x:172:172:RealtimeKit
pulse:x:171:171:PulseAudio System Daemon
qemu:x:107:107:qemu user
usbmuxd:x:113:113:usbmuxd user
unbound:x:996:991:Unbound DNS resolver
rpc:x:32:32:Rpcbind Daemon
gluster:x:995:990:GlusterFS daemons
```

不难看出，上面其实是5个字段，各个字段之间是用了冒号进行间隔，如果想以第3个字段中的数字作为排序依据，那么可以用`-t`参数指定间隔符，用`-k`参数指定第几列，用-n参数进行数字排序来搞定：

```bash
[root@linuxprobe ~]# sort -t : -k 3 -n user.txt 
rpc:x:32:32:Rpcbind Daemon
tss:x:59:59:Account used by the trousers package to sandbox the tcsd daemon
qemu:x:107:107:qemu user
usbmuxd:x:113:113:usbmuxd user
pulse:x:171:171:PulseAudio System Daemon
rtkit:x:172:172:RealtimeKit
gluster:x:995:990:GlusterFS daemons
unbound:x:996:991:Unbound DNS resolver
geoclue:x:997:995:User for geoclue
polkitd:x:998:996:User for polkitd
```

## 6、 文件目录管理命令

目前为止，我们学习Linux命令的过程就像是在夯实地基，虽然表面上“高楼未起”，但其实大家的内功已经相当深厚了。有了上面的知识铺垫，我们将在本节介绍Linux系统日常运维工作中最常用的命令，实现对文件的创建、修改、复制、剪切、更名与删除等操作。

### 6.1．touch命令

`touch`命令用于创建空白文件或设置文件的时间，语法格式为“`touch [参数] 文件名称`”。

在创建空白的文本文件方面，这个`touch`命令相当简洁，简捷到没有必要铺开去讲。比如，touch linuxprobe命令可以创建出一个名为`linuxprobe`的空白文本文件。对`touch`命令来讲，有难度的操作主要是体现在设置文件内容的修改时间（Mtime）、文件权限或属性的更改时间（Ctime）与文件的访问时间（Atime）上面。

`touch`命令中的参数及其作用

| 参数 | 作用                      |
| ---- | ------------------------- |
| -a   | 仅修改“读取时间”（atime） |
| -m   | 仅修改“修改时间”（mtime） |
| -d   | 同时修改atime与mtime      |

接下来，先使用ls命令查看一个文件的修改时间，随后修改这个文件，最后再查看一下文件的修改时间，看是否发生了变化：

```bash
[root@linuxprobe ~]# ls -l anaconda-ks.cfg
-rw-------. 1 root root 1213 May  4 15:44 anaconda-ks.cfg
[root@linuxprobe ~]# echo "Visit the LinuxProbe.com to learn linux skills" >> anaconda-ks.cfg
[root@linuxprobe ~]# ls -l anaconda-ks.cfg
-rw-------. 1 root root 1260 Aug  2 01:26 anaconda-ks.cfg
```

如果不想让别人知道我们修改了它，那么这时就可以用`touch`命令把修改后的文件时间设置成修改之前的时间（很多黑客就是这样做的呢）：

```bash
[root@linuxprobe ~]# touch -d "2020-05-04 15:44" anaconda-ks.cfg 
[root@linuxprobe ~]# ls -l anaconda-ks.cfg 
-rw-------. 1 root root 1260 May  4 15:44 anaconda-ks.cfg
```

### 6.2．mkdir命令

`mkdir`命令用于创建空白的目录，英文全称为“make directory”，语法格式为“`mkdir [参数] 目录名称`”。

除了能创建单个空白目录外，`mkdir`命令还可以结合`-p`参数来递归创建出具有嵌套层叠关系的文件目录：

```bash
[root@linuxprobe ~]# mkdir linuxprobe
[root@linuxprobe ~]# cd linuxprobe
[root@linuxprobe linuxprobe]# mkdir -p a/b/c/d/e
[root@linuxprobe linuxprobe]# cd a
[root@linuxprobe a]# cd b
[root@linuxprobe b]#
```

### 6.3．cp命令

`cp`命令用于复制文件或目录，英文全称为“copy”，语法格式为“`cp [参数] 源文件名称 目标文件名称`”。

大家对文件复制操作应该不陌生，几乎每天都会使用到。在Linux系统中，复制操作具体分为3种情况：

> 如果目标文件是目录，则会把源文件复制到该目录中；
>
> 如果目标文件也是普通文件，则会询问是否要覆盖它；
>
> 如果目标文件不存在，则执行正常的复制操作。

复制命令基本不会出错，唯一需要记住的就是在复制目录时要加上`-r`参数。

`cp`命令中的参数及其作用

| 参数 | 作用                                         |
| ---- | -------------------------------------------- |
| -p   | 保留原始文件的属性                           |
| -d   | 若对象为“链接文件”，则保留该“链接文件”的属性 |
| -r   | 递归持续复制（用于目录）                     |
| -i   | 若目标文件存在则询问是否覆盖                 |
| -a   | 相当于-pdr（p、d、r为上述参数）              |

接下来，使用`touch`命令创建一个名为`install.log`的普通空白文件，然后将其复制为一份名为`x.log`的备份文件，最后再使用`ls`命令查看目录中的文件：

```bash
[root@linuxprobe ~]# touch install.log
[root@linuxprobe ~]# cp install.log x.log
[root@linuxprobe ~]# ls
install.log x.log
```

### 6.4．mv命令

`mv`命令用于剪切或重命名文件，英文全称为“move”，语法格式为“`mv [参数] 源文件名称 目标文件名称`”。

剪切操作不同于复制操作，因为它默认会把源文件删除，只保留剪切后的文件。如果在同一个目录中将某个文件剪切后还粘贴到当前目录下，其实也就是对该文件进行了重命名操作：

```bash
[root@linuxprobe ~]# mv x.log linux.log
[root@linuxprobe ~]# ls
install.log linux.log
```

### 6.5．rm命令

`rm`命令用于删除文件或目录，英文全称为“remove”，语法格式为“`rm [参数] 文件  名称`”。

在Linux系统中删除文件时，系统会默认向您询问是否要执行删除操作，如果不想总是看到这种反复的确认信息，可在`rm`命令后跟上`-f`参数来强制删除。另外，要想删除一个目录，需要在`rm`命令后面加一个`-r`参数才可以，否则删除不掉。

`rm`命令中的参数及其作用

| 参数 | 作用       |
| ---- | ---------- |
| -f   | 强制执行   |
| -i   | 删除前询问 |
| -r   | 删除目录   |
| -v   | 显示过程   |

下面尝试删除前面创建的`install.log`和`linux.log`文件，大家感受一下加与不加`-f`参数的区别：

```bash
[root@linuxprobe ~]# rm install.log
rm: remove regular empty file ‘install.log’? y
[root@linuxprobe ~]# rm -f linux.log
[root@linuxprobe ~]# ls
[root@linuxprobe ~]#
```

### 6.6．dd命令

`dd`命令用于按照指定大小和个数的数据块来复制文件或转换文件，语法格式为“`dd if=参数值of=参数值count=参数值bs=参数值`”。

`dd`命令是一个比较重要而且比较有特色的命令，它能够让用户按照指定大小和个数的数据块来复制文件的内容。当然，如果愿意的话，还可以在复制过程中转换其中的数据。Linux系统中有一个名为`/dev/zero`的设备文件，每次在课堂上解释它时都充满哲学理论的色彩。因为这个文件不会占用系统存储空间，但却可以提供无穷无尽的数据，因此常常使用它作为`dd`命令的输入文件，来生成一个指定大小的文件。

`dd`命令中的参数及其作用

| 参数  | 作用                 |
| ----- | -------------------- |
| if    | 输入的文件名称       |
| of    | 输出的文件名称       |
| bs    | 设置每个“块”的大小   |
| count | 设置要复制“块”的个数 |



例如，用`dd`命令从`/dev/zero`设备文件中取出一个大小为560MB的数据块，然后保存成名为560_file的文件。在理解了这个命令后，以后就能随意创建任意大小的文件了：

```bash
[root@linuxprobe ~]# dd if=/dev/zero of=560_file count=1 bs=560M
1+0 records in
1+0 records out
587202560 bytes (587 MB, 560 MiB) copied, 1.28667 s, 456 MB/s
```

`dd`命令的功能也绝不仅限于复制文件这么简单。如果想把光驱设备中的光盘制作成iso格式的镜像文件，在Windows系统中需要借助于第三方软件才能做到，但在Linux系统中可以直接使用`dd`命令来压制出光盘镜像文件，将它变成一个可立即使用的iso镜像：

```bash
[root@linuxprobe ~]# dd if=/dev/cdrom of=RHEL-server-8.0-x86_64-LinuxProbe.Com.iso
13873152+0 records in
13873152+0 records out
7103053824 bytes (7.1 GB, 6.6 GiB) copied, 27.8812 s, 255 MB/s
```

考虑到有些读者会纠结bs块大小与count块个数的关系，下面举一个吃货的例子进行解释。假设小明的饭量（即需求）是一个固定的值，用来盛饭的勺子的大小是bs块的大小，而用勺子盛饭的次数则是count块的个数。小明要想吃饱（满足需求），则需要在勺子大小（bs块大小）与用勺子盛饭的次数（count块个数）之间进行平衡。勺子越大，用勺子盛饭的次数就越少。由上可见，bs与count都是用来指定容量的大小，只要能满足需求，可随意组合搭配方式。

### 6.7．file命令

`file`命令用于查看文件的类型，语法格式为“`file 文件名称`”。

在Linux系统中，由于文本、目录、设备等所有这些一切都统称为文件，但是它们又不像Windows系统那样都有后缀，因此很难通过文件名一眼判断出具体的文件类型，这时就需要使用`file`命令来查看文件类型了。

```bash
[root@linuxprobe ~]# file anaconda-ks.cfg 
anaconda-ks.cfg: ASCII text
[root@linuxprobe ~]# file /dev/sda
/dev/sda: block special
```

> 在Windows系统中打开文件时，一般是通过用户双击鼠标完成的，系统会自行判断用户双击的文件是什么类型，因此需要有后缀进行区别。而Linux系统则是根据用户执行的命令来调用文件，例如执行cat命令查看文本，执行bash命令执行脚本等，所以也就不需要强制让用户给文件设置后缀了。

### 6.8．tar命令

`tar`命令用于对文件进行打包压缩或解压，语法格式为“`tar参数 文件名称`”。

在网络上，人们越来越倾向于传输压缩格式的文件，原因是压缩文件的体积小，在网速相同的情况下，体积越小则传输时间越短。在Linux系统中，主要使用的是.tar、.tar.gz或.tar.bz2格式，大家不用担心格式太多而记不住，其实这些格式大部分都是由`tar`命令生成的。

`tar`命令中的参数及其作用

| 参数 | 作用                   |
| ---- | ---------------------- |
| -c   | 创建压缩文件           |
| -x   | 解开压缩文件           |
| -t   | 查看压缩包内有哪些文件 |
| -z   | 用Gzip压缩或解压       |
| -j   | 用bzip2压缩或解压      |
| -v   | 显示压缩或解压的过程   |
| -f   | 目标文件名             |
| -p   | 保留原始的权限与属性   |
| -P   | 使用绝对路径来压缩     |
| -C   | 指定解压到的目录       |

- `-c`参数用于创建压缩文件，`-x`参数用于解压文件，因此这两个参数不能同时使用。
- `-z`参数指定使用`gzip`格式来压缩或解压文件，`-j`参数指定使用`bzip2`格式来压缩或解压文件。用户使用时则是根据文件的后缀来决定应使用何种格式的参数进行解压。

- 在执行某些压缩或解压操作时，可能需要花费数个小时，如果屏幕一直没有输出，您一方面不好判断打包的进度情况，另一方面也会怀疑电脑死机了，因此非常推荐使用`-v`参数向用户不断显示压缩或解压的过程。

- `-C`参数用于指定要解压到哪个指定的目录。
- `-f`参数特别重要，它必须放到参数的最后一位，代表要压缩或解压的软件包名称。

> 一般使用“`tar -czvf 压缩包名称.tar.gz 要打包的目录`”命令把指定的文件进行打包压缩；相应的解压命令为“`tar -xzvf 压缩包名称.tar.gz`”。下面我们逐个演示打包压缩与解压的操作，先使用`tar`命令把`/etc`目录通过`gzip`格式进行打包压缩，并把文件命名为`etc.tar.gz`：

```bash
[root@linuxprobe ~]# tar czvf etc.tar.gz /etc
tar: Removing leading `/' from member names
/etc/
/etc/fstab
/etc/crypttab
/etc/mtab
/etc/fonts/
/etc/fonts/conf.d/
/etc/fonts/conf.d/65-0-madan.conf
/etc/fonts/conf.d/59-liberation-sans.conf
/etc/fonts/conf.d/90-ttf-arphic-uming-embolden.conf
/etc/fonts/conf.d/59-liberation-mono.conf
/etc/fonts/conf.d/66-sil-nuosu.conf
………………省略部分压缩过程信息………………
```

接下来将打包后的压缩包文件指定解压到`/root/etc`目录中（先使用`mkdir`命令创建`/root/etc`目录）：

```bash
[root@linuxprobe ~]# mkdir /root/etc
[root@linuxprobe ~]# tar xzvf etc.tar.gz -C /root/etc
etc/
etc/fstab
etc/crypttab
etc/mtab
etc/fonts/
etc/fonts/conf.d/
etc/fonts/conf.d/65-0-madan.conf
etc/fonts/conf.d/59-liberation-sans.conf
etc/fonts/conf.d/90-ttf-arphic-uming-embolden.conf
etc/fonts/conf.d/59-liberation-mono.conf
etc/fonts/conf.d/66-sil-nuosu.conf
etc/fonts/conf.d/65-1-vlgothic-gothic.conf
etc/fonts/conf.d/65-0-lohit-bengali.conf
etc/fonts/conf.d/20-unhint-small-dejavu-sans.conf
………………省略部分解压过程信息………………
```

## 7、课后习题

1．在RHEL 8及众多的Linux系统中，最常使用的Shell终端是什么？

**答：**Bash（Bourne-Again SHell）解释器。

2．执行Linux系统命令时，添加参数的目的是什么？

**答：**为了让Linux系统命令能够更贴合用户的实际需求进行工作。

3．Linux系统命令、命令参数及命令对象之间，应该使用什么来间隔？

**答：**应该使用一个或多个空格进行间隔。

4．请写出用echo命令把SHELL变量值输出到屏幕终端的命令。

**答**：`echo $SHELL`。

5．简述Linux系统中5种进程的名称及含义。

**答：**在Linux系统中，有下面5种进程名称。

> **R****（运行）**：进程正在运行或在运行队列中等待。
>
> **S****（中断）**：进程处于休眠中，当某个条件形成后或者接收到信号时，则脱离该状态。
>
> **D****（不可中断）**：进程不响应系统异步信号，即便用kill命令也不能将其中断。
>
> **Z****（僵死）**：进程已经终止，但进程描述符依然存在, 直到父进程调用wait4()系统函数后将进程释放。
>
> **T****（停止）**：进程收到停止信号后停止运行。

6．请尝试使用Linux系统命令关闭PID为5529的服务进程。

**答：**执行kill 5529命令即可；若知道服务的名称，则可以使用killall命令进行关闭。

7．使用ifconfig命令查看网络状态信息时，需要重点查看的4项信息分别是什么？

**答：**这4项重要的信息分别是网卡名称、IP地址、网卡物理地址以及RX/TX的收发流量数据大小。

8．使用uptime命令查看系统负载时，对应的负载数值如果是0.91、0.56、0.32，那么最近15分钟内负载压力最大的是哪个时间段？

**答：**通过负载数值可以看出，最近1分钟内的负载压力是最大的。

9．使用history命令查看历史命令的执行记录时，命令前面的编码数字除了排序外还有什么用处？

**答：**还可以用“!编码数字”的命令格式重复执行某一次的命令记录，从而避免了重复输入较长命令的麻烦。

10．若想查看的文件具有较长的内容，那么使用cat、more、head、tail中的哪个命令最合适？

**答：**文件内容较长，使用more命令；反之使用cat命令。

11．在使用mkdir命令创建有嵌套关系的目录时，应该加上什么参数呢？

**答：**应该加上-p递归迭代参数，从而自动化地创建有嵌套关系的目录。

12．在使用rm命令删除文件或目录时，可使用哪个参数来避免二次确认呢？

**答：**可使用-f参数，这样即可无须二次确认。

13．若有一个名为backup.tar.gz的压缩包文件，那么解压的命令应该是什么？

**答：**应该用tar命令进行解压，执行tar -xzvf backup.tar.gz命令即可。

14．使用grep命令对某个文件进行关键词搜索时，若想要进行文件内容反选，应使用什么参数？

**答：**可使用-v参数来进行匹配内容的反向选择，即显示出不包含某个关键词的行。