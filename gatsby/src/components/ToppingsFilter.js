import React from 'react';
import { graphql, Link, useStaticQuery } from 'gatsby';
import styled from 'styled-components';

const ToppingsStyles = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 4rem;
  a {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-gap: 0 1rem;
    align-items: center;
    padding: 5px;
    background: var(--grey);
    border-radius: 2px;
    font-size: clamp(1.5rem, 2vw, 2.5rem);
    .count {
      background: white;
      padding: 2px 5px;
    }
    &[aria-current='page'] {
      background: var(--yellow);
    }
  }
`;

function countPizzasInToppings(pizzas) {
  const counts = pizzas
    .map(({ toppings }) => toppings)
    .flat()
    .reduce((acc, item) => {
      if (item.id in acc) {
        const existingItem = { ...acc[item.id] };
        existingItem.count += 1;
        return {
          ...acc,
          [item.id]: existingItem,
        };
      }
      return { ...acc, [item.id]: { ...item, count: 1 } };
    }, {});

  const sortedCounts = Object.values(counts).sort((a, b) => b.count - a.count);
  return sortedCounts;
}

export default function ToppingsFilter({ activeFilterId }) {
  const {
    toppings: { nodes: toppings },
    pizzas: { nodes: pizzas },
  } = useStaticQuery(graphql`
    query {
      toppings: allSanityTopping {
        nodes {
          name
          id
          vegetarian
        }
      }
      pizzas: allSanityPizza {
        nodes {
          id
          name
          toppings {
            id
            name
          }
        }
      }
    }
  `);
  const toppingsWithCounts = countPizzasInToppings(pizzas);
  return (
    <ToppingsStyles>
      <Link to="/pizzas">
        <span className="name">All</span>
        <span className="count">{pizzas.length}</span>
      </Link>
      {toppingsWithCounts.map(({ name, id, count }) => (
        <Link to={`/topping/${name}`} key={id}>
          <span className="name">{name}</span>
          <span className="count">{count}</span>
        </Link>
      ))}
    </ToppingsStyles>
  );
}
