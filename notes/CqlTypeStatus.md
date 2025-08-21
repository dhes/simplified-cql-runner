|Identifier|Expression|CQL Runner|ExecuteCQL|
|---|---|---|---|
|CqlDateTimeDay|DateTime(2012, 4, 4)| "2012-04-04"|2012-04-04|
|CqlDateTimeHour|DateTime(2012, 4, 4, 12)| "2012-04-04"|2012-04-04T12|
|CqlDateTimeLiteralDay|@2012-04-04| "2012-04-04"|2012-04-04|
|CqlDateTimeLiteralHour|@2012-04-04T12| "2012-04-04"|2012-04-04T12|
|CqlDateTimeLiteralMilli|@2012-04-04T12:30:45.250| "2012-04-04T12:30:45.250Z"|2012-04-04T12:30:45.250|
|CqlDateTimeLiteralMinute|@2012-04-04T12:30| "2012-04-04"|2012-04-04T12:30|
|CqlDateTimeLiteralMonth|@2012-04| "2012-04"|2012-04|
|CqlDateTimeLiteralOffset|@2012-04-04T12:30:45.250-07:00| "2012-04-04T12:30:45.250-07:00"|2012-04-04T12:30:45.250|
|CqlDateTimeLiteralSecond|@2012-04-04T12:30:45| "2012-04-04T12:30:45Z"|2012-04-04T12:30:45|
|CqlDateTimeLiteralYear|@2012| "2012"|2012|
|CqlDateTimeMilli|DateTime(2012, 4, 4, 12, 30, 45, 250)| "2012-04-04T12:30:45.250Z"|2012-04-04T12:30:45.250|
|CqlDateTimeMinute|DateTime(2012, 4, 4, 12, 30)| "2012-04-04"|2012-04-04T12:30|
|CqlDateTimeMonth|DateTime(2012, 4)| "2012-04"|2012-04|
|CqlDateTimeOffset|DateTime(2012, 4, 4, 12, 30, 45, 250, -7.0)| "2012-04-04T12:30:45.250-07:00"|2012-04-04T12:30:45.250|
|CqlDateTimeSecond|DateTime(2012, 4, 4, 12, 30, 45)| "2012-04-04T12:30:45Z"|2012-04-04T12:30:45|
|CqlDateTimeYear|DateTime(2012)| "2012"|2012|
|CqlDateTimeZeroOffset|DateTime(2012, 4, 4, 12, 30, 45, 250, 0.0)|"2012-04-04T12:30:45.250Z"|2012-04-04T12:30:45.250|
|CqlDecimal|5.0| 5|5.0|
|CqlDecimalMaxPrecision|5.00000001| 5.00000001|5.00000001|
|CqlInteger|5| 5|5|
|CqlQuantity|5.0 'g'| {/n"value": 5,/n"unit": "g",/n"system": "http://unitsofmeasure.org",/n"code": "g"}|5.0 'g'|
|CqlTimeHour|Time(12)| "12"|12|
|CqlTimeLiteralHour|@T12| "12"|12|
|CqlTimeLiteralMilli|@T12:30:15.100| "12:30:15.100"|12:30:15.100|
|CqlTimeLiteralMinute|@T12:30| "12:30"|12:30|
|CqlTimeLiteralSecond|| "12:30:15"|12:30:15|
|CqlTimeMilli|@T12:30:15| "12:30:15.100"|12:30:15.100|
|CqlTimeMinute|Time(12, 30)| "12:30"||
|CqlTimeSecond|Time(12, 30, 15)| "12:30:15"|12:30:15|
|IntegerLowerBound|-2147483647| -2147483647||
|IntegerUpperBound|2147483647| 2147483647||

*CqlList* and *CqlListOfList* don't fit neatly into this table. 

For the *CqlList* identifer, the expression is '{ 1, 2, 3 }' and the our CQL Runner output is:
```
>> CqlList: 1
>> CqlList: 2
>> CqlList: 3
```
In other words, it creates an entry for each item in the list. The ExecuteCQL output is: [1, 2, 3]

For the *CqlListOfList* identifier, the expression is '{ { 1 }, { 1, 2, 3}, { 4 }, { 5 } }' and our CQL Runner output is: 
```
>> CqlListOfList: Tuple {  }
>> CqlListOfList: Tuple {  }
>> CqlListOfList: Tuple {  }
>> CqlListOfList: Tuple {  }
```
In other words Runner creates an entry for each tuple, consisting of an empty tuple. The Execute CQL output is: [[1], [1, 2, 3], [4], [5]]

In the case of CqlDateTimeLiteralOffset I think the authors left out the offset. They may have meant `define CqlDateTimeLiteralOffset: @2012-04-04T12:30:45.250-07:00` instead of `define CqlDateTimeLiteralOffset: @2012-04-04T12:30:45.250Z`

??? CqlDateTimeLiteralOffset - missing offset in ExecuteCQL!	