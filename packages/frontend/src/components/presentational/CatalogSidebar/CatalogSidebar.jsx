import React, { useEffect, forwardRef } from 'react';
import { Limit } from '..';

const CatalogSidebar = forwardRef((props, ref) => {
  const {
    categories,
    departments,
    handleFilterClick,
    selectedDepartment,
    clearFilters,
    handleLimitFilterSelect,
  } = props;

  useEffect(() => {
    const hideSidebar = event => {
      const element = event.target;
      const allowed = ['catalog-sidebar', 'filters-toggle'];

      if (!allowed.includes(element.id) && !element.id.includes('select')) {
        ref.current.classList.remove('show-catalog-sidebar');
      }
    };

    document.addEventListener('click', hideSidebar);

    return () => {
      document.removeEventListener('click', hideSidebar);
    };
  }, [ref]);

  const renderDepartments = () =>
    departments.map(department => (
      <div
        onClick={e => handleFilterClick(e, 'department', department.department_id)}
        key={department.department_id}
        className="department"
      >
        <p>{department.name}</p>
      </div>
    ));

  const renderCategories = () => {
    if (!selectedDepartment) return <small>Select a department to see available catgories</small>;

    const categoriesToDisplay = categories.filter(category => {
      switch (selectedDepartment) {
        case 1:
          return ['French', 'Italian', 'Irish'].includes(category.name);
        case 2:
          return ['Animal', 'Flower'].includes(category.name);
        default:
          return ['Christmas', "Valentine's"].includes(category.name);
      }
    });

    return categoriesToDisplay.map(category => (
      <div
        onClick={e => handleFilterClick(e, 'category', category.category_id)}
        key={category.category_id}
        className="category"
      >
        <p>{category.name}</p>
      </div>
    ));
  };

  return (
    <div id="catalog-sidebar" ref={ref} className="catalog-sidebar">
      <div className="sidebar-content">
        <div>
          <h3>Departments</h3>
          {renderDepartments()}

          <h3>Categories</h3>
          {renderCategories()}
        </div>

        <div className="number-of-products-container">
          <small>Number of products per page</small>
          <Limit onFilterSelect={handleLimitFilterSelect} />
          <button className="clear-filters" onClick={() => clearFilters()} type="button">
            Clear filters
          </button>
        </div>
      </div>
    </div>
  );
});

export default CatalogSidebar;
