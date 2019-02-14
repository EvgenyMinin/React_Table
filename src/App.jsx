import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';
import _ from 'lodash';
import Loader from './Loader/Loader';
import Table from './components/Table';
import DetailRowView from './components/DetailRowView';
import ViewSelector from './components/ViewSelector';

class App extends Component {

    state = {
        isLoading: false,
        isViewSelected: false,
        data: [],
        sort: 'asc',
        sortField: 'id',
        row: null,
        currentPage: 0
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

    render() {
        const {isLoading, sort, sortField, row, isViewSelected} = this.state;
        const pageSize = 50;
        const displayData = _.chunk(this.state.data, pageSize)[this.state.currentPage]
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
                        : <Table
                            data={displayData}
                            onSort={this.handleSort}
                            sort={sort}
                            sortField={sortField}
                            onRowSelect={this.handleRowSelect}
                        />
                }

                { this.state.data.length > pageSize &&
                    <ReactPaginate
                        previousLabel={'<'}
                        nextLabel={'>'}
                        breakLabel={'...'}
                        breakClassName='page-item'
                        breakLinkClassName='page-link'
                        pageCount={20}
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
                    />
                }

                { row && <DetailRowView post={row} /> }

            </div>
        );
    }
}
 
export default App;