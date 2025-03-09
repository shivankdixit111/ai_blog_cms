const z = require('zod')

const loginSchema = z.object({ 
    email: 
    z
    .string("Username is required")
    .email("Invalid email address"), 
 
    password: 
    z
    .string("Password is required")
    .min(4, {message: "Password must contain atleast 3 characters"})
    .max(15, {message: "Password must not contain more than 15 characters"}),
})

const signUpSchema = z.object({
   username: 
   z
   .string("Username is required")
   .min(3, {message: "Username must contain atleast 3 characters"})
   .max(15, {message: "Username must not contain more than 15 characters"}),

   email: 
   z
   .string("Username is required")
   .email("Invalid email address"), 

   password: 
   z
   .string("Password is required")
   .min(4, {message: "Password must contain atleast 3 characters"})
   .max(15, {message: "Password must not contain more than 15 characters"}),

   phoneNo: 
   z
   .string("PhoneNo is required")
   .min(10, {message: "PhoneNo must contain 10 digits"})
   .max(10, {message: "PhoneNo cannot contain more than 10 digits"})
   
})

module.exports = {loginSchema, signUpSchema}