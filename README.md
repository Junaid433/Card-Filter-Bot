# Card-Filter-Bot
A Telegram Bot to Filter credit cards from the mess.

## Bot may crash!! Please use pm2 so it restart each time it crashed !

Replace bot token on line 3 with yours.

Usage :

```
npm install pm2
npm install telegraf
pm2 start filter.js
```

You can use in these formats :

```
/filter 123456abcxdyz
/filter { reply to document }
/filter reply to text 
```
