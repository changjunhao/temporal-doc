---
title: Temporal.Instant

---

# Temporal.Instant

[[toc]]

`Temporal.Instant`是单个时间点（称为“精确时间”），精度以纳秒为单位。不存在时区或日历信息。因此`Temporal.Instant`没有天、月甚至小时的概念。

为了方便互操作性，它在内部使用自Unix 纪元（1970 年 1 月 1 日午夜 UTC）以来的纳秒。但是，`Temporal.Instant`可以从引用确切时间的多个表达式中的任何一个创建，包括具有时区的 ISO 8601 字符串，例如'2020-01-23T17:04:36.491865121-08:00'。

如果您有旧Date实例，则可以使用其`toTemporalInstant()`方法转换为`Temporal.Instant`。
```javascript
// Date.prototype.toTemporalInstant = toTemporalInstant (未标准化，使用 polyfill 时)
new Date().toTemporalInstant() // Temporal.Instant
```

由于`Temporal.Instant`不包含有关时区的任何信息，因此需要`Temporal.TimeZone`才能将其转换为`Temporal.PlainDateTime`（并从那里转换为任何其他Temporal对象。）

```javascript
new Temporal.TimeZone('Asia/Shanghai').getPlainDateTimeFor(Temporal.Now.instant()) // Temporal.PlainDateTime
```

像 Unix 时间一样，Temporal.Instant忽略闰秒。

## Constructor

### new Temporal.Instant()

**new Temporal.Instant(epochNanoseconds : bigint) : Temporal.Instant**

**参数：**
* `epochNanoseconds`（bigint）：纳秒数。

**返回：** 一个新`Temporal.Instant`对象。

创建一个`Temporal.Instant`表示准确时间的新对象。

`epochNanoseconds`是 Unix 纪元（1970 年 1 月 1 日午夜 UTC）与所需准确时间之间的纳秒数（10<sup>-9</sup> 秒）。

如果您已经知道精确的纳秒数并是 bigint 形式（例如来自数据库），请直接使用此构造函数。否则，接受更多类型输入的`Temporal.Instant.from()`可能更方便。

此类型的允许值范围与旧式 JavaScript 相同，即 Unix 纪元前后Date1 亿 (10<sup>8</sup>) 天。这个范围涵盖了大约 50 万年。`如果epochNanoseconds超出此范围`，将抛出RangeError。

示例用法：

```javascript
instant = new Temporal.Instant(1553906700000000000n); // => 2019-03-30T00:45:00Z
// When was the Unix epoch?
epoch = new Temporal.Instant(0n); // => 1970-01-01T00:00:00Z
// Dates before the Unix epoch are negative
turnOfTheCentury = new Temporal.Instant(-2208988800000000000n); // => 1900-01-01T00:00:00Z
```

## 静态方法

### Temporal.Instant.from()

**Temporal.Instant.from(thing: any) : Temporal.Instant**

**参数：**
* `thing`：表示所需确切时间的值。

**返回：** 一个新`Temporal.Instant`对象。

这个静态方法从另一个值创建一个新`Temporal.Instant`对象。如果该值是另一个`Temporal.Instant`对象，则返回一个表示相同确切时间的新对象。

任何其他值都将转换为字符串，该字符串应采用 ISO 8601 格式，包括日期、时间和时区。时区名称（如果给定）将被忽略；仅考虑时区偏移。

示例用法：

```javascript
instant = Temporal.Instant.from('2019-03-30T01:45:00+01:00[Europe/Berlin]');
instant = Temporal.Instant.from('2019-03-30T01:45+01:00');
instant = Temporal.Instant.from('2019-03-30T00:45Z');
instant === Temporal.Instant.from(instant); // => false

// Not enough information to denote an exact time:
/* WRONG */ instant = Temporal.Instant.from('2019-03-30'); // => throws, no time
/* WRONG */ instant = Temporal.Instant.from('2019-03-30T01:45'); // => throws, no time zone
```

### Temporal.Instant.fromEpochSeconds()

**Temporal.Instant.fromEpochSeconds(epochSeconds: number) : Temporal.Instant**

**参数：**
* `epochSeconds`（number）：秒数。

**返回：** 一个新`Temporal.Instant`对象。

此静态方法创建一个具有秒精度的新`Temporal.Instant`对象。epochSeconds 是 Unix 纪元（1970 年 1 月 1 日午夜 UTC）和所需的确切时间之间的秒数。

