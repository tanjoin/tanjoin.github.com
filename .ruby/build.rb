# encoding: utf-8
require 'redcarpet'
require 'fileutils'

HEADER = <<-EOS
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
  <meta name="description" content="Let's tanjoin!">
  <!-- Icon -->
  <link rel="apple-touch-icon" href="./img/makietan@144.png" />
  <link rel="shortcut icon" href="./img/makietan@144.png" />
  <!-- CSS -->
  <link rel="stylesheet" href="css/common.css">
  <!-- RSS -->
  <link rel="alternate" type="application/rss+xml" href="rss.xml" />

  <title>tanjo.in</title>
</head>
<body>
  <div class="contents">
EOS

FOOTER = <<-EOS
  </div>
  <!-- JS -->
  <script type="text/javascript" src="js/common.js"></script>
  <!-- GA -->
  <script type="text/javascript" src="js/ga.js"></script>
</body>
</html>
EOS

markdown = Redcarpet::Markdown.new(Redcarpet::Render::HTML,
  autolink: true,
  tables: true,
  fenced_code_blocks: true,
  highlight: true,
)

FileUtils.rm(Dir.glob("../*.html"))

Dir.glob("../.md/*.md") { |path|
  base_filename = path.split("/").last.encode("utf-8").split(".").first
  html_filename = base_filename + ".html"
  html_file_path = Dir.pwd.gsub(/.ruby/, html_filename)
  html = markdown.render File.read(path)
  File.open(html_file_path, "w:utf-8") { |f| f.print HEADER + html + FOOTER }
}
