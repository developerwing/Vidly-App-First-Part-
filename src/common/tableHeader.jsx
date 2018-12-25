import React, { Component } from 'react';
class TableHeader extends Component {
 
    raiseSort = (path)=>{
        const sortColumn = {...this.props.sortColumn};
        if(sortColumn.path === path) {
            sortColumn.order = (sortColumn.order === 'asc') ? 'desc' :'asc'
        } else {
            sortColumn.path = path;
            sortColumn.order = 'asc';
        }
        this.props.onSort(sortColumn);
    }

    renderSortIcon = (column)=>{
        if(column.path !== this.props.sortColumn.path) return null;
        if(this.props.sortColumn.order === 'asc') return <i className="fal fa-arrow-down"></i>
        return <i className="fal fa-arrow-up"></i>
    }

    render() {
        const { columns }  = this.props;
        return (
            <thead>
                <tr>
                    { columns.map(m => <th key = {m.path || m.key} onClick={() => this.raiseSort(m.path)}>{m.label}
                    {this.renderSortIcon(m)}
                    </th>)}
                </tr>
            </thead>
        );
    }
}

export default TableHeader;