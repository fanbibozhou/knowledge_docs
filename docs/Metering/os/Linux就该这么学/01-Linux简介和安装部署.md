# 01-Linux简介和安装部署

## 1、什么是 Linux？

**Linux** 是一个类 Unix 操作系统，它的内核（核心部分）是由 **Linus Torvalds** 于 1991 年首次发布的。Linux 作为操作系统的内核，负责硬件管理、进程调度、文件系统管理等底层操作。而在此基础上，开发者通过将各种软件和工具集合起来，创建了完整的操作系统环境，通常被称为 **Linux 发行版**。

**简单的定义：**

- **Linux 是一个开源操作系统内核**，被成千上万的开发者和社区维护和更新。
- 它的源代码是开放的，任何人都可以自由地使用、修改和分发。
- 以 Linux 为基础的操作系统可以用于服务器、桌面电脑、移动设备、嵌入式设备等多种场景。

## 2、Linux 的用途

Linux 有很多用途，涵盖了从个人计算机到大型服务器、嵌入式系统等多个领域。下面列出一些常见的用途：

1.**服务器操作系统**

- **Web 服务器**：Linux 是全球最常见的 Web 服务器操作系统。它能够稳定地托管大量的网站和应用，支持 Apache、Nginx 等 Web 服务。
- **数据库服务器**：许多数据库系统（如 MySQL、PostgreSQL）都在 Linux 上运行。
- **云计算和虚拟化**：大部分云服务（如 AWS、Google Cloud、Azure）都在 Linux 上运行。
- **企业级应用**：很多企业使用 Linux 来运行大规模的数据库、ERP 系统等。

2. **桌面操作系统**

- 虽然 Windows 和 macOS 是桌面操作系统的主流，但 Linux 也可以作为桌面操作系统使用。它有多个流行的发行版，如 Ubuntu、Fedora、Linux Mint 等，适合个人用户使用。
- 对于开发者，Linux 提供了许多开发工具和环境，特别适合程序开发和命令行操作。

3. **嵌入式系统**

- Linux 被广泛应用于各种嵌入式设备，如智能电视、路由器、家电、汽车信息系统等。很多设备使用 Linux 作为其操作系统的基础。
- 由于 Linux 内核的灵活性，开发者可以根据设备的需求定制内核和操作系统。

4. **开源软件开发**

- Linux 是开源的，许多开源项目都是在 Linux 上开发的。开发者可以自由访问和修改源代码，推动技术创新。
- 它也是很多编程语言和开发工具的首选平台，例如 Python、Ruby、Java、Go 等编程语言的开发和运行环境。

5. **安全性高的操作系统**

- Linux 是一个非常安全的操作系统，它具有强大的权限管理机制，用户和进程被严格分隔，减少了系统被攻击的风险。
- 许多安全专家和白帽黑客也使用 Linux 作为他们的工作平台，因为它提供了强大的工具和支持，用于渗透测试、漏洞分析等。

6. **高性能计算和科学计算**

- Linux 常常被用在高性能计算（HPC）集群和超级计算机中。它能高效地处理大规模计算任务。
- 科学领域的很多研究（例如物理、化学、基因组学）都依赖 Linux 系统来执行高效的数据处理和模拟。

## 3、为什么选择 Linux？

1. **开源和自由**：
   - Linux 是完全开源的，你可以自由使用、修改、分发它，而不需要支付许可费用。相比商业操作系统（如 Windows、macOS），它有更低的成本。
2. **高稳定性和可靠性**：
   - Linux 系统非常稳定，很少会出现崩溃或死机的情况。因此，它是许多高要求系统（如服务器、嵌入式设备）的首选。
3. **强大的安全性**：
   - Linux 提供了严格的权限管理和文件访问控制，因此它比很多其他操作系统更难以被攻击者利用。
4. **丰富的开发环境**：
   - Linux 提供了大量的开发工具、编程语言支持和强大的命令行界面，许多开发者更偏好使用 Linux 进行开发工作。
5. **广泛的社区支持**：
   - 由于 Linux 是开源的，全球有大量的开发者和用户在社区中互相帮助，提供支持和教程。
6. **灵活的定制性**：
   - Linux 的内核和操作系统可以高度定制，允许你根据自己的需求删除不必要的组件，优化系统性能。

## 4、准备Linux环境

在开始学习linux之前，我们需要准备一个对应的linu环境才能开始。当然，我们不需要去单独找一台linux的机器，可以通过强大的虚拟环境软件来实现

首先，请下载以下工具

> 学习环境：https://www.linuxprobe.com 《Linux就该这么学》
>
> 相关软件下载地址：https://www.linuxprobe.com/tools

## 5、安装VMware

VMware WorkStation虚拟机（简称VM虚拟机）软件是一款桌面计算机虚拟软件，让用户能够在单一主机上同时运行多个不同的操作系统。每个虚拟操作系统的磁盘分区、数据配置都是独立的，不用担心会影响到自己电脑中原本的数据。而且VM还支持实时快照、虚拟网络、文件拖曳传输以及网络安装等方便实用的功能。总结来说，Linux系统对硬件设备的要求并不高，而虚拟机功能丰富可靠，可以帮助我们节省时间和金钱，因此推荐大家使用虚拟机来安装Linux系统。

### 5.1 开始安装

将上面提到的Vmware Workstation 16虚拟机软件安装包下载到电脑中，用鼠标双击该软件包，运行后即可看到如下所示的安装向导初始界面（大约需要5～10秒）。

![第1章 动手部署一台Linux操作系统第1章 动手部署一台Linux操作系统](https://www.linuxprobe.com/wp-content/uploads/2020/05/%E8%99%9A%E6%8B%9F%E6%9C%BA%E7%9A%84%E5%AE%89%E8%A3%85%E5%90%91%E5%AF%BC-1.png)

在最终用户许可协议界面选中“我接受许可协议中的条款”复选框，然后单击“下一步”按钮

![第1章 动手部署一台Linux操作系统第1章 动手部署一台Linux操作系统](https://www.linuxprobe.com/wp-content/uploads/2020/05/%E6%8E%A5%E5%8F%97%E8%AE%B8%E5%8F%AF%E6%9D%A1%E6%AC%BE-1.png)

自定义虚拟机软件的安装路径。一般情况下无须修改安装路径，但如果您担心C盘容量不足，则可以考虑修改安装路径，将其安装到其他位置。然后选中“增强型键盘驱动程序”复选框，单击“下一步”按钮，如图1-4所示。

![第1章 动手部署一台Linux操作系统第1章 动手部署一台Linux操作系统](https://www.linuxprobe.com/wp-content/uploads/2020/05/%E9%80%89%E6%8B%A9%E8%99%9A%E6%8B%9F%E6%9C%BA%E8%BD%AF%E4%BB%B6%E7%9A%84%E5%AE%89%E8%A3%85%E8%B7%AF%E5%BE%84-1.png)

根据自身情况适当选择“启动时检查产品更新”与“加入VMware客户体验提升计划”复选框，然后单击“下一步”按钮

![第1章 动手部署一台Linux操作系统第1章 动手部署一台Linux操作系统](https://www.linuxprobe.com/wp-content/uploads/2020/05/%E7%94%A8%E6%88%B7%E4%BD%93%E9%AA%8C%E8%AE%BE%E7%BD%AE.png)

为了方便今后更便捷地找到虚拟机软件的图标，建议选中“桌面”与“开始菜单程序文件夹”复选框，然后单击“下一步”按钮



![第1章 动手部署一台Linux操作系统第1章 动手部署一台Linux操作系统](https://www.linuxprobe.com/wp-content/uploads/2020/05/%E5%88%9B%E5%BB%BA%E5%BF%AB%E6%8D%B7%E6%96%B9%E5%BC%8F.png)

一切准备就绪后，单击“安装”按钮，

![第1章 动手部署一台Linux操作系统第1章 动手部署一台Linux操作系统](https://www.linuxprobe.com/wp-content/uploads/2020/05/%E5%87%86%E5%A4%87%E5%BC%80%E5%A7%8B%E5%AE%89%E8%A3%85%E8%99%9A%E6%8B%9F%E6%9C%BA-1.png)

进入安装过程，此时要做的就是耐心等待虚拟机软件的安装过程结束（全程大约需要3～5分钟）。

![第1章 动手部署一台Linux操作系统第1章 动手部署一台Linux操作系统](https://www.linuxprobe.com/wp-content/uploads/2020/05/%E7%AD%89%E5%BE%85%E5%AE%89%E8%A3%85%E5%AE%8C%E6%88%90.png)

虚拟机软件安装完成后，再次单击“完成”按钮，结束整个安装工作，如图1-9所示。

![第1章 动手部署一台Linux操作系统第1章 动手部署一台Linux操作系统](https://www.linuxprobe.com/wp-content/uploads/2020/05/%E5%AE%89%E8%A3%85%E5%90%91%E5%AF%BC%E5%AE%8C%E6%88%90%E7%95%8C%E9%9D%A2.png)

双击桌面上生成的虚拟机快捷图标，在弹出的如下所示的界面中，输入许可证密钥（如果已经购买了的话）。大多数同学此时应该是没有许可证密钥，所以我们当前选中“我希望试用VMware Worksatation 16 30天”单选按钮，然后单击“继续”按钮。

![第1章 动手部署一台Linux操作系统第1章 动手部署一台Linux操作系统](https://www.linuxprobe.com/wp-content/uploads/2020/05/%E8%AE%B8%E5%8F%AF%E8%AF%81%E9%AA%8C%E8%AF%81%E7%95%8C%E9%9D%A2.png)

在弹出“欢迎使用VMware Workstation 16”界面后，无须任何犹豫，直接单击“完成”按钮

![第1章 动手部署一台Linux操作系统第1章 动手部署一台Linux操作系统](https://www.linuxprobe.com/wp-content/uploads/2020/05/%E8%99%9A%E6%8B%9F%E6%9C%BA%E8%BD%AF%E4%BB%B6%E7%9A%84%E6%84%9F%E8%B0%A2%E7%95%8C%E9%9D%A2.png)

再次在桌面上双击快捷方式图标，此时便看到了虚拟机软件的管理界面

![第1章 动手部署一台Linux操作系统第1章 动手部署一台Linux操作系统](https://www.linuxprobe.com/wp-content/uploads/2020/05/%E8%99%9A%E6%8B%9F%E6%9C%BA%E8%BD%AF%E4%BB%B6%E7%9A%84%E7%AE%A1%E7%90%86%E7%95%8C%E9%9D%A2-1.png)

> 注意，在第一次安装完虚拟机软件后，还不能立即安装Linux系统，因为还缺少重要的一步—设置硬件信息。设置硬件信息相当于为Linux系统设置一个硬件牢笼，限定它能够使用的最大硬盘和内存容量、CPU核心数量、系统镜像位置、网络模式等硬件信息。大家可以想象成是自己去组装一台电脑，只有把虚拟机内系统的硬件资源都模拟出来（组装完毕）后才能正式步入Linux系统的安装之旅。

### 5.2 新建虚拟机

在上面所示的管理界面中，单击“创建新的虚拟机”按钮，并在弹出的“新建虚拟机向导”界面中选择“自定义（高级）”单选按钮，然后单击“下一步”按钮，如下所示（这样我们可以更充分地了解这台新系统）。

![第1章 动手部署一台Linux操作系统第1章 动手部署一台Linux操作系统](https://www.linuxprobe.com/wp-content/uploads/2020/05/%E6%96%B0%E5%BB%BA%E8%99%9A%E6%8B%9F%E6%9C%BA%E5%90%91%E5%AF%BC-2.png)

由于这是一个全新安装的系统，所以不必担心虚拟机的兼容性问题，这里直接在“硬件兼容性”下拉列表中选择“Workstation 16.x”，然后单击“下一步”按钮

![第1章 动手部署一台Linux操作系统第1章 动手部署一台Linux操作系统](https://www.linuxprobe.com/wp-content/uploads/2020/05/%E8%AE%BE%E7%BD%AE%E7%A1%AC%E4%BB%B6%E5%85%BC%E5%AE%B9%E6%80%A7.png)

进入如下所示的界面，选中“稍后安装操作系统”单选按钮，然后单击“下一步”按钮。

![第1章 动手部署一台Linux操作系统第1章 动手部署一台Linux操作系统](https://www.linuxprobe.com/wp-content/uploads/2020/05/%E8%AE%BE%E7%BD%AE%E7%B3%BB%E7%BB%9F%E7%9A%84%E5%AE%89%E8%A3%85%E6%9D%A5%E6%BA%90.png)

> 在近几年的讲课过程中真是遇到了很多不听话的学生，明明要求选择“稍后安装操作系统”，结果非要选择“安装程序光盘映像文件”，并把下载好的RHEL 8系统的镜像选中。这样一来，虚拟机会通过默认的安装策略部署最精简的Linux系统，而不会再向您询问安装有关的配置信息，导致最终系统与实验环境有很大的差别。

如下图中，将客户机操作系统的类型选择为“Linux”，版本选择为“Red Hat Enterprise Linux 8 64位”，然后单击“下一步”按钮。

![第1章 动手部署一台Linux操作系统第1章 动手部署一台Linux操作系统](https://www.linuxprobe.com/wp-content/uploads/2020/05/%E9%80%89%E6%8B%A9%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F%E7%9A%84%E7%89%88%E6%9C%AC-2.png)

填写“虚拟机名称”字段，名称可以自行发挥。建议为“位置”字段选择一个大容量的硬盘分区，最少要有20GB以上的空闲容量。然后再单击“下一步”按钮

![第1章 动手部署一台Linux操作系统第1章 动手部署一台Linux操作系统](https://www.linuxprobe.com/wp-content/uploads/2020/05/%E5%91%BD%E5%90%8D%E8%99%9A%E6%8B%9F%E6%9C%BA%E5%8F%8A%E8%AE%BE%E7%BD%AE%E5%AE%89%E8%A3%85%E8%B7%AF%E5%BE%84-2.png)

设置“处理器数量”和“每个处理器的内核数量”，大家可以根据自身电脑的情况进行选择。可以在网络上搜索一下自己的CPU处理器的型号信息，或者在Windows系统中打开“任务管理器”，然后访问“性能”选项卡，该选项卡右下侧的逻辑处理器数量就是您的CPU内核数量。如果上述方法都不奏效，可以暂时将处理器和内核数量都设置成1（见图1-18），后期再随时修改，不影响实验。搞定后单击“下一步”按钮。

![第1章 动手部署一台Linux操作系统第1章 动手部署一台Linux操作系统](https://www.linuxprobe.com/wp-content/uploads/2020/05/%E8%AE%BE%E7%BD%AECPU%E5%A4%84%E7%90%86%E5%99%A8%E4%BF%A1%E6%81%AF.png)

设置分配给虚拟机的内存值。如果物理机的内存小于4GB，则建议分配给虚拟机1GB；如果物理机的内存大于4GB（不论是8GB还是更大），则建议分配给虚拟机2GB，如下图所示。为虚拟机分配过多的内存不会对实验结果有直接影响，而且超过2GB就可能存在浪费现象了。

![第1章 动手部署一台Linux操作系统第1章 动手部署一台Linux操作系统](https://www.linuxprobe.com/wp-content/uploads/2020/05/%E8%AE%BE%E7%BD%AE%E5%86%85%E5%AD%98%E5%88%86%E9%85%8D%E9%87%8F.png)

VMware Workstation这款虚拟机软件为用户提供了3种可选的网络模式，分别为“使用桥接网络”“使用网络地址转换（NAT）”与“使用仅主机模式网络”。

> **使用桥接网络**：相当于在物理机与虚拟机网卡之间架设了一座桥梁，从而可以通过物理主机的网卡访问外网。
>
> **使用网络地址转换（NAT）**：让VM虚拟机的网络服务发挥路由器的作用，使得通过虚拟机软件模拟的主机可以通过物理主机访问外网；在物理机中对应的物理网卡是VMnet8。
>
> **使用仅主机模式网络**：仅让虚拟机的系统与物理主机通信，不能访问外网；在物理机中对应的物理网卡是VMnet1。

由于当前不需要将虚拟机内的系统连接到互联网，所以这里将网络连接的类型设置为“使用仅主机模式网络”，然后单击“下一步”按钮，如图1-20所示。

![第1章 动手部署一台Linux操作系统第1章 动手部署一台Linux操作系统](https://www.linuxprobe.com/wp-content/uploads/2020/05/%E8%AE%BE%E7%BD%AE%E7%BD%91%E7%BB%9C%E7%B1%BB%E5%9E%8B-1.png)

选择SCSI控制器的类型，这里使用“LSI Logic（推荐）”值，然后单击“下一步”按钮。

![第1章 动手部署一台Linux操作系统第1章 动手部署一台Linux操作系统](https://www.linuxprobe.com/wp-content/uploads/2020/05/%E8%AE%BE%E7%BD%AE%E6%8E%A7%E5%88%B6%E5%99%A8%E7%B1%BB%E5%9E%8B.png)

接下来设置虚拟磁盘类型，简单来说就是设置稍后新安装系统的硬盘接口类型。这里我们选择工作中更常使用的SATA接口类型，然后单击“下一步”按钮，如图1-22所示。此处请尽量与老师保持一致，如果选择了IDE与NVMe接口类型的磁盘，则在第6章的实验中磁盘名称不是/dev/sda，这容易让新手产生疑惑。

![第1章 动手部署一台Linux操作系统第1章 动手部署一台Linux操作系统](https://www.linuxprobe.com/wp-content/uploads/2020/05/%E8%AE%BE%E7%BD%AE%E8%99%9A%E6%8B%9F%E7%A3%81%E7%9B%98%E7%B1%BB%E5%9E%8B.png)

由于这是一台全新安装的操作系统，不存在已有数据需要恢复的问题，所以直接选择“创建新虚拟磁盘”单选按钮，然后单击“下一步”按钮，如下图所示。

![第1章 动手部署一台Linux操作系统第1章 动手部署一台Linux操作系统](https://www.linuxprobe.com/wp-content/uploads/2020/05/%E5%88%9B%E5%BB%BA%E6%96%B0%E8%99%9A%E6%8B%9F%E7%A3%81%E7%9B%98.png)

将虚拟机系统的“最大磁盘大小”设置为20.0GB（默认值），这是限定系统能够使用的最大磁盘容量，并不是立即占满这部分空间。如果想让磁盘拥有更好的性能，这里可以选中“立即分配所有磁盘空间”复选框。另外，如果同学们后续要经常移动这台虚拟机的话，可以选中“将虚拟磁盘拆分成多个文件”单选按钮；如果不确定今后是否要经常移动的话，不妨也将虚拟磁盘进行拆分，这对实际操作无任何影响。然后单击“下一步”按钮



![第1章 动手部署一台Linux操作系统第1章 动手部署一台Linux操作系统](https://www.linuxprobe.com/wp-content/uploads/2020/05/%E8%AE%BE%E7%BD%AE%E6%9C%80%E5%A4%A7%E7%A3%81%E7%9B%98%E5%AE%B9%E9%87%8F.png)

设置磁盘文件的名称，这里完全没有必要修改，因此直接单击“下一步”按钮

![第1章 动手部署一台Linux操作系统第1章 动手部署一台Linux操作系统](https://www.linuxprobe.com/wp-content/uploads/2020/05/%E8%AE%BE%E7%BD%AE%E7%A3%81%E7%9B%98%E6%96%87%E4%BB%B6%E5%90%8D%E7%A7%B0-1.png)

当虚拟机的硬件信息在基本设置妥当后，VM安装向导程序会向让我们进行确认。由于还有几处信息需要修改，所以这里单击“自定义硬件”按钮，

![第1章 动手部署一台Linux操作系统第1章 动手部署一台Linux操作系统](https://www.linuxprobe.com/wp-content/uploads/2020/05/%E9%85%8D%E7%BD%AE%E4%BF%A1%E6%81%AF%E6%80%BB%E8%A7%88.png)

单击“CD/DVD(SATA)”选项，在右侧“使用ISO映像文件”下拉列表中找到并选中此前已经下载好的RHEL 8系统文件（即iso结尾的文件），不要解压，直接选中即可

![第1章 动手部署一台Linux操作系统第1章 动手部署一台Linux操作系统](https://www.linuxprobe.com/wp-content/uploads/2020/05/%E9%80%89%E4%B8%ADRHEL-8%E7%B3%BB%E7%BB%9F%E6%98%A0%E5%83%8F%E6%96%87%E4%BB%B6%E8%B7%AF%E5%BE%84-1.png)

顺手把USB控制器、声卡、打印机设备统统移除掉。移掉声卡后可以避免在输入错误后发出提示声音，确保自己在今后的实验中思绪不被打扰。然后单击“确认”按钮

![第1章 动手部署一台Linux操作系统第1章 动手部署一台Linux操作系统](https://www.linuxprobe.com/wp-content/uploads/2020/05/%E6%9C%80%E7%BB%88%E7%9A%84%E8%99%9A%E6%8B%9F%E6%9C%BA%E9%85%8D%E7%BD%AE%E6%83%85%E5%86%B5-2.png)

最终的虚拟机配置情况

![第1章 动手部署一台Linux操作系统第1章 动手部署一台Linux操作系统](https://www.linuxprobe.com/wp-content/uploads/2020/05/%E8%99%9A%E6%8B%9F%E6%9C%BA%E9%85%8D%E7%BD%AE%E6%88%90%E5%8A%9F%E7%9A%84%E7%95%8C%E9%9D%A2-2.png)

当看到如上图所示的界面时，说明虚拟机已经被配置成功。稍微休息一下，接下来准备步入属于您的Linux系统之旅吧。

## 6、安装操作系统

安装RHEL 8或CentOS 8系统时，您的电脑的CPU需要支持VT（Virtualization Technology，虚拟化技术）。这是一种能够让单台计算机分割出多个独立资源区，并让每个资源区按照需要模拟出系统的一项技术，其本质就是通过中间层实现计算机资源的管理和再分配，让系统资源的利用率最大化。

大多数情况下，CPU对VT的支持默认都是开启的，只有当系统安装失败时才需要在物理机的BIOS中手动开启（一般是在物理机开机时多次按下F2或F12键进入BIOS设置界面）

![第1章 动手部署一台Linux操作系统第1章 动手部署一台Linux操作系统](https://www.linuxprobe.com/wp-content/uploads/2020/05/BIOS.png)

在虚拟机管理界面中单击“开启此虚拟机”按钮后数秒就看到RHEL 8系统安装界面了，如下图所示。在界面中，`Test this media & install Red Hat Enterprise Linux 8.0.0和Troubleshooting`的作用分别是校验光盘完整性后再安装以及启动救援模式。此时通过键盘的方向键选择`Install Red Hat Enterprise Linux 8.0.0`选项直接安装Linux系统。

![第1章 动手部署一台Linux操作系统第1章 动手部署一台Linux操作系统](https://www.linuxprobe.com/wp-content/uploads/2020/05/RHEL-8%E7%B3%BB%E7%BB%9F%E5%AE%89%E8%A3%85%E7%95%8C%E9%9D%A2.png)

接下来按回车键后开始加载安装镜像，所需时间大约在20～30秒，请耐心等待

![第1章 动手部署一台Linux操作系统第1章 动手部署一台Linux操作系统](https://www.linuxprobe.com/wp-content/uploads/2020/05/%E5%AE%89%E8%A3%85%E5%90%91%E5%AF%BC%E7%9A%84%E5%88%9D%E5%A7%8B%E5%8C%96%E7%95%8C%E9%9D%A2.png)

选择系统的安装语言后单击Continue按钮，如图1-33所示。

![第1章 动手部署一台Linux操作系统第1章 动手部署一台Linux操作系统](https://www.linuxprobe.com/wp-content/uploads/2020/05/%E9%80%89%E6%8B%A9%E7%B3%BB%E7%BB%9F%E7%9A%84%E5%AE%89%E8%A3%85%E8%AF%AD%E8%A8%80.png)

`INSTALLATION SUMMARY`（安装概要）界面是Linux系统安装所需信息的集合之处，如图1-34所示（需要说明的是，在采用虚拟机安装时，该图就是这个样子，而非作者截图不全）。该界面包含如下内容：`Keyboard`、`Language Support`、`Time & Date、Installation Source`、`Software Selection`、`Installation Destination`、`KDUMP`、`Network & Host Name`、`SECURITY POLICY、System Purpose`。

![第1章 动手部署一台Linux操作系统第1章 动手部署一台Linux操作系统](https://www.linuxprobe.com/wp-content/uploads/2020/05/%E5%AE%89%E8%A3%85%E9%85%8D%E7%BD%AE%E7%95%8C%E9%9D%A2.png)

稳住，不要慌，这里选项虽然多，但并不是全都需要我们手动配置一遍。其中的`Keyboard`和`Language Support`分别指的是键盘类型和语言支持，这两项默认都是英文的，不用修改（除非想换成中文界面）。

我们首先单击`Time & Date`按钮，设置系统的时区和时间。在地图上单击中国境内即可显示出上海的当前时间，确认后单击左上角的`Done`按钮。

上图中的`Installation Source`指的是系统是从哪里获取的。这里默认是我们的光盘镜像文件，所以不用修改。RHEL 8系统的软件模式（SOFTWARE SELECTION）界面可以根据用户的需求来调整系统的基本环境。例如，如果想把Linux系统用作基础服务器、文件服务器、Web服务器或工作站等，那么在系统安装过程中就会额外安装上一些基础软件包，以帮助用户尽快上手。这里首先单击`Software Selection`按钮，进入配置界面

![第1章 动手部署一台Linux操作系统第1章 动手部署一台Linux操作系统](https://www.linuxprobe.com/wp-content/uploads/2020/05/%E8%AE%BE%E7%BD%AE%E7%B3%BB%E7%BB%9F%E6%A8%A1%E5%BC%8F.png)

RHEL 8系统提供6种软件基本环境，依次为`Server with GUI（带图形化的服务器）`、`Server（服务器）`、`Minimal Install（最小化安装）`、`Workstation（工作站）`、`Custom Operating System（自定义操作系统）`和`Virtualization Host（虚拟化主机）`。只要检查当前模式是默认的`Server with GUI`即可，右侧额外的软件包不要选择，可以在后续学习过程中慢慢安装，这样才有乐趣。单击左上角的`Done`按钮。

> 之前看过一个新闻，说是苹果公司某员工在iOS系统的用户说明书末尾加了一句“反正你们也不会去看”。其实这件事情也可以用来调侃部分读者的学习状态，刘遄老师绝不会把没用的知识写到本书中，但就是这样一张如此醒目的截图也总是有读者视而不见，结果采用了Minimal Install单选按钮来安装RHEL 8系统，最终导致很多命令不能执行，服务搭建不成功。请一定留意！
>
> **刘遄老师亲自上课的培训课程视频介绍：****https://www.linuxprobe.com/training**

返回到安装概要界面后，右侧第一个`Installation Destination`指的是想把系统安装到哪个硬盘。此时仅仅是让我们进行确认，不需要进行任何修改，单击左上角的`Done`按钮

![第1章 动手部署一台Linux操作系统第1章 动手部署一台Linux操作系统](https://www.linuxprobe.com/wp-content/uploads/2020/05/%E8%AE%BE%E7%BD%AE%E5%AE%89%E8%A3%85%E7%9B%AE%E6%A0%87.png)

> 读者可能会有这样的疑问：“为什么我们不像其他Linux图书那样，讲一下手动分区的方法呢？”原因很简单，因为Linux系统根据FHS（Filesystem Hierarchy Standard，文件系统层次标准）为不同的目录定义了相应的不同功能，这部分内容会在第6章详细介绍。通过刘遄老师最近这几年的教学经验来看，即便现在写出了操作步骤，各位读者大多也只是点点鼠标，并不能真正理解其中的原理，效果不一定好，更何况在接下来的实验中，手动分区相对于自动分区来说也没有明显的好处。所以读者大可不必担心学不到，我们图书的章节规划是非常科学的。

接下来进入`KDUMP`服务的配置界面。`KDUMP`服务用于收集系统内核崩溃数据，但是考虑到短时间内我们并不打算调试系统内核参数，所以这里建议取消选中`Enable kdump`复选框，这可以节省约160MB物理内存。随后单击左上角的Done按钮，![第1章 动手部署一台Linux操作系统第1章 动手部署一台Linux操作系统](https://www.linuxprobe.com/wp-content/uploads/2020/05/%E5%85%B3%E9%97%ADKdump%E6%9C%8D%E5%8A%A1.png)

接下来进入`NETWORK & HOST NAME`配置界面。首先单击右上角的开关按钮，设置成ON（开启）状态。然后在左下角将Host Name（主机名称）修改为linuxprobe.com并单击右侧的Apply按钮进行确认，这样可以保证后续的命令提示符前缀一致，以免产生学习上的歧义。最后单击左上角的Done按钮

![第1章 动手部署一台Linux操作系统第1章 动手部署一台Linux操作系统](https://www.linuxprobe.com/wp-content/uploads/2020/05/%E9%85%8D%E7%BD%AE%E7%BD%91%E7%BB%9C-1.png)

图1-38 配置网络信息

返回到安装概要界面，剩下的`SECURITY POLICY`与`System Purpose`暂时不需要配置。单击界面右下侧的`Begin Installation`按钮开始正式安装操作系统，如图1-39所示。整个安装过程大约持续20～30分钟。![第1章 动手部署一台Linux操作系统第1章 动手部署一台Linux操作系统](https://www.linuxprobe.com/wp-content/uploads/2020/05/%E8%BF%9B%E5%85%A5%E5%88%B0%E5%AE%89%E8%A3%85%E7%95%8C%E9%9D%A2.png)

在系统安装过程中，单击`Root Password`按钮，设置管理员的密码，如图1-40所示。这个操作非常重要，密码马上会在登录系统时用到。这里需要多说一句，当在虚拟机中做实验的时候，密码无所谓强弱，但在生产环境中一定要让root管理员的密码足够复杂，否则系统将面临严重的安全问题。

![第1章 动手部署一台Linux操作系统第1章 动手部署一台Linux操作系统](https://www.linuxprobe.com/wp-content/uploads/2020/05/%E8%AE%BE%E7%BD%AE%E7%AE%A1%E7%90%86%E5%91%98%E5%AF%86%E7%A0%81.png)

继续单击`User Creation`按钮，为RHEL 8系统创建一个本地的普通用户。该账户的名字叫`linuxprobe`，密码统一设置为`redhat`，这个账户将会在第5章使用到。确认后单击`Done`按钮

![第1章 动手部署一台Linux操作系统第1章 动手部署一台Linux操作系统](https://www.linuxprobe.com/wp-content/uploads/2020/05/%E8%AE%BE%E7%BD%AE%E6%99%AE%E9%80%9A%E7%94%A8%E6%88%B7%E5%AF%86%E7%A0%81.png)

安装过程大约持续20～30分钟。一切完成后单击右下角的Reboot按钮重启系统，让之前配置的参数都能立即生效

![第1章 动手部署一台Linux操作系统第1章 动手部署一台Linux操作系统](https://www.linuxprobe.com/wp-content/uploads/2020/05/%E5%AE%89%E8%A3%85%E5%AE%8C%E6%AF%95%E5%90%8E%E7%AD%89%E5%BE%85%E9%87%8D%E5%90%AF.png)

重启系统后将看到初始化界面。此时还剩最后两个选项需要我们进行确认，即`License Information和Subscription Manager`

![第1章 动手部署一台Linux操作系统第1章 动手部署一台Linux操作系统](https://www.linuxprobe.com/wp-content/uploads/2020/05/%E5%AE%89%E8%A3%85%E6%94%B6%E5%B0%BE%E5%B7%A5%E4%BD%9C-1024x614.png)

我们先说一下`Subscription Manager`。它指的是红帽产品订阅服务，是红帽公司的一项收费服务，我们暂时不需要，所以也就不用单击了。直接单击`License Information`按钮进入红帽产品许可信息界面，如图1-44所示。该界面中的内容大意是版权说明、双方责任、法律风险等。没什么好犹豫的，直接选中“`I accept the license agreement`”复选框，然后单击左上角的`Done`按钮即可。

![第1章 动手部署一台Linux操作系统第1章 动手部署一台Linux操作系统](https://www.linuxprobe.com/wp-content/uploads/2020/05/%E6%8E%A5%E5%8F%97%E7%B3%BB%E7%BB%9F%E8%AE%B8%E5%8F%AF-1024x614.png)

返回到初始化界面，单击`FINISH CONFIGURATION`按钮进行确认后，系统将会进行最后一轮的重启。在大约2分钟的等待时间过后，便能够看到如下图所示的登录界面了。为了保证在学习到第5章前不受权限的牵绊，请同学们务必单击用户下方的“Not listed?”，手动输入管理员账号（root）以及所设置的密码

选择用其他用户登录

![第1章 动手部署一台Linux操作系统第1章 动手部署一台Linux操作系统](https://www.linuxprobe.com/wp-content/uploads/2020/05/%E9%80%89%E6%8B%A9%E5%85%B6%E4%BB%96%E7%94%A8%E6%88%B7-1024x614.png)

输入管理员账号

![第1章 动手部署一台Linux操作系统第1章 动手部署一台Linux操作系统](https://www.linuxprobe.com/wp-content/uploads/2020/05/%E8%BE%93%E5%85%A5%E7%AE%A1%E7%90%86%E5%91%98%E5%90%8D%E7%A7%B0-1024x614.png)

单击Sign In按钮，顺利进入到系统中，终于看到了欢迎界面。此时会有一系列的非必要性询问，例如语言、键盘、输入来源等信息，一路单击Next按钮即可。最终将会看到RHEL 8系统显示的欢迎信息，如图1-48所示。

![第1章 动手部署一台Linux操作系统第1章 动手部署一台Linux操作系统](https://www.linuxprobe.com/wp-content/uploads/2020/05/%E8%BE%93%E5%85%A5%E7%AE%A1%E7%90%86%E5%91%98%E5%AF%86%E7%A0%81-1024x614.png)

图1-47 输入管理员密码

![第1章 动手部署一台Linux操作系统第1章 动手部署一台Linux操作系统](https://www.linuxprobe.com/wp-content/uploads/2020/05/%E5%BC%80%E5%A7%8B%E6%97%B6%E4%BD%BF%E7%94%A8RHEL%E7%B3%BB%E7%BB%9F-1024x614.png)

单击“`Start Using Red Hat Enterprise Linux`”按钮便能进入到系统桌面了。至此，便完成了RHEL 8系统的全部安装和部署工作。

准备开始学习Linux系统吧。

## 7.系统初始化进程

Linux系统的开机过程是这样的，即先从BIOS开始，然后进入Boot Loader，再加载系统内核，然后内核进行初始化，最后启动初始化进程。初始化进程作为Linux系统启动后的第一个正式服务，它需要完成Linux系统中相关的初始化工作，为用户提供合适的工作环境。同学们可以将初始化进程粗犷地理解成从我们按下开机键到看见系统桌面的这个过程。初始化进程完成了一大半工作。

红帽RHEL 7/8系统替换掉了熟悉的初始化进程服务System V init，正式采用全新的systemd初始化进程服务。原本以为这对大家的日常使用影响不大，但许多服务管理命令都被替换了，因此如果您之前学习的是RHEL 5或RHEL 6系统，可能真有点不习惯。

Linux系统在启动时要进行大量的初始化工作，比如挂载文件系统和交换分区、启动各类进程服务等，这些都可以看作是一个一个的单元（unit），systemd用目标（target）代替了System V init中运行级别的概念，这两者的区别如下表所示。

| System V init运行级别 | systemd目标名称   | systemd 目标作用 |
| --------------------- | ----------------- | ---------------- |
| 0                     | poweroff.target   | 关机             |
| 1                     | rescue.target     | 救援模式         |
| 2                     | multi-user.target | 多用户的文本界面 |
| 3                     | multi-user.target | 多用户的文本界面 |
| 4                     | multi-user.target | 多用户的文本界面 |
| 5                     | graphical.target  | 多用户的图形界面 |
| 6                     | reboot.target     | 重启             |
| emergency             | emergency.target  | 救援模式         |



如果想要将系统默认的运行目标修改为“多用户的文本界面”模式，可直接用ln命令把多用户模式目标文件链接到/etc/systemd/system/目录：

```bash
[root@linuxprobe ~]# ln -sf /lib/systemd/system/multi-user.target /etc/systemd/system/default.target
```

如果有读者之前学习过RHEL 5/6系统，或者已经习惯使用service、chkconfig等命令来管理系统服务，那么现在就比较郁闷了，因为在RHEL 7/8系统中是使用systemctl命令来管理服务的。您可以先大致了解一下，后续章节中会经常用到它们。

服务的启动、重启、停止、重载、查看状态等常用命令

| 老系统命令           | 新系统命令             | 作用                           |
| -------------------- | ---------------------- | ------------------------------ |
| service sshd start   | systemctl start sshd   | 启动服务                       |
| service sshd restart | systemctl restart sshd | 重启服务                       |
| service sshd stop    | systemctl stop sshd    | 停止服务                       |
| service sshd reload  | systemctl reload sshd  | 重新加载配置文件（不终止服务） |
| service sshd status  | systemctl status sshd  | 查看服务状态                   |

服务开机启动、不启动、查看各级别下服务启动状态等常用命令

| 老系统命令         | 新系统命令                            | 作用                               |
| ------------------ | ------------------------------------- | ---------------------------------- |
| chkconfig sshd on  | systemctl enable sshd                 | 开机自动启动                       |
| chkconfig sshd off | systemctl disable sshd                | 开机不自动启动                     |
| chkconfig sshd     | systemctl is-enabled sshd             | 查看特定服务是否为开机自启动       |
| chkconfig --list   | systemctl list-unit-files --type=sshd | 查看各个级别下服务的启动与禁用情况 |

## 8、重置root密码

忘记Linux系统密码的事情也很常见。不过不用慌，只需简单几步就可以完成密码的重置工作。

重启Linux系统主机并出现引导界面时，按下键盘上的e键进入内核编辑界面，如下所示

![第1章 动手部署一台Linux操作系统第1章 动手部署一台Linux操作系统](https://www.linuxprobe.com/wp-content/uploads/2020/05/Linux%E7%B3%BB%E7%BB%9F%E7%9A%84%E5%BC%95%E5%AF%BC%E7%95%8C%E9%9D%A2.png)

在linux参数这行的最后面追加rd.break参数，然后按下Ctrl + X组合键运行修改过的内核程序，如下图所示

![第1章 动手部署一台Linux操作系统第1章 动手部署一台Linux操作系统](https://www.linuxprobe.com/wp-content/uploads/2020/05/%E5%86%85%E6%A0%B8%E4%BF%A1%E6%81%AF%E7%9A%84%E7%BC%96%E8%BE%91%E7%95%8C%E9%9D%A2.png)

大约30秒过后，系统会进入紧急救援模式，如下图所示

![第1章 动手部署一台Linux操作系统第1章 动手部署一台Linux操作系统](https://www.linuxprobe.com/wp-content/uploads/2020/05/Linux%E7%B3%BB%E7%BB%9F%E7%9A%84%E7%B4%A7%E6%80%A5%E6%95%91%E6%8F%B4%E6%A8%A1%E5%BC%8F-1024x614.png)

然后依次输入以下命令，再连续按下两次Ctrl + D组合键盘来退出并重启。等待系统再次重启完毕后便可以使用新密码登录Linux系统。这一系列命令的执行效果如下所辖

```shell
mount -o remount,rw /sysroot
chroot /sysroot
passwd
touch /.autorelabel
```

![第1章 动手部署一台Linux操作系统第1章 动手部署一台Linux操作系统](https://www.linuxprobe.com/wp-content/uploads/2020/05/%E9%87%8D%E7%BD%AELinux%E7%B3%BB%E7%BB%9F%E7%9A%84%E7%AE%A1%E7%90%86%E5%91%98%E5%AF%86%E7%A0%81.png)

