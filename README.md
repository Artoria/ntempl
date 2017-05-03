# ntempl

NTemplate is not a template framework, neither related with dual-binding.

## Getting Started
a basic usage is:
```html
<div id="#app">
  <div nt-id='name'>unnamed</div>
</div>
```

```js
var app = ntapp(nt_q("#app"));
app.el('name').innerText = "Artoria";
```
see, innerText is some old-fashioned thing you have already learned, natively dual-binding or non-dual-binding.

## Other resources
[Playground](https://jsfiddle.net/sanae/rod708su/18/)   
[Repository](https://github.com/Artoria/ntempl)   
[Lens](http://hackage.haskell.org/package/lens)   


## Contribution & Feedback
[Pull Requests](https://github.com/Artoria/ntempl/pulls)   
[My Email](mailto:pochioly2008@gmail.com)   

## Donation
[Buy me a coffee @ WeChat]https://wx.tenpay.com/f2f?t=AQAAAJ%2FXTNaHzjztqnoG92LKMn0%3D   
[But me a coffee @ AliPay]https://qr.alipay.com/stx00116sbiivlnndhimz82







