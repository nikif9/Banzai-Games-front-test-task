import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
    handleChange, // Действие для обработки изменений в форме
    formSubmitHandle, // Действие для отправки формы
    handleCloseAddModal // Действие для закрытия модального окна
} from '../../redux/actions';// Импорт действий из Redux
import Modal from 'react-modal';

// Устанавливаем корневой элемент приложения для модального окна
Modal.setAppElement('#root');

const AddNewsModal = () => {
    const dispatch = useDispatch();

    // Используем селекторы для получения данных из состояния Redux
    const newNews = useSelector(state => state.newNews);
    const modalIsOpen = useSelector(state => state.modalIsOpen);
    const successModalIsOpen = useSelector(state => state.successModalIsOpen);
    const buttonIsDisable = useSelector(state => state.buttonIsDisable);
    const successModalText = useSelector(state => state.successModalText);
    const errors = useSelector(state => state.errors);

    return (
        <div>
            {/* Модальное окно для добавления новости */}
            <Modal isOpen={modalIsOpen} onRequestClose={() => dispatch(handleCloseAddModal())}>
                <h2> Add News</h2>
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
                    <button onClick={() => dispatch(handleCloseAddModal())}>Cancel</button>
                </form>
                
            </Modal>
            {/* Модальное окно для успешного добавления новости */}
            <Modal isOpen={successModalIsOpen} onRequestClose={() => dispatch(handleCloseAddModal())}>
                <h1 className='successText'>{successModalText}</h1>
            </Modal>
        </div>

    );
};

export default AddNewsModal;
