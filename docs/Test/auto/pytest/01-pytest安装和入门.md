# 01-pytest安装和入门

## 1.1、pytest简介

**什么是pytest?**

`pytest`是一个非常成熟的`python`的单元框架，比`unittest`更灵活。 

`pytest`可以和`selenium`，`requests`，`appium`结合实现`web`自动化，接口自动化，`app`自动化。 

`pytest`可以实现测试用例的跳过以及reruns失败用例重试。 

`pytest`可以和`allure`生成非常美观的测试报告。 

`pytest`可以和`Jenkins`持续集成。 

`pytest`有很多非常强大的插件，并且这些插件能够实现很多的实用的操作。

```python
pytest 常用插件
pytest-xdist 测试用例分布式执行。多CPU分发。 
pytest-ordering 用于改变测试用例的执行顺序（从上到下） 
pytest-rerunfailures 用例失败后重跑 
pytest-html （生成html格式的自动化测试报告） 
allure-pytest 用于生成美观的测试报告。
```

在使用测试框架之前，可以先进行技术选型。

## 1.2、pytest安装

**方式一：** 

1、在命令行中运行以下命令

```python
pip install -U pytest
```

2、检查是否安装了正确的版本：

```python
pytest --version
```

方式二：

 1、创建一个requirements.txt 管理版本，并将包的版本号写入

```python
# content of requirements.txt
pytest==6.0.1
```

2、在命令行执行以下命令

```python
pip install -r requirements.txt
```

可以将需要安装的其他第三方插件名称和版本也写入requirements.txt文件，执行该命令一键安装

3、检查是否安装了正确的版本：

```python
pytest --version
```

## 1.3、pytest用例默认的规则识别

要使用pytest编写测试用例，必须按照指定的规则去命令，不然pytest无法识别用例。

用例规则如下：

1.模块名必须以`test_`开头或者`_test`结尾 ，即test_*.py

2.测试类必须以`Test`开头，并且不能有init方法。 

3.测试方法必须以`test`开头  

注意大小写，以上规则属于pytest默认的规则，如果需要修改可以配置pytest.ini进行改变

## 1.4、创建第一个测试

我们创建一个`test_sample.py`文件，并用四行如下代码创建了一个简单的测试用例

```python
# content of test_sample.py
def func(x):
    return x + 1


def test_answer():
    assert func(3) == 5
```

首先我们编写了一个`func()`的方法，之后编写了一个测试函数`test_answer(),`并用`assert`断言`fun()`传入参数`3`得到是结果是不是等于`5`来判定测试结果是否正确，在当前模块目录下命令行执行`pytest`，得到的测试结果如下所示：

```python
$ pytest
=========================== test session starts =========================
platform linux -- Python 3.x.y, pytest-6.x.y, py-1.x.y, pluggy-0.x.y
cachedir: $PYTHON_PREFIX/.pytest_cache
rootdir: $REGENDOC_TMPDIR
collected 1 item

test_sample.py F                                                  [100%]

================================= FAILURES ==============================
_______________________________ test_answer _____________________________

    def test_answer():
>       assert func(3) == 5
E       assert 4 == 5
E        +  where 4 = func(3)

test_sample.py:6: AssertionError
========================= short test summary info ========================
FAILED test_sample.py::test_answer - assert 4 == 5
============================ 1 failed in 0.12s ==========================
```

这个 [100%] 指运行所有测试用例的总体进度。完成后，pytest会显示一个失败报告，因为 func(3) 不返 5 。

## 1.5、执行用例的多种方式

写完用例后，可以直接在当前目录执行pytest，他会匹配执行当前目录及子目录下符合用例规则的模块并执行。

当然，我们也会根据需求来选择其他运行方式。下面介绍常见的执行用例的方式

### 1.5.1 主函数执行

 	pytest提供了main方法来让我运行用例，main方法部分源码如下：

```python
def main(
    args: Optional[Union[List[str], "os.PathLike[str]"]] = None,
    plugins: Optional[Sequence[Union[str, _PluggyPlugin]]] = None,
) -> Union[int, ExitCode]:
    """Perform an in-process test run.

    :param args:
        List of command line arguments. If `None` or not given, defaults to reading
        arguments directly from the process command line (:data:`sys.argv`).
    :param plugins: List of plugin objects to be auto-registered during initialization.

    :returns: An exit code.
    """
```

