import React ,{Component} from 'react';
import _ from 'lodash';
import ProTypes from 'prop-types';
const Pagination =(props)=>{
    const {itemsCount,pageSize} =props;
    const pageCount = Math.ceil(itemsCount/pageSize);
    const pages = _.range(1,pageCount+1);
    console.log(pages);
    if(pages.length===1) return null;
    
    return (
        <nav>
            <ul className="pagination">
            { pages.map(page=>(
                <li key={page} className={props.currentPage===page?'page-item active':'page-item'}><a onClick={()=>props.onPageChanges(page)}  
                className="page-link">{page}</a>
                </li>
            ))}
                
            </ul>
        </nav>
    );
};

Pagination.prototype = {
    itemsCount : ProTypes.number.isRequired,
    pageSize : ProTypes.number.isRequired,
}

export default Pagination;