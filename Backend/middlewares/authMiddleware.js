const ensureAuth = (req, res, next) => {
    // 인증 로직 없이 항상 다음 미들웨어로 진행
    return next();
  };
  
  module.exports = { ensureAuth };