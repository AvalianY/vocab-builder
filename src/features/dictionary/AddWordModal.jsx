import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';

import { CategorySelect } from '../../components/CategorySelect';
import { Modal } from '../../components/Modal';
import { useNotification } from '../../components/Notification';
import { VerbTypeOptions } from '../../components/VerbTypeOptions';
import { useCreateWordMutation } from '../../services/api/wordsApi';
import { getApiErrorMessage } from '../../utils/getApiErrorMessage';
import { addWordSchema } from './validation';
import { WordField } from './WordField';

export function AddWordModal({ categories, onClose }) {
  const { notify } = useNotification();
  const [createWord, { isLoading }] = useCreateWordMutation();
  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addWordSchema),
    defaultValues: {
      category: 'verb',
      isIrregular: false,
      ua: '',
      en: '',
    },
  });

  // React Hook Form owns these subscriptions outside React's memoization model.
  // eslint-disable-next-line react-hooks/incompatible-library
  const category = watch('category');
  const isIrregular = watch('isIrregular');

  const submit = async (values) => {
    try {
      await createWord({
        en: values.en,
        ua: values.ua,
        category: values.category,
        ...(values.category === 'verb'
          ? { isIrregular: values.isIrregular }
          : {}),
      }).unwrap();
      onClose();
    } catch (error) {
      notify(getApiErrorMessage(error, 'Unable to add the word. Please try again.'));
    }
  };

  return (
    <Modal className="word-modal word-modal--add" title="Add word" onClose={onClose}>
      <p className="word-modal__description">
        Adding a new word to the dictionary is an important step in enriching the
        language base and expanding the vocabulary.
      </p>

      <form className="word-form" onSubmit={handleSubmit(submit)} noValidate>
        <div className="word-form__category">
          <Controller
            control={control}
            name="category"
            render={({ field }) => (
              <CategorySelect
                id="add-word-category"
                inverse
                value={field.value}
                options={categories}
                onChange={field.onChange}
                error={errors.category}
              />
            )}
          />
          {errors.category ? (
            <p className="word-field__error" id="add-word-category-error">
              {errors.category.message}
            </p>
          ) : null}
        </div>

        {category === 'verb' ? (
          <div className="word-form__verb-type">
            <Controller
              control={control}
              name="isIrregular"
              render={({ field }) => (
                <VerbTypeOptions
                  inverse
                  name="add-word-verb-type"
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
            {isIrregular ? (
              <p className="word-form__verb-hint">
                Such data must be entered in the format I form-II form-III form.
              </p>
            ) : null}
          </div>
        ) : null}

        <div className="word-form__fields">
          <WordField
            id="add-word-ua"
            label="Ukrainian"
            flag="flag-ua"
            registration={register('ua')}
            error={errors.ua}
          />
          <WordField
            id="add-word-en"
            label="English"
            flag="flag-gb"
            registration={register('en')}
            error={errors.en}
          />
        </div>

        <div className="word-form__actions">
          <button className="word-form__primary" type="submit" disabled={isLoading}>
            Add
          </button>
          <button className="word-form__secondary" type="button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
}
