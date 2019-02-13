import React, { Component } from 'react';
import _ from 'lodash';
import Loader from './Loader/Loader';
import Table from './components/Table';
import DetailRowView from './components/DetailRowView';

class App extends Component {

    state = {
        isLoading: true,
        data: [],
        sort: 'asc',
        sortField: 'id',
        row: null
    }

    async componentDidMount() {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts`)
        const data = await response.json();
        
        this.setState({
            isLoading: false,
            data: _.orderBy(data, this.state.sortField, this.state.sort)
        })
    }

    handleSort = sortField => {
        const clonedData = this.state.data.concat();
        const sortType = this.state.sort === 'asc' ? 'desc' : 'asc';
        const orderedData = _.orderBy(clonedData, sortField, sortType);

        this.setState({
            data: orderedData,
            sort: sortType,
            sortField
        })
    }

    handleRowSelect = row => {
        this.setState({ row });
    }

    render() { 
        return (
            <div className="container">
                {
                    this.state.isLoading 
                        ? <Loader /> 
                        : <Table
                            data={this.state.data}
                            onSort={this.handleSort}
                            sort={this.state.sort}
                            sortField={this.state.sortField}
                            onRowSelect={this.handleRowSelect}
                        />
                }

                { this.state.row
                    ? <DetailRowView post={this.state.row} />
                    : null
                }

            </div>
        );
    }
}
 
export default App;