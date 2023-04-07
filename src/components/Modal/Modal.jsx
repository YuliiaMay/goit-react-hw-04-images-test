import React, { Component } from "react";
import { Overlay, ModalContainer, ModalImg, CloseModalBtn } from "./Modal.styled";
import { ImCross } from "react-icons/im";

class Modal extends Component {
    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown);
    }

    handleKeyDown = e => {
        if (e.code === 'Escape') {
            return this.props.onClose();
        }
    };

    render() {
        const { bigImgUrl, query } = this.props;

        return (
            <Overlay>
                <ModalContainer>
                    <ModalImg src={bigImgUrl} alt={query} />
                </ModalContainer>
                <CloseModalBtn><ImCross size={28}/></CloseModalBtn>
            </Overlay>
        )
    }
}

export default Modal;