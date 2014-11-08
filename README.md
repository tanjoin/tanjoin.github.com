tanjoin.github.com
==================

# Ruby
## Windows

Ruby と Ruby2 Devkit をインストール
```
chocolatey install ruby
chocolatey install ruby2.devkit
```

Devkit2 に移動して初期化
```
cd C:\DevKit2
ruby dk.rb init
atom C:\Devkit2\config.yml
```

` C:\Devkit2\config.yml` の一番下の行に以下のように記載する（Ruby のバージョンにあわせる)
```
- C:/tools/ruby213
```

Atom を閉じて最後に
```
ruby dk.rb install
```

## Mac
デフォルトインストール

# redcarpet

```
gem install redcarpet
```
