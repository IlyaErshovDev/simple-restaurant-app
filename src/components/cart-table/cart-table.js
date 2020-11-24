import React from 'react';
import './cart-table.scss';
import {connect} from 'react-redux';
import WithRestoService from '../hoc';
import {delFromCart, changeCount} from '../../actions';

const CartTable = ({items, delFromCart, changeCount, totalPrice, RestoService}) => {
    if (items.length === 0) {
        return (
            <>
            <div className="cart__title">Your basket is empty</div>
            <div className="cart__message">Rather, order something delicious!</div>
            </>
        )
    }
    return (
        <>
            <div className="cart__title">Your order:</div>
            <div className="cart__list">
                {
                    items.map(item => {
                        const {title, price, url, id, qtty} = item;
                        return (  
                            <div key={id} className="cart__item">
                                <img src={url} className="cart__item-img" alt={title}></img>
                                <div className="cart__item-title">{title}</div>
                                <div className="cart__item-price">{price}$</div>
                                    <div className="food-counter">
                                        <button className="counter-button counter-minus"
                                         onClick={(event) => changeCount(event, id)}>-</button> 
                                        <span className="counter">{qtty}</span>
                                        <button className="counter-button counter-plus"
                                         onClick={(event) => changeCount(event, id)}>+</button>
                                    </div>
                                <div onClick={() => delFromCart(id)} className="cart__close">&times;</div>
                            </div>
                        )
                    })
                }
                <div className="cart__order_box">
                    <div className="cart__order_box-title">Total: </div>
                    <div className="cart__order_box-total">{totalPrice}$</div>
                    <button
                    onClick = {() => {RestoService.setOrder( generateOrder(items) )}}
                     className="cart__order_box-btn">Proceed to checkout</button>
                </div>
               
            </div>
        </>
    );
};

const generateOrder = (items) => {
    const newOrder = items.map(item => {
        return {
            id: item.id,
            qtty: item.qtty
        }
    })
    return newOrder;
}

const mapStateToProps = ({items, totalPrice}) => {
    return {
        items,
        totalPrice
    }
},

mapDispatchToProps = {
    delFromCart,
    changeCount
};

export default WithRestoService()(connect(mapStateToProps, mapDispatchToProps)(CartTable));