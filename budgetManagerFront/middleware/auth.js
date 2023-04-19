export default function ({ store, redirect, route }) {
    // Vérifiez si l'utilisateur est authentifié
    if (!store.state.auth.token) {
        // Redirigez l'utilisateur vers la page de connexion ou d'inscription
        if (route.path !== '/login-page' && route.path !== '/register-page') {
            redirect('/login')
        }
    }
}