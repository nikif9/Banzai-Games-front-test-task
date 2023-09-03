import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ReactPaginate from 'react-paginate';
import AddNewsModal from './news/AddNewsModal'; 
import { setCurrentPage, handleOpenAddModal } from '../redux/actions';
import NewsCard from './news/NewsCard';
import './style/Main.css';
import './style/modal.css';

const Main = () => {
    const dispatch = useDispatch();
    const totalPages = useSelector(state => state.totalPages);
    
    // Обработчик изменения страницы при выборе новой страницы
    const handlePageChange = page => {
        dispatch(setCurrentPage(page.selected + 1));
    };

    
    
    
    return (
        <div>
            <div className="button-container">
                <button onClick={() => dispatch(handleOpenAddModal())}>Add news</button>
            </div>
            <h2>news</h2>  
            <NewsCard  />
            
            <AddNewsModal  />
            <ReactPaginate
                pageCount={totalPages}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageChange}
                containerClassName={'pagination'}
                activeClassName={'active'}
                pageClassName={'page-item'}
                pageLinkClassName={'page-link'}
                previousClassName={'page-item'}
                nextClassName={'page-item'}
                previousLinkClassName={'page-link'}
                nextLinkClassName={'page-link'}
            />
        </div>
    );
};

export default Main;
