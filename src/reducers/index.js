const initialState = {
    menu: [],
    items: [],
    totalPrice: 0,
    loading: true,
    error: false
}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'MENU_LOADED':
            return {
                ...state,
                menu: action.payload,
                loading: false,
            };
        case 'MENU_REQUESTED':
            return {
                ...state,
                loading: true,
            };
        case 'MENU_REJECTED':
            return {
                ...state,
                error: true
        };
        case 'ITEM_ADD_TO_CART':
            const id = action.payload;
            
            const itemIdx = state.items.findIndex(item => item.id === id);
              if (itemIdx >= 0) {
                const itemInState = state.items.find(item => item.id === id);
                const newItem = {
                    ...itemInState,
                    qtty: ++itemInState.qtty
                };
                return {
                    ...state,
                    items: [
                        ...state.items.slice(0, itemIdx),
                        newItem,
                        ...state.items.slice(itemIdx +1)
                    ],
                    totalPrice: state.totalPrice + newItem.price
                }
                
              } else {
                const item = state.menu.find(item => item.id === id);
                const newItem = {
                    title: item.title,
                    price: item.price,
                    url: item.url,
                    id: item.id,
                    qtty: 1
                };
                return {
                    ...state,
                    items: [
                        ...state.items,
                        newItem
                    ],
                    totalPrice: state.totalPrice + newItem.price
                };
              }

           

           

        case 'ITEM_REMOVE_FROM_CART': 
            const idx = action.payload,
             itemIndex = state.items.findIndex(item => item.id === idx),
             price = state.items[itemIndex]['price'] * state.items[itemIndex]['qtty'];
            return {
                ...state,
                items: [
                    ...state.items.slice(0, itemIndex),
                    ...state.items.slice(itemIndex + 1)
                ],
                totalPrice: state.totalPrice - price
            }

        case 'ITEM_CHANGE_COUNT':
            const target = action.event.target,
            targetId = action.payload;
            
            if (target.classList.contains('counter-button')) {
                const itemInState = state.items.find(item => item.id === targetId),
                targetIdx = state.items.findIndex(item => item.id === targetId),
                price = state.items[targetIdx]['price'] * state.items[targetIdx]['qtty'];
                if (target.classList.contains('counter-minus')) {
                    const newItem = {
                        ...itemInState,
                        qtty: --itemInState.qtty
                    };
                    if (newItem.qtty === 0) {
                        return {
                            ...state,
                            items: [
                                ...state.items.slice(0, targetIdx),
                                ...state.items.slice(targetIdx + 1)
                            ],
                            totalPrice: state.totalPrice - price
                        }
                    }
                    return {
                        ...state,
                        items: [
                            ...state.items.slice(0, targetIdx),
                            newItem,
                            ...state.items.slice(targetIdx +1)
                        ],
                        totalPrice: state.totalPrice - newItem.price
                    }
                
                }
                if (target.classList.contains('counter-plus')) {
                    const newItem = {
                        ...itemInState,
                        qtty: ++itemInState.qtty
                    };
                    return {
                        ...state,
                        items: [
                            ...state.items.slice(0, targetIdx),
                            newItem,
                            ...state.items.slice(targetIdx +1)
                        ],
                        totalPrice: state.totalPrice + newItem.price
                    }
                }
               
            }
            return state;
        default:
            return state;
    }
}

export default reducer;