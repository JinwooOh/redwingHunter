const axios = require('axios');
const cheerio = require('cheerio');

const Query = {
  async getNordstromrack(parent, args, ctx) {
    const size = args.size || 7;
    const { data } = await axios.get(
      `https://www.nordstromrack.com/api/search2/catalog/search?class=Boots&department=Shoes&division=Men&includeFlash=false&includePersistent=true&limit=99&page=1&query=red%20wing&sizes%5B%5D=${size}&sizes%5B%5D=One%20Size&sort=relevancy`
    );
    const result = [];

    const sanitizedData = data._embedded;
    const keys = Object.keys(sanitizedData);
    const productsKey = keys[0];
    const products = sanitizedData[productsKey];
    for (const product of products) {
      const skuInfo = product._embedded;
      const skuKeys = Object.keys(skuInfo);
      const { price_sale, price_retail } = skuInfo[skuKeys[0]][0];

      const tempProduct = {
        name: product.name,
        number: product.style_num,
        price_sale,
        price_retail,
      };
      result.push(tempProduct);
    }
    return result;
  },

  async getSierra(parent, args, ctx) {
    const size = args.size || 7;
    const { data } = await axios.get(
      `https://www.sierra.com/s~red-wing/sizefamily~shoe%20size!${size}/`
    );
    const result = [];
    const $ = cheerio.load(data);

    $('div[class="productCard-title-name"]').each((i, item) => {
      const tempProduct = {
        name: (result[i] = $(item)
          .text()
          .trim()),
        price_sale: 0,
      };
      result[i] = tempProduct;
    });
    $('span[class="ourPrice"]').each((i, item) => {
      const tempPrice = $(item)
        .text()
        .replace('$', '')
        .trim();
      result[i].price_sale = tempPrice;
    });
    return result;
  },
};

module.exports = Query;
