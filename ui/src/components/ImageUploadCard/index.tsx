import { useCallback, useEffect, useRef, useState } from "react"
import Modal, { IModalProps } from "../Modal"
import styles from "./styles.module.css"
import internalAPI from "@/service/internal.services";
import { toast } from "react-toastify";
import Button from "../Button";
import Icon from "../Icon";
import Text from "@/typography";

import Cropper, { Area, Point } from "react-easy-crop";
import Slider from "@mui/material/Slider";
import { cropImage } from "./CropImage";

export interface IImageUploadModalProps extends IModalProps{
    userId: number,
    userThumb?: string
}

export default ({handleClose, open, title, userId, userThumb}: IImageUploadModalProps) => {

    const [image, setImage] = useState<string>(userThumb ?? "avatar.png");
    const [file, setFile] = useState<File>();
    const [crop, setCrop] = useState<Point>({x: 0, y: 0});
    const [zoom, setZoom] = useState<number>(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area>();

    const inputRef = useRef<HTMLInputElement>(null);
    const clickableRef = useRef<HTMLDivElement>(null);

    const onCropComplete = useCallback((_: Area, croppedAreaPixels: Area) => {
        setCroppedAreaPixels(croppedAreaPixels)
    }, []);

    const handleFile = async (file: File) => {
        if(!file)
            return;
        setFile(file);

        const url = URL.createObjectURL(file)
        setImage(url);
    }
    const imgHandle = () => {
        inputRef.current?.click();
    }
    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) =>  {
        event.preventDefault();
        clickableRef.current!.classList.add(styles.visible);
    }
    const handleDragEnd = (event: React.DragEvent<HTMLDivElement>) =>  {
        event.preventDefault();
        clickableRef.current!.classList.remove(styles.visible);
    }
    const handleDrop = (event: React.DragEvent<HTMLDivElement>) =>  {
        event.preventDefault();
        const file = event.dataTransfer.files![0];
        if(!file)
            return;

        handleFile(file);
        clickableRef.current!.classList.remove(styles.visible);
    }

    useEffect(() => {
        console.log(image);
        
    },[image])

    const send = async () => {
        if(!file)
            return;

        const data = await cropImage(file, croppedAreaPixels!);
        if(!data) return;

        const _formData = new FormData();
        _formData.append("file", data);

        const response = await internalAPI.fileRequest(`/users/image/${userId}`, "POST", _formData);
        if(!response || !response.success) {
            toast.error("Error on upload image", {toastId: "upload-image-error"})
            return
        }
        location.reload();
    }
    return (
        <>
            <Modal
                handleClose={handleClose}
                title={title}
                open={open}
            >
                <div className={styles.modal_container}>

                    <section className={styles.image_container}
                        onDragEnter={handleDragOver}
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                  
                    >
                        <div className={styles.crop_container}>
                            <Cropper
                                image={image}
                                crop={crop}
                                zoom={zoom}
                                aspect={1 / 1}
                                onCropChange={setCrop}
                                onCropComplete={onCropComplete}
                                onZoomChange={setZoom}
                            />
                        </div>
                        <div className={styles.crop_controls}>
                            <Slider
                                value={zoom}
                                min={1}
                                max={3}
                                step={0.1}
                                aria-labelledby="Zoom"
                                onChange={(_e, zoom) => setZoom(Number(zoom))}
                                classes={{root: "slider"}}
                                className={styles.slider}
                            />
                        </div>

                        <input 
                            type="file" 
                            accept="image/png, image/jpeg" 
                            onChange={(e) => handleFile(e.target.files![0])}
                            ref={inputRef}
                        />
                        <span 
                            onClick={() => imgHandle()}
                            ref={clickableRef}
                            className={styles.clickable_content} 
                            onDragLeave={handleDragEnd}

                        >
                            <Icon name="add_photo_alternate" size="lg" /> 
                            <section>
                                <Text>Clique ou Arraste para alterar a imagem</Text>
                            </section>
                        </span>
                    </section>
                    <section className={styles.image_options_container}>
                        <span className={styles.btn_container}>
                            <span>
                                <Button variant="contained" onClick={imgHandle}>Select Image</Button>
                            </span>
                            <span className={styles.btn_section}>
                                <Button variant="contained" onClick={send}>Save</Button>
                                <Button onClick={handleClose}>Cancel</Button>
                            </span>
                        </span>
                    </section>
                </div>
            </Modal>
        </>
    )
}