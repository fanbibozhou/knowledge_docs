# 00-requests库详解

> Requests库就是一个使用Python语言发送HTTP请求的一个类库。
>
> 中文官方文档：https://requests.readthedocs.io/projects/cn/zh-cn/latest/user/install.html
>
> github地址：https://github.com/psf/requests

## 1、安装Requests

在使用之前，我们需要安装 Requests库，只要在终端中运行这个简单命令即可：

```python
pip install requests
```

当然，你也可以去Github获取源码。

## 2、Requests基础

### 2.1 发送请求

使用Requests 发送网络请求非常简单。只需要如下两步：

```python
# 1、导入 Requests 模块
import requests
# 2、输入网页请求的url,本例子中，我们来获取 Github 的公共时间线
r = requests.get('https://api.github.com/events')
```

现在，我们有一个名为 r 的`Response`对象。我们可以从这个对象中获取所有我们想要的信息。

当然，其他 HTTP 请求类型：POST，PUT，DELETE，HEAD 以及 PATCH 的访问也是如此

```python
# POST请求
r = requests.post('http://httpbin.org/post', data = {'key':'value'})
# PUT请求
r = requests.put('http://httpbin.org/put', data = {'key':'value'})
# DELETE请求
r = requests.delete('http://httpbin.org/delete')
# HEAD请求
r = requests.head('http://httpbin.org/get')
# PATCH请求
r = requests.patch('http://httpbin.org/get')
```

`Requests`库主要的7个方法

| HTTP协议 | Requests库方法      | 说明                                            |
| -------- | ------------------- | ----------------------------------------------- |
|          | requests.requests() | 构造一个请求，支撑以下各方法的基础方法          |
| GET      | requests.get()      | 获取HTML网页的主要方法，对应于HTTP的GET         |
| POST     | requests.post()     | 向HTML网页提交POST请求的方法，对应于HTTP的POST  |
| PUT      | requests.put()      | 向HTML网页提交PUT请求的方法，对应于HTTP的PUT    |
| DELETE   | requests.delete()   | 向HTML网页提交删除请求，对应于HTTP的DELETE      |
| HEAD     | requests.head()     | 获取网页头信息的的方法，对应于HTTP的HEAD        |
| PATCH    | requests.patch()    | 向HTML网页提交局部修改请求，对应于HTTP的的PATCH |


### 2.2 HTTP协议对资源的操作

| 方法   | 说明                                                  |
| ------ | ----------------------------------------------------- |
| GET    | 请求获取URL位置资源                                   |
| POST   | 请求向URL位置的资源后添加新的数据                     |
| PUT    | 请求向URL位置储存一个资源，覆盖原URL位置的资源        |
| DELETE | 请求删除URL位置储存的资源                             |
| HEAD   | 请求获取URL位置资源的响应报告，即获得该资源的头部信息 |
| PATCH  | 请求局部更新URL位置的资源，即改变该处资源的部分内容   |


### 2.3 Requests请求过程分析

我们按照以上的操作可以发送一个HTTP请求，但是他是怎么发送的，和后续怎么处理？或者更复杂的HTTP请求应该怎么操作呢？接下来，我们来认识一下这个请求的过程是怎么样的

#### 2.3.1 两个对象

我们在用Requests库进行HTTP请求的时候，会产生两个对象，一个是请求对象request，一个是返回对象Respose

