# 02-pytest前后置方法和fixture()

我们在编写用例的过程中，有时候需要对用例进行前置条件的准备或者后置步骤，在`pytest`中，我们可以使用`unittest`框架那样的`setUp()`和`teardown()``xunit`风格的前后置方法，也可以采用更灵活的`fixture()`固件来实现前后置。

> 两种前后置的区别：
>
> `setup`和`teardown`：实现全部用例的前后置；但实际应用中，我们需要更为灵活的配置部分用例的前后置；
>
> `fixture()`：`fixture`固件，或者夹具，能实现部分或者全部用例的前后置； `fixture`是个装饰器，可以用来装饰函数，类等

## 2.1 xunit风格的前后置

### 2.1.1 用例级别的前后置setup/teardown

放在类外面，相当于模块级别`setup_module()`/`teardown_module()`，放在类里面，相当于方法级别`setup_method`/`teardown_method`

```python
import pytest


class TestClass01:
    # 前置
    def setup(self):
        print("在每个用例执行前，执行一次")
        
    # 后置
    def teardown(self):
        print("在每个用例执行后，执行一次")

    # 用例1
    def test_001(self):
        print("我是用例001")
        
    # 用例2
    def test_s002(self):
        print("我是用例002")
        
    # 用例3
    def test_003(self):
        print("我是用例003")
```

结果如图：

![img](https://gitee.com/iscn/md_images/raw/master/%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F/1710242473291-d0a47505-9dec-4ec8-b395-edba9ed3317f.png)

### 2.1.2 函数级别和方法级别的前后置

- 函数级别用例为：`setup_function`/`teardown_function`，针对的是函数的用例前后置。

- 方法级：`setup_method`/`teardown_method`，针对的是方法的用例前后置。

在类中如果编写函数级别的用例是不会被执行的，用方法级别可以调用，结果和方法中编写`setup`/`teardown`一致。

函数和方法的区分：

1、方法是特殊的函数，或者称在类中的函数为方法。

2、函数的参数可以为空，方法的参数必须要有一个self

3、调用的方式也不一样，函数直接函数名调用，方法需要类对象.方法名

```python
import pytest


class TestClass01:

    # 函数级别前后置
    def setup_function(self):
        print("函数级别前置，执行一次")

    def teardown_function(self):
        print("函数级别后置，执行一次")

    # 方法级别前后置
    def setup_method(self):
        print("方法级别前置，执行一次")

    def teardown_method(self):
        print("方法级别后置，执行一次")

    # 用例1
    def test_001(self):
        print("我是用例001")

    def test_s002(self):
        print("我是用例002")

    def test_003(self):
        print("我是用例003")
        
def test_004():
    print("我是用例004")
```

执行结果如下：![img](https://gitee.com/iscn/md_images/raw/master/%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F/1710243633370-03f465c7-c55e-4438-9cad-140aec57e9a6.png)

![img](https://gitee.com/iscn/md_images/raw/master/%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F/1713266138014-72815238-f47e-4345-83ca-dc00d8c49d22.png)

可见函数级别的前后置没有执行，方法级别的前后置执行了。

接下来，我们把函数级别和方法级别放到类的外面，然后执行整个模块`test_sample.py`

```python
import pytest

# 函数级别前后置
def setup_function():
    print("函数级别前置，执行一次")

def teardown_function():
    print("函数级别后置，执行一次")

# 方法级别前后置
def setup_method():
    print("方法级别前置，执行一次")

def teardown_method():
    print("方法级别后置，执行一次")

class TestClass01:


    # 用例1
    def test_001(self):
        print("我是用例001")

    def test_s002(self):
        print("我是用例002")

    def test_003(self):
        print("我是用例003")

def test_004():
    print("我是用例004")
```

直接结果如下：

![img](https://gitee.com/iscn/md_images/raw/master/%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F/1710243385868-5db1567a-f79c-4fd9-85db-d92913a046c6.png)

可以发现，运行的只有函数级别的用例，方法级别的拿出来没有运行。我们再调整一下，把方法级别的用例放到类里面，函数级别的在类外面。再次运行整个模块结果如下：![img](https://gitee.com/iscn/md_images/raw/master/%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F/1710243514725-1df06ad3-3b0c-403e-8ce3-de75a15ec366.png)

由结果可以分析出：函数级别的前后置只能编写在类外面，且只针对类外面的函数执行。方法级别的前后置只能编写在类中，且只针对类中的方法有效。

### 2.1.3 类级别的用例前后置setup_class和teardown_class

类级别的`setup_class`和`teardown_class`分别在测试类中的用例执行之前执行，和测试类中所有用例执行完毕之后执行，具体使用如下：

```python
import pytest


def setup_class():
    print("类级别前置，执行一次")

def teardown_class():
    print("类级别后置，执行一次")



class TestClass01:
    # 类级别前后置
    def setup_class(self):
        print("类级别前置，执行一次")

    def teardown_class(self):
        print("类级别后置，执行一次")

    # 用例1
    def test_001(self):
        print("我是用例001")

    def test_004(self):
        print("我是用例004")


class TestClass02:

    def test_s002(self):
        print("我是用例002")


class TestClass003:

    def test_003(self):
        print("我是用例003")
```

执行结果如下图：![img](https://gitee.com/iscn/md_images/raw/master/%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F/1710244346385-90f15c1a-ba64-4883-946b-2276f04e0795.png)

我们在三个类外面创建了类级别的前后置，但是看`TestClass02`和`TestClass003`没有执行，可知类级别的前后置放着类外面无法执行。然后在`TestClass01`类中也编写了一个类级别的前后置，发现他在类刚开始`test_001`之前和类结束`test_004`方法之后执行了前后置。

### 2.1.4 模块级别的用例前后置setup_module/teardown_module

`pytest`中还有`setup_module`和`teardown_module`这两个用来设置模块级别前后置方法的函数，定义在模块中，会在整个模块中所有的用例执行前和用例全部执行完毕之后会执行，具体使用如下：

```python
import pytest


def setup_module():
    print("模块级别前置，执行一次")

def teardown_module():
    print("模块级别后置，执行一次")


class TestClass01:

    def setup_module(self):
        print("class类中模块级别前置，执行一次")

    def teardown_module(self):
        print("class类中模块级别后置，执行一次")

    # 用例1
    def test_001(self):
        print("我是用例001")

    def test_004(self):
        print("我是用例004")


class TestClass02:

    def test_s002(self):
        print("我是用例002")


class TestClass003:

    def test_003(self):
        print("我是用例003")
```

​	执行结果如下：

![img](https://gitee.com/iscn/md_images/raw/master/%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F/1710320345093-8cb503f5-9fb5-4021-a27d-47e312908515.png)

我们分别在类的外面和类的里面编写了模块级别的前后置，但是发现只有类外面的执行了，写在类里面的没有执行。由此，我们可以得到不同级别的前后置方法

| 级别     | 前置方法           | 后置方法            | 编写位置                                         | 执行结果                   |
| -------- | ------------------ | ------------------- | ------------------------------------------------ | -------------------------- |
| 用例级别 | `setup()`          | `teardown()`        | 在类外面，等同于模块级别在类里面，等同与方法级别 | 和模块和方法级别一样       |
| 函数级别 | `setup_function()` | `teardown_method()` | 模块里，类外面                                   | 类外面的每个函数都执行一次 |
| 方法级别 | `setup_method()`   | `teardown_method()` | 类里面                                           | 类里面的每个方法都指向一次 |
| 类级别   | `setup_class()`    | `teardown_class()`  | 类里面                                           | 每个类执行一次             |
| 模块级别 | `setup_module()`   | `teardown_module()` | 模块里，类外面                                   | 每个模块前后执行一次       |

> 注意：
>
> 当`setup()`/`teardown()`在和`setup_method()`/`teardown_method()`一起在类里面时，只会执行`setup_method()`/`teardown_method()`方法，
>
> 当`setup()`/`teardown()`在和`setup_module()`/`teardown_module()`一起在类里面时，只会执行`setup_module()`/`teardown_module()`方法，

### 2.1.5 各级别执行的前后顺序	

我们分别创建各个级别的前后置，然后运行，查看他们执行的前后顺序，示例如下：

```python
import pytest


def setup():
    print("类外面用例级别前置，执行一次")

def teardown():
    print("类外面用例级别后置，执行一次")

def setup_module():
    print("模块级别前置，执行一次")

def teardown_module():
    print("模块级别后置，执行一次")

def setup_function():
    print("函数级别前置，执行一次")

def teardown_function():
    print("函数级别后置，执行一次")

class TestClass01:

    def setup_method(self):
        print("方法级别前置，执行一次")

    def teardown_method(self):
        print("方法级别后置，执行一次")

    def setup(self):
        print("类里面用例级别前置，执行一次")

    def teardown(self):
        print("类里面用例级别后置，执行一次")

    def setup_class(self):
        print("类级别前置，执行一次")

    def teardown_class(self):
        print("类级别后置，执行一次")

    # 用例1
    def test_001(self):
        print("我是用例001")

    def test_004(self):
        print("我是用例004")

def test_002():
    print('函数用例002')
```

执行结果如下：

![img](https://gitee.com/iscn/md_images/raw/master/%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F/1710323239930-24a5f0b2-8adc-4261-b820-0571399178c9.png)

由结果可知，执行顺序为模块级别>类级别>方法级别，且当`setup()`/`teardown()`在和`setup_module()`/`teardown_module()`一起在类里面时，只会执行`setup_module()`/`teardown_module()`方法；当`setup()`/`teardown()`在和`setup_method()`/`teardown_method()`一起在类里面时，只会执行`setup_method()`/`teardown_method()`方法。

### 2.1.6 封装前后置

为了避免在每个py文件中，重复编写相同的代码（如setup和teardown进行初始化和结束的处理），让用例中的代码更加整洁清晰，我们可以将这些代码提取出来，放在公共文件夹中（比如：common文件夹）进行封装。

**公共的工具包中代码如下：**

```python
class CommonUtil:
    def setup_class(self):
        print("在每个类执行前，执行一次")
 
    def teardown_class(self):
        print("在每个类执行后，执行一次")
 
 
    def setup(self):
        print("在每个用例执行前，执行一次")
 
    def teardown(self):
        print("在每个用例执行后，执行一次")
```

操作步骤如下：

> 1、新建一个python文件夹：common
>
> 2、在该文件夹中，创建py文件：setup_teardown，定义SetupTeardown类，如上
>
> 3、在待使用的类中，去继承CommonUtil类即可：

执行结果如下所示：

![img](https://gitee.com/iscn/md_images/raw/master/%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F/1710324399794-1a092a36-f768-47a5-9581-559cdfb81383.png)

我们封装之后，在创建测试类的时候直接继承就可以正常调用前后置方法了，每个用例执行前后，都会执行对应的`setup`和`teardown`；但实际应用过程中，可能只有部分用例需要用到前后置，应该怎么处理呢？这时我们就需要更加灵活的测试夹具（`fixture`）

## 2.2 fixture（重点）

### 2.2.1 fixture定义和应用

`fixture`实际上和`setup`/`teardown`一样是一个函数，但是我们通过装饰器的方法将其变成`fixture`，然后在执行用例的时候，传入函数名即可。语法如下：

```python
@pytest.fixture(scope='指定夹具的级别')
def work():
    # 前置执行脚本
    
    yield 
    
    # 后置执行脚本
```

通过关键字`yield`，来区分前后置内容。

`fixture`（夹具）本质上是一个生成器函数，生产器函数在使用`next`进行迭代时，执行到`yeild`会返回数据，暂停执行，等待下一次进行迭代时才会继续执行，`pytest`夹具就是利用的生成器的机制，通过yeild在测试夹具将前后置代码分开执行。

【简单示例】

```python
import pytest

# 定义一个fixture
@pytest.fixture
def login():
    print('登录成功')


@pytest.fixture
def exit():

    yield
    print("退出登录 ")

@pytest.fixture()
def login_exit():
    print('登录成功')
    yield
    print("退出登录 ")


def test_login_exit1(login, exit):  # 将fixture名称（函数名）当参数传入
    print('操作系统成功')

def test_login_exit2(login_exit):  # 将fixture名称（函数名）当参数传入
    print('操作系统成功')
```

执行结果如下：

![img](https://gitee.com/iscn/md_images/raw/master/%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F/1710329352265-4b30adff-cfd4-498f-b67e-8b11599babad.png)

我们定义了三个`fixture`，分别为一个前置，一个后置，一个前后置一起的，然后给两个测试函数引用。最后发现得到的结果是一样的，

### 2.2.3 fixture的5个参数其一：scope（作用域）

接下来，让我们逐渐熟悉`fixture`的5个参数，先说第一个`scope`，这是一个作用域参数,我们可以通过参数scope指定夹具的级别，如果不指定夹具级别，`scope` 默认值为`function`(用例级别)，他的值有以下几种

用例级别：`scope = "function"`

测试类级：`scope = "class"`

模块级别：`scope = "module"`

包级别： `scope = "package"`

会话级别：`scope = "session"`

下面我们对不同的级别做一些详解：

**（1）function：在函数或方法之前和之后都会调用**

不管是函数形式定义的测试用例，还是测试类中方法的形式定义的用例，在使用的时候都是一样的，直接定义一个和要使用的夹具同名的形参即可。

1.手动调用的方式：在测试用例的参数中加入`fixture`的名称
2.如果`fixture`通过`return`或者`yield`存在返回值时，可以将对应的值传递到测试用例当中，值是通过`fixture`的名字传递的–数据驱动，用例的参数化

```python
import pytest

# 定义一个用例级别的夹具
@pytest.fixture(scope="function")      # 也可以写成 @pytest.fixture
def my_fixture():
    print('------my_fixture---用例前置执行脚本--------')
    yield
    print('------my_fixture---用例后置执行脚本--------')


# 函数用例 指定测试夹具
def test_func__01(my_fixture):
    print("测试用例----test_func__01----")


class TestDome:
    # 函数用例 指定测试夹具
    def test_02(self, my_fixture):
        print('----测试用例：test_02------')

    # 函数用例 指定测试夹具
    def test_03(self):
        print('----测试用例：test_03------')
```

执行结果如下：![img](https://gitee.com/iscn/md_images/raw/master/%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F/1710387252906-a1ec1e57-7dc0-4892-9ae9-c428d35153a2.png)

**（2）class：在每一个类之前和之后执行(一个类中可以有多个方法)**

如果一个测试类中有很多测试用例或者一个模块中有很多用例，都要指定同一个测试夹具，那我们则可以通过`usefixtures`给测试类或测试模块指定测试夹具。

1.手动调用的方式：在类的上面加上`@pytest.mark.usefixtures(“exe_database_sql”)`装饰器，进行调用

```python
import pytest

@pytest.fixture(scope="class",autouse=False)
def exe_database_sql():
    print("连接数据库")
    yield
    print("关闭数据库连接")

@pytest.mark.usefixtures("exe_database_sql")
class TestLoginA(object):

    # 函数用例 指定测试夹具
    def test_02(self):
        print('----测试用例：test_01------')

    # 函数用例 指定测试夹具
    def test_03(self):
        print('----测试用例：test_02------')
```

执行结果如下：

![img](https://gitee.com/iscn/md_images/raw/master/%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F/1710392032320-22466d7d-cac2-416f-8fa5-61568acd4492.png)

（3）`module`：每一个`.py`文件调用一次，该文件内又有多个`function`和`class`

（4）`session`：在整个项目会话之前和之后执行，是多个文件调用一次，可以跨.py文件调用，每个`.py`文件就是`module`，一般会结合`conftest.py`文件来实现

`pytest` 的最大优势之一是其极其灵活的夹具系统。通过测试夹具我们可以将极为复杂化的前后置依赖，拆分为更简单单一功能的测试夹具，通过在夹具中引用其他的夹具，来组织不同用例所需的复杂依赖环境。接下来我们通过一个案例来给大家演示如何使用。

```python
import pytest


# 用户注册的夹具
@pytest.fixture
def register_user():
    print('---用户注册的夹具前置执行----')
    # ...注册代码省略，注册的用户信息如下
    user_info = {'user': 'lemonban', 'pwd': '123456'}
    yield user_info
    print('---用户注册的夹具后置执行----')


# 用户登录的夹具,通过定义形参来使用register_user这个夹具
@pytest.fixture
def user_login(register_user):
    print('---用户登录的夹具前置执行----')
    # 获取register_user结局前置脚本执行完，yeild传递出来的数据
    user_info = register_user
    # ...登录代码省略，下面为登录得到的token
    token = 'sdjasjdask'
    yield token
    print('---用户登录的夹具后置执行----')


# 函数用例 指定使用测试夹具user_login
def test_func__01(user_login):
    token = user_login
    print("测试用例夹具user_login传递过来的token:", token)
    print("测试用例---test_func__01---")
```

执行结果如下：

![img](https://gitee.com/iscn/md_images/raw/master/%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F/1710396342529-b8596d27-12cb-48a1-ba69-bf14fadd7a4b.png)

我们在登录的夹具中引用了注册的夹具，然后在用例那只引用登录的夹具，也可以将注册的夹具一起执行。并可以通过`yield`关键字将`token`传回

### 2.2.4 fixture的5个参数其二：autouse（自动调用）

有时，您可能希望有一个(甚至几个)您知道所有用例都将执行夹具 。在定义测试夹具时，我们可以给夹具的装饰器加参数autouse=True来使夹具成为自动执行的夹具。

autouse：控制fixture是否自动被调用，自动执行，默认是False
-False：默认是 Fasle 没开启的，需要主动调用，才会执行该前后置
-True：设置为True 开启，则自动调用：即不用再手动传参就可以自动调用fixture运行该前后置

示例如下:

```python
import pytest


@pytest.fixture(autouse=True)
def my_fixture():
    print('------my_fixture---前置执行脚本--------')
    yield
    print('------my_fixture---后置执行脚本--------')


class TestDome:
    # 函数用例 指定测试夹具
    def test_02(self):
        print('----测试用例：test_01------')

    # 函数用例 指定测试夹具
    def test_03(self):
        print('----测试用例：test_02------')


class TestDome2:
    # 函数用例 指定测试夹具
    def test_03(self):
        print('----测试用例：test_03------')
```

执行结果如下：

![img](https://gitee.com/iscn/md_images/raw/master/%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F/1710396756565-c89767af-182a-4ecc-9f3b-3fc375cb0a2f.png)

在我们设置autouse=True后，并没有对用例进行传参，调用夹具。但是每一个用例都自动执行了

### 2.2.5 fixture的5个参数其三：params（参数化）

接下来第三个参数是非常重要的一个参数，它可以让我实现数据驱动参数化。

`params`：用来实现参数化，用于做**数据驱动**

1、通过`request`参数，用来接收`fixture`的返回结果，并通过`request.param`返回结果内容----是固定用法(`request.param`这里是不用带s，一个一个读取list中的参数)

2、list中有N组参数数据，用例就会执行N次

3、所有的数据驱动，都要用list格式[‘张三’,‘李四’,‘王五’]

```python
import pytest

@pytest.fixture(scope="function",params=['张三','李四','王五'])
def my_fixture(request):
    print("这是前置的方法，可以实现部分以及全部用例的前后置")
    yield request.param
    print("这是后置的方法，可以实现部分以及全部用例的前后置")

class TestLogin:

    def test_login_01(self):
        print('----测试用例：test_01------')

    # 函数可以当参数，传入来调用
    def test_login_02(self, my_fixture):
        print('----测试用例：test_02------', str(my_fixture))
        print('------------------\n'+str(my_fixture))

    def test_login_03(self):
        print('----测试用例：test_03------')
```

执行结果如下：

![img](https://gitee.com/iscn/md_images/raw/master/%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F/1710415816390-d61be4f1-6573-4212-91fc-e72ee3918616.png)

用例2，手动调用了这个夹具，我们发现用例2分别执行了定义的列表数值。可知，列表有多少元素，用例就会重复调用多少次

### 2.2.6 fixture的5个参数其四：ids（参数别名））

下面介绍的`ids`参数不能单独使用，必须和`params`一起使用，作用是：对参数化的内容加标识，对参数起别名

对参数化的内容起别名，让别人知道这个传入的参数是什么意思
默认是：传参数内容
作用不大

```python
import pytest

reader = ['张三', '李四', '王五']


@pytest.fixture(scope="function", params=reader, ids=['A', 'B', 'C'])
def my_fixture(request):
    print("这是前置的方法，可以实现部分以及全部用例的前后置")
    yield request.param
    print("这是后置的方法，可以实现部分以及全部用例的前后置")


class TestLogin:

    def test_login_01(self):
        print('----测试用例：test_01------')

    # 函数可以当参数，传入来调用
    def test_login_02(self, my_fixture):
        print('----测试用例：test_02------', str(my_fixture))
        print('------------------\n'+str(my_fixture))

    def test_login_03(self):
        print('----测试用例：test_03------')
```

执行结果如图所示：

![img](https://gitee.com/iscn/md_images/raw/master/%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F/1710416279482-af4ba26b-27f9-42b6-9707-a1bcacb4fa98.png)

### 2.2.7 fixture的5个参数其五：name（对fixture重命名）

下面说一下name参数，这个参数的作用是对fixture的名称进行重命名

1. 一旦重命名后，只能用别名
2. 原fixture的名称就不能再用，直接调用原fixture会报错
3. 得用双引号括起来，如：name=“db”

```python
@pytest.fixture(scope="function",params=reader,ids=['A','B','C'],name="db")
```

### 2.2.8 fixture结合conftest.py文件使用

在一个项目的测试中，大多数情况下会有多个类、模块、或者包要使用相同的测试夹具。这种情况下如果我们把测试夹具定义在某一个模块中则无法实现共享，针对这种情况，我们可以把需要共享的测试夹具放入一个单独的`conftest.py`文件中 ,这样多个可以实现多个测试模块共享了。

`conftest`是一个名字固定的`.py`文件，他就叫`conftest`。

`conftest`作用域：一般在工程 根目录 下设置的`conftest.py`文件起到全局作用。 在不同子目录下也可以放`conftest.py`的文件，作用范围只能在该目录及以下目录内

`conftest.py`文件的作用：所有同目录下的测试用例文件运行前都会执行`conftest.py`文件，它就相当于一个前置文件，将`conftest`的该特性和`fixture`方法结合起来使用，即可达到测试用例前置/后置条件语句操作

 conftest.py配置需要注意以下点：

1、conftest.py：名称固定，不能改名称；是专门用于存放fixture的配置文件；

2、不需要import导入conftest.py，pytest用例会自动查找；（用例和conftest在同一目录）

3、conftest.py与运行的用例最好在同一个pakage下，作用域：只对当前包起作用；

4、conftest.py文件可以有多个，并且多个conftest.py文件里面的多个fixture可以被同一个用例调用；

5、scope=“session” 实现多个.py跨文件使用一个session来完成多个用例。

接下来做一个示例：

1、在` conftest.py`中定义测试夹具`my_fixture`

```python
import pytest


@pytest.fixture(scope="session", autouse=True)
def my_fixture():
    print('------my_fixture---前置执行脚本--------')
    yield
    print('------my_fixture---后置执行脚本--------')
```

2、在`test_demo1.py`的用例用使用`conftest.py`中定义的夹具

```python
# test_demo1.py
class TestDome:
    # 函数用例 指定测试夹具
    def test_02(self):
        print('----测试用例：test_01------')

    # 函数用例 指定测试夹具
    def test_03(self):
        print('----测试用例：test_02------')
```

3、在`test_demo2.py`的用例用使用`conftest.py`中定义的夹具

```python
# test_demo2.py
class TestDome2:
    # 函数用例 指定测试夹具
    def test_03(self):
        print('----测试用例：test_03------')
```

执行结果如下所示：![img](https://gitee.com/iscn/md_images/raw/master/%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F/1710473975926-cb5bb4b1-fc77-4896-b6a4-120d28602fb6.png)

可以看见，我们没有在`test_demo1.py`和`test_demo2.py`手动调用和引入模块，但是`conftest.py`里面的测试夹具还是自动运行了。并且设置成自动后和会话级，还成功跨模块运行了。

## 2.3 conftest和setup/teardown优先级

先说结论`fixture(session)`>`fixture(class)`>`setup_class`>`fixture(function)`>`setup_function`

接下来我们分别创建不同级别的`fixture`和`setup/teardown`来进行测试，代码如下：

1、先在`conftest`里编写`session`、`class`、`function`级别的`fixture`，并设置`autouse=False` 

```python
import pytest


@pytest.fixture(scope="session", autouse=False)
def my_fixture_session():
    print('------my_fixture_session---前置执行脚本--------')
    yield
    print('------my_fixture_session---后置执行脚本--------')


@pytest.fixture(scope="class", autouse=False)
def my_fixture_class():
    print('------my_fixture_class---前置执行脚本--------')
    yield
    print('------my_fixture_class--后置执行脚本--------')


@pytest.fixture(scope="function", autouse=False)
def my_fixture_function():
    print('------my_fixture_function---前置执行脚本--------')
    yield
    print('------my_fixture_function--后置执行脚本--------')
```

2、编写一个`setup/teardown`的公共类`SetupTeardown`

```python
class SetupTeardown:
    def setup_class(self):
        print("在每个类执行前，执行一次")

    def teardown_class(self):
        print("在每个类执行后，执行一次")

    def setup(self):
        print("在每个用例执行前，执行一次")

    def teardown(self):
        print("在每个用例执行后，执行一次")
```

3、编写测试类，并继承公共类`SetupTeardown`，且调用各个级别的fixture

```python
from common.setup_teardown import SetupTeardown


class TestDome(SetupTeardown):
    # 函数用例 指定测试夹具
    def test_02(self, my_fixture_session, my_fixture_class, my_fixture_function):
        print('----测试用例：test_01------')

    # 函数用例 指定测试夹具
    def test_03(self):
        print('----测试用例：test_02------')
```

执行结果如下：

![img](https://gitee.com/iscn/md_images/raw/master/%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F/1710492459072-0b75c56f-1235-486d-80fa-0a82e34423b9.png)

可以看见是`fixture`的`session`级别先执行