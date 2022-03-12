---
title: Temporal.Now

---

# Temporal.Now

`Temporal.Now` 对象有几个方法可以提供有关当前时间和日期的信息。

[[toc]]

## 方法

### Temporal.Now.zonedDateTimeISO()

**Temporal.Now.zonedDateTimeISO(timeZone: object | string = Temporal.Now.timeZone()) : Temporal.ZonedDateTime**

**参数：**

* `timeZone`（可选对象或字符串）：获取当前日期和时间所在的时区，作为 `Temporal.TimeZone` 对象、实现时区协议的对象或字符串。 如果没有给出，将使用当前系统时区。

**返回：** 一个 `Temporal.ZonedDateTime` 对象，表示当前系统日期、时间、时区和时区偏移量。

此方法根据系统设置获取当前日期、时间、时区和时区偏移量，采用 ISO 8601 日历系统计算。 可选地，可以给出计算时间的时区，而不是当前系统时区。

此方法与 `zonedDateTime()` 相同，但始终使用 ISO 8601 日历。

示例用法：

```javascript
financialCentres = {
  'New York': 'America/New_York',
  London: 'Europe/London',
  Tokyo: 'Asia/Tokyo'
};
console.log(`Here: ${Temporal.Now.zonedDateTimeISO()}`);
Object.entries(financialCentres).forEach(([name, timeZone]) => {
  console.log(`${name}: ${Temporal.Now.zonedDateTimeISO(timeZone)}`);
});
// example output:
// Here: 2020-09-18T01:17:48.431957915-07:00[America/Los_Angeles]
// New York: 2020-09-18T04:17:48.435068431-04:00[America/New_York]
// London: 2020-09-18T09:17:48.438068435+01:00[Europe/London]
// Tokyo: 2020-09-18T17:17:48.441068438+09:00[Asia/Tokyo]
```

### Temporal.Now.zonedDateTime()

**Temporal.Now.zonedDateTime(calendar: object | string, timeZone: object | string = Temporal.Now.timeZone()) : Temporal.ZonedDateTime**

**参数：**

* `calendar`（`Temporal.Calendar`、普通对象或字符串）：获取当前日期和时间的日历系统。
* `timeZone`（可选对象或字符串）：获取当前日期和时间所在的时区，作为 `Temporal.TimeZone` 对象、实现时区协议的对象或字符串。 如果没有给出，将使用当前系统时区。

**返回：** 表示当前系统日期、时间、时区和时区偏移量的 `Temporal.ZonedDateTime` 对象。

该方法根据给定日历系统的系统设置，获取当前日期、时间、时区和时区偏移量。 可选地，可以给出计算时间的时区，而不是当前系统时区。

如果您只想使用 ISO 8601 日历，请使用 `Temporal.Now.zonedDateTimeISO()`。

### Temporal.Now.instant()

**Temporal.Now.instant() : Temporal.Instant**

**参数：**

**返回：** 表示当前系统时间的 `Temporal.Instant` 对象。

此方法获取当前准确的系统时间，而不考虑日历或时区。 例如，这是获取事件时间戳的好方法。 它的工作方式类似于旧式 JavaScript `Date.now()`，但精度为纳秒而不是毫秒。

示例用法：

```javascript
function timeit(func) {
  start = Temporal.Now.instant();
  try {
    return func();
  } finally {
    end = Temporal.Now.instant();
    console.log(`The function took ${end.since(start)}`);
  }
}
timeit(() => JSON.parse(someData));
// example output:
// The function took PT0.001031756S
```

### Temporal.Now.timeZone()

**Temporal.Now.timeZone() : Temporal.TimeZone**

**返回：** 根据当前系统设置表示时区的 `Temporal.TimeZone` 对象。

