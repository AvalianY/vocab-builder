import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import { Modal } from '../../components/Modal';
import { useNotification } from '../../components/Notification';
import { useEditWordMutation } from '../../services/api/wordsApi';
import { getApiErrorMessage } from '../../utils/getApiErrorMessage';
import { editWordSchema } from './validation';
import { WordField } from './WordField';

export function EditWordModal({ word, onClose }) {
  const { notify } = useNotification();
  const [editWord, { isLoading }] = useEditWordMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(editWordSchema),
    defaultValues: {
      ua: word.ua,
      en: word.en,
    },
  });

  const submit = async (values) => {
    try {
      await editWord({
        id: word._id,
        en: values.en,
        ua: values.ua,
        category: word.category,
        isIrregular: Boolean(word.isIrregular),
      }).unwrap();
      onClose();
    } catch (error) {
      notify(getApiErrorMessage(error, 'Unable to save the word. Please try again.'));
    }
  };

  return (
    <Modal
      ariaLabel="Edit word"
      backdropClassName="edit-word-backdrop"
      className="word-modal word-modal--edit"
      onClose={onClose}
    >
      <h2 className="visually-hidden">Edit word</h2>
      <form className="word-form" onSubmit={handleSubmit(submit)} noValidate>
        <div className="word-form__fields">
          <WordField
            id="edit-word-ua"
            label="Ukrainian"
            flag="flag-ua"
            registration={register('ua')}
            error={errors.ua}
          />
          <WordField
            id="edit-word-en"
            label="English"
            flag="flag-gb"
            registration={register('en')}
            error={errors.en}
          />
        </div>

        <div className="word-form__actions">
          <button className="word-form__primary" type="submit" disabled={isLoading}>
            Save
          </button>
          <button className="word-form__secondary" type="button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
}
