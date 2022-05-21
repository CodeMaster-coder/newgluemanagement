import requests
import json
import pymysql
import schedule
import time
import signal
import sys
import datetime as datetime
import json


def typechange(obj):
    if isinstance(obj,datetime.date):
        return obj.strftime("%Y-%m-%d")
    else:
        return  obj
# 强制退出不报错
def Quit(signum, frame):
    print("Quit")
    sys.exit()


signal.signal(signal.SIGINT, Quit)
signal.signal(signal.SIGTERM, Quit)
#
# # 这里填写appid和secret
appid = 
secret = 
openid = 

# 获取access_token
def access_token():
    url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=%s&secret=%s" % (
        appid, secret)
    res = requests.get(url).json()
    print("----------res =", res['access_token'])
    return res['access_token']

    print('access_token')


# access_token()


# 这里获取用户的appid，填入一次发送一次，appid来自自己的数据库
def message():
    connc = pymysql.connect(
        # mysql 服务端ip
        user=,  # The first four arguments is based on DB-API 2.0 recommendation.
        password=,
        host=,
        database=,
        port=3306,
        charset='utf8'
    )
    # 3创建游标对象
    cur = connc.cursor()

    # 4 编写SQL语句
    sql = """SELECT gluecode,effectiveDate,DATEDIFF(effectiveDate,NOW()) FROM `history` WHERE DATEDIFF(effectiveDate,NOW()) < 15 and recoverDate is null"""

    cur.execute(sql)
    # print('1111')
    # 6 提交操作
    result = cur.fetchall()
    # print(result)
    # print(type(result))

    # 7关闭游标对象
    cur.close()
    # 8 关闭连接
    connc.close()
    # 将元组转化为列表
    list1 = []
    list2 = []
    list3 = []
    for i in result:
        list1.append(i[0])
        list2.append(typechange(i[1]))
        list3.append(i[2])
    if len(list1) > 0:
        touser = openid
        access_token1 = access_token()
        print("-----------access_token =", access_token1)
        url = "https://api.weixin.qq.com/cgi-bin/message/subscribe/send?access_token=%s" % (access_token1)

        # 模板id填自己申请的id，字段名称都要对应
        body = {
            "touser": touser,
            "template_id": "5WHUJtfeBHGSUCqX4eb2qe3EBG3njjOCvJdJMkaWnC4",
            "page": "pages/mainpage/mainpage",
            "lang": "zh_CN",
            "data": {
                "time2": {
                    "value": '%s' % list2[0]
                },
                "thing3": {
                    "value": '%s' % list3[0]
                },
                "thing1": {
                    "value": '%s' % list1[0]
                }
            }
        }
        response = requests.post(url, json=body)
        print(response.text)
        # return response
    else:
        print('无过期信息！！')






# 用schedule设置执行时间
if __name__ == '__main__':
    # 这句的意思是，每天的21：30，发送一次订阅消息
    schedule.every().day.at("09:00").do(message)
    while True:
        schedule.run_pending()
        time.sleep(1)
