import axiosInstance from '../../axios.config';

interface UploadImageResponse {
  filename: string;
  url: string;
}

export const uploadService = {
  async uploadImage(file: File): Promise<UploadImageResponse> {
    const formData = new FormData();
    formData.append('file', file);

    return (await axiosInstance.post('/uploads/image', formData)) as unknown as UploadImageResponse;
  },
};
