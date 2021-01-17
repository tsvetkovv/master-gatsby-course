import path from 'path';
import fetch from 'isomorphic-fetch';

async function turnPizzasIntoPages({ graphql, actions }) {
  const pizzaTemplate = path.resolve('./src/templates/Pizza.js');
  const {
    data: {
      allSanityPizza: { nodes: pizzas },
    },
  } = await graphql(`
    query {
      allSanityPizza {
        nodes {
          name
          slug {
            current
          }
        }
      }
    }
  `);
  pizzas.forEach(({ slug: { current: slug } }) => {
    actions.createPage({
      path: `pizza/${slug}`,
      component: pizzaTemplate,
      context: {
        slug,
      },
    });
  });
}

async function turnToppingsIntoPages({ graphql, actions }) {
  const toppingsTemplate = path.resolve('./src/pages/pizzas.js');
  const {
    data: {
      allSanityTopping: { nodes: toppings },
    },
  } = await graphql(`
    query {
      allSanityTopping {
        nodes {
          name
          id
        }
      }
    }
  `);
  toppings.forEach(({ name, id }) => {
    actions.createPage({
      path: `topping/${name}`,
      component: toppingsTemplate,
      context: {
        toppingId: id,
        toppings: name,
      },
    });
  });
}

async function fetchBeersAndTurnIntoNodes({
  actions,
  createNodeId,
  createContentDigest,
}) {
  const baseURL = 'https://api.sampleapis.com/beers/red-ale';
  const beers = await fetch(baseURL).then((resp) => resp.json());
  for (const beer of beers) {
    const nodeMeta = {
      id: createNodeId(`beer-${beer.name}`),
      parent: null,
      children: [],
      internal: {
        type: 'Beer',
        mediaType: 'application/json',
        contentDigest: createContentDigest(beer),
      },
    };
    actions.createNode({
      ...beer,
      ...nodeMeta,
    });
  }
}

async function turnSlicemastersIntoPages({ graphql, actions }) {
  const {
    data: {
      allSanityPerson: { totalCount, nodes: persons },
    },
  } = await graphql(`
    query {
      allSanityPerson {
        nodes {
          slug {
            current
          }
        }
        totalCount
      }
    }
  `);
  const pageSize = parseInt(process.env.GATSBY_PAGE_SIZE);
  const pageCount = Math.ceil(totalCount / pageSize);
  Array.from({ length: pageCount }).forEach((_, i) => {
    const currentPage = i + 1;
    actions.createPage({
      path: `/slicemasters/${currentPage}`,
      component: path.resolve('./src/pages/slicemasters.js'),
      context: {
        skip: i * pageSize,
        currentPage,
        pageSize,
      },
    });
  });

  persons.forEach(({ slug: { current: slug } }) => {
    actions.createPage({
      path: `/slicemaster/${slug}`,
      component: path.resolve('./src/templates/Slicemaster.js'),
      context: {
        slug,
      },
    });
  });
}

export async function sourceNodes(params) {
  await Promise.all([fetchBeersAndTurnIntoNodes(params)]);
}

export async function createPages(params) {
  await Promise.all([
    turnPizzasIntoPages(params),
    turnToppingsIntoPages(params),
    turnSlicemastersIntoPages(params),
  ]);
}

// export async function onPostBuild({ cache, graphql }, { query }) {
//   const cacheKey = 'some-key-name';
//   const twentyFourHoursInMilliseconds = 24 * 60 * 60 * 1000; // 86400000
//   let obj = await cache.get(cacheKey);
//   if (!obj) {
//     obj = { created: Date.now() };
//     const data = await graphql(query);
//     obj.data = data;
//   } else if (Date.now() > obj.lastChecked + twentyFourHoursInMilliseconds) {
//     /* Reload after a day */
//     const data = await graphql(query);
//     obj.data = data;
//   }
//   obj.lastChecked = Date.now();
//   await cache.set(cacheKey, obj);
//   /* Do something with data ... */
// }
