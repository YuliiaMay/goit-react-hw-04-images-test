import React, {Component} from "react";
import { SearchbarContainer, SearchForm, SearchFormButton, SearchFormInput } from "./Searchbar.styled";
import { toast } from 'react-toastify';
import { FcSearch } from "react-icons/fc";


class Searchbar extends Component {
    state = {
        query: '',
    }

    handelChange = ({target: {value}}) => {
        this.setState({query: value.toLowerCase()})
    }

    handelSubmit = (e) => {
        e.preventDefault();

        if (this.state.query.trim() === '') {
            toast.warn('Please enter a search query');
            return;
        }

        this.props.onSubmit(this.state.query);
        console.log('reset');
        this.reset();
    }


    reset = () => {
        console.log('set');
        this.setState({
            query: ''
        })
    }

    render() {
        return (
            <SearchbarContainer>
                <SearchForm onSubmit={this.handelSubmit}>
                    <SearchFormButton type="submit">
                        <FcSearch size={32}/>
                    </SearchFormButton>

                    <SearchFormInput
                        type="text"
                        autocomplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                        name="query"
                        value={this.state.query}
                        onChange={this.handelChange}
                    />
                </SearchForm>
            </SearchbarContainer>
        )
    }
}

export default Searchbar;