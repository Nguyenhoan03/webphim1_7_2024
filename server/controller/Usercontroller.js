const Userservice = require('../services/Userservices') 
const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const data = await Userservice.Servicelogin(email, password);
       
        if (data.success) {
            res.status(200).json({ token: data.token , name: data.name});
        } else {
            res.status(401).json({ message: data.message });
        }
    } catch (error) {
        console.error("Error in login:", error);
        res.status(500).json("Server error");
    }
}

const Register = async (req, res) => {
    const { email,name, password } = req.body;
    try {
        const data = await Userservice.Serviceregister(email,name, password);
        if (data.success) {
            res.status(201).json({ message: 'User registered successfully' });
        } else {
            res.status(409).json({ message: data.message });
        }
    } catch (error) {
        console.error("Error in Register:", error);
        res.status(500).json("Server error");
    }
}

module.exports={Login,Register}