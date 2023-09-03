import React, { useEffect,} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
    fetchNews, // Действие для получения новостей
    deleteNews, // Действие для удаления новости
    handleOpenEdit, // Действие для открытия режима редактирования
    handleCloseEdit, // Действие для закрытия режима редактирования
    handleChange, // Действие для обработки изменений в форме
    formSubmitHandle // Действие для отправки формы
} from '../../redux/actions';  // Импорт действий из Redux
import '../style/NewsCard.css';

const NewsCard = () => {
    const dispatch = useDispatch();

    // Использование селекторов для получения данных из состояния Redux
    const isEdit = useSelector(state => state.isEdit);
    const changeId = useSelector(state => state.changeId);
    const buttonIsDisable = useSelector(state => state.buttonIsDisable);
    const newNews = useSelector(state => state.newNews);
    const news = useSelector(state => state.news);
    const currentPage = useSelector(state => state.currentPage);
    const errors = useSelector(state => state.errors);

    // Запрос новостей при монтировании компонента и изменении текущей страницы
    useEffect(() => {
        dispatch(fetchNews());
    }, [dispatch, currentPage]);
    // Обработчик кнопки удаления новости
    const deleteNewsButtonHandler = (id) => {
        dispatch(deleteNews(id));
    };
    

    return(
    <div>
        {/* Отображение ошибки, если есть ошибка при загрузке новостей */}
        {errors.fetchNewsError &&  <h1> {errors.fetchNewsError} </h1>}
        <div className="news-list-container ">
            {/* Отображение списка новостей */}
            {news.map(data => (
                <div key={data.id} id={data.id} className='news-card' >
                    {/* Форма для редактирования новости, если включен режим редактирования */}
                    {(isEdit && changeId == data.id) ? 
                    <form onSubmit={(event) =>dispatch(formSubmitHandle(event))} >
                        <h1> {errors.updateNewsTableError} </h1>
                        <label htmlFor="title">title:</label>
                        <input type="text" id="title" name="title" value={newNews.title} onChange={(event) =>dispatch(handleChange(event))} required />
                        <br></br>
                        <label htmlFor="description">description:</label>
                        <input type="text" id="description" name="description" value={newNews.description} onChange={(event) =>dispatch(handleChange(event))} required />
                        <br></br>
                        <label htmlFor="text">text:</label>
                        <textarea id="News_text" name="text" value={newNews.text} onChange={(event) =>dispatch(handleChange(event))} required />
                        <p></p>
                        <button type="submit" disabled={buttonIsDisable}>Add</button>
                        <button onClick={() => dispatch(handleCloseEdit)}>Cancel</button>
                    </form>
                    :
                    <div>
                        {/* Отображение информации о новости, если не включен режим редактирования */}
                        <h4 dangerouslySetInnerHTML={{ __html:data.title}} />
                        <p className='eclipsedText' dangerouslySetInnerHTML={{ __html:data.description}} />
                        <p className='eclipsedText' dangerouslySetInnerHTML={{ __html:data.text}} />
                        <button className='edit' onClick={() => dispatch(handleOpenEdit(data))}>Edit News</button>
                        <button className='edit' onClick={() => deleteNewsButtonHandler(data.id)}>Delete News</button>
                    </div> 
                    }
                </div>
            ))}
        </div>
        
    </div>
    
    )
};

export default NewsCard;