import axios from 'axios';
import configData from "../config/config.json";
// Действие для получения новостей с бэкенда
export const fetchNews = () => async (dispatch, getState) => {
    try {
        // Отправляем GET-запрос к бэкенду для получения новостей
        const response = await axios.get(`${configData.BACKEND_URL}/api/getlist?page=${getState().currentPage}`);
        const news = response.data;
        // Диспетчим действие успеха с полученными данными новостей
        dispatch(fetchNewsSuccess(news));
    } catch (error) {
        // Обрабатываем ошибки и диспетчим действие неудачи с сообщением об ошибке
        let errorText = ''
            if (error?.response?.data?.error) {
                errorText = error?.response?.data?.error
            }else{
                errorText = error.message
            }
        dispatch(fetchNewsFailure(errorText));
    }
};
// Действие для обработки успешного получения новостей
const fetchNewsSuccess = (news) => ({
    type: "FETCH_NEWS_SUCCESS",
    payload: {
        news: news.data,
        totalPages: news.totalPages
    },
});
// Действие для обработки неудачного получения новостей
const fetchNewsFailure = (error) => ({
    type: 'FETCH_NEWS_FAILURE',
    payload: {
        error: error
    }
});

 // Действие для обновления или создания новости
export const updateNewsTable = () => {
    return async (dispatch, getState) => {
        try {
            if (getState().isEdit) {
                 // Отправляем POST-запрос для обновления новости с указанным ID
                await axios.post(`${configData.BACKEND_URL}/api/update/${getState().changeId}`, getState().newNews);
                dispatch(handleCloseEdit());
            }else{
                // Отправляем POST-запрос для создания новой новости
                await axios.post(`${configData.BACKEND_URL}/api/create`, getState().newNews);
                dispatch(handleCloseAddModal());
                dispatch(handleOpenSuccessModal())
            }
            // Получаем новости после обновления или создания
            dispatch(fetchNews());
        } catch (error) {
            // Обрабатываем ошибки и диспетчим действие неудачи с сообщением об ошибке
            let errorText = ''
            if (error?.response?.data?.errors) {
                errorText = Object.values(error?.response?.data?.errors).flatMap(errorList => errorList).join(' ')
            }else{
                errorText = error.message
            }
            dispatch(updateNewsTableFailure(errorText));
        }
        // активируем кнопку отправки запроса
        dispatch(setButtonIsDisable(false))
    };
};

// Действие для открытия модального окна успеха на короткое время
const handleOpenSuccessModal = () => {
    return (dispatch) =>{
        dispatch(setSuccessModalIsOpen(true));
        setTimeout(() => {
            dispatch(setSuccessModalIsOpen(false));
        }, 1000);
    }
    
};
// Действие для обработки неудачного обновления таблицы новостей
const updateNewsTableFailure = (error) => ({
    type: 'UPDATE_NEWS_TABLE_FAILURE',
    payload: { error: error }
});
// Действие для очистки ошибок
const clearError = () => ({
    type: 'CLEAR_ERROR'
});
// Действие для удаления новости по ID
export const deleteNews = (id) => {
    return async dispatch => {
        try {
            // Отправляем DELETE-запрос для удаления новости по ID
            await axios.delete(`${configData.BACKEND_URL}/api/delete/${id}`);
            // Получаем новости после удаления
            dispatch(fetchNews());
        }catch (error) {
            console.log(error)
        }
        
    };
};

// Действие для открытия режима редактирования новости
export const handleOpenEdit = (news) => {
    return dispatch => {
        dispatch(clearError())
        dispatch(setIsEdit(true))
        dispatch(setChangeId(news.id))
        dispatch(setNewNews({ title: news.title.replace(/<[^>]*>/g, ''), description: news.description.replace(/<[^>]*>/g, ''), text: news.text.replace(/<[^>]*>/g, '') }))
    }
};
// Действие для закрытия режима редактирования новости
export const handleCloseEdit = () => {
    return dispatch => {
        dispatch(setIsEdit(false))
        dispatch(setChangeId(null))
        dispatch(setNewNews({ title: '', description: '', text: '' }));
    }
};
// Действие для закрытия модального окна добавления новости
export const handleCloseAddModal = () => {
    return dispatch => {
        dispatch(setModalIsOpen(false));
        dispatch(setNewNews({ title: '', description: '', text: '' }));
    }
};
// Действие для открытия модального окна добавления новости
export const handleOpenAddModal = () => {
    return dispatch => {
        
        dispatch(handleCloseEdit())
        dispatch(clearError())
        dispatch(setModalIsOpen(true));
    }
};
// Действие для обработки изменений полей формы
export const handleChange = event => {
    return (dispatch, getState) => {
        const { name, value } = event.target;
        dispatch(setNewNews({
            ...getState().newNews,
            [name]: value,
        }));
    }
};
// Действие для обработки отправки формы
export const formSubmitHandle = event => {
    return dispatch => {
        event.preventDefault();
        // отключаем кнопку на время запроса чтобы не отправить несколько одинаковых
        dispatch(setButtonIsDisable(true))
        dispatch(updateNewsTable());
    }
};
// Действие для установки текущей страницы для пагинации новостей
export const setCurrentPage = (page) => ({
    type: 'SET_CURENT_PAGE',
    payload: page
});
// Действия для управления состоянием модального окна и другими элементами интерфейса
const setModalIsOpen = (state) => ({
    type: 'SET_MODAL_IS_OPEN',
    payload: state
});

const setIsEdit = (state) => ({
    type: 'SET_IS_EDIT',
    payload: state
});

const setChangeId = (state) => ({
    type: 'SET_CHANGE_ID',
    payload: state
});

export const setButtonIsDisable = (state) => ({
    type: 'SET_BUTTON_IS_DISABLE',
    payload: state
});

export const setNewNews = (news) => ({
    type: 'SET_NEW_NEWS',
    payload: news
});

export const setSuccessModalIsOpen = (state) => ({
    type: 'SET_SUCCESS_MODAL_IS_OPEN',
    payload: state
});