自 Unix 纪元以来的秒数是许多计算机系统中精确时间的常用度量。如果您需要与此类系统交互，请使用此方法。

示例用法：

```javascript
// Same examples as in new Temporal.Instant(), but with seconds precision
instant = Temporal.Instant.fromEpochSeconds(1553906700);
epoch = Temporal.Instant.fromEpochSeconds(0); // => 1970-01-01T00:00:00Z
turnOfTheCentury = Temporal.Instant.fromEpochSeconds(-2208988800); // => 1900-01-01T00:00:00Z
```

### Temporal.Instant.fromEpochMilliseconds()

**Temporal.Instant.fromEpochMilliseconds(epochMilliseconds: number) : Temporal.Instant**

**参数：**
* `epochMilliseconds`（number）：毫秒数。

**返回：** 一个新`Temporal.Instant`对象。

与`Temporal.Instant.fromEpochSeconds()`相同，但精度为毫秒（10<sup>-3</sup>秒）。

自 Unix 纪元以来的毫秒数也从旧 JavaScript Date 对象的 getTime() 和 valueOf() 方法以及 Date.now() 中返回。 但是，对于从旧版 Date 到 Temporal.Instant 的转换，请使用 Date.prototype.toTemporalInstant：

```javascript
legacyDate = new Date('December 17, 1995 03:24:00 GMT');
instant = Temporal.Instant.fromEpochMilliseconds(legacyDate.getTime()); // => 1995-12-17T03:24:00Z
instant = Temporal.Instant.fromEpochMilliseconds(+legacyDate); // valueOf() called implicitly
instant = legacyDate.toTemporalInstant(); // recommended

// Use fromEpochMilliseconds, for example, if you have epoch millisecond
// data stored in a file:
todayMs = Temporal.Instant.fromEpochMilliseconds(msReadFromFile);
```

### Temporal.Instant.fromEpochMicroseconds()

**Temporal.Instant.fromEpochMicroseconds(epochMicroseconds : bigint) : Temporal.Instant**

**参数：**
* `epochMicroseconds`（bigint）：微秒数。

**返回：** 一个新`Temporal.Instant`对象。

与`Temporal.Instant.fromEpochSeconds()`相同，但精度为微秒（10<sup>-6</sup>秒）。

### Temporal.Instant.fromEpochNanoseconds()

**Temporal.Instant.fromEpochNanoseconds(epochNanoseconds : bigint) : Temporal.Instant**

**参数：**
* `epochNanoseconds`（bigint）：纳秒数。

**返回：** 一个新`Temporal.Instant`对象。

与`Temporal.Instant.fromEpochSeconds()`相同，但精度为纳秒（10<sup>-9</sup>秒）。也与`new Temporal.Instant(epochNanoseconds)`一致。

### Temporal.Instant.compare()

**Temporal.Instant.compare(one: Temporal.Instant | string, two: Temporal.Instant | string) : number**

**参数：**

* `one`（`Temporal.Instant`或可转换为`Temporal.Instant`的值）：用于比较的第一个值。
* `two`（`Temporal.Instant`或可转换为`Temporal.Instant`的值）：用于比较的第二个值。

**返回：** -1、0 或 1。

比较两个Temporal.Instant对象。返回一个整数表示是`one`在`two`之前、之后或等于。

* -1 如果`one`在`two`之前；
* 0 如果`one`和`two`表示同一时间；
* 1 如果`one`在`two`之后。

如果`one`和`two`不是`Temporal.Instant`对象，那么它们将被转换为 1，就好像它们被传递给`Temporal.Instant.from()`.

此函数可用于对Temporal.Instant对象数组进行排序。例如：

```javascript
one = Temporal.Instant.fromEpochSeconds(1.0e9);
two = Temporal.Instant.fromEpochSeconds(1.1e9);
three = Temporal.Instant.fromEpochSeconds(1.2e9);
sorted = [three, one, two].sort(Temporal.Instant.compare);
sorted.join(' ');
// => '2001-09-09T01:46:40Z 2004-11-09T11:33:20Z 2008-01-10T21:20:00Z'
```

## 属性

### instant.epochSeconds

**instant.epochSeconds : number**

此属性的值是 Unix 纪元（1970 年 1 月 1 日午夜 UTC）和`instant`之间的整数秒数。 如果`instant`在 1970 年之前，此数字将为负数。秒数被截断为零。

