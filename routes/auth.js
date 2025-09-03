app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Your authentication logic here
    const user = await authenticateUser(email, password);
    
    if (user) {
      req.session.userId = user.id;
      // Redirect to dashboard/home, NOT signup
      return res.redirect('/dashboard'); // or '/home' or wherever users should go
    } else {
      return res.redirect('/login?error=invalid');
    }
  } catch (error) {
    return res.redirect('/login?error=server');
  }
});