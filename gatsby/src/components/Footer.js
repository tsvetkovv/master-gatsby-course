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
      <p>&copy; Slick's Slices {new Date().getFullYear()}</p>
    </FooterStyles>
  );
}
