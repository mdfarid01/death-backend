import mongoose from 'mongoose';
import moongose,{Schema} from 'mongoose';
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';



const userSchema = new Schema(
    {
        username:{
            type:String,
            unique:true,
            required:true,
            lowercase:true,
            index:true,
            trim:true,
        },
        email:{
            type:String,
            unique:true,
            required:true,
            lowercase:true,
            trim:true,
        },
        fullname:{
            type:String,
            required:true,
            trim:true,
            index:true,
        },
        avatar:{
            type:String,   //cloudinary image url
            required:true,
        },
        coverImage:{
            type:String,  //cloudinary image url
            
        },
        watchHistory:[
            {
                type:Schema.Types.ObjectId,
                ref:'Video',
            }
        ],
        password:{
            type:String,
            required:[true,'Password is required'],
        },
        refreshToken:{
            type:String,
            
        }

},
{
    timestamps:true,
}

)
 

userSchema.pre('save',async function(next){
    if(!this.isModified('password')) return next();
    this.password=await bcrypt.hash(this.password,10)
    next()

})

userSchema.methods.isPasswordCorrect=async function(password){
    return await bcrypt.compare(password,this.password)
}
userSchema.methods.generateToken=function(){
  return jwt.sign(
    {
        _id:this._id,
        email:this.email,
        username:this.username,
        fullname:this.fullname,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expoiresIn:process.env.ACCESS_TOKEN_EXPIRY,
    }
  )
}
userSchema.methods.generateRefreshToken=function(){
    return jwt.sign(
        {
            _id:this._id,
            email:this.email,
            username:this.username,
            fullname:this.fullname,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expoiresIn:process.env.REFRESH_TOKEN_EXPIRY,
        }
      )

}

export const User=mongoose.model('User',userSchema);