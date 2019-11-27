import React from 'react';
import { Helmet } from 'react-helmet-async';
import CategoryPageContext from './CategoryPageContext';

const CategoryPage = () => (
  <CategoryPageContext.Provider value={{}}>
    <Helmet>
      <title>CategoryPage</title>
      <meta name="description" content="Description of CategoryPage" />
    </Helmet>
    <div>CategoryPage</div>
  </CategoryPageContext.Provider>
);

export default CategoryPage;
