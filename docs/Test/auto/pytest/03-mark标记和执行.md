# 03-mark标记和执行

pytest可以通过标记将数据传入于测试函数中，也可以通过标记中对执行的用例做筛选，接下来直接进入正题。

## 3.1 pytest中内置的标记

pytest标记使用需要通过`pytest.mark.标记`来使用，pytest中为应对各种测试场景也内置了很多的标记。

### 3.1.1 pytest.mark.parametrize：用例参数化的标记

通过`parametrize`可以将用例数据和用例执行的逻辑代码分离，并实现根据用例，自动生成测试用例。例如下面这样：

```python
import pytest


@pytest.mark.parametrize("test_input,expected", [("3+5", 8), ("2+4", 6), ("6*9", 42)])
def test_eval(test_input, expected):
    assert eval(test_input) == expected
```

在这里，`parametrize`定义了三个不同的 (`test_input,expected`) 使 `test_eval` 函数将依次运行三次：

### 3.1.2 pytest.mark.skip：跳过用例执行

通过skip装饰的用例，在执行的时候会无条件跳过，他有一个参数reason

> reason:跳过测试函数的原因。

示例如下：

```python
# 不写跳过原因
import pytest


@pytest.mark.skip
def test_demo01():
    print('跳过用例1')


# 写跳过原因
@pytest.mark.skip(reason='不需要执行')
def test_demo02():
    print('跳过用例2，写明原因')


def test_demo03():
    print('不跳过，执行用例')
```

执行结果如下：

