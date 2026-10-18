import { useEffect, useMemo, useRef, useState } from 'react';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { Icon } from '../Icon';
import { ProgressBar } from '../ProgressBar';

function HeaderLabel({ children, flag }) {
  return (
    <span className="words-table__header-label">
      <span>{children}</span>
      {flag ? (
        <Icon
          className="words-table__header-flag"
          name={flag}
          width={24}
          height={24}
        />
      ) : null}
    </span>
  );
}

function WordActions({ word, onEdit, onDelete, deleting }) {
  const rootRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const closeOnOutsideClick = (event) => {
      if (!rootRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    };
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('pointerdown', closeOnOutsideClick);
    document.addEventListener('keydown', closeOnEscape);

    return () => {
      document.removeEventListener('pointerdown', closeOnOutsideClick);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [isOpen]);

  return (
    <div className="word-actions" ref={rootRef}>
      <button
        className="word-actions__trigger"
        type="button"
        aria-label={`Actions for ${word.en}`}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((current) => !current)}
      >
        ...
      </button>

      {isOpen ? (
        <div className="word-actions__menu" role="menu">
          <button
            className="word-actions__item"
            type="button"
            role="menuitem"
            onClick={() => {
              setIsOpen(false);
              onEdit(word);
            }}
          >
            <Icon name="edit" />
            <span>Edit</span>
          </button>
          <button
            className="word-actions__item"
            type="button"
            role="menuitem"
            disabled={deleting}
            onClick={async () => {
              await onDelete(word);
              setIsOpen(false);
            }}
          >
            <Icon name="trash" />
            <span>Delete</span>
          </button>
        </div>
      ) : null}
    </div>
  );
}

function AddToDictionaryButton({ word, onAdd, adding }) {
  return (
    <button
      className="recommend-action"
      type="button"
      aria-label={`Add ${word.en} to dictionary`}
      disabled={adding}
      onClick={() => onAdd(word)}
    >
      <span>Add to dictionary</span>
      <Icon name="arrow-right" color="currentColor" />
    </button>
  );
}

export function WordsTable({
  words,
  variant = 'dictionary',
  onEdit,
  onDelete,
  deletingId,
  onAdd,
  addingId,
}) {
  const columns = useMemo(
    () => {
      const commonColumns = [
        {
          accessorKey: 'en',
          header: () => <HeaderLabel flag="flag-gb">Word</HeaderLabel>,
        },
        {
          accessorKey: 'ua',
          header: () => <HeaderLabel flag="flag-ua">Translation</HeaderLabel>,
        },
        {
          accessorKey: 'category',
          header: 'Category',
        },
      ];

      if (variant === 'recommend') {
        return [
          ...commonColumns,
          {
            id: 'recommend-action',
            header: '',
            cell: ({ row }) => (
              <AddToDictionaryButton
                word={row.original}
                onAdd={onAdd}
                adding={addingId === row.original._id}
              />
            ),
          },
        ];
      }

      return [
        ...commonColumns,
        {
          accessorKey: 'progress',
          header: () => <HeaderLabel>Progress</HeaderLabel>,
          cell: ({ getValue }) => <ProgressBar value={getValue()} />,
        },
        {
          id: 'actions',
          header: '',
          cell: ({ row }) => (
            <WordActions
              word={row.original}
              onEdit={onEdit}
              onDelete={onDelete}
              deleting={deletingId === row.original._id}
            />
          ),
        },
      ];
    },
    [addingId, deletingId, onAdd, onDelete, onEdit, variant],
  );

  // TanStack Table intentionally returns non-memoizable functions.
  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data: words,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="words-table-wrap">
      <table className={`words-table words-table--${variant}`}>
        <caption className="visually-hidden">
          {variant === 'recommend'
            ? 'Recommended words'
            : 'Words in your dictionary'}
        </caption>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  className={`words-table__cell words-table__cell--${header.column.id}`}
                  scope="col"
                  key={header.id}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td
                  className={`words-table__cell words-table__cell--${cell.column.id}`}
                  key={cell.id}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
