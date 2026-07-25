# frozen_string_literal: true

source "https://rubygems.org"

# 予期せぬメジャーアップデートによる破壊的変更を防ぐため、バージョン範囲（4.3.x）を指定
gem "jekyll"

# Jekyllの機能拡張プラグイン群
group :jekyll_plugins do
  gem "jekyll-feed"
  gem "jekyll-paginate-v2"
  gem "jekyll-sitemap"
  gem "jekyll-readme-index"
end

# Rubyの標準ライブラリ（Default gems）から分離されたため、明示的に必要なgem
gem "bigdecimal"
gem "csv"

# 開発環境（ローカル）でのみ使用するgem
group :development do
  gem "rake"
  gem "webrick" # Ruby 3.0以降でローカルの `jekyll serve` を起動するために必須
end