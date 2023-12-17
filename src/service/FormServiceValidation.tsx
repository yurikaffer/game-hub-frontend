import { ICreateGame } from "../Models";

interface ValidationResult {
    isValid: boolean;
    errors: Record<string, string>;
}

export const validateForm = (formData: ICreateGame): ValidationResult => {
    const errors: Record<string, string> = {};
    let isValid = true;

    // Validar o campo "name"
    if (!formData.name.trim()) {
        errors.name = 'O nome é obrigatório.';
        isValid = false;
    }

    // Validar o campo "description"
    if (!formData.description.trim()) {
        errors.description = 'A descrição é obrigatória.';
        isValid = false;
    }

    // Função auxiliar para validar URLs
    const isValidUrl = (url: string): boolean => {
        const urlPattern = new RegExp(
            /^(ftp|http|https):\/\/[^ "]+$/,
            'i'
        );
        return urlPattern.test(url);
    };

    if (!isValidUrl(formData.link)) {
        errors.link = 'O link inserido não é válido.';
        isValid = false;
    }

    if (!formData.file && !formData.image) {       
        errors.file = 'A imagem é obrigatória.';
        isValid = false;
    }

    return { isValid, errors };
};
