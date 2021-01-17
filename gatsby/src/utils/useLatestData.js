import { useEffect, useState } from 'react';

const deets = `
name
id: _id
image {
  asset {
    url
    metadata {
      lqip
    }
  }
}
`;

export default function useLatestData() {
  const [hotSlices, setHotSlices] = useState();
  const [slicemasters, setSlicemasters] = useState();

  useEffect(function () {
    fetch(process.env.GATSBY_GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
query {
  StoreSettings(id: "downtown") {
    name
    slicemaster {
      ${deets}
    }
    hotSlices {
      ${deets}
    }
  }
}
        `,
      }),
    })
      .then((res) => res.json())
      .then(({ data }) => {
        const { StoreSettings } = data;
        setHotSlices(StoreSettings.hotSlices);
        setSlicemasters(StoreSettings.slicemaster);
      });
  }, []);

  return [hotSlices, slicemasters];
}
