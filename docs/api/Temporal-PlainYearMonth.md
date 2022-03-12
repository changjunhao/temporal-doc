---
title: Temporal.PlainYearMonth

---

# Temporal.PlainYearMonth

`Temporal.PlainYearMonth` 表示日历上的特定月份。 例如，它可用于表示每月重复事件的特定实例，如“2019 年 6 月会议”。

`Temporal.PlainYearMonth` 是指整个特定月份； 如果您需要参考某一天的日历事件，请使用 `Temporal.PlainDate` 甚至 `Temporal.PlainDateTime`。 可以使用 `toPlainDate()` 方法将 `Temporal.PlainYearMonth` 与一个月中的某一天结合起来转换为 `Temporal.PlainDate`。