如果您需要与其他一些以 Unix 纪元以来的秒为单位计算时间的系统进行交互，请使用此属性。

示例用法：

```javascript
instant = Temporal.Instant.from('2019-03-30T01:45+01:00');
instant.epochSeconds; // => 1553906700
```

### instant.epochMilliseconds

**instant.epochMilliseconds : number**

与`epochSeconds`相同，但精度为毫秒（10<sup>-3</sup>秒）。秒数被截断为零。

如果需要，此方法特别适用于创建旧式 JavaScriptDate对象。一个例子：

```javascript
instant = Temporal.Instant.from('2019-03-30T00:45Z');
new Date(instant.epochMilliseconds); // => 2019-03-30T00:45:00.000Z
```

### instant.epochMicroseconds

**instant.epochMicroseconds : bigint**

与`epochSeconds`相同，但该值是具有微秒（10<sup>-6</sup>秒）精度的 bigint。秒数被截断为零。

### instant.epochNanoseconds

**instant.epochNanoseconds : bigint**

与`epochSeconds`相同，但该值是具有纳秒（10<sup>-9</sup>秒）精度的 bigint。

该属性的值适合传递给`new Temporal.Instant()`。


## 方法

### instant.toZonedDateTimeISO()

**instant.toZonedDateTimeISO(timeZone: object | string) : Temporal.ZonedDateTime**

**参数：**

* `timeZone`（对象或字符串）：要么 
  * 一个`Temporal.TimeZone`对象 
  * 实现时区协议的对象 
  * 时区的字符串描述；其 IANA 名称或 UTC 偏移量
  * 具有timeZone属性的对象，其值为上述任何一种。

**返回：** 一个`Temporal.ZonedDateTime`对象，表示日历日期、挂钟时间、时区偏移量和timeZone，根据 ISO 8601 日历的计算，在`instant`指示的确切时间。

