import { Area } from "react-easy-crop";

export async function cropImage(file: File, crop: Area): Promise<Blob | null> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = async () => {
      if (typeof reader.result !== "string") {
        reject(new Error("Erro ao ler a imagem."));
        return;
      }

      const image = await createImage(reader.result);

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        reject(new Error("Erro ao obter o contexto do canvas."));
        return;
      }

      // Define o tamanho do canvas com base na área de corte
      canvas.width = crop.width;
      canvas.height = crop.height;

      // Desenha a parte cortada da imagem
      ctx.drawImage(
        image,
        crop.x, crop.y, crop.width, crop.height, // Origem do corte
        0, 0, crop.width, crop.height // Tamanho no canvas
      );

      // Retorna um Blob pronto para ser enviado ao backend
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error("Erro ao criar o Blob da imagem cortada."));
        }
      }, "image/jpeg");
    };

    reader.onerror = (error) => reject(error);

    reader.readAsDataURL(file);
  });
}

// Função auxiliar para criar um objeto HTMLImageElement a partir de um base64
const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = url;
    img.onload = () => resolve(img);
    img.onerror = (error) => reject(error);
  });
