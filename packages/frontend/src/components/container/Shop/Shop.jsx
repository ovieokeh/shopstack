import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ArrowUpward } from '@material-ui/icons';
import {
  getProductsRequest,
  getCategoriesRequest,
  getDepartmentsRequest,
} from '../../../actions/shopActions';
import { searchRequest, stopSearching } from '../../../actions/searchActions';
import { CatalogSidebar, CatalogContent } from '../../presentational';
import './Shop.scss';

class Shop extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 1,
      filter: null,
      selectedDepartment: null,
      selectedCategory: null,
      isFilterActive: false,
      searchInputValue: '',
    };

    this.sidebar = React.createRef();
  }

  componentDidMount() {
    this.fetchProducts();
    this.props.getCategories();
    this.props.getDepartments();
  }

  fetchProducts = () => {
    if (this.props.isSearching) {
      const params = {
        searchQuery: this.state.searchInputValue,
        allWords: true,
        page: this.state.page,
        limit: this.props.productsPerPage,
        descriptionLength: 100,
      };

      this.props.search(params);
    } else {
      const params = {
        page: this.state.page,
        limit: this.props.productsPerPage,
        filter: this.state.filter,
      };

      this.props.getProducts(params);
    }
  };

  clearActives = () => {
    const actives = this.sidebar.current.querySelectorAll('.active');
    actives.forEach(element => element.classList.remove('active'));
  };

  handleFilterClick = async (event, type, id) => {
    this.clearActives();

    event.target.classList.add('active');
    type === 'department'
      ? this.setState({ selectedDepartment: id })
      : this.setState({ selectedCategory: id });

    await this.setState({
      page: 1,
      isFilterActive: true,
      filter: { type, id },
    });

    this.fetchProducts();
  };

  handleLimitFilterSelect = async () => {
    await this.setState({ page: 1, isFilterActive: true });
    this.fetchProducts();
  };

  handlePageChange = async pageNumber => {
    window.scrollTo(0, 0);

    await this.setState({
      page: pageNumber,
    });

    this.fetchProducts();
  };

  handleSearchInput = event => this.setState({ searchInputValue: event.target.value });

  handleSearchSubmit = event => {
    event.preventDefault();

    const params = {
      searchQuery: this.state.searchInputValue,
      allWords: true,
      page: this.state.page,
      limit: this.props.productsPerPage,
      descriptionLength: 100,
    };

    this.props.search(params);
  };

  scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };

  clearSearch = async () => {
    await this.props.stopSearch();
    await this.setState({ searchInputValue: '' });
    this.fetchProducts();
  };

  clearFilters = async () => {
    await this.setState({
      page: 1,
      filter: null,
      selectedDepartment: null,
      selectedCategory: null,
      isFilterActive: false,
    });

    this.clearActives();
    this.fetchProducts();
  };

  render() {
    return (
      <div className="catalog">
        <button className="scroll-top-btn" onClick={this.scrollToTop} type="button">
          <ArrowUpward />
        </button>

        <CatalogSidebar
          ref={this.sidebar}
          categories={this.props.categories}
          departments={this.props.departments}
          handleFilterClick={this.handleFilterClick}
          selectedCategory={this.state.selectedCategory}
          selectedDepartment={this.state.selectedDepartment}
          handleLimitFilterSelect={this.handleLimitFilterSelect}
          clearFilters={this.clearFilters}
        />

        <CatalogContent
          catalogSidebar={this.sidebar}
          catalog={this.props.catalog}
          handlePageChange={this.handlePageChange}
          clearFilters={this.clearFilters}
          filterActive={this.state.isFilterActive}
          activePage={this.state.page}
          productsPerPage={this.props.productsPerPage}
          searchInputValue={this.state.searchInputValue}
          onSearchChange={this.handleSearchInput}
          onSearchSubmit={this.handleSearchSubmit}
          isSearching={this.props.isSearching}
          stopSearching={this.clearSearch}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  catalog: state.shop.catalog,
  categories: state.shop.categories,
  departments: state.shop.departments,
  isSearching: state.search.isSearching,
  productsPerPage: state.filters.limit,
});

const mapDispatchToProps = dispatch => ({
  getProducts: params => dispatch(getProductsRequest(params)),
  getCategories: () => dispatch(getCategoriesRequest()),
  getDepartments: () => dispatch(getDepartmentsRequest()),
  search: params => dispatch(searchRequest(params)),
  stopSearch: () => dispatch(stopSearching()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Shop);
