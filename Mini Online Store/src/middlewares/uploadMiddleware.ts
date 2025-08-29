import multer from 'multer';
import path from 'path';
import fs from 'fs';

const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
    fs.mkdirSync(path.join(uploadDir, 'profiles'));
    fs.mkdirSync(path.join(uploadDir, 'products'));
}

const storage = (folder: string) => multer.diskStorage({
    destination: (req, file, cb) => {
        const dest = path.join(uploadDir, folder);
        cb(null, dest);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const fileFilter = (req: any, file: any, cb: any) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Not an image! Please upload an image.'), false);
    }
};

export const uploadProfile = multer({ storage: storage('profiles'), fileFilter });
export const uploadProduct = multer({ storage: storage('products'), fileFilter });