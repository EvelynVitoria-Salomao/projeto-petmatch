import { supabase, supabaseBucket, supabasePublicUrl } from "@/lib/supabase";
import { ImageStorageError } from "@/types/custom-errors";

function getBucketAndFilePath(path: string) {
	const firstSlash = path.indexOf("/");
	return {
		bucket: path.substring(0, firstSlash),
		filePath: path.substring(firstSlash + 1),
	};
}

export const imageService = {
	uploadImage: async (image: File, folder: string) => {
		const timestamp = Date.now();
		const response = await supabase.storage
			.from(supabaseBucket)
			.upload(`${folder}/${timestamp}_${image.name}`, image);
		if (response.error) {
			console.log("Supabase Error: ", response.error.toJSON());
			throw new ImageStorageError("Erro ao fazer upload da imagem");
		}
		// fullPath = bucket + path
		return response.data.fullPath;
	},
	deleteImage: async (imagePath: string) => {
		const { bucket, filePath } = getBucketAndFilePath(imagePath);
		const response = await supabase.storage.from(bucket).remove([filePath]);
		if (response.error) {
			console.log("Supabase Error: ", response.error.toJSON());
			throw new ImageStorageError("Erro ao fazer upload da imagem");
		}
	},
	buildPublicUrl: (imagePath: string) => {
		return `${supabasePublicUrl}${imagePath}`;
	},
};
