import mongoose ,{Schema} from 'mongoose'; 


const videoSchema = new Schema(
    {
        videoFile:{
            type:String,  //cloudinary video url
            required:true,

        },
        thumbnail:{
            type:String,  //cloudinary image url
            required:true,
        },
        title:{
            type:String,  //cloudinary url
            required:true,
        },
        description:{
            type:String,  //cloudinary url
            required:true,
        }, 
        duration:{
            type:Number,   //cluodinary url
            required:true,
        },
        views:{
            type:Number,
            default:0,
        },
        isPublished:{
            type:Boolean,
            default:false,
        },
        owner:{
            type:Schema.Types.ObjectId,
            ref:'User',
        }

    },
    {
        timestamps:true,
    }
)


videoSchema.plugin(mongooseAggregatePaginate);

export const Video=mongoose.model('Video',videoSchema);