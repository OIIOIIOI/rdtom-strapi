module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '6dfcdc0755eadb1b9c09f3c321ac0646'),
  },
});
