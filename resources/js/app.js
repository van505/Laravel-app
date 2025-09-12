import React from 'react';
import ReactDOM from 'react-dom';
import ProfileForm from './components/ProfileForm';

if (document.getElementById('profile-form')) {
    ReactDOM.render(<ProfileForm />, document.getElementById('profile-form'));
}

