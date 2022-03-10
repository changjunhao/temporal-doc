# Temporal API Doc

`Date` 一直是 ECMAScript 的痛点。`Temporal` 是一个充当顶级命名空间（如 Math）的全局变量，它为 ECMAScript 语言带来了现代日期/时间 API。有关 `Date` 的一些问题和动机的详细信息，请参阅： [Fixing JavaScript Date](https://maggiepint.com/2017/04/09/fixing-javascript-date-getting-started/) 。

`Temporal` 通过以下方式解决这些问题：

* 为日期和时间计算提供易于使用的 API
* 对所有时区的一流支持，包括 DST 安全算法
* 只处理代表固定日期和时间的对象
* 解析严格指定的字符串格式
* 支持非公历

`Temporal` 为仅日期、仅时间和其他范围用例提供单独的 ECMAScript 类。这使代码更具可读性，并防止由于错误地假设 0、UTC 或本地时区而导致的错误，这些值实际上是未知的。

`Temporal` 的实现主要包含四个概念，精确时间（`Temporal.Instant`）、日历日期（`Temporal.Calendar`）和钟表时间（`Temporal.PlainDateTime`）、时区（`Temporal.TimeZone`）。Temporal 类型都有一个字符串表示，对应着 ISO 8601 标准，以及对标准的扩展。

![persistence model](https://tc39.es/proposal-temporal/docs/persistence-model.svg)

![object model](https://tc39.es/proposal-temporal/docs/object-model.svg)
