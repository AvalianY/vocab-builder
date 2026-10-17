import * as yup from 'yup';

export const ENGLISH_WORD_PATTERN = /\b[A-Za-z'-]+(?:\s+[A-Za-z'-]+)*\b/;
export const UKRAINIAN_WORD_PATTERN = /^(?![A-Za-z])[А-ЯІЄЇҐґа-яієїʼ\s]+$/u;

export const addWordSchema = yup.object({
  category: yup.string().required('Choose a category'),
  isIrregular: yup.boolean().required(),
  ua: yup
    .string()
    .trim()
    .required('Ukrainian translation is required')
    .matches(UKRAINIAN_WORD_PATTERN, 'Enter a valid Ukrainian translation'),
  en: yup
    .string()
    .trim()
    .required('English word is required')
    .matches(ENGLISH_WORD_PATTERN, 'Enter a valid English word'),
});

export const editWordSchema = yup.object({
  ua: yup
    .string()
    .trim()
    .required('Ukrainian translation is required')
    .matches(UKRAINIAN_WORD_PATTERN, 'Enter a valid Ukrainian translation'),
  en: yup
    .string()
    .trim()
    .required('English word is required')
    .matches(ENGLISH_WORD_PATTERN, 'Enter a valid English word'),
});
