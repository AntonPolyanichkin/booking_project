import * as yup from "yup"

export const formValidation = yup.object({
	email:yup.string().required("Будь ласка, введіть пошту").email("Невірний формат email"),

	password:yup.string().required("Будь ласка, введіть пароль").min(5,"Пароль не може складатись з менше, аніж 5 символів")
})