import {asyncHandler, ApiError, ApiResponse, uploadOnCloudinary} from "../utils/index.utils.js";
import {User} from "../models/index.models.js";



const registerUser = asyncHandler(async (req, res)=>{
    // get user details from frontend
    // validation - not empty, email format, password length
    // check if user exists: username, email
    // check for images, and avatar
    // upload images to cloudinary
    // create user object - create entry in db
    // remove password and refresh token from response
    // check for user creation
    // send response



    const {username, email, fullname, password } = req.body;
    console.log(email)

    if([
        username,
        email,
        fullname,
        password
    ].some((field)=> field.trim() === "")) {
        throw new ApiError(400, "All fields are required")
    }

    const existedUser = User.findOne({
        $or: [{username}, {email}]
    })
    
    if(existedUser){
        throw new ApiError(409, "User already exists")
    }

    const avatarLocalPath = req.files?.avatar[0]?.path
    const coverImageLocalPath = req.files?.coverImage[0]?.path

    if(!avatarLocalPath){
        throw new ApiError(400, "Avatar is required")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if(!avatar){
        throw new ApiError(400, "Avatar is required")
    }

    const user = await User.create({
        username,
        email,
        fullname,
        password,
        avatar: avatar.url,
        coverImage: coverImage?.url || ""
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken -__v"
    )

    if(!createdUser){
        throw new ApiError(500, "User creation failed")
    }

    return res.status(200).json(
        new ApiResponse(200, createdUser, "User registered successfully")
    )


})

export {registerUser}