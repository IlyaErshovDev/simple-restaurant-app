const menuLoaded = (newMenu) => {
    return {
        type: 'MENU_LOADED', 
        payload: newMenu
    };
};

const menuRequested = () => {
    return {
        type: 'MENU_REQUESTED',
    };
};

const menuRejected = () => {
    return {
        type: 'MENU_REJECTED',
    };
};

const addedToCart = (id) => {
    return {
        type: 'ITEM_ADD_TO_CART',
        payload: id
    };
};

const delFromCart = (id) => {
    return {
        type: 'ITEM_REMOVE_FROM_CART',
        payload: id
    };
};

const changeCount = (event, id) => {
    return {
        type: 'ITEM_CHANGE_COUNT',
        payload: id,
        event
    }
}

export {
    menuLoaded,
    menuRequested,
    menuRejected,
    addedToCart,
    delFromCart,
    changeCount
};