import React, {Component} from 'react';
import { connect } from 'react-redux';
import Error from '../error';
import {menuRejected} from '../../actions';


class ErrorBoundry extends Component {

    componentDidCatch() {
        this.props.menuRejected();
    }
    render() {
        const {error} = this.props;
        if (error) {
            return <Error/>
        }
        //если всё хорошо
        return this.props.children;
    }
}

const mapStateToProps = (state) => {
    return {
        menuItems: state.menu,
        loading: state.loading,
        error: state.error
    }
};
const mapDispatchToProps =  {
    menuRejected
};


export default connect(mapStateToProps, mapDispatchToProps)(ErrorBoundry);