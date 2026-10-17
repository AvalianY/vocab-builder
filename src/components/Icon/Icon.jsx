import iconSpriteUrl from '../../assets/icons/icons.svg?url';

const ICON_METADATA = Object.freeze({
  'arrow-right': { width: 20, height: 20, viewBox: '0 0 20 20', color: '#85AA9F' },
  'chevron-down': { width: 20, height: 20, viewBox: '0 0 20 20', color: '#FCFCFC' },
  close: { width: 32, height: 32, viewBox: '0 0 32 32', color: '#FCFCFC' },
  edit: { width: 20, height: 20, viewBox: '0 0 20 20', color: '#121417' },
  eye: { width: 20, height: 20, viewBox: '0 0 20 20', color: '#121417' },
  'eye-off': { width: 20, height: 20, viewBox: '0 0 20 20', color: '#121417' },
  'flag-gb': { width: 32, height: 32, viewBox: '0 0 32 32' },
  'flag-ua': { width: 32, height: 32, viewBox: '0 0 32 32' },
  menu: { width: 32, height: 22, viewBox: '0 0 32 22', color: '#121417' },
  'pagination-first': { width: 16, height: 16, viewBox: '0 0 16 16', color: '#121417' },
  'pagination-prev': { width: 16, height: 16, viewBox: '0 0 16 16', color: '#121417' },
  'pagination-next': { width: 16, height: 16, viewBox: '0 0 16 16', color: '#121417' },
  'pagination-last': { width: 16, height: 16, viewBox: '0 0 16 16', color: '#85AA9F' },
  plus: { width: 20, height: 20, viewBox: '0 0 20 20', color: '#85AA9F' },
  'radio-checked': { width: 24, height: 24, viewBox: '0 0 24 24', color: '#85AA9F' },
  'radio-unchecked': { width: 24, height: 24, viewBox: '0 0 24 24', color: '#121417' },
  search: { width: 20, height: 20, viewBox: '0 0 20 20', color: '#121417' },
  trash: { width: 20, height: 20, viewBox: '0 0 20 20', color: '#121417' },
  user: { width: 24, height: 24, viewBox: '0 0 24 24', color: '#FCFCFC' },
});

export function Icon({
  name,
  title,
  width,
  height,
  color,
  role,
  ...props
}) {
  const metadata = ICON_METADATA[name];

  if (!metadata) {
    throw new Error(`Unknown icon: ${name}`);
  }

  const hasAccessibleName = Boolean(
    title || props['aria-label'] || props['aria-labelledby'],
  );

  return (
    <svg
      {...props}
      width={width ?? metadata.width}
      height={height ?? metadata.height}
      viewBox={metadata.viewBox}
      color={color ?? metadata.color}
      role={hasAccessibleName ? (role ?? 'img') : role}
      aria-hidden={hasAccessibleName ? undefined : true}
      focusable="false"
      data-icon={name}
    >
      {title ? <title>{title}</title> : null}
      <use href={`${iconSpriteUrl}#icon-${name}`} />
    </svg>
  );
}
