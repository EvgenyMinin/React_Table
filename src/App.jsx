import React, { Component } from 'react';
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
        row: null
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

    render() {
        const {data, isLoading, sort, sortField, row, isViewSelected} = this.state;
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
                            data={data}
                            onSort={this.handleSort}
                            sort={sort}
                            sortField={sortField}
                            onRowSelect={this.handleRowSelect}
                        />
                }

                { row && <DetailRowView post={row} /> }

            </div>
        );
    }
}
 
export default App;