function cookieGuard(request, response, next) {
    if(request.cookies.auth) {
        next();
    } else {
        return response.redirect(`${process.env.NODE_ENV === "development" ? "http" : "https"}://${request.headers['host']}/signin`)
    }
}

module.exports = {
    cookieGuard
};