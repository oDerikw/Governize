import type { User } from 'src/models/user';
import { randomId } from 'src/utils/randomId';
import { sign, decode, JWT_SECRET, JWT_EXPIRES_IN } from '../utils/jwt';
import { wait } from 'src/utils/wait';
import axios from 'axios'; 
const users = [
  {
    id: '1',
    avatar: '/static/images/avatars/3.jpg',
    location: 'San Francisco, USA',
    username: 'admin',
    email: 'demo@example.com',
    name: 'Rachael Simons',
    jobtitle: 'Lead Developer',
    password: 'TokyoPass1@',
    role: 'admin',
    posts: '27',
    coverImg: '/static/images/placeholders/covers/5.jpg',
    followers: '6513',
    description: 'Curabitur at ipsum ac tellus semper interdum.'
  }
];

class AuthApi {

  async login({ email, password }): Promise<string> {
    await wait(500);

    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.post("https://api.escuelajs.co/api/v1/auth/login", {
          email: email,
          password: password
        });
        console.log(response.data);

        const accessToken = response.data.access_token;
        console.log(accessToken);

        resolve(accessToken);
        console.log("abcccc");
      } catch (err) {
        console.log("Internal server error!!!")
        console.error(err);
        reject(new Error('Internal server error'));
      }
    });
  }
 

  async register({ email, name, password }): Promise<string> {
    await wait(1000);
    console.log("entraa aq");
    return new Promise((resolve, reject) => {
      try {
        let user = users.find((_user) => _user.email === email);

        if (user) {
          reject(new Error('Email address is already in use'));
          return;
        }

        user = {
          id: randomId(),
          avatar: null,
          jobtitle: 'Lead Developer',
          email,
          username: null,
          name,
          password,
          location: null,
          role: 'admin',
          posts: null,
          coverImg: null,
          followers: null,
          description: null
        };

        users.push(user);

        const accessToken = sign({ userId: user.id }, JWT_SECRET, {
          expiresIn: JWT_EXPIRES_IN
        });

        resolve(accessToken);
      } catch (err) {
        console.error(err);
        reject(new Error('Internal server error'));
      }
    });
  }
  me(accessToken) {
    return new Promise((resolve, reject) => {
      try {
        //const { userId } = decode(accessToken) as any;
        const apiUrl = `https://api.escuelajs.co/api/v1/auth/profile`; // Substitua pela sua URL real
  
        axios.get(apiUrl, {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        })
        .then(response => {
          const user = response.data;
          console.log(response.data);
          resolve(user);
        })
        .catch(error => {
          reject(new Error('Erro ao obter dados do usuário: ' + error.message));
        });
      } catch (err) {
        console.error(err);
        reject(new Error('Erro interno do servidor'));
      }
    });
  }
}

export const authApi = new AuthApi();
