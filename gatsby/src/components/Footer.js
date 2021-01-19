import React from 'react';
import styled from 'styled-components';

const FooterStyles = styled.footer`
  p {
    margin-bottom: 0;
  }
`;

export default function Footer() {
  return (
    <FooterStyles>
      <p className="center">
        &copy; Slick's Slices {new Date().getFullYear()}.{' '}
        <a
          href="https://github.com/Tsvetkovv/master-gatsby-course"
          target="_blank"
          rel="noreferrer"
        >
          Source code
        </a>
      </p>
    </FooterStyles>
  );
}
