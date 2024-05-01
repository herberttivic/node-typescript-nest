import {Controller, Get, NotFoundException, Param, Post, Req, Res, UseInterceptors} from '@nestjs/common';
import {AppService} from './app.service';
import {FileInterceptor} from "@nestjs/platform-express";
import {diskStorage} from "multer"
import {Request, Response} from "express";
import {extname} from "path";
import * as path from "node:path";

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {
    }

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }

    @Post("/upload")
    @UseInterceptors(FileInterceptor("file", {
        storage: diskStorage({
            filename(req: Request, file: Express.Multer.File, callback: (error: (Error | null), filename: string) => void) {
                try {
                    const folderName = req.params.id
                    const allowedExtensions: string[] = ['.doc', '.docx', '.pdf', ".xlsx", ".odt", ".txt", ".pptx", ".odp", ".ods"];
                    const extension = extname(file.originalname)
                    const rawFileName = file.originalname
                        .split('.')[0]
                        .normalize('NFD')
                        .replace(/[^a-zA-Z\s]/g, '');
                    const fileKey = Number(Math.random().toFixed(2)) * 100
                    const fileName = `${rawFileName}_${Date.now().toString()}_${fileKey}${extension}`;
                    if (allowedExtensions.includes(extension)) {
                        callback(null, fileName);
                    } else {
                        callback(new NotFoundException(
                            "Extensão do arquivo inválida. As extensões permitidas são : '.doc', '.docx', '.pdf', .xlsx, .odt, .txt, .pptx, .odp, .ods"
                        ), null)
                    }
                }catch (e){
                    console.log(e)
                    throw new Error(e.message)
                }
            },
            destination: "./uploads",

        })
    }))
    uploadFiles() :string {
        return this.appService.uploadFiles();
    }

    @Get("/file/:name")
    getFile(@Req() req : Request, @Res() res : Response, @Param("name") fileName : string) {
        try {
            const file = path.join(__dirname, "../uploads/" + fileName)
            res.sendFile(file);
        }catch (e){
            console.log(e)
        }
    }
}
