# coding: utf-8

# Wiki
namespace :wiki do
  require 'redcarpet'

  desc '更新'
  task:update => ['wiki:md2Html', 'wiki:makeIndex']

  desc 'Markdown を Html に変換する'
  task:md2Html do
	  cd 'wiki/' do
	    mdToHtml()
	  end
  end

  desc 'Index.html を作成する'
  task:makeIndex do
    cd 'wiki/' do
      makeIndexHtml()
    end
  end

  def mdToHtml()
    markdown = Redcarpet::Markdown.new(Redcarpet::Render::HTML)
    Dir.glob('*.md').each do |file|
      input_filename = File.basename(file, '.*')
      dirname = File.dirname(file)
      output_filename = input_filename + '.html'
      output_filepath = File.join(dirname, output_filename)

      f = open(file)
      File.write(output_filepath,markdown.render(f.read))
      f.close
    end
  end

  def makeIndexHtml()
    indexes = []
    paths = {}
    Dir.glob('*.html').each do |file|
      input_filename = File.basename(file)
      indexes.push(input_filename)
      paths[input_filename] = File.join('./' + input_filename)
    end

    body = ''
    for index in indexes do
      a_tag = '<a href="' + paths[index] + '">' + index + '</a> <br>'
      body += a_tag
    end
    File.write('./index.html', body)
  end

end
