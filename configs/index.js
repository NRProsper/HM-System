import dotenv from "dotenv";
dotenv.config();

const Configs = {
    db: process.env.db,
    HM_SYSTEM: process.env.HM_SYSTEM,
    PORT: process.env.PORT,
    
}

export default Configs;