const express = require('express'); // Assuming you're using Express
const session = require('express-session');
const path = require('path'); // If you're using view engines like EJS, Pug, etc.
// Import your controllers and middleware
const loginController = require('./routes/auth'); // Assuming your login logic is there
const requireAuth = require('./middleware/auth');
const debugMiddleware = require('./middleware/debug'); // Import your debug middleware

const app = express();

// Middleware to parse request bodies
app.use(express.urlencoded({ extended: true })); // For form data
app.use(express.json()); // For JSON payloads

// Session Configuration - VERY IMPORTANT
app.use(session({
  secret: 'your-very-secure-and-long-secret-key', // CHANGE THIS to a random, strong secret
  resave: false,
  saveUninitialized: false, // Only save sessions if they are modified (e.g., user logs in)
  cookie: { secure: false } // Set to true if you're using HTTPS in production
}));

// Apply the debug middleware AFTER session setup so it can access req.session
app.use(debugMiddleware);

// Set up view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Modified login routes with proper handling
app.get('/login', (req, res) => {
    // If user is already logged in, redirect to dashboard
    if (req.session.user) {
        return res.redirect('/dashboard');
    }
    res.render('login');
});

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Assuming loginController validates credentials
        const user = await loginController(email, password);
        
        if (user) {
            // Store user info in session
            req.session.user = user;
            return res.redirect('/dashboard');
        } else {
            return res.render('login', { error: 'Invalid credentials' });
        }
    } catch (error) {
        console.error('Login error:', error);
        res.render('login', { error: 'An error occurred during login' });
    }
});

app.get('/signup', (req, res) => {
    // If user is already logged in, redirect to dashboard
    if (req.session.user) {
        return res.redirect('/dashboard');
    }
    res.render('signup');
});

app.get('/dashboard', requireAuth, (req, res) => {
    res.render('dashboard', { user: req.session.user });
});

// Logout route
app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/login');
});

// Protected routes AFTER auth setup
app.use('/protected', requireAuth);

// This should come AFTER specific routes
app.get('*', (req, res) => {
  res.status(404).send('Page not found');
});

// Uncomment and use this server setup
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});