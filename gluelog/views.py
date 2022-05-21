from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response
import pymysql
import datetime as datetime
import json

"""不理解这个怎样实现的，需要学习loginview方法"""

def typechange(obj):
    if isinstance(obj,datetime.date):
        return obj.strftime("%Y-%m-%d")
    else:
        return  obj






class LoginView(APIView):
    def post(self, request, *args, **kwargs):
        # print(request.data)
        data_getdata = request.data  # 接收到的前端数据
        if data_getdata['code'] == 'inventory':
            model = eval(data_getdata['model'])  # 工段
            modelNumber = eval(data_getdata['modelNumber'])  # 区域
            productDate = eval(data_getdata['productDate'])  # 焊枪型号
            effectiveDate = eval(data_getdata['effectiveDate'])  # 焊枪
            voucher = eval(data_getdata['voucher']) # 数量
            gluecode = eval(data_getdata['gluecode']) # 更换原因
            inventoryDate = datetime.datetime.now().strftime("%Y-%m-%d %H-%M-%S")  # 引入时间函数，编写当前日期
            print(productDate[0])
            # print("班次：",shift,"工段：",section,"区域：",area,"焊枪：",gun,"型号：",
            #       model,"数量：",counterNum,"更换原因：",reason,"更换人：",changebody ,time)
            i = len(model)
            n = 0  # 循环变量
            while n < i:
                try:
                    # 2.连接mysql数据库的服务器
                    connc = pymysql.connect(
                        user='USER',  # The first four arguments is based on DB-API 2.0 recommendation.
                        password="PASSWORD",
                        host='HOST',
                        database='DATABASE',
                        port=3306,
                        charset='utf8'
                    )
                    # 3创建游标对象
                    cur = connc.cursor()

                    # 4 编写SQL语句
                    sql = 'insert into history (model, modelNumber, productDate, effectiveDate, voucher, gluecode, inventoryDate) values (%s,%s,%s,%s,%s,%s,%s)'
                    add_data = [model[n], modelNumber[n], datetime.date(*map(int, productDate[n].split('-'))), datetime.date(*map(int, effectiveDate[n].split('-'))), voucher[n], gluecode[n], inventoryDate]
                    # 5 使用游标对象去调用SQL
                    cur.execute(sql, add_data)

                    # 6 提交操作
                    connc.commit()

                    # 7关闭游标对象
                    cur.close()
                    # 8 关闭连接
                    connc.close()

                except Exception as e:
                    return Response({"status": 'duplicate'})
                n = n + 1  # 循环加1

            return Response({"status": True})
        elif data_getdata["code"] == "searcheGluecode":
            print(data_getdata)
            gluecode = ("'" + str(data_getdata["gluecode"]) + "'")

            print(gluecode)
            # value = ("'" + str(openid) + "'")


            # 2.连接mysql数据库的服务器
            connc = pymysql.connect(
                # mysql 服务端ip
                 user='USER',  # The first four arguments is based on DB-API 2.0 recommendation.
                        password="PASSWORD",
                        host='HOST',
                        database='DATABASE',
                        port=3306,
                        charset='utf8'
            )
            # 3创建游标对象
            cur = connc.cursor()

            # 4 编写SQL语句
            sql = """SELECT * FROM `history` where gluecode  =%s""" % (gluecode)

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
            print(result)
            for i in result:
                list1.append(list(i))
            print(list1)
            if len(list1) > 0:
                for j in list1[0]:
                    m = typechange(j)
                    list2.append(m)
                list3.append(list2)

            print(list2)


            keys = ['id', 'gluecode', 'model', 'modelNumber','productDate', 'effectiveDate', 'voucher', 'inventoryDate',
                    'lingyongbanci','userSection','collectDate','collectNum','collectPerson','exchangebanci','exchangeSection',
                    'exchangeArea','exchangeRobot','exchangeNum','exchangePerson','exchangeDate',
                    'recoverbanci','recoverWeight','recoverPerson','recoverDate']
            list_json = [dict(zip(keys, item)) for item in list3]
            # print(list_json)
            str_json = json.dumps(list_json, indent=2, ensure_ascii=False)
            backinfo = json.loads(str_json)
            return Response(backinfo)
        if data_getdata['code'] == 'collect':
            id = data_getdata['id']
            collectPerson = data_getdata['collectPerson']
            lingyongbanci = data_getdata['lingyongbanci']
            userSection = data_getdata['userSection'] # 焊枪型号
            collectDate = datetime.datetime.now().strftime("%Y-%m-%d %H-%M-%S")  # 引入时间函数，编写当前日期
            try:
                # 2.连接mysql数据库的服务器
                connc = pymysql.connect(
                    # mysql 服务端ip
                 user='USER',  # The first four arguments is based on DB-API 2.0 recommendation.
                        password="PASSWORD",
                        host='HOST',
                        database='DATABASE',
                        port=3306,
                        charset='utf8'
                    port=3306,
                    charset='utf8'
                )
                # 3创建游标对象
                cur = connc.cursor()

                # 4 编写SQL语句
                sql = 'UPDATE history SET lingyongbanci = %s,userSection = %s,collectPerson= %s, collectDate = %s, collectNum = 1 WHERE id = %s;'
                value = [lingyongbanci, userSection, collectPerson, collectDate, id ]
                # 5 使用游标对象去调用SQL
                cur.execute(sql, value)

                # 6 提交操作
                connc.commit()

                # 7关闭游标对象
                cur.close()
                # 8 关闭连接
                connc.close()
                n = n + 1  # 循环加1
            except Exception as e:
                print(e)

            return Response({"status": True})

        if data_getdata['code'] == 'subarea':

            exchangeSection = data_getdata['exchangeSection']
            try:
                # 2.连接mysql数据库的服务器
                connc = pymysql.connect(
                    # mysql 服务端ip
                 user='USER',  # The first four arguments is based on DB-API 2.0 recommendation.
                        password="PASSWORD",
                        host='HOST',
                        database='DATABASE',
                        port=3306,
                        charset='utf8'
                    port=3306,
                    charset='utf8'
                )
                # 3创建游标对象
                cur = connc.cursor()

                # 4 编写SQL语句
                sql = 'SELECT DISTINCT secRobMod.subarea FROM secRobMod where area = %s;'
                value = [exchangeSection]
                # 5 使用游标对象去调用SQL
                cur.execute(sql, value)

                # 6 提交操作
                connc.commit()
                result = cur.fetchall()
                # 7关闭游标对象
                cur.close()
                # 8 关闭连接
                connc.close()
            finally:
                list1 = []
                # list2 = []
                for i in result:
                    # print(i)
                    list1.append(list(i))
                    print(list1)
                    str_json1 = sum(list1, [])
                    print(str_json1)
                str_json = json.dumps(str_json1, ensure_ascii=False)
            backuserinfo = (str_json)
            return Response({backuserinfo})
        if data_getdata['code'] == 'robot':

            exchangeSection = data_getdata['exchangeSection']
            exchangeArea = data_getdata['exchangeArea']
            try:
                # 2.连接mysql数据库的服务器
                connc = pymysql.connect(
                    # mysql 服务端ip
                 user='USER',  # The first four arguments is based on DB-API 2.0 recommendation.
                        password="PASSWORD",
                        host='HOST',
                        database='DATABASE',
                        port=3306,
                        charset='utf8'
                    port=3306,
                    charset='utf8'
                )
                # 3创建游标对象
                cur = connc.cursor()

                # 4 编写SQL语句
                sql = 'SELECT DISTINCT secRobMod.robot FROM secRobMod where area = %s and subarea = %s;'
                value = [exchangeSection,exchangeArea]
                # 5 使用游标对象去调用SQL
                cur.execute(sql, value)

                # 6 提交操作
                connc.commit()
                result = cur.fetchall()
                # 7关闭游标对象
                cur.close()
                # 8 关闭连接
                connc.close()
            finally:
                list1 = []
                # list2 = []
                for i in result:
                    # print(i)
                    list1.append(list(i))
                    print(list1)
                    str_json1 = sum(list1, [])
                    print(str_json1)
                str_json = json.dumps(str_json1, ensure_ascii=False)
            backuserinfo = (str_json)
            return Response({backuserinfo})
        if data_getdata['code'] == 'exchange':
            id = data_getdata['id']
            exchangePerson = data_getdata['exchangePerson']
            exchangebanci = data_getdata['exchangebanci']
            exchangeSection = data_getdata['exchangeSection']
            print(exchangeSection)
            exchangeArea = data_getdata['exchangeArea']
            exchangeRobot = data_getdata['exchangeRobot']
            exchangeDate = datetime.datetime.now().strftime("%Y-%m-%d %H-%M-%S")  # 引入时间函数，编写当前日期
            try:
                # 2.连接mysql数据库的服务器
                connc = pymysql.connect(
                    # mysql 服务端ip
                 user='USER',  # The first four arguments is based on DB-API 2.0 recommendation.
                        password="PASSWORD",
                        host='HOST',
                        database='DATABASE',
                        port=3306,
                        charset='utf8'
                    port=3306,
                    charset='utf8'
                )
                # 3创建游标对象
                cur = connc.cursor()

                # 4 编写SQL语句
                sql = 'UPDATE history SET exchangePerson = %s,exchangebanci = %s,exchangeSection= %s, exchangeArea = %s,' \
                      'exchangeDate = %s, exchangeRobot = %s, exchangeNum = 1 WHERE id = %s;'
                value = [exchangePerson, exchangebanci, exchangeSection, exchangeArea, exchangeDate, exchangeRobot,  id ]
                # 5 使用游标对象去调用SQL
                cur.execute(sql, value)

                # 6 提交操作
                connc.commit()

                # 7关闭游标对象
                cur.close()
                # 8 关闭连接
                connc.close()
                n = n + 1  # 循环加1
            except Exception as e:
                print(e)

            return Response({"status": True})
        if data_getdata['code'] == 'recover':
            id = data_getdata['id']
            recoverPerson = data_getdata['recoverPerson']
            recoverbanci = data_getdata['recoverbanci']
            recoverWeight = data_getdata['recoverWeight']
            recoverDate = datetime.datetime.now().strftime("%Y-%m-%d %H-%M-%S")  # 引入时间函数，编写当前日期
            try:
                # 2.连接mysql数据库的服务器
                connc = pymysql.connect(
                    # mysql 服务端ip
                 user='USER',  # The first four arguments is based on DB-API 2.0 recommendation.
                        password="PASSWORD",
                        host='HOST',
                        database='DATABASE',
                        port=3306,
                        charset='utf8'
                    port=3306,
                    charset='utf8'
                )
                # 3创建游标对象
                cur = connc.cursor()

                # 4 编写SQL语句
                sql = 'UPDATE history SET recoverPerson = %s,recoverbanci = %s,recoverWeight= %s, recoverDate = %s WHERE id = %s;'
                value = [recoverPerson, recoverbanci, recoverWeight, recoverDate,id ]
                # 5 使用游标对象去调用SQL
                cur.execute(sql, value)

                # 6 提交操作
                connc.commit()

                # 7关闭游标对象
                cur.close()
                # 8 关闭连接
                connc.close()
                n = n + 1  # 循环加1
            except Exception as e:
                print(e)

            return Response({"status": True})
        elif data_getdata["code"] == "overdue":
            # 2.连接mysql数据库的服务器
            connc = pymysql.connect(
                # mysql 服务端ip
                 user='USER',  # The first four arguments is based on DB-API 2.0 recommendation.
                        password="PASSWORD",
                        host='HOST',
                        database='DATABASE',
                        port=3306,
                        charset='utf8'
            )
            # 3创建游标对象
            cur = connc.cursor()

            # 4 编写SQL语句
            sql = """SELECT id,gluecode,model,productDate,voucher,effectiveDate,inventoryDate,
            lingyongbanci,userSection,collectDate,collectPerson,exchangebanci,exchangeArea,
            exchangeSection,exchangeRobot,exchangePerson,exchangeDate,DATEDIFF(effectiveDate,NOW()) 
            FROM `history` WHERE DATEDIFF(effectiveDate,NOW()) < 15 and recoverDate is null ORDER BY DATEDIFF(effectiveDate,NOW())"""

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
            # print(result)
            for i in result:
                list1.append(list(i))
            # print(len(list1))
            if len(list1) > 0:
                j = 0
                n = 0
                while j < len(list1):

                    print('list1',list1[j])
                    for n in list1[j]:
                        m = typechange(n)
                        list2.append(m)
                        print('list2',list2)
                    j = j + 1
                    list3.append(list2)
                    list2 = []


            print(list3)


            keys = ['id','gluecode','model','productDate','voucher','effectiveDate','inventoryDate',
                    'lingyongbanci','userSection','collectDate','collectPerson','exchangebanci',
                    'exchangeArea','exchangeSection','exchangeRobot','exchangePerson','exchangeDate',
                    'overduetime']
            list_json = [dict(zip(keys, item)) for item in list3]
            print(list_json)
            str_json = json.dumps(list_json, indent=2, ensure_ascii=False)
            backinfo = json.loads(str_json)
            return Response(backinfo)
        if data_getdata['code'] == 'effectivechange':
            id = data_getdata['id']
            effectiveDate= data_getdata['effectiveDate']
            try:
                # 2.连接mysql数据库的服务器
                connc = pymysql.connect(
                    # mysql 服务端ip
                 user='USER',  # The first four arguments is based on DB-API 2.0 recommendation.
                        password="PASSWORD",
                        host='HOST',
                        database='DATABASE',
                        port=3306,
                        charset='utf8'
                    port=3306,
                    charset='utf8'
                )
                # 3创建游标对象
                cur = connc.cursor()

                # 4 编写SQL语句
                sql = 'UPDATE history SET effectiveDate = %s WHERE id = %s;'
                value = [effectiveDate, id ]
                # 5 使用游标对象去调用SQL
                cur.execute(sql, value)

                # 6 提交操作
                connc.commit()

                # 7关闭游标对象
                cur.close()
                # 8 关闭连接
                connc.close()
                n = n + 1  # 循环加1
            except Exception as e:
                print(e)

            return Response({"status": True})
