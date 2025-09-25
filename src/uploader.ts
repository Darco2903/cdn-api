import axios, { AxiosInstance } from "axios";
import type { UploadData } from "./types/upload.js";
import { createClient } from "./client.js";

export default class Uploader {
    static MAX_SINGLE_UPLOAD_SIZE = 100_000_000; // 100MB

    protected ax: AxiosInstance;
    protected client;

    constructor(origin: string) {
        this.ax = axios.create({
            baseURL: origin,
            withCredentials: true,
        });
        this.client = createClient(origin);
    }

    protected getPartEndpoint(uploadId: string, part: number) {
        return `/upload/part/${uploadId}/${part}`;
    }

    public async upload(
        file: File,
        role: number,
        visible: boolean,
        active: boolean
    ) {
        if (file.size < Uploader.MAX_SINGLE_UPLOAD_SIZE) {
            const formData = new FormData();
            const data: UploadData = {
                filename: file.name,
                role,
                visible,
                active,
            };
            formData.append("data", JSON.stringify(data));
            formData.append("file", file);
            const res = await this.ax.post("/upload", formData, {
                onUploadProgress(e) {
                    //
                },
            });
        } else {
            const parts = Math.ceil(
                file.size / Uploader.MAX_SINGLE_UPLOAD_SIZE
            );
            const resInit = await this.client.upload.uploadInit({
                body: {
                    filename: file.name,
                    role,
                    visible,
                    active,
                    size: file.size,
                    mimeType: file.type,
                    parts,
                },
            });

            if (resInit.status !== 200) {
                throw new Error("Failed to initialize upload");
            }

            const uploadId = resInit.body.uploadId;

            for (let part = 0; part < parts; part++) {
                const start = part * Uploader.MAX_SINGLE_UPLOAD_SIZE;
                const end = Math.min(
                    start + Uploader.MAX_SINGLE_UPLOAD_SIZE,
                    file.size
                );

                const formData = new FormData();
                formData.append("file", file.slice(start, end));

                const res = await this.ax.post(
                    this.getPartEndpoint(uploadId, part + 1),
                    formData,
                    {
                        onUploadProgress(e) {
                            //
                        },
                    }
                );

                if (res.status !== 200) {
                    throw new Error("Failed to upload part " + (part + 1));
                }
            }

            const res = await this.client.upload.uploadEnd({
                params: { upload_id: uploadId },
            });
            if (res.status !== 200) {
                throw new Error("Failed to finalize upload");
            }
        }
    }
}
