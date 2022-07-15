//Author: Manan Amin (B00897712)

import algoliasearch from 'algoliasearch/lite';
import { getAlgoliaResults } from '@algolia/autocomplete-js';
import { Fragment } from 'preact';
import { useNavigate } from 'react-router-dom';
import '@algolia/autocomplete-theme-classic';
import { createCategoriesPlugin } from './CategoriesPluginAlgolia';

import { ProductItem } from './ProductItem';
import { Autocomplete } from './Autocomplete';
import './SearchStyles.css';

const appId = 'FXM5Z7L8QK';
const apiKey = '8742666d8583123913b0ff879eb4d742';
const searchClient = algoliasearch(appId, apiKey);

const categoriesPlugin = createCategoriesPlugin({ searchClient });

const Search = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Autocomplete
        openOnFocus={true}
        plugins={[categoriesPlugin]}
        getSources={({ query, setContext }) => [
          {
            sourceId: 'products',
            getItems() {
              return getAlgoliaResults({
                searchClient,
                queries: [
                  {
                    indexName: 'products',
                    query,
                  },
                ],
              });
            },
            templates: {
              header() {
                return (
                  <Fragment>
                    <span className="aa-SourceHeaderTitle">Products</span>
                    <div className="aa-SourceHeaderLine" />
                  </Fragment>
                );
              },
              item({ item, components }) {
                return (
                  <ProductItem
                    hit={item}
                    query={query}
                    components={components}
                  />
                );
              },
            },
          },
        ]}
        onSubmit={({ state }) => {
          console.log('query', state.query);
          if (state.query === '') {
            var url = 'all';
          } else {
            var url = state.query.replace(/[^a-z0-9 ]/gi, '').replace(' ', '-');
          }
          console.log('inside on sub', '/search/' + url);
          navigate('/search/' + url);
        }}
        placeholder="Search"
      />
    </div>
  );
};
export default Search;
