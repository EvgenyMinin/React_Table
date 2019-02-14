import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';
import _ from 'lodash';
import Loader from './Loader/Loader';
import Table from './components/Table';
import DetailRowView from './components/DetailRowView';
import ViewSelector from './components/ViewSelector';
import Search from './components/Search';

class App extends Component {

    state = {
        isLoading: false,
        isViewSelected: false,
        data: [],
        sort: 'asc',
        sortField: 'id',
        row: null,
        currentPage: 0,
        search: '' 
    }

    async fetchData(url) {
        const response = await fetch(url)
        const data = await response.json();
        
        this.setState({
            isLoading: false,
            data: _.orderBy(data, this.state.sortField, this.state.sort)
        })
    }

    handleSort = sortField => {
        const clonedData = this.state.data.concat();
        const sort = this.state.sort === 'asc' ? 'desc' : 'asc';
        const data = _.orderBy(clonedData, sortField, sort);

        this.setState({ data, sort, sortField })
    }

    handleRowSelect = row => {
        this.setState({ row });
    }

    handleViewSelect = url => {
        this.setState({
            isViewSelected: true,
            isLoading: true
        })

        this.fetchData(url)
    }

    handlePageChange = ({ selected }) => {
        this.setState({ currentPage: selected })
    }

    handleSearch = search => {
        this.setState({ search, currentPage: 0 })
    }

    getFilteredData() {
        const { data, search } = this.state;

        if (!search) return data;

        return data.filter(item => {
            return item['firstName'].toLowerCase().includes(search.toLowerCase())
             || item['lastName'].toLowerCase().includes(search.toLowerCase())
             || item['email'].toLowerCase().includes(search.toLowerCase())
        })
    }

    render() {
        const {isLoading, sort, sortField, row, isViewSelected} = this.state;
        const pageSize = 50;
        const filteredData = this.getFilteredData();
        const displayData = _.chunk(filteredData, pageSize)[this.state.currentPage];
        const pageCount = Math.ceil(filteredData.length / pageSize)
        if (!isViewSelected) {
            return (
                <div className='container'>
                    <ViewSelector onViewSelect={this.handleViewSelect} />
                </div>
            )
        }
        return (
            <div className="container">
                {
                    isLoading 
                        ? <Loader /> 
                        : <React.Fragment>
                            <Search onSearch={this.handleSearch}/>
                            <Table
                                data={displayData}
                                onSort={this.handleSort}
                                sort={sort}
                                sortField={sortField}
                                onRowSelect={this.handleRowSelect}
                            />
                        </React.Fragment> 
                }

                { this.state.data.length > pageSize &&
                    <ReactPaginate
                        previousLabel={'<'}
                        nextLabel={'>'}
                        breakLabel={'...'}
                        breakClassName='page-item'
                        breakLinkClassName='page-link'
                        pageCount={pageCount}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={this.handlePageChange}
                        containerClassName={'pagination'}
                        activeClassName={'active'}
                        pageClassName='page-item'
                        pageLinkClassName='page-link'
                        previousClassName='page-item'
                        previousLinkClassName='page-link'
                        nextClassName='page-item'
                        nextLinkClassName='page-link'
                        forcePage={this.state.currentPage}
                    />
                }

                { row && <DetailRowView post={row} /> }

            </div>
        );
    }
}
 
export default App;