app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - User: ${req.session?.userId || 'Not logged in'}`);
  next();
});
