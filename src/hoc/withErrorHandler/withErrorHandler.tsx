import React, { Component } from 'react';

import EMW from '../EMW/EMW';
import {AxiosStatic} from "axios";
import Modal from "../../components/ui/Modal/Modal";

interface IStateError {
     error: {
         message: string
     } | null
}

const withErrorHandler = ( WrappedComponent : React.ComponentType, axios : AxiosStatic ) => {
    return class extends Component {
        state : IStateError = {
            error : null
        }
        reqInterceptor: number = 0;
        resInterceptor: number = 0;

        componentWillMount () {
            this.reqInterceptor = axios.interceptors.request.use( req => {
                this.setState( { error: null } );
                return req;
            } );
            this.resInterceptor = axios.interceptors.response.use( res => res, error => {
                this.setState( { error: error } );
            } );
        }

        componentWillUnmount () {
            axios.interceptors.request.eject( this.reqInterceptor );
            axios.interceptors.response.eject( this.resInterceptor );
        }

        errorConfirmedHandler = () => {
            this.setState( { error: null } );
        }


        render () {
            let error = this.state.error;
            return (
                <EMW>
                    <Modal
                        show={error}
                        modalClosed={this.errorConfirmedHandler}>
                        { error  ? error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </EMW>
            );
        }
    }
}

export default withErrorHandler;
