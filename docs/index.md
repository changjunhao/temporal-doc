---
home: true
heroText: Temporal
tagline: 提供用于处理日期和时间的标准对象和函数
actionText: Get Started
actionLink: /api/
---

`Date`一直是 ECMAScript 的痛点。TC39 提出了一个充当顶级命名空间（如 Math）的全局变量 Temporal，它为 ECMAScript 语言带来了现代日期/时间 API。

该提案处于第3阶段。可安装Temporal的 polyfill进行体验。

```shell
npm install @js-temporal/polyfill
```

```javascript
import { Temporal, toTemporalInstant } from '@js-temporal/polyfill';
Date.prototype.toTemporalInstant = toTemporalInstant;
```
