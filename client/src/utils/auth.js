import decode from 'jwt-decode';

class AuthService {

    getProfile() {
        return decode(this.getToken());
    }

    loggedIn() {
        const token = this.getToken();
        return !!token &!this.isTokenExpired(token);
    }

    isTokenExpired(token) {
        try {
            const decoded = decode(token);
            if (decoded.exp < Date.now() / 1000) {
                return true
            } else return false
        } catch (err) {
            return false;
        }
    }

    getToken() {
        // Grab user data from LS
        return localStorage.getItem('id_token')
    }

    login(idToken) {
        // Set user data in LS
        localStorage.setItem('id_token', idToken)
        window.location.assign('/home')
    }
    // Clear user data on logout
    logout() {
        localStorage.removeItem('id_token');
        // Nav user to homepage after logout -- resets state of app
        window.location.assign('/home')
    }

}

export default new AuthService();