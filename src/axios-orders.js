// axios-orders.js

import axios from 'axios';

const instance = axios.create({
baseURL:'https://burgerbuilder-26708-default-rtdb.firebaseio.com/'
});

export default instance;