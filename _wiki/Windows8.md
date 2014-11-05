# Windows8

## Github

### Windows の vim で日本語の文字化けがおこる

`git commit` すると頻発する

結構前から悩んでいる問題でそろそろ堪忍袋の緒が切れそうなので対策を試みる

chcp を使うと文字コードが変換できるらしい [参考](http://typea.info/tips/wiki.cgi?page=Windows+%A5%B3%A5%DE%A5%F3%A5%C9%A5%E9%A5%A4%A5%F3+%CA%B8%BB%FA%A5%B3%A1%BC%A5%C9%A4%F2UTF-8%A4%CB%CA%D1%B9%B9)

#### 初期値

![932 (ANSI/OEM - 日本語 Shift-JIS)](http://gyazo.com/b93a9c8be233b6c25e9e5955b84ba52e.png)

#### UTF-8 に変更してみた

![65001 (UTF-8)](http://gyazo.com/e8593d375c0053f457e2481aa76988f6.png)

日本語が入力できなくなったので本末転倒.

おまけに文字の色やフォントを勝手に変えられる始末.

他にいい方法はないものか...

###### *2014/10/11 - 19:03*

---

[http://tanjo.in](http://tanjo.in)

**created** 2014/10/29 - 18:31
**updated** 2014/10/29 - 18:31
