const { v4: uuidv4 } = require('uuid');
const axios = require('axios');
const genderizeApi = 'https://api.genderize.io/';
const randomuserApi = 'https://randomuser.me/api/';

class User {
    constructor(id, username, name, email,  picture, gender, score = {rounds: 0, hits: 0}) {
        this.id = id;
        this.username = username;
        this.name = name;
        this.email = email;
        this.picture = picture?.large;
        this.gender = gender;
        this.score = score;
    };

    static users = [];

    static findAll() {
        return this.users;
    };

    static findByid(id) {
        return this.users.find(user => user.id === id);
    };

    static findByName(username) {
        return this.users.find(user => user.username === username);
    };

    static async create({ username }) {
        const id = uuidv4();
        let gender = 'undetermined';

        try {
            const genderResponse = await axios.get(`${genderizeApi}?name=${username}`);
            if (genderResponse.data.probability > 0.95) {
                gender = genderResponse.data.gender;
            }

            const randomUserResponse = await axios.get(`${randomuserApi}?gender=${gender}`);
            const { name, email, picture } = randomUserResponse.data.results[0];
            const newUser = new User(id, username, name, email, picture, gender);
            this.users.push(newUser);
        return newUser;
        } catch (err) {
            console.error('Error enriching user data:', err);
        };
    };

    static updateScore(id, score) {
        const user = this.findByid(id);
        if (!user) {
            throw new Error('User not found');
        };
        user.score = score;
        return user;
    };
};

module.exports = User;