此方法获取当前系统时区。这通常是一个命名的 [IANA](https://www.iana.org/time-zones) 时区，因为这是大多数人配置他们的计算机的方式。

示例用法：

```javascript
/ When is the next daylight saving change from now, in the current location?
tz = Temporal.Now.timeZone();
now = Temporal.Now.instant();
nextTransition = tz.getNextTransition(now);
before = tz.getOffsetStringFor(nextTransition.subtract({ nanoseconds: 1 }));
after = tz.getOffsetStringFor(nextTransition.add({ nanoseconds: 1 }));
console.log(`At ${nextTransition.toZonedDateTimeISO(tz)} the offset will change from UTC ${before} to ${after}`);
// example output:
// At 2021-03-14T03:00:00-07:00[America/Los_Angeles] the offset will change from UTC -08:00 to -07:00
```

### Temporal.Now.plainDateTimeISO()

**Temporal.Now.plainDateTimeISO(timeZone: object | string = Temporal.Now.timeZone()) : Temporal.PlainDateTime**

**参数：**

* `timeZone`（可选对象或字符串）：获取当前日期和时间所在的时区，作为 `Temporal.TimeZone` 对象、实现时区协议的对象或字符串。如果没有给出，将使用当前系统时区。

**返回：** 一个 `Temporal.PlainDateTime` 对象，表示按照 ISO 8601 日历计算的当前系统日期和时间。

此方法根据系统设置获取当前日历日期和挂钟时间。可选地，可以给出计算时间的时区，而不是当前系统时区。

此方法与 相同 `dateTime()`，但始终使用 ISO 8601 日历。

示例用法：

```javascript
financialCentres = {
  'New York': 'America/New_York',
  'London': 'Europe/London',
  'Tokyo': 'Asia/Tokyo',
};
console.log(`Here: ${Temporal.Now.plainDateTimeISO()}`);
Object.entries(financialCentres).forEach(([name, timeZone]) => {
  console.log(`${name}: ${Temporal.Now.plainDateTimeISO(timeZone)}`);
});
// example output:
// Here: 2020-01-24T21:51:02.142905166
// New York: 2020-01-25T00:52:14.756462142
// London: 2020-01-25T05:52:14.758534756
// Tokyo: 2020-01-25T14:52:14.759534758
```

### Temporal.Now.plainDateTime()

**Temporal.Now.plainDateTime(calendar: object | string, timeZone: object | string = Temporal.Now.timeZone()) : Temporal.PlainDateTime**

**参数：**

* `calendar`（`Temporal.Calendar`, plain object, or string）：获取当前日期和时间的日历系统。
* `timeZone`（optional object or string）：获取当前日期和时间的时区，作为 `Temporal.TimeZone` 对象、实现时区协议的对象或字符串。 如果没有给出，将使用当前系统时区。

**返回：** 一个 `Temporal.PlainDateTime` 对象，表示在给定日历系统的计算中的当前系统日期和时间。

此方法根据系统设置获取当前日历日期和挂钟时间。 可选地，可以给出计算时间的时区，而不是当前系统时区。

如果您只想使用 ISO 8601 日历，请使用 `Temporal.Now.plainDateTimeISO()`。

### Temporal.Now.plainDateISO()

**Temporal.Now.plainDateISO(timeZone: object | string = Temporal.Now.timeZone()) : Temporal.PlainDate**

**参数：**

* `timeZone` (可选对象或字符串)：获取当前日期和时间的时区，作为 `Temporal.TimeZone` 对象、实现时区协议的对象或字符串。 如果没有给出，将使用当前系统时区。

**返回：** 一个 `Temporal.PlainDate` 对象，表示 ISO 8601 日历中的当前系统日期。

此方法根据系统设置获取当前日历日期。 可选地，可以给出计算时间的时区，而不是当前系统时区。

此方法与 `date()` 相同，但始终使用 ISO 8601 日历。

示例用法：

```javascript
// Is it New Year in the ISO 8601 calendar?
date = Temporal.Now.plainDateISO();
if (date.month === 1 && date.day === 1) console.log('New year!');
```

### Temporal.Now.plainDate()

**Temporal.Now.plainDate(calendar: object | string, timeZone: object | string = Temporal.Now.timeZone()) : Temporal.PlainDate**

**参数：**
* `calendar`（`Temporal.Calendar`、普通对象或字符串）：获取当前日期和时间的日历系统。
* `timeZone`（可选对象或字符串）：获取当前日期和时间所在的时区，作为 `Temporal.TimeZone` 对象、实现时区协议的对象或字符串。 如果没有给出，将使用当前系统时区。

**返回：** 一个 `Temporal.PlainDate` 对象，表示以给定日历计算的当前系统日期。

此方法根据系统设置获取当前日历日期。可选地，可以给出计算时间的时区，而不是当前系统时区。

如果您只想使用 ISO 8601 日历，请使用 `Temporal.Now.plainDateISO()`。

```javascript
// Is it Nowruz (New Year in the Persian calendar)?
date = Temporal.Now.plainDate('persian');
if (date.month === 1 && date.day === 1) console.log('New year!');
```

### Temporal.Now.plainTimeISO()

**Temporal.Now.plainTimeISO(timeZone: object | string = Temporal.Now.timeZone()) : Temporal.PlainTime**

**参数：**

* timeZone（可选对象或字符串）：获取当前日期和时间所在的时区，可为 `Temporal.TimeZone` 对象、实现时区协议的对象或字符串。 如果没有给出，将使用当前系统时区。

**返回：** 一个 `Temporal.PlainTime` 对象，表示按照 ISO 8601 日历计算的当前系统时间。

此方法根据系统设置获取当前挂钟时间。 可选地，可以给出计算时间的时区，而不是当前系统时区

示例用法：

```javascript
// Is it lunchtime?
time = Temporal.Now.plainTimeISO();
if (time.hour === 12) console.log('Lunchtime!');
```
