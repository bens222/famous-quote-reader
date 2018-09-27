import React from 'react';

class Quote extends React.Component {
    render() {
        return (
            <p className='card-text'>{this.props.quote}</p>
        )
    }
}

export default Quote
