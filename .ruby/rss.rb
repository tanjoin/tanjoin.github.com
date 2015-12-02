# encoding: utf-8

require 'rss'

raw = `git diff --raw --cached`

puts raw

if raw.length > 0 then

  htmls = []

  raw.each_line { |line|
    data = line.split(' ')
    file = data[5]

    if file.match(/.*.html/) then
      htmls.push(file)
    end
  }

  if htmls.length > 0 then
    rss = RSS::Maker.make("2.0") { |maker|
      maker.channel.about = 'https://tanjo.in/rss.xml'
      maker.channel.title = 'tanjoin'
      maker.channel.description = 'tanjoin の RSS です'
      maker.channel.link = 'http://tanjo.in'
      maker.channel.language = 'ja'

      maker.items.do_sort = true
      maker.items.max_size = 20

      htmls.each { |file|
        maker.items.new_item { |item|
          item.link = 'http://tanjo.in/' + file
          item.title = file
          item.date = Time.now
        }
      }

      maker.image.title = 'makietan'
      maker.image.url = 'http://tanjo.in/img/makietan@144.png'
    }

    File.write('../rss.xml', rss)
  else
    puts 'No Updates'
  end

end
