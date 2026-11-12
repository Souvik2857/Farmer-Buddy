import {rateLimit} from 'express-rate-limit'

const limiter=rateLimit({
    windowMs:2*60*1000,
    limit:5,
    message:{status:429,message:"please retry after for 2 mins"},
})

export default limiter