有关 IANA 时区名称的列表，请参阅[IANA 时区数据库](https://www.iana.org/time-zones)的当前版本。[维基百科](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)上也提供了一个方便的列表，尽管它可能无法反映最新的官方状态。

此方法是将 `Temporal.Instant` 转换为 `Temporal.ZonedDateTime` 的一种方法。 它与 `toZonedDateTime()` 相同，但始终使用 ISO 8601 日历。 如果您不在其他日历中进行计算，请使用此方法。

示例用法：

```javascript
// Converting a specific exact time to a calendar date / wall-clock time
timestamp = Temporal.Instant.fromEpochSeconds(1553993100);
timestamp.toZonedDateTimeISO('Europe/Berlin'); // => 2019-03-31T01:45:00+01:00[Europe/Berlin]
timestamp.toZonedDateTimeISO('UTC'); // => 2019-03-31T00:45:00+00:00[UTC]
timestamp.toZonedDateTimeISO('-08:00'); // => 2019-03-30T16:45:00-08:00[-08:00]
```

### instant.toZonedDateTime()

**instant.toZonedDateTime(item: object) : Temporal.ZonedDateTime**

**参数：**

* item（对象）：具有要与 `instant` 组合的属性的对象。识别以下属性：
  * `calendar`（必需的日历标识符字符串、`Temporal.Calendar` 对象或实现日历协议的对象）：解释即时的日历。 
  * `timeZone`（必需的时区标识符字符串、`Temporal.TimeZone` 对象或实现时区协议的对象）：解释即时的时区。

**返回：** 一个 `Temporal.ZonedDateTime` 对象，表示日历日期、挂钟时间、时区偏移量和`timeZone`，根据`calendar`的计算，在 `instant` 指示的确切时间。

有关 IANA 时区名称的列表，请参阅[IANA 时区数据库](https://www.iana.org/time-zones)的当前版本。[维基百科](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)上也提供了一个方便的列表，尽管它可能无法反映最新的官方状态。

有关日历标识符的列表，请参阅 [Intl.DateTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#parameters) 的文档。

如果您只想使用 ISO 8601 日历，请使用 `toZonedDateTimeISO()`。

示例用法：

```javascript
// What time was the Unix epoch (timestamp 0) in Bell Labs (Murray Hill, New Jersey, USA) in the Gregorian calendar?
epoch = Temporal.Instant.fromEpochSeconds(0);
timeZone = Temporal.TimeZone.from('America/New_York');
epoch.toZonedDateTime({ timeZone, calendar: 'gregory' });
  // => 1969-12-31T19:00:00-05:00[America/New_York][u-ca=gregory]

// What time was the Unix epoch in Tokyo in the Japanese calendar?
timeZone = Temporal.TimeZone.from('Asia/Tokyo');
calendar = Temporal.Calendar.from('japanese');
zdt = epoch.toZonedDateTime({ timeZone, calendar });
  // => 1970-01-01T09:00:00+09:00[Asia/Tokyo][u-ca=japanese]
console.log(zdt.eraYear, zdt.era);
  // => '45 showa'
```

### instant.add()

**instant.add(duration: Temporal.Duration | object | string) : Temporal.Instant**

**参数：**

* `duration`（`Temporal.Duration`或可转换为`Temporal.Duration`的值）：要添加的持续时间。

**返回：** 一个新`Temporal.Instant`对象，由指示的确切时间 `instant` + `duration`。

此方法添加`duration`到`instant`。

参数是具有表示持续时间的属性的`duration`对象，例如`{ hours: 5, minutes: 30 }`，或字符串，例如`PT5H30M`，或`Temporal.Duration`对象。如果`duration`不是 `Temporal.Duration` 对象，那么它将被转换为`Temporal.Duration`对象，就好像它被传递给了`Temporal.Duration.from()`一样。

`years`、`months`、`weeks`和`days`字段的 `duration` 必须为零。 `Temporal.Instant` 独立于时区和日历，因此年、月、周和日的长度可能不同，具体取决于它们所计算的日历或时区。这使得这些单位的加法不明确。 如果您需要这样做，请通过指定所需的日历和时区将 `Temporal.Instant` 转换为 `Temporal.PlainDateTime`，添加持续时间，然后将其转换回来。

如果结果早于或晚于 `Temporal.Instant` 可以表示的范围（大约以 Unix 纪元为中心的 50 万年），则会抛出 RangeError。

添加负持续时间相当于减去该持续时间的绝对值。

示例用法：

```javascript
// Temporal.Instant representing five hours from now
Temporal.Now.instant().add({ hours: 5 });
fiveHours = Temporal.Duration.from({ hours: 5 });
Temporal.Now.instant().add(fiveHours);
```

### instant.subtract()

**instant.subtract(duration: Temporal.Duration | object | string) : Temporal.Instant**

**参数：**

* `duration`（`Temporal.Duration`或可转换为`Temporal.Duration`的值）：要减去的持续时间。

**返回：** 一个新`Temporal.Instant`对象，由指示的确切时间 `instant` - `duration`。

此方法从`instant`中减去`duration`。

参数是具有表示持续时间的属性的`duration`对象，例如`{ hours: 5, minutes: 30 }`，或字符串，例如`PT5H30M`，或`Temporal.Duration`对象。如果`duration`不是一个`Temporal.Duration`对象，那么它将被转换为一个`Temporal.Duration`对象，就好像它被传递给了一样`Temporal.Duration.from()`。

`years`、`months`、`weeks`和`days`字段的 `duration` 必须为零。`Temporal.Instant` 独立于时区和日历，因此年、月、周和日的长度可能不同，具体取决于它们所计算的日历或时区。这使得这些单位的减法不明确。 如果您需要这样做，请通过指定所需的日历和时区将 `Temporal.Instant` 转换为 `Temporal.PlainDateTime`，减去持续时间，然后将其转换回来。

如果结果早于或晚于 `Temporal.Instant` 可以表示的范围（大约以 Unix 纪元为中心的 50 万年），则会抛出 RangeError。

减去负持续时间相当于添加该持续时间的绝对值。

示例用法：

```javascript
// Temporal.Instant representing this time an hour ago
Temporal.Now.instant().subtract({ hours: 1 });
oneHour = Temporal.Duration.from({ hours: 1 });
Temporal.Now.instant().subtract(oneHour);
```

### instant.until()

**instant.until(other: Temporal.Instant | string, options?: object) : Temporal.Duration**

**参数：**

* `other`（`Temporal.Instant`或可转换为`Temporal.Instant`的值）：计算差异的另一个确切时间。
* `options`（可选对象）：具有表示操作选项的属性的对象。可识别以下选项：
  * `largestUnit`（string）：在生成的 `Temporal.Duration` 对象中允许的最大时间单位。 有效值为`'auto'`, `'hour'`, `'minute'`, `'second'`, `'millisecond'`, `'microsecond'` 和 `'nanosecond'`。默认为`'auto'`。
  * `smallestUnit`（string）：在生成的 `Temporal.Duration` 对象中四舍五入的最小时间单位。 有效值与最大单位相同。 默认值为“纳秒”，即不四舍五入。
  * `roundingIncrement` (number)：要舍入到的粒度，由 minimumUnit 给出的单位。 默认值为 1。
  * `roundingMode`（string）：如果舍入，如何处理余数。 有效值为“halfExpand”、“ceil”、“trunc”和“floor”。 默认值为“trunc”，它将任何余数截断为零。

**返回：**  一个 `Temporal.Duration` 表示`instant`和`other`的差异。

此方法计算从 `instant` 表示的确切时间到 `other` 表示的确切时间所经过的时间，可选地对其进行四舍五入，并将其作为 `Temporal.Duration` 对象返回。 如果 `other` 早于`instant`，则生成的持续时间将为负数。

如果 `other` 不是 `Temporal.Instant` 对象，那么它将被转换为一个`Temporal.Instant` 对象，就好像它被传递给 `Temporal.Instant.from()` 一样。

`largestUnit` 选项控制结果持续时间的表达方式。 返回的 `Temporal.Duration` 对象将没有任何大于最大单位中的单位的非零字段。 例如，当`largestUnit`为“seconds”时，两个小时的差异将变为 7200 秒。 但是，即使`largestUnit`是“hours”，30 秒的差异仍然是 30 秒。 “auto”的值表示“second”，除非 `smallestUnit` 是“hour”或“minute”，在这种情况下，`largestUnit` 等于 `smallestUnit`。

默认情况下，结果中的最大单位是秒。与其他 `Temporal` 类型的差异方法不同，不允许使用周、月、年和日。这是因为月份和年份的长度可能不同，具体取决于月份以及年份是否为闰年，这完全取决于差异的开始和结束日期。您无法确定 `Temporal.Instant` 之间差异的开始日期和结束日期，因为 `Temporal.Instant` 没有时区或日历。此外，在不同的日历中，周可以有不同的长度，当时区有夏令时转换时，天可以有不同的长度。

您可以使用 `smallestUnit`、`roundingIncrement` 和 `roundingMode` 选项对结果进行舍入。这些行为与 `Temporal.Duration.round()` 方法中的一样。默认是不进行舍入。

如果您确实需要计算两个 `Temporal.Instants` 之间的年、月、周或日之间的差异，那么您可以明确选择如何消除这种歧义，通过转换为` Temporal.PlainDateTime` 来选择您的起点。例如，您可能决定根据用户的当前时区或公历中的 UTC 进行计算。

使用毫秒、微秒或纳秒作为最大单位时要小心。在某些持续时间内，结果值可能会溢出 `Number.MAX_SAFE_INTEGER` 并失去其最低有效数字的精度。大约 104 天后，纳秒值将溢出并失去精度。微秒可以适应大约 285 年而不损失精度，毫秒可以处理大约 285,000 年而不损失精度。

示例用法：

```javascript
startOfMoonMission = Temporal.Instant.from('1969-07-16T13:32:00Z');
endOfMoonMission = Temporal.Instant.from('1969-07-24T16:50:35Z');
missionLength = startOfMoonMission.until(endOfMoonMission, { largestUnit: 'hour' });
  // => PT195H18M35S
missionLength.toLocaleString();
  // example output: '195 hours 18 minutes 35 seconds'

// Rounding, for example if you don't care about the minutes and seconds
approxMissionLength = startOfMoonMission.until(endOfMoonMission, {
  largestUnit: 'hour',
  smallestUnit: 'hour'
});
  // => PT195H

// A billion (10^9) seconds since the epoch in different units
epoch = Temporal.Instant.fromEpochSeconds(0);
billion = Temporal.Instant.fromEpochSeconds(1e9);
epoch.until(billion);
  // => PT1000000000S
epoch.until(billion, { largestUnit: 'hour' });
  // => PT277777H46M40S
ns = epoch.until(billion, { largestUnit: 'nanosecond' });
  // => PT1000000000S
ns.add({ nanoseconds: 1 });
  // => PT1000000000S
  // (lost precision)

// Calculate the difference in years, eliminating the ambiguity by
// explicitly using the corresponding calendar date in UTC:
epoch.toZonedDateTimeISO('UTC').until(
  billion.toZonedDateTimeISO('UTC'),
  { largestUnit: 'year' }
);
  // => P31Y8M8DT1H46M40S
```

### instant.since()

**instant.since(other: Temporal.Instant | string, options?: object) : Temporal.Duration**

**参数：**

* `other`（`Temporal.Instant`或可转换为 `Temporal.Instant` 的值）：计算差异的另一个确切时间。
* `options`（可选对象）：具有表示操作选项的属性的对象。可识别以下选项：
  * `largestUnit`（string）：在生成的 `Temporal.Duration` 对象中允许的最大时间单位。有效值为`'auto'`、`'hour'`、`'minute'`、`'second'`、`'millisecond'`、`'microsecond'`和'`'nanosecond''`。默认值为`'auto'`。
  * `smallestUnit`（string）：在生成的 `Temporal.Duration` 对象中舍入到的最小时间单位。 有效值与`largestUnit`相同。 默认值为`'nanosecond'`，即不四舍五入。
  * `roundingIncrement`(number): 要舍入到的粒度，由`smallestUnit`给出的单位。默认值为 1。
  * `roundingMode`（string）：如果四舍五入，如何处理余数。有效值为`'halfExpand'`、`'ceil'`、`'trunc'`和`'floor'`。默认值为`'trunc'`，它将任何余数截断为零。

**返回：** 一个 `Temporal.Duration` 表示`instant`和`other`之间的差异。

此方法计算在由`instant`表示的确切时间之前和自由`other`表示的确切时间以来经过的时间，可选地对其进行四舍五入，并将其作为`Temporal.Duration`对象返回。如果`other`晚于`instant`则生成的持续时间将为负数。

此方法与`Temporal.Instant.prototype.until()`方法执行相同的操作，但结果相反。`instant1.since(instant2)`与`instant1.until(instant2).negated()`的结果相同。

示例用法：

```javascript
// A billion (10^9) seconds since the epoch in different units
epoch = Temporal.Instant.fromEpochSeconds(0);
billion = Temporal.Instant.fromEpochSeconds(1e9);
billion.since(epoch); // => PT1000000000S
```

### instant.round()

**instant.round(roundTo: string | object) : Temporal.Instant**

**参数：**

* `roundTo`（string | object）：控制操作所需的字符串或对象。
  * 如果提供了字符串，则生成的`Temporal.Instant`对象将四舍五入到该单位。有效值为`'hour'`、`'minute'`、`'second'`、`'millisecond'`、`'microsecond'`和`'nanosecond'`。`smallestUnit`字符串参数被视为与属性值为该字符串的对象相同。
  * 如果传递了一个对象，则会识别以下属性： 
    * `smallestUnit`（required string）：要四舍五入的单位。有效值为`'hour'`、`'minute'`、`'second'`、`'millisecond'`、`'microsecond'`和`'nanosecond'`。
    * `roundingIncrement`(number): 要舍入到的粒度，由 给出的单位`smallestUnit`。默认值为 1。
    * `roundingMode`（string）：如何处理剩余部分。有效值为`'halfExpand'`、`'ceil'`、`'trunc'`和`'floor'`。默认值为`'halfExpand'`.

**返回：** 一个新的 `Temporal.Instant` 对象，它`instant`舍入到 `roundTo`（如果使用字符串参数）或 `smallestUnit` 的 `roundingIncrement`（如果使用对象参数）。

将 `instant` 舍入到给定的单位和增量，并将结果作为新的 `Temporal.Instant` 对象返回。

`smallestUnit` 选项（如果使用字符串参数，则为 roundTo 的值）确定要舍入到的单位。例如，要四舍五入到最接近的分钟，请使用 `minimumUnit: 'minute'`。此选项是必需的。

`roundingIncrement` 选项允许舍入到整数个单位。例如，要四舍五入到半小时的增量，请使用 `smallestUnit: 'minute', roundingIncrement: 30`。

`roundingIncrement` 和 `smallestUnit` 的组合必须使增量平均分为 86400 秒（一个 24 小时太阳日）。 （例如，15 分钟和 45 秒的增量都允许。25 分钟和 7 秒都不允许。）

`roundingMode` 选项控制如何执行舍入。
* `ceil`：总是四舍五入，接近时间的尽头。
* `floor`, `trunc`：总是向下舍入，朝向时间的开始。 （这两种模式的行为相同，但都包含在内是为了与 `Temporal.Duration.round()` 保持一致，但它们并不相同。）
* `halfExpand`：四舍五入到 roundingIncrement 和 smallestUnit 允许的值中最接近的值。当有领带时，围起来，就像天花板一样。

正如对名为`'round'`的方法所期望的那样，默认的舍入模式是`'halfExpand''`以匹配 `Math.round` 的行为。请注意，这与 `until` 和 `since` 选项使用的 `'trunc'` 默认值不同，因为对于这些操作来说，向上舍入将是一个意外的默认值。其他属性在这些方法之间的行为相同。

示例用法：

```javascript
instant = Temporal.Instant.from('2019-03-30T02:45:59.999999999Z');

// Round to a particular unit
instant.round({ smallestUnit: 'second' }); // => 2019-03-30T02:46:00Z
// Round to an increment of a unit, e.g. an hour:
instant.round({ roundingIncrement: 60, smallestUnit: 'minute' });
  // => 2019-03-30T03:00:00Z
// Round to the same increment but round down instead:
instant.round({ roundingIncrement: 60, smallestUnit: 'minute', roundingMode: 'floor' });
  // => 2019-03-30T02:00:00Z
```

### instant.equals()

**instant.equals(other: Temporal.Instant | string) : boolean**

**参数：**

* `other`（`Temporal.Instant`或可转换为`Temporal.Instant`的值）：另一个要比较的确切时间。

**返回：** `true`如果`instant`和`other`相等，或者`false`不相等。

比较两个`Temporal.Instant`对象是否相等。

之所以存在此函数，是因为无法使用`instant == otheror`或`instant === other`进行比较，因为原始表示形式和时间类型之间存在歧义。

如果你不需要知道两次发生的顺序，那么这个函数可能比` Temporal.Instant.compare` 输入更少，效率更高。

如果`other`不是一个`Temporal.Instant`对象，那么它将被转换为一个`Temporal.Instant`对象，就好像它被传递给了`Temporal.Instant.from()`一样。

示例用法：

```javascript
one = Temporal.Instant.fromEpochSeconds(1.0e9);
two = Temporal.Instant.fromEpochSeconds(1.1e9);
one.equals(two); // => false
one.equals(one); // => true
```

### instant.toString()

**instant.toString(options?: object) : string**

**参数：**

* `options`（可选对象）：具有表示操作选项的属性的对象。可识别以下选项：
  * `timeZone`（string or object）：表示`instant`的时区，作为 `Temporal.TimeZone` 对象、实现时区协议的对象或字符串。默认是使用 UTC。
  * `fractionalSecondDigits`（number or string）：输出字符串中小数点后要打印的位数。有效值为`'auto'`、0、1、2、3、4、5、6、7、8 或 9。默认值为`'auto'`。
  * `smallestUnit` (string)：包含在输出字符串中的最小时间单位。如果两者都给出，则此选项将覆盖 `fractionalSecondDigits`。有效值为`minute`, `second`, `millisecond`, `microsecond`, 和 `nanosecond`。
  * `roundingMode`（string）：如何处理余数。有效值为`'ceil'`、`'floor'`、`'trunc'`和`'halfExpand'`。默认值为`'ceil'`。
 
**返回：** ISO 8601 日期格式的字符串，表示`instant`。

此方法覆盖 `Object.prototype.toString()` 方法并提供方便的`instant`字符串表示。可以将字符串传递给 `Temporal.Instant.from()` 以创建新的 `Temporal.Instant` 对象。

可以使用 `fractionalSecondDigits` 或 `smallestUnit` 选项控制输出精度。如果未给出任何选项，则默认为 `fractionalSecondDigits: 'auto'`，它会省略小数点后的尾随零。

该值将被截断以适应请求的精度，除非使用 `roundingMode` 选项给出不同的舍入模式，如在 `Temporal.PlainDateTime.round()` 中。请注意，四舍五入也可能会更改其他单位的值。

如果给出 `timeZone` 选项，则字符串将表示给定时区的时间，并包含时区的 UTC 偏移量，四舍五入到最接近的分钟。

示例用法：

```javascript
instant = Temporal.Instant.fromEpochMilliseconds(1574074321816);
instant.toString(); // => '2019-11-18T10:52:01.816Z'
instant.toString({ timeZone: Temporal.TimeZone.from('UTC') });
// => '2019-11-18T10:52:01.816+00:00'
instant.toString({ timeZone: 'Asia/Seoul' });
// => '2019-11-18T19:52:01.816+09:00'

instant.toString({ smallestUnit: 'minute' });
// => '2019-11-18T10:52Z'
instant.toString({ fractionalSecondDigits: 0 });
// => '2019-11-18T10:52:01Z'
instant.toString({ fractionalSecondDigits: 4 });
// => '2019-11-18T10:52:01.8160Z'
instant.toString({ smallestUnit: 'second', roundingMode: 'halfExpand' });
// => '2019-11-18T10:52:02Z'
```

### instant.toLocaleString()

**instant.toLocaleString(locales?: string | string[], options?: object) : string**

**参数：**

* `locales`（可选字符串或字符串数组）：带有 BCP 47 语言标记和可选 Unicode 扩展键的字符串，或此类字符串的数组。
* `options`（可选对象）：具有影响格式的属性的对象。

**返回：** `instant` 的语言敏感表示。

此方法覆盖 `Object.prototype.toLocaleString()` 以提供`instant`的人类可读、语言敏感的表示。

语言环境和选项参数与 `Intl.DateTimeFormat` 的构造函数中的相同。

因为 `Temporal.Instant` 不携带时区，所以用于输出的时区将是选项的 `timeZone` 属性（如果存在）； 否则，来自环境的当前时区，通常是系统的时区。

这与在旧版 `Date` 的 `toLocaleString` 方法中确定时区的方式相同。

> **注意：** 在服务器环境中调用此方法时要小心，其中服务器的时区可能设置为 UTC。

示例用法：

```javascript
instant = Temporal.Instant.from('2019-11-18T11:00:00.000Z');
instant.toLocaleString(); // example output: '2019-11-18, 3:00:00 a.m.'
instant.toLocaleString('de-DE'); // example output: '18.11.2019, 03:00:00'
instant.toLocaleString('de-DE', {
  timeZone: 'Europe/Berlin',
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  timeZoneName: 'long'
}); // => '18.11.2019, 12:00 Mitteleuropäische Normalzeit'
instant.toLocaleString('en-US-u-nu-fullwide-hc-h12', {
  timeZone: 'Asia/Kolkata'
}); // => '１１/１８/２０１９, ４:３０:００ PM'
```

### instant.toJSON()

**instant.toJSON() : string**

**返回：** 以 UTC 时区表示的 ISO 8601 日期格式的`instant`字符串。

此方法与 `Instant.toString()` 类似，但始终以 UTC 时间生成字符串。 通常不直接调用，但可以通过 `JSON.stringify()` 自动调用。

`Temporal.Instant`从字符串中恢复对象的反向操作是`Temporal.Instant.from()`，但它不能被`JSON.parse()`自动调用。如果您需要从 JSON 字符串重建`Temporal.Instant`对象，那么您需要知道应该被解释为`Temporal.Instants` 的键的名称。在这种情况下，您可以为您的用例构建自定义“reviver”功能。

示例用法：

```javascript
const meeting = {
  id: 355,
  name: 'Budget review',
  location: 'https://meet.jit.si/ObjectiveTomatoesJokeSurely',
  startInstant: Temporal.Instant.from('2020-03-30T15:00-04:00[America/New_York]'),
  endInstant: Temporal.Instant.from('2020-03-30T16:00-04:00[America/New_York]')
};
const str = JSON.stringify(meeting, null, 2);
console.log(str);
// =>
// {
//   "id": 355,
//   "name": "Budget review",
//   "location": "https://meet.jit.si/ObjectiveTomatoesJokeSurely",
//   "startInstant": "2020-03-30T19:00Z",
//   "endInstant": "2020-03-30T20:00Z"
// }

// To rebuild from the string:
function reviver(key, value) {
  if (key.endsWith('Instant')) return Temporal.Instant.from(value);
  return value;
}
JSON.parse(str, reviver)
```

### instant.valueOf()

此方法覆盖 `Object.prototype.valueOf()` 并始终抛出异常。 这是因为无法将 `Temporal.Instant` 对象与关系运算符 `<`、`<=`、`>` 或 `>=` 进行比较。 为此使用 `Temporal.Instant.compare()` 或为相等使用 `instant.equals()`。

