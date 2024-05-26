const User = require("../Schemas/userschema");

const register = async (req, res) => {
  const { username, password, connection_url } = req.body;

  try {
    // Find the user by username and password
    const user = await User.findOne({ username, password });

    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Update the user's connection_url
    user.connection_url = connection_url;
    await user.save();

    console.log("Connection URL updated successfully");
    // Return success response
    return res.json({ message: 'Connection URL updated successfully' });
  } catch (error) {
    console.error('Error during registration:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = register;
