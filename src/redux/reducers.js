const initialState = {
    news: [],
    changeId: null,
    isEdit: false,
    buttonIsDisable: false,
    modalIsOpen: false,
    successModalText:'Новость успешно добавлено',
    successModalIsOpen: false,
    newNews:{ title: '', description: '', text: '' },
    currentPage: 1,
    totalPages: null,
    errors: {
        updateNewsTableError: null,
        fetchNewsError: null,
    }
};

const taskReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_NEWS_SUCCESS':
            return {
                ...state,
                news: action.payload.news,
                totalPages: action.payload.totalPages,
                errors: {
                    updateNewsTableError: null,
                    fetchNewsError: null,
                },
            };
        case 'FETCH_NEWS_FAILURE':
            return {
                ...state,
                news: [],
                errors: {
                    updateNewsTableError: null,
                    fetchNewsError: action.payload.error,
                },
            };
        case 'UPDATE_NEWS_TABLE_FAILURE':
            return {
                ...state,
                errors: {
                    updateNewsTableError: action.payload.error,
                    fetchNewsError: null,
                },
            };
        case 'SET_CURENT_PAGE':
            return {
                ...state,
                currentPage: action.payload,
            };
        case 'SET_MODAL_IS_OPEN':
            return {
                ...state,
                modalIsOpen: action.payload,
            };
        case 'SET_IS_EDIT':
            return {
                ...state,
                isEdit: action.payload,
            };
        case 'SET_CHANGE_ID':
            return {
                ...state,
                changeId: action.payload,
            };
        case 'SET_BUTTON_IS_DISABLE':
            return {
                ...state,
                buttonIsDisable: action.payload,
            };
        case 'SET_NEW_NEWS':
            return {
                ...state,
                newNews: action.payload,
            };
        case 'SET_SUCCESS_MODAL_IS_OPEN':
            return {
                ...state,
                successModalIsOpen: action.payload,
            };
        case 'CLEAR_ERROR':
            return {
                ...state,
                errors: {
                    updateNewsTableError: null,
                    fetchNewsError: null,
                },
            };
        default:
            return state;
    }
};

export default taskReducer;
