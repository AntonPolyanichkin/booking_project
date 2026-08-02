import * as yup from "yup";

export const addClientShema = yup.object({
  name: yup
    .string()
    .required("Будь ласка, введіть імʼя")
    .min(2, "Ім'я має містити щонайменше 2 символи")
    .max(50, "Ім'я занадто довге")
    .matches(/^[а-яА-ЯіІїЇєЄa-zA-Z\s'-]+$/, "Ім'я містить недопустимі символи"),

  phone: yup
    .string()
    .required("Будь ласка, введіть номер телефону")
    .matches(/^\+?3?8?(0\d{9})$/, "Невірний формат номера телефону"),
  procedure: yup.string().required("Будь ласка, введіть процедуру").min(2, "Назва процедури занадто коротка").max(100, "Назва процедури занадто довга"),
  price: yup.number().typeError("Ціна має бути числом").required("Будь ласка, введіть ціну").positive("Ціна має бути більшою за 0").max(1000000, "Занадто велика сума"),
  date: yup
    .date()
    .typeError("Невірний формат дати")
    .required("Будь ласка, введіть дату")
    .min(new Date(new Date().setHours(0, 0, 0, 0)), "Дата не може бути в минулому")
    .max(new Date(2100, 0, 1), "Дата занадто пізня"),
  time: yup
    .string()
    .required("Будь ласка, вкажіть час")
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/, "Невірний формат часу"),

  notice: yup.string().max(500, "Коментар занадто довгий").notRequired(),
});
