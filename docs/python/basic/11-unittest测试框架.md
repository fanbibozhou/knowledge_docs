# 11-unittest测试框架

## unittest介绍

`Unitest`是python自带的单元测试框架，它是一种强大的工具，能够有效地编写和执行单元测试。unittes提供了完整的测试结构，支持自动化测试的执行，**能够对测试用例进行组织，并且提供了丰富的断言方法和验证函数**等功能。最终，`unittest`会生成详细的测试报告，这个框架非常简单且易于使用。

## <font style="color:rgb(35, 38, 59);">unittest框架及原理</font>

### unittest框架的组成部分

unittest<font style="color:rgb(35, 38, 59);">框架</font>主要由以下几个核心组成

🍊`TestCase`：测试用例，`unittest`中提供了一个基本类`TestCase`，可以用来创建新的测试用例，一个`TestCase`的实例就是一个测试用例；`unittest`中测试用例方法都是以`test_`开头的，且执行顺序会按照方法名的ASCII值排序。

🍋`TestSuite`：测试套件，将需要一起执行的测试用例集中放到一块执行，相当于一个篮子。我们可以使用`TestLoader`来加载测试用例到测试套件中。

🍆`TestLoder`：测试加载器，用于将测试用例加载到测试套件的工具

🍏`TestRunner`：测试运行器，用来执行测试用例的，并返回测试用例的执行结果。它还可以用图形或者文本接口，把返回的测试结果更形象的展现出来，如：`HTMLTestRunner`。

🍅`Fixture`：测试夹具，用于测试用例环境的搭建和销毁。即用例测试前准备环境的搭建（`SetUp`前置条件），测试后环境的还原（`TearDown`后置条件），比如测试前需要登录获取`token`等就是测试用例需要的环境，运行完后执行下一个用例前需要还原环境，以免影响下一条用例的测试结果。

### unittest的工作流程

首先，我们需要编写一个或多个继承自`unittest.TestCase`的测试用例类，其中每个测试函数都是一个独立的测试用例

然后，使用`TestLoader`加载测试用例，并将他们组织成`TestSuite`对象

最后，使用`TestRunner`运行`TestSuite`中的测试用例，并输出测试结果

