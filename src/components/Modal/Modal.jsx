import { useState, useEffect } from "react";
import { Overlay, ModalContainer, ModalImg, CloseModalBtn } from "./Modal.styled";
import { ImCross } from "react-icons/im";

function Modal({ query, bigImgUrl, onClose }) {
    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
    }, [])

    useEffect(() => {
        return () => { window.removeEventListener('keydown', handleKeyDown); };
    }, [handleKeyDown])

    const handleKeyDown = (e) => {
        if (e.code === 'Escape') {
            return onClose();
        }
    };

    return (
        <Overlay>
            <ModalContainer>
                <ModalImg src={bigImgUrl} alt={query} />
            </ModalContainer>
            <CloseModalBtn><ImCross size={28}/></CloseModalBtn>
        </Overlay>
    )
}

export default Modal;