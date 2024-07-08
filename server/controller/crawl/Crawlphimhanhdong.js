const { sequelize, Product, Linkfilm } = require('../../models');
const axios = require('axios');
const cheerio = require('cheerio');

sequelize.sync()
  .then(() => console.log('Database synced'))
  .catch(err => console.error('Could not sync database', err));

const crawlphimhanhdong = async (req, res) => {
  const url = 'https://ophim17.cc/the-loai/tinh-cam?page=3'; // Replace with the actual URL you want to scrape

  try {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);

    const data = [];

    $('table.min-w-full tbody tr td.whitespace-nowrap .ml-4 a').each((index, element) => {
      const linkHref = $(element).attr('href');
      data.push({
        href: 'https://ophim17.cc' + linkHref
      });
    });

    const getEpisodes = async (movie) => {
      try {
        const movieResponse = await axios.get(movie.href);
        const movieHtml = movieResponse.data;
        const $$ = cheerio.load(movieHtml);

        const products = [];

        const title = $$('.text-center h1.uppercase').text();
        const nameenglish = $$('.text-center h2.italic').text();
        const imageUrl = $$('.container .relative span img').attr('src');
        const hinhanh = imageUrl ? (imageUrl.startsWith('http') ? imageUrl : 'https://ophim17.cc' + imageUrl) : '';
        const descripts = $$('.text-gray-500 article').eq(0).text();

        const dataFilm = {};
        $$('tbody.align-baseline tr').each((index, element) => {
          const key = $$(element).find('td').first().text().trim();
          const value = $$(element).find('td').eq(1).text().trim();
          dataFilm[key] = value;
        });

        $$('.grid.grid-cols-3.md\\:grid-cols-6.lg\\:grid-cols-16.gap-2 a').each((index, element) => {
          const episodeHref = $$(element).attr('href');
          products.push({
            title: title,
            href: episodeHref,
            episode: index + 1,
          });

          try {
            Linkfilm.create({
              title: title,
              episode: index + 1,
              linkfilm: episodeHref,
            });
          } catch (error) {
            console.error('Error creating linkfilm record:', error);
          }
        });

        return {
          title,
          nameenglish,
          hinhanh,
          descripts,
          trangthai: dataFilm['Trạng thái'],
          sotap: dataFilm['Số tập'],
          thoiluong: dataFilm['Thời Lượng'],
          namphathanh: dataFilm['Năm Phát Hành'],
          chatluong: dataFilm['Chất Lượng'],
          ngonngu: dataFilm['Ngôn Ngữ'],
          daodien: dataFilm['Đạo Diễn'],
          dienvien: dataFilm['Diễn Viên'],
          theloai: dataFilm['Thể Loại'],
          quocgia: dataFilm['Quốc Gia'],
          views: 0,
          likes: 0,
          category_id: 9,
        };
      } catch (error) {
        console.error(`Error fetching movie URL: ${error.message}`);
        return null;
      }
    };

    const results = await Promise.all(data.map(movie => getEpisodes(movie)));
    const filteredResults = results.filter(result => result !== null);

    for (const movie of filteredResults) {
      const existingProduct = await Product.findOne({ where: { title: movie.title } });
      if (!existingProduct) {
        await Product.create(movie);
      }
    }

    res.json(filteredResults);
  } catch (error) {
    console.error(`Error fetching the URL: ${error.message}`);
    res.status(500).send('An error occurred while fetching the URL');
  }
}

module.exports = { crawlphimhanhdong };
