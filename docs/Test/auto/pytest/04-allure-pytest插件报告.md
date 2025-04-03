# 04-allure-pytest插件报告

## 4.1 allure介绍和预览

`allure`是一个轻量级，灵活的，支持多语言的测试报告工具;多平台的,奢华的report框架;可以为`dev/qa`提供详尽的的测试报告、测试步骤、log;也可以为管理理层提供`high level`统计报告;它是`Java`语言开发的，支持`pytest`，`JaveScript`,`PHP`,`ruby`等，也可以集成到`Jenkins`

访问[https://allure-framework.github.io/allure-demo/9/](https://allure-framework.github.io/allure-demo/9/)预览报告内容

![](https://gitee.com/iscn/md_images/raw/master/%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F/1711606300960-3d9b7312-b4e7-450e-9c1b-2f4766c886f4.png)

![](https://gitee.com/iscn/md_images/raw/master/%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F/1711606336966-7dc4979d-7cdd-49c1-ad47-9c6246ac8e22.png)

> 页面部分说明：
>
> Overview：总览，显示用例执行情况、严重程度分布、环境信息等。
>
> Categories：分类，按用例执行结果分类，异常错误和失败错误。
>
> Suites：套件，按测试用例套件分类，目录 ->测试文件 -> 测试类 ->测试方法。
>
> Graphs：图表，显示用例执行分布情况，状态、严重程度、持续时间、持续时间趋势、重试趋势、类别趋势、整体趋势。
>
> Timeline：时间线，显示用例耗时情况，具体到各个时间点用例执行情况
>
> Behaviors：行为，按用例行为举止分类（以标记文字形式显示，需要用例添加allure相关装饰器）
>
> Package：配套，按目录形式分类，显示不同的目录用例执行情况。
>

## 4.2 环境安装

### 4.2.1 allure安装

安装步骤：

1. <font style="color:rgb(51, 51, 51);">allure包下载：</font>[https://github.com/allure-framework/allure2/releases](https://github.com/allure-framework/allure2/releases)
2. <font style="color:rgb(51, 51, 51);">解压 -> 进入bin目录 -> 运行allure.bat,</font>
3. <font style="color:rgb(51, 51, 51);">把bin目录加入PATH环境变量</font>

**注意：allure Report运行需要依赖java环境，所以安装前请确保本地安装了jdk8及以上版本。**

【步骤1、下载allure包】访问github地址，下滑页面，点击zip包下载

![](https://gitee.com/iscn/md_images/raw/master/%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F/1711606716273-6b89145a-91ec-4530-a8e8-8261cb72eec8.png)

【步骤2、解压】 

解压路径尽量不要含有中文

![](https://gitee.com/iscn/md_images/raw/master/%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F/1725256209160-9c95859e-d426-4f71-bbc5-07c8aca3b0f6.png)

【步骤3，把bin目录加入PATH环境变量】

> <font style="color:rgb(77, 77, 77);">【计算机--属性--高级系统设置--环境变量--系统变量--path--编辑】</font>

![](https://gitee.com/iscn/md_images/raw/master/%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F/1725256245134-2ebbc90b-87b2-436c-a595-ff3e245bb21d.png)

【步骤4：验证是否安装成功】

在dos和pycharm中输入：allure --version 能看到版本号说明OK  

> allure官网 : https://qameta.io/allure-report/
>
> allure文档 : https://docs.qameta.io/allure/#
>
> allure是java开发的，所以它依赖于java环境，使用前需要现在本地安装java的jdk环境

### 4.2.2 <font style="color:rgb(51, 51, 51);">安装 allure-pytest插件</font>

![](https://gitee.com/iscn/md_images/raw/master/%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F/1711607473868-2d4aa160-e601-41b6-8834-33d9c8940bbd.png)

根据官方文档，我们pytest使用直接pip安装即可

```python
pip install allure-pytest
```

## 4.3 <font style="color:rgb(51, 51, 51);">生成Allure报告</font>

### 4.3.1 运行测试

运行测试时，请在命令行参数中指定测试结果目录的路径。例如：`--alluredir`，这会将必要的数据保存到测试结果目录中。如果目录已存在，则新文件将添加到现有文件中，以便将来的报告将基于所有这些文件。

```python
#--alluredir用于指定存储测试结果的路径)
pytest [测试文件] -s -q --alluredir=./result 
```

运行后，会在指定的./result目录生成json文件，但是每次运行都是追加的形式，不会覆盖原来的，时间长了会有很多冗余数据，所以我们可在后面在加一个 `--clean-alluredir`的参数，这表示每一次运行清空临时的json报告 。

【cmd运行】

```python
#--alluredir用于指定存储测试结果的路径)
# --clean-alluredir 每一次运行清空临时的json报告
pytest [测试文件] -s -q --alluredir=./result --clean-alluredir
```

【run.py】

```python
import pytest

if __name__ == '__main__':
    """
    运行参数：
    -vs -v详细信息 -s调试信息
    --html=./reports/r.html 生成html报告
    -n=2 多线程运行
    --reruns=2 失败用例重跑
    其他：
    -x 只要有一个用例失败就停止运行
    --maxfail=2 只要有N个用例失败就停止运行
    -k 根据测试用例的字符串去选择用例运行
    -m 根据标记选择用例去运行：
    --alluredir用于指定存储测试结果的路径)
    --clean-alluredir 每一次运行清空临时的json报告
    """
    pytest.main(['-vs', '-q', '--alluredir=resul', '--clean-alluredir'])
```

### 4.3.2 查看报告

方式一：直接打开默认浏览器展示报告

```python
allure serve ./result/
```

方式二：从结果生成报告

```python
# 生成报告
allure generate ./result/ -o ./report/ --clean # (覆盖路径加--clean)
# 打开报告
allure open -h 127.0.0.1 -p 8883 ./report/
```

上面是doc窗口输入的，如果写的run.py文件的写法如下：

将运行参数写进pytest.ini文件(和cmd运行写法一样，但用addopts接收，不用在run.py中重复写)

```plain
[pytest]
# 配置常用的运行参数
addopts = -vs --alluredir=resul --clean-alluredir
```

run.py文件如下

```python
import os
import time

import pytest

if __name__ == '__main__':
    pytest.main()
    time.sleep(3)
    # 用os内置模块来将resul目录生成的json写到reports目录
    # ./resul 临时json报告文件夹
    # -o output输出
    # ./reports allure报告的路径
    # --clean 每一次运行清空allure报告
    os.system("allure generate ./resul -o ./reports --clean")
```

> 来一个报告导出案例：模拟测试用例代码如下，

```python
import pytest

def test_success():
    """this test succeeds"""
    assert True

def test_failure():
    """this test fails"""
    assert False

def test_skip():
    """this test is skipped"""
    pytest.skip('for a reason!')

def test_broken():
    raise Exception('oops')
```

方法1：执行测试用例:

```python
pytest test_allure.py --alluredir=./result/1
# 打开报告:
allure serve ./result/1
```

![](https://gitee.com/iscn/md_images/raw/master/%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F/1711608767539-e00986cd-2759-48f8-ba32-e9f3aae8fc4a.png)

<font style="color:rgb(51, 51, 51);">【方法2】</font>

```python
allure generate ./result/1 -o ./report/1/ --clean
allure open -h 127.0.0.1 -p 8883 ./report/1
```

浏览器访问地址 http://127.0.0.1:8883/ ，会显示跟上图一样的报告。

## 4.4 allure特性

### 4.4.1allure特性—feature, storry, step

> 场景：希望在报告中看到测试功能，子功能或场景、测试步骤、包含测试附加信息
>
> 解决：`@feature`，`@story`, `@step`, `@attach`
>

步骤：

> 1、`import allure`导包
>
> 2、功能上加`@allure.feature(‘功能名称’)`，相当于`testsuite`
>
> 3、子功能上加`@allure.story(’子功能名称‘)`，对应这个功能或者模块下的不同场景，相当于 `testcase`
>
> 4、步骤上加`@allure.step('步骤')`，测试过程中的每个步骤，放在具体逻辑方法中
>
> + `allure.step('步骤')` 只能以装饰器的形式放在类或者方法上面
> + `with allure.step：`可以放在测试用例方法里面
>
> 5、`@allure.attach('具体文本信息')`，需要附加的信息，可以是数据、文本、图片、视频、网页



```python
import pytest
import allure

@allure.feature("登录")			# 功能模块
class TestLogin():
    @allure.story("登录成功")	# 子功能
    def test_login_success(self):
        print("登录成功")
        pass

    @allure.story("密码错误")
    def test_login_failure(self):
        with allure.step("第 {} 步：输入用户名".format("1")):  #步骤
            print("输入用户名")
        with allure.step("第 {} 步：输入密码".format("2")):
            print("输入密码")
        print("点击登录")
        with allure.step("第 {} 步：登录失败".format("3")):
            assert '1' == 1
            print("登录失败")
        pass

    @allure.story("用户名密码错误")
    def test_login_failure_a(self):
        print("用户名或者密码错误，登录失败")
        pass
```

运行测试结果并生成报告

```python
pytest test_feature_story.py --alluredir=./result/2 
allure generate ./result/2 -o ./report/2/ --clean
allure open -h 127.0.0.1 -p 8883 ./report/2
```

![](https://gitee.com/iscn/md_images/raw/master/%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F/1711610747288-942f1ee7-6508-473b-acb8-e0ae6083d817.png)方法二

```python
allure generate ./result/1 -o ./report/1/ --clean
allure open -h 127.0.0.1 -p 8883 ./report/1
```

浏览器访问地址 http://127.0.0.1:8883/ ，会显示跟上图一样的报告。

### 4.4.2 allure特性—link, issue, testcase

可以在测试报告中添加链接、bug地址、测试用例地址。

> 关联bug需要在用例执行时添加参数：
>
> + `--allure-link-pattern=issue:[bug地址]{}`
> + 例如：--allure-link-pattern=issue:http://www.bugfree.com/issue/{}
>

```python
import allure

@allure.link("http://www.baidu.com", name="baidu link")
def test_with_link():
    pass

@allure.issue("140","this is a issue")
def test_with_issue_link():
    pass

TEST_CASE_LINK = 'https://github.com'
@allure.testcase(TEST_CASE_LINK, 'Test case title')
def test_with_testcase_link():
    pass
```

<font style="color:rgb(51, 51, 51);">用例执行:</font>

```python
pytest test_allure_link_issue.py --allure-link-pattern=issue:http://www.bugfree.com/issue/{} --alluredir=./result/3
allure serve ./result/3
```

![](https://gitee.com/iscn/md_images/raw/master/%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F/1711614307320-d3c2b655-d275-4713-a0d7-c2474a4390ed.png)

### 4.4.3allure特性—severity（用例等级）

场景：通常测试有P0，冒烟测试，验证上线测试，按重要性级别来分别执行的，比如上线要把主流程和重要模块都跑一遍

解决方法：

+ 通过附加`pytest.mark`标记
+ 通过`allure.feature`,`allure.story`
+ 也可以通过`allure.severity`，它有5个级别，分别是：
  - <font style="color:rgb(51, 51, 51);">Blocker级别：阻塞, </font>
  - <font style="color:rgb(51, 51, 51);">Critical级别：严重,</font>
  - <font style="color:rgb(51, 51, 51);">Normal级别：正常,</font>
  - <font style="color:rgb(51, 51, 51);">Minor级别：不太重要,</font>
  - <font style="color:rgb(51, 51, 51);">Trivial级别：不重要</font>

步骤：

+ 在方法，函数和类上添加`@allure.severity(allure.severity_level.NORMAL)`
+ 执行时：`pytest -s -v 文件名 --allure-severities normal,critical`

<font style="color:rgb(51, 51, 51);">1、可以使用pytest.mark来标记用例，</font>

```python
@pytest.mark.webtest # 添加标签 
@pytest.mark.sec 
pytest -m "webtest and not sec"
```

2、通过 allure.feature, allure.story来实现

```python
pytest test_feature_story_step.py --allure-features "登录" //只运行登录模块
pytest test_feature_story_step.py --allure-stories "登录成功" //只运行登录成功子模块      
```

3、通过 allure.severity按重要性级别来标记

```python
import allure
import pytest

def test_with_no_severity_label():
    pass

@allure.severity(allure.severity_level.TRIVIAL)
def test_with_trivial_severity():
    pass

@allure.severity(allure.severity_level.NORMAL)
def test_with_normal_severity():
    pass

@allure.severity(allure.severity_level.NORMAL)
class TestclassWithNormalSeverity(object):
    def test_inside_the_normalseverity_test_class(self):
        pass

    @allure.severity(allure.severity_level.CRITICAL)
    def test_inside_the_normal_severity_test_class_with_overriding_critical_severity(self):
        pass
```

用例执行:

```python
pytest test_allure_severity.py --alluredir=./result/4 --allure-severities normal,critical
allure serve ./result/4
```

### 4.4.4 allure.attach()

可以在报告中附加文本、图片以及html网页，用来补充测试步骤或测试结果，比如错误截图或者关键步骤的截图。

```python
import allure
import pytest

def test_attach_text():
    allure.attach("纯文本", attachment_type=allure.attachment_type.TEXT)

def test_attach_html():
    allure.attach("<body>这是一段htmlbody块</body>", "html页面", attachment_type=allure.attachment_type.HTML)

def test_attach_photo():
    allure.attach.file("test.jpg", name="图片", attachment_tye=allure.attachment_type.JPG)

```

<font style="color:rgb(51, 51, 51);">用例执行:</font>

```python
pytest test_allure_attach.py --alluredir=./result/5
allure serve ./result/5
```

## 4.5 pytest+selenium+allure报告


测试步骤：

1. 打开百度
2. 搜索关键词
3. 搜索结果截图，保存到报告中
4. 退出浏览器

```python
import allure
import pytest
from selenium import webdriver
import time

@allure.testcase("http://www.github.com")
@allure.feature("百度搜索")
@pytest.mark.parametrize('test_data1', ['allure', 'pytest', 'unittest'])
def test_steps_demo(test_data1):
    with allure.step("第 {} 步：打开百度网页".format("1")):
        driver = webdriver.Chrome("D:/testing_tools/chromedriver85/chromedriver.exe")
        driver.get("http://www.baidu.com")

    with allure.step("第 {} 步：搜索关键字".format("2")):
        driver.find_element_by_id("kw").send_keys(test_data1)
        time.sleep(2)
        driver.find_element_by_id("su").click()
        time.sleep(2)

    with allure.step("第 {} 步：保存图片".format("3")):
        driver.save_screenshot("./result/b.png")
        allure.attach.file("./result/b.png", attachment_type=allure.attachment_type.PNG)
        allure.attach('<head></head><body>首页</body>', 'Attach with HTML type', allure.attachment_type.HTML)

    with allure.step("第 {} 步：退出浏览器".format("4")):
        driver.quit()

```

用例执行：

```python
pytest test_allure_baidu.py --alluredir=./result/6
allure serve ./result/6
```

## 4.6 企业级allure报告定制

### 4.6.1 企业LOGO定制  

**步骤1：**更改D:\software\allure-2.30.0\config（allure自己的解压目录）目录下的allure.yml配置文件，加入自定义logo，文件最后一行添加`- custom-logo-plugin`

```yaml
plugins:
  - junit-xml-plugin
  - xunit-xml-plugin
  - trx-plugin
  - behaviors-plugin
  - packages-plugin
  - screen-diff-plugin
  - xctest-plugin
  - jira-plugin
  - xray-plugin
  - custom-logo-plugin
```

**步骤2：** 在D:\software\allure-2.30.0\plugins\custom-logo-plugin\static目录下加入logo图片  

**步骤3：**更改样式：在D:\allure-2.21.0-测试\plugins\custom-logo-plugin\static目录下修改style.css的样 式如下  

```css
/*
.side-nav__brand {
  background: url('custom-logo.svg') no-repeat left center !important;
  margin-left: 10px;
}
*/
.side-nav__brand {
  background: url('logo.png') no-repeat left center !important;
  margin-left: 22px;
  height: 90px;
  background-size: contain !important;
}

./side-nav_brand-test{
	display: none;
}
```

最后根据`margin-left: 22px;`和`height: 90px;`样式调整logo大小和位置。  

### 4.6.2 项目结构的报告定制  

```python
@allure.epic("项目名称：金融项目接口自动化报告")
@allure.feature("模块名称：用户管理模块")
class TestApi:

    @allure.story("接口名称：登陆接口")
    #@allure.title("验证登陆接口成功返回数据")
    def test_login(self):
        print("登陆测试用例")
        allure.dynamic.title("接口登陆成功")
        assert "a" in "abc"
```

修改后再点击功能模块可以看见预期结果

### 4.6.3 报告右边的定制

优先级：BLOCKER（致命），CRITICAL（严重），NORMAL（一般），MINOR（提示），TRIVIAL （轻微）  

```python
import allure
import pytest

@allure.epic("项目名称：金融项目接口自动化报告")
@allure.feature("模块名称：用户管理模块")
class TestApi:
    # @allure.story("接口名称：登录接口")
    # @allure.title("验证登录接口成功返回数据")
    # @allure.severity(allure.severity_level.BLOCKER)
    # @allure.description("说明：用户登录接口")
    @allure.link(url="http://www.baidu.com",name="接口访问链接")
    @allure.issue(url="http://www.baidu.com",name="bug链接")
    @allure.testcase(url="http://www.baidu.com", name="测试用例链接")
    def test_login(self):
        print("登录测试用例")
        allure.dynamic.story("接口名称：登录接口")
        allure.dynamic.severity(allure.severity_level.BLOCKER)
        allure.dynamic.title("接口登录成功")
        # allure.dynamic.link(url="http://www.baidu.com",name="接口访问链接")
        # allure.dynamic.issue(url="http://www.baidu.com",name="bug链接")
        # allure.dynamic.testcase(url="http://www.baidu.com",name="测试用例链接")

        assert "a" in "abc"
```

![](https://gitee.com/iscn/md_images/raw/master/%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F/1725269400795-128e7432-afa9-42f3-9c71-a0a8998da4b3.png)

