const library = require('./src/server');

library.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});