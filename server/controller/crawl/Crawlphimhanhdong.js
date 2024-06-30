const { sequelize, Product,Category, Linkfilm } = require('../../models');
const axios = require('axios');
const cheerio = require('cheerio');
sequelize.sync()
  .then(() => console.log('Database synced'))
  .catch(err => console.error('Could not sync database', err));
const crawlphimhanhdong =async (req,res)=>{
    const url = 'https://ophim17.cc/danh-sach/phim-sap-chieu'; // Replace with the actual URL you want to scrape

    try {
      const response = await axios.get(url);
      const html = response.data;
      const $ = cheerio.load(html);
  
      const data = [];
  
      // Scrape movie links
      $('table.min-w-full tbody tr td.whitespace-nowrap .ml-4 a').each((index, element) => {
        const linkHref = $(element).attr('href');
        data.push({
          href: 'https://ophim17.cc' + linkHref
        });
      });
  
      // Function to scrape movie details and episodes
      const getEpisodes = async (movie) => {
        try {
          const movieResponse = await axios.get(movie.href);
          const movieHtml = movieResponse.data;
          const $$ = cheerio.load(movieHtml);
  
          const products = [];
  
          // Get movie title and English name
          const title = $$('.text-center h1.uppercase').text();
          const nameenglish = $$('.text-center h2.italic').text();
  
          // Get image URL
          const imageUrl = $$('.container .relative span img').attr('src');
          const hinhanh = imageUrl ? (imageUrl.startsWith('http') ? imageUrl : 'https://ophim17.cc' + imageUrl) : '';
  
          // Get description
          const descripts = $$('.text-gray-500 article').eq(0).text();
  
          // Map film data
          const dataFilm = {};
          $$('tbody.align-baseline tr').each((index, element) => {
            const key = $$(element).find('td').first().text().trim();
            const value = $$(element).find('td').eq(1).text().trim();
            dataFilm[key] = value;
          });
  
          // Get episodes
          $$('.grid.grid-cols-3.md\\:grid-cols-6.lg\\:grid-cols-16.gap-2 a').each((index, element) => {
            const episodeHref = $$(element).attr('href');
            products.push({
              title: title,
              href: episodeHref,
              episode: index + 1,
            });
  
            try {
              const newLinkFilm = Linkfilm.create({
                title: title,
                episode: index + 1,
                linkfilm: episodeHref,
              });
  
              console.log('LinkFilm created successfully:', newLinkFilm);
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
            category_id: 2,
  
          };
        } catch (error) {
          console.error(`Error fetching movie URL: ${error.message}`);
          return null;
        }
      };
  
      // Create a list of promises to fetch movie details and episodes
      const results = await Promise.all(data.map(movie => getEpisodes(movie)));
  
      // Filter out null results due to errors in fetching
      const filteredResults = results.filter(result => result !== null);
  
      // Save the results to MySQL
      for (const movie of filteredResults) {
        await Product.create(movie);
      }
  
      res.json(filteredResults);
    } catch (error) {
      console.error(`Error fetching the URL: ${error.message}`);
      res.status(500).send('An error occurred while fetching the URL');
    }
}

module.exports = {crawlphimhanhdong,}