# 08-使用Iptables与Firewalld防火墙

本章将分别使用`iptables`、`firewall-cmd`、`firewall-config`和`TCP Wrapper`等防火墙策略配置服务来完成数十个根据真实工作需求而设计的防火墙策略配置实验。

## 8.1 防火墙管理工具

众所周知，相较于企业内网，外部的公网环境更加恶劣，罪恶丛生。在公网与企业内网之间充当保护屏障的防火墙虽然有软件或硬件之分，但主要功能都是依据策略对穿越防火墙自身的流量进行过滤。就像家里安装的防盗门一样，目的是保护亲人和财产安全。防火墙策略可以基于流量的源目地址、端口号、协议、应用等信息来定制，然后防火墙使用预先定制的策略规则监控出入的流量，若流量与某一条策略规则相匹配，则执行相应的处理，反之则丢弃。这样一来，就能够保证仅有合法的流量在企业内网和外部公网之间流动了。

![第8章 使用Iptables与Firewalld防火墙第8章 使用Iptables与Firewalld防火墙](https://www.linuxprobe.com/wp-content/uploads/2020/05/%E9%98%B2%E7%81%AB%E5%A2%99%E4%BD%9C%E4%B8%BA%E5%85%AC%E7%BD%91%E4%B8%8E%E5%86%85%E7%BD%91%E4%B9%8B%E9%97%B4%E7%9A%84%E4%BF%9D%E6%8A%A4%E5%B1%8F%E9%9A%9C-2.jpg)

从RHEL 7系统开始，`firewalld`防火墙正式取代了`iptables`防火墙。对于接触Linux系统比较早或学习过RHEL 5/6系统的读者来说，当他们发现曾经掌握的知识在RHEL 7/8中不再适用，需要全新学习`firewalld`时，难免会有抵触心理。其实，`iptables`与`firewalld`都不是真正的防火墙，它们都只是用来定义防火墙策略的防火墙管理工具而已；或者说，它们只是一种服务。`iptables`服务会把配置好的防火墙策略交由内核层面的`netfilter`网络过滤器来处理，而`firewalld`服务则是把配置好的防火墙策略交由内核层面的`nftables`包过滤框架来处理。换句话说，当前在Linux系统中其实存在多个防火墙管理工具，旨在方便运维人员管理Linux系统中的防火墙策略，我们只需要配置妥当其中的一个就足够了。

虽然这些工具各有优劣，但它们在防火墙策略的配置思路上是保持一致的。大家甚至可以不用完全掌握本章介绍的内容，只要在这多个防火墙管理工具中任选一款并将其学透，就足以满足日常的工作需求了。

## 8.2 Iptables

在早期的Linux系统中，默认使用的是`iptables`防火墙管理服务来配置防火墙。尽管新型的`firewalld`防火墙管理服务已经被投入使用多年，但是大量的企业在生产环境中依然出于各种原因而继续使用`iptables`。考虑到`iptables`在当前生产环境中还具有顽强的生命力，以及为了使大家在求职面试过程中被问到`iptables`的相关知识时能胸有成竹，刘遄老师觉得还是有必要在本书中好好地讲解一下这项技术。更何况前文也提到，各个防火墙管理工具的配置思路是一致的，在掌握了`iptables`后再学习其他防火墙管理工具时，也有借鉴意义。

### 8.2.1 策略与规则链

防火墙会按照从上到下的顺序来读取配置的策略规则，在找到匹配项后就立即结束匹配工作并去执行匹配项中定义的行为（即放行或阻止）。如果在读取完所有的策略规则之后没有匹配项，就去执行默认的策略。一般而言，防火墙策略规则的设置有两种：“通”（即放行）和“堵”（即阻止）。当防火墙的默认策略为拒绝时（堵），就要设置允许规则（通），否则谁都进不来；如果防火墙的默认策略为允许，就要设置拒绝规则，否则谁都能进来，防火墙也就失去了防范的作用。

`iptables`服务把用于处理或过滤流量的策略条目称之为规则，多条规则可以组成一个规则链，而规则链则依据数据包处理位置的不同进行分类，具体如下：

> 在进行路由选择前处理数据包（`PREROUTING`）；
>
> 处理流入的数据包（`INPUT`）；
>
> 处理流出的数据包（`OUTPUT`）；
>
> 处理转发的数据包（`FORWARD`）；
>
> 在进行路由选择后处理数据包（`POSTROUTING`）。

一般来说，从内网向外网发送的流量一般都是可控且良性的，因此使用最多的就是INPUT规则链，该规则链可以增大黑客人员从外网入侵内网的难度。

比如在您居住的社区内，物业管理公司有两条规定：禁止小商小贩进入社区；各种车辆在进入社区时都要登记。显而易见，这两条规定应该是用于社区的正门的（流量必须经过的地方），而不是每家每户的防盗门上。根据前面提到的防火墙策略的匹配顺序，可能会存在多种情况。比如，来访人员是小商小贩，则直接会被物业公司的保安拒之门外，也就无须再对车辆进行登记。如果来访人员乘坐一辆汽车进入社区正门，则“禁止小商小贩进入社区”的第一条规则就没有被匹配到，因此按照顺序匹配第二条策略，即需要对车辆进行登记。如果是社区居民要进入正门，则这两条规定都不会匹配到，因此会执行默认的放行策略。

但是，仅有策略规则还不能保证社区的安全，保安还应该知道采用什么样的动作来处理这些匹配的流量，比如“允许”“拒绝”“登记”“不理它”。这些动作对应到`iptables`服务的术语中分别是`ACCEPT（允许流量通过）`、`REJECT（拒绝流量通过）`、`LOG（记录日志信息）`、`DROP（拒绝流量通过）`。“允许流量通过”和“记录日志信息”都比较好理解，这里需要着重讲解的是`REJECT`和`DROP`的不同点。就`DROP`来说，它是直接将流量丢弃而且不响应；REJECT则会在拒绝流量后再回复一条“信息已经收到，但是被扔掉了”信息，从而让流量发送方清晰地看到数据被拒绝的响应信息。

下面举一个例子，让各位读者更直观地理解这两个拒绝动作的不同之处。比如有一天您正在家里看电视，突然听到有人敲门，您透过防盗门的猫眼一看是推销商品的，便会在不需要的情况下开门并拒绝他们（`REJECT`）。但如果看到的是债主带了十几个小弟来讨债，此时不仅要拒绝开门，还要默不作声，伪装成自己不在家的样子（DROP）。

> 在红帽认证考试中必须用`REJECT`进行拒绝，好让用于判分的脚本得到反应，以获得分值。而在工作中更多建议用`DROP`进行拒绝，这可以隐藏服务器的运行状态。这样做有很多好处。

当把Linux系统中的防火墙策略设置为`REJECT`动作后，流量发送方会看到端口不可达的响应：

```bash
[root@linuxprobe ~]# ping -c 4 192.168.10.10
PING 192.168.10.10 (192.168.10.10) 56(84) bytes of data.
From 192.168.10.10 icmp_seq=1 Destination Port Unreachable
From 192.168.10.10 icmp_seq=2 Destination Port Unreachable
From 192.168.10.10 icmp_seq=3 Destination Port Unreachable
From 192.168.10.10 icmp_seq=4 Destination Port Unreachable
--- 192.168.10.10 ping statistics ---
4 packets transmitted, 0 received, +4 errors, 100% packet loss, time 3002ms
```

而把Linux系统中的防火墙策略修改成DROP动作后，流量发送方会看到响应超时的提醒。但是流量发送方无法判断流量是被拒绝，还是接收方主机当前不在线：

```bash
[root@linuxprobe ~]# ping -c 4 192.168.10.10
PING 192.168.10.10 (192.168.10.10) 56(84) bytes of data.

--- 192.168.10.10 ping statistics ---
4 packets transmitted, 0 received, 100% packet loss, time 3000ms
```

### 8.2.2 基本的命令参数

`iptables`是一款基于命令行的防火墙策略管理工具，具有大量的参数，学习难度较大。好在对于日常的防火墙策略配置来讲，大家无须深入了解诸如“四表五链”的理论概念，只需要掌握常用的参数并做到灵活搭配即可，这就足以应对日常工作了。

根据OSI七层模型的定义，`iptables`属于工作在第二三四层的服务，所以可以根据流量的源地址、目的地址、传输协议、服务类型等信息进行匹配；一旦匹配成功，`iptables`就会根据策略规则所预设的动作来处理这些流量。另外，再次提醒一下，防火墙策略规则的匹配顺序是从上到下的，因此要把较为严格、优先级较高的策略规则放到前面，以免发生错误。下表总结归纳了常用的`iptables`命令参数。再次强调，无须死记硬背这些参数，只需借助下面的实验来理解掌握即可。

| 参数        | 作用                                           |
| ----------- | ---------------------------------------------- |
| -P          | 设置默认策略                                   |
| -F          | 清空规则链                                     |
| -L          | 查看规则链                                     |
| -A          | 在规则链的末尾添加新规则                       |
| -I num      | 在规则链的头部添加新规则                       |
| -D num      | 删除指定规则                                   |
| -s          | 匹配来源地址（IP/MASK），加叹号“!”表示排除该IP |
| -d          | 匹配目标地址                                   |
| -i 网卡名称 | 匹配从指定网卡流入的数据                       |
| -o 网卡名称 | 匹配从指定网卡流出的数据                       |
| -p          | 匹配协议，如：TCP、UDP、ICMP                   |
| --dport num | 匹配目标端口号                                 |
| --sport num | 匹配来源端口号                                 |

- **在`iptables`命令后添加`-L`参数查看已有的防火墙规则链。**

```bash
[root@linuxprobe ~]# iptables -L
Chain INPUT (policy ACCEPT)
target     prot opt source               destination         
ACCEPT     udp  --  anywhere             anywhere             udp dpt:domain
ACCEPT     tcp  --  anywhere             anywhere             tcp dpt:domain
ACCEPT     udp  --  anywhere             anywhere             udp dpt:bootps
ACCEPT     tcp  --  anywhere             anywhere             tcp dpt:bootps

Chain FORWARD (policy ACCEPT)
target     prot opt source               destination         
ACCEPT     all  --  anywhere             192.168.122.0/24     ctstate RELATED,ESTABLISHED
ACCEPT     all  --  192.168.122.0/24     anywhere            
ACCEPT     all  --  anywhere             anywhere            
REJECT     all  --  anywhere             anywhere             reject-with icmp-port-unreachable
REJECT     all  --  anywhere             anywhere             reject-with icmp-port-unreachable

Chain OUTPUT (policy ACCEPT)
target     prot opt source               destination         
ACCEPT     udp  --  anywhere             anywhere             udp dpt:bootpc
```

- **在`iptables`命令后添加`-F`参数清空已有的防火墙规则链。**

```bash
[root@linuxprobe ~]# iptables -F
[root@linuxprobe ~]# iptables -L
Chain INPUT (policy ACCEPT)
target     prot opt source               destination         

Chain FORWARD (policy ACCEPT)
target     prot opt source               destination         

Chain OUTPUT (policy ACCEPT)
target     prot opt source               destination
```

- **把`INPUT`规则链的默认策略设置为拒绝。**

```
[root@linuxprobe ~]# iptables -P INPUT DROP
[root@linuxprobe ~]# iptables -L
Chain INPUT (policy DROP)
target     prot opt source               destination         

Chain FORWARD (policy ACCEPT)
target     prot opt source               destination         

Chain OUTPUT (policy ACCEPT)
target     prot opt source               destination
```

前文提到，防火墙策略规则的设置无非有两种方式：“通”和“堵”。当把`INPUT`链设置为默认拒绝后，就要往里面写入允许策略了，否则所有流入的数据包都会被默认拒绝掉。同学们需要留意的是，规则链的默认策略拒绝动作只能是`DROP`，而不能是`REJECT`。

- **向`INPUT`链中添加允许`ICMP`流量进入的策略规则。**

在日常运维工作中，经常会使用`ping`命令来检查对方主机是否在线，而向防火墙的INPUT规则链中添加一条允许`ICMP`流量进入的策略规则就默认允许了这种`ping`命令检测行为。

```bash
[root@linuxprobe ~]# iptables -I INPUT -p icmp -j ACCEPT
[root@linuxprobe ~]# ping -c 4 192.168.10.10
PING 192.168.10.10 (192.168.10.10) 56(84) bytes of data.
64 bytes from 192.168.10.10: icmp_seq=1 ttl=64 time=0.154 ms
64 bytes from 192.168.10.10: icmp_seq=2 ttl=64 time=0.041 ms
64 bytes from 192.168.10.10: icmp_seq=3 ttl=64 time=0.038 ms
64 bytes from 192.168.10.10: icmp_seq=4 ttl=64 time=0.046 ms

--- 192.168.10.10 ping statistics ---
4 packets transmitted, 4 received, 0% packet loss, time 104ms
rtt min/avg/max/mdev = 0.038/0.069/0.154/0.049 ms
```

- **删除`INPUT`规则链中刚刚加入的那条策略（允许`ICMP`流量），并把默认策略设置为允许。**

使用`-F`参数会清空已有的所有防火墙策略；使用`-D`参数可以删除某一条指定的策略，因此更加安全和准确。

```bash
[root@linuxprobe ~]# iptables -D INPUT 1
[root@linuxprobe ~]# iptables -P INPUT ACCEPT
[root@linuxprobe ~]# iptables -L
Chain INPUT (policy ACCEPT)
target     prot opt source               destination         

Chain FORWARD (policy ACCEPT)
target     prot opt source               destination         

Chain OUTPUT (policy ACCEPT)
target     prot opt source               destination
```

- **将INPUT规则链设置为只允许指定网段的主机访问本机的22端口，拒绝来自其他所有主机的流量。**

要对某台主机进行匹配，可直接写出它的IP地址；如需对网段进行匹配，则需要写为子网掩码的形式（比如192.168.10.0/24）。

```
[root@linuxprobe ~]# iptables -I INPUT -s 192.168.10.0/24 -p tcp --dport 22 -j ACCEPT
[root@linuxprobe ~]# iptables -A INPUT -p tcp --dport 22 -j REJECT
[root@linuxprobe ~]# iptables -L
Chain INPUT (policy ACCEPT)
target prot opt source destination
 ACCEPT tcp -- 192.168.10.0/24 anywhere tcp dpt:ssh 
 REJECT tcp -- anywhere anywhere tcp dpt:ssh reject-with icmp-port-unreachable
………………省略部分输出信息………………
```

再次重申，防火墙策略规则是按照从上到下的顺序匹配的，因此一定要把允许动作放到拒绝动作前面，否则所有的流量就将被拒绝掉，从而导致任何主机都无法访问我们的服务。另外，这里提到的22号端口是`ssh`服务使用的。

在设置完上述`INPUT`规则链之后，使用IP地址在192.168.10.0/24网段内的主机访问服务器（即前面提到的设置了`INPUT`规则链的主机）的22端口，效果如下：

```bash
[root@Client A ~]# ssh 192.168.10.10
The authenticity of host '192.168.10.10 (192.168.10.10)' can't be established.
ECDSA key fingerprint is SHA256:5d52kZi1la/FJK4v4jibLBZhLqzGqbJAskZiME6ZXpQ.
Are you sure you want to continue connecting (yes/no)? yes
Warning: Permanently added '192.168.10.10' (ECDSA) to the list of known hosts.
root@192.168.10.10's password: 此处输入服务器密码
Activate the web console with: systemctl enable --now cockpit.socket

Last login: Wed Jan 20 16:30:28 2021 from 192.168.10.1
```

然后，再使用IP地址在192.168.20.0/24网段内的主机访问服务器的22端口（虽网段不同，但已确认可以相互通信），效果如下：

```bash
[root@Client B ~]# ssh 192.168.10.10
Connecting to 192.168.10.10:22...
Could not connect to '192.168.10.10' (port 22): Connection failed.
```

由上可以看到，提示连接请求被拒绝了（Connection failed）。

- **向INPUT规则链中添加拒绝所有人访问本机12345端口的策略规则。**

```bash
[root@linuxprobe ~]# iptables -I INPUT -p tcp --dport 12345 -j REJECT
[root@linuxprobe ~]# iptables -I INPUT -p udp --dport 12345 -j REJECT
[root@linuxprobe ~]# iptables -L
Chain INPUT (policy ACCEPT)
target prot opt source destination 
 REJECT udp -- anywhere anywhere udp dpt:italk reject-with icmp-port-unreachable
 REJECT tcp -- anywhere anywhere tcp dpt:italk reject-with icmp-port-unreachable
 ACCEPT tcp -- 192.168.10.0/24 anywhere tcp dpt:ssh
 REJECT tcp -- anywhere anywhere tcp dpt:ssh reject-with icmp-port-unreachable
………………省略部分输出信息………………
```

- **向INPUT规则链中添加拒绝192.168.10.5主机访问本机80端口（Web服务）的策略规则。**

```bash
[root@linuxprobe ~]# iptables -I INPUT -p tcp -s 192.168.10.5 --dport 80 -j REJECT
[root@linuxprobe ~]# iptables -L
Chain INPUT (policy ACCEPT)
target prot opt source destination 
 REJECT tcp -- 192.168.10.5 anywhere tcp dpt:http reject-with icmp-port-unreachable
 REJECT udp -- anywhere anywhere udp dpt:italk reject-with icmp-port-unreachable
 REJECT tcp -- anywhere anywhere tcp dpt:italk reject-with icmp-port-unreachable
 ACCEPT tcp -- 192.168.10.0/24 anywhere tcp dpt:ssh
 REJECT tcp -- anywhere anywhere tcp dpt:ssh reject-with icmp-port-unreachable
………………省略部分输出信息………………
```

- **向INPUT规则链中添加拒绝所有主机访问本机1000～1024端口的策略规则。**

前面在添加防火墙策略时，使用的是`-I`参数，它默认会把规则添加到最上面的位置，因此优先级是最高的。如果工作中需要添加一条最后“兜底”的规则，那就用`-A`参数吧。这两个参数的效果差别还是很大的：

```bash
[root@linuxprobe ~]# iptables -A INPUT -p tcp --dport 1000:1024 -j REJECT
[root@linuxprobe ~]# iptables -A INPUT -p udp --dport 1000:1024 -j REJECT
[root@linuxprobe ~]# iptables -L
Chain INPUT (policy ACCEPT)
target prot opt source destination 
 REJECT tcp -- 192.168.10.5 anywhere tcp dpt:http reject-with icmp-port-unreachable
 REJECT udp -- anywhere anywhere udp dpt:italk reject-with icmp-port-unreachable
 REJECT tcp -- anywhere anywhere tcp dpt:italk reject-with icmp-port-unreachable
 ACCEPT tcp -- 192.168.10.0/24 anywhere tcp dpt:ssh
 REJECT tcp -- anywhere anywhere tcp dpt:ssh reject-with icmp-port-unreachable
 REJECT tcp -- anywhere anywhere tcp dpts:cadlock2:1024 reject-with icmp-port-unreachable
 REJECT udp -- anywhere anywhere udp dpts:cadlock2:1024 reject-with icmp-port-unreachable
………………省略部分输出信息………………
```

有关`iptables`命令的知识讲解到此就结束了，大家是不是意犹未尽？考虑到`Linux`防火墙的发展趋势，大家只要能把上面的实例吸收消化，就可以完全搞定日常的`iptables`配置工作了。但是请特别注意，使用`iptables`命令配置的防火墙规则默认会在系统下一次重启时失效，如果想让配置的防火墙策略永久生效，还要执行保存命令：

```bash
[root@linuxprobe ~]# iptables-save 
# Generated by xtables-save v1.8.2 on Wed Jan 20 16:56:27 2021
………………省略部分输出信息………………
```

对了，如果公司服务器是5/6/7版本的话，对应的保存命令应该是：

```bash
[root@linuxprobe ~]# service iptables save
iptables: Saving firewall rules to /etc/sysconfig/iptables: [ OK ]
```

## 8.3 Firewalld

RHEL 8系统中集成了多款防火墙管理工具，其中`firewalld`（Dynamic Firewall Manager of Linux systems，Linux系统的动态防火墙管理器）服务是默认的防火墙配置管理工具，它拥有基于CLI（命令行界面）和基于GUI（图形用户界面）的两种管理方式。

相较于传统的防火墙管理配置工具，`firewalld`支持动态更新技术并加入了区域（zone）的概念。简单来说，区域就是`firewalld`预先准备了几套防火墙策略集合（策略模板），用户可以根据生产场景的不同而选择合适的策略集合，从而实现防火墙策略之间的快速切换。例如，我们有一台笔记本电脑，每天都要在办公室、咖啡厅和家里使用。按常理来讲，这三者的安全性按照由高到低的顺序来排列，应该是家庭、公司办公室、咖啡厅。当前，我们希望为这台笔记本电脑制定如下防火墙策略规则：在家中允许访问所有服务；在办公室内仅允许访问文件共享服务；在咖啡厅仅允许上网浏览。在以往，我们需要频繁地手动设置防火墙策略规则，而现在只需要预设好区域集合，然后轻点鼠标就可以自动切换了，从而极大地提升了防火墙策略的应用效率。`firewalld`中常见的区域名称（默认为public）以及相应的策略规则如下表所示。

| 区域     | 默认规则策略                                                 |
| -------- | ------------------------------------------------------------ |
| trusted  | 允许所有的数据包                                             |
| home     | 拒绝流入的流量，除非与流出的流量相关；而如果流量与ssh、mdns、ipp-client、amba-client与dhcpv6-client服务相关，则允许流量 |
| internal | 等同于home区域                                               |
| work     | 拒绝流入的流量，除非与流出的流量相关；而如果流量与ssh、ipp-client与dhcpv6-client服务相关，则允许流量 |
| public   | 拒绝流入的流量，除非与流出的流量相关；而如果流量与ssh、dhcpv6-client服务相关，则允许流量 |
| external | 拒绝流入的流量，除非与流出的流量相关；而如果流量与ssh服务相关，则允许流量 |
| dmz      | 拒绝流入的流量，除非与流出的流量相关；而如果流量与ssh服务相关，则允许流量 |
| block    | 拒绝流入的流量，除非与流出的流量相关                         |
| drop     | 拒绝流入的流量，除非与流出的流量相关                         |

### 8.3.1 终端管理工具

前面在讲解Linux命令时曾经提到，命令行终端是一种极富效率的工作方式，`firewall-cmd`是firewalld防火墙配置管理工具的`CLI`（命令行界面）版本。它的参数一般都是以“长格式”来提供的。大家不要一听到长格式就头大，因为RHEL 8系统支持部分命令的参数补齐，其中就包含这条命令（很酷吧）。也就是说，现在除了能用`Tab`键自动补齐命令或文件名等内容之外，还可以用Tab键来补齐下表中所示的长格式参数。这太棒了！。

| 参数                          | 作用                                                 |
| ----------------------------- | ---------------------------------------------------- |
| --get-zones                   | 显示所有可用的区域                                   |
| --get-services                | 显示所有预先定义的服务                               |
| --get-active-zones            | 显示当前正在使用的区域及其对应的网卡名称             |
| --get-default-zone            | 查询默认的区域名称                                   |
| --set-default-zone=<区域名称> | 设置默认的区域，并使其永久生效                       |
| --add-source=                 | 将源自指定IP或子网的流量导向指定的区域               |
| --remove-source=              | 取消将源自指定IP或子网的流量导向某个区域             |
| --add-interface=<网卡名称>    | 将源自指定网卡的所有流量导向指定的区域               |
| --change-interface=<网卡名称> | 将指定网卡与指定区域进行关联                         |
| --list-services               | 列出当前区域允许的服务                               |
| --list-ports                  | 列出当前区域允许的端口                               |
| --list-all                    | 显示当前区域的所有配置参数、资源、端口及服务信息     |
| --list-all-zones              | 显示所有区域的配置参数、资源、端口及服务信息         |
| --add-service=<服务名>        | 允许默认区域的指定服务流量                           |
| --remove-service=<服务名>     | 禁止默认区域的指定服务流量                           |
| --add-port=<端口号/协议>      | 允许默认区域的指定端口流量                           |
| --remove-port=<端口号/协议>   | 禁止默认区域的指定端口流量                           |
| --query-service=<服务名>      | 查询指定服务是否被允许                               |
| --query-port=<端口号/协议>    | 查询指定端口是否被允许                               |
| --add-rich-rule='<规则>'      | 添加一条复杂的规则                                   |
| --remove-rich-rule='<规则>'   | 删除一条复杂的规则                                   |
| --reload                      | 重新加载配置，让永久生效的规则立即生效，覆盖当前配置 |
| --panic-on                    | 开启应急模式，拒绝所有流量                           |
| --panic-off                   | 关闭应急模式，恢复正常流量处理                       |
| --permanent                   | 将规则设置为永久生效（重启后依然有效）               |

与Linux系统中其他的防火墙策略配置工具一样，使用`firewalld`配置的防火墙策略默认为运行时（`Runtime`）模式，又称为当前生效模式，而且会随着系统的重启而失效。如果想让配置策略一直存在，就需要使用永久（`Permanent`）模式了，方法就是在用`firewall-cmd`命令正常设置防火墙策略时添加`--permanent`参数，这样配置的防火墙策略就可以永久生效了。但是，永久生效模式有一个“不近人情”的特点，就是使用它设置的策略只有在系统重启之后才能自动生效。如果想让配置的策略立即生效，需要手动执行`firewall-cmd --reload`命令。

> Runtime：当前立即生效，重启后失效。
>
> Permanent：当前不生效，重启后生效。

接下来的实验都很简单，但是提醒大家一定要仔细查看使用的是`Runtime`模式还是`Permanent`模式。如果不关注这个细节，就算正确配置了防火墙策略，也可能无法达到预期的效果。

**1．查看firewalld服务当前所使用的区域。**

这是一步非常重要的操作。在配置防火墙策略前，必须查看当前生效的是哪个区域，否则配置的防火墙策略将不会立即生效。

```bash
[root@linuxprobe ~]# firewall-cmd --get-default-zone
public
```

**2．查询指定网卡在firewalld服务中绑定的区域。**

在生产环境中，服务器大多不止有一块网卡。一般来说，充当网关的服务器有两块网卡，一块对公网，另外一块对内网，那么这两块网卡在审查流量时所用的策略肯定也是不一致的。因此，可以根据网卡针对的流量来源，为网卡绑定不同的区域，实现对防火墙策略的灵活管控。

```bash
[root@linuxprobe ~]# firewall-cmd --get-zone-of-interface=ens160
public
```

**3．把网卡默认区域修改为external，并在系统重启后生效。**

```bash
[root@linuxprobe ~]# firewall-cmd --permanent --zone=external --change-interface=ens160
The interface is under control of NetworkManager, setting zone to 'external'.
success
[root@linuxprobe ~]# firewall-cmd --permanent --get-zone-of-interface=ens160
external
```

**4．把firewalld服务的默认区域设置为public。**

默认区域也叫全局配置，指的是对所有网卡都生效的配置，优先级较低。在下面的代码中可以看到，当前默认区域为`public`，而ens160网卡的区域为`external`。此时便是以网卡的区域名称为准。

通俗来说，默认区域就是一种通用的政策。例如，食堂为所有人准备了一次性餐具，而环保主义者则会自己携带碗筷。如果您自带了碗筷，就可以用自己的；反之就用食堂统一提供的。

```bash
[root@linuxprobe ~]# firewall-cmd --set-default-zone=public
Warning: ZONE_ALREADY_SET: public
success
[root@linuxprobe ~]# firewall-cmd --get-default-zone 
public
[root@linuxprobe ~]# firewall-cmd --get-zone-of-interface=ens160
externa
```

**5．启动和关闭firewalld防火墙服务的应急状况模式。**

如果想在1s的时间内阻断一切网络连接，有什么好办法呢？大家下意识地会说：“拔掉网线！”这是一个物理级别的高招。但是，如果人在北京，服务器在异地呢？panic紧急模式在这个时候就派上用场了。使用--panic-on参数会立即切断一切网络连接，而使用--panic-off则会恢复网络连接。切记，紧急模式会切断一切网络连接，因此在远程管理服务器时，在按下回车键前一定要三思。

```bash
[root@linuxprobe ~]# firewall-cmd --panic-on
success
[root@linuxprobe ~]# firewall-cmd --panic-off
success
```

**6．查询SSH和HTTPS协议的流量是否允许放行。**

在工作中可以不使用--zone参数指定区域名称，firewall-cmd命令会自动依据默认区域进行查询，从而减少用户输入量。但是，如果默认区域与网卡所绑定的不一致时，就会发生冲突，因此规范写法的zone参数是一定要加的。

```bash
[root@linuxprobe ~]# firewall-cmd --zone=public --query-service=ssh
yes
[root@linuxprobe ~]# firewall-cmd --zone=public --query-service=https
no
```

**7．把HTTPS协议的流量设置为永久允许放行，并立即生效。**

默认情况下进行的修改都属于Runtime模式，即当前生效而重启后失效，因此在工作和考试中尽量避免使用。而在使用--permanent参数时，则是当前不会立即看到效果，而在重启或重新加载后方可生效。于是，在添加了允许放行HTTPS流量的策略后，查询当前模式策略，发现依然是不允许放行HTTPS协议的流量：

```bash
[root@linuxprobe ~]# firewall-cmd --permanent --zone=public --add-service=https
success
[root@linuxprobe ~]# firewall-cmd --zone=public --query-service=https
no
```

不想重启服务器的话，就用--reload参数吧：

```bash
[root@linuxprobe ~]# firewall-cmd --reload
success
[root@linuxprobe ~]# firewall-cmd --zone=public --query-service=https
yes
```

**8．把HTTP协议的流量设置为永久拒绝，并立即生效。**

由于在默认情况下HTTP协议的流量就没有被允许，所以会有“Warning: NOT_ENABLED: http”这样的提示信息，因此对实际操作没有影响。

```bash
[root@linuxprobe ~]# firewall-cmd --permanent --zone=public --remove-service=http
Warning: NOT_ENABLED: http
success
[root@linuxprobe ~]# firewall-cmd --reload 
success
```

**9．把访问8080和8081端口的流量策略设置为允许，但仅限当前生效。**

```bash
[root@linuxprobe ~]# firewall-cmd --zone=public --add-port=8080-8081/tcp
success
[root@linuxprobe ~]# firewall-cmd --zone=public --list-ports
8080-8081/tcp
```

**10．把原本访问本机888端口的流量转发到22端口，要且求当前和长期均有效。**

后面介绍的SSH远程控制协议是基于`TCP/22`端口传输控制指令的，如果想让用户通过其他端口号也能访问`ssh`服务，就可以试试端口转发技术了。通过这项技术，新的端口号在收到用户请求后会自动转发到原本服务的端口上，使得用户能够通过新的端口访问到原本的服务。

来举个例子帮助大家理解。假设小强是电子厂的工人，他喜欢上了三号流水线上的工人小花，但不好意思表白，于是写了一封情书并交给门卫张大爷，希望由张大爷转交给小花。这样一来，情书（信息）的传输由从小强到小花，变成了小强到张大爷再到小花，情书（信息）依然能顺利送达。

使用`firewall-cmd`命令实现端口转发的格式有点长，这里为大家总结好了：

> `firewall-cmd --permanent --zone=**<区域>** --add-forward-port=port=<源端口号>:proto=**<协议>**:toport=**<目标端口号>**:toaddr=**<目标IP地址>**`

上述命令中的目标IP地址一般是服务器本机的IP地址：

```bash
[root@linuxprobe ~]# firewall-cmd --permanent --zone=public --add-forward-port=port=888:proto=tcp:toport=22:toaddr=192.168.10.10
success
[root@linuxprobe ~]# firewall-cmd --reload
success
```

在客户端使用`ssh`命令尝试访问192.168.10.10主机的888端口，访问成功：

```bash
[root@client A ~]# ssh -p 888 192.168.10.10
The authenticity of host '[192.168.10.10]:888 ([192.168.10.10]:888)' can't be established.
ECDSA key fingerprint is b8:25:88:89:5c:05:b6:dd:ef:76:63:ff:1a:54:02:1a.
Are you sure you want to continue connecting (yes/no)? yes
Warning: Permanently added '[192.168.10.10]:888' (ECDSA) to the list of known hosts.
root@192.168.10.10's password:此处输入远程root管理员的密码
Last login: Sun Jul 19 21:43:48 2021 from 192.168.10.10
```

**11．富规则的设置。**

富规则也叫复规则，表示更细致、更详细的防火墙策略配置，它可以针对系统服务、端口号、源地址和目标地址等诸多信息进行更有针对性的策略配置。它的优先级在所有的防火墙策略中也是最高的。比如，我们可以在`firewalld`服务中配置一条富规则，使其拒绝192.168.10.0/24网段的所有用户访问本机的ssh服务（22端口）：

```bash
[root@linuxprobe ~]# firewall-cmd --permanent --zone=public --add-rich-rule="rule family="ipv4" source address="192.168.10.0/24" service name="ssh" reject"
success
[root@linuxprobe ~]# firewall-cmd --reload
success
```

在客户端使用ssh命令尝试访问192.168.10.10主机的ssh服务（22端口）：

```bash
[root@client A ~]# ssh 192.168.10.10
Connecting to 192.168.10.10:22...
Could not connect to '192.168.10.10' (port 22): Connection failed.
```

### 8.3.2 图形管理工具

在各种版本的Linux系统中，几乎没有能让刘遄老师欣慰并推荐的图形化工具，但是`firewall-config`做到了。它是`firewalld`防火墙配置管理工具的GUI（图形用户界面）版本，几乎可以实现所有以命令行来执行的操作。毫不夸张地说，即使读者没有扎实的Linux命令基础，也完全可以通过它来妥善配置RHEL 8中的防火墙策略。但在默认情况下系统并没有提供`firewall-config`命令，我们需要自行用`dnf`命令进行安装，所以需要先配置软件仓库。

首先将虚拟机的“`CD/DVD（SATA）`”光盘选项设置为“使用ISO映像文件”，然后选择已经下载好的系统镜像，如图8-2所示。

> **随书配套的软件资源请在这里下载：**https://www.linuxprobe.com/tools/
>
> **RedHatEnterpriseLinux [RHEL]8.0——红帽操作系统（必需）：**

![第8章 使用Iptables与Firewalld防火墙第8章 使用Iptables与Firewalld防火墙](https://www.linuxprobe.com/wp-content/uploads/2020/05/%E6%8C%82%E8%BD%BD%E7%B3%BB%E7%BB%9F%E9%95%9C%E5%83%8F.png)

> 下载后的系统镜像是以.iso结尾的文件，选中即可，无须解压。

然后，把光盘设备中的系统镜像挂载到`/media/cdrom`目录：

```bash
[root@linuxprobe ~]# mkdir -p /media/cdrom
[root@linuxprobe ~]# mount /dev/cdrom /media/cdrom
mount: /media/cdrom: WARNING: device write-protected, mounted read-only.
```

为了能够让软件仓库一直为用户提供服务，更加严谨的做法是将系统镜像文件的挂载信息写入到`/etc/fstab`文件中，以保证万无一失：

```bash
[root@linuxprobe ~]# vim /etc/fstab
#
# /etc/fstab
# Created by anaconda on Tue Jul 21 05:03:40 2021
#
# Accessible filesystems, by reference, are maintained under '/dev/disk/'.
# See man pages fstab(5), findfs(8), mount(8) and/or blkid(8) for more info.
#
# After editing this file, run 'systemctl daemon-reload' to update systemd
# units generated from this file.
#
/dev/mapper/rhel-root                       /                  xfs       defaults        0 0
UUID=2db66eb4-d9c1-4522-8fab-ac074cd3ea0b   /boot              xfs       defaults        0 0
/dev/mapper/rhel-swap                       swap               swap      defaults        0 0
/dev/cdrom                                  /media/cdrom       iso9660   defaults        0 0 
```

最后，使用`Vim`文本编辑器创建软件仓库的配置文件。与之前版本的系统不同，RHEL 8需要配置两个软件仓库（即`[BaseOS]`与`[AppStream]`），且缺一不可。

```bash
[root@linuxprobe ~]# vim /etc/yum.repos.d/rhel8.repo
[BaseOS]
name=BaseOS
baseurl=file:///media/cdrom/BaseOS
enabled=1
gpgcheck=0
[AppStream]
name=AppStream
baseurl=file:///media/cdrom/AppStream
enabled=1
gpgcheck=0
```

在正确配置完软件仓库文件后，就可以开始用`yum`或`dnf`命令安装软件了。这两个命令在实际操作中除了名字不同外，执行方法完全一致，大家可随时用yum来替代`dnf`命令。下面安装`firewalld`图形用户界面工具：

```bash
[root@linuxprobe ~]# dnf install firewall-config
Updating Subscription Management repositories.
Unable to read consumer identity
This system is not registered to Red Hat Subscription Management. You can use subscription-manager to register.
AppStream                                       3.1 MB/s | 3.2 kB     00:00    
BaseOS                                          2.7 MB/s | 2.7 kB     00:00    
Dependencies resolved.
================================================================================
 Package                Arch          Version            Repository        Size
================================================================================
Installing:
 firewall-config        noarch        0.6.3-7.el8        AppStream        157 k

Transaction Summary
================================================================================
Install  1 Package

Total size: 157 k
Installed size: 1.1 M
Is this ok [y/N]: y
Downloading Packages:
Running transaction check
Transaction check succeeded.
Running transaction test
Transaction test succeeded.
Running transaction
  Preparing        :                                                        1/1 
  Installing       : firewall-config-0.6.3-7.el8.noarch                     1/1 
  Running scriptlet: firewall-config-0.6.3-7.el8.noarch                     1/1 
  Verifying        : firewall-config-0.6.3-7.el8.noarch                     1/1 
Installed products updated.

Installed:
  firewall-config-0.6.3-7.el8.noarch                                            

Complete!
```

安装成功后，`firewall-config`工具的界面下图如所示，其功能具体如下。

![第8章 使用Iptables与Firewalld防火墙第8章 使用Iptables与Firewalld防火墙](https://www.linuxprobe.com/wp-content/uploads/2020/05/firewall-config%E7%9A%84%E5%9B%BE%E5%BD%A2%E7%95%8C%E9%9D%A2-1.jpg)

> **1：**选择运行时（Runtime）或永久（Permanent）模式的配置。
>
> **2**：可选的策略集合区域列表。
>
> **3**：常用的系统服务列表。
>
> **4：**主机地址的黑白名单。
>
> **5**：当前正在使用的区域。
>
> **6**：管理当前被选中区域中的服务。
>
> **7**：管理当前被选中区域中的端口。
>
> **8：**设置允许被访问的协议。
>
> **9：**设置允许被访问的端口。
>
> **10**：开启或关闭SNAT（源网络地址转换）技术。
>
> **11**：设置端口转发策略。
>
> **12**：控制请求icmp服务的流量。
>
> **13**：管理防火墙的富规则。
>
> **14**：被选中区域的服务，若勾选了相应服务前面的复选框，则表示允许与之相关的流量。
>
> **15**：firewall-config工具的运行状态。

除了以上中列出的功能，还有用于将网卡与区域绑定的`Interfaces`选项，以及用于将IP地址与区域绑定的`Sources`选项。另外再啰唆一句。在使用`firewall-config`工具配置完防火墙策略之后，无须进行二次确认，因为只要有修改内容，它就自动进行保存。

**下面进行动手实践环节。**

先将当前区域中请求`http`服务的流量设置为允许放行，但仅限当前生效。具体配置如下所示。

![第8章 使用Iptables与Firewalld防火墙第8章 使用Iptables与Firewalld防火墙](https://www.linuxprobe.com/wp-content/uploads/2020/05/%E6%94%BE%E8%A1%8C%E8%AF%B7%E6%B1%82http%E6%9C%8D%E5%8A%A1%E7%9A%84%E6%B5%81%E9%87%8F-1024x591.png)

尝试添加一条防火墙策略规则，使其放行访问`8080～8088`端口（TCP协议）的流量，并将其设置为永久生效，以达到系统重启后防火墙策略依然生效的目的。先安按照下图配置

![第8章 使用Iptables与Firewalld防火墙第8章 使用Iptables与Firewalld防火墙](https://www.linuxprobe.com/wp-content/uploads/2020/05/%E6%94%BE%E8%A1%8C%E8%AE%BF%E9%97%AE8080%EF%BD%9E8088%E7%AB%AF%E5%8F%A3%E7%9A%84%E6%B5%81%E9%87%8F-1.png)

然后还需要在`Options`菜单中单击`Reload Firewalld`命令，让配置的防火墙策略立即生效。这与在命令行中使用`--reload`参数的效果一样。

![第8章 使用Iptables与Firewalld防火墙第8章 使用Iptables与Firewalld防火墙](https://www.linuxprobe.com/wp-content/uploads/2020/05/%E8%AE%A9%E9%85%8D%E7%BD%AE%E7%9A%84%E9%98%B2%E7%81%AB%E5%A2%99%E7%AD%96%E7%95%A5%E8%A7%84%E5%88%99%E7%AB%8B%E5%8D%B3%E7%94%9F%E6%95%88-1024x590.png)

前面在讲解`firewall-config`工具的功能时，曾经提到了`SNAT`（Source Network Address Translation，源网络地址转换）技术。`SNAT`是一种为了解决IP地址匮乏而设计的技术，它可以使得多个内网中的用户通过同一个外网IP接入`Internet`。该技术的应用非常广泛，甚至可以说我们每天都在使用，只不过没有察觉到罢了。

大家可以看一下在网络中不使用`SNAT`技术（见下图1）和使用`SNAT`技术（见图2）时的情况。在图1所示的局域网中有多台PC，如果网关服务器没有应用`SNAT`技术，则互联网中的网站服务器在收到PC的请求数据包，并回送响应数据包时，将无法在网络中找到这个私有网络的IP地址，所以PC也就收不到响应数据包了。在图2所示的局域网中，由于网关服务器应用了`SNAT`技术，所以互联网中的网站服务器会将响应数据包发给网关服务器，再由后者转发给局域网中的PC。

![第8章 使用Iptables与Firewalld防火墙第8章 使用Iptables与Firewalld防火墙](https://www.linuxprobe.com/wp-content/uploads/2015/03/%E6%9C%AA%E7%94%A8SNAT1.png)

图2 使用SNAT技术处理过的网络

![第8章 使用Iptables与Firewalld防火墙第8章 使用Iptables与Firewalld防火墙](https://www.linuxprobe.com/wp-content/uploads/2015/03/%E4%BD%BF%E7%94%A8SNAT1.png)



使用`iptables`命令实现`SNAT`技术是一件很麻烦的事情，但是在`firewall-config`中却是小菜一碟了。用户只需按照下面进行配置，并选中Masquerade zone复选框，就自动开启了`SNAT`技术。

![第8章 使用Iptables与Firewalld防火墙第8章 使用Iptables与Firewalld防火墙](https://www.linuxprobe.com/wp-content/uploads/2020/05/%E5%BC%80%E5%90%AF%E9%98%B2%E7%81%AB%E5%A2%99%E7%9A%84SNAT%E6%8A%80%E6%9C%AF.png)

为了让大家直观查看不同工具在实现相同功能时的区别，针对前面使用`firewall-cmd`配置的防火墙策略规则，这里使用`firewall-config`工具进行了重新演示：将本机888端口的流量转发到22端口，且要求当前和长期均有效，具体如下所示。

配置本地的端口转发

![第8章 使用Iptables与Firewalld防火墙第8章 使用Iptables与Firewalld防火墙](https://www.linuxprobe.com/wp-content/uploads/2020/05/%E9%85%8D%E7%BD%AE%E6%9C%AC%E5%9C%B0%E7%9A%84%E7%AB%AF%E5%8F%A3%E8%BD%AC%E5%8F%91-1024x590.png)

让防火墙效策略规则立即生效

![第8章 使用Iptables与Firewalld防火墙第8章 使用Iptables与Firewalld防火墙](https://www.linuxprobe.com/wp-content/uploads/2020/05/%E8%AE%A9%E9%98%B2%E7%81%AB%E5%A2%99%E6%95%88%E7%AD%96%E7%95%A5%E8%A7%84%E5%88%99%E7%AB%8B%E5%8D%B3%E7%94%9F%E6%95%88-1024x591.png)

用命令配置富规则可真辛苦，幸好我们现在有了图形用户界面的工具。让192.168.10.20主机访问本机的1234端口号，如下图所示。其中`Element`选项能够根据服务名称、端口号、协议等信息进行匹配；`Source`与`Destination`选项后的`inverted`复选框代表反选功能，将其选中则代表对已填写信息进行反选，即选中填写信息以外的主机地址；`Log`复选框在选中后，日志不仅会被记录到日志文件中，而且还可以在设置日志的级别（`Level`）后，再将日志记录到日志文件中，以方便后续的筛查。

![第8章 使用Iptables与Firewalld防火墙第8章 使用Iptables与Firewalld防火墙](https://www.linuxprobe.com/wp-content/uploads/2020/05/%E9%85%8D%E7%BD%AE%E9%98%B2%E7%81%AB%E5%A2%99%E5%AF%8C%E8%A7%84%E5%88%99%E7%AD%96%E7%95%A5-1-1024x590.png)

如果生产环境中的服务器有多块网卡在同时提供服务（这种情况很常见），则对内网和对外网提供服务的网卡要选择的防火墙策略区域也是不一样的。也就是说，可以把网卡与防火墙策略区域进行绑定，这样就可以使用不同的防火墙区域策略，对源自不同网卡的流量进行有针对性的监控，效果会更好。

把网卡与防火墙策略区域进行绑定

![第8章 使用Iptables与Firewalld防火墙第8章 使用Iptables与Firewalld防火墙](https://www.linuxprobe.com/wp-content/uploads/2020/05/%E6%8A%8A%E7%BD%91%E5%8D%A1%E4%B8%8E%E9%98%B2%E7%81%AB%E5%A2%99%E7%AD%96%E7%95%A5%E5%8C%BA%E5%9F%9F%E8%BF%9B%E8%A1%8C%E7%BB%91%E5%AE%9A-1024x591.png)

网卡与策略区域绑定完成

![第8章 使用Iptables与Firewalld防火墙第8章 使用Iptables与Firewalld防火墙](https://www.linuxprobe.com/wp-content/uploads/2020/05/%E7%BD%91%E5%8D%A1%E4%B8%8E%E7%AD%96%E7%95%A5%E5%8C%BA%E5%9F%9F%E7%BB%91%E5%AE%9A%E5%AE%8C%E6%88%90-1024x590.png)

最后再提一句，`firewall-config`工具真的非常实用，很多原本复杂的长命令被图形化按钮替代，设置规则也简单明了，足以应对日常工作。所以再次向大家强调配置防火墙策略的原则—只要能实现所需的功能，用什么工具请随君便。

## 8.4 服务的访问控制列表

`TCP Wrapper`是RHEL 6/7系统中默认启用的一款流量监控程序，它能够根据来访主机的地址与本机的目标服务程序做出允许或拒绝的操作。在RHEL 8版本中，它已经被`firewalld`正式替代。换句话说，Linux系统中其实有两个层面的防火墙，第一种是前面讲到的基于`TCP/IP`协议的流量过滤工具，而TCP Wrapper服务则是能允许或禁止Linux系统提供服务的防火墙，从而在更高层面保护了Linux系统的安全运行。

`TCP Wrapper`服务的防火墙策略由两个控制列表文件所控制，用户可以编辑允许控制列表文件来放行对服务的请求流量，也可以编辑拒绝控制列表文件来阻止对服务的请求流量。控制列表文件修改后会立即生效，系统将会先检查允许控制列表文件（`/etc/hosts.allow`），如果匹配到相应的允许策略则放行流量；如果没有匹配，则会进一步匹配拒绝控制列表文件（`/etc/hosts.deny`），若找到匹配项则拒绝该流量。如果这两个文件都没有匹配到，则默认放行流量。

由于RHEL 8版本已经不再支持TCP Wrapper服务程序，因此我们接下来选择在一台老版本的服务器上进行实验。TCP Wrapper服务的控制列表文件配置起来并不复杂，常用的参数如下表所示。

| 客户端类型     | 示例                       | 满足示例的客户端列表               |
| -------------- | -------------------------- | ---------------------------------- |
| 单一主机       | 192.168.10.10              | IP地址为192.168.10.10的主机        |
| 指定网段       | 192.168.10.                | IP段为192.168.10.0/24的主机        |
| 指定网段       | 192.168.10.0/255.255.255.0 | IP段为192.168.10.0/24的主机        |
| 指定DNS后缀    | .linuxprobe.com            | 所有DNS后缀为.linuxprobe.com的主机 |
| 指定主机名称   | www.linuxprobe.com         | 主机名称为www.linuxprobe.com的主机 |
| 指定所有客户端 | ALL                        | 所有主机全部包括在内               |

在配置`TCP Wrapper`服务时需要遵循两个原则：

> 编写拒绝策略规则时，填写的是服务名称，而非协议名称；
>
> 建议先编写拒绝策略规则，再编写允许策略规则，以便直观地看到相应的效果。

下面编写拒绝策略规则文件，禁止访问本机`sshd`服务的所有流量（无须修改`/etc/hosts.deny`文件中原有的注释信息）：

```bash
[root@linuxprobe ~]# vim /etc/hosts.deny
#
# hosts.deny This file contains access rules which are used to
# deny connections to network services that either use
# the tcp_wrappers library or that have been
# started through a tcp_wrappers-enabled xinetd.
#
# The rules in this file can also be set up in
# /etc/hosts.allow with a 'deny' option instead.
#
# See 'man 5 hosts_options' and 'man 5 hosts_access'
# for information on rule syntax.
# See 'man tcpd' for information on tcp_wrappers
sshd:*
[root@linuxprobe ~]# ssh 192.168.10.10
ssh_exchange_identification: read: Connection reset by peer
```

接下来，在允许策略规则文件中添加一条规则，使其放行源自192.168.10.0/24网段，且访问本机`sshd`服务的所有流量。可以看到，服务器立刻就放行了访问`sshd`服务的流量，效果非常直观：

```bash
[root@linuxprobe ~]# vim /etc/hosts.allow
#
# hosts.allow This file contains access rules which are used to
# allow or deny connections to network services that
# either use the tcp_wrappers library or that have been
# started through a tcp_wrappers-enabled xinetd.
#
# See 'man 5 hosts_options' and 'man 5 hosts_access'
# for information on rule syntax.
# See 'man tcpd' for information on tcp_wrappers
sshd:192.168.10.

[root@linuxprobe ~]# ssh 192.168.10.10
The authenticity of host '192.168.10.10 (192.168.10.10)' can't be established.
ECDSA key fingerprint is 70:3b:5d:37:96:7b:2e:a5:28:0d:7e:dc:47:6a:fe:5c.
Are you sure you want to continue connecting (yes/no)? yes
Warning: Permanently added '192.168.10.10' (ECDSA) to the list of known hosts.
root@192.168.10.10's password: 
Last login: Wed May 4 07:56:29 2021
[root@linuxprobe ~]# 
```

## 8.5 Cockpit驾驶舱管理工具

首先，`Cockpit`是一个英文单词，即“（飞机、船或赛车的）驾驶舱、驾驶座”（见图8-15），它用名字传达出了功能丰富的特性。其次，`Cockpit`是一个基于Web的图形化服务管理工具，对用户相当友好，即便是新手也可以轻松上手。而且它天然具备很好的跨平台性，因此被广泛应用于服务器、容器、虚拟机等多种管理场景。最后，红帽公司对`Cockpit`也十分看重，直接将它默认安装到了RHEL 8系统中，由此衍生的CentOS和`Fedora`也都标配有`Cockpit`。

![第8章 使用Iptables与Firewalld防火墙第8章 使用Iptables与Firewalld防火墙](https://www.linuxprobe.com/wp-content/uploads/2020/05/Cockpit.jpg)

`Cockpit`在默认情况下就已经被安装到系统中。下面执行`dnf`命令对此进行确认：

```bash
[root@linuxprobe ~]# dnf install cockpit
Updating Subscription Management repositories.
Unable to read consumer identity
This system is not registered to Red Hat Subscription Management. You can use subscription-manager to register.
AppStream                                       3.1 MB/s | 3.2 kB     00:00    
BaseOS                                          2.7 MB/s | 2.7 kB     00:00    
Package cockpit-185-2.el8.x86_64 is already installed.
Dependencies resolved.
Nothing to do.
Complete!
```

但是，`Cockpit`服务程序在RHEL 8版本中没有自动运行，下面将它开启并加入到开机启动项中：

```bash
[root@linuxprobe ~]# systemctl start cockpit
[root@linuxprobe ~]# systemctl enable cockpit.socket
Created symlink /etc/systemd/system/sockets.target.wants/cockpit.socket → /usr/lib/systemd/system/cockpit.socket.
```

在`Cockpit`服务启动后，打开系统自带的浏览器，在地址栏中输入“`本机地址:9090`”即可访问。由于访问`Cockpit`的流量会使用`HTTPS`进行加密，而证书又是在本地签发的，因此还需要进行添加并信任本地证书的操作，如下图所示。

添加额外允许的证书

![第8章 使用Iptables与Firewalld防火墙第8章 使用Iptables与Firewalld防火墙](https://www.linuxprobe.com/wp-content/uploads/2020/05/1-58-1024x593.png)

![第8章 使用Iptables与Firewalld防火墙第8章 使用Iptables与Firewalld防火墙](https://www.linuxprobe.com/wp-content/uploads/2020/05/2-37.png)

进入`Cockpit`的登录界面后，输入root管理员的账号与系统密码，单击Log In按钮后即可进入，如图8-18所示。

![第8章 使用Iptables与Firewalld防火墙第8章 使用Iptables与Firewalld防火墙](https://www.linuxprobe.com/wp-content/uploads/2020/05/3-14-1024x588.png)

进入`Cockpit`的`Web`界面，发现里面可谓“别有洞天”。`Cockpit`总共分为13个功能模块：`系统状态（System）`、`日志信息（Logs）`、`硬盘存储（Storage）`、`网卡网络（Networking）`、`账户安全（Accounts）`、`服务程序（Services）`、`软件仓库（Applications）`、`报告分析（Diagnostic Reports）`、`内核排错（Kernel Dump）`、`SElinux`、`更新软件（Software Updates）`、`订阅服务（Subscriptions）`、`终端界面（Terminal）`。下面逐一进行讲解。

进入到Cockpit网页界面后可谓是别有洞天，总共分为十三个功能模块，即：系统状态、日志信息、硬盘存储、网卡网络、账户安全、服务程序、软件仓库、报告分析、内核排错、SElinux、更新软件、订阅服务、终端界面。逐一为同学们进行讲解。

### 8.5.1．System

进入`Cockpit`界面后默认显示的便是System（系统）界面，在该界面中能够看到系统架构、版本、主机名与时间等信息，还能够动态地展现出CPU、硬盘、内存和网络的复杂情况，这有点类似于Web版的“Winodws系统任务管理器”，属实好用，如下图所示。

![第8章 使用Iptables与Firewalld防火墙第8章 使用Iptables与Firewalld防火墙](https://www.linuxprobe.com/wp-content/uploads/2020/05/1-59-1024x502.png)

### 8.5.2．Logs

这个模块能够提供系统的全部日志，但是同学们可能会好奇，“为什么下图中的内容这么有限呢”？原因出下图在中的两个选项中：时间和日志级别。通过这两个选项可以让用户更快地找到所需信息，而不是像`/var/log/message`文件那样一股脑儿地都抛给用户。

![第8章 使用Iptables与Firewalld防火墙第8章 使用Iptables与Firewalld防火墙](https://www.linuxprobe.com/wp-content/uploads/2020/05/2-38-1024x502.png)

### 8.5.3．Storage

这个功能模块是同学们最喜欢的一个模块，原因不是这个模块显示了硬盘的I/O读写负载情况，而是可以让用户通过该界面，用鼠标创建出`RAID`、`LVM`、`VDO`和`iSCSI`等存储设备，如下图所示。是的，您没有看错，`RAID`和`LVM`都可以用鼠标进行创建了，是不是很开心呢？

![第8章 使用Iptables与Firewalld防火墙第8章 使用Iptables与Firewalld防火墙](https://www.linuxprobe.com/wp-content/uploads/2020/05/3-15-1024x504.png)

### 8.5.4．Networking

既然名为`Networking`模块，那么动态看网卡的输出和接收值肯定是这个模块的标配功能了。如下图所示，我们不仅可以在这里进行网卡的绑定（`Bonding`）和聚合（`Team`），还可以创建桥接网卡及添加`VLAN`。下图的最下方会单独列出与网卡相关的日志信息。

![第8章 使用Iptables与Firewalld防火墙第8章 使用Iptables与Firewalld防火墙](https://www.linuxprobe.com/wp-content/uploads/2020/05/4-9-1024x498.png)

### 8.5.5．Accounts

大家千万别小看`Accounts`模块，虽然它的功能界面有些简陋，只有一个用于创建账户的按钮，但只要点击进入某个用户的管理界面中，马上会发现“别有洞天”，如下图所示。这个界面中的功能非常丰富，我们在这里可以对用户进行重命名，设置用户的权限，还可以锁定、修改密码以及创建`SSH`密钥信息。

![第8章 使用Iptables与Firewalld防火墙第8章 使用Iptables与Firewalld防火墙](https://www.linuxprobe.com/wp-content/uploads/2020/05/5-9-1024x502.png)

账户管理界面

![第8章 使用Iptables与Firewalld防火墙第8章 使用Iptables与Firewalld防火墙](https://www.linuxprobe.com/wp-content/uploads/2020/05/5B-1024x502.png)

### 8.5.6．Services

在`Services`功能模块的界面中（见下图），可以查看系统中已有的服务列表和运行状态。单击某一服务，进入该服务的管理界面后，可以对具体的服务进行开启、关闭操作。在`Services`功能模块中设置了服务并将其加入到开机启动项后，在系统重启后也依然会为用户提供服务。

服务程序界面

![第8章 使用Iptables与Firewalld防火墙第8章 使用Iptables与Firewalld防火墙](https://www.linuxprobe.com/wp-content/uploads/2020/05/6-3-1024x501.png)

服务管理界面

![第8章 使用Iptables与Firewalld防火墙第8章 使用Iptables与Firewalld防火墙](https://www.linuxprobe.com/wp-content/uploads/2020/05/6B-1024x502.png)

### 8.5.7．Applications

后期采用`Cockpit`或红帽订阅服务安装的软件都会显示在这个功能模块中，如下图所示。

![第8章 使用Iptables与Firewalld防火墙第8章 使用Iptables与Firewalld防火墙](https://www.linuxprobe.com/wp-content/uploads/2020/05/7-3-1024x499.png)

### 8.5.8．Diagnostic Report

`Diagnostic Report`模块的功能是帮助用户收集及分析系统的信息，找到系统出现问题的原因，界面如下图所示。单击Create Report按钮后大约两分钟左右，会出现如图2所示的界面。好吧，摊牌了，这个功能其实很鸡肋，就是将`sosreport`命令做成了一个网页按钮。

报告分析界面

![第8章 使用Iptables与Firewalld防火墙第8章 使用Iptables与Firewalld防火墙](https://www.linuxprobe.com/wp-content/uploads/2020/05/8-1024x502.png)

报告生成完毕

![第8章 使用Iptables与Firewalld防火墙第8章 使用Iptables与Firewalld防火墙](https://www.linuxprobe.com/wp-content/uploads/2020/05/8B-1024x502.png)

### 8.5.9．Kernel Dump

`Kernel Dump（Kdump）`是一个在系统崩溃、死锁或死机时用来收集内核参数的一个服务。举例来说，如果有一天系统崩溃了，这时`Kdump`服务就会开始工作，将系统的运行状态和内核数据收集到一个名为`dump core`的文件中，以便后续让运维人员分析并找出问题所在。由于我们在安装系统时没有启动该服务，所以可以等到后续使用时再开启该功能界面（见下图）。

![第8章 使用Iptables与Firewalld防火墙第8章 使用Iptables与Firewalld防火墙](https://www.linuxprobe.com/wp-content/uploads/2020/05/9-2-1024x501.png)

### 8.5.10．SElinux

下面所示为`SELinux`服务的控制按钮和警告信息界面，后面将详细介绍SELinux安全子系统，这里暂时略过。

![第8章 使用Iptables与Firewalld防火墙第8章 使用Iptables与Firewalld防火墙](https://www.linuxprobe.com/wp-content/uploads/2020/05/10-1024x500.png)

### 8.5.11．Software Updates

`Software Updates`功能模块的界面如下图所示。但是，这里提到的`Software Updates`并不是我们用来更新其他常规软件的一个界面，而是用来对红帽客户订阅的服务进行更新的界面。用户只有在购买了红帽第三方服务后才能使用这里面的功能。在购买了红帽订阅服务后，用户便可以在这里下载到相应服务程序的最新版本和稳定版本。

![第8章 使用Iptables与Firewalld防火墙第8章 使用Iptables与Firewalld防火墙](https://www.linuxprobe.com/wp-content/uploads/2020/05/11-5-1024x502.png)

### 8.5.12．Subscriptions

`Subscriptions`功能模块的界面如下图所示。这里依然是一则红帽公司的“小广告”—如果想成为尊贵的红帽服务用户，要付费购买订阅服务。个人用户无须购买，而且这对我们的后续实验没有任何影响。

![第8章 使用Iptables与Firewalld防火墙第8章 使用Iptables与Firewalld防火墙](https://www.linuxprobe.com/wp-content/uploads/2020/05/12-3-1024x500.png)

### 8.5.13．Terminal

压轴的总是在最后。`Terminal`功能模块的界面如下图所示。`Cockpit`服务提供了Shell终端的在线控制平台，可方便用户通过网页上的终端功能管理服务器。这个功能深受运维人员喜爱。

![第8章 使用Iptables与Firewalld防火墙第8章 使用Iptables与Firewalld防火墙](https://www.linuxprobe.com/wp-content/uploads/2020/05/13-2-1024x500.png)

至此，相信各位读者已经充分掌握了防火墙的管理能力。防火墙管理工具有很多种，我们任选其一即可。在配置后续的服务前，大家要记得检查网络和防火墙的状态，以避免出现服务明明配置正确，但无法从外部访问的情况，最终影响实验效果。

## 8.6 本章习题

1．在RHEL 8系统中，iptables是否已经被firewalld服务彻底取代？

**答：**没有，iptables和firewalld服务均可用于RHEL 8系统。

2．请简述防火墙策略规则中DROP和REJECT的不同之处。

**答：**DROP的动作是丢包，不响应；REJECT是拒绝请求，同时向发送方回送拒绝信息。

3．如何把iptables服务的INPUT规则链默认策略设置为DROP？

**答：**执行命令iptables -P INPUT DROP即可。

4．怎样编写一条防火墙策略规则，使得iptables服务可以禁止源自192.168.10.0/24网段的流量访问本机的sshd服务（22端口）？

**答：**执行命令iptables -I INPUT -s 192.168.10.0/24 -p tcp --dport 22 -j REJECT即可。

5．请简述firewalld中区域的作用。

**答：**可以依据不同的工作场景来调用不同的firewalld区域，实现大量防火墙策略规则的快速切换。

6．如何在firewalld中把默认的区域设置为dmz？

**答：**执行命令firewall-cmd --set-default-zone=dmz即可。

7．如何让firewalld中以永久（Permanent）模式配置的防火墙策略规则立即生效？

**答：**执行命令firewall-cmd --reload。

8．使用SNAT技术的目的是什么？

**答：**SNAT是一种为了解决IP地址匮乏而设计的技术，它可以使得多个内网中的用户通过同一个外网IP接入Internet。

9． TCP Wrapper服务分别有允许策略配置文件和拒绝策略配置文件，请问匹配顺序是怎么样的？

**答：**TCP Wrapper会先依次匹配允许策略配置文件，然后再依次匹配拒绝策略配置文件；如果都没有匹配到，则默认放行流量。

10．默认情况下如何使用Cockpit服务？

**答：**Cockpit服务默认占用9090端口号，可直接用浏览器访问Cockpit的Web界面。