![](https://gitee.com/iscn/md_images/raw/master/%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F/1706932075873-11486dec-21c9-45ec-9950-f3684fa97104.png)

### unittest编写步骤与规范

- 测试文件（.py）在使用前需要先导包：`import unittest`

- 创建的测试类，必须继承`unittest.TestCase`，所有自定义的单元测试类都要继承它，作为基类。

- 重写 `setUp` 和 `tearDown` 方法，用于初始化和清理测试环境（如果有必要）。
- 定义测试函数，函数名以 `test_ `开头，这样才能被识别并执行。

- 在测试函数中使用断言来判断测试结果是否符合预期。

- 运行用例

## TestCase(测试用例)

`TestCase` 是一个代码文件，在代码文件中来书写真正的用例代码，我们创建一个testLogin.py的测试文件来说熟悉一下。

```python
"""
    学习TestCase(测试用例)的用法
"""

# 1、导包
import unittest

# 2、自定义测试类，并继承继承unittest模块中的TestCase类
class TestLogin(unittest.TestCase):
	# 3、书写测试方法，即用例代码
	# 书写要求：必须以test_开头
	def test_login1(self):
		print('登录测试1')

	def test_login2(self):
		print('登录测试2')

# 4. 执行用例(方法)
# 4.1 将光标放在 类名的后边 运行，会执行类中的所有的测试方法
# 4.2 将光标放在 方法名的后边 运行，只执行当前的方法
```

执行结果如下：

![](https://gitee.com/iscn/md_images/raw/master/%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F/1706934026274-fc56c844-181c-4f21-b939-44bc29b07273.png)

## <font style="color:rgb(35, 38, 59);">Fixture（测试夹具）</font>

测试夹具是一种在某些特定情况下，会自动执行的代码结构。`unittest`为我们提供了几种级别的方法，分别是方法级别、类级别以及模块级别

### 方法级别:setUp()和tead Down()

方法级别会在每个测试方法（用例代码）执行前后都会自动调用的结构。用`setUp()`和`tearDown()`

+ `setUp()`,每个测试方法执行之前都会执行（初始化操作）
+ `tearDown()`，每个测试方法执行之后都会执行（释放资源）

打个栗子，我们在执行一些测试前需要先登录和访问网页，执行完这个测试后又需要还原到刚开始的状态，以免影响后面的测试结果。

```python
# 1、导包
import unittest

# 2、自定义测试类，并继承继承unittest模块中的TestCase类
class TestDemo(unittest.TestCase):
    # 3、书写测试方法，即用例代码
    # 书写要求：必须以test_开头

    # 测试方法执行前的初始化
    def setUp(self):
        print('测试方法执行前的初始化')

    def tearDown(self):
        print('测试方法结束后的资源释放')

    def test_login1(self):
        print('测试方法1')

    def test_login2(self):
        print('测试方法2')

# 4. 执行用例(方法)
# 4.1 将光标放在 类名的后边 运行，会执行类中的所有的测试方法
# 4.2 将光标放在 方法名的后边 运行，只执行当前的方法

```

执行结果如下，可见我们定义的`setUp`和`tearDown`方法在两个方法运行前后都进行了调用

![](https://gitee.com/iscn/md_images/raw/master/%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F/1706938476190-5126ead3-468f-44a8-92b0-6b3cab395d8f.png)

### 类级别:setUpClass()和teadDownClass()

在每个测试类中所有方法执行前后都会自动调用的结构（整个类中，不管有多少测试方法，只执行一次）

+ `setUpClass()`,每个测试方法执行之前都会执行（初始化操作）
+ `tearDownClass()`，每个测试方法执行之后都会执行（释放资源）

打个例子，每个方法运行前都执行一次登录和释放资源有点烦琐，可以定义一个类级别的执行一次机可

```python
# 1、导包
import unittest

# 2、自定义测试类，并继承继承unittest模块中的TestCase类
class TestDemo(unittest.TestCase):
    # 3、书写测试方法，即用例代码
    # 书写要求：必须以test_开头

    # 类级别的方法
    def setUpClass(self):
        print('测试方法执行前的初始化')

    def tearDownClass(self):
        print('测试方法结束后的资源释放')

    def test_login1(self):
        print('测试方法1')

    def test_login2(self):
        print('测试方法2')

# 4. 执行用例(方法)
# 4.1 将光标放在 类名的后边 运行，会执行类中的所有的测试方法
# 4.2 将光标放在 方法名的后边 运行，只执行当前的方法

```

如果运行上方的代码，会发现有如下报错信息：

![](https://gitee.com/iscn/md_images/raw/master/%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F/1706939066407-6b1c4319-6bc9-4aa6-bd0c-e37fe95439f9.png)

它提示我们`setUpClass`方法传入的参数有误，这是因为上方代码中，我们传入的是self是对象级别。而`setUpClass`方法是一个类方法，我们**<font style="color:#7E45E8;">需要将self更改为cls，并且在方法上方加一个@classmethod修饰</font>**，提醒解释器这是一个类方法。

```python
# 1、导包
import unittest

# 2、自定义测试类，并继承继承unittest模块中的TestCase类
class TestDemo(unittest.TestCase):
    # 3、书写测试方法，即用例代码
    # 书写要求：必须以test_开头

    # 类级别的方法
    @classmethod
    def setUpClass(cls):
        print('测试类执行前的初始化')

    @classmethod
    def tearDownClass(cls):
        print('测试类结束后的资源释放')

    def test_login1(self):
        print('测试方法1')

    def test_login2(self):
        print('测试方法2')

# 4. 执行用例(方法)
# 4.1 将光标放在 类名的后边 运行，会执行类中的所有的测试方法
# 4.2 将光标放在 方法名的后边 运行，只执行当前的方法

```

执行后，可以看见setUpClass和tearDownClass方法只执行了一次

![](https://gitee.com/iscn/md_images/raw/master/%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F/1706939413611-c0a8027d-ec9c-4db2-b285-fa245c50bc1f.png)

### 模块级别:setUpModule()和teadDownModule()

模块级别的需要写在类的外边定义函数即可

```python
# 模块级别的需要写在类的外边定义函数即可
# 代码文件之前
def setUpModule():
	pass
# 代码文件之后
def tearDownModule():
	pass
```

##  unittest断言

什么是断言呢？断言就是让程序代替人工自动判断预期结果和实际结果是否相符。且断言的结果只有两种：**True（用例通过**）和**False（用例不通过）**

<font style="color:rgb(35, 38, 59);">在python基础中，有一个`assert`断言，使用方法比较简单，即</font>**<font style="color:rgb(216, 59, 100);background-color:rgb(249, 242, 244);">assert 表达式, 提示信息</font>**<font style="color:rgb(35, 38, 59);">，而unittest框架中断言的方法还是很多的。下面介绍几种常用的断言方法。</font>

> 在unittest中使用断言，都需要通过`self.断言方法`来试验
>
> 下面的方法中每个都有一个msg参数，如果指定msg参数的值，则将该信息作为失败的错误信息返回

| **<font style="color:rgb(34, 34, 34);">断言方法</font>**     | **<font style="color:rgb(34, 34, 34);">断言描述</font>**     |
| :----------------------------------------------------------- | :----------------------------------------------------------- |
| <font style="color:rgb(34, 34, 34);">assertEqual(a, b,msg=None)</font> | <font style="color:rgb(34, 34, 34);">验证a==b,不等则fail</font> |
| <font style="color:rgb(34, 34, 34);">assertNotEqual(a, b, msg=None)</font> | <font style="color:rgb(34, 34, 34);">验证a!=b,相等则fail</font> |
| <font style="color:rgb(34, 34, 34);">assertTrue(expr, msg=None)</font> | <font style="color:rgb(34, 34, 34);">验证expr是ture，如果是false，则fail</font> |
| <font style="color:rgb(34, 34, 34);">assertFalse(expr, msg=None)</font> | <font style="color:rgb(34, 34, 34);">验证expr是false，如果是ture，则fail</font> |
| <font style="color:rgb(34, 34, 34);">assertIs(a, b, msg=None)</font> | <font style="color:rgb(34, 34, 34);">验证a、b是同一个对象，不是则fail</font> |
| <font style="color:rgb(34, 34, 34);">assertIsNot(a, b, msg=None)</font> | <font style="color:rgb(34, 34, 34);">验证a、b不是同一个对象，是则fail</font> |
| <font style="color:rgb(34, 34, 34);">assertIsNone(expr, msg=None)</font> | <font style="color:rgb(34, 34, 34);">验证expr是Node，不是则fail</font> |
| <font style="color:rgb(34, 34, 34);">assertIsNotNone(expr, msg=None)</font> | <font style="color:rgb(34, 34, 34);">验证exprb不是Node，是则fail</font> |
| <font style="color:rgb(34, 34, 34);">assertIn(a, b, msg=None)</font> | <font style="color:rgb(34, 34, 34);">验证a是b的子串，不是则fail</font> |
| <font style="color:rgb(34, 34, 34);">assertNotIn(a, b, msg=None)</font> | <font style="color:rgb(34, 34, 34);">验证a不是b的子串，是则fail</font> |
| <font style="color:rgb(34, 34, 34);">assertIsInstance(a, b, msg=None)</font> | <font style="color:rgb(34, 34, 34);">验证a是b的实例，不是则fail</font> |
| <font style="color:rgb(34, 34, 34);">assertNotIsInstance(a, b, msg=None)</font> | <font style="color:rgb(34, 34, 34);">验证a不是b的实例，是则fail</font> |


下面运行几个示例看看，我们先准备一个login类做测试

```python
def login(username,password):
    if username == 'test' and password == '123456':
        return '登录成功'
    elif username != 'test' or password != '123456':
        return '用户名或密码错误'
```

看一下我们的测试类

```python
 
# 1、导包
import unittest
from login import login

# 2、自定义测试类，并继承继承unittest模块中的TestCase类
class TestDemo(unittest.TestCase):

    # 3、书写测试方法，即用例代码
    def test_success(self):
        # 正确的用户名和密码： test，123456，登录成功
        print('登录成功测试')
		# 断言
        self.assertEqual('登录成功', login('test', '123456'), msg='验证不通过')

    def test_login2(self):
        # 错误的用户名和密码： admin，123456，登录成功
        print('登录不成功测试')
		# 断言
        self.assertEqual('用户名或密码错误', login('admin', '123456'), msg='验证不通过')

```

执行结果如下：

![](https://gitee.com/iscn/md_images/raw/master/%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F/1706957583556-a0ef7e9e-948f-4bf4-921d-641a16f81808.png)

> 其他断言方法页使用也一样就不一一展示了，
>
> <font style="color:rgb(35, 38, 59);">如果断言失败即不通过就会抛出一个</font>**<font style="color:rgb(216, 59, 100);background-color:rgb(249, 242, 244);">AssertionError</font>**<font style="color:rgb(35, 38, 59);">断言错误，成功则标识为通过，</font>

## TestSuite(测试套件)和TestLoader(测试加载)  

`unittest.TestSuite()`类表示一个测试用例集，把需要执行的用例类或模块存到一起，常用的方法如下：

+ 🍊 `unittest.TestSuite()`
  - **<font style="color:rgb(216, 59, 100);background-color:rgb(249, 242, 244);">addTest()</font>**<font style="color:rgb(35, 38, 59);">：添加单个测试用例方法</font>
  - **<font style="color:rgb(216, 59, 100);background-color:rgb(249, 242, 244);">addTest([..])</font>**<font style="color:rgb(35, 38, 59);">：添加多个测试用例方法，方法名存在一个列表</font>
+ 🍊 `unittest.TestLoader()`
  - **<font style="color:rgb(216, 59, 100);background-color:rgb(249, 242, 244);">loadTestsFromTestCase(测试类名)</font>**<font style="color:rgb(35, 38, 59);">：添加一个测试类</font>
  - **<font style="color:rgb(216, 59, 100);background-color:rgb(249, 242, 244);">loadTestsFromModule(模块名)</font>**<font style="color:rgb(35, 38, 59);">：添加一个模块</font>
  - **<font style="color:rgb(216, 59, 100);background-color:rgb(249, 242, 244);">discover(测试用例的所在目录)</font>**<font style="color:rgb(35, 38, 59);">：指定目录去加载，会自动寻找这个目录下所有符合命名规则的测试用例</font>

具体实现步骤如下：

> 1.导包(unittest) 
>
> 2.实例化(创建对象)套件对象、测试加载对象
>
> 3.使用套件对象添加用例方法 

示例代码如下：

```python
import unittest
import test_login

# 第一步，实例化(创建对象)套件对象，创建一个测试套件
suite = unittest.TestSuite()

# 第二步：将测试用例，加载到测试套件中
# 方式1：添加单条测试用例
# cese = test_login.TestDemo("test_success") # 创建一个用例对象，
# suite.addTest(cese)     # 添加用例到测试套件中

# 方式2：添加多条测试用例
# cese1 = test_login.TestDemo("test_success")
# cese2 = test_login.TestDemo("test_error")
# 添加用例到测试套件中
# suite.addTest([cese1, cese2])

# 方式3：添加一个测试用例类
# 创建一个加载对象
# loader = unittest.TestLoader()
# suite.addTest(loader.loadTestsFromTestCase(test_login.TestDemo))

# 方式4：添加一个模块
# 创建一个加载对象
loader = unittest.TestLoader()
suite.addTest(loader.loadTestsFromModule(test_login))

# 方式5：指定测试用例的所在的目录路径进行加载
# 创建一个加载对象
loader = unittest.TestLoader()
# 指定测试用例的所在的目录路径进行加载
suite.addTest(loader.discover(f"d:\test\test01"))

```

通常使用方式4和5比较多，根据实际情况来运行，其中方式5，还可以自定义匹配跪奏，默认是寻找目录下的`test*.py`文件

## TestRunner(执行用例)

TestRunner是用于执行和输出测试结果的组件。常用的运行器有unittest.TextTestRunner、HTMLTestRunner和XMLTestRunner

+ `unittest.TextTestRunner：`这是 `unittest` 框架中默认的测试运行器，会在命令行输出测试结果。通过调用 `run()` 方法运行测试套件，并将测试结果打印到控制台。
+ `HTMLTestRunner`：这是一个第三方库，能够生成漂亮的 HTML 测试报告，需要进行安装。使用的前提就是搜索并下载 HTMLTestRunner.py，下载完后放在python的安装目录下的\Lib目录下即可。
+ `XMLTestRunner`：这是另一个第三方库，用于生成 XML 格式的测试报告。

> 你也可以自定义测试运行器。继承 `unittest.TestRunner` 类并实现 `run()` 方法，以创建自己的测试运行器。

```python
from HTMLTestRunner import HTMLTestRunner
# 创建测试运行程序启动器
# 写法一
# runner = HTMLTestRunner(stream = open("report.html", "wb"), # 打开一个报告文件，将句柄传给stream
#                         tester = "测试人员",    # 报告中显示的测试人员
#                         description = "报告描述", # 报告的描述信息
#                         title = "自动化测试报告")   # 报告的标题
# runner.run()
# 写法二
with open('test_report.html', 'wb') as report_file:
    runner = HTMLTestRunner(stream=report_file, title='报告描述', description='自动化测试报告')
    result = runner.run(suite)
```

运行结果如下：

![](https://gitee.com/iscn/md_images/raw/master/%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F/1706963381814-4e6a2f8f-e7b4-4539-ae18-82ac900a0c76.png)

## 跳过

对于一些未完成的或者不满足测试条件的测试函数和测试类，不想执行，可以使用装饰器完成 跳过操作，跳过的装饰器主要有以下两种

+  `@unittest.skip('跳过的原因')`  ： 直接将测试函数标记成跳过  
+  `@unittest.skipIf(判断条件, '跳过原因')`  ： 根据条件判断测试函数是否跳过 , 判断条件成立, 跳过  

```python
import unittest
# version = 30
version = 29

class TestDemo(unittest.TestCase):
	@unittest.skip('没有什么原因，就是不想执行')
	def test_0(self):
		print('测试方法1')
	@unittest.skipIf(version>=30,'版本大于等于30，不用测试')
	def test_2(self):
		print('测试方法2')
	def test_3(self):
		print('测试方法3')
```

