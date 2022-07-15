//Author: Manan Amin (B00897712)

import React, { createElement } from 'react';

export function ProductItem({ hit, components, query }) {
  hit.url = '/product/' + hit.id;

  return (
    <a href={hit.url} className="aa-ItemLink">
      <div className="aa-ItemContent">
        <div className="aa-ItemTitle">
          <components.Snippet hit={hit} attribute="name" />
        </div>
      </div>
    </a>
  );
}
