const {createProxyMiddleware} = require("http-proxy-middleware");

module.exports = function (app) {
    app.use(
        "/api",
        createProxyMiddleware({
            target: "http://localhost:8080", // Spring boot 서버 URL or localhost:스프링부트에서 설정한포트번호
            changeOrigin: true,
        })
    );
};
