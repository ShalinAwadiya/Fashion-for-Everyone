//Author: Manan Amin (B00897712)

import { getAlgoliaFacets } from '@algolia/autocomplete-js';
import { Fragment } from 'preact';

// Reference from Algolia Documentation: https://www.algolia.com/doc/
export function createCategoriesPlugin({ searchClient }) {
  return {
    getSources({ query }) {
      return [
        {
          sourceId: 'brands',
          getItems() {
            return getAlgoliaFacets({
              searchClient,
              queries: [
                {
                  indexName: 'products',
                  facet: 'brand',
                  params: {
                    facetQuery: query,
                    maxFacetHits: query ? 2 : 3,
                  },
                },
              ],
            });
          },
          templates: {
            header() {
              return (
                <Fragment>
                  <span className="aa-SourceHeaderTitle">Brands</span>
                  <div className="aa-SourceHeaderLine" />
                </Fragment>
              );
            },
            item({ item, components }) {
              var url = item.label.replace(/[^a-z0-9 ]/gi, '');
              item.url = '/search/' + url;
              return (
                <a href={item.url} className="aa-ItemLink">
                  <div className="aa-ItemContent">
                    <div className="aa-ItemIcon aa-ItemIcon--noBorder">
                      <svg
                        viewBox="0 0 24 24"
                        width="18"
                        height="18"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                        <line x1="12" y1="22.08" x2="12" y2="12" />
                      </svg>
                    </div>

                    <div className="aa-ItemContent">
                      <div className="aa-ItemTitle">
                        <components.Highlight hit={item} attribute="label" />
                      </div>
                    </div>
                  </div>
                </a>
              );
            },
          },
        },
      ];
    },
  };
}
