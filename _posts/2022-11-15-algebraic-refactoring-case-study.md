---
categories: refactoring
date: 2022-11-15 08:00:00 +0200
excerpt: >
  The skills learned in math are often useful in programming.
  Here is a short example of using algebra for refactoring.
lang: en
layout: post
title: Algebraic refactoring - case study
---

Probably most of you remember algebra exercises from math class,
where calculations were done with letters, not numbers.
Finally, once we had the simplified form,
numbers were substituted for the letters to get the result.

The same method can be used when refactoring the code.
This is of course independent of the programming language.

In this case study, I will use what I found during the code review.

The initial code snippet looked like this.

```javascript
if (!authToken) {
  setInvalidToken(true);
  throw {
    authToken,
    value,
  };
}
if (!value) {
  throw {
    authToken,
    value,
  };
}

if (authToken && value) {
  Cookies.set(`${value}-authToken`, authToken, {
    expires: 1,
  });
  setCustomerInfo(authToken);
} else {
  setInvalidToken(true);
  throw {
    authToken,
    value,
  };
}
```

It doesn't matter what the code does.
The important thing is that it consists of several repetitive parts.

I will replace some code fragments with letters.

```text
a => authToken
b => value
x => setInvalidToken(true);
y => throw {...}
z => Cookies.set(...) + setCustomerInfo(authToken)
```

Now, using letters, I will present the same code.

```javascript
if (!a) { x; y; }
if (!b) { y; }
if (a && b) { z; } else { x; y; }
```

In the above form, this code is definitely easier to refactor.
This can be refactored to the following form:

```javascript
if (a && b) {
  z;
} else {
  if (a) { x; }
  y;
}
```

Now we can substitute real values for the letters.

Finally we get:

```javascript
if (authToken && value) {
  Cookies.set(`${value}-authToken`, authToken, {
    expires: 1,
  });
  setCustomerInfo(authToken);
} else {
  if (authToken) { setInvalidToken(true); }
  throw {
    authToken,
    value,
  };
}
```

As you can see, this is more concise code, no repetition.
