import dotenv from "dotenv";
dotenv.config();

const Configs = {
    db: process.env.db,
    HM_SYSTEM: process.env.HM_SYSTEM,
    PORT: process.env.PORT,
    JWT_SECRET_KEY:process.env.JWT_SECRET_KEY
    
}

export default Configs;