![](https://gitee.com/iscn/md_images/raw/master/操作系统/1712545994079-5eb7297b-d682-4e64-8c05-dbdb1d511b91.png)

其中Response对象包含服务器返回的所有信息，例如状态码、首部等。

接下来让我们通过源码看一下发送get请求的过程（可省略跳过）

> 上方执行的GET请求，其实就是创建一个请求对象，包含请求的参数，然后像指定的URL获取资源，并返回一个`Response`对象，`r`就是接收响应的变量名，通常用于保存请求后的响应数据，接下来就可以使用 `r` 对象来访问响应的内容，例如检查状态码、获取响应头信息、解析 JSON 数据等。

#### 2.3.2* 一条简单的get请求(内容过多，可跳过)

我们用以下代码进行来看一下一个请求我们经历了什么，这是一条访问github时间线的请求。

```python
import requests

r = requests.get('https://api.github.com/events')
```

1、首先我们使用了requests库里面七个方法中的get方法，然后查看get方法源码，如下

![](https://gitee.com/iscn/md_images/raw/master/操作系统/1712546905543-78fb698f-7eb7-40a3-9e3c-043e9062acc9.png)

> get方法的请求有三个参数：
>
> url ：需要访问的url地址
>
> params：URL中的额外参数，字典或字节流格式
>
> **kwargs ：多个控制访问的参数（可选项）
>
> 返回：返回一个Response对象
>

我们先不看可选项的12个参数有哪些，看调用get方法后，返回的Requests库中的request方法。也就是说，我们的GET请求方法实际上调用的还是request方法，接着看request方法。

![](https://gitee.com/iscn/md_images/raw/master/操作系统/1712546941432-72583003-876e-4ad1-8f48-a5bd9a2f13e4.png)

![](https://gitee.com/iscn/md_images/raw/master/操作系统/1712546969070-b2dd012c-4121-4e24-aa48-59a418b00124.png)

从源码可以看到，request方法也有三个参数，描述如下

> 三个参数：
>
> `method`：请求对象的方法，可以是`GET`、`OPTIONS`、`POST`、`PUT`。。。
>
> `url`：请求对象的url地址
>
> `**kwargs`：多个控制访问的参数（可选参数）
>
> 返回：返回一个`Response`对象
>

由此我们知道，无论是`GET`还是`POST`等方法，实际上，最后调用的都是`request`方法，并降请求类型传入`method`参数，且还有一个必须传入的参数为`url`(请求对象的`url`地址)。其他的都是选填的参数。也就说我们最基本的`get`请求，只需要传入一个地址即可完成。

接着，我们就看着`request`方法有返回一个session对象的request方法，继续查看可知道方法传入的具体参数有哪一些，且除了刚开始的`method`和`url`，其他的都是之前`**kwargs`可变参数的类型，并暂时给了一个默认值None,

![image.png](https://gitee.com/iscn/md_images/raw/master/%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F/1712556493341-039ac19d-6e26-47f3-86ed-9e1bc0b770e6.png)

方法内容如下：

![](https://gitee.com/iscn/md_images/raw/master/操作系统/1712556898614-b91c4678-1d2a-4114-a1fd-b2e0deb85f25.png)

到这，我们就可以看到创建请求对象的参数有哪些，接下来，就说一下Request的七个方法传递的参数和返回的Responsed内容

### 2.4 Response对象的返回参数

每次调用 `requests` 请求之后，会返回一个 `response` 对象，该对象包含了具体的响应信息，如状态码、响应头、响应内容等。我们就可以对响应的参数进行处理。

```python
print(response.status_code)  # 获取响应状态码
print(response.headers)  # 获取响应头
print(response.content)  # 获取响应内容
```

更多响应信息如下：

| 属性或方法            | 说明                                                         |
| --------------------- | ------------------------------------------------------------ |
| apparent_encoding     | 编码方式                                                     |
| close()               | 关闭与服务器的连接                                           |
| content               | 返回响应的内容，以字节为单位                                 |
| cookies               | 返回一个 CookieJar 对象，包含了从服务器发回的 cookie         |
| elapsed               | 返回一个 timedelta 对象，包含了从发送请求到响应到达之间经过的时间量，可以用于测试响应速度。比如 r.elapsed.microseconds 表示响应到达需要多少微秒。 |
| encoding              | 解码 r.text 的编码方式                                       |
| headers               | 返回响应头，字典格式                                         |
| history               | 返回包含请求历史的响应对象列表（url）                        |
| is_permanent_redirect | 如果响应是永久重定向的 url，则返回 True，否则返回 False      |
| is_redirect           | 如果响应被重定向，则返回 True，否则返回 False                |
| iter_content()        | 迭代响应                                                     |
| iter_lines()          | 迭代响应的行                                                 |
| json()                | 返回结果的 JSON 对象 (结果需要以 JSON 格式编写的，否则会引发错误) |
| links                 | 返回响应的解析头链接                                         |
| next                  | 返回重定向链中下一个请求的 PreparedRequest 对象              |
| ok                    | 检查 "status_code" 的值，如果小于400，则返回 True，如果不小于 400，则返回 False |
| raise_for_status()    | 如果发生错误，方法返回一个 HTTPError 对象                    |
| reason                | 响应状态的描述，比如 "Not Found" 或 "OK"                     |
| request               | 返回请求此响应的请求对象                                     |
| status_code           | 返回 http 的状态码，比如 404 和 200（200 是 OK，404 是 Not Found） |
| text                  | 返回响应的内容，unicode 类型数据                             |
| url                   | 返回响应的 URL                                               |


返回的参数看着确实挺多的，但实际上常用的也就只有几个而已，上面的表格查询参考一下就可以了，下面展示一下常用的几个返回参数。

```python
import requests

r = requests.get('https://api.github.com/events')

# 1、响应状态码 status_code
print(r.status_code)    # 结果200

# 2、响应头headers
# 以字典对象存储服务器响应头，但是这个字典比较特殊，字典键不区分大小写，若键不存在则返回None
print(r.headers)
"""结果：{'Content-Type': 'text/html;charset=UTF-8', 
        'Transfer-Encoding': 'chunked', 'Connection': 'keep-alive', 
        'Server': 'nginx', 'Date': 'Fri, 27 Mar 2020 12:21:58 GMT', 
        'Access-Control-Allow-Credentials': 'true', 'Vary': 'Origin,
        Access-Control-Request-Method,Access-Control-Request-Headers', 
        'Access-Control-Allow-Headers': 'Origin,Content-Type,authorization,
        Accept,token,X-Requested-With', 'Content-Encoding': 'gzip', 
        'X-Application-Context': 'pc-article:prod-yz:10030', 
        'Access-Control-Allow-Methods': 'POST,GET,OPTIONS,DELETE', 
        'Content-Language': 'en-US', 'Access-Control-Expose-Headers': 
        'Origin,Access-Control-Request-Method,Access-Control-Request-Headers,
        X-forwared-port,X-forwarded-host', 'Cache-Control': 'max-age=60', 
        'X-From-Sohu': 'X-SRC-Source', 'FSS-Cache': 'MISS from 8868025.16076995.9867815',
        'FSS-Proxy': 'Powered by 2969695.4280425.3969395'}
"""
# 3、响应内容text
# 字符串方式的响应体，会自动根据响应头部的字符编码进行解码，返回url对应的页面内容
print(r.text)

# 4、响应内容content
# 字节方式的响应体，会自动为你解码 gzip 和 deflate 压缩,是http响应内容的二进制形式
print(r.content)

# 5、响应内容编码方式encoding
# 从http的header中猜测的响应内容编码方式
print(r.encoding)    # 'UTF-8'

# 6、响应内容编码方式apparent_encoding
# 从内容中分析出响应的内容编码方式
print(r.apparent_encoding)       # 'UTF-8'
```

响应内容`text`和`content`两者区别：

1.`content`中间存的是字节码，而`text`中存的是字符串(由`Beautifulsoup`根据猜测的编码方式将`content`内容编码而成)。 

2.直接输出`content`，会发现前面存在b'这样的标志，这是字节字符串的标志，而`text`输出没有前面的b。

3.对于纯`ascii`码，两者输出一致，对于其他的文字，需要正确编码才能正常显示。

4.建议使用`.text`，因为输出显示的是汉字。如果显示乱码，可以用`.content.decode('utf-8')`手动选择文字编码方式中文常用`utf-8`、`GBK`、`GB2312`等。

## 3、Request请求方法的参数详解

我们通过上面的分析，可以得到无论是GET还是POST或者是其他请求，最终实际调用的还是request方法，所以我们重点来说一下request的参数即可。这些参数实际也是其他请求方法传递来的。

> 三个参数：
>
> + method：请求方式，对应GET/PUT/POST等7种方法
> + url：获取页面的url链接
> + **kwargs：控制访问的参数，共13个，均为可选项
>

```python
request.request(method,url,**kwargs)
# method的7个请求参数
r = requests.request('GET',url, **kwargs)  # GET请求
r = requests.request('HEAD',url, **kwargs)  # HEAD请求
r = requests.request('POST',url, **kwargs)  # POST请求
r = requests.request('PUT',url, **kwargs)  # PUT请求
r = requests.request('PATCH',url, **kwargs)  # PATCH请求
r = requests.request('delete',url, **kwargs)  # delete请求
r = requests.request('OPTIONS',url, **kwargs)  # OPTIONS请求
```

| <font style="color:rgb(79, 79, 79);">kwargs可选参数项</font>** | 参数说明                                              |
| ------------------------------------------------------------ | ----------------------------------------------------- |
| params                                                       | 字典或字节序列，作为参数增加到url中                   |
| data                                                         | 字典、字节序列或文件对象，作为Request的内容（请求体） |
| json                                                         | JSON格式的数据，作为Request的内容                     |
| headers                                                      | 字典，HTTP定制头（请求头？）                          |
| cookies                                                      | 字典或CookieJar,Request中的cookie                     |
| files                                                        | 字典类型，传输文件                                    |
| auth                                                         | 元组，支持HTTP认证功能                                |
| timeout                                                      | 设定超时时间，单位为秒                                |
| allow_redirects                                              | True/False,默认为True，重定向开关                     |
| proxies                                                      | 字典类型，设定访问代理服务器，可以增加登录认证        |
| verify                                                       | True/False,默认为True，认证SSL证书开关                |
| stream                                                       | True/False,默认为True，获取内容立即下载开关           |
| cert                                                         | 本地SSL证书路径                                       |


### 3.1 URL 参数（params）

有时候我们需要为URL的查询字符串传递一些查询参数，查询参数会在url后面接一个问号，使用键值对的形式传递在URL中，例如：`httpbin.org/get?key=val`

 Requests 允许你使用 params 关键字参数，以一个字符串字典来提供这些参数。举例来说，如果你想传递 <font style="color:rgb(34, 34, 34);background-color:rgb(236, 240, 243);">key1=value1</font> 和 <font style="color:rgb(34, 34, 34);background-color:rgb(236, 240, 243);">key2=value2</font> 到 <font style="color:rgb(34, 34, 34);background-color:rgb(236, 240, 243);">httpbin.org/get</font> ，那么你可以使用如下代码：

```python
payload = {'key1': 'value1', 'key2': 'value2'}

r = requests.get("http://httpbin.org/get", params=payload)

# 通过打印输出该 URL，你能看到 URL 已被正确编码：
print(r.url)
# http://httpbin.org/get?key2=value2&key1=value1
```

执行结果如下：

![image.png](https://cdn.nlark.com/yuque/0/2024/png/26323439/1712567983356-3f7fa4a1-c227-4008-804b-f4bdeac9ee2f.png?x-oss-process=image%2Fformat%2Cwebp)

> 注意：字典里值为 None 的键都不会被添加到 URL 的查询字符串里。

当然，你也可以将一个列表作为值传入：

```python
payload = {'key1': 'value1', 'key2': ['value2', 'value3']}
r = requests.get('http://httpbin.org/get', params=payload)
print(r.url)   # http://httpbin.org/get?key1=value1&key2=value2&key2=value3
```

### 3.2 data参数

有时候，我们需要发送一些表单形式的数据，比如POST请求，这时候我们就需要传递一个字典给data参数，数据字典会在发出请求的时候自动编码成表单的形式。

```python
payload = {'key1': 'value1', 'key2': 'value2'}
r = requests.post("http://httpbin.org/post", data=payload)
print(r.text)
```

执行结果下：

![](https://gitee.com/iscn/md_images/raw/master/操作系统/1712571567438-a5277bd5-80de-437d-92fd-e248972a6114.png)

你还可以为 `data` 参数传入一个元组列表。在表单中多个元素使用同一 key 的时候，这种方式尤其有效：

```python
payload = (('key1', 'value1'), ('key1', 'value2'))
r = requests.post('http://httpbin.org/post', data=payload)
print(r.text)
{
  ...
  "form": {
    "key1": [
      "value1",
      "value2"
    ]
  },
  ...
}
```

有时候想传递的其实并非是表单类型的，比如传递一个 `string` 而不是一个 `dict`，那么数据会被直接发布出去。例如，Github API v3 接受编码为 JSON 的 POST/PATCH 数据：

```python
import json
url = 'https://api.github.com/some/endpoint'
payload = {'some': 'data'}
r = requests.post(url, data=json.dumps(payload))
```

此处除了可以自行对 `dict` 进行编码，你还可以使用 `json` 参数直接传递，然后它就会被自动编码。这是 2.4.2 版的新加功能：

```python
url = 'https://api.github.com/some/endpoint'
payload = {'some': 'data'}
r = requests.post(url, json=payload)
```

> 实际上data就是一个请求的请求体内容，如果发送的请求中需要请求体，就传入data参数即可

### 3.3 json参数

json参数和data一样，都是可以作为请求时的内容传递出去，但我们什么时候用data，什么时候用json呢？

首先，我们http请求的请求体格式主要有以下4种：

+ `application/json`
+ `applicaiton/x-www-from-urlencoded`
+ `multipart/form`
+ `application/xml`

而data和json两种都可以传入str或dict，如果不在headers中指定类型，则会有以下的区别。

> 区别：
>
> 1、不管json是str还是dict，如果不指定headers中的content-type，默认为application/json
>
> 2、data为dict时，如果不指定content-type，默认为application/x-www-form-urlencoded，相当于普通form表单提交的形式
>
> 3、data为str时，如果不指定content-type，默认为text/plain
>
> 4、json为dict时，如果不指定content-type，默认为application/json
>
> 5、json为str时，如果不指定content-type，默认为application/json
>
> 6、用data参数提交数据时，request.body的内容则为a=1&b=2的这种形式，用json参数提交数据时，request.body的内容则为’{“a”: 1, “b”: 2}'的这种形式

如何查看接口的请求体格式：通过谷歌F12查看字段Content-Type

![](https://gitee.com/iscn/md_images/raw/master/操作系统/1712575544647-33ac9fb1-d78a-4af5-8c2a-976ffeb6b3fc.png)

> + 数据格式为Form Data，如果通过requests发送数据，则用data来发送数据
> + 数据格式为Request Payload，如果通过requests发送，则用json来发送数据

### 3.4 headers参数（定制请求头）

这个参数接收的是一个字典类型，可以让我们对发送的请求头进行定制，比如指定请求的数据格式、编码方式等，或者传入请求的token等。

```python
url = 'https://api.github.com/some/endpoint'
headers = {'user-agent': 'my-app/0.0.1'}
r = requests.get(url, headers=headers)
```

注意事项：

+ 如果在 `.netrc` 中设置了用户认证信息，使用 `headers=` 设置的授权就不会生效。而如果设置了 `auth= 参数`，`.netrc` 的设置就无效了。
+ 如果被重定向到别的主机，授权 header 就会被删除。
+ 代理授权 header 会被 URL 中提供的代理身份覆盖掉。
+ 在我们能判断内容长度的情况下，header 的 Content-Length 会被改写。

> 注意: 所有的 header 值必须是 string、bytestring 或者 unicode。尽管传递 unicode header 也是允许的，但不建议这样做。

### 3.5 cookies参数

cookies参数是一个字典或CookiesJar，有一些接口响应的时候，也会包含一些cookies的值我们可以快速访问他们。

```python
>>> url = 'http://example.com/some/cookie/setting/url'
>>> r = requests.get(url)

>>> r.cookies['example_cookie_name']
'example_cookie_value'
```

有时候我们发送请求的时候，也需要发送一些cookie到服务器，可以使用 cookies 参数：

```python
>>> url = 'http://httpbin.org/cookies'
>>> cookies = dict(cookies_are='working')

>>> r = requests.get(url, cookies=cookies)
>>> r.text
'{"cookies": {"cookies_are": "working"}}'
```

Cookie 的返回对象为 Requests的CookieJar，它的行为和字典类似，但接口更为完整，适合跨域名跨路径使用。你还可以把 CookieJar 传到 Requests 中：

```python
>>> jar = requests.cookies.RequestsCookieJar()
>>> jar.set('tasty_cookie', 'yum', domain='httpbin.org', path='/cookies')
>>> jar.set('gross_cookie', 'blech', domain='httpbin.org', path='/elsewhere')
>>> url = 'http://httpbin.org/cookies'
>>> r = requests.get(url, cookies=jar)
>>> r.text
'{"cookies": {"tasty_cookie": "yum"}}'
```

### 3.6 auth参数（自定义身份验证）

Restquests中允许我们使用自己指定的身份验证机制。

自定义的身份验证机制是作为`requests.auth.AuthBase`的子类来实现的，也非常容易定义。Requests 在`requests.auth`中提供了两种常见的的身份验证方案： `HTTPBasicAuth` 和 `HTTPDigestAuth` 。

假设我们有一个web服务，仅在`X-Pizza`头被设置为一个密码值的情况下才会有响应。虽然这不太可能，但就以它为例好了。

```python
from requests.auth import AuthBase

class PizzaAuth(AuthBase):
    """Attaches HTTP Pizza Authentication to the given Request object."""
    def __init__(self, username):
        # setup any auth-related data here
        self.username = username

    def __call__(self, r):
        # modify and return the request
        r.headers['X-Pizza'] = self.username
        return r
```

然后就可以使用我们的`PizzaAuth`来进行网络请求:

```python
>>> requests.get('http://pizzabin.org/admin', auth=PizzaAuth('kenneth'))
# 返回值：<Response [200]>
```

### 3.7 file参数

#### 3.7.1 发送一个文件

有时候我们发送请求时，会需要上传文件啥的，这是就需要在请求里添加一个`file`参数。`file`参数传递的内容是一个字典类型。如下所示：

```python
>>> url = 'http://httpbin.org/post'
>>> files = {'file': open('report.xls', 'rb')}

>>> r = requests.post(url, files=files)
>>> r.text
{
  ...
  "files": {
    "file": "<censored...binary...data>"
  },
  ...
}
```

当然，也可以显式地设置文件名，文件类型和请求头：

```python
>>> url = 'http://httpbin.org/post'
>>> files = {'file': ('report.xls', open('report.xls', 'rb'), 'application/vnd.ms-excel', {'Expires': '0'})}

>>> r = requests.post(url, files=files)
>>> r.text
{
  ...
  "files": {
    "file": "<censored...binary...data>"
  },
  ...
}
```

如果你想，你也可以发送作为文件来接收的字符串：

```python
>>> url = 'http://httpbin.org/post'
>>> files = {'file': ('report.csv', 'some,data,to,send\nanother,row,to,send\n')}

>>> r = requests.post(url, files=files)
>>> r.text
{
  ...
  "files": {
    "file": "some,data,to,send\\nanother,row,to,send\\n"
  },
  ...
}
```

> 如果你发送一个非常大的文件作为`multipart/form-data`请求，你可能希望将请求做成数据流。默认下`requests`不支持, 但有个第三方包`requests-toolbelt`是支持的。你可以阅读 `toolbelt`文档 来了解使用方法。

#### 3.7.2 发送多个文件

有时候我们也需要在请求中发送多个文件，例如，假设你要上传多个图像文件到一个 HTML 表单，使用一个多文件`field`叫做 "images":

```python
<input type="file" name="images" multiple="true" required="true"/>
```

要实现，只要把文件设到一个元组的列表中，其中元组结构为 `(form_field_name, file_info):`

```python
>>> url = 'http://httpbin.org/post'
>>> multiple_files = [
        ('images', ('foo.png', open('foo.png', 'rb'), 'image/png')),
        ('images', ('bar.png', open('bar.png', 'rb'), 'image/png'))]
>>> r = requests.post(url, files=multiple_files)
>>> r.text
{
  ...
  'files': {'images': 'data:image/png;base64,iVBORw ....'}
  'Content-Type': 'multipart/form-data; boundary=3131623adb2043caaeb5538cc7aa0b3a',
  ...
}
```

> 强烈建议你用二进制模式（binary mode）打开文件。这是因为 requests 可能会为你提供 header 中的 Content-Length，在这种情况下该值会被设为文件的字节数。如果你用文本模式打开文件，就可能碰到错误。

### 3.8 timeout超时时间

在发送请求的时候，你可以告诉 requests 在经过以`timeout`参数设定的秒数时间之后停止等待响应。基本上所有的生产代码都应该使用这一参数，该参数的设定是以秒（s）为单位。如果不使用，你的程序可能会永远失去响应：

```python
>>> requests.get('http://github.com', timeout=0.001)
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
requests.exceptions.Timeout: HTTPConnectionPool(host='github.com', port=80): Request timed out. (timeout=0.001)
```

> `timeout` 仅对连接过程有效，与响应体的下载无关。 `timeout` 并不是整个下载响应的时间限制，而是如果服务器在 `timeout` 秒内没有应答，将会引发一个异常（更精确地说，是在 timeout 秒内没有从基础套接字上接收到任何字节的数据时）If no timeout is specified explicitly, requests do not time out.

### 3.9 proxies(代理参数)

如果需要使用代理，你可以通过为任意请求方法提供 `proxies`参数来配置单个请求:

```python
import requests

proxies = {
  "http": "http://10.10.1.10:3128",
  "https": "http://10.10.1.10:1080", # 增加https访问代理服务器
}

requests.get("http://example.org", proxies=proxies)
```

你也可以通过环境变量`HTTP_PROXY`和`HTTPS_PROXY`来配置代理。

```python
$ export HTTP_PROXY="http://10.10.1.10:3128"
$ export HTTPS_PROXY="http://10.10.1.10:1080"

$ python
>>> import requests
>>> requests.get("http://example.org")
```

若你的代理需要使用`HTTP Basic Auth`，可以使用 http://user:password@host/ 语法：

```python
proxies = {
    "http": "http://user:pass@10.10.1.10:3128/",
}
```

要为某个特定的连接方式或者主机设置代理，使用 `scheme://hostname` 作为 `key`， 它会针对指定的主机和连接方式进行匹配。

```python
proxies = {'http://10.20.1.128': 'http://10.10.1.10:5323'}
```

> 注意，代理 URL 必须包含连接方式。

### 3.10 allow_redirects参数（重定向参数）

默认情况下，除了 HEAD, Requests 会自动处理所有重定向。

可以使用响应对象的 `history` 方法来追踪重定向。

`Response.history` 是一个 `Response` 对象的列表，为了完成请求而创建了这些对象。这个对象列表按照从最老到最近的请求进行排序。

例如，Github 将所有的 HTTP 请求重定向到 HTTPS：

```python
>>> r = requests.get('http://github.com')

>>> r.url
'https://github.com/'

>>> r.status_code
200

>>> r.history
[<Response [301]>]
```

如果你使用的是GET、OPTIONS、POST、PUT、PATCH 或者 DELETE，那么你可以通过 `allow_redirects` 参数禁用重定向处理：

```python
>>> r = requests.get('http://github.com', allow_redirects=False)
>>> r.status_code
301
>>> r.history
[]
```

如果你使用了 HEAD，你也可以启用重定向：

```python
>>> r = requests.head('http://github.com', allow_redirects=True)
>>> r.url
'https://github.com/'
>>> r.history
[<Response [301]>]
```

### 3.11 stream参数（获取原始响应内容）

在罕见的情况下，你可能想获取来自服务器的原始响应信息，那么你可以访问 `r.raw`。 如果你确实想这么干，那请你确保在初始请求中设置了`stream=True`。具体你可以这么做：

```python
>>> r = requests.get('https://api.github.com/events', stream=True)
>>> r.raw
<requests.packages.urllib3.response.HTTPResponse object at 0x101194810>
>>> r.raw.read(10)
'\x1f\x8b\x08\x00\x00\x00\x00\x00\x00\x03'
```

但一般情况下，你应该以下面的模式将文本流保存到文件：	

```python
with open(filename, 'wb') as fd:
    for chunk in r.iter_content(chunk_size):
        fd.write(chunk)
```

使用 `Response.iter_content` 将会处理大量你直接使用 `Response.raw` 不得不处理的。 当流下载时，上面是优先推荐的获取内容方式。 `chunk_size`可以自由调整为更适合您的用例的数字。

### 3.12 verify参数（SSL 证书验证）

Requests 可以为 HTTPS 请求验证 SSL 证书，就像 web 浏览器一样。SSL 验证默认是开启的，如果证书验证失败，Requests 会抛出 SSLError:

```python
>>> requests.get('https://requestb.in')
requests.exceptions.SSLError: hostname 'requestb.in' doesn't match 
either of '*.herokuapp.com', 'herokuapp.com'
```

在该域名上我没有设置 SSL，所以失败了。但 Github 设置了 SSL:

```python
>>> requests.get('https://github.com', verify=True)
<Response [200]>
```

你可以为 verify 传入 CA_BUNDLE 文件的路径，或者包含可信任 CA 证书文件的文件夹路径：

```python
>>> requests.get('https://github.com', verify='/path/to/certfile')
```

或者将其保持在会话中：

```python
s = requests.Session()
s.verify = '/path/to/certfile'
```

> 如果 `verify` 设为文件夹路径，文件夹必须通过 OpenSSL 提供的 `c_rehash` 工具处理。

你还可以通过 `REQUESTS_CA_BUNDLE` 环境变量定义可信任 CA 列表。

如果你将 `verify` 设置为 `False`，Requests 也能忽略对 SSL 证书的验证。

```python
>>> requests.get('https://kennethreitz.org', verify=False)
<Response [200]>
```

默认情况下， `verify` 是设置为 `True` 的。选项 `verify` 仅应用于主机证书。

>  对于私有证书，你也可以传递一个 `CA_BUNDLE` 文件的路径给 `verify`。你也可以设置 # `REQUEST_CA_BUNDLE` 环境变量。

### 3.13 cert参数(客户端证书)

你也可以指定一个本地证书用作客户端证书，可以是单个文件（包含密钥和证书）或一个包含两个文件路径的元组：

```python
>>> requests.get('https://kennethreitz.org', cert=('/path/client.cert', '/path/client.key'))
<Response [200]>
```

或者保持在会话中：

```python
s = requests.Session()
s.cert = '/path/client.cert'
```

如果你指定了一个错误路径或一个无效的证书:

```python
>>> requests.get('https://kennethreitz.org', cert='/wrong_path/client.pem')
SSLError: [Errno 336265225] _ssl.c:347: error:140B0009:SSL routines:SSL_CTX_use_PrivateKey_file:PEM lib
```

> 本地证书的私有 key 必须是解密状态。目前，Requests 不支持使用加密的 key。

## 4、Requests库的错误和异常

发送请求的时候，如果遇到网络问题（如：DNS 查询失败、拒绝连接等）时，`Requests` 会抛出一个 `ConnectionError` 异常。

如果 HTTP 请求返回了不成功的状态码， `Response.raise_for_status()` 会抛出一个 `HTTPError` 异常。

若请求超时，则抛出一个 `Timeout` 异常。

若请求超过了设定的最大重定向次数，则会抛出一个 `TooManyRedirects` 异常。

所有`Requests`显式抛出的异常都继承自 `requests.exceptions.RequestException` 。具体如下：

| 异常                      | 说明                                       |
| ------------------------- | ------------------------------------------ |
| requests.ConnectionError  | 网络连接错误异常,如DNS查询失败，拒绝连接等 |
| requests.HTTPError        | HTTP错误异常                               |
| requests.URLRequired      | URL缺失异常                                |
| requests.TooManyRedirects | 超过最大重定向次数，产生重定向异常         |
| requests.ConnectTimeout   | 连接远程服务器超时异常                     |
| requests.Timeout          | 请求URL超时，产生超时异常                  |


Request库页提供了一个Response.raise_for_status()方法，与异常打交道，如果不是200，将产生异常request.HTTPError.

![image.png](https://gitee.com/iscn/md_images/raw/master/%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F/1712922882532-df1faaa8-665c-4bd1-b5b5-9eade531b980.png)

![image.png](https://cdn.nlark.com/yuque/0/2024/png/26323439/1712922900192-dc7b2562-579a-4553-88e3-eabf029b5864.png?x-oss-process=image%2Fformat%2Cwebp%2Fresize%2Cw_750%2Climit_0)
