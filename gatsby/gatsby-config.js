import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

// This file is empty, but some people were reporting that it would not start unless they had an empty file. So here it is! You can delete the comment. Or replace it with your favourite shania twain lyrics.
export default {
  pathPrefix: process.env.BASE_URL || '/',
  siteMetadata: {
    title: `Slicks Slices`,
    description: `The best pizza in the world`,
    // https://ogp.me/#types
    type: 'restaurant',
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-styled-components`,
      options: {
        // Add any options here
      },
    },
    {
      resolve: `gatsby-source-sanity`,
      options: {
        projectId: `xbopkebm`,
        dataset: `production`,
        // a token with read permissions is required
        // if you have a private dataset
        token: process.env.SANITY_TOKEN,

        // If the Sanity GraphQL API was deployed using `--tag <name>`,
        // use `graphqlTag` to specify the tag name. Defaults to `default`.
        graphqlTag: 'default',
        watchMode: true,
      },
    },
  ],
};
