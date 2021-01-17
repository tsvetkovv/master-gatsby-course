import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';

export default function SlicemasterPage({ data }) {
  const person = data.sanityPerson;
  return (
    <div>
      <Img fluid={person.image.asset.fluid} />
      <h2 className="center">
        <span className="mark">{person.name}</span>
      </h2>
      <p className="center">{person.description}</p>
    </div>
  );
}

export const query = graphql`
  query($slug: String!) {
    sanityPerson(slug: { current: { eq: $slug } }) {
      name
      description
      image {
        asset {
          fluid(maxWidth: 1000, maxHeight: 420) {
            ...GatsbySanityImageFluid
          }
        }
      }
    }
  }
`;