![](https://gitee.com/iscn/md_images/raw/master/%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F/1711016028138-1ec262d4-3c52-4308-9d2f-b9ed8eefe993.png)

### <font style="color:rgb(79, 79, 79);">3.1.3 pytest.mark.skipif：根据条件跳过用例</font>

skipif可以根据条件来决定是否跳过用例的执行， 如果条件为True则跳过=函数执行。

> 参数 ：condition —跳过的条件
>
> 参数 ：reason —跳过的原因

```python
# 不写跳过原因
import pytest


a = 10
# 当a大于20，跳过此用例
@pytest.mark.skipif(a > 20, reason='条件为ture，不执行')
def test_demo():
	assert a == 10


@pytest.mark.skipif(a <= 20, reason='条件为ture，不执行')
def test_demo01():
	assert a == 50
```

执行结果如下：

![](https://gitee.com/iscn/md_images/raw/master/%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F/1711016338028-5fd1e22d-c40a-41ef-b677-5ed734868f3e.png)

第一个用例没有满足条件，所以不跳过，第二个条件满足条件，跳过执行

### 3.1.4 pytest.mark.xfail：标记预期失败的用例

`xfail`标记可以将测试函数标记为预期执行失败的用例。参数如下：

> condition — 将测试函数标记为 xfail 的条件(True/False )
>
> reason — 测试函数被标记为 xfail 的原因
>
> raises — 预期失败的异常类型
>
> run — 是否应该实际执行测试函数。如果False，该函数将始终 xfail 并且不会被执行 。
>
> strict — 严格模式（True/False )

示例如下：

```python
import pytest

xfail = pytest.mark.xfail


@xfail
def test_hello():
    assert 0


@xfail(run=False)
def test_hello2():
    assert 0


@xfail("hasattr(os, 'sep')")
def test_hello3():
    assert 0


@xfail(reason="bug 110")
def test_hello4():
    assert 0


@xfail('pytest.__version__[0] != "17"')
def test_hello5():
    assert 0


def test_hello6():
    pytest.xfail("reason")


@xfail(raises=IndexError)
def test_hello7():
    x = []
    x[1] = 1
```

执行结果如下：

![](https://gitee.com/iscn/md_images/raw/master/%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F/1711072890133-60bce3fd-bca3-4218-a82d-1250d2dacc11.png)

显示7个预期结果失败

### 3.1.5、pytest.mark.usefixtures：给测试类或模块设置测试夹具

`usefixtures`标记一般用于给测试类下面的测试方法统一设置测试夹具。

```python
# content of conftest.py

import os
import shutil
import tempfile

import pytest


@pytest.fixture
def cleandir():
    old_cwd = os.getcwd()
    newpath = tempfile.mkdtemp()
    os.chdir(newpath)
    yield
    os.chdir(old_cwd)
    shutil.rmtree(newpath)
```

```python
# content of test_setenv.py
import os
import pytest


@pytest.mark.usefixtures("cleandir")
class TestDirectoryInit:
    def test_cwd_starts_empty(self):
        assert os.listdir(os.getcwd()) == []
        with open("myfile", "w") as f:
            f.write("hello")

    def test_cwd_again_starts_empty(self):
        assert os.listdir(os.getcwd()) == []
```

由于`usefixtures`标记`cleandir`每个测试方法的执行都需要`fixture`，就像您为每个方法指定了“cleandir”函数参数一样。让我们运行它来验证夹具是否激活，测试是否通过：

![](https://gitee.com/iscn/md_images/raw/master/操作系统/1711074706111-b0c9e7f6-157c-4fab-bbf9-f96df305f904.png)

## 3.2 自定义标记

<font style="color:rgb(77, 77, 77);">pytest支持通过pytest.ini文件注册自定义的标记。以满足执行用例时，通过标记对用例进行筛选.，</font>

### 3.2.1 注册标记

pytest.ini文件注册标记的语法如下：

```python
[pytest]
markers =
    标记1
    标记2
```

您可以在 `pytest.ini` 像这样注册一个标记：

```python
[pytest]
markers =
    slow: marks tests as slow (deselect with '-m "not slow"')
    serial
```

> 请注意: 标记名称后面是可选的描述。

### <font style="color:rgb(62, 67, 73);">3.2.2 使用自定义标记</font>

你可以直接在类或者方法上使用`pytest.mark.标记名`来给他们打上标记

```python
# content of test_server.py

import pytest

# 用例前面加载标签：@pytest.mark.标签名
@pytest.mark.webtest
def test_send_http():
    pass  # perform some webtest test for your app


def test_something_quick():
    pass

def test_another():
    pass


# 方式一：直接类上面打标记
@pytest.mark.webtest
class TestClass:
    def test_method(self):
        pass


# 方式二：通过类属性pytestmark,可以同时添加多个标记
class TestClass(object):
    pytestmark = [pytest.mark.main, pytest.mark.main]
    
    def test_method(self):
        pass
```

## 3.3 通过标记筛选用例执行

现有案例如下：

```python
import pytest
 
@pytest.mark.webtest
def test_send_http():
    pass  # perform some webtest test for your app


@pytest.mark.serial
def test_something_quick():
    pass

def test_another():
    pass
    
@pytest.mark.webtest
def test_send_https():
    pass  # perform some webtest test for your app
```

上面Demo中有4条测试用例，分别通过`pytest.mark.webtest`和`pytest.mark.serial`进行标记了，接下来我们一起来看看如何通过标记选择用例执行。

### 3.3.1 通过单个标记筛选

> 语法:`pytest -m '标签名'`

执行结果如下:![](https://gitee.com/iscn/md_images/raw/master/%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F/1711076014437-ff33c64f-1f57-46bb-8e29-6494a56a83ce.png)

或者反过来，运行除`Webtest`之外的所有测试：

> `pytest -v -m "not webtest"`

![](https://gitee.com/iscn/md_images/raw/master/%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F/1711077474355-6555b20d-7c12-4d79-80a7-f75d88cf1105.png)

### 3.3.2 同时选中多个标记

> `pytest -m "标记1 or 标记2"`

执行通过webtest或者serial 标记的的用例。执行结果如下：

![](https://gitee.com/iscn/md_images/raw/master/%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F/1711076836429-71e2f493-1767-45f1-8a01-d6b2eaf80bb7.png)



