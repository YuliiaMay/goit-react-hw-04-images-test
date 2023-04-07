import React, { Component } from "react";
import ImageGalleryItem from "components/ImageGalleryItem/ImageGalleryItem";
import { GalleryWrapper } from "./ImageGallery.styled";
import LoadMoreButton from "components/Button/Button";
import Spiner from "components/Loader/Loader";
import DeafaultScreen from "components/DeafaultScreen/DeafaultScreen";
import ErrorScreen from "components/ErrorScreen/ErrorScreen";
import { toast } from 'react-toastify';
import Modal from "components/Modal/Modal";
import { fetchImages } from "services/api";
import scrollPageDown from "helpers/Scroll";


export default class ImageGallery extends Component {
    state = {
        gallery: [],
        status: 'idle',
        page: 1,
        showModal: false,
        bigImgUrl: null,
        total: null,
        isLoadBtn: false
    }

    componentDidMount() {
        document.addEventListener('click', ({ target }) => {
            if (target.nodeName !== 'IMG') {
                    this.setState({ showModal: false });
                    return;
            }

            this.setState({ showModal: true });
        });        
    }

    componentDidUpdate = (prevProps, prevState) => {
        const { page } = this.state;
        const prevQuery = prevProps.query;
        const currentQuery = this.props.query;

        if (currentQuery !== prevQuery) {
            this.setState({
                gallery: [],
                page: 1,
            });
        }


        if (currentQuery !== prevQuery || prevState.page !== page) {
            this.setState({ status: 'pending' })
            this.getImages();
        }
    }

    showSuccesMessage = () => {
        const { total } = this.state;
            return toast.success(`Total images in this gallery: ${total}`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
    }

    showErrorMessage = () => {
        toast.error("Let's try something else", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    } 

    getImages = () => {
        const { page, status, showModal } = this.state;
        const { query } = this.props;

        fetchImages(query, page)
            .then(({ data }) => {
                const total = data.totalHits;
                const newImages = data.hits;

                if (!newImages.length) {
                    this.showErrorMessage(query);
                    this.setState({status: 'rejected'})
                    return;
                }

                this.setState(({ gallery }) => {
                    const newArray = [...gallery, ...newImages];
                    return {
                        gallery: newArray,
                        status: 'resolved',
                        total
                    }
                })

                if (status === 'resolved' && page === 1 && showModal === false) {
                    this.showSuccesMessage();
                }

                if (page > 1) {
                    scrollPageDown();
                }
            })
            .catch(error => this.setState({
                status: 'rejected',
            })) 
    }

    toggleModal = () => {
        this.setState(({ showModal }) => ({ showModal: !showModal }));
    };

    openModal = ({target}) => {
        this.setState({bigImgUrl: target.dataset.url})
    }


    handleLoadMore = () => {
        this.setState(prevState => ({
            page: prevState.page + 1,
        }));
    }

    render() {
        console.log(this.props);
        
        const { gallery, status, showModal, bigImgUrl, total } = this.state;


        if (status === 'idle') {
            return (<DeafaultScreen />);
        }

        if (status === 'pending') {
            return (<Spiner />);
        }

        if (status === 'rejected') {
            return (<ErrorScreen query={this.props.query} />);
        }

        if (status === 'resolved') {
            return (
                <>
                    <GalleryWrapper onClick={this.toggleModal}>
                        {
                            gallery.map(({ id, webformatURL, largeImageURL}) =>
                                <ImageGalleryItem
                                    key={id}
                                    smallUrl={webformatURL}
                                    largeUrl={largeImageURL}
                                    onOpenModal={this.openModal}
                                />
                            )
                        }
                    </GalleryWrapper>

                    {
                        showModal && <Modal onClose={this.toggleModal}  bigImgUrl={bigImgUrl} query={this.props.query} />
                    }


                    {
                        gallery.length > 0 && gallery.length !== total && (
                            <LoadMoreButton onLoadMore={this.handleLoadMore} query={this.props.query} />
                        )
                    }
                    
                </>
            )
        }
    }
}