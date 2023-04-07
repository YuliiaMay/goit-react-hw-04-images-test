import { Component } from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ImageGallery from "./ImageGallery/ImageGallery";
import Searchbar from "./Searchbar/Searchbar";


export class App extends Component {
  state = {
    query: '',
  }


  handelSubmit = (query) => {
    this.setState({query})
  }

  render() {
    const { query } = this.state;

      return (
        <div
          style={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              gridGap: '16px',
              paddingBottom: '24px',
          }}
        >
          
          <Searchbar onSubmit={this.handelSubmit} />
          <ImageGallery query={query} />
          
          <ToastContainer />
        </div>
      );
  }
};
