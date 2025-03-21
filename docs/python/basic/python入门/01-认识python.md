# 01-认识python

## 1、python是什么？

Python是一种广泛使用的高级编程语言，由**吉多·范罗苏姆**（Guido van Rossum）于1991年开发。它的设计哲学强调代码的可读性和简洁性，使用缩进代替大括号来表示代码块，使得Python的语法简洁明了，容易学习和理解。

Python具有以下几个主要特点：

- **易于学习和使用**：Python的语法简单，适合初学者入门。它有丰富的文档和社区支持，学习曲线较为平缓。
- **跨平台**：Python可以在多种操作系统上运行，包括Windows、MacOS和Linux等。
- **面向对象和函数式编程**：Python支持面向对象编程（OOP）和函数式编程（FP），并允许两者混合使用。
- **丰富的标准库和第三方库**：Python有一个庞大的标准库，提供了各种常见任务的实现，如文件操作、正则表达式、网络通信等。同时，Python有许多第三方库可用于数据分析（如NumPy、Pandas）、机器学习（如TensorFlow、scikit-learn）、Web开发（如Django、Flask）等领域。
- **动态类型和自动内存管理**：Python是动态类型语言，变量的类型可以在运行时确定。此外，它提供自动内存管理和垃圾回收机制。
- **广泛应用**：Python被广泛应用于Web开发、数据科学、人工智能、自动化脚本、网络编程、科学计算等领域。

一个简单的Python代码示例如下：

```python
# 输出Hello, World!
print("Hello, World!")
```

如果你是初学者，Python是一个非常好的选择，因其语法简洁且有丰富的资源可以帮助你学习。

## 2、什么时候不建议用Python

因为Python是解释型语法，所以它的性能相较于java和c这样的编译型语言较差。因此，一些影响性能的功能可以使用 C/C++/JAVA/GO（GO 是一种新语言，写起了像 Python，性能像 C）去开发。 不过，不用担心 Python 解释器会越来越快

## 3、如何使用Python



工欲善其事必先利其器，要使用Python就需要先准备相对应的环境，才能让我们的python程序在上面运行。

### 3.1Python下载和配置

安装Python的过程相当简单

**第一步：进入python官网（https://www.python.org/）下载对应版本的安装包（本文以3.10.6版本为例）**

![image-20241110210230473](https://gitee.com/iscn/md_images/raw/master/python/image-20241110210230473.png)

进入官网，点击Downloads并选择对应的操作系统，进入下载页面，根据机器（64或32位）或所需版本点击下载。

![image-20241110210601319](https://gitee.com/iscn/md_images/raw/master/python/python%E4%B8%8B%E8%BD%BD%E7%89%88%E6%9C%AC%E5%8F%B7.png)

下载后得到一个exe的安装包

**第二步：双击exe进行安装**

双击下载的exe安装包运行安装。选择Customize installation自定义安装路径，记得勾选下方两个选项

![image-20241110211157538](https://gitee.com/iscn/md_images/raw/master/python/%E5%AE%89%E8%A3%85python%E9%85%8D%E7%BD%AE.png)

**第三步：验证是否安装成功**

第二步安装完成后，可以通过按下`Win + R`键，输入`cmd`打开命令提示符，输入`python --version`来检查Python是否安装成功。如果返回`Python 3.10.6`，则表示安装成功。

![image-20241110211457939](https://gitee.com/iscn/md_images/raw/master/python/%E9%AA%8C%E8%AF%81python%E7%89%88%E6%9C%AC.png)

> **注意事项和常见问题解决方法：**
>
> - ‌**系统兼容性**‌：确保你的操作系统支持Python 3.10.6。例如，3.9版本以上的Python无法在Windows 7上安装。
> - ‌**多版本共存**‌：如果你的电脑上已经安装了其他版本的Python，可以选择使用‌[Miniconda](https://www.baidu.com/s?word=Miniconda&sa=re_dqa_generate_ld)来管理多个Python版本，或者卸载现有版本后重新安装3.10.6。
> - ‌**环境变量配置**‌：在安装过程中，确保正确设置环境变量，以便在命令行中直接使用Python。
> - ‌**权限问题**‌：在安装过程中，如果遇到权限问题，可以尝试以管理员身份运行安装程序。

## 4 python解释器

### 4.1 交互模式

我们在终端（cmd）中输入python后，解释器在*交互模式（interactive mode）* 中运行。在这种模式中，会显示*主提示符*，提示输入下一条指令，主提示符通常用三个大于号（`>>>`）表示；输入连续行时，显示*次要提示符*，默认是三个点（`...`）。进入解释器时，首先显示欢迎信息、版本信息、版权声明，然后才是提示符：

```python
C:\Users\86188>python
Python 3.10.6 (tags/v3.10.6:9c7b4bd, Aug  1 2022, 21:53:49) [MSC v.1932 64 bit (AMD64)] on win32
Type "help", "copyright", "credits" or "license" for more information.
>>>
```

输入多行架构的语句时，要用连续行。以 [`if`] 为例：

```python
>>> the_world_is_flat = True
>>> if the_world_is_flat:
...     print("Be careful not to fall off!")
...
Be careful not to fall off!
```

### 4.2 解释器的运行环境

默认情况下，Python 源码文件的编码是 UTF-8。这种编码支持世界上大多数语言的字符，可以用于字符串字面值、变量、函数名及注释 —— 尽管标准库只用常规的 ASCII 字符作为变量名或函数名，可移植代码都应遵守此约定。要正确显示这些字符，编辑器必须能识别 UTF-8 编码，而且必须使用支持文件中所有字符的字体。

如果不使用默认编码，则要声明文件的编码，文件的*第一*行要写成特殊注释。句法如下：

```bash
# -*- coding: encoding -*-
```

其中，*encoding* 可以是 Python 支持的任意一种 [`codecs`]。

比如，声明使用 Windows-1252 编码，源码文件要写成：

```shell
# -*- coding: cp1252 -*-
```

*第一行* 的规则也有一种例外情况，源码以 [UNIX "shebang" 行] 开头。此时，编码声明要写在文件的第二行。例如：

```bash
#!/usr/bin/env python3
# -*- coding: cp1252 -*-
```

## 总结作业：

1、python是做什么的？

2、下载并安装python解释器

3、交互模式输出“世界以痛吻我，而我报之以歌”