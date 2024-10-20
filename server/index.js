import express from "express"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import multer from "multer"
import helmet from "helmet"
import path from "path"
import { fileURLToPath } from "url"
import authRoutes from "./routes/auth.js"
import userRoutes from "./routes/users.js"
import { register } from "./controllers/auth.js"

/*Configuration*/
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
dotenv.config()
const app = express()
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }))
app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))
app.use(cors())
app.use("/assets", express.static(path.join(__dirname, "public/assets")))

/* File Storage */

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/assets")
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
const upload = multer({ storage })

/* Routes with files */
app.post("/auth/register", upload.single('picture'), register)

/* Routes */
app.use("/auth", authRoutes)
app.use("users", userRoutes)

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParse: true,
    useUnifiedTopology: true
}).catch((error) => console.log(`${error} connection error`))