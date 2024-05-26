const User = require("../Schemas/userschema");
const authenticator = async (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);

  try {
    // Find the user by username
    const user = await User.findOne({ username });
    console.log(user);

    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' ,loginstate:false});
    }

    // Directly compare the provided password with the stored password
    if (user.password !== password) {
      return res.status(401).json({ error: 'Invalid username or password',loginstate:false });
    }
    console.log("success, url sent")
    // Authentication successful, return user data (excluding password)
    return res.json({connection_url:user.connection_url,loginstate:true});
  } catch (error) {
    console.error('Error during authentication:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = authenticator;
