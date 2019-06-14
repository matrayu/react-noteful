export default {
    API_ENDPOINT: process.env.NODE_ENV === 'production' ? `https://quiet-bastion-66476.herokuapp.com/api` : 'http://localhost:8000/api',
}