首先，`main`方法有两个参数`args`和`plugins`，参数描述如下：

- `args`: 命令行参数的列表或路径。如果没有提供参数，默认为 None。
- `plugins`：在初始化期间自动注册的插件对象列表。

重点了解第一个参数arg，参数类型是一个列表，其中存放的执行参数和路径，常见的执行参数有如下几种

**-s：表示输出调试信息，包括print打印的信息**

**-v：****未加前只打印模块名，加v后打印类名、模块名、方法名，显示更详细的信息** 

**-vs: 前两个参数一起使用**

**-n：支持多线程或者分布式运行测试用例。 （前提需按照：pytest-xdist插件）**

**-q: 安静模式，不输出环境信息,只显示整体测试结果**

**-x：表示只要要一个用例报错，那么测试停止。**  

**--maxfail=2 出现两个用例失败就停止。**  

**-k：模糊匹配，根据测试用例的部分字符串指定测试用例。可以试用and，or，not等逻辑运算符，匹配范围（文件名、类名、函数名）**

**--reruns num： 用例失败后重跑，跑几次（前提需安装：pytest-rerunfailures插件） 如：pytest -vs --reruns=2**

**【运行了当前目录及子目录下的所有用例（test_\*.py和\*_test.py）】**

创建一个`run_test.py`的函数入口，内容如下：

```python
import pytest

if __name__ == "__main__":
    pytest.main()
```

执行函数入口后，查看结果，运行了当前目录下的所有用例

- 运行指定目录下的用例，例如：运行test001目录下的用例

```python
pytest.main(["./test001", '-v'])
```

- 运行指定模块，例如：运行test_sample.py

```python
pytest.main(["./test_sample.py", '-v'])
```

- 运行模块中指定用例，例如：运行test_sample.py里面的TestAnswer

```python
pytest.main(["./test_sample.py::TestAnswer", '-v'])
```

- 运行模块中指定用例，例如：运行test_sample.py里面的TestAnswer类的test_answer

```python
pytest.main(["./test_sample.py::TestAnswer::test_answer", '-v'])
```

- 匹配包含sample的用例（匹配目录名、模块名、类名、用例名）

```python
pytest.main(['-k', 'sample', '-v'])
```

- 匹配test_sample.py模块下包含answer的用例

```python
pytest.main(['-k', 'answer', "./test_sample.py", '-v'])
```

### 1.5.2 命令行运行

命令行运行就是一开始的直接在当前目录执行pytest

也可以根据需求去添加指定的参数来运行

【示例】

- 运行当前目录及目录下的所有用例

```python
pytest
```

- 运行指定模块例如：运行test_sample.py

```python
pytest -vs test_sample.py
```

注：-vs是参数-v和-s的合并，命令行参数和主函数参数一直

- 运行指定目录，例如：运行test001目录下的用例

```python
pytest -vs ./test001
```

- 运行模块中指定用例，例如：运行test_sample.py里面的TestAnswer类的test_answer

```python
pytest -vs test_sample.py::TestAnswer::test_answer
```

### 1.5.3 通过读取全局配置文件pytest.ini运行

`pytest.ini`这个文件它是pytest单元测试框架的核心配置文件。 如pytest.ini有该参数值，在执行的时候，先读取配置文件中的参数；如果没有，则取其他地方的（主函数/命令行中）

1. 作用：pytest.ini 可以改变 pytest 的默认行为
2. 位置：一般放在项目的根目录（即当前项目的顶级文件夹下）
3. 命名：pytest.ini，不能使用任何中文符号，包括汉字、空格、引号、冒号等等
4. 新建配置文件，点击鼠标右键（**New->File->pytest.ini**）
5. 编码格式：**GBK或者ANSI**，可以使用notepad++修改编码格式
6. 运行的规则：不管是主函数模式运行，命令行模式运行，都会去读取这个全局配置文件。
7. 格式一般是固定的，建议将中文删掉：

```python
[pytest]
# addopts：配置命令行参数，用空格进行分隔
# 可执行标记为mark的对应用例，用or表示标记为demo或者smoke的用例都会执行
addopts = -vs  --alluredir=./results/json --clean-alluredir -m "demo or smoke"

# 注册 mark 标记
markers =
    demo : marks tests as demo
    smoke: marks tests as smoke
    uat : marks tests as uat
    test : marks tests as test

# 指定pytest最低版本号
minversion = 5.0

#测试用例的路径，可自己配置，
# ../pytestproject为上一层的pytestproject文件夹
# ./testcase为pytest.ini当前目录下的同级文件夹
# 改变用例的查找路径规则，当前目录的testcase文件夹
testpaths =./testcase

# 模块名的规则，配置测试搜索的模块文件名称
python_files = test*.py

# 类名的规则，配置测试搜索的测试类名
python_classes = Test*

# 方法名的规则，配置测试搜索的测试函数名
python_functions = test

# 忽略pytest模块基本的警告信息
filterwarnings = ignore:.*module is deprecated:DeprecationWarning
```

## 1.6  pytest执行测试用例的顺序是怎样的呢？  

- `pytest`默认按字母顺序去执行的（小写英文—>大写英文—>0-9数字）
- 用例之间的顺序是文件之间按照ASCLL码排序，文件内的用例按照从上往下执行。
- `setup_module`->`setup_claas`->`setup_function`->`testcase`->`teardown_function`->`teardown_claas`->`teardown_module`
- 可以通过第三方插件`pytest-ordering`实现自定义用例执行顺序

### 1.6.1 pytest-ordering—指定用例的运行顺序

`pytest`默认是按照字母来执行执行顺序，由于多接口之间存在值引用的关系，此时就需要执行`case`的执行顺序。
`pytest`控制`case`执行顺序的插件是`pytest-ordering`，直接用pip安装。

**1.安装依赖包**

```python
pip install pytest-ordering
```

**2.pytest-ordering的使用**
通过装饰器的方法来控制`case`的执行顺序

1.方式一：

```python
第一个执行：		@ pytest.mark.run('first')
第二个执行：		@ pytest.mark.run('second')
倒数第二个执行：	@ pytest.mark.run('second_to_last')
最后一个执行：		@ pytest.mark.run('last')
```

2.方式二：

```python
● 第一个执行：		@ pytest.mark.first
● 第二个执行：		@ pytest.mark.second
● 倒数第二个执行：	@ pytest.mark.second_to_last
● 第四个执行：		@pytest.mark.last  
```

3.方式三：

```python
第一个执行：		@ pytest.mark.run(order=1)
第二个执行：		@ pytest.mark.run(order=2)
倒数第二个执行：	@ pytest.mark.run(order=-2)
最后一个执行：	@ pytest.mark.run(order=-1)
```

执行优先级：
	0>较小的正数>较大的正数>无标记>较小的负数>较大的负数

```python
# 导入 pytest
@ pytest.mark.run （order = -2 ）
def	test_three （）：
    assert True

@ pytest.mark.run （order = -1 ）
def	test_four （）：
    assert True

@ pytest.mark.run （order = 2 ）
def	test_two （）：
    assert True

@ pytest.mark.run （order = 1 ）
def	test_one （）：
    assert True
```

输出：

```python
$ py.test test_foo.py -vv
===========测试会话开始= ============
test_foo.py:17：test_one通过
test_foo.py:12：test_two通过
test_foo.py:3：test_three通过
test_foo.py:7：test_four通过


============================ 4 = 0.02秒================== 
=====================================
```

4.方式四：

```python
# 导入 pytest
@ pytest.mark.run （after = 'test_second' ）
def test_third （）：
    assert True

def test_second （）：
    assert True

@ pytest.mark.run （before = 'test_second' ）
def test_first （）：
    assert True
```

输出如下：

```python
$ py.test test_foo.py -vv
===========测试会话开始= ============
test_foo.py:11：test_first通过
test_foo.py:7：通过了test_second
test_foo.py:4：test_third通过



============================ 4 = 0.02秒================== =========
```

