
const validate = (schema) => async (req, res, next)=>{
   try{
        const parseBody = await schema.parseAsync(req.body);
        console.log(schema)
        req.body = parseBody;
        next(); 
   } catch(error) {
       const message = error.errors[0].message;
    //    console.log(error.errors[0].message)
       return res.status(400).json({message: message})
   }
}

module.exports = {validate };

 

