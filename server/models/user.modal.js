const {Schema,model} = require('mongoose');
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
const User  = model('User', userSchema);
module.export  = User;