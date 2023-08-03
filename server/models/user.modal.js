const {Schema,model} = require('mongoose');
const bycrypt  = require('bcrypt');
const jwt = require('jsonwebtoken');
const userSchema = new Schema({
    fullName: {
        type: String,
        required: [true, "Name is required"],
        minLength: [5,"Name must be atleast 5 character"],
        maxLength: [50, 'Name must should be less than character'],
        lowercase: true,
        trim: true

    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minLength:[8,"Password must be atleast 8 character"],
        select: false

    },
    role:{
        type: String,
        // to diiferenciate and show different things on dashboard on basis of User and Admin
        enum: ['User', 'Admin'],
        default:'User'
    },
    avatar:{
        public_id:{
            type: String
        },
        secure_url:{
            type: String
        }
    },
    forgotPasswordToken: String,
    forgotPasswordExpiry: Date

    
},{
    timestamps: true
})

// storing password in the encrypt format
userSchema.pre('save', async function() {
    // if password is not changed
    if(!this.isModified('password')){
        return next();
    }
    // if password is changed
    this.password = await  bcrypt.hash(this.password,10);
});

// compare password method  
userSchema.methods = {
    comparePassword:  async function(plainTextPassword){
        return await  bycrypt.compare(plainTextPassword,this.password);
    },
    generateJWTToken: function(){
        return jwt.sign(
            {
                id:this._id, role:this.role, email:this.email, subscription: this.subscription, // _id is mongo document id 
            },
                process.env.JWT_SECRET,

            {  
                expiresIn: process.env.JWT_EXPIRY
            }
            )
    }
}


const User  = model('User', userSchema);
module.export  = User;