const ProductFilter = ({ filters, onFilterChange }) => {
    const categories = ['Electronics', 'Clothing', 'Books', 'Home & Garden'];
  
    return (
      <div className="filter-container">
        <h3>Filters</h3>
        <div className="filter-section">
          <label>Category</label>
          <select 
            value={filters.category}
            onChange={(e) => onFilterChange({ ...filters, category: e.target.value })}
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
        <div className="filter-section">
          <label>Price Range</label>
          <input
            type="number"
            value={filters.minPrice}
            onChange={(e) => onFilterChange({ ...filters, minPrice: e.target.value })}
            placeholder="Min Price"
          />
          <input
            type="number"
            value={filters.maxPrice}
            onChange={(e) => onFilterChange({ ...filters, maxPrice: e.target.value })}
            placeholder="Max Price"
          />
        </div>
      </div>
    );
  };
  
  export default ProductFilter;