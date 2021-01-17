import React from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';

const BeerGridStyles = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
`;

const SingleBeerStyles = styled.div`
  border: 1px solid var(--gray);
  padding: 2rem;
  text-align: center;
  img {
    display: grid;
    width: 100%;
    height: 200px;
    object-fit: contain;
    align-items: center;
    font-size: 10px;
  }
`;

export default function BeersPage({ data }) {
  const beers = data.allBeer.nodes;
  return (
    <>
      <h2 className="center">We have {beers.length} beers</h2>
      <BeerGridStyles>
        {beers.map(({ name, id, image, price, rating }) => {
          const avgRating = Math.round(rating.average);
          return (
            <SingleBeerStyles key={id}>
              <img src={image} alt="name" />
              <h3>{name}</h3>
              {price}
              <p title={`${avgRating} out of 5 stars`}>
                {'⭐️'.repeat(avgRating)}
                <span style={{ filter: 'grayscale(100%)' }}>
                  {'⭐️'.repeat(5 - avgRating)}
                </span>
                <span>({rating.reviews})</span>
              </p>
            </SingleBeerStyles>
          );
        })}
      </BeerGridStyles>
    </>
  );
}

export const query = graphql`
  query {
    allBeer {
      nodes {
        id
        name
        price
        rating {
          average
          reviews
        }
        image
      }
    }
  }
`;
