class Api {
    constructor(options) {
      this._url = options.baseUrl;
      this._headers = options.headers;
    }
  
    _checkResponse(response) {
      if (response.ok) {
        return response.json();
      } else {
        return Promise.reject(`Something went wrong: ${response.status}, ${response.statusText}`);
      }
    }

    updateAuthorization(token) {
      this._headers.authorization = `Bearer ${token}`;
    }
  
    async getInitialCards() {
      const response = await fetch(`${this._url}/cards`, {
        headers: this._headers,
      });
    
      return this._checkResponse(response);
    }
  
    async getUserInfo() {
      const response = await fetch(`${this._url}/users/me`, {
        headers: this._headers,
      });
    
      return this._checkResponse(response);
    }
  
    async editUserInfo(name, about) {
      const response = await fetch(`${this._url}/users/me`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
          name: name,
          about: about
        })
      });
    
      return this._checkResponse(response);
    }
  
    async addCard(name, link) {
      const response = await fetch(`${this._url}/cards`, {
        method: "POST",
        headers: this._headers,
        body: JSON.stringify({
          name,
          link,
        })
      });
    
      return this._checkResponse(response);
    }
  
    async deleteCard(cardId) {
      const response = await fetch(`${this._url}/cards/${cardId}`, {
        method: "DELETE",
        headers: this._headers,
      });
    
      return this._checkResponse(response);
    }
  
    async editProfileImage(avatar) {
      const response = await fetch(`${this._url}/users/me/avatar`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
          avatar,
        })
      });
    
      return this._checkResponse(response);
    }

    async changeLikeCardStatus(cardId, isLiked) {
      const response = await fetch(`${this._url}/cards/likes/${cardId}`, {
        method: isLiked ? 'PUT' : 'DELETE',
        headers: this._headers,
      });
    
      return this._checkResponse(response);
    }
  }

const headers = {
    authorization: `Bearer ${localStorage.getItem('token')}`,
    "Content-Type": "application/json",
};

const api = new Api({
    baseUrl: "https://around.nomoreparties.co/v1/group-12",
    headers,
});

export default api;