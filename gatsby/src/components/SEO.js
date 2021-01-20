import React from 'react';
import { Helmet } from 'react-helmet';
import { graphql, useStaticQuery } from 'gatsby';

export default function SEO({ children, location, description, title, image }) {
  const {
    site: { siteMetadata, pathPrefix },
    siteBuildMetadata: { buildTime },
  } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          type
        }
        pathPrefix
      }
      siteBuildMetadata {
        buildTime
      }
    }
  `);
  return (
    <Helmet titleTemplate={`%s - ${siteMetadata.title}`}>
      <html lang="en" />
      {pathPrefix && <base target="_blank" href={`${pathPrefix}/`} />}
      <title>{title}</title>
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="alternate icon" href="/favicon.ico" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
      <meta
        name="description"
        content={description || siteMetadata.description}
      />
      {location && <meta property="og:url" content={location.href} />}
      <meta property="og:image" content={image || '/logo.png'} />
      <meta property="og:type" content={siteMetadata.type} />
      <meta
        property="og:title"
        content={
          title ? `${title} - ${siteMetadata.title}` : siteMetadata.title
        }
        key="ogtitle"
      />
      <meta
        property="og:site_name"
        content={title || siteMetadata.title}
        key="ogsitename"
      />
      <meta
        property="og:description"
        content={description || siteMetadata.description}
        key="ogdesc"
      />

      <meta property="og:updated_time" content={buildTime} />

      {children}
    </Helmet>
  );
}
