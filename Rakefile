# coding: utf-8

# Wiki
namespace :wiki do
  require 'redcarpet'

  desc '更新'
  task:update => ['wiki:md2Html', 'wiki:makeIndex', 'wiki:moveWiki', 'wiki:removeHtml']

  desc 'Markdown を Html に変換する'
  task:md2Html do
	  cd '_wiki/' do
	    mdToHtml()
	  end
  end

  desc '_wiki から wiki に HTML を移動する'
  task:moveWiki do
    moveFile('_wiki/*.html', './wiki')
  end

  desc '_wiki から *.html を削除する'
  task:removeHtml do
    cd '_wiki/' do
      FileUtils.rm(Dir.glob("*.html"))
    end
  end

  desc 'Index.html を作成する'
  task:makeIndex do
    cd '_wiki/' do
      makeIndexHtml()
    end
  end

  def moveFile(pattern, dest)
    Dir.glob(pattern).each do |file|
      puts file
      filename = File.basename(file)
      FileUtils.mkdir_p(dest)
      FileUtils.copy_file(file, File.join(dest, filename))
    end
  end

  def mdToHtml()
    markdown = Redcarpet::Markdown.new(Redcarpet::Render::HTML, :tables => true)
    Dir.glob('*.md').each do |file|
      update = insertDays(file)
      input_filename = File.basename(file, '.*')
      dirname = File.dirname(file)
      output_filename = input_filename + '.html'
      output_filepath = File.join(dirname, output_filename)
      f = open(file)
      File.write(output_filepath, prefixBody() + markdown.render(f.read) + update + suffixBody())
      f.close
    end
  end

  def makeIndexHtml()
    indexes = []
    paths = {}
    Dir.glob('*.html').each do |file|
      input_filename = File.basename(file)
      index_name = File.basename(file, '.*')
      indexes.push(index_name)
      paths[index_name] = File.join('./' + input_filename)
    end

    body = '<div>'
    for index in indexes do
      a_tag = '<span class="card"><a href="' + paths[index] + '">' + index + '</a></span>'
      body += a_tag
    end
    body += '</div>'
    File.write('./index.html', prefixBody() + body + suffixBody())
  end

  def insertDays(file)
    return '<br><p><strong>updated</strong> ' + File::mtime(file).strftime('%Y/%m/%d %H:%M') + '</p><br>'
  end

  def prefixBody()
    return '<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=790">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" type="text/css" href="../css/wiki.css">
<link rel="apple-touch-icon" href="./img/makietan@144.png" />
<link rel="shortcut icon" href="./img/makietan@144.png" />
<title>tanjo.in</title>
<!-- GA -->
<script>
(function(i,s,o,g,r,a,m){i[\'GoogleAnalyticsObject\']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,\'script\',\'//www.google-analytics.com/analytics.js\',\'ga\');
ga(\'create\', \'UA-13243407-11\', \'auto\');
ga(\'send\', \'pageview\');
</script>
</head>
<body>
'
  end

  def suffixBody()

    return '
</body>
</html>
'